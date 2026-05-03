package com.group28.Stride.util;

import io.github.cdimascio.dotenv.Dotenv;

public final class Env {
    private static final Dotenv dotenv = load();

    private Env() {
    }

    public static Dotenv get() {
        return dotenv;
    }

    private static Dotenv load() {
        Dotenv fromBackendDir = Dotenv.configure()
                .ignoreIfMissing()
                .directory("backend")
                .load();
        if (hasAnyKey(fromBackendDir)) {
            return fromBackendDir;
        }

        Dotenv fromCwd = Dotenv.configure()
                .ignoreIfMissing()
                .directory(".")
                .load();
        if (hasAnyKey(fromCwd)) {
            return fromCwd;
        }

        return Dotenv.configure()
                .ignoreIfMissing()
                .load();
    }

    private static boolean hasAnyKey(Dotenv dotenv) {
        return dotenv.get("SECRET") != null
                || dotenv.get("DB_HOST") != null
                || dotenv.get("DB_NAME") != null
                || dotenv.get("DB_USER") != null;
    }
}
