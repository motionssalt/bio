import React from 'react';
import { CatalogItem, CategoryConfig } from '../types/catalog.ts';
import { CatalogueGrid } from './CatalogueGrid.tsx';
import { ShieldCheck, Sparkles, Clock, CheckCircle2, ExternalLink } from 'lucide-react';

interface UpworkViewProps {
  items: CatalogItem[];
  categories: CategoryConfig[];
  onOpenProject: (item: CatalogItem) => void;
  upworkProfileUrl?: string;
}

export const UpworkView: React.FC<UpworkViewProps> = ({
  items,
  categories,
  onOpenProject,
  upworkProfileUrl = 'https://www.upwork.com'
}) => {
  return (
    <div className="min-h-screen">
      {/* Upwork Policy Compliance Header Banner */}
      <div className="bg-emerald-500/10 border-b border-emerald-500/20 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
            <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span className="font-medium">
              Upwork Terms of Service Compliant Portfolio. All communications & hiring remain strictly on Upwork.
            </span>
          </div>
          <span className="hidden sm:inline text-emerald-700/70 dark:text-emerald-400/70 text-[11px]">
            Zero Off-Platform Contact
          </span>
        </div>
      </div>

      {/* Upwork Client Hero */}
      <div className="py-16 sm:py-20 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold tracking-wider uppercase text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Upwork Freelancer Showcase</span>
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-5xl text-[var(--text-primary)] mb-5">
              High-Velocity Video Editing, Motion Design & Graphic Art
            </h1>

            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
              Welcome Upwork clients. Below is a comprehensive catalogue of commercial reels, anime edits, title animations, and visual assets produced for clients worldwide.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={upworkProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-all"
              >
                <span>Hire Victor on Upwork</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href="#work"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[var(--text-primary)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-mid)] rounded-xl transition-all"
              >
                <span>Browse Work Samples Below</span>
              </a>
            </div>

            {/* Contract Safety Strip */}
            <div className="mt-10 pt-6 border-t border-[var(--border-subtle)] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[var(--text-secondary)]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>100% On-Platform Escrow & Contracts</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Responsive & Fast Milestones</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Upwork Messages & Rooms Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Complete Work Catalogue */}
      <CatalogueGrid
        items={items}
        categories={categories}
        onOpenProject={onOpenProject}
      />

      {/* Upwork CTA Section at Bottom */}
      <div className="py-20 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[var(--text-primary)] mb-3">
            Ready to start your next video or motion milestone?
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mb-8">
            Send an invitation or direct message through Upwork to review project scope, deadlines, and deliverables.
          </p>
          <a
            href={upworkProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-all"
          >
            <span>Message Me on Upwork</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
