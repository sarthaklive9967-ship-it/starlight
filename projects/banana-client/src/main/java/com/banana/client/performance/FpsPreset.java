package com.banana.client.performance;

public enum FpsPreset {
    MAX_FPS("Max FPS", false, false),
    BALANCED("Balanced", true, false),
    QUALITY("Quality", true, true);

    private final String displayName;
    private final boolean smoothLighting;
    private final boolean fancyParticles;

    FpsPreset(String displayName, boolean smoothLighting, boolean fancyParticles) {
        this.displayName = displayName;
        this.smoothLighting = smoothLighting;
        this.fancyParticles = fancyParticles;
    }

    public String displayName() {
        return displayName;
    }

    public boolean smoothLighting() {
        return smoothLighting;
    }

    public boolean fancyParticles() {
        return fancyParticles;
    }
}
