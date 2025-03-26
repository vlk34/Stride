package com.group28.Stride.controller;

import com.group28.Stride.util.Authentication;
import com.group28.Stride.util.GetUserInfo;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@RestController
public class AdminController {
    @CrossOrigin
    @PostMapping("/upgradeuser")
    public ResponseEntity<String> upgradeuser(@RequestBody Map<String, Object> body, HttpServletRequest request) throws Exception {
        Claims user_claims = Authentication.getClaims(request);
        if (user_claims == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        String role = (String) user_claims.get("metadata", HashMap.class).get("role");
        if (!"admin".equalsIgnoreCase(role))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");

        GetUserInfo.businessUpgrade(body.get("user_id").toString());

        return new ResponseEntity<>("Successful", HttpStatus.OK);
    }
}
