package com.banana.client.feature.input;

import com.banana.client.feature.Feature;

public final class ZoomFeature implements Feature {
    private boolean enabled = true;
    private double zoomMultiplier = 3.0;

    @Override
    public String id() {
        return "zoom";
    }

    @Override
    public String displayName() {
        return "Zoom";
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    @Override
    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public double zoomMultiplier() {
        return zoomMultiplier;
    }
}
