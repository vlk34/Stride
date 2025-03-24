package com.group28.Stride.controller;

import com.group28.Stride.util.Authentication;
import com.group28.Stride.util.Database;
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
public class UserController {
    @CrossOrigin
    @GetMapping("/search")
    public List<Map<String, Object>> search(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String workstyle,
            @RequestParam(required = false) String jobtype,
            @RequestParam(required = false) String industry
    ) {
        return Database.jobQuery(q, workstyle, jobtype, industry);
    }

    @CrossOrigin
    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody Map<String, Object> body, HttpServletRequest request) throws IOException {
        String user_id = Authentication.getClaims(request).getSubject();
        if (user_id == null)
            return new ResponseEntity<>("Not authenticated", HttpStatus.UNAUTHORIZED);

        Database.saveJob(user_id, (int) body.get("job_id"));

        return new ResponseEntity<>("Successful", HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping("/unsave")
    public ResponseEntity<String> unsave(@RequestBody Map<String, Object> body, HttpServletRequest request) throws IOException {
        String user_id = Authentication.getClaims(request).getSubject();
        if (user_id == null)
            return new ResponseEntity<>("Not authenticated", HttpStatus.UNAUTHORIZED);

        Database.unsaveJob(user_id, (int) body.get("job_id"));

        return new ResponseEntity<>("Successful", HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/saved")
    public List<Map<String, Object>> saved(HttpServletRequest request) throws IOException {
        String user_id = Authentication.getClaims(request).getSubject();
        if (user_id == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");

        return Database.saved(user_id);
    }

    @CrossOrigin
    @PostMapping("/apply")
    public ResponseEntity<String> apply(@RequestBody Map<String, Object> body, HttpServletRequest request) throws IOException {
        String user_id = Authentication.getClaims(request).getSubject();
        if (user_id == null)
            return new ResponseEntity<>("Not authenticated", HttpStatus.UNAUTHORIZED);

        Database.applyJob(user_id, (int) body.get("job_id"));

        return new ResponseEntity<>("Successful", HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/applied")
    public List<Map<String, Object>> applied(HttpServletRequest request) throws IOException {
        String user_id = Authentication.getClaims(request).getSubject();
        if (user_id == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");

        return Database.applied(user_id);
    }

    @CrossOrigin
    @PostMapping("/upgrade")
    public ResponseEntity<String> upgrade(@RequestBody Map<String, Object> body, HttpServletRequest request) throws IOException {
        String user_id = Authentication.getClaims(request).getSubject();
        if (user_id == null)
            return new ResponseEntity<>("Not authenticated", HttpStatus.UNAUTHORIZED);
        String role = (String) Authentication.getClaims(request).get("metadata", HashMap.class).get("role");

        if (role == null || (!role.equalsIgnoreCase("business") && !role.equalsIgnoreCase("admin"))) {
            Database.upgrade(user_id, body);
            return new ResponseEntity<>("Successful", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Already upgraded", HttpStatus.CONFLICT);
        }
    }
}
