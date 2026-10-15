import React, { useState } from 'react';
import { ThemeToggle } from './ThemeToggle.tsx';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  isUpworkMode: boolean;
  onToggleUpworkMode: (upwork: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isUpworkMode, onToggleUpworkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border-subtle)] bg-[var(--bg-surface-glass)] backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single Brand Wordmark & Logo */}
        <a 
          href="#top" 
          onClick={(e) => {
            if (isUpworkMode) {
              e.preventDefault();
              onToggleUpworkMode(false);
              window.location.hash = '';
            }
          }}
          className="flex items-center gap-3 shrink-0 group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
        >
          <div className="w-8 h-8 rounded-md overflow-hidden bg-black flex items-center justify-center p-0.5 border border-[var(--border-subtle)]">
            <img 
              src="/logo.png" 
              alt="MOTIONSALT emblem" 
              className="w-full h-full object-contain filter invert dark:invert-0"
            />
          </div>
          <span className="font-display font-bold text-lg tracking-[0.16em] uppercase text-[var(--text-primary)]">
            MOTIONSALT
          </span>
        </a>

        {/* Zone 2: Navigation Links (Single Line, Whitespace-Nowrap) */}
        {!isUpworkMode ? (
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[var(--text-secondary)]">
            <a 
              href="#work" 
              className="hover:text-[var(--text-primary)] transition-colors whitespace-nowrap shrink-0"
            >
              Selected Work
            </a>
            <a 
              href="#services" 
              className="hover:text-[var(--text-primary)] transition-colors whitespace-nowrap shrink-0"
            >
              Services
            </a>
            <a 
              href="#process" 
              className="hover:text-[var(--text-primary)] transition-colors whitespace-nowrap shrink-0"
            >
              Workflow
            </a>
            <a 
              href="#about" 
              className="hover:text-[var(--text-primary)] transition-colors whitespace-nowrap shrink-0"
            >
              About
            </a>
            <button
              type="button"
              onClick={() => onToggleUpworkMode(true)}
              className="hover:text-[var(--text-primary)] text-blue-600 dark:text-blue-400 font-semibold transition-colors whitespace-nowrap shrink-0 flex items-center gap-1"
            >
              <span>Upwork Safe</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </nav>
        ) : (
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--text-secondary)]">
            <span className="text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
              Upwork Client View
            </span>
            <a 
              href="#work" 
              className="hover:text-[var(--text-primary)] transition-colors whitespace-nowrap shrink-0"
            >
              Portfolio Catalogue
            </a>
            <a 
              href="#services" 
              className="hover:text-[var(--text-primary)] transition-colors whitespace-nowrap shrink-0"
            >
              Offered Disciplines
            </a>
            <button
              type="button"
              onClick={() => onToggleUpworkMode(false)}
              className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors underline whitespace-nowrap shrink-0"
            >
              Return to Public Site
            </button>
          </nav>
        )}

        {/* Zone 3: 1 Primary Action + Theme Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <ThemeToggle />

          {!isUpworkMode ? (
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Commission Project
            </a>
          ) : (
            <a
              href="https://www.upwork.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0"
            >
              Message on Upwork
            </a>
          )}

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-4 space-y-3">
          {!isUpworkMode ? (
            <>
              <a 
                href="#work" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-1.5"
              >
                Selected Work
              </a>
              <a 
                href="#services" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-1.5"
              >
                Services
              </a>
              <a 
                href="#process" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-1.5"
              >
                Workflow
              </a>
              <a 
                href="#about" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-1.5"
              >
                About
              </a>
              <button
                type="button"
                onClick={() => {
                  onToggleUpworkMode(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left text-sm font-semibold text-blue-500 py-1.5 flex items-center justify-between"
              >
                <span>Switch to Upwork Safe Mode</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full mt-2 inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 rounded-lg text-center"
              >
                Commission Project
              </a>
            </>
          ) : (
            <>
              <a 
                href="#work" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-1.5"
              >
                Portfolio Catalogue
              </a>
              <a 
                href="#services" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-1.5"
              >
                Offered Disciplines
              </a>
              <button
                type="button"
                onClick={() => {
                  onToggleUpworkMode(false);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] py-1.5 underline"
              >
                Return to Public Portfolio
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};
