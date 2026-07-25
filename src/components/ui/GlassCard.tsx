import { forwardRef, type HTMLAttributes } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  hover?: boolean;
  hud?: boolean;
  glow?: 'cyan' | 'blue' | 'none';
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, hover = true, hud = false, glow = 'none', children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={hover ? { y: -6, scale: 1.01 } : undefined}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={cn(
          'glass rounded-2xl relative overflow-hidden',
          glow === 'cyan' && 'shadow-neon-cyan',
          glow === 'blue' && 'shadow-neon-blue',
          hud && 'hud-corner',
          className,
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);

GlassCard.displayName = 'GlassCard';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'live' | 'info' | 'success' | 'warning' | 'neutral';
}

export function Badge({ variant = 'neutral', className, children, ...props }: BadgeProps) {
  const variants = {
    live: 'bg-neon-red/10 text-neon-red border-neon-red/40',
    info: 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/40',
    success: 'bg-neon-green/10 text-neon-green border-neon-green/40',
    warning: 'bg-neon-amber/10 text-neon-amber border-neon-amber/40',
    neutral: 'bg-white/5 text-slate-300 border-white/10',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-heading font-semibold uppercase tracking-widest',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'center', className }: SectionHeadingProps) {
  return (
    <div className={cn('flex flex-col gap-3', align === 'center' ? 'items-center text-center' : 'items-start', className)}>
      {eyebrow && (
        <span className="font-heading text-xs uppercase tracking-[0.3em] text-neon-cyan/80">{eyebrow}</span>
      )}
      <h2 className="font-display text-3xl md:text-5xl font-bold text-white text-balance">{title}</h2>
      {subtitle && <p className="font-body text-slate-400 max-w-2xl text-balance">{subtitle}</p>}
    </div>
  );
}
