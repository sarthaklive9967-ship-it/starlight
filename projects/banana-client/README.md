# Banana Client (Fabric 1.21.5)

Banana Client is a **non-hack**, premium-style Minecraft Java client focused on:
- FPS optimization presets
- UI polish and smooth animations
- Utility-focused gameplay quality-of-life features

## Included starter feature modules
- FPS presets
- Zoom
- Toggle sprint / toggle sneak
- Keystrokes HUD
- Armor HUD
- Potion/Status HUD
- Coords + direction HUD
- CPS counter
- Crosshair editor
- Fullbright
- Profile system
- Config save/load skeleton
- Elegant notification queue
- Animated main menu skeleton
- Theme system

## UI constraints implemented in scaffold
- Minimal layout assumptions
- Rounded components via `GlassPanel`
- Soft blur/glass rendering placeholder
- Category sidebar model with exactly six tabs:
  - Home
  - Performance
  - HUD
  - Visuals
  - Profiles
  - Settings

## Package architecture
- `performance`
- `hud`
- `ui`
- `config`
- `util`
- `feature`
- `profile`
- `notification`
- `theme`
- `menu`

## Notes
This scaffold intentionally ships without cheat modules and without combat/aim assistance features.
