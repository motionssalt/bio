import React from 'react';
import { Youtube, Instagram, Twitter, Send, ArrowUpRight } from 'lucide-react';

export const Socials: React.FC = () => {
  const socialPlatforms = [
    {
      name: 'YouTube',
      handle: '@motionssalt',
      url: 'https://www.youtube.com/@motionssalt',
      description: 'Full-length edits, showreels, and kinetic breakdown videos.',
      icon: Youtube,
      accent: 'hover:border-red-500/40 hover:text-red-500'
    },
    {
      name: 'TikTok',
      handle: '@motionssalt',
      url: 'https://tiktok.com/@motionssalt',
      description: 'Short-form visual experiments, speed edits, and AMVs.',
      icon: ({ className }: { className?: string }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.35 22a6.33 6.33 0 0 0 6.33-6.33V8.81a8.47 8.47 0 0 0 4.91 1.55v-3.67h-1z" />
        </svg>
      ),
      accent: 'hover:border-cyan-500/40 hover:text-cyan-400'
    },
    {
      name: 'Instagram',
      handle: '@motionssalt',
      url: 'https://instagram.com/motionssalt/',
      description: 'High-res graphic art, motion snippets, and visual stories.',
      icon: Instagram,
      accent: 'hover:border-pink-500/40 hover:text-pink-500'
    },
    {
      name: 'X (Twitter)',
      handle: '@motionssalt',
      url: 'https://x.com/motionssalt',
      description: 'Daily creative thoughts, WIP clips, and industry banter.',
      icon: Twitter,
      accent: 'hover:border-blue-400/40 hover:text-blue-400'
    },
    {
      name: 'Telegram',
      handle: '@motionssalt',
      url: 'https://t.me/motionssalt',
      description: 'Direct project inquiries, asset handoff, and chat channel.',
      icon: Send,
      accent: 'hover:border-sky-500/40 hover:text-sky-400'
    }
  ];

  return (
    <section id="contact" className="py-20 sm:py-28 border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-2">
            Direct Network
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--text-primary)] mb-3">
            Connect across the ecosystem.
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">
            Explore ongoing creative cuts or message me directly for commission availability.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialPlatforms.map((soc) => {
            const Icon = soc.icon;
            return (
              <a
                key={soc.name}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group kinetic-card p-6 rounded-2xl flex flex-col justify-between transition-all ${soc.accent}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors" />
                  </div>

                  <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-1">
                    {soc.name}
                  </h3>
                  <div className="text-xs font-mono text-blue-600 dark:text-blue-400 mb-2">
                    {soc.handle}
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {soc.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-[var(--border-subtle)] text-[11px] font-semibold text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
                  Open Platform ↗
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
};
