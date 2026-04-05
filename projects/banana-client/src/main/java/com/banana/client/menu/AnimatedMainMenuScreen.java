package com.banana.client.menu;

import com.banana.client.util.AnimationUtil;

public final class AnimatedMainMenuScreen {
    private float progress;

    public void tick() {
        progress = AnimationUtil.smoothStep(progress, 1.0F, 0.08F);
    }

    public float progress() {
        return progress;
    }
}
