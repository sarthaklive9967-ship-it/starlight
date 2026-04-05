# Premium Portfolio (Astro + Netlify)

A premium, futuristic, liquid-glass personal portfolio template focused on:

- Minecraft server/plugin/resource pack development
- Discord bot + server ecosystem development
- Custom software projects

Built as a static-friendly Astro site for smooth Netlify deployment and high performance.

## Stack

- Astro 5 (frontend-only/static build)
- Vanilla CSS + JS (no heavy animation library overhead)
- Data-driven content with editable TypeScript data files

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:4321`.

## Production build

```bash
npm run build
npm run preview
```

## Customize content quickly

Main content file:

- `src/data/siteData.ts`

Edit these arrays:

- `services` → service cards
- `projects` → featured portfolio cards + categories + links
- `tools` → skills/tags list
- `reasons` → “Why choose me” bullets
- `testimonials` → reviews section
- `themes` + `accentPresets` → theme + color controls
- `playlist` → music tracks and metadata

## Music playlist notes

Default tracks point to:

- `/public/music/neon-drift.mp3`
- `/public/music/liquid-pulse.mp3`
- `/public/music/afterglow.mp3`

Add your own MP3 files in `public/music/` and update `playlist` in `src/data/siteData.ts`.
Autoplay restrictions are handled: user interaction is required before guaranteed playback.

## Fonts

Configured in `src/layouts/BaseLayout.astro` via Google Fonts:

- Space Grotesk (headings)
- Outfit (body)

Change or self-host fonts there for full branding control.

## Theme system

Theme + accent selections are saved in `localStorage`:

- `portfolio-theme`
- `portfolio-accent`

Theme behavior and palette tokens are managed in `src/styles/global.css`.

## Netlify deployment

### Option A: Connect repository

1. Push this project to GitHub/GitLab/Bitbucket.
2. In Netlify, **Add new site** → **Import an existing project**.
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy.

### Option B: Netlify CLI

```bash
npm run build
npx netlify deploy --prod --dir=dist
```

## SEO / social metadata

Meta tags, OG tags, and Twitter card basics are configured in:

- `src/layouts/BaseLayout.astro`

Replace the `site` URL in `astro.config.mjs` and OG image path with your real brand domain/assets.

## Notes

- The portfolio is responsive for mobile/tablet/laptop/desktop.
- Animations are optimized and reduced when users prefer reduced motion.
- Replace placeholder images in `public/images/` with your real project previews.
