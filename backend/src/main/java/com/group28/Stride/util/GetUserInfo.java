package com.group28.Stride.util;

import com.clerk.backend_api.Clerk;
import com.clerk.backend_api.models.operations.GetUserResponse;
import com.google.gson.Gson;
import io.github.cdimascio.dotenv.Dotenv;
import redis.clients.jedis.UnifiedJedis;
import java.util.HashMap;

public class GetUserInfo {
    public static HashMap<String, Object> fromUserID(String user_id) throws Exception {
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

        GetUserResponse res = sdk.users().get()
                .userId(user_id)
                .call();

        if (res.user().isEmpty())
            return null;

        HashMap<String, Object> user = new HashMap<>();

        user.put("first_name", res.user().get().firstName().get());
        user.put("last_name", res.user().get().lastName().get());

        if (dotenv.get("REDIS_ENABLE").equals("true")) {
            try (UnifiedJedis jedis = new UnifiedJedis(String.format("redis://%s:%s", dotenv.get("REDIS_HOST"), dotenv.get("REDIS_PORT")))) {
                jedis.setex(user_id, Integer.parseInt(dotenv.get("REDIS_EXPIRE")), gson.toJson(user));
            } catch (Exception ex) {
                System.out.println(ex.getMessage());
            }
        }

        return user;
    }
}
