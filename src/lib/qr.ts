import { z } from 'zod';

export const qrKinds = ['url','text','wifi','phone','sms','email','vcard','location','whatsapp','upi','social','event','app','pdf','image','video','custom'] as const;
export type QrKind = (typeof qrKinds)[number];

export const qrPayloadSchema = z.object({
  kind: z.enum(qrKinds),
  fields: z.record(z.string(), z.string().max(2000)).default({}),
  options: z.object({
    foreground: z.string().regex(/^#[0-9a-fA-F]{6}$/).default('#0f172a'),
    background: z.string().regex(/^#[0-9a-fA-F]{6}$/).default('#ffffff'),
    transparent: z.boolean().default(false),
    margin: z.coerce.number().min(0).max(8).default(2),
    size: z.coerce.number().min(256).max(4096).default(1024),
    errorCorrectionLevel: z.enum(['L','M','Q','H']).default('H'),
  }).partial().default({}),
});

const esc = (value = '') => value.replace(/[\\;,:]/g, (match) => `\\${match}`);

export function encodeQrContent(kind: QrKind, fields: Record<string, string>) {
  switch (kind) {
    case 'url': case 'social': case 'app': case 'pdf': case 'image': case 'video': return fields.url ?? '';
    case 'wifi': return `WIFI:T:${fields.security || 'WPA'};S:${esc(fields.ssid)};P:${esc(fields.password)};H:${fields.hidden === 'true'};;`;
    case 'phone': return `tel:${fields.phone ?? ''}`;
    case 'sms': return `SMSTO:${fields.phone ?? ''}:${fields.message ?? ''}`;
    case 'email': return `mailto:${fields.email ?? ''}?subject=${encodeURIComponent(fields.subject ?? '')}&body=${encodeURIComponent(fields.body ?? '')}`;
    case 'vcard': return ['BEGIN:VCARD','VERSION:3.0',`FN:${fields.name ?? ''}`,`ORG:${fields.company ?? ''}`,`TEL:${fields.phone ?? ''}`,`EMAIL:${fields.email ?? ''}`,`URL:${fields.url ?? ''}`,'END:VCARD'].join('\n');
    case 'location': return `geo:${fields.latitude ?? '0'},${fields.longitude ?? '0'}?q=${fields.latitude ?? '0'},${fields.longitude ?? '0'}(${encodeURIComponent(fields.label ?? 'Location')})`;
    case 'whatsapp': return `https://wa.me/${(fields.phone ?? '').replace(/\D/g, '')}?text=${encodeURIComponent(fields.message ?? '')}`;
    case 'upi': return `upi://pay?pa=${encodeURIComponent(fields.vpa ?? '')}&pn=${encodeURIComponent(fields.name ?? '')}&am=${encodeURIComponent(fields.amount ?? '')}&cu=INR&tn=${encodeURIComponent(fields.note ?? '')}`;
    case 'event': return `BEGIN:VEVENT\nSUMMARY:${fields.title ?? ''}\nDTSTART:${fields.startsAt ?? ''}\nDTEND:${fields.endsAt ?? ''}\nLOCATION:${fields.location ?? ''}\nDESCRIPTION:${fields.description ?? ''}\nEND:VEVENT`;
    default: return fields.content ?? '';
  }
}
