package com.group28.Stride.util;

import com.clerk.backend_api.Clerk;
import com.clerk.backend_api.models.components.User;
import com.clerk.backend_api.models.operations.GetUserResponse;
import io.github.cdimascio.dotenv.Dotenv;

public class GetUserInfo {
    public static User fromUserID(String user_id) throws Exception {
        Dotenv dotenv = Dotenv.configure()
                .directory("backend")
                .load();

        Clerk sdk = Clerk.builder()
                .bearerAuth(dotenv.get("SECRET"))
                .build();

        GetUserResponse res = sdk.users().get()
                .userId(user_id)
                .call();

        if (res.user().isPresent())
            return res.user().get();
        return null;
    }
}
