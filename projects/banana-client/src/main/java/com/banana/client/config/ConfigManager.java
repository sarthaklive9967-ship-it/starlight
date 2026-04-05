package com.banana.client.config;

import java.util.HashMap;
import java.util.Map;

public final class ConfigManager {
    private final Map<String, String> values = new HashMap<>();

    public void load() {
        values.putIfAbsent("performance.preset", "BALANCED");
        values.putIfAbsent("theme.active", "banana_dark");
    }

    public void save() {
        // TODO: Persist JSON file under .minecraft/config/bananaclient
    }

    public void set(String key, String value) {
        values.put(key, value);
    }

    public String get(String key, String fallback) {
        return values.getOrDefault(key, fallback);
    }

    public <E extends Enum<E>> E getEnum(String key, Class<E> type, E fallback) {
        String raw = values.get(key);
        if (raw == null) {
            return fallback;
        }
        try {
            return Enum.valueOf(type, raw);
        } catch (IllegalArgumentException ignored) {
            return fallback;
        }
    }
}
