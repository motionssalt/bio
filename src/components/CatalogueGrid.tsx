import React, { useState, useMemo } from 'react';
import { CatalogItem, CategoryConfig } from '../types/catalog.ts';
import { Play, Image as ImageIcon, Filter, Search } from 'lucide-react';

interface CatalogueGridProps {
  items: CatalogItem[];
  categories: CategoryConfig[];
  onOpenProject: (item: CatalogItem) => void;
}

export const CatalogueGrid: React.FC<CatalogueGridProps> = ({
  items,
  categories,
  onOpenProject
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [items, activeCategory, searchQuery]);

  return (
    <section id="work" className="py-16 sm:py-24 border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-2">
              Public Google Drive Catalogue
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--text-primary)]">
              Curated Works & Reels
            </h2>
          </div>

          <div className="text-sm text-[var(--text-secondary)]">
            Showing <span className="font-semibold text-[var(--text-primary)] tabular-nums">{filteredItems.length}</span> of <span className="tabular-nums">{items.length}</span> indexed items
          </div>
        </div>

        {/* Filter Bar & Search Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[var(--border-subtle)]">
          {/* Category Tabs (Segmented Control / Functional Buttons) */}
          <div
            className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] overflow-x-auto no-scrollbar"
            role="tablist"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'all'}
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              All Disciplines ({items.length})
            </button>

            {categories.map((cat) => {
              const catCount = items.filter((i) => i.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-xs'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {cat.title} ({catCount})
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px] sm:w-72">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by index, tool, role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-hidden focus:border-blue-500 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Grid of Work */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isHovered = hoveredItemId === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => onOpenProject(item)}
                  onMouseEnter={() => setHoveredItemId(item.id)}
                  onMouseLeave={() => setHoveredItemId(null)}
                  className="group kinetic-card rounded-2xl overflow-hidden cursor-pointer flex flex-col bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-mid)] transition-all hover:shadow-lg"
                >
                  {/* Media Framing Container */}
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-black/90">
                    <img
                      src={item.poster}
                      alt={item.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
                        isHovered && item.previewClip ? 'opacity-0' : 'opacity-100'
                      }`}
                    />

                    {/* Short video preview clip on hover */}
                    {item.previewClip && (
                      <video
                        src={item.previewClip}
                        autoPlay={isHovered}
                        loop
                        muted
                        playsInline
                        preload="none"
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                          isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                      />
                    )}

                    {/* Gradient scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    {/* Top Right Media Type Badge */}
                    <div className="absolute top-3.5 right-3.5 p-2 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 transition-transform group-hover:scale-110">
                      {item.type === 'video' || item.type === 'motion' ? (
                        <Play className="w-3.5 h-3.5 fill-white" />
                      ) : (
                        <ImageIcon className="w-3.5 h-3.5" />
                      )}
                    </div>

                    {/* Top Left Folder Index Chip */}
                    <div className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-md bg-black/60 text-white/90 text-[11px] font-mono backdrop-blur-md border border-white/10">
                      <span>{item.title}</span>
                    </div>

                    {/* Overlay Title & Category */}
                    <div className="absolute bottom-3.5 left-4 right-4 text-white">
                      <div className="flex items-center gap-2 text-[11px] text-white/70 mb-1">
                        <span className="uppercase tracking-wider font-semibold">
                          {item.category.replace('-', ' ')}
                        </span>
                        {item.durationSec && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="tabular-nums font-mono">{Math.round(item.durationSec)}s</span>
                          </>
                        )}
                      </div>
                      <h3 className="font-display font-bold text-base sm:text-lg leading-snug line-clamp-1 group-hover:text-blue-300 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Body Metadata */}
                  <div className="p-4 flex-1 flex flex-col justify-between bg-[var(--bg-surface)]">
                    <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                      <span className="font-medium text-[var(--text-secondary)]">{item.role}</span>
                      <div className="flex items-center gap-1.5">
                        {item.tools.slice(0, 2).map((tool, tIdx) => (
                          <span key={tIdx} className="hover:text-[var(--text-primary)]">
                            {tool}
                            {tIdx < Math.min(item.tools.length, 2) - 1 ? ' ·' : ''}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center border border-dashed border-[var(--border-mid)] rounded-2xl bg-[var(--bg-surface-elevated)] max-w-lg mx-auto p-8">
            <Filter className="w-8 h-8 text-[var(--text-muted)] mx-auto mb-3" />
            <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1">
              No pieces found in this category
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mb-4 leading-relaxed">
              {activeCategory === 'video-editing'
                ? 'Videos added to the VIDEOS folder in Google Drive will appear here automatically on the next sync.'
                : 'Try adjusting your search query or switching to All Disciplines.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
            >
              Show All Works
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
