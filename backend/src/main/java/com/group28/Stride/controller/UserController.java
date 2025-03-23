package com.group28.Stride.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class UserController {
    @CrossOrigin
    @GetMapping("/search")
    public List<Map<String, Object>> search() {

    }
}
