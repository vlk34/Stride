package com.group28.Stride;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class StrideApplication {
	public static void main(String[] args) throws Exception {
		SpringApplication.run(StrideApplication.class, args);
	}
}
