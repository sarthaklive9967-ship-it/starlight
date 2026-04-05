package com.banana.client.ui;

import com.banana.client.theme.Theme;
import com.banana.client.ui.component.GlassPanel;
import java.util.List;

public final class BananaScreen {
    private final List<ClientTab> tabs = List.of(
            ClientTab.HOME,
            ClientTab.PERFORMANCE,
            ClientTab.HUD,
            ClientTab.VISUALS,
            ClientTab.PROFILES,
            ClientTab.SETTINGS
    );

    private final GlassPanel sidebar = new GlassPanel(10, 10, 88, 170, 12);

    public void render(Theme theme, int mouseX, int mouseY, float delta) {
        sidebar.render(theme, delta);
        // TODO: Draw active tab with premium rounded cards and smooth transitions.
    }

    public List<ClientTab> tabs() {
        return tabs;
    }
}
