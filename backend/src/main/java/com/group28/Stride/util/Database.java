package com.group28.Stride.util;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.http.HttpStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.sql.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Database {
    private static final Dotenv dotenv;
    private static final Connection connection;

    static {
        dotenv = Dotenv.configure()
                .directory("backend")
                .load();

        try {
            connection = DriverManager.getConnection(String.format("jdbc:postgresql://%s:%s/%s", dotenv.get("DB_HOST"), dotenv.get("DB_PORT"), dotenv.get("DB_NAME")), dotenv.get("DB_USER"), dotenv.get("DB_PASSWORD"));
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public static Map<String, Object> getImage(int id) {
        try {
            PreparedStatement statement = connection.prepareStatement("SELECT img, content FROM images WHERE id = ?");
            statement.setInt(1, id);
            ResultSet res = statement.executeQuery();
            Map<String, Object> img = new HashMap<>();
            if (res.next()) {
                img.put("data", res.getBytes("img"));
                img.put("content", res.getString("content"));
            }
            res.close();
            statement.close();
            return img;
        } catch (SQLException ex) {
            ex.printStackTrace();
            return null;
        }
    }

    public static Map<String, Integer> saveImage(MultipartFile file) {
        try {
            PreparedStatement statement = connection.prepareStatement("INSERT INTO images (img, content) VALUES (?, ?) RETURNING id");
            statement.setBytes(1, file.getBytes());
            statement.setString(2, file.getContentType());
            ResultSet res = statement.executeQuery();
            Map<String, Integer> map = new HashMap<>();
            if (res.next()) {
                map.put("id", res.getInt("id"));
            }
            res.close();
            statement.close();
            return map;
        } catch (SQLException | IOException ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public static Map<String, Object> getResume(int id) {
        try {
            PreparedStatement statement = connection.prepareStatement("SELECT cv, content FROM resumes WHERE id = ?");
            statement.setInt(1, id);
            ResultSet res = statement.executeQuery();
            Map<String, Object> img = new HashMap<>();
            if (res.next()) {
                img.put("data", res.getBytes("cv"));
                img.put("content", res.getString("content"));
            }
            res.close();
            statement.close();
            return img;
        } catch (SQLException ex) {
            ex.printStackTrace();
            return null;
        }
    }

    public static Map<String, Integer> saveResume(MultipartFile file) {
        try {
            PreparedStatement statement = connection.prepareStatement("INSERT INTO resumes (cv, content) VALUES (?, ?) RETURNING id");
            statement.setBytes(1, file.getBytes());
            statement.setString(2, file.getContentType());
            ResultSet res = statement.executeQuery();
            Map<String, Integer> map = new HashMap<>();
            if (res.next()) {
                map.put("id", res.getInt("id"));
            }
            res.close();
            statement.close();
            return map;
        } catch (SQLException | IOException ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public static List<Map<String, Object>> jobQuery(String q, String workstyle, String jobtype, String industry) {
        try {
            String query = "SELECT job_id, company_id, title, job_description, job_type, job_location, workstyle FROM jobs WHERE 1=1";
            List<String> params = new ArrayList<>();

            if (q != null && !q.isEmpty()) {
                query += " AND title ILIKE ?";
                params.add("%" + q + "%");
            }
            if (workstyle != null && !workstyle.isEmpty()) {
                query += " AND workstyle = ?";
                params.add(workstyle);
            }
            if (jobtype != null && !jobtype.isEmpty()) {
                query += " AND job_type = ?";
                params.add(jobtype);
            }
            if (industry != null && !industry.isEmpty()) {
                query += " AND department = ?";
                params.add(industry);
            }

            PreparedStatement statement = connection.prepareStatement(query);

            for (int i = 0; i < params.size(); i++)
                statement.setString(i + 1, params.get(i));

            ResultSet res = statement.executeQuery();
            List<Map<String, Object>> list = new ArrayList<>();
            while (res.next()) {
                Map<String, Object> map = new HashMap<>();
                map.put("job_id", res.getInt("job_id"));
                map.put("title", res.getString("title"));
                map.put("job_description", res.getString("job_description"));
                map.put("location", res.getString("job_location"));
                map.put("jobtype", res.getString("job_type"));
                map.put("workstyle", res.getString("workstyle"));
                PreparedStatement company_statement = connection.prepareStatement("SELECT company_name, logo FROM companies WHERE company_id = ?");
                company_statement.setInt(1, res.getInt("company_id"));
                ResultSet company_res = company_statement.executeQuery();
                if (company_res.next()) {
                    map.put("company", company_res.getString("company_name"));
                    map.put("logo", company_res.getInt("logo"));
                }
                company_res.close();
                company_statement.close();
                list.add(map);
            }
            res.close();
            statement.close();
            return list;
        } catch (SQLException ex) {
            ex.printStackTrace();
            return null;
        }
    }

    public static void saveJob(String user_id, int job_id) {
        try {
            PreparedStatement statement = connection.prepareStatement("INSERT INTO saved (user_id, job_id) VALUES (?, ?)");
            statement.setString(1, user_id);
            statement.setInt(2, job_id);
            statement.executeUpdate();
            statement.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    public static void unsaveJob(String user_id, int job_id) {
        try {
            PreparedStatement statement = connection.prepareStatement("DELETE FROM saved WHERE user_id = ? AND job_id = ?");
            statement.setString(1, user_id);
            statement.setInt(2, job_id);
            statement.executeUpdate();
            statement.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    public static List<Map<String, Object>> saved(String user_id) {
        try {
            PreparedStatement statement = connection.prepareStatement("SELECT user_id, job_id FROM saved WHERE user_id = ?");
            statement.setString(1, user_id);
            ResultSet res = statement.executeQuery();
            List<Map<String, Object>> list = new ArrayList<>();
            while (res.next()) {
                Map<String, Object> map = new HashMap<>();
                int job_id = res.getInt("job_id");
                map.put("job_id", job_id);
                PreparedStatement job_statement = connection.prepareStatement("SELECT company_id, title, job_description, job_type, job_location, workstyle FROM jobs WHERE job_id = ?");
                job_statement.setInt(1, job_id);
                ResultSet job_res = job_statement.executeQuery();
                int company_id = 0;
                if (job_res.next()) {
                    company_id = job_res.getInt("company_id");
                    map.put("title", job_res.getString("title"));
                    map.put("description", job_res.getString("job_description"));
                    map.put("jobtype", job_res.getString("job_type"));
                    map.put("location", job_res.getString("job_location"));
                    map.put("workstyle", job_res.getString("workstyle"));
                }
                job_res.close();
                job_statement.close();
                PreparedStatement company_statement = connection.prepareStatement("SELECT company_name, logo FROM companies WHERE company_id = ?");
                company_statement.setInt(1, company_id);
                ResultSet company_res = company_statement.executeQuery();
                if (company_res.next()) {
                    map.put("company", company_res.getString("company_name"));
                    map.put("logo", company_res.getInt("logo"));
                }
                company_res.close();
                company_statement.close();
                list.add(map);
            }
            res.close();
            statement.close();
            return list;
        } catch (SQLException ex) {
            ex.printStackTrace();
            return null;
        }
    }

    public static int applyJob(String user_id, Map<String, Object> body) {
        try {
            PreparedStatement statement = connection.prepareStatement("INSERT INTO applications (user_id, job_id, cv) VALUES (?, ?, ?) RETURNING application_id");
            statement.setString(1, user_id);
            statement.setInt(2, (int) body.get("job_id"));
            statement.setInt(3, (int) body.get("cv"));
            ResultSet res = statement.executeQuery();
            int id = 0;
            if (res.next()) {
                id = res.getInt("application_id");
            }
            res.close();
            statement.close();
            return id;
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return 0;
    }

    public static List<Map<String, Object>> applied(String user_id) {
        try {
            PreparedStatement statement = connection.prepareStatement("SELECT user_id, job_id FROM applications WHERE user_id = ?");
            statement.setString(1, user_id);
            ResultSet res = statement.executeQuery();
            List<Map<String, Object>> list = new ArrayList<>();
            while (res.next()) {
                Map<String, Object> map = new HashMap<>();
                int job_id = res.getInt("job_id");
                map.put("job_id", job_id);
                PreparedStatement job_statement = connection.prepareStatement("SELECT company_id, title, job_description, job_type, job_location, workstyle FROM jobs WHERE job_id = ?");
                job_statement.setInt(1, job_id);
                ResultSet job_res = job_statement.executeQuery();
                int company_id = 0;
                if (job_res.next()) {
                    company_id = job_res.getInt("company_id");
                    map.put("title", job_res.getString("title"));
                    map.put("description", job_res.getString("job_description"));
                    map.put("jobtype", job_res.getString("job_type"));
                    map.put("location", job_res.getString("job_location"));
                    map.put("workstyle", job_res.getString("workstyle"));
                }
                job_res.close();
                job_statement.close();
                PreparedStatement company_statement = connection.prepareStatement("SELECT company_name, logo FROM companies WHERE company_id = ?");
                company_statement.setInt(1, company_id);
                ResultSet company_res = company_statement.executeQuery();
                if (company_res.next()) {
                    map.put("company", company_res.getString("company_name"));
                    map.put("logo", company_res.getInt("logo"));
                }
                company_res.close();
                company_statement.close();
                list.add(map);
            }
            res.close();
            statement.close();
            return list;
        } catch (SQLException ex) {
            ex.printStackTrace();
            return null;
        }
    }

    public static void upgrade(String user_id, Map<String, Object> body) {
        try {
            PreparedStatement statement = connection.prepareStatement("INSERT INTO companies (user_id, company_name, company_location, industry, company_size, logo, founded, email, about, phone, website, company_country, company_city, company_state, postal_code, mission, benefits) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING company_id");
            statement.setString(1, user_id);
            statement.setString(2, body.get("company").toString());
            statement.setString(3, body.get("address").toString());
            statement.setString(4, body.get("industry").toString());
            statement.setString(5, body.get("size").toString());
            statement.setInt(6, (int) body.get("logo"));
            statement.setInt(7, (int) body.get("founded"));
            statement.setString(8, body.get("email").toString());
            statement.setString(9, body.get("description").toString());
            statement.setString(10, body.get("phone").toString());
            statement.setString(11, body.get("website").toString());
            statement.setString(12, body.get("country").toString());
            statement.setString(13, body.get("city").toString());
            statement.setString(14, body.get("state").toString());
            statement.setString(15, body.get("postal_code").toString());
            statement.setString(16, body.get("mission").toString());
            statement.setString(17, body.get("benefits").toString());
            ResultSet res = statement.executeQuery();
            int company_id = 0;
            if (res.next()) {
                company_id = res.getInt("company_id");
            }
            res.close();
            statement.close();

            PreparedStatement statement2 = connection.prepareStatement("INSERT INTO business_applications (user_id, company_id) VALUES (?, ?)");
            statement2.setString(1, user_id);
            statement2.setInt(2, company_id);
            statement2.executeUpdate();
            statement2.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    public static Map<String, Integer> stats(String user_id) {
        try {
            PreparedStatement statement = connection.prepareStatement("SELECT company_id FROM companies WHERE user_id = ?");
            statement.setString(1, user_id);
            ResultSet res = statement.executeQuery();
            int company_id = 0;
            if (res.next()) {
                company_id = res.getInt("company_id");
            }
            res.close();
            statement.close();

            int total_jobs = 0;
            int total_applicants = 0;
            PreparedStatement job_statement = connection.prepareStatement("SELECT job_id FROM jobs WHERE company_id = ?");
            job_statement.setInt(1, company_id);
            ResultSet job_res = job_statement.executeQuery();
            while (job_res.next()) {
                total_jobs += 1;

                PreparedStatement applicant_statement = connection.prepareStatement("SELECT COUNT(1) FROM applications WHERE job_id = ?");
                applicant_statement.setInt(1, job_res.getInt("job_id"));
                ResultSet applicant_res = applicant_statement.executeQuery();
                if (applicant_res.next()) {
                    total_applicants += applicant_res.getInt(1);
                }
                applicant_res.close();
                applicant_statement.close();
            }
            job_res.close();
            job_statement.close();

            Map<String, Integer> map = new HashMap<>();
            map.put("total_jobs", total_jobs);
            map.put("total_applicants", total_applicants);
            map.put("profile_views", 5);
            map.put("response_rate", 1);
            return map;
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public static String createJob(String user_id, Map<String, Object> body) {
        try {
            PreparedStatement company_statement = connection.prepareStatement("SELECT company_id FROM companies WHERE user_id = ?");
            company_statement.setString(1, user_id);
            ResultSet company_res = company_statement.executeQuery();
            int company_id = 0;
            if (company_res.next()) {
                company_id = company_res.getInt("company_id");
            }
            company_res.close();
            company_statement.close();

            PreparedStatement statement = connection.prepareStatement("INSERT INTO jobs (company_id, title, department, job_location, job_type, workstyle, skills, languages, experience, education, responsibilities, qualifications, job_description, closes_at, openings) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            statement.setInt(1, company_id);
            statement.setString(2, body.get("title").toString());
            statement.setString(3, body.get("department").toString());
            statement.setString(4, body.get("location").toString());
            statement.setString(5, body.get("job_type").toString());
            statement.setString(6, body.get("workstyle").toString());
            statement.setArray(7, connection.createArrayOf("TEXT", ((List<String>) body.get("skills")).toArray()));
            statement.setArray(8, connection.createArrayOf("TEXT", ((List<String>) body.get("languages")).toArray()));
            statement.setString(9, body.get("experience").toString());
            statement.setString(10, body.get("education").toString());
            statement.setString(11, body.get("responsibilities").toString());
            statement.setString(12, body.get("qualifications").toString());
            statement.setString(13, body.get("description").toString());
            statement.setTimestamp(14, Timestamp.valueOf(body.get("deadline").toString()));
            statement.setInt(15, (int) body.get("openings"));
            statement.executeUpdate();
            statement.close();
            return body.get("title").toString();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public static void updateJob(String user_id, Map<String, Object> body, boolean check_own) {
        try {
            if (check_own) {
                PreparedStatement job_statement = connection.prepareStatement("SELECT company_id FROM jobs WHERE job_id = ?");
                job_statement.setInt(1, (int) body.get("job_id"));
                ResultSet job_res = job_statement.executeQuery();
                int company_id = 0;
                if (job_res.next()) {
                    company_id = job_res.getInt("company_id");
                }
                job_res.close();
                job_statement.close();

                PreparedStatement company_statement = connection.prepareStatement("SELECT user_id FROM companies WHERE company_id = ?");
                company_statement.setInt(1, company_id);
                ResultSet company_res = company_statement.executeQuery();
                String owner_id = "";
                if (company_res.next()) {
                    owner_id = company_res.getString("user_id");
                }
                company_res.close();
                company_statement.close();

                if (!owner_id.equals(user_id))
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "You do not own this job");
            }

            PreparedStatement statement = connection.prepareStatement("UPDATE jobs SET title = ?, department = ?, job_location = ?, job_type = ?, workstyle = ?, skills = ?, languages = ?, experience = ?, education = ?, responsibilities = ?, qualifications = ?, job_description = ?, closes_at = ?, openings = ? WHERE job_id = ?");
            statement.setString(1, body.get("title").toString());
            statement.setString(2, body.get("department").toString());
            statement.setString(3, body.get("location").toString());
            statement.setString(4, body.get("job_type").toString());
            statement.setString(5, body.get("workstyle").toString());
            statement.setArray(6, connection.createArrayOf("TEXT", ((List<String>) body.get("skills")).toArray()));
            statement.setArray(7, connection.createArrayOf("TEXT", ((List<String>) body.get("languages")).toArray()));
            statement.setString(8, body.get("experience").toString());
            statement.setString(9, body.get("education").toString());
            statement.setString(10, body.get("responsibilities").toString());
            statement.setString(11, body.get("qualifications").toString());
            statement.setString(12, body.get("description").toString());
            statement.setTimestamp(13, Timestamp.from(Instant.parse(body.get("deadline").toString())));
            statement.setInt(14, (int) body.get("openings"));
            statement.setInt(15, (int) body.get("job_id"));
            statement.executeUpdate();
            statement.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    public static void deleteJob(String user_id, Integer job_id, boolean check_own) {
        try {
            if (check_own) {
                PreparedStatement job_statement = connection.prepareStatement("SELECT company_id FROM jobs WHERE job_id = ?");
                job_statement.setInt(1, job_id);
                ResultSet job_res = job_statement.executeQuery();
                int company_id = 0;
                if (job_res.next()) {
                    company_id = job_res.getInt("company_id");
                }
                job_res.close();
                job_statement.close();

                PreparedStatement company_statement = connection.prepareStatement("SELECT user_id FROM companies WHERE company_id = ?");
                company_statement.setInt(1, company_id);
                ResultSet company_res = company_statement.executeQuery();
                String owner_id = "";
                if (company_res.next()) {
                    owner_id = company_res.getString("user_id");
                }
                company_res.close();
                company_statement.close();

                if (!owner_id.equals(user_id))
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "You do not own this job");
            }

            PreparedStatement statement = connection.prepareStatement("DELETE FROM jobs WHERE job_id = ?");
            statement.setInt(1, job_id);
            statement.executeUpdate();
            statement.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    public static List<Map<String, Object>> jobs(String user_id) {
        try {
            PreparedStatement statement = connection.prepareStatement("SELECT company_id, company_name, logo FROM companies WHERE user_id = ?");
            statement.setString(1, user_id);
            ResultSet res = statement.executeQuery();
            int company_id = 0;
            int logo = 0;
            String company_name = "";
            if (res.next()) {
                company_id = res.getInt("company_id");
                logo = res.getInt("logo");
                company_name = res.getString("company_name");
            }
            res.close();
            statement.close();

            List<Map<String, Object>> list = new ArrayList<>();
            PreparedStatement job_statement = connection.prepareStatement("SELECT job_id, title, department, job_description, created_at, closes_at, workstyle, job_type, job_location FROM jobs WHERE company_id = ?");
            job_statement.setInt(1, company_id);
            ResultSet job_res = job_statement.executeQuery();
            while (job_res.next()) {
                Map<String, Object> map = new HashMap<>();
                map.put("company", company_name);
                map.put("logo", logo);
                map.put("job_id", job_res.getInt("job_id"));
                map.put("title", job_res.getString("title"));
                map.put("department", job_res.getString("department"));
                map.put("description", job_res.getString("job_description"));
                map.put("location", job_res.getString("job_location"));
                map.put("jobtype", job_res.getString("job_type"));
                map.put("workstyle", job_res.getString("workstyle"));
                map.put("deadline", job_res.getTimestamp("closes_at"));
                map.put("start", job_res.getTimestamp("created_at"));
                PreparedStatement st = connection.prepareStatement("SELECT COUNT(1) FROM applications WHERE job_id = ?");
                st.setInt(1, job_res.getInt("job_id"));
                ResultSet rs = st.executeQuery();
                if (rs.next()) {
                    map.put("applicant_count", rs.getInt(1));
                }
                rs.close();
                st.close();
                list.add(map);
            }
            job_res.close();
            job_statement.close();
            return list;
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public static Map<String, Object> jobDetails(Integer job_id) {
        try {
            PreparedStatement statement = connection.prepareStatement("SELECT * FROM jobs WHERE job_id = ?");
            statement.setInt(1, job_id);
            ResultSet res = statement.executeQuery();
            Map<String, Object> map = new HashMap<>();
            if (res.next()) {
                map.put("job_id", res.getInt("job_id"));
                map.put("company_id", res.getInt("company_id"));
                map.put("title", res.getString("title"));
                map.put("department", res.getString("department"));
                map.put("location", res.getString("job_location"));
                map.put("workstyle", res.getString("workstyle"));
                map.put("job_type", res.getString("job_type"));
                map.put("experience", res.getString("experience"));
                map.put("education", res.getString("education"));
                map.put("skills", res.getArray("skills").getArray());
                map.put("languages", res.getArray("languages").getArray());
                map.put("description", res.getString("job_description"));
                map.put("responsibilities", res.getString("responsibilities"));
                map.put("qualifications", res.getString("qualifications"));
                map.put("deadline", res.getTimestamp("closes_at"));
                map.put("start", res.getTimestamp("created_at"));
                map.put("openings", res.getInt("openings"));
                PreparedStatement st = connection.prepareStatement("SELECT COUNT(1) FROM applications WHERE job_id = ?");
                st.setInt(1, res.getInt("job_id"));
                ResultSet rs = st.executeQuery();
                if (rs.next()) {
                    map.put("applicant_count", rs.getInt(1));
                }
                rs.close();
                st.close();
            }
            res.close();
            statement.close();
            return map;
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public static List<Map<String, Object>> jobApplicants(String user_id, Integer job_id) {
        try {
            PreparedStatement job_statement = connection.prepareStatement("SELECT company_id FROM jobs WHERE job_id = ?");
            job_statement.setInt(1, job_id);
            ResultSet job_res = job_statement.executeQuery();
            int company_id = 0;
            if (job_res.next()) {
                company_id = job_res.getInt("company_id");
            }
            job_res.close();
            job_statement.close();

            PreparedStatement company_statement = connection.prepareStatement("SELECT user_id FROM companies WHERE company_id = ?");
            company_statement.setInt(1, company_id);
            ResultSet company_res = company_statement.executeQuery();
            String owner_id = "";
            if (company_res.next()) {
                owner_id = company_res.getString("user_id");
            }
            company_res.close();
            company_statement.close();

            if (!owner_id.equals(user_id))
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "You do not own this job");

            PreparedStatement applicant_statement = connection.prepareStatement("SELECT user_id, job_id, cv, similarity, application_date FROM applications WHERE job_id = ?");
            applicant_statement.setInt(1, job_id);
            ResultSet applicant_res = applicant_statement.executeQuery();
            List<Map<String, Object>> list = new ArrayList<>();
            while (applicant_res.next()) {
                Map<String, Object> map = GetUserInfo.fromUserID(applicant_res.getString("user_id"));
                if (map == null)
                    map = new HashMap<>();
                map.put("user_id", applicant_res.getString("user_id"));
                map.put("job_id", applicant_res.getString("job_id"));
                map.put("cv", applicant_res.getInt("cv"));
                map.put("similarity", applicant_res.getFloat("similarity"));
                map.put("applied_at", applicant_res.getTimestamp("application_date"));
                list.add(map);
            }
            applicant_res.close();
            applicant_statement.close();
            return list;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public static List<Map<String, Object>> businessApplications() {
        try {
            PreparedStatement applicant_statement = connection.prepareStatement("SELECT user_id, company_id, application_date FROM business_applications");
            ResultSet applicant_res = applicant_statement.executeQuery();
            List<Map<String, Object>> list = new ArrayList<>();
            while (applicant_res.next()) {
                Map<String, Object> map = GetUserInfo.fromUserID(applicant_res.getString("user_id"));
                if (map == null)
                    map = new HashMap<>();
                map.put("user_id", applicant_res.getString("user_id"));
                map.put("applied_at", applicant_res.getTimestamp("application_date"));

                PreparedStatement company_statement = connection.prepareStatement("SELECT company_name, industry, logo FROM companies WHERE company_id = ?");
                company_statement.setInt(1, applicant_res.getInt("company_id"));
                ResultSet company_res = company_statement.executeQuery();
                if (company_res.next()) {
                    map.put("company", company_res.getString("company_name"));
                    map.put("industry", company_res.getString("industry"));
                    map.put("logo", company_res.getInt("logo"));
                    map.put("company_id", applicant_res.getInt("company_id"));
                }
                company_res.close();
                company_statement.close();

                list.add(map);
            }
            applicant_res.close();
            applicant_statement.close();
            return list;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public static void removeCompany(String user_id) {
        try {
            PreparedStatement statement = connection.prepareStatement("DELETE FROM companies WHERE user_id = ?");
            statement.setString(1, user_id);
            statement.executeUpdate();
            statement.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    public static void removeBusinessApplication(String user_id) {
        try {
            PreparedStatement statement = connection.prepareStatement("DELETE FROM business_applications WHERE user_id = ?");
            statement.setString(1, user_id);
            statement.executeUpdate();
            statement.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    public static Map<String, Object> companyDetails(String user_id) {
        try {
            PreparedStatement company_statement = connection.prepareStatement("SELECT * FROM companies WHERE user_id = ?");
            company_statement.setString(1, user_id);
            ResultSet company_res = company_statement.executeQuery();
            Map<String, Object> map = new HashMap<>();
            if (company_res.next()) {
                map.put("user_id", company_res.getString("user_id"));
                map.put("company_id", company_res.getInt("company_id"));
                map.put("created_at", company_res.getTimestamp("created_at"));
                map.put("company", company_res.getString("company_name"));
                map.put("industry", company_res.getString("industry"));
                map.put("size", company_res.getString("company_size"));
                map.put("logo", company_res.getInt("logo"));
                map.put("founded", company_res.getInt("founded"));
                map.put("email", company_res.getString("email"));
                map.put("phone", company_res.getString("phone"));
                map.put("website", company_res.getString("website"));
                map.put("address", company_res.getString("company_location"));
                map.put("city", company_res.getString("company_city"));
                map.put("state", company_res.getString("company_state"));
                map.put("country", company_res.getString("company_country"));
                map.put("postal_code", company_res.getString("postal_code"));
                map.put("description", company_res.getString("about"));
                map.put("mission", company_res.getString("mission"));
                map.put("benefits", company_res.getString("benefits"));
            }
            company_res.close();
            company_statement.close();
            return map;
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public static Map<String, Object> companyDetails(Integer company_id) {
        try {
            PreparedStatement company_statement = connection.prepareStatement("SELECT * FROM companies WHERE company_id = ?");
            company_statement.setInt(1, company_id);
            ResultSet company_res = company_statement.executeQuery();
            Map<String, Object> map = new HashMap<>();
            if (company_res.next()) {
                map.put("user_id", company_res.getString("user_id"));
                map.put("company_id", company_res.getInt("company_id"));
                map.put("created_at", company_res.getTimestamp("created_at"));
                map.put("company", company_res.getString("company_name"));
                map.put("industry", company_res.getString("industry"));
                map.put("size", company_res.getString("company_size"));
                map.put("logo", company_res.getInt("logo"));
                map.put("founded", company_res.getInt("founded"));
                map.put("email", company_res.getString("email"));
                map.put("phone", company_res.getString("phone"));
                map.put("website", company_res.getString("website"));
                map.put("address", company_res.getString("company_location"));
                map.put("city", company_res.getString("company_city"));
                map.put("state", company_res.getString("company_state"));
                map.put("country", company_res.getString("company_country"));
                map.put("postal_code", company_res.getString("postal_code"));
                map.put("description", company_res.getString("about"));
                map.put("mission", company_res.getString("mission"));
                map.put("benefits", company_res.getString("benefits"));
            }
            company_res.close();
            company_statement.close();
            return map;
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public static void editCompany(String user_id, Map<String, Object> body) {
        try {
            PreparedStatement company_statement = connection.prepareStatement("UPDATE companies SET company_name = ?, industry = ?, company_size = ?, logo = ?, founded = ?, email = ?, phone = ?, website = ?, company_location = ?, company_city = ?, company_state = ?, company_country = ?, postal_code = ?, about = ?, mission = ?, benefits = ? WHERE user_id = ?");
            company_statement.setString(1, body.get("company").toString());
            company_statement.setString(2, body.get("industry").toString());
            company_statement.setString(3, body.get("size").toString());
            company_statement.setInt(4, (int) body.get("logo"));
            company_statement.setInt(5, (int) body.get("founded"));
            company_statement.setString(6, body.get("email").toString());
            company_statement.setString(7, body.get("phone").toString());
            company_statement.setString(8, body.get("website").toString());
            company_statement.setString(9, body.get("address").toString());
            company_statement.setString(10, body.get("city").toString());
            company_statement.setString(11, body.get("state").toString());
            company_statement.setString(12, body.get("country").toString());
            company_statement.setString(13, body.get("postal_code").toString());
            company_statement.setString(14, body.get("description").toString());
            company_statement.setString(15, body.get("mission").toString());
            company_statement.setString(16, body.get("benefits").toString());
            company_statement.setString(17, user_id);
            company_statement.executeUpdate();
            company_statement.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    public static List<Map<String, Object>> recentJobs(String user_id) {
        try {
            PreparedStatement statement = connection.prepareStatement("SELECT company_id, company_name, logo FROM companies WHERE user_id = ?");
            statement.setString(1, user_id);
            ResultSet res = statement.executeQuery();
            int company_id = 0;
            int logo = 0;
            String company_name = "";
            if (res.next()) {
                company_id = res.getInt("company_id");
                logo = res.getInt("logo");
                company_name = res.getString("company_name");
            }
            res.close();
            statement.close();

            List<Map<String, Object>> list = new ArrayList<>();
            PreparedStatement job_statement = connection.prepareStatement("SELECT job_id, title, department, job_description, job_location, job_type, workstyle, closes_at, created_at FROM jobs WHERE company_id = ? ORDER BY created_at DESC LIMIT 5");
            job_statement.setInt(1, company_id);
            ResultSet job_res = job_statement.executeQuery();
            while (job_res.next()) {
                Map<String, Object> map = new HashMap<>();
                map.put("company", company_name);
                map.put("logo", logo);
                map.put("job_id", job_res.getInt("job_id"));
                map.put("title", job_res.getString("title"));
                map.put("department", job_res.getString("department"));
                map.put("description", job_res.getString("job_description"));
                map.put("location", job_res.getString("job_location"));
                map.put("jobtype", job_res.getString("job_type"));
                map.put("workstyle", job_res.getString("workstyle"));
                map.put("deadline", job_res.getTimestamp("closes_at"));
                map.put("start", job_res.getTimestamp("created_at"));
                PreparedStatement st = connection.prepareStatement("SELECT COUNT(1) FROM applications WHERE job_id = ?");
                st.setInt(1, job_res.getInt("job_id"));
                ResultSet rs = st.executeQuery();
                if (rs.next()) {
                    map.put("applicant_count", rs.getInt(1));
                }
                rs.close();
                st.close();
                list.add(map);
            }
            job_res.close();
            job_statement.close();
            return list;
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public static List<Map<String, Object>> recentApplicants(String user_id) {
        try {
            PreparedStatement statement = connection.prepareStatement("SELECT company_id FROM companies WHERE user_id = ?");
            statement.setString(1, user_id);
            ResultSet res = statement.executeQuery();
            int company_id = 0;
            if (res.next())
                company_id = res.getInt("company_id");
            res.close();
            statement.close();

            String query = "SELECT user_id, job_id, similarity, application_date FROM applications WHERE 1=2";
            List<Integer> params = new ArrayList<>();

            PreparedStatement job_statement = connection.prepareStatement("SELECT job_id FROM jobs WHERE company_id = ?");
            job_statement.setInt(1, company_id);
            ResultSet job_res = job_statement.executeQuery();
            while (job_res.next()) {
                query += " OR job_id = ?";
                params.add(job_res.getInt("job_id"));
            }
            job_res.close();
            job_statement.close();

            query += " ORDER BY application_date DESC LIMIT 5";

            PreparedStatement applicant_statement = connection.prepareStatement(query);

            for (int i = 0; i < params.size(); i++)
                applicant_statement.setInt(i + 1, params.get(i));

            ResultSet applicant_res = applicant_statement.executeQuery();
            List<Map<String, Object>> list = new ArrayList<>();
            while (applicant_res.next()) {
                Map<String, Object> map = GetUserInfo.fromUserID(applicant_res.getString("user_id"));
                if (map == null)
                    map = new HashMap<>();
                map.put("user_id", applicant_res.getString("user_id"));
                map.put("job_id", applicant_res.getString("job_id"));
                map.put("similarity", applicant_res.getFloat("similarity"));
                map.put("applied_at", applicant_res.getTimestamp("application_date"));
                list.add(map);
            }
            applicant_res.close();
            applicant_statement.close();

            return list;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public static List<Map<String, Object>> allJobs() {
        try {
            PreparedStatement statement = connection.prepareStatement("SELECT * FROM jobs");
            ResultSet res = statement.executeQuery();
            List<Map<String, Object>> list = new ArrayList<>();
            while (res.next()) {
                Map<String, Object> map = new HashMap<>();
                map.put("job_id", res.getInt("job_id"));
                map.put("company_id", res.getInt("company_id"));
                map.put("title", res.getString("title"));
                map.put("department", res.getString("department"));
                map.put("location", res.getString("job_location"));
                map.put("workstyle", res.getString("workstyle"));
                map.put("job_type", res.getString("job_type"));
                map.put("experience", res.getString("experience"));
                map.put("education", res.getString("education"));
                map.put("skills", res.getArray("skills").getArray());
                map.put("languages", res.getArray("languages").getArray());
                map.put("description", res.getString("job_description"));
                map.put("responsibilities", res.getString("responsibilities"));
                map.put("qualifications", res.getString("qualifications"));
                map.put("deadline", res.getTimestamp("closes_at"));
                map.put("start", res.getTimestamp("created_at"));
                map.put("openings", res.getInt("openings"));
                PreparedStatement company_statement = connection.prepareStatement("SELECT company_name FROM companies WHERE company_id = ?");
                company_statement.setInt(1, res.getInt("company_id"));
                ResultSet company_res = company_statement.executeQuery();
                if (company_res.next()) {
                    map.put("company", company_res.getString("company_name"));
                }
                company_res.close();
                company_statement.close();
                list.add(map);
            }
            res.close();
            statement.close();
            return list;
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public static List<Map<String, Object>> allApplicants(String user_id) {
        try {
            PreparedStatement statement = connection.prepareStatement("SELECT company_id FROM companies WHERE user_id = ?");
            statement.setString(1, user_id);
            ResultSet res = statement.executeQuery();
            int company_id = 0;
            if (res.next())
                company_id = res.getInt("company_id");
            res.close();
            statement.close();

            String query = "SELECT user_id, job_id, similarity, application_date FROM applications WHERE 1=2";
            List<Integer> params = new ArrayList<>();

            PreparedStatement job_statement = connection.prepareStatement("SELECT job_id FROM jobs WHERE company_id = ?");
            job_statement.setInt(1, company_id);
            ResultSet job_res = job_statement.executeQuery();
            while (job_res.next()) {
                query += " OR job_id = ?";
                params.add(job_res.getInt("job_id"));
            }
            job_res.close();
            job_statement.close();

            query += " ORDER BY application_date DESC";

            PreparedStatement applicant_statement = connection.prepareStatement(query);

            for (int i = 0; i < params.size(); i++)
                applicant_statement.setInt(i + 1, params.get(i));

            ResultSet applicant_res = applicant_statement.executeQuery();
            List<Map<String, Object>> list = new ArrayList<>();
            while (applicant_res.next()) {
                Map<String, Object> map = GetUserInfo.fromUserID(applicant_res.getString("user_id"));
                if (map == null)
                    map = new HashMap<>();
                map.put("user_id", applicant_res.getString("user_id"));
                map.put("job_id", applicant_res.getString("job_id"));
                map.put("similarity", applicant_res.getFloat("similarity"));
                map.put("applied_at", applicant_res.getTimestamp("application_date"));
                list.add(map);
            }
            applicant_res.close();
            applicant_statement.close();

            return list;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public static Map<String, Object> applicantInfo(String user_id, Integer job_id, String user) {
        try {
            PreparedStatement job_statement = connection.prepareStatement("SELECT company_id FROM jobs WHERE job_id = ?");
            job_statement.setInt(1, job_id);
            ResultSet job_res = job_statement.executeQuery();
            int company_id = 0;
            if (job_res.next()) {
                company_id = job_res.getInt("company_id");
            }
            job_res.close();
            job_statement.close();

            PreparedStatement company_statement = connection.prepareStatement("SELECT user_id FROM companies WHERE company_id = ?");
            company_statement.setInt(1, company_id);
            ResultSet company_res = company_statement.executeQuery();
            String owner_id = "";
            if (company_res.next()) {
                owner_id = company_res.getString("user_id");
            }
            company_res.close();
            company_statement.close();

            if (!owner_id.equals(user_id))
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "You do not own this job");

            PreparedStatement applicant_statement = connection.prepareStatement("SELECT user_id, job_id, cv, similarity, application_date FROM applications WHERE job_id = ? AND user_id = ?");
            applicant_statement.setInt(1, job_id);
            applicant_statement.setString(2, user);
            ResultSet applicant_res = applicant_statement.executeQuery();
            Map<String, Object> map = new HashMap<>();
            if (applicant_res.next()) {
                map = GetUserInfo.fromUserID(applicant_res.getString("user_id"));
                if (map == null)
                    map = new HashMap<>();
                map.put("user_id", applicant_res.getString("user_id"));
                map.put("job_id", applicant_res.getString("job_id"));
                map.put("cv", applicant_res.getInt("cv"));
                map.put("similarity", applicant_res.getFloat("similarity"));
                map.put("applied_at", applicant_res.getTimestamp("application_date"));
            }
            applicant_res.close();
            applicant_statement.close();
            return map;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public static Map<String, Integer> adminstats() {
        try {
            PreparedStatement statement = connection.prepareStatement("SELECT COUNT(1) FROM companies");
            ResultSet res = statement.executeQuery();
            int company_count = 0;
            if (res.next()) {
                company_count = res.getInt(1);
            }
            res.close();
            statement.close();

            PreparedStatement job_statement = connection.prepareStatement("SELECT COUNT(1) FROM jobs");
            ResultSet job_res = job_statement.executeQuery();
            int job_count = 0;
            if (job_res.next()) {
                job_count = job_res.getInt(1);
            }
            job_res.close();
            job_statement.close();

            PreparedStatement business_statement = connection.prepareStatement("SELECT COUNT(1) FROM business_applications");
            ResultSet business_res = business_statement.executeQuery();
            int business_pending = 0;
            if (business_res.next()) {
                business_pending = business_res.getInt(1);
            }
            business_res.close();
            business_statement.close();

            Map<String, Integer> map = new HashMap<>();
            int size = 0;
            List<Map<String, Object>> users = GetUserInfo.users();
            if (users != null)
                size = users.size();
            map.put("user_count", size);
            map.put("company_count", company_count - business_pending);
            map.put("job_count", job_count);
            map.put("business_pending", business_pending);
            return map;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public static List<Map<String, Object>> getNotifications(String user_id) {
        try {
            PreparedStatement statement = connection.prepareStatement("SELECT notification_id, title, content, is_read, created_at FROM notifications WHERE user_id = ?");
            statement.setString(1, user_id);
            ResultSet res = statement.executeQuery();

            List<Map<String, Object>> list = new ArrayList<>();
            while (res.next()) {
                Map<String, Object> map = new HashMap<>();
                map.put("id", res.getInt("notification_id"));
                map.put("title", res.getString("title"));
                map.put("content", res.getString("content"));
                map.put("is_read", res.getBoolean("is_read"));
                map.put("sent_at", res.getTimestamp("created_at"));
                list.add(map);
            }
            res.close();
            statement.close();
            return list;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public static void sendNotification(String user_id, String title, String content) {
        try {
            PreparedStatement statement = connection.prepareStatement("INSERT INTO notifications (user_id, title, content) VALUES (?, ?, ?)");
            statement.setString(1, user_id);
            statement.setString(2, title);
            statement.setString(3, content);
            statement.executeUpdate();
            statement.close();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    public static void markAsRead(String user_id, Integer notification_id) {
        try {
            PreparedStatement statement = connection.prepareStatement("UPDATE notifications SET is_read = ? WHERE user_id = ? AND notification_id = ?");
            statement.setBoolean(1, true);
            statement.setString(2, user_id);
            statement.setInt(3, notification_id);
            statement.executeUpdate();
            statement.close();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    public static void logActivity(String activity, String type) {
        try {
            PreparedStatement statement = connection.prepareStatement("INSERT INTO activities (activity, type) VALUES (?, ?)");
            statement.setString(1, activity);
            statement.setString(2, type);
            statement.executeUpdate();
            statement.close();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    public static List<Map<String, Object>> getActivities() {
        try {
            PreparedStatement statement = connection.prepareStatement("SELECT * FROM activities ORDER BY event_time DESC");
            ResultSet res = statement.executeQuery();

            List<Map<String, Object>> list = new ArrayList<>();
            while (res.next()) {
                Map<String, Object> map = new HashMap<>();
                map.put("activity", res.getString("activity"));
                map.put("type", res.getString("type"));
                map.put("event_time", res.getTimestamp("event_time"));
                list.add(map);
            }
            res.close();
            statement.close();
            return list;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }
}
