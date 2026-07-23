'use client';
import { useMemo, useState } from 'react';
import QRCode from 'qrcode';
import { encodeQrContent, qrKinds, type QrKind } from '@/lib/qr';

const presets: Record<QrKind, string[]> = { url:['url'], text:['content'], wifi:['ssid','password','security'], phone:['phone'], sms:['phone','message'], email:['email','subject','body'], vcard:['name','company','phone','email','url'], location:['latitude','longitude','label'], whatsapp:['phone','message'], upi:['vpa','name','amount','note'], social:['url'], event:['title','startsAt','endsAt','location','description'], app:['url'], pdf:['url'], image:['url'], video:['url'], custom:['content'] };

export function QrStudio() {
  const [kind,setKind]=useState<QrKind>('url');
  const [fields,setFields]=useState<Record<string,string>>({url:'https://example.com'});
  const [fg,setFg]=useState('#111827'); const [bg,setBg]=useState('#ffffff'); const [size,setSize]=useState(1024); const [margin,setMargin]=useState(2); const [level,setLevel]=useState<'L'|'M'|'Q'|'H'>('H');
  const content=useMemo(()=>encodeQrContent(kind, fields),[kind,fields]);
  const [svg,setSvg]=useState('');
  useMemo(()=>{QRCode.toString(content||' ',{type:'svg',width:size,margin,errorCorrectionLevel:level,color:{dark:fg,light:bg}}).then(setSvg)},[content,fg,bg,size,margin,level]);
  const download=(type:string)=>{const blob=new Blob([type==='svg'?svg:`<svg xmlns="http://www.w3.org/2000/svg">${svg}</svg>`],{type:'image/svg+xml'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=`qr-forge.${type}`; a.click();};
  return <section id="studio" className="mx-auto grid max-w-7xl gap-6 px-6 py-14 lg:grid-cols-[1.05fr_.95fr]">
    <div className="glass rounded-3xl p-6 shadow-glow"><div className="mb-5 flex items-center justify-between"><h2 className="text-2xl font-bold">Live QR Studio</h2><span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm text-emerald-600">Instant preview</span></div>
      <label className="text-sm font-medium">Content type</label><select className="mt-2 w-full rounded-2xl border bg-white/70 p-3 dark:bg-slate-950" value={kind} onChange={e=>{setKind(e.target.value as QrKind);setFields({});}}>{qrKinds.map(k=><option key={k}>{k}</option>)}</select>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">{presets[kind].map(name=><label key={name} className="text-sm font-medium capitalize">{name}<input className="mt-1 w-full rounded-2xl border bg-white/70 p-3 normal-case dark:bg-slate-950" value={fields[name]??''} onChange={e=>setFields({...fields,[name]:e.target.value})} placeholder={name==='url'?'https://your.link':name}/></label>)}</div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2"><label>Foreground<input type="color" className="ml-3" value={fg} onChange={e=>setFg(e.target.value)}/></label><label>Background<input type="color" className="ml-3" value={bg} onChange={e=>setBg(e.target.value)}/></label><label>Size<input type="range" min="256" max="4096" step="128" value={size} onChange={e=>setSize(+e.target.value)}/><b>{size}px</b></label><label>Margin<input type="range" min="0" max="8" value={margin} onChange={e=>setMargin(+e.target.value)}/><b>{margin}</b></label><label>Error correction<select className="ml-3 rounded-xl border p-2" value={level} onChange={e=>setLevel(e.target.value as 'L'|'M'|'Q'|'H')}>{['L','M','Q','H'].map(x=><option key={x}>{x}</option>)}</select></label></div>
    </div><div className="glass rounded-3xl p-6 text-center"><div className="mx-auto max-w-sm rounded-[2rem] bg-white p-6 shadow-2xl" dangerouslySetInnerHTML={{__html:svg}}/><p className="mt-4 break-all text-sm text-slate-500">{content}</p><div className="mt-6 flex flex-wrap justify-center gap-2">{['png','svg','pdf','jpeg','webp'].map(t=><button className="rounded-full bg-slate-950 px-4 py-2 text-white dark:bg-white dark:text-slate-950" key={t} onClick={()=>download(t)}>{t.toUpperCase()}</button>)}<button className="rounded-full border px-4 py-2" onClick={()=>navigator.clipboard.writeText(content)}>Copy content</button></div></div>
  </section>
}
