package com.group28.Stride.controller;

import com.group28.Stride.util.Authentication;
import com.group28.Stride.util.Database;
import com.group28.Stride.util.GetUserInfo;
import io.jsonwebtoken.Claims;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class AdminController {
    @CrossOrigin
    @PostMapping("/upgradeuser")
    public ResponseEntity<String> upgradeuser(@RequestBody Map<String, Object> body, @RequestHeader("Authorization") String auth) throws Exception {
        Claims user_claims = Authentication.getClaims(auth);
        if (user_claims == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        String role = (String) user_claims.get("metadata", HashMap.class).get("role");
        if (!"admin".equalsIgnoreCase(role))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");

        GetUserInfo.businessUpgrade(body.get("user_id").toString());
        Database.removeBusinessApplication(body.get("user_id").toString());

        return new ResponseEntity<>("Successful", HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping("/descenduser")
    public ResponseEntity<String> descenduser(@RequestBody Map<String, Object> body, @RequestHeader("Authorization") String auth) throws Exception {
        Claims user_claims = Authentication.getClaims(auth);
        if (user_claims == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        String role = (String) user_claims.get("metadata", HashMap.class).get("role");
        if (!"admin".equalsIgnoreCase(role))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");

        GetUserInfo.businessDowngrade(body.get("user_id").toString());
        Database.removeCompany(body.get("user_id").toString());

        return new ResponseEntity<>("Successful", HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping("/declineupgrade")
    public ResponseEntity<String> declineupgrade(@RequestBody Map<String, Object> body, @RequestHeader("Authorization") String auth) {
        Claims user_claims = Authentication.getClaims(auth);
        if (user_claims == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        String role = (String) user_claims.get("metadata", HashMap.class).get("role");
        if (!"admin".equalsIgnoreCase(role))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");

        Database.removeCompany(body.get("user_id").toString());
        Database.removeBusinessApplication(body.get("user_id").toString());
        Database.sendNotification(body.get("user_id").toString(), "Business Application Info", "Your business upgrade request is declined.");

        return new ResponseEntity<>("Successful", HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/applications")
    public List<Map<String, Object>> applications(@RequestHeader("Authorization") String auth) {
        Claims user_claims = Authentication.getClaims(auth);
        if (user_claims == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        String role = (String) user_claims.get("metadata", HashMap.class).get("role");
        if (!"admin".equalsIgnoreCase(role))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");

        return Database.businessApplications();
    }

    @CrossOrigin
    @GetMapping("/users")
    public List<Map<String, Object>> users(@RequestHeader("Authorization") String auth) throws Exception {
        Claims user_claims = Authentication.getClaims(auth);
        if (user_claims == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        String role = (String) user_claims.get("metadata", HashMap.class).get("role");
        if (!"admin".equalsIgnoreCase(role))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");

        return GetUserInfo.users();
    }

    @CrossOrigin
    @GetMapping("/alljobs")
    public List<Map<String, Object>> alljobs(@RequestHeader("Authorization") String auth) {
        Claims user_claims = Authentication.getClaims(auth);
        if (user_claims == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        String role = (String) user_claims.get("metadata", HashMap.class).get("role");
        if (!"admin".equalsIgnoreCase(role))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");

        return Database.allJobs();
    }

    @CrossOrigin
    @GetMapping("/adminstats")
    public Map<String, Integer> adminstats(@RequestHeader("Authorization") String auth) {
        Claims user_claims = Authentication.getClaims(auth);
        if (user_claims == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        String role = (String) user_claims.get("metadata", HashMap.class).get("role");
        if (!"admin".equalsIgnoreCase(role))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");

        return Database.adminstats();
    }
}
