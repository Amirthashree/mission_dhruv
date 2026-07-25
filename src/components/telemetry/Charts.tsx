import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface LineChartProps {
  data: number[];
  color?: string;
  height?: number;
  fill?: boolean;
}

export function AnimatedLineChart({ data, color = '#22d3ee', height = 160, fill = true }: LineChartProps) {
  const { path, areaPath, points } = useMemo(() => {
    const width = 100;
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const step = width / (data.length - 1);

    const pts = data.map((v, i) => ({
      x: i * step,
      y: height - ((v - min) / range) * (height - 20) - 10,
    }));

    const pathD = pts
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
      .join(' ');
    const areaD = `${pathD} L ${width} ${height} L 0 ${height} Z`;

    return { path: pathD, areaPath: areaD, points: pts };
  }, [data, height]);

  return (
    <svg viewBox={`0 0 100 ${height}`} preserveAspectRatio="none" className="w-full" style={{ height }}>
      <defs>
        <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      {fill && (
        <motion.path
          d={areaPath}
          fill={`url(#grad-${color})`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      )}

      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: 'easeInOut' }}
        style={{ filter: `drop-shadow(0 0 4px ${color}80)` }}
      />

      {points.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="1.2"
          fill={color}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 * i + 0.8 }}
        />
      ))}
    </svg>
  );
}

interface BarChartProps {
  data: number[];
  color?: string;
  height?: number;
}

export function AnimatedBarChart({ data, color = '#3b82f6', height = 160 }: BarChartProps) {
  return (
    <div className="flex items-end gap-1.5" style={{ height }}>
      {data.map((v, i) => {
        const pct = (v / Math.max(...data)) * 100;
        return (
          <motion.div
            key={i}
            className="flex-1 rounded-t-sm"
            style={{ background: `linear-gradient(to top, ${color}, ${color}40)`, boxShadow: `0 0 8px ${color}40` }}
            initial={{ height: 0 }}
            whileInView={{ height: `${pct}%` }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.7, ease: 'easeOut' }}
          />
        );
      })}
    </div>
  );
}
