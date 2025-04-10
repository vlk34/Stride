package com.group28.Stride.util;

import com.clerk.backend_api.Clerk;
import com.clerk.backend_api.models.components.User;
import com.clerk.backend_api.models.operations.*;
import com.google.gson.Gson;
import io.github.cdimascio.dotenv.Dotenv;
import redis.clients.jedis.UnifiedJedis;

import java.lang.Object;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GetUserInfo {
    public static Map<String, Object> fromUserID(String user_id) throws Exception {
        Dotenv dotenv = Dotenv.configure()
                .directory("backend")
                .load();

        Gson gson = new Gson();

        if (dotenv.get("REDIS_ENABLE").equals("true")) {
            try (UnifiedJedis jedis = new UnifiedJedis(String.format("redis://%s:%s", dotenv.get("REDIS_HOST"), dotenv.get("REDIS_PORT")))) {
                if (jedis.exists(user_id)) {
                    return gson.fromJson(jedis.get(user_id), HashMap.class);
                }
            } catch (Exception ex) {
                System.out.println(ex.getMessage());
            }
        }

        Clerk sdk = Clerk.builder()
                .bearerAuth(dotenv.get("SECRET"))
                .build();

        GetUserListRequest req = GetUserListRequest.builder().build();

        GetUserListResponse res = sdk.users().list().request(req).call();

        if (res.userList().isEmpty())
            return null;

        HashMap<String, HashMap<String, Object>> users = new HashMap<>();

        for (User clerk_user : res.userList().get()) {
            HashMap<String, Object> user = new HashMap<>();
            user.put("name", clerk_user.firstName().get() + " " + clerk_user.lastName().get());
            if (clerk_user.emailAddresses().isPresent())
                user.put("email", clerk_user.emailAddresses().get().getFirst().emailAddress());
            if (clerk_user.imageUrl().isPresent())
                user.put("image", clerk_user.imageUrl().get());
            if (clerk_user.publicMetadata().isPresent() && clerk_user.publicMetadata().get().get("role") != null)
                user.put("role", clerk_user.publicMetadata().get().get("role"));
            if (clerk_user.unsafeMetadata().isPresent() && clerk_user.unsafeMetadata().get().get("role") != null)
                user.put("unsafeRole", clerk_user.unsafeMetadata().get().get("role"));
            if (clerk_user.unsafeMetadata().isPresent() && clerk_user.unsafeMetadata().get().get("phone") != null)
                user.put("phone", clerk_user.unsafeMetadata().get().get("phone"));
            if (clerk_user.unsafeMetadata().isPresent() && clerk_user.unsafeMetadata().get().get("about") != null)
                user.put("about", clerk_user.unsafeMetadata().get().get("about"));
            if (clerk_user.unsafeMetadata().isPresent() && clerk_user.unsafeMetadata().get().get("education") != null)
                user.put("education", clerk_user.unsafeMetadata().get().get("education"));
            if (clerk_user.unsafeMetadata().isPresent() && clerk_user.unsafeMetadata().get().get("experiences") != null)
                user.put("experiences", clerk_user.unsafeMetadata().get().get("experiences"));
            if (clerk_user.unsafeMetadata().isPresent() && clerk_user.unsafeMetadata().get().get("skills") != null)
                user.put("skills", clerk_user.unsafeMetadata().get().get("skills"));
            if (clerk_user.id().isPresent())
                users.put(clerk_user.id().get(), user);
        }

        if (dotenv.get("REDIS_ENABLE").equals("true")) {
            try (UnifiedJedis jedis = new UnifiedJedis(String.format("redis://%s:%s", dotenv.get("REDIS_HOST"), dotenv.get("REDIS_PORT")))) {
                for (Map.Entry<String, HashMap<String, Object>> entry : users.entrySet()) {
                    jedis.setex(entry.getKey(), Integer.parseInt(dotenv.get("REDIS_EXPIRE")), gson.toJson(entry.getValue()));
                }
            } catch (Exception ex) {
                System.out.println(ex.getMessage());
            }
        }

        return users.get(user_id);
    }

    public static List<Map<String, Object>> users() throws Exception {
        Dotenv dotenv = Dotenv.configure()
                .directory("backend")
                .load();

        Clerk sdk = Clerk.builder()
                .bearerAuth(dotenv.get("SECRET"))
                .build();

        GetUserListRequest req = GetUserListRequest.builder().build();

        GetUserListResponse res = sdk.users().list().request(req).call();

        if (res.userList().isEmpty())
            return null;

        List<Map<String, Object>> users = new ArrayList<>();

        for (User clerk_user : res.userList().get()) {
            Map<String, Object> user = new HashMap<>();
            user.put("name", clerk_user.firstName().get() + " " + clerk_user.lastName().get());
            if (clerk_user.emailAddresses().isPresent())
                user.put("email", clerk_user.emailAddresses().get().getFirst().emailAddress());
            if (clerk_user.imageUrl().isPresent())
                user.put("image", clerk_user.imageUrl().get());
            if (clerk_user.id().isPresent())
                user.put("user_id", clerk_user.id().get());
            if (clerk_user.publicMetadata().isPresent() && clerk_user.publicMetadata().get().get("role") != null)
                user.put("role", clerk_user.publicMetadata().get().get("role"));
            users.add(user);
        }

        return users;
    }

    public static void businessUpgrade(String user_id) throws Exception {
        Dotenv dotenv = Dotenv.configure()
                .directory("backend")
                .load();

        Clerk sdk = Clerk.builder()
                .bearerAuth(dotenv.get("SECRET"))
                .build();

        UpdateUserMetadataResponse res = sdk.users().updateMetadata()
                .userId(user_id)
                .requestBody(UpdateUserMetadataRequestBody.builder().publicMetadata(Map.of("role", "business")).build())
                .call();

        if (res.user().isEmpty()) {
            throw new Exception("User not found");
        }
    }

    public static void businessDowngrade(String user_id) throws Exception {
        Dotenv dotenv = Dotenv.configure()
                .directory("backend")
                .load();

        Clerk sdk = Clerk.builder()
                .bearerAuth(dotenv.get("SECRET"))
                .build();

        UpdateUserMetadataResponse res = sdk.users().updateMetadata()
                .userId(user_id)
                .requestBody(UpdateUserMetadataRequestBody.builder().publicMetadata(Map.of("role", "user")).build())
                .call();

        if (res.user().isEmpty()) {
            throw new Exception("User not found");
        }
    }

    public static void deleteUser(String user_id) throws Exception {
        Dotenv dotenv = Dotenv.configure()
                .directory("backend")
                .load();

        Clerk sdk = Clerk.builder()
                .bearerAuth(dotenv.get("SECRET"))
                .build();

        DeleteUserResponse res = sdk.users().delete()
                .userId(user_id)
                .call();

        if (res.deletedObject().isPresent())
            Database.removeCompany(user_id);
    }
}
