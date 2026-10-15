import React from 'react';
import { Film, Zap, Palette, Code, CheckCircle2 } from 'lucide-react';

export const Services: React.FC = () => {
  const serviceList = [
    {
      num: '01',
      title: 'Video Editing & Visual Cuts',
      shortDesc: 'Pacing-focused commercial video editing, high-velocity anime edits (AMVs), and YouTube long-form content engineered for maximum retention.',
      points: [
        'Speed ramping & kinetic micro-cutting',
        'Cinematic color grading & LUT balancing',
        'Sound design & punchy Foley synchronization',
        'Format optimization for 9:16 Shorts/Reels & 16:9 YouTube'
      ],
      tools: 'Premiere Pro · DaVinci Resolve · After Effects'
    },
    {
      num: '02',
      title: 'Motion Graphics & VFX',
      shortDesc: 'Dynamic title sequences, animated kinetic typography, logo animations, explainer motion, and stylized particle visual effects.',
      points: [
        'Custom kinetic text animation & expressive easing',
        '2D/2.5D visual effects compositing & glow passes',
        'SaaS product interface promotional showcases',
        'Lottie & transparent video exports for web'
      ],
      tools: 'After Effects · Illustrator · Blender'
    },
    {
      num: '03',
      title: 'Graphic Design & Key Visuals',
      shortDesc: 'High-converting YouTube thumbnails, striking music cover art, event flyers, and visual identity systems with bold brutalist and cyberpunk flair.',
      points: [
        'High-CTR YouTube thumbnail design & composition',
        'Album artwork, streaming covers & promotional posters',
        'Social media banner packages (X, YouTube, TikTok)',
        'Custom typography lockups & editorial layout'
      ],
      tools: 'Photoshop · Illustrator · Figma'
    }
  ];

  return (
    <section id="services" className="py-20 sm:py-28 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-2">
            Creative Capabilities
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--text-primary)] mb-4">
            Crafting visual velocity across three core disciplines.
          </h2>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed">
            Every project combines tight rhythmic pacing, custom typography, and surgical frame-by-frame attention to elevate your visual identity.
          </p>
        </div>

        {/* 3-Column Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceList.map((svc) => (
            <div
              key={svc.num}
              className="p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex flex-col justify-between hover:border-[var(--border-mid)] transition-colors shadow-xs"
            >
              <div>
                <div className="font-display text-sm font-bold text-blue-600 dark:text-blue-400 mb-3">
                  {svc.num}.
                </div>

                <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">
                  {svc.title}
                </h3>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                  {svc.shortDesc}
                </p>

                <ul className="space-y-2.5 mb-8">
                  {svc.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)]">
                <span className="font-semibold text-[var(--text-secondary)]">Primary Stack: </span>
                <span>{svc.tools}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary Capability Note: Code & Automation */}
        <div className="mt-12 p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                Secondary Strength: Python Automation & Web Development
              </h4>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Automated video rendering pipelines, Telegram/Discord content bots, and custom web frontends for creators.
              </p>
            </div>
          </div>
          <span className="text-xs text-[var(--text-muted)] font-mono whitespace-nowrap">
            Python · TS · APIs · Shell
          </span>
        </div>

      </div>
    </section>
  );
};
