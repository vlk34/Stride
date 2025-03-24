package com.group28.Stride.util;

import io.github.cdimascio.dotenv.Dotenv;
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

    public static List<Map<String, Object>> jobQuery(String q, String workstyle, String jobtype, String industry) {
        try {
            String query = "SELECT job_id, title, job_description FROM jobs WHERE 1=1";
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
                PreparedStatement statement2 = connection.prepareStatement("SELECT title, company_id, job_description FROM jobs WHERE job_id = ?");
                statement2.setInt(1, job_id);
                ResultSet res2 = statement2.executeQuery();
                int company_id = 0;
                if (res2.next()) {
                    company_id = res2.getInt("company_id");
                    map.put("title", res2.getString("title"));
                    map.put("description", res2.getString("job_description"));
                }
                res2.close();
                statement2.close();
                PreparedStatement statement3 = connection.prepareStatement("SELECT company_name, logo FROM companies WHERE company_id = ?");
                statement3.setInt(1, company_id);
                ResultSet res3 = statement3.executeQuery();
                if (res3.next()) {
                    map.put("company", res3.getString("company_name"));
                    map.put("logo", res3.getInt("logo"));
                }
                res3.close();
                statement3.close();
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
}
