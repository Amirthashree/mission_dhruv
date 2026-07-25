import { motion } from 'framer-motion';
import { Radio, Satellite, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/GlassCard';

interface TelemetryCardProps {
  delay?: number;
  className?: string;
}

export function MissionStatusCard({ delay = 0, className }: TelemetryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8 }}
      className={`glass-strong hud-corner rounded-xl p-4 w-44 ${className ?? ''}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-heading text-[10px] uppercase tracking-widest text-slate-400">Mission Status</span>
        <Badge variant="success" className="text-[9px] px-2 py-0.5">Nominal</Badge>
      </div>
      <div className="font-display text-2xl font-bold text-neon-cyan neon-text">ORBIT</div>
      <div className="font-body text-xs text-slate-400 mt-1">Phase 03 — Docking</div>
      <div className="mt-3 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-neon-cyan to-neon-blue"
          initial={{ width: 0 }}
          animate={{ width: '62%' }}
          transition={{ delay: delay + 0.5, duration: 1.2 }}
        />
      </div>
    </motion.div>
  );
}

export function FloatingTelemetryCard({ delay = 0, className }: TelemetryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.8 }}
      className={`glass rounded-xl p-3 w-40 ${className ?? ''}`}
    >
      <div className="flex items-center gap-2 mb-1">
        <Radio className="w-3.5 h-3.5 text-neon-cyan" />
        <span className="font-heading text-[10px] uppercase tracking-widest text-slate-300">Downlink</span>
      </div>
      <div className="font-display text-lg font-bold text-white">142 Mbps</div>
      <div className="font-body text-[10px] text-neon-green">▲ +12% stable</div>
    </motion.div>
  );
}

export function SatelliteInfoCard({ delay = 0, className }: TelemetryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.8 }}
      className={`glass rounded-xl p-3 w-40 ${className ?? ''}`}
    >
      <div className="flex items-center gap-2 mb-1">
        <Satellite className="w-3.5 h-3.5 text-neon-blue" />
        <span className="font-heading text-[10px] uppercase tracking-widest text-slate-300">DHRUV-03</span>
      </div>
      <div className="font-display text-lg font-bold text-white">412.3 km</div>
      <div className="flex items-center gap-1 font-body text-[10px] text-slate-400">
        <Activity className="w-3 h-3 text-neon-green" /> Signal locked
      </div>
    </motion.div>
  );
}
