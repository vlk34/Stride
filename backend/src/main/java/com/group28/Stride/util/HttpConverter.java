package com.group28.Stride.util;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpRequest;
import java.util.Enumeration;
import java.util.List;
import jakarta.servlet.http.HttpServletRequest;

public class HttpConverter {
    private static final List<String> RESTRICTED_HEADERS = List.of(
            "host", "connection", "content-length", "expect", "upgrade"
    );

    public static HttpRequest convert(HttpServletRequest servletRequest) throws IOException {
        HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
                .uri(URI.create(servletRequest.getRequestURL().toString()))
                .method(servletRequest.getMethod(), HttpRequest.BodyPublishers.noBody());

        Enumeration<String> headerNames = servletRequest.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String headerName = headerNames.nextElement().toLowerCase();
            if (!RESTRICTED_HEADERS.contains(headerName)) {
                requestBuilder.header(headerName, servletRequest.getHeader(headerName));
            }
        }

        return requestBuilder.build();
    }
}
