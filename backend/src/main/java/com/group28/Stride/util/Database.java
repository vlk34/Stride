package com.group28.Stride.util;

import io.github.cdimascio.dotenv.Dotenv;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Database {
    private static final Dotenv dotenv;

    static {
        dotenv = Dotenv.configure()
                .directory("backend")
                .load();
    }

    public static void basicQuery(String query) {
        try {
            Connection connection = DriverManager.getConnection(String.format("jdbc:postgresql://%s:%s/%s", dotenv.get("DB_HOST"), dotenv.get("DB_PORT"), dotenv.get("DB_NAME")), dotenv.get("DB_USER"), dotenv.get("DB_PASSWORD"));
            Statement statement = connection.createStatement();
            ResultSet res = statement.executeQuery(query);
            while (res.next()) {
                System.out.println(res.getString("title"));
            }
            res.close();
            statement.close();
            connection.close();
        } catch (SQLException ex) {
            System.out.println("Database Error");
        }
    }

    public static List<Map<String, Object>> jobQuery(String q, String workstyle, String jobtype, String industry) {
        try {
            Connection connection = DriverManager.getConnection(String.format("jdbc:postgresql://%s:%s/%s", dotenv.get("DB_HOST"), dotenv.get("DB_PORT"), dotenv.get("DB_NAME")), dotenv.get("DB_USER"), dotenv.get("DB_PASSWORD"));
            PreparedStatement statement = connection.prepareStatement("SELECT job_id, title, job_description FROM jobs WHERE title ILIKE ? AND workstyle = ? AND job_type = ? AND department = ?");
            statement.setString(1, "%" + q + "%");
            statement.setString(2, workstyle);
            statement.setString(3, jobtype);
            statement.setString(4, industry);
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
            connection.close();
            return list;
        } catch (SQLException ex) {
            ex.printStackTrace();
            return null;
        }
    }
}
