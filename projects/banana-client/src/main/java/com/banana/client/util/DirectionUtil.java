package com.banana.client.util;

public final class DirectionUtil {
    private static final String[] CARDINAL = {"S", "SW", "W", "NW", "N", "NE", "E", "SE"};

    private DirectionUtil() {
    }

    public static String fromYaw(float yaw) {
        int index = Math.floorMod(Math.round(yaw / 45.0F), CARDINAL.length);
        return CARDINAL[index];
    }
}
