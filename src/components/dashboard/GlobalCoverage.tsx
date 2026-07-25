import { motion } from 'framer-motion';
import { Radar } from 'lucide-react';
import { GlassCard, SectionHeading } from '@/components/ui/GlassCard';
import { COVERAGE_NODES, COVERAGE_LINKS } from '@/constants/data';

const nodeMap = Object.fromEntries(COVERAGE_NODES.map((n) => [n.id, n]));

export function GlobalCoverage() {
  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Ground Network"
          title="Global Coverage"
          subtitle="Ground stations and spaceports across six continents, linked by animated communication routes that keep the constellation in constant contact."
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          {/* Map */}
          <GlassCard hud className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Radar className="w-5 h-5 text-neon-cyan animate-spin-slower" />
                <span className="font-heading text-sm uppercase tracking-widest text-slate-300">Ground Station Network</span>
              </div>
              <span className="font-body text-xs text-neon-green">All stations online</span>
            </div>

            <div className="relative aspect-[2/1] w-full rounded-lg overflow-hidden bg-space-900/50 grid-overlay">
              {/* Simplified world map silhouette via SVG */}
              <svg viewBox="0 0 100 50" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                {/* Continent blobs (abstract) */}
                <g fill="#0f1d3a" stroke="#22d3ee" strokeOpacity="0.15" strokeWidth="0.2">
                  {/* North America */}
                  <path d="M10,15 Q15,10 22,12 L25,18 L20,24 L14,22 Z" />
                  {/* South America */}
                  <path d="M22,26 L26,28 L24,40 L20,38 Z" />
                  {/* Europe */}
                  <path d="M45,14 L52,12 L54,18 L48,20 Z" />
                  {/* Africa */}
                  <path d="M48,22 L56,22 L54,34 L50,38 L46,30 Z" />
                  {/* Asia */}
                  <path d="M55,12 L78,10 L82,18 L75,24 L65,22 L58,18 Z" />
                  {/* Australia */}
                  <path d="M75,32 L84,32 L82,38 L76,38 Z" />
                </g>

                {/* Communication routes */}
                {COVERAGE_LINKS.map(([a, b], i) => {
                  const na = nodeMap[a];
                  const nb = nodeMap[b];
                  return (
                    <g key={i}>
                      <motion.line
                        x1={na.x}
                        y1={na.y}
                        x2={nb.x}
                        y2={nb.y}
                        stroke="#22d3ee"
                        strokeWidth="0.25"
                        strokeOpacity="0.5"
                        strokeDasharray="1 1"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2, duration: 1 }}
                      />
                      {/* Animated packet */}
                      <motion.circle
                        r="0.4"
                        fill="#22d3ee"
                        initial={{ cx: na.x, cy: na.y }}
                        animate={{ cx: [na.x, nb.x], cy: [na.y, nb.y] }}
                        transition={{ duration: 2.5, delay: i * 0.4, repeat: Infinity, ease: 'linear' }}
                        style={{ filter: 'drop-shadow(0 0 1px #22d3ee)' }}
                      />
                    </g>
                  );
                })}

                {/* Station markers */}
                {COVERAGE_NODES.map((node, i) => (
                  <g key={node.id}>
                    <motion.circle
                      cx={node.x}
                      cy={node.y}
                      r="1"
                      fill="#22d3ee"
                      fillOpacity="0.3"
                      stroke="#22d3ee"
                      strokeWidth="0.2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15, duration: 0.5 }}
                      style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                    />
                    <motion.circle
                      cx={node.x}
                      cy={node.y}
                      r="0.4"
                      fill="#22d3ee"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                    />
                    <text x={node.x} y={node.y - 2} textAnchor="middle" fontSize="1.6" fill="#94a3b8" className="font-mono">
                      {node.name}
                    </text>
                  </g>
                ))}
              </svg>

              {/* Scan line */}
              <motion.div
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent"
                initial={{ top: '0%' }}
                animate={{ top: '100%' }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </GlassCard>

          {/* Station list */}
          <GlassCard hud className="p-6">
            <span className="font-heading text-sm uppercase tracking-widest text-slate-300 mb-4 block">Active Stations</span>
            <div className="space-y-3">
              {COVERAGE_NODES.map((node, i) => (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between border-b border-white/5 pb-3"
                >
                  <div>
                    <div className="font-body text-sm text-white">{node.name}</div>
                    <div className="font-mono text-[10px] text-slate-500">STN-{String(i + 1).padStart(3, '0')}</div>
                  </div>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-neon-green animate-pulse" />
                    <span className="font-heading text-[10px] uppercase tracking-widest text-neon-green">Online</span>
                  </span>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
