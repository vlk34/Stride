package com.group28.Stride.util;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.*;
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
            statement.close();
            return map;
        } catch (SQLException | IOException ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public static List<Map<String, Object>> jobQuery(String q, String workstyle, String jobtype, String industry) {
        try {
            String query = "SELECT job_id, company_id, title, job_description FROM jobs WHERE 1=1";
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
                PreparedStatement job_statement = connection.prepareStatement("SELECT title, company_id, job_description FROM jobs WHERE job_id = ?");
                job_statement.setInt(1, job_id);
                ResultSet job_res = job_statement.executeQuery();
                int company_id = 0;
                if (job_res.next()) {
                    company_id = job_res.getInt("company_id");
                    map.put("title", job_res.getString("title"));
                    map.put("description", job_res.getString("job_description"));
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

    public static void applyJob(String user_id, int job_id) {
        try {
            PreparedStatement statement = connection.prepareStatement("INSERT INTO applications (user_id, job_id) VALUES (?, ?)");
            statement.setString(1, user_id);
            statement.setInt(2, job_id);
            statement.executeUpdate();
            statement.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    public static List<Map<String, Object>> applied(String user_id) {
        try {
            PreparedStatement statement = connection.prepareStatement("SELECT user_id, job_id FROM applied WHERE user_id = ?");
            statement.setString(1, user_id);
            ResultSet res = statement.executeQuery();
            List<Map<String, Object>> list = new ArrayList<>();
            while (res.next()) {
                Map<String, Object> map = new HashMap<>();
                int job_id = res.getInt("job_id");
                map.put("job_id", job_id);
                PreparedStatement job_statement = connection.prepareStatement("SELECT title, company_id, job_description FROM jobs WHERE job_id = ?");
                job_statement.setInt(1, job_id);
                ResultSet job_res = job_statement.executeQuery();
                int company_id = 0;
                if (job_res.next()) {
                    company_id = job_res.getInt("company_id");
                    map.put("title", job_res.getString("title"));
                    map.put("description", job_res.getString("job_description"));
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
}
