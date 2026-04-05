package com.banana.client.feature.input;

import com.banana.client.feature.Feature;

public final class ToggleSprintFeature implements Feature {
    private boolean enabled = true;

    @Override
    public String id() {
        return "toggle_sprint";
    }

    @Override
    public String displayName() {
        return "Toggle Sprint";
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
