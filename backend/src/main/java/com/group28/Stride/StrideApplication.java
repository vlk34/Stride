package com.group28.Stride;

import com.clerk.backend_api.helpers.jwks.AuthenticateRequest;
import com.clerk.backend_api.helpers.jwks.AuthenticateRequestOptions;
import com.clerk.backend_api.helpers.jwks.RequestState;
import com.clerk.backend_api.models.errors.ClerkErrors;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@SpringBootApplication
@RestController
public class StrideApplication {

	public static void main(String[] args) throws ClerkErrors, Exception {
		SpringApplication.run(StrideApplication.class, args);
	}

	@GetMapping("/hello")
	public String hello(HttpServletRequest request) throws IOException {
		RequestState requestState = AuthenticateRequest.authenticateRequest(HttpConverter.convert(request), AuthenticateRequestOptions
				.secretKey("sk_test_5MtSsaFSR688og6juJjo63GPAbnrWBTjApE4OmDvER")
				.build());

		if (requestState.claims().isPresent()) {
			System.out.println(requestState.claims().get().getSubject());
		} else {
			System.out.println("No claims");
		}
		
		return requestState.isSignedIn() ? "true" : "false";
	}
}
