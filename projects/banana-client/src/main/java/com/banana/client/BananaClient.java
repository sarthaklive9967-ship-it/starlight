package com.banana.client;

import com.banana.client.config.ConfigManager;
import com.banana.client.hud.HudManager;
import com.banana.client.notification.NotificationManager;
import com.banana.client.performance.FpsPresetManager;
import com.banana.client.profile.ProfileManager;
import com.banana.client.theme.ThemeManager;
import net.fabricmc.api.ClientModInitializer;

public final class BananaClient implements ClientModInitializer {
    public static final String MOD_ID = "bananaclient";

    private final ConfigManager configManager = new ConfigManager();
    private final ThemeManager themeManager = new ThemeManager();
    private final NotificationManager notificationManager = new NotificationManager();
    private final ProfileManager profileManager = new ProfileManager(configManager);
    private final FpsPresetManager fpsPresetManager = new FpsPresetManager(notificationManager);
    private final HudManager hudManager = new HudManager();

    @Override
    public void onInitializeClient() {
        configManager.load();
        themeManager.bootstrap();
        profileManager.loadProfiles();
        fpsPresetManager.applySavedPreset(configManager);
        hudManager.registerDefaults();
        notificationManager.push("Banana Client loaded", "Premium lightweight mode enabled.");
    }
}
