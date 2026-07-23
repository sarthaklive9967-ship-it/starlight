import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: { extend: { colors: { background: 'hsl(var(--background))', foreground: 'hsl(var(--foreground))' }, boxShadow: { glow: '0 0 80px rgba(99,102,241,.25)' } } },
  plugins: [],
} satisfies Config;
