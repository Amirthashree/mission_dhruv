import { Rocket, Github, Twitter, Linkedin, Youtube, Send } from 'lucide-react';
import { NAV_LINKS } from '@/constants/data';
import { NeonButton } from '@/components/ui/NeonButton';

const SOCIALS = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export function Footer() {
  return (
    <footer id="contact" className="relative pt-20 pb-10 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="glass-strong hud-corner rounded-2xl p-8 md:p-12">
          {/* CTA */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-10 border-b border-white/10">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white">Ready to launch your mission?</h3>
              <p className="font-body text-slate-400 mt-2">Join the next generation of aerospace command and control.</p>
            </div>
            <NeonButton size="lg" href="#home">
              <Rocket className="w-5 h-5" /> Initiate Launch
            </NeonButton>
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10">
            <div className="md:col-span-2">
              <a href="#home" className="flex items-center gap-2.5 mb-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-neon-cyan to-neon-blue shadow-neon-cyan">
                  <Rocket className="w-5 h-5 text-space-950" />
                </span>
                <span className="font-display text-xl font-bold tracking-widest text-white">DHRUV</span>
              </a>
              <p className="font-body text-sm text-slate-400 max-w-sm leading-relaxed">
                Mission Intelligence Suite — a unified platform for monitoring, analyzing, simulating,
                and controlling orbital operations with cinematic precision.
              </p>

              {/* Mission status */}
              <div className="mt-5 flex items-center gap-2 glass rounded-full px-4 py-2 w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-green opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-green" />
                </span>
                <span className="font-heading text-[10px] uppercase tracking-widest text-neon-green">All Systems Nominal</span>
              </div>
            </div>

            <div>
              <h4 className="font-heading text-xs uppercase tracking-widest text-slate-300 mb-4">Navigation</h4>
              <ul className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="font-body text-sm text-slate-400 hover:text-neon-cyan transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-xs uppercase tracking-widest text-slate-300 mb-4">Connect</h4>
              <div className="flex gap-3 mb-5">
                {SOCIALS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-lg glass text-slate-300 hover:text-neon-cyan hover:border-neon-cyan/40 hover:shadow-neon-cyan transition-all"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
              {/* Newsletter */}
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="mission@dhruv.io"
                  className="flex-1 glass rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none focus:border-neon-cyan/40"
                />
                <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-neon-cyan to-neon-blue text-space-950" aria-label="Subscribe">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6 border-t border-white/10">
            <p className="font-body text-xs text-slate-500">
              © 2026 DHRUV Mission Intelligence Suite. All systems reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="font-body text-xs text-slate-500 hover:text-neon-cyan transition-colors">Privacy</a>
              <a href="#" className="font-body text-xs text-slate-500 hover:text-neon-cyan transition-colors">Terms</a>
              <a href="#" className="font-body text-xs text-slate-500 hover:text-neon-cyan transition-colors">Security</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
