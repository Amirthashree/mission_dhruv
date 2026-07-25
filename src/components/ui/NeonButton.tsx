import { forwardRef, type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';

interface NeonButtonBaseProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  href?: string;
  className?: string;
}

type NeonButtonProps = NeonButtonBaseProps &
  Omit<HTMLMotionProps<'button'>, 'children'>;

export const NeonButton = forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, href, ...props }, ref) => {
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
    };

    const variants = {
      primary:
        'bg-gradient-to-r from-neon-cyan to-neon-blue text-space-950 font-semibold shadow-neon-cyan hover:shadow-[0_0_30px_rgba(34,211,238,0.7)]',
      secondary:
        'glass-strong text-neon-cyan border-neon-cyan/40 hover:border-neon-cyan hover:shadow-neon-cyan',
      ghost: 'text-slate-300 hover:text-white border border-white/10 hover:border-white/30',
    };

    const classes = cn(
      'relative inline-flex items-center justify-center gap-2 rounded-xl font-heading font-semibold uppercase tracking-widest overflow-hidden group cursor-pointer',
      sizes[size],
      variants[variant],
      className,
    );

    const content = (
      <>
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
        {variant === 'primary' && (
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        )}
      </>
    );

    const motionProps = {
      whileHover: { scale: 1.04 },
      whileTap: { scale: 0.97 },
      transition: { type: 'spring' as const, stiffness: 400, damping: 17 },
    };

    if (href) {
      return (
        <motion.a href={href} className={classes} {...motionProps}>
          {content}
        </motion.a>
      );
    }

    return (
      <motion.button ref={ref} className={classes} {...motionProps} {...props}>
        {content}
      </motion.button>
    );
  },
);

NeonButton.displayName = 'NeonButton';
