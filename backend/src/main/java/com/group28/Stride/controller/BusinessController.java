package com.group28.Stride.controller;

import com.group28.Stride.util.Authentication;
import com.group28.Stride.util.Database;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class BusinessController {
    @CrossOrigin
    @GetMapping("/stats")
    public Map<String, Integer> stats(HttpServletRequest request) throws IOException {
        Claims user_claims = Authentication.getClaims(request);
        if (user_claims == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        String user_id = user_claims.getSubject();
        String role = (String) user_claims.get("metadata", HashMap.class).get("role");
        if (!"business".equalsIgnoreCase(role))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");

        return Database.stats(user_id);
    }

    @CrossOrigin
    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody Map<String, Object> body, HttpServletRequest request) throws IOException {
        Claims user_claims = Authentication.getClaims(request);
        if (user_claims == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        String user_id = user_claims.getSubject();
        String role = (String) user_claims.get("metadata", HashMap.class).get("role");
        if (!"business".equalsIgnoreCase(role))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");

        Database.createJob(user_id, body);

        return new ResponseEntity<>("Successful", HttpStatus.OK);
    }

    @CrossOrigin
    @PutMapping("/update")
    public ResponseEntity<String> update(@RequestBody Map<String, Object> body, HttpServletRequest request) throws IOException {
        Claims user_claims = Authentication.getClaims(request);
        if (user_claims == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        String user_id = user_claims.getSubject();
        String role = (String) user_claims.get("metadata", HashMap.class).get("role");
        if (!"business".equalsIgnoreCase(role))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");

        Database.updateJob(user_id, body);

        return new ResponseEntity<>("Successful", HttpStatus.OK);
    }

    @CrossOrigin
    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestBody Map<String, Object> body, HttpServletRequest request) throws IOException {
        Claims user_claims = Authentication.getClaims(request);
        if (user_claims == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        String user_id = user_claims.getSubject();
        String role = (String) user_claims.get("metadata", HashMap.class).get("role");
        if (!"business".equalsIgnoreCase(role))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");

        Database.deleteJob(user_id, (int) body.get("job_id"));

        return new ResponseEntity<>("Successful", HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/jobs")
    public List<Map<String, Object>> jobs(HttpServletRequest request) throws IOException {
        Claims user_claims = Authentication.getClaims(request);
        if (user_claims == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        String user_id = user_claims.getSubject();
        String role = (String) user_claims.get("metadata", HashMap.class).get("role");
        if (!"business".equalsIgnoreCase(role))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");

        return Database.jobs(user_id);
    }

    @CrossOrigin
    @GetMapping("/applicants")
    public List<Map<String, Object>> applicants(@RequestParam Integer job, HttpServletRequest request) throws IOException {
        Claims user_claims = Authentication.getClaims(request);
        if (user_claims == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        String user_id = user_claims.getSubject();
        String role = (String) user_claims.get("metadata", HashMap.class).get("role");
        if (!"business".equalsIgnoreCase(role))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");

        return Database.jobApplicants(user_id, job);
    }

    @CrossOrigin
    @PutMapping("/editcompany")
    public ResponseEntity<String> editcompany(@RequestBody Map<String, Object> body, HttpServletRequest request) throws IOException {
        Claims user_claims = Authentication.getClaims(request);
        if (user_claims == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        String user_id = user_claims.getSubject();
        String role = (String) user_claims.get("metadata", HashMap.class).get("role");
        if (!"business".equalsIgnoreCase(role))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");

        Database.editCompany(user_id, body);

        return new ResponseEntity<>("Successful", HttpStatus.OK);
    }
}
