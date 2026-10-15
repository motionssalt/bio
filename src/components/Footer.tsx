import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  lastSyncedAt?: string;
  isUpworkMode?: boolean;
  onToggleUpworkMode?: (upwork: boolean) => void;
}

export const Footer: React.FC<FooterProps> = ({ lastSyncedAt, isUpworkMode, onToggleUpworkMode }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-black flex items-center justify-center p-0.5 border border-white/20">
              <img 
                src="/logo.png" 
                alt="MOTIONSALT emblem" 
                className="w-full h-full object-contain filter invert dark:invert-0"
              />
            </div>
            <span className="font-display font-bold text-sm tracking-widest text-[var(--text-primary)]">
              MOTIONSALT
            </span>
            <span className="text-xs text-[var(--text-muted)]">· Designed in motion</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-[var(--text-muted)]">
            {lastSyncedAt && (
              <span title={lastSyncedAt}>
                Catalogue synced: {new Date(lastSyncedAt).toLocaleDateString()}
              </span>
            )}
            
            {onToggleUpworkMode && (
              <button
                type="button"
                onClick={() => onToggleUpworkMode(!isUpworkMode)}
                className="hover:text-[var(--text-primary)] transition-colors underline"
              >
                {isUpworkMode ? 'Switch to Full Portfolio' : 'Switch to Upwork Safe View'}
              </button>
            )}

            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[var(--bg-surface-elevated)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] transition-colors"
              title="Scroll to Top"
              aria-label="Scroll to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[var(--text-muted)]">
          <p>© {new Date().getFullYear()} MOTIONSALT (Victor Jumbo). All rights reserved.</p>
          <p>Keyless Google Drive Sync Architecture · Cloudflare Edge Hosted</p>
        </div>
      </div>
    </footer>
  );
};
