package com.banana.client.feature;

public interface Feature {
    String id();

    String displayName();

    boolean isEnabled();

    void setEnabled(boolean enabled);
}
