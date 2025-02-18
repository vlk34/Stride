package com.group28.Stride;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpRequest;
import java.nio.charset.StandardCharsets;
import java.util.Enumeration;
import java.util.List;
import java.util.stream.Collectors;
import jakarta.servlet.http.HttpServletRequest;

public class HttpConverter {
    // Headers restricted by HttpRequest
    private static final List<String> RESTRICTED_HEADERS = List.of(
            "host", "connection", "content-length", "expect", "upgrade"
    );

    public static HttpRequest convert(HttpServletRequest servletRequest) throws IOException {
        HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
                .uri(URI.create(servletRequest.getRequestURL().toString()))
                .method(servletRequest.getMethod(), getBodyPublisher(servletRequest));

        // Copy headers except restricted ones
        Enumeration<String> headerNames = servletRequest.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String headerName = headerNames.nextElement().toLowerCase(); // Normalize to lowercase
            if (!RESTRICTED_HEADERS.contains(headerName)) {
                requestBuilder.header(headerName, servletRequest.getHeader(headerName));
            }
        }

        return requestBuilder.build();
    }

    private static HttpRequest.BodyPublisher getBodyPublisher(HttpServletRequest servletRequest) throws IOException {
        if ("GET".equalsIgnoreCase(servletRequest.getMethod())) {
            return HttpRequest.BodyPublishers.noBody();
        }

        String body = servletRequest.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
        return HttpRequest.BodyPublishers.ofString(body, StandardCharsets.UTF_8);
    }
}
