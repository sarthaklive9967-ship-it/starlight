package com.banana.client.ui.component;

import com.banana.client.theme.Theme;

public final class GlassPanel {
    private final int x;
    private final int y;
    private final int width;
    private final int height;
    private final int radius;

    public GlassPanel(int x, int y, int width, int height, int radius) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.radius = radius;
    }

    public void render(Theme theme, float delta) {
        // TODO: Render soft blur background, rounded corners, and subtle outline.
    }
}
