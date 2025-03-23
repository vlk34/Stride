package com.group28.Stride.controller;

import com.group28.Stride.util.Authentication;
import com.group28.Stride.util.Database;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
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
}
