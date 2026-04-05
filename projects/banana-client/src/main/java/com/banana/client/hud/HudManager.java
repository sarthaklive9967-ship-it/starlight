package com.banana.client.hud;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public final class HudManager {
    private final List<HudWidget> widgets = new ArrayList<>();

    public void registerDefaults() {
        widgets.clear();
        widgets.add(new SimpleHudWidget("keystrokes", "Keystrokes", true));
        widgets.add(new SimpleHudWidget("armor", "Armor HUD", true));
        widgets.add(new SimpleHudWidget("status", "Potion/Status HUD", true));
        widgets.add(new SimpleHudWidget("coords", "Coords + Direction", true));
        widgets.add(new SimpleHudWidget("cps", "CPS Counter", false));
    }

    public List<HudWidget> widgets() {
        return Collections.unmodifiableList(widgets);
    }

    private record SimpleHudWidget(String id, String name, boolean enabledByDefault) implements HudWidget {}
}
