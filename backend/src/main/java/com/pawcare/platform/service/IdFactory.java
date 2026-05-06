package com.pawcare.platform.service;

import java.util.UUID;

public final class IdFactory {
    private IdFactory() {
    }

    public static String id(String prefix) {
        return prefix + "_" + UUID.randomUUID().toString().substring(0, 8);
    }
}
