import { motion } from 'framer-motion';

export default function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="relative py-20 px-4 sm:px-8 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        {title && <h2 className="text-3xl sm:text-4xl font-bold mb-3">{title}</h2>}
        {subtitle && <p className="text-slate-300 mb-8 max-w-3xl">{subtitle}</p>}
        {children}
      </motion.div>
    </section>
  );
}
