import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import {
  Rocket, Orbit, Satellite, Gauge, Radio, Activity,
  type LucideIcon,
} from 'lucide-react';
import { GlassCard, SectionHeading } from '@/components/ui/GlassCard';
import { DASHBOARD_CARDS } from '@/constants/data';

const ICONS: Record<string, LucideIcon> = {
  Rocket, Orbit, Satellite, Gauge, Radio, Activity,
};

const COLOR_MAP: Record<string, { text: string; glow: string; bar: string }> = {
  cyan: { text: 'text-neon-cyan', glow: 'shadow-neon-cyan', bar: 'from-neon-cyan to-neon-blue' },
  blue: { text: 'text-neon-blue', glow: 'shadow-neon-blue', bar: 'from-neon-blue to-neon-indigo' },
  indigo: { text: 'text-neon-indigo', glow: 'shadow-neon-blue', bar: 'from-neon-indigo to-neon-blue' },
  amber: { text: 'text-neon-amber', glow: 'shadow-neon-cyan', bar: 'from-neon-amber to-neon-red' },
  green: { text: 'text-neon-green', glow: 'shadow-neon-cyan', bar: 'from-neon-green to-neon-cyan' },
};

const STATUS_DOT: Record<string, string> = {
  nominal: 'bg-neon-green',
  caution: 'bg-neon-amber',
  offline: 'bg-neon-red',
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export function MissionDashboard() {
  return (
    <section id="missions" className="relative py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Real-time Overview"
          title="Mission Dashboard"
          subtitle="Live operational metrics across the entire orbital fleet, updated continuously from ground and space-based sensors."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {DASHBOARD_CARDS.map((card) => {
            const Icon = ICONS[card.icon];
            const colors = COLOR_MAP[card.color];
            return (
              <motion.div key={card.id} variants={item}>
                <GlassCard hud glow={card.color === 'amber' ? 'cyan' : 'none'} className="p-6 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 ${colors.text}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`h-2 w-2 rounded-full ${STATUS_DOT[card.status]} animate-pulse`} />
                      <span className="font-heading text-[10px] uppercase tracking-widest text-slate-400">{card.status}</span>
                    </div>
                  </div>

                  <div className="font-heading text-xs uppercase tracking-widest text-slate-400 mb-1">{card.title}</div>
                  <div className={`font-display text-4xl font-bold ${colors.text}`}>
                    <CountUp end={card.value} duration={2.5} suffix={card.suffix} />
                  </div>

                  <div className="mt-4 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${colors.bar}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min(card.value, 100)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, ease: 'easeOut' }}
                    />
                  </div>

                  <div className="mt-3 font-body text-xs text-slate-400">{card.delta}</div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
