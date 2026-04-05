# Premium Astro Portfolio (Static + Netlify)

A fully static, Netlify-compatible Astro portfolio website with premium liquid-glass UI, responsive layouts, theme/accent customization, smooth animations, and a built-in music player.

## Tech

- Astro (no Starlight, no docs template, no content collections)
- Vanilla CSS + JS (performance-focused)
- Static output (`dist`)

## Local development

```bash
npm install
npm run dev
```

Open: `http://localhost:4321`

## Production build

```bash
npm run build
npm run preview
```

## Netlify deployment

This project is preconfigured for Netlify:

- Build command: `npm run build`
- Publish directory: `dist`

These are defined in `netlify.toml`.

## Customization guide

### 1) Edit portfolio content
Update:

- `src/data/siteData.ts`

You can edit:

- Hero/profile text
- Services
- Project cards and categories
- Skills/tools
- Testimonials
- Themes and accent presets
- Music playlist

### 2) Change colors and effects
Update CSS tokens and components in:

- `src/styles/global.css`

### 3) Change fonts
Update font import in:

- `src/layouts/BaseLayout.astro`

### 4) Add your own music tracks
Place MP3 files in `public/music/` and update playlist `src` values in `src/data/siteData.ts`.

## Project structure

- `src/pages/index.astro` → main homepage
- `src/layouts/BaseLayout.astro` → SEO/meta/fonts/base HTML
- `src/data/siteData.ts` → editable site data
- `src/styles/global.css` → design system + animations + responsive styles
- `netlify.toml` → build/publish settings

