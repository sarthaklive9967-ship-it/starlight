import QRCode from 'qrcode';
import { NextRequest, NextResponse } from 'next/server';
import { encodeQrContent, qrPayloadSchema } from '@/lib/qr';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  const limited = rateLimit(request.headers.get('x-forwarded-for') ?? 'local');
  if (!limited.ok) return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });

  const parsed = qrPayloadSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Invalid QR request', issues: parsed.error.flatten() }, { status: 400 });

  const content = encodeQrContent(parsed.data.kind, parsed.data.fields as Record<string, string>);
  if (!content.trim()) return NextResponse.json({ error: 'QR content is required' }, { status: 400 });

  const opts = { foreground: '#0f172a', background: '#ffffff', transparent: false, margin: 2, size: 1024, errorCorrectionLevel: 'H' as const, ...parsed.data.options };
  const svg = await QRCode.toString(content, {
    type: 'svg',
    errorCorrectionLevel: opts.errorCorrectionLevel,
    margin: opts.margin,
    width: opts.size,
    color: { dark: opts.foreground, light: opts.transparent ? '#0000' : opts.background },
  });
  return NextResponse.json({ content, svg, remaining: limited.remaining });
}
