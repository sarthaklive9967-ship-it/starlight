package com.banana.client.util;

public final class AnimationUtil {
    private AnimationUtil() {
    }

    public static float smoothStep(float current, float target, float speed) {
        return current + (target - current) * speed;
    }
}
