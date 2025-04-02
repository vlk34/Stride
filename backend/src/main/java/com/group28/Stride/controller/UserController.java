package com.group28.Stride.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.group28.Stride.util.Authentication;
import com.group28.Stride.util.Database;

import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;

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
        if (!("image/png".equals(file.getContentType()) || "image/jpeg".equals(file.getContentType())))
            throw new ResponseStatusException(HttpStatus.UNSUPPORTED_MEDIA_TYPE, "Not a PNG or JPEG file");

        return Database.saveImage(file);
    }

    @CrossOrigin
    @GetMapping("/resume/{id}")
    public ResponseEntity<byte[]> resume(@PathVariable int id) {
        Map<String, Object> cv = Database.getResume(id);
        if (cv == null || cv.get("data") == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok().contentType(MediaType.valueOf(cv.get("content").toString())).body((byte[]) cv.get("data"));
    }

    @CrossOrigin
    @PostMapping("/resume/upload")
    public Map<String, Integer> resume_upload(@RequestParam("file") MultipartFile file) {
        if (!"application/pdf".equals(file.getContentType()))
            throw new ResponseStatusException(HttpStatus.UNSUPPORTED_MEDIA_TYPE, "Not a PDF file");

        return Database.saveResume(file);
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

    @CrossOrigin
    @GetMapping("/details")
    public Map<String, Object> details(@RequestParam Integer job) throws IOException {
        return Database.jobDetails(job);
    }

    @CrossOrigin
    @GetMapping("/company/{id}")
    public Map<String, Object> company(@PathVariable int id) {
        return Database.companyDetails(id);
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

        Database.applyJob(user_id, body);

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
