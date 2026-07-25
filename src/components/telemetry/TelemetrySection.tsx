import { motion } from 'framer-motion';
import { Activity, Radio, Satellite, Zap } from 'lucide-react';
import { GlassCard, SectionHeading } from '@/components/ui/GlassCard';
import { AnimatedLineChart, AnimatedBarChart } from './Charts';
import { TELEMETRY_FEED } from '@/constants/data';

const FEED_LEVEL: Record<string, string> = {
  info: 'text-slate-400',
  success: 'text-neon-green',
  warning: 'text-neon-amber',
};

const CHARTS = [
  {
    id: 'signal',
    title: 'Signal Strength',
    icon: Radio,
    color: '#22d3ee',
    data: [62, 68, 71, 75, 73, 80, 84, 88, 92, 90, 95, 99],
    unit: 'dBm',
    current: '-92',
  },
  {
    id: 'power',
    title: 'Power Output',
    icon: Zap,
    color: '#3b82f6',
    data: [40, 45, 52, 58, 62, 70, 75, 72, 68, 74, 80, 87],
    unit: 'kW',
    current: '4.2',
  },
  {
    id: 'thermal',
    title: 'Thermal Profile',
    icon: Activity,
    color: '#6366f1',
    data: [21, 22, 24, 23, 22, 21, 20, 21, 22, 21, 21, 21],
    unit: '°C',
    current: '21.4',
  },
];

export function TelemetrySection() {
  return (
    <section id="telemetry" className="relative py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Live Data Streams"
          title="Telemetry & Analytics"
          subtitle="High-fidelity telemetry from every node in the constellation, visualized in real time for mission controllers."
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Charts */}
          {CHARTS.map((chart, idx) => {
            const Icon = chart.icon;
            return (
              <motion.div
                key={chart.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: idx * 0.12, duration: 0.7 }}
              >
                <GlassCard hud className="p-6 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5" style={{ color: chart.color }} />
                      <span className="font-heading text-sm uppercase tracking-widest text-slate-300">{chart.title}</span>
                    </div>
                    <span className="font-display text-lg font-bold text-white">
                      {chart.current}<span className="text-xs text-slate-400 ml-1">{chart.unit}</span>
                    </span>
                  </div>
                  <AnimatedLineChart data={chart.data} color={chart.color} />
                </GlassCard>
              </motion.div>
            );
          })}

          {/* Data throughput bar chart */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.36, duration: 0.7 }}
            className="lg:col-span-2"
          >
            <GlassCard hud className="p-6 h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Satellite className="w-5 h-5 text-neon-cyan" />
                  <span className="font-heading text-sm uppercase tracking-widest text-slate-300">Data Throughput — 24h</span>
                </div>
                <span className="font-display text-lg font-bold text-neon-cyan">142 TB</span>
              </div>
              <AnimatedBarChart
                data={[12, 18, 24, 30, 28, 35, 42, 48, 52, 46, 50, 58, 62, 55, 60, 68, 72, 65, 70, 78, 82, 74, 80, 88]}
                color="#22d3ee"
                height={180}
              />
              <div className="flex justify-between mt-2 font-body text-[10px] text-slate-500">
                <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span>
              </div>
            </GlassCard>
          </motion.div>

          {/* Scrolling data feed */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.48, duration: 0.7 }}
          >
            <GlassCard hud className="p-6 h-full">
              <div className="flex items-center gap-2 mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-green opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-green" />
                </span>
                <span className="font-heading text-sm uppercase tracking-widest text-slate-300">Live Data Feed</span>
              </div>
              <div className="space-y-3 max-h-[200px] overflow-hidden">
                {TELEMETRY_FEED.map((entry, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex gap-3 text-xs font-body border-b border-white/5 pb-2"
                  >
                    <span className="text-slate-500 font-mono shrink-0">{entry.time}</span>
                    <span className="text-neon-cyan font-mono shrink-0 w-28">{entry.channel}</span>
                    <span className={`flex-1 ${FEED_LEVEL[entry.level]}`}>{entry.message}</span>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
