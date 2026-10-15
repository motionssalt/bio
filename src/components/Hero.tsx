import React, { useRef, useState } from 'react';
import { Play, Sparkles, ArrowDown, ExternalLink } from 'lucide-react';
import { CatalogItem } from '../types/catalog.ts';

interface HeroProps {
  featuredItem?: CatalogItem;
  onOpenProject: (item: CatalogItem) => void;
  isUpworkMode?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ featuredItem, onOpenProject, isUpworkMode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePreview = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <section id="top" className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden">
      {/* Background kinetic ambient mesh */}
      <div 
        aria-hidden="true" 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-20 dark:opacity-25"
      >
        <div className="absolute top-10 left-1/4 w-72 h-72 rounded-full bg-blue-500 blur-[120px]" />
        <div className="absolute top-20 right-1/4 w-80 h-80 rounded-full bg-indigo-500 blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typographic Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Kicker (Zero-pill discipline: unboxed clean text) */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-4">
              <span>Victor Jumbo · Motionsalt</span>
              <span aria-hidden="true">·</span>
              <span>Available for Global Commissions</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-[var(--text-primary)] mb-6 text-balance">
              Crafting kinetic stories through frames, code, and pure motion.
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-8">
              Solo motion designer and video editor specializing in high-retention commercial edits, anime AMVs, dynamic kinetic typography, and bold graphic design.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-xl shadow-sm transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <span>Explore Works</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              {!isUpworkMode ? (
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[var(--text-primary)] bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-mid)] rounded-xl transition-all"
                >
                  <span>Connect Directly</span>
                  <ExternalLink className="w-4 h-4 text-[var(--text-muted)]" />
                </a>
              ) : (
                <a
                  href="https://www.upwork.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-xl transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Hire on Upwork</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Hero Visual Container */}
          <div className="lg:col-span-5">
            {featuredItem ? (
              <div 
                className="group relative rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-xl cursor-pointer"
                onClick={() => onOpenProject(featuredItem)}
                onMouseEnter={() => {
                  if (videoRef.current && featuredItem.previewClip) {
                    videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
                  }
                }}
                onMouseLeave={() => {
                  if (videoRef.current && featuredItem.previewClip) {
                    videoRef.current.pause();
                    setIsPlaying(false);
                  }
                }}
              >
                {/* Visual Aspect Ratio Box */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-black">
                  <img
                    src={featuredItem.poster}
                    alt={featuredItem.title}
                    className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
                      isPlaying ? 'opacity-0' : 'opacity-100'
                    }`}
                  />

                  {featuredItem.previewClip && (
                    <video
                      ref={videoRef}
                      src={featuredItem.previewClip}
                      loop
                      muted
                      playsInline
                      preload="none"
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                        isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}
                    />
                  )}

                  {/* Gradient Scrim for WCAG contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Play Action Badge */}
                  <div className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 fill-white" />
                  </div>

                  {/* Bottom Metadata */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-2 text-xs text-white/70 mb-1">
                      <span className="uppercase tracking-wider font-semibold">Featured Reel</span>
                      <span aria-hidden="true">·</span>
                      <span>{featuredItem.category.replace('-', ' ')}</span>
                    </div>
                    <h3 className="font-display font-bold text-lg leading-snug line-clamp-1 group-hover:text-blue-300 transition-colors">
                      {featuredItem.title}
                    </h3>
                  </div>
                </div>

                {/* Sub-card details */}
                <div className="p-4 bg-[var(--bg-surface)] flex items-center justify-between text-xs text-[var(--text-secondary)] border-t border-[var(--border-subtle)]">
                  <span>{featuredItem.role}</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Click to Play in Full Reel</span>
                </div>
              </div>
            ) : (
              <div className="aspect-16/10 w-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] flex items-center justify-center p-8 text-center">
                <span className="text-sm text-[var(--text-muted)]">Dynamic Showreel Initializing...</span>
              </div>
            )}
          </div>
        </div>

        {/* Full-width KPI / Trust Strip below split */}
        <div className="mt-16 pt-8 border-t border-[var(--border-subtle)] grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tabular-nums">
              100+
            </div>
            <div className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
              Commercial & Creative Cuts
            </div>
          </div>

          <div>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tabular-nums">
              5M+
            </div>
            <div className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
              Audience Reach & Impressions
            </div>
          </div>

          <div>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tabular-nums">
              3
            </div>
            <div className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
              Core Creative Disciplines
            </div>
          </div>

          <div>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tabular-nums">
              24–48h
            </div>
            <div className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
              Turnaround Speed on Priority Reels
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
