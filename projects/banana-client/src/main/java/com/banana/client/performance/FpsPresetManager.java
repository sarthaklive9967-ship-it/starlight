package com.banana.client.performance;

import com.banana.client.config.ConfigManager;
import com.banana.client.notification.NotificationManager;

public final class FpsPresetManager {
    private final NotificationManager notificationManager;
    private FpsPreset currentPreset = FpsPreset.BALANCED;

    public FpsPresetManager(NotificationManager notificationManager) {
        this.notificationManager = notificationManager;
    }

    public void applySavedPreset(ConfigManager configManager) {
        currentPreset = configManager.getEnum("performance.preset", FpsPreset.class, FpsPreset.BALANCED);
    }

    public void setPreset(FpsPreset preset, ConfigManager configManager) {
        currentPreset = preset;
        configManager.set("performance.preset", preset.name());
        notificationManager.push("Performance preset", "Applied " + preset.displayName());
    }

    public FpsPreset getCurrentPreset() {
        return currentPreset;
    }
}
