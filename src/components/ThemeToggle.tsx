import React, { useEffect, useState } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';

export type ThemePreference = 'system' | 'light' | 'dark';

export const ThemeToggle: React.FC = () => {
  const [preference, setPreference] = useState<ThemePreference>('dark');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('motionssalt_theme') as ThemePreference | null;
      if (stored) {
        setPreference(stored);
        applyTheme(stored);
      } else {
        setPreference('system');
        applyTheme('system');
      }
    } catch {
      applyTheme('dark');
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      try {
        const stored = localStorage.getItem('motionssalt_theme');
        if (!stored || stored === 'system') {
          applyTheme('system');
        }
      } catch {
        // storage blocked
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const applyTheme = (theme: ThemePreference) => {
    let effective = theme;
    if (theme === 'system') {
      effective = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', effective);
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', effective === 'dark' ? '#050505' : '#fafafa');
    }
  };

  const handleSelect = (next: ThemePreference) => {
    setPreference(next);
    try {
      localStorage.setItem('motionssalt_theme', next);
    } catch {
      // storage disabled
    }
    applyTheme(next);
  };

  return (
    <div 
      className="inline-flex items-center gap-0.5 p-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]"
      role="group" 
      aria-label="Theme selection"
    >
      <button
        type="button"
        onClick={() => handleSelect('light')}
        className={`p-1.5 rounded-md transition-colors ${
          preference === 'light'
            ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-xs'
            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
        }`}
        title="Light theme"
        aria-label="Light theme"
      >
        <Sun className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onClick={() => handleSelect('dark')}
        className={`p-1.5 rounded-md transition-colors ${
          preference === 'dark'
            ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-xs'
            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
        }`}
        title="Dark theme"
        aria-label="Dark theme"
      >
        <Moon className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onClick={() => handleSelect('system')}
        className={`p-1.5 rounded-md transition-colors ${
          preference === 'system'
            ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-xs'
            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
        }`}
        title="System sync theme"
        aria-label="System sync theme"
      >
        <Monitor className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
