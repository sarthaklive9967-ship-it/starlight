package com.banana.client.theme;

import java.util.HashMap;
import java.util.Map;

public final class ThemeManager {
    private final Map<String, Theme> themes = new HashMap<>();
    private Theme active;

    public void bootstrap() {
        themes.clear();
        register(new Theme("banana_dark", "Banana Dark", 0xCC101114, 0xFFF7D046, 8.0F));
        register(new Theme("midnight_glass", "Midnight Glass", 0xB312141A, 0xFF81A1FF, 10.0F));
        active = themes.get("banana_dark");
    }

    public void register(Theme theme) {
        themes.put(theme.id(), theme);
    }

    public Theme active() {
        return active;
    }
}
