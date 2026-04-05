package com.banana.client.feature.input;

import com.banana.client.feature.Feature;

public final class ToggleSneakFeature implements Feature {
    private boolean enabled = true;

    @Override
    public String id() {
        return "toggle_sneak";
    }

    @Override
    public String displayName() {
        return "Toggle Sneak";
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    @Override
    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
}
