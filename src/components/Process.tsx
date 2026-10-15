import React from 'react';

export const Process: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Brief & Sonic Rhythm',
      desc: 'We analyze your track, core message, and target platform. Pacing is mapped directly to the sonic transients to ensure every cut lands with maximum impact.'
    },
    {
      step: '02',
      title: 'Kinetic Storyboard',
      desc: 'Rough assembly of footage, keyframe timing, and typography layout. You receive an initial motion preview to align on pacing before full rendering.'
    },
    {
      step: '03',
      title: 'Precision Cut & Grade',
      desc: 'Frame-accurate micro-cutting, seamless speed ramps, stylized color grading passes, and custom particle/light effects.'
    },
    {
      step: '04',
      title: 'Foley & Final Master',
      desc: 'Immersive sound design (risers, whooshes, bass drops) mixed to broadcast standards, delivered in multiple aspect ratios (16:9, 9:16, 1:1).'
    }
  ];

  return (
    <section id="process" className="py-20 sm:py-28 border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-2">
            Production Pipeline
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--text-primary)] mb-4">
            How kinetic stories take shape.
          </h2>
          <p className="text-base text-[var(--text-secondary)]">
            A battle-tested 4-stage process designed to eliminate revisions and deliver cinematic deliverables rapidly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st) => (
            <div
              key={st.step}
              className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-mid)] transition-colors relative"
            >
              <div className="font-display font-extrabold text-2xl text-blue-600 dark:text-blue-400 mb-3 tabular-nums">
                {st.step}
              </div>
              <h3 className="font-display font-bold text-base text-[var(--text-primary)] mb-2">
                {st.title}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {st.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
