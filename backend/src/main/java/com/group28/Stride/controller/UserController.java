package com.group28.Stride.controller;

import com.group28.Stride.util.Authentication;
import com.group28.Stride.util.Database;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class UserController {
    @CrossOrigin
    @GetMapping("/images/{id}")
    public ResponseEntity<byte[]> image(@PathVariable int id) {
        Map<String, Object> img = Database.getImage(id);
        if (img == null || img.get("data") == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok().contentType(MediaType.valueOf(img.get("content").toString())).body((byte[]) img.get("data"));
    }

    @CrossOrigin
    @PostMapping("/images/upload")
    public Map<String, Integer> upload(@RequestParam("file") MultipartFile file) {
        return Database.saveImage(file);
    }

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

    @GetMapping("/details")
    public Map<String, Object> details(@RequestParam Integer job) throws IOException {
        return Database.jobDetails(job);
    }

    @CrossOrigin
    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody Map<String, Object> body, HttpServletRequest request) throws IOException {
        Claims user_claims = Authentication.getClaims(request);
        if (user_claims == null)
            return new ResponseEntity<>("Not authenticated", HttpStatus.UNAUTHORIZED);
        String user_id = user_claims.getSubject();

        Database.saveJob(user_id, (int) body.get("job_id"));

        return new ResponseEntity<>("Successful", HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping("/unsave")
    public ResponseEntity<String> unsave(@RequestBody Map<String, Object> body, HttpServletRequest request) throws IOException {
        Claims user_claims = Authentication.getClaims(request);
        if (user_claims == null)
            return new ResponseEntity<>("Not authenticated", HttpStatus.UNAUTHORIZED);
        String user_id = user_claims.getSubject();

        Database.unsaveJob(user_id, (int) body.get("job_id"));

        return new ResponseEntity<>("Successful", HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/saved")
    public List<Map<String, Object>> saved(HttpServletRequest request) throws IOException {
        Claims user_claims = Authentication.getClaims(request);
        if (user_claims == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        String user_id = user_claims.getSubject();

        return Database.saved(user_id);
    }

    @CrossOrigin
    @PostMapping("/apply")
    public ResponseEntity<String> apply(@RequestBody Map<String, Object> body, HttpServletRequest request) throws IOException {
        Claims user_claims = Authentication.getClaims(request);
        if (user_claims == null)
            return new ResponseEntity<>("Not authenticated", HttpStatus.UNAUTHORIZED);
        String user_id = user_claims.getSubject();

        Database.applyJob(user_id, (int) body.get("job_id"));

        return new ResponseEntity<>("Successful", HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/applied")
    public List<Map<String, Object>> applied(HttpServletRequest request) throws IOException {
        Claims user_claims = Authentication.getClaims(request);
        if (user_claims == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        String user_id = user_claims.getSubject();

        return Database.applied(user_id);
    }

    @CrossOrigin
    @PostMapping("/upgrade")
    public ResponseEntity<String> upgrade(@RequestBody Map<String, Object> body, HttpServletRequest request) throws IOException {
        Claims user_claims = Authentication.getClaims(request);
        if (user_claims == null)
            return new ResponseEntity<>("Not authenticated", HttpStatus.UNAUTHORIZED);
        String user_id = user_claims.getSubject();
        String role = (String) user_claims.get("metadata", HashMap.class).get("role");

        if (!("business".equalsIgnoreCase(role) || "admin".equalsIgnoreCase(role))) {
            Database.upgrade(user_id, body);
            return new ResponseEntity<>("Successful", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Already upgraded", HttpStatus.CONFLICT);
        }
    }
}
