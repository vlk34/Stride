package com.group28.Stride;

import com.group28.Stride.util.Authentication;
import com.group28.Stride.util.Database;
import com.group28.Stride.util.GetUserInfo;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;

@SpringBootApplication
@RestController
public class StrideApplication {
	public static void main(String[] args) throws Exception {
		SpringApplication.run(StrideApplication.class, args);
	}
}
