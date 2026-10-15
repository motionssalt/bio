import React, { useEffect } from 'react';
import { CatalogItem } from '../types/catalog.ts';
import { X, ExternalLink, Download, ChevronLeft, ChevronRight, Layers } from 'lucide-react';

interface ProjectModalProps {
  item: CatalogItem | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  item,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext
}) => {
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && onPrev && hasPrev) {
        onPrev();
      } else if (e.key === 'ArrowRight' && onNext && hasNext) {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [item, onClose, onPrev, onNext, hasPrev, hasNext]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-mid)] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]">
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <span className="font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              {item.category.replace('-', ' ')}
            </span>
            <span aria-hidden="true">·</span>
            <span className="truncate max-w-[200px] sm:max-w-md">{item.title}</span>
          </div>

          <div className="flex items-center gap-2">
            {hasPrev && (
              <button
                type="button"
                onClick={onPrev}
                className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] border border-[var(--border-subtle)]"
                title="Previous Project (Left Arrow)"
                aria-label="Previous Project"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            {hasNext && (
              <button
                type="button"
                onClick={onNext}
                className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] border border-[var(--border-subtle)]"
                title="Next Project (Right Arrow)"
                aria-label="Next Project"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] border border-[var(--border-subtle)]"
              title="Close modal (Esc)"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Media Presentation Viewport */}
        <div className="relative w-full aspect-16/9 bg-black flex items-center justify-center overflow-hidden">
          {item.type === 'video' || item.type === 'motion' ? (
            <iframe
              src={item.embedUrl}
              title={item.title}
              allow="autoplay; fullscreen"
              className="w-full h-full border-0"
              loading="lazy"
            />
          ) : (
            <img
              src={item.poster}
              alt={item.title}
              className="max-h-full max-w-full object-contain"
            />
          )}
        </div>

        {/* Modal Info Footer */}
        <div className="p-6 overflow-y-auto max-h-60 bg-[var(--bg-surface)] flex flex-col md:flex-row md:items-start justify-between gap-6 border-t border-[var(--border-subtle)]">
          <div className="max-w-2xl">
            <h2
              id="modal-project-title"
              className="font-display font-bold text-xl sm:text-2xl text-[var(--text-primary)] mb-2"
            >
              {item.title}
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
              {item.description}
            </p>

            {/* Metadata Pills Replacement: Zero-Pill Text Line */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)]">
              <span className="font-semibold text-[var(--text-secondary)]">Role:</span>
              <span>{item.role}</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-[var(--text-secondary)]">Tools:</span>
              <span>{item.tools.join(', ')}</span>
              {item.durationSec && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-semibold text-[var(--text-secondary)]">Duration:</span>
                  <span className="tabular-nums">{Math.round(item.durationSec)}s</span>
                </>
              )}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap md:flex-col items-stretch gap-2.5 shrink-0">
            <a
              href={item.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-[var(--text-primary)] bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              <span>Open in Google Drive</span>
            </a>

            {item.downloadUrl && (
              <a
                href={item.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 rounded-lg transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Direct File Source</span>
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
