# QR Forge

A premium Next.js QR Code Generator application with a polished landing page, live QR studio, dashboards, secure API routes, Prisma/PostgreSQL schema, Docker support, and CI.

## Features

- QR templates for URLs, text, Wi-Fi, phone, SMS, email, vCard, location, WhatsApp, UPI, social, events, apps, PDFs, images, videos, and custom data.
- Live customization for colors, size, margin, and error correction level with export actions for PNG, SVG, PDF, JPEG, and WebP.
- User dashboard, admin dashboard, API endpoint validation, rate limiting, Auth.js provider wiring, Prisma data models, Docker, and GitHub Actions.

## Getting started

```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run dev
```

## Environment

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/qrforge"
AUTH_SECRET="replace-with-a-secret"
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""
AUTH_GITHUB_ID=""
AUTH_GITHUB_SECRET=""
DEMO_USER_EMAIL="demo@example.com"
```

## API

`POST /api/qr` accepts `{ kind, fields, options }` and returns encoded content plus SVG markup. `POST /api/bulk` accepts up to 500 normalized rows for CSV-driven generation queues.
