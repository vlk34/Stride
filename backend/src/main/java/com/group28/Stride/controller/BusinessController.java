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
public class BusinessController {
    @CrossOrigin
    @GetMapping("/stats")
    public Map<String, Integer> stats(@RequestHeader("Authorization") String auth) {
        Claims user_claims = Authentication.getClaims(auth);
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
    public ResponseEntity<String> create(@RequestBody Map<String, Object> body, @RequestHeader("Authorization") String auth) {
        Claims user_claims = Authentication.getClaims(auth);
        if (user_claims == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        String user_id = user_claims.getSubject();
        String role = (String) user_claims.get("metadata", HashMap.class).get("role");
        if (!"business".equalsIgnoreCase(role))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");

        String job_name = Database.createJob(user_id, body);
        Map<String, Object> map = Database.companyDetails(user_id);
        if (map == null)
            map = Map.of("company", "Unknown");
        String company_name = map.get("company").toString();
        Database.logActivity(String.format("%s created a new job post named %s.", company_name, job_name), role);

        return new ResponseEntity<>("Successful", HttpStatus.OK);
    }

    @CrossOrigin
    @PutMapping("/update")
    public ResponseEntity<String> update(@RequestBody Map<String, Object> body, @RequestHeader("Authorization") String auth) {
        Claims user_claims = Authentication.getClaims(auth);
        if (user_claims == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        String user_id = user_claims.getSubject();
        String role = (String) user_claims.get("metadata", HashMap.class).get("role");

        if ("business".equalsIgnoreCase(role))
            Database.updateJob(user_id, body, true);
        else if ("admin".equalsIgnoreCase(role))
            Database.updateJob(user_id, body, false);
        else
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");

        return new ResponseEntity<>("Successful", HttpStatus.OK);
    }

    @CrossOrigin
    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestBody Map<String, Object> body, @RequestHeader("Authorization") String auth) throws Exception {
        Claims user_claims = Authentication.getClaims(auth);
        if (user_claims == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        String user_id = user_claims.getSubject();
        String role = (String) user_claims.get("metadata", HashMap.class).get("role");

        if ("business".equalsIgnoreCase(role))
            Database.deleteJob(user_id, (int) body.get("job_id"), true);
        else if ("admin".equalsIgnoreCase(role))
            Database.deleteJob(user_id, (int) body.get("job_id"), false);
        else
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");

        Map<String, Object> job_details = Database.jobDetails((int) body.get("job_id"));
        if (job_details == null)
            job_details = Map.of("title", "Unknown");
        String job_name = job_details.get("title").toString();

        String company_name;
        if ("business".equalsIgnoreCase(role)) {
            Map<String, Object> map = Database.companyDetails(user_id);
            if (map == null)
                map = Map.of("company", "Unknown");
            company_name = map.get("company").toString();
        } else {
            Map<String, Object> user_details = GetUserInfo.fromUserID(user_id);
            if (user_details == null)
                user_details = Map.of("name", "Unknown");
            company_name = user_details.get("name").toString();
        }

        Database.logActivity(String.format("%s deleted a new job post named %s.", company_name, job_name), role);

        return new ResponseEntity<>("Successful", HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/jobs")
    public List<Map<String, Object>> jobs(@RequestHeader("Authorization") String auth) {
        Claims user_claims = Authentication.getClaims(auth);
        if (user_claims == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        String user_id = user_claims.getSubject();
        String role = (String) user_claims.get("metadata", HashMap.class).get("role");
        if (!"business".equalsIgnoreCase(role))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");

        return Database.jobs(user_id);
    }

    @CrossOrigin
    @PutMapping("/editcompany")
    public ResponseEntity<String> editcompany(@RequestBody Map<String, Object> body, @RequestHeader("Authorization") String auth) {
        Claims user_claims = Authentication.getClaims(auth);
        if (user_claims == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        String user_id = user_claims.getSubject();
        String role = (String) user_claims.get("metadata", HashMap.class).get("role");
        if (!"business".equalsIgnoreCase(role))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");

        Database.editCompany(user_id, body);

        return new ResponseEntity<>("Successful", HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping("/descend")
    public ResponseEntity<String> descend(@RequestHeader("Authorization") String auth) throws Exception {
        Claims user_claims = Authentication.getClaims(auth);
        if (user_claims == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        String user_id = user_claims.getSubject();
        String role = (String) user_claims.get("metadata", HashMap.class).get("role");
        if (!"business".equalsIgnoreCase(role))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");

        Map<String, Object> map = Database.companyDetails(user_id);
        if (map == null)
            map = Map.of("company", "Unknown");
        String company_name = map.get("company").toString();
        Database.logActivity(String.format("%s descended into a personal account!", company_name), role);

        GetUserInfo.businessDowngrade(user_id);
        Database.removeCompany(user_id);

        return new ResponseEntity<>("Successful", HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/recentjobs")
    public List<Map<String, Object>> recentjobs(@RequestHeader("Authorization") String auth) {
        Claims user_claims = Authentication.getClaims(auth);
        if (user_claims == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        String user_id = user_claims.getSubject();
        String role = (String) user_claims.get("metadata", HashMap.class).get("role");
        if (!"business".equalsIgnoreCase(role))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");

        return Database.recentJobs(user_id);
    }

    @CrossOrigin
    @GetMapping("/recentapplicants")
    public List<Map<String, Object>> recentapplicants(@RequestHeader("Authorization") String auth) {
        Claims user_claims = Authentication.getClaims(auth);
        if (user_claims == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        String user_id = user_claims.getSubject();
        String role = (String) user_claims.get("metadata", HashMap.class).get("role");
        if (!"business".equalsIgnoreCase(role))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");

        return Database.recentApplicants(user_id);
    }

    @CrossOrigin
    @GetMapping("/applicants")
    public List<Map<String, Object>> allapplicants(@RequestHeader("Authorization") String auth) {
        Claims user_claims = Authentication.getClaims(auth);
        if (user_claims == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        String user_id = user_claims.getSubject();
        String role = (String) user_claims.get("metadata", HashMap.class).get("role");
        if (!"business".equalsIgnoreCase(role))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");

        return Database.allApplicants(user_id);
    }

    @CrossOrigin
    @GetMapping("/applicants/{id}")
    public List<Map<String, Object>> applicants(@PathVariable Integer id, @RequestHeader("Authorization") String auth) {
        Claims user_claims = Authentication.getClaims(auth);
        if (user_claims == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        String user_id = user_claims.getSubject();
        String role = (String) user_claims.get("metadata", HashMap.class).get("role");
        if (!"business".equalsIgnoreCase(role))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");

        return Database.jobApplicants(user_id, id);
    }

    @CrossOrigin
    @GetMapping("/applicants/{id}/{user}")
    public Map<String, Object> applicantinfo(@PathVariable Integer id, @PathVariable String user, @RequestHeader("Authorization") String auth) {
        Claims user_claims = Authentication.getClaims(auth);
        if (user_claims == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        String user_id = user_claims.getSubject();
        String role = (String) user_claims.get("metadata", HashMap.class).get("role");
        if (!"business".equalsIgnoreCase(role))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");

        return Database.applicantInfo(user_id, id, user);
    }

    @CrossOrigin
    @GetMapping("/company")
    public Map<String, Object> company(@RequestHeader("Authorization") String auth) {
        Claims user_claims = Authentication.getClaims(auth);
        if (user_claims == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        String user_id = user_claims.getSubject();
        String role = (String) user_claims.get("metadata", HashMap.class).get("role");
        if (!"business".equalsIgnoreCase(role))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");

        return Database.companyDetails(user_id);
    }
}
