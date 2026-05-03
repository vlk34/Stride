package com.group28.Stride.util;

import com.clerk.backend_api.helpers.jwks.AuthenticateRequest;
import com.clerk.backend_api.helpers.jwks.AuthenticateRequestOptions;
import com.clerk.backend_api.helpers.jwks.RequestState;
import io.jsonwebtoken.Claims;
import java.util.List;
import java.util.Map;

public class Authentication {
    public static Claims getClaims(String auth) {
        RequestState requestState = AuthenticateRequest.authenticateRequest(Map.of("Authorization", List.of(auth)), AuthenticateRequestOptions
                .secretKey(Env.get().get("SECRET"))
                .build());

        if (requestState.isSignedIn() && requestState.claims().isPresent())
            return requestState.claims().get();
        return null;
    }
}
