package com.banana.client.profile;

import com.banana.client.config.ConfigManager;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public final class ProfileManager {
    private final ConfigManager configManager;
    private final List<Profile> profiles = new ArrayList<>();

    public ProfileManager(ConfigManager configManager) {
        this.configManager = configManager;
    }

    public void loadProfiles() {
        profiles.clear();
        profiles.add(new Profile("Default", "banana_dark", "BALANCED", true));
    }

    public void saveActiveProfile(Profile profile) {
        configManager.set("profile.active", profile.name());
        configManager.save();
    }

    public List<Profile> profiles() {
        return Collections.unmodifiableList(profiles);
    }
}
