import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'QR Forge — Premium QR Code Generator', description: 'Generate, customize, export, and track production-grade QR codes for every workflow.' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" suppressHydrationWarning><body>{children}</body></html>;
}
