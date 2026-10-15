import React, { useEffect, useState, useRef } from 'react';
import { CatalogItem } from '../types/catalog.ts';
import {
  X,
  ExternalLink,
  Download,
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react';
import { VideoPlayer } from './VideoPlayer.tsx';

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
  const [isImageFullscreen, setIsImageFullscreen] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const fullscreenContainerRef = useRef<HTMLDivElement>(null);

  // Reset zoom & fullscreen state when changing items
  useEffect(() => {
    setIsImageFullscreen(false);
    setZoomLevel(1);
  }, [item?.id]);

  // Handle escape & keyboard navigation
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isImageFullscreen) {
          exitImageFullscreen();
        } else {
          onClose();
        }
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
  }, [item, onClose, onPrev, onNext, hasPrev, hasNext, isImageFullscreen]);

  const enterImageFullscreen = async () => {
    setIsImageFullscreen(true);
    setZoomLevel(1);

    if (fullscreenContainerRef.current) {
      try {
        if (fullscreenContainerRef.current.requestFullscreen) {
          await fullscreenContainerRef.current.requestFullscreen();
        } else if ((fullscreenContainerRef.current as any).webkitRequestFullscreen) {
          await (fullscreenContainerRef.current as any).webkitRequestFullscreen();
        }
      } catch {
        // Fallback to React state overlay
      }
    }
  };

  const exitImageFullscreen = async () => {
    setIsImageFullscreen(false);
    setZoomLevel(1);

    try {
      if (document.fullscreenElement) {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        }
      }
    } catch {
      // Fallback
    }
  };

  const toggleZoom = () => {
    setZoomLevel((prev) => (prev >= 2 ? 1 : prev + 0.5));
  };

  if (!item) return null;

  return (
    <>
      {/* Immersive Image Fullscreen Lightbox Overlay */}
      {isImageFullscreen && item.type === 'image' && (
        <div
          ref={fullscreenContainerRef}
          role="dialog"
          aria-label="Image Fullscreen View"
          className="fixed inset-0 z-[100] bg-black/98 flex flex-col justify-between backdrop-blur-xl animate-in fade-in duration-200 select-none"
        >
          {/* Top Fullscreen Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-black/60 border-b border-white/10 text-white z-20">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-blue-400 uppercase tracking-wider">
                {item.category.replace('-', ' ')}
              </span>
              <span className="text-white/40">·</span>
              <span className="font-medium text-white/90">{item.title}</span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(z - 0.5, 1))}
                disabled={zoomLevel <= 1}
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30 cursor-pointer"
                title="Zoom Out"
                aria-label="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={toggleZoom}
                className="px-2 py-1 rounded-md text-xs font-mono bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                title="Toggle Zoom"
              >
                {Math.round(zoomLevel * 100)}%
              </button>

              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(z + 0.5, 3))}
                disabled={zoomLevel >= 3}
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30 cursor-pointer"
                title="Zoom In"
                aria-label="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <div className="h-4 w-px bg-white/20 mx-1" />

              {item.downloadUrl && (
                <a
                  href={item.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
                  title="Download High-Res"
                  aria-label="Download High-Res"
                >
                  <Download className="w-4 h-4" />
                </a>
              )}

              <button
                type="button"
                onClick={exitImageFullscreen}
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
                title="Exit Fullscreen (Esc)"
                aria-label="Exit Fullscreen"
              >
                <Minimize className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Fullscreen Image Center Area */}
          <div
            className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-auto cursor-zoom-in"
            onClick={toggleZoom}
          >
            <img
              src={item.poster}
              alt={item.title}
              style={{ transform: `scale(${zoomLevel})` }}
              className="max-h-full max-w-full object-contain transition-transform duration-200 ease-out shadow-2xl rounded-sm"
            />

            {/* Left / Right Nav Arrows inside Fullscreen */}
            {hasPrev && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev?.();
                }}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 shadow-xl backdrop-blur-md cursor-pointer transition-transform hover:scale-105"
                title="Previous Work"
                aria-label="Previous Work"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {hasNext && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onNext?.();
                }}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 shadow-xl backdrop-blur-md cursor-pointer transition-transform hover:scale-105"
                title="Next Work"
                aria-label="Next Work"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Bottom info bar */}
          <div className="px-6 py-2.5 bg-black/60 border-t border-white/10 text-center text-xs text-white/50">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono">Esc</kbd> to exit fullscreen · Tap or click to zoom</span>
          </div>
        </div>
      )}

      {/* Main Modal Dialog Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-mid)] shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Control Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]">
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] min-w-0">
              <span className="font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider shrink-0">
                {item.category.replace('-', ' ')}
              </span>
              <span aria-hidden="true" className="shrink-0">·</span>
              <span className="truncate font-medium text-[var(--text-primary)]">{item.title}</span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0 ml-2">
              {item.type === 'image' && (
                <button
                  type="button"
                  onClick={enterImageFullscreen}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[var(--text-primary)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] transition-colors cursor-pointer"
                  title="View Image in Full Screen"
                  aria-label="View Image in Full Screen"
                >
                  <Maximize className="w-3.5 h-3.5 text-blue-500" />
                  <span className="hidden sm:inline">Full Screen</span>
                </button>
              )}

              {hasPrev && (
                <button
                  type="button"
                  onClick={onPrev}
                  className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] border border-[var(--border-subtle)] cursor-pointer"
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
                  className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] border border-[var(--border-subtle)] cursor-pointer"
                  title="Next Project (Right Arrow)"
                  aria-label="Next Project"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] border border-[var(--border-subtle)] cursor-pointer"
                title="Close modal (Esc)"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Media Presentation Viewport */}
          <div className="relative w-full aspect-16/10 sm:aspect-16/9 bg-black flex items-center justify-center overflow-hidden">
            {item.type === 'video' || item.type === 'motion' ? (
              <VideoPlayer
                src={item.previewClip || item.downloadUrl}
                poster={item.poster}
                title={item.title}
                embedUrl={item.embedUrl}
                driveUrl={item.driveUrl}
                downloadUrl={item.downloadUrl}
              />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center p-2 group/image">
                <img
                  src={item.poster}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain cursor-pointer"
                  onClick={enterImageFullscreen}
                />

                {/* Floating Fullscreen Button on Image */}
                <button
                  type="button"
                  onClick={enterImageFullscreen}
                  className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/20 shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer"
                  aria-label="Full Screen Image View"
                >
                  <Maximize className="w-4 h-4 text-blue-400" />
                  <span>Full Screen</span>
                </button>
              </div>
            )}
          </div>

          {/* Modal Info Footer */}
          <div className="p-5 sm:p-6 overflow-y-auto max-h-56 bg-[var(--bg-surface)] flex flex-col md:flex-row md:items-start justify-between gap-5 border-t border-[var(--border-subtle)]">
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

              {/* Metadata Details */}
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
              {item.type === 'image' && (
                <button
                  type="button"
                  onClick={enterImageFullscreen}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 rounded-lg transition-colors cursor-pointer"
                >
                  <Maximize className="w-3.5 h-3.5" />
                  <span>Full Screen View</span>
                </button>
              )}

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
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] rounded-lg transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Direct Download</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
