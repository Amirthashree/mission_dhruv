import { motion } from 'framer-motion';
import { Rocket, Orbit, Anchor, FlaskConical, Plane } from 'lucide-react';
import { SectionHeading } from '@/components/ui/GlassCard';
import { TIMELINE_PHASES } from '@/constants/data';

const PHASE_ICONS = [Rocket, Orbit, Anchor, FlaskConical, Plane];

const STATUS_STYLE: Record<string, { dot: string; ring: string; label: string }> = {
  complete: { dot: 'bg-neon-green', ring: 'border-neon-green/50', label: 'text-neon-green' },
  active: { dot: 'bg-neon-cyan', ring: 'border-neon-cyan', label: 'text-neon-cyan' },
  pending: { dot: 'bg-slate-600', ring: 'border-slate-600/50', label: 'text-slate-500' },
};

export function MissionTimeline() {
  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Mission Progression"
          title="Mission Timeline"
          subtitle="From liftoff to splashdown — every phase of the current orbital operation, tracked to the second."
        />

        <div className="mt-16 relative">
          {/* Horizontal line */}
          <motion.div
            className="absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-neon-green via-neon-cyan to-slate-700"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            style={{ transformOrigin: 'left' }}
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {TIMELINE_PHASES.map((phase, idx) => {
              const Icon = PHASE_ICONS[idx];
              const style = STATUS_STYLE[phase.status];
              return (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                  className="group relative flex flex-col items-center text-center"
                >
                  {/* Node */}
                  <div className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full glass-strong border-2 ${style.ring} transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className={`w-7 h-7 ${style.label}`} />
                    {phase.status === 'active' && (
                      <span className="absolute inset-0 rounded-full border-2 border-neon-cyan animate-ping opacity-40" />
                    )}
                  </div>

                  {/* Phase number */}
                  <span className="mt-3 font-display text-xs font-bold text-slate-500">{phase.phase}</span>

                  {/* Title */}
                  <h3 className="mt-1 font-heading text-base font-semibold uppercase tracking-widest text-white group-hover:text-neon-cyan transition-colors">
                    {phase.title}
                  </h3>

                  {/* Time */}
                  <span className="mt-1 font-mono text-xs text-slate-400">{phase.time}</span>

                  {/* Expandable description */}
                  <motion.p
                    className="mt-3 font-body text-xs text-slate-400 max-w-[200px] leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    {phase.description}
                  </motion.p>

                  <span className={`mt-2 font-heading text-[10px] uppercase tracking-widest ${style.label}`}>
                    {phase.status}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
