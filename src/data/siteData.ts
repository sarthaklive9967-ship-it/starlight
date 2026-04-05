export type Project = {
  title: string;
  category: 'minecraft-server' | 'minecraft-plugin' | 'resource-pack' | 'discord-bot' | 'discord-server' | 'custom-dev';
  description: string;
  tags: string[];
  image: string;
  links: { label: string; href: string }[];
};

export const services = [
  {
    title: 'Minecraft Servers',
    description: 'End-to-end custom server architecture, gameplay loops, progression systems, and performance tuning.',
    icon: '⛏️',
  },
  {
    title: 'Minecraft Plugins',
    description: 'Custom Spigot/Paper plugin systems built for scalability, maintainability, and unique gameplay mechanics.',
    icon: '🧩',
  },
  {
    title: 'Resource Packs',
    description: 'Immersive visual identity packs, UI stylization, and optimized asset pipelines for modern MC servers.',
    icon: '🎨',
  },
  {
    title: 'Discord Bots',
    description: 'Reliable automation bots with moderation, ticketing, leveling, custom slash commands, and API integrations.',
    icon: '🤖',
  },
  {
    title: 'Discord Server Development',
    description: 'Community infrastructure setup, role architecture, onboarding flows, and engagement-driven system design.',
    icon: '💬',
  },
  {
    title: 'Custom Development',
    description: 'Bespoke tools, web dashboards, utility systems, and cross-platform project builds tailored to your goals.',
    icon: '⚡',
  },
];

export const projects: Project[] = [
  {
    title: 'Eclipse Realms Network Core',
    category: 'minecraft-server',
    description: 'Designed a premium multi-gamemode server core with matchmaking, seasonal progression, and anti-exploit hooks.',
    tags: ['Paper', 'Redis', 'Proxy', 'Performance'],
    image: '/images/project-1.svg',
    links: [
      { label: 'Case Study', href: '#' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Mythic Quests Plugin Suite',
    category: 'minecraft-plugin',
    description: 'Custom quest and class engine with dynamic rewards, admin UI, and localization support.',
    tags: ['Java', 'Kotlin', 'Spigot', 'Config-Driven'],
    image: '/images/project-2.svg',
    links: [
      { label: 'Demo', href: '#' },
      { label: 'Request Build', href: '#contact' },
    ],
  },
  {
    title: 'NeoCraft Resource Identity',
    category: 'resource-pack',
    description: 'Built a complete premium resource pack with custom HUD icons, gradients, and branded texture styling.',
    tags: ['Textures', 'UI', 'Branding', 'Optimization'],
    image: '/images/project-3.svg',
    links: [
      { label: 'Preview', href: '#' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Sentinel Discord Bot',
    category: 'discord-bot',
    description: 'Full-featured bot with modular slash commands, automod AI rules, and analytics dashboards.',
    tags: ['Discord.js', 'TypeScript', 'MongoDB', 'Sharding'],
    image: '/images/project-4.svg',
    links: [
      { label: 'Feature List', href: '#' },
      { label: 'Get One', href: '#contact' },
    ],
  },
  {
    title: 'Astra Community Ops Stack',
    category: 'discord-server',
    description: 'Created scalable role systems, ticket workflows, onboarding automation, and moderation playbooks.',
    tags: ['Automation', 'Security', 'Growth', 'Workflows'],
    image: '/images/project-5.svg',
    links: [
      { label: 'Structure', href: '#' },
      { label: 'Start Project', href: '#contact' },
    ],
  },
  {
    title: 'Custom Client Portal',
    category: 'custom-dev',
    description: 'Delivered a private project portal with status tracking, feature voting, and release notes automation.',
    tags: ['Astro', 'Node', 'API Integrations', 'UX'],
    image: '/images/project-6.svg',
    links: [
      { label: 'Overview', href: '#' },
      { label: 'Build Mine', href: '#contact' },
    ],
  },
];

export const tools = [
  'Java / Kotlin',
  'TypeScript / Node.js',
  'Paper / Spigot / Velocity',
  'Discord.js / Sapphire',
  'Redis / PostgreSQL / MongoDB',
  'Astro / Tailored Frontend UX',
  'Linux Deployment',
  'GitHub Actions / CI',
  'Packwiz / Model Pipelines',
  'Monitoring & Profiling',
];

export const reasons = [
  'Premium quality and polished implementation, not copy-paste builds.',
  'Performance-first engineering for smooth experiences under load.',
  'Fast communication and transparent progress updates.',
  'Deep customization focused on your exact use case.',
];

export const testimonials = [
  {
    name: 'Server Owner • Zenith SMP',
    quote: 'The plugin architecture is clean, fast, and insanely easy to extend. Our player retention jumped in two weeks.',
  },
  {
    name: 'Community Lead • Rift Hub',
    quote: 'The Discord ecosystem was transformed from chaotic to premium-grade operations in days.',
  },
  {
    name: 'Studio Founder • VoxelForge',
    quote: 'Resource pack quality and visual coherence were top-tier. It finally feels like a real brand.',
  },
];

export const themes = [
  { name: 'Dark', key: 'dark', accent: '#7a7cff' },
  { name: 'Midnight', key: 'midnight', accent: '#4ea2ff' },
  { name: 'Purple Neon', key: 'neon', accent: '#b769ff' },
  { name: 'Emerald Cyan', key: 'emerald', accent: '#2ed6c8' },
  { name: 'Light Premium', key: 'light', accent: '#4466ff' },
];

export const accentPresets = ['#7a7cff', '#4ea2ff', '#b769ff', '#2ed6c8', '#ff9d4d'];

export const playlist = [
  { title: 'Neon Drift', artist: 'Ambient Grid', src: '/music/neon-drift.mp3' },
  { title: 'Liquid Pulse', artist: 'Skyline Audio', src: '/music/liquid-pulse.mp3' },
  { title: 'Afterglow', artist: 'Night Loop', src: '/music/afterglow.mp3' },
];
