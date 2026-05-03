import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FaDiscord, FaInstagram, FaMinecraft } from 'react-icons/fa';
import { MdEmail, MdContentCopy } from 'react-icons/md';
import Section from './components/Section';

const nav = ['Home', 'About', 'Skills', 'Minecraft', 'Discord Bots', 'Projects', 'Contact'];
const copy = async (text) => navigator.clipboard?.writeText(text);
const videoOrFallback = (src) => <video className="w-full h-full object-cover" src={src} autoPlay muted loop playsInline preload="metadata" />;

export default function App() {
  const reduced = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), reduced ? 200 : 2400); return () => clearTimeout(t); }, [reduced]);

  const projects = useMemo(() => [
    'GG Recording Discord Bot System','Premium Ticket Bot','Minecraft Server Setup','Minecraft Plugin System','Minecraft Modpack / Resource Pack Work','Web App / UI Projects','ChatGPT + Codex Portfolio Website'
  ], []);

  return (
    <div className="min-h-screen relative">
      <AnimatePresence>{!loaded && !reduced && <EntryAnimation />}</AnimatePresence>
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/70 border-b border-white/10">
        <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="font-bold text-lg">blaze.sarthak</span>
          <button className="sm:hidden" onClick={() => setOpen(!open)}>☰</button>
          <ul className="hidden sm:flex gap-5 text-sm">{nav.map(n => <li key={n}><a href={`#${n.toLowerCase().replace(' ','-')}`} className="hover:text-cyan-300">{n}</a></li>)}</ul>
        </nav>
        {open && <ul className="sm:hidden px-4 pb-4 space-y-2">{nav.map(n => <li key={n}><a onClick={()=>setOpen(false)} href={`#${n.toLowerCase().replace(' ','-')}`}>{n}</a></li>)}</ul>}
      </header>

      <main>
        <section id="home" className="min-h-screen px-4 py-12 grid-bg">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7}}>
              <span className="glass px-3 py-1 inline-block text-xs mb-4">Made with ChatGPT + Codex</span>
              <h1 className="text-5xl font-black leading-tight">Sarthak | Developer</h1>
              <p className="text-slate-300 mt-5">Building Discord Bots, Minecraft Servers, Plugins, Modpacks, Resource Packs, Web Apps & Premium Digital Experiences.</p>
            </motion.div>
            <div className="glass neon-border overflow-hidden aspect-video">{videoOrFallback('/videos/hero.mp4')}</div>
          </div>
        </section>

        <Section id="about" title="About" subtitle="I’m Sarthak, a developer focused on building premium Discord bots, Minecraft server systems, plugins, modpacks, resource packs, and modern web experiences. I create clean, powerful, and user-friendly digital systems for communities, creators, and gaming servers.">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{['Started with Minecraft','Learned Discord server systems','Built Discord bots','Created server tools/plugins','Started building web/apps','Now creating premium digital experiences with ChatGPT + Codex'].map(i => <div className="glass p-4" key={i}>{i}</div>)}</div>
        </Section>

        <Section id="skills" title="Skills"><div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">{['Python','JavaScript','React','Tailwind CSS','Framer Motion','Discord.py','Discord.js','Minecraft Server Setup','Minecraft Plugins','Modpacks','Resource Packs','UI Design','Web Development','Automation','ChatGPT Prompting','Codex Development Workflow'].map(s => <motion.div whileHover={{y:-4,rotateX:4}} className="glass p-4" key={s}>{s}</motion.div>)}</div></Section>

        <Section id="minecraft" title="Minecraft"><div className="grid lg:grid-cols-2 gap-5"><div className="glass p-5"><p>IGN: <b>Sound_CYBR</b> <span className="ml-2 text-emerald-300">Premium Minecraft Account</span></p><div className="mt-3 flex gap-2"><button onClick={()=>copy('Sound_CYBR')} className="glass px-3 py-2"><MdContentCopy className='inline'/> Copy Minecraft IGN</button></div></div><img loading="lazy" src="/images/minecraft-avatar.png" onError={(e)=>{e.currentTarget.src='https://mc-heads.net/avatar/Sound_CYBR/200';}} className="glass p-2 w-40"/></div></Section>

        <Section id="discord-bots" title="Discord Bots"><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{['Custom Discord Bots','Ticket Bots','Welcome Systems','Booster Systems','Moderation Bots','Server Setup','Role Systems','Auto Messages'].map(s=><div key={s} className="glass p-4">{s}</div>)}</div><p className='mt-4'>Discord ID: 1243925199074885753</p></Section>

        <Section id="projects" title="Projects"><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">{projects.map(p => <motion.div whileHover={{scale:1.02}} key={p} className="glass p-5"><h3 className="font-semibold">{p}</h3><p className="text-sm text-slate-300 mt-2">Premium build using modern stack.</p><button className="mt-4 text-cyan-300">View Details</button></motion.div>)}</div></Section>

        <Section id="contact" title="Contact">
          <div className="glass p-6 space-y-3">
            <p><MdEmail className='inline mr-2'/>sarthaklive9967@gmail.com</p>
            <p><FaInstagram className='inline mr-2'/>blaze.sarthak</p>
            <p><FaDiscord className='inline mr-2'/>1243925199074885753</p>
            <p><FaMinecraft className='inline mr-2'/>Sound_CYBR</p>
          </div>
        </Section>
      </main>
    </div>
  );
}

function EntryAnimation() {
  return <motion.div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-lg flex items-center justify-center" exit={{opacity:0,transition:{duration:0.6}}}><motion.div initial={{y:-400,rotate:10}} animate={{y:0,rotate:0}} transition={{type:'spring',bounce:0.5,duration:1.2}} className="w-24 h-24 rounded-md bg-gradient-to-b from-green-400 via-green-600 to-amber-900 shadow-neon"/></motion.div>;
}
