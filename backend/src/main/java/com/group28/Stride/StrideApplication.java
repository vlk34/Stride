package com.group28.Stride;

import com.clerk.backend_api.helpers.jwks.AuthenticateRequest;
import com.clerk.backend_api.helpers.jwks.AuthenticateRequestOptions;
import com.clerk.backend_api.helpers.jwks.RequestState;
import io.github.cdimascio.dotenv.Dotenv;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class StrideApplication {

	public static void main(String[] args) throws Exception {
		SpringApplication.run(StrideApplication.class, args);
	}

	@GetMapping("/hello")
	public String hello(HttpServletRequest request) throws Exception {
		Dotenv dotenv = Dotenv.configure()
				.directory("backend")
				.load();

		RequestState requestState = AuthenticateRequest.authenticateRequest(HttpConverter.convert(request), AuthenticateRequestOptions
				.secretKey(dotenv.get("SECRET"))
				.build());

		if (requestState.claims().isPresent()) {
			System.out.println(requestState.claims().get().getSubject());
		} else {
			System.out.println("No claims");
		}

		return requestState.isSignedIn() ? "true" : "false";

//		Clerk sdk = Clerk.builder()
//				.bearerAuth(dotenv.get("SECRET"))
//				.build();
//
//		GetUserResponse res = sdk.users().get()
//				.userId("user_2tDY5Zt8xMiIVvK4mvBqe7q0AIJ")
//				.call();
//
//		if (res.user().isPresent()) {
//			System.out.println(res.user().get().firstName());
//		}
	}
}
