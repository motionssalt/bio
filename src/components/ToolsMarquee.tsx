import React from 'react';

export const ToolsMarquee: React.FC = () => {
  const tools = [
    'After Effects',
    'Premiere Pro',
    'Photoshop',
    'DaVinci Resolve',
    'Blender 3D',
    'Illustrator',
    'Claude 3.7',
    'Gemini 2.5',
    'Python & FFmpeg',
    'TypeScript'
  ];

  return (
    <div className="py-8 border-y border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-3 text-center">
        <span className="text-[11px] font-semibold tracking-widest uppercase text-[var(--text-muted)]">
          Core Production Arsenal & Creative Intelligence
        </span>
      </div>

      <div className="relative w-full overflow-hidden flex items-center">
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[var(--bg-surface)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[var(--bg-surface)] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center gap-10 whitespace-nowrap py-2">
          {[...tools, ...tools, ...tools].map((tool, idx) => (
            <div
              key={idx}
              className="flex items-center gap-6 text-sm font-display font-semibold tracking-wide text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <span>{tool}</span>
              <span className="text-blue-500/40 text-xs">◆</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
