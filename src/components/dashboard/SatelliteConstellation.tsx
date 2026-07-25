import { useState } from 'react';
import { motion } from 'framer-motion';
import { Satellite } from 'lucide-react';
import { GlassCard, SectionHeading } from '@/components/ui/GlassCard';
import { SATELLITES } from '@/constants/data';

const STATUS_COLOR: Record<string, string> = {
  nominal: '#22d3ee',
  caution: '#fbbf24',
  offline: '#ff4d6d',
};

const CONNECTIONS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 6], [4, 5], [5, 6], [0, 4], [1, 5], [2, 6], [7, 4],
];

export function SatelliteConstellation() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Orbital Network"
          title="Satellite Constellation"
          subtitle="An interactive view of the DHRUV constellation — nodes linked by live communication channels across the orbital mesh."
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          {/* SVG visualization */}
          <GlassCard hud className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-heading text-sm uppercase tracking-widest text-slate-300">Constellation Map</span>
              <span className="font-body text-xs text-neon-green">8 nodes • 10 links</span>
            </div>
            <svg viewBox="0 0 700 400" className="w-full h-auto">
              {/* Connections */}
              {CONNECTIONS.map(([a, b], i) => (
                <motion.line
                  key={i}
                  x1={SATELLITES[a].x}
                  y1={SATELLITES[a].y}
                  x2={SATELLITES[b].x}
                  y2={SATELLITES[b].y}
                  stroke="#22d3ee"
                  strokeWidth="1"
                  strokeOpacity={hovered === null ? 0.2 : hovered === a || hovered === b ? 0.7 : 0.08}
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                />
              ))}

              {/* Animated pulses along links */}
              {CONNECTIONS.map(([a, b], i) => (
                <motion.circle
                  key={`pulse-${i}`}
                  r="2"
                  fill="#22d3ee"
                  initial={{ cx: SATELLITES[a].x, cy: SATELLITES[a].y }}
                  animate={{ cx: [SATELLITES[a].x, SATELLITES[b].x], cy: [SATELLITES[a].y, SATELLITES[b].y] }}
                  transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, ease: 'linear' }}
                />
              ))}

              {/* Satellite nodes */}
              {SATELLITES.map((sat, i) => {
                const color = STATUS_COLOR[sat.status];
                const isActive = hovered === i;
                return (
                  <g
                    key={sat.id}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    {isActive && <circle cx={sat.x} cy={sat.y} r="18" fill={color} opacity="0.15" />}
                    <motion.circle
                      cx={sat.x}
                      cy={sat.y}
                      r={isActive ? 8 : 6}
                      fill={color}
                      stroke={color}
                      strokeWidth="2"
                      fillOpacity="0.2"
                      animate={{ r: isActive ? 9 : 6 }}
                      style={{ filter: `drop-shadow(0 0 6px ${color})` }}
                    />
                    <text
                      x={sat.x}
                      y={sat.y - 14}
                      textAnchor="middle"
                      className="font-mono"
                      fontSize="9"
                      fill={isActive ? '#ffffff' : '#94a3b8'}
                    >
                      {sat.id}
                    </text>
                  </g>
                );
              })}
            </svg>
          </GlassCard>

          {/* Details panel */}
          <GlassCard hud className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Satellite className="w-5 h-5 text-neon-cyan" />
              <span className="font-heading text-sm uppercase tracking-widest text-slate-300">Node Details</span>
            </div>

            {hovered !== null ? (
              <motion.div
                key={hovered}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div>
                  <div className="font-display text-2xl font-bold text-white">{SATELLITES[hovered].id}</div>
                  <div className="font-body text-xs text-slate-400">{SATELLITES[hovered].coverage}</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="glass rounded-lg p-3">
                    <div className="font-heading text-[10px] uppercase tracking-widest text-slate-400">Status</div>
                    <div className="font-display text-sm font-bold" style={{ color: STATUS_COLOR[SATELLITES[hovered].status] }}>
                      {SATELLITES[hovered].status}
                    </div>
                  </div>
                  <div className="glass rounded-lg p-3">
                    <div className="font-heading text-[10px] uppercase tracking-widest text-slate-400">Band</div>
                    <div className="font-display text-sm font-bold text-white">{SATELLITES[hovered].band}</div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-center">
                <Satellite className="w-10 h-10 text-slate-600 mb-3" />
                <p className="font-body text-sm text-slate-500">Hover a node to inspect satellite telemetry</p>
              </div>
            )}

            <div className="mt-6 space-y-2">
              {SATELLITES.map((sat) => (
                <div key={sat.id} className="flex items-center justify-between text-xs font-body">
                  <span className="text-slate-400">{sat.id}</span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: STATUS_COLOR[sat.status] }} />
                    <span className="text-slate-500">{sat.status}</span>
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
