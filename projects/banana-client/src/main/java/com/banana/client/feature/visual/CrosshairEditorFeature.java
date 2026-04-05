package com.banana.client.feature.visual;

import com.banana.client.feature.Feature;

public final class CrosshairEditorFeature implements Feature {
    private boolean enabled = true;
    private int thickness = 2;
    private int size = 6;

    @Override
    public String id() {
        return "crosshair_editor";
    }

    @Override
    public String displayName() {
        return "Crosshair Editor";
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    @Override
    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public int thickness() {
        return thickness;
    }

    public int size() {
        return size;
    }
}
