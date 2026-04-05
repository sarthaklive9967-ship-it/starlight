package com.banana.client.feature.visual;

import com.banana.client.feature.Feature;

public final class FullbrightFeature implements Feature {
    private boolean enabled;

    @Override
    public String id() {
        return "fullbright";
    }

    @Override
    public String displayName() {
        return "Fullbright";
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
