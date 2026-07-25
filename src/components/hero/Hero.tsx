import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Rocket, Satellite, Activity, ArrowRight, Radio } from 'lucide-react';
import { NeonButton } from '@/components/ui/NeonButton';
import { Badge, GlassCard } from '@/components/ui/GlassCard';
import { EarthScene } from '@/components/earth/EarthScene';
import { MissionStatusCard, FloatingTelemetryCard, SatelliteInfoCard } from '@/components/earth/TelemetryCards';
import { HERO_STATS } from '@/constants/data';

const STAT_ICONS = {
  rocket: Rocket,
  pulse: Activity,
  satellite: Satellite,
} as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-[42fr_58fr] gap-8 items-center w-full">
        {/* LEFT */}
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-6">
          <motion.div variants={item}>
            <Badge variant="live" className="animate-pulse-glow">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-red opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-red" />
              </span>
              Live Mission
            </Badge>
          </motion.div>

          <motion.h1 variants={item} className="font-display text-6xl md:text-7xl xl:text-8xl font-black leading-[0.95] text-white">
            DHRUV
          </motion.h1>

          <motion.div variants={item} className="font-heading text-xl md:text-2xl uppercase tracking-[0.2em] gradient-text font-semibold">
            Mission Intelligence Suite
          </motion.div>

          <motion.p variants={item} className="font-body text-slate-300 text-lg max-w-md leading-relaxed">
            Monitor • Analyze • Simulate • Control. A unified command center for orbital operations,
            telemetry, and mission-critical decision-making in real time.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4">
            <NeonButton size="lg" href="#missions">
              <Rocket className="w-5 h-5" /> Launch Mission
            </NeonButton>
            <NeonButton size="lg" variant="secondary" href="#missions">
              Explore Missions <ArrowRight className="w-5 h-5" />
            </NeonButton>
          </motion.div>

          {/* Stats */}
          <motion.div variants={item} className="grid grid-cols-3 gap-4 mt-4">
            {HERO_STATS.map((stat) => {
              const Icon = STAT_ICONS[stat.icon as keyof typeof STAT_ICONS];
              return (
                <GlassCard key={stat.id} hud className="p-4">
                  <div className="flex items-center gap-2 mb-2 text-neon-cyan">
                    <Icon className="w-4 h-4" />
                    <span className="font-heading text-[10px] uppercase tracking-widest text-slate-400">{stat.label}</span>
                  </div>
                  <div className="font-display text-2xl md:text-3xl font-bold text-white">
                    <CountUp end={stat.value} duration={2} suffix={stat.suffix} />
                  </div>
                </GlassCard>
              );
            })}
          </motion.div>
        </motion.div>

        {/* RIGHT — 3D Earth + HUD overlays */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
          className="relative h-[420px] md:h-[560px] lg:h-[640px]"
        >
          <div className="absolute inset-0">
            <EarthScene />
          </div>

          {/* Floating HUD cards */}
          <div className="absolute top-6 left-2 md:left-0 animate-float">
            <MissionStatusCard delay={1} />
          </div>
          <div className="absolute top-1/3 right-2 md:right-4 animate-float" style={{ animationDelay: '1.5s' }}>
            <FloatingTelemetryCard delay={1.4} />
          </div>
          <div className="absolute bottom-10 left-4 md:left-12 animate-float" style={{ animationDelay: '2s' }}>
            <SatelliteInfoCard delay={1.8} />
          </div>

          {/* Corner HUD reticle */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[80%] w-[80%] rounded-full border border-neon-cyan/10" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-neon-cyan/5" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-neon-cyan/5" />
          </div>

          {/* Downlink indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-4 right-4 flex items-center gap-2 glass rounded-full px-3 py-1.5"
          >
            <Radio className="w-3.5 h-3.5 text-neon-green animate-pulse" />
            <span className="font-heading text-[10px] uppercase tracking-widest text-slate-300">Telemetry Live</span>
          </motion.div>

          {/* Interaction hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0.6] }}
            transition={{ delay: 2.5, duration: 2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-32 pointer-events-none"
          >
            <span className="font-heading text-[10px] uppercase tracking-[0.3em] text-neon-cyan/70">
              Drag to rotate • Scroll to zoom
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
