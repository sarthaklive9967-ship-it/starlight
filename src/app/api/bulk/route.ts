import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { encodeQrContent, qrKinds } from '@/lib/qr';

const rowSchema = z.object({ kind: z.enum(qrKinds), fields: z.record(z.string(), z.string()) });

export async function POST(request: NextRequest) {
  const rows = z.array(rowSchema).max(500).safeParse(await request.json().catch(() => null));
  if (!rows.success) return NextResponse.json({ error: 'Upload JSON rows converted from CSV', issues: rows.error.flatten() }, { status: 400 });
  return NextResponse.json({ jobs: rows.data.map((row, index) => ({ id: `bulk-${index + 1}`, content: encodeQrContent(row.kind, row.fields as Record<string, string>), status: 'queued' })) });
}
