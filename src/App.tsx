import React, { useState, useEffect } from 'react';
import initialCatalog from './data/catalog.json';
import { Catalog, CatalogItem } from './types/catalog.ts';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { ToolsMarquee } from './components/ToolsMarquee.tsx';
import { CatalogueGrid } from './components/CatalogueGrid.tsx';
import { Services } from './components/Services.tsx';
import { Process } from './components/Process.tsx';
import { About } from './components/About.tsx';
import { Socials } from './components/Socials.tsx';
import { UpworkView } from './components/UpworkView.tsx';
import { Footer } from './components/Footer.tsx';
import { ProjectModal } from './components/ProjectModal.tsx';

export default function App() {
  const [catalog, setCatalog] = useState<Catalog>(initialCatalog as unknown as Catalog);
  const [selectedItem, setSelectedItem] = useState<CatalogItem | null>(null);
  const [isUpworkMode, setIsUpworkMode] = useState<boolean>(false);

  // Check URL hash or path for #/upwork or #/work/:id
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      const pathname = window.location.pathname;

      if (hash.includes('upwork') || pathname.includes('upwork')) {
        setIsUpworkMode(true);
      } else {
        setIsUpworkMode(false);
      }

      if (hash.startsWith('#/work/')) {
        const id = hash.replace('#/work/', '');
        const found = catalog.items.find((item) => item.id === id);
        if (found) setSelectedItem(found);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [catalog.items]);

  // Client-side fetch for freshest catalog if available
  useEffect(() => {
    fetch('/catalog.json')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('No static catalog file');
      })
      .then((data: Catalog) => {
        if (data?.items && data.items.length > 0) {
          setCatalog(data);
        }
      })
      .catch(() => {
        // Fall back to bundled initialCatalog
      });
  }, []);

  const openProject = (item: CatalogItem) => {
    setSelectedItem(item);
    window.history.pushState(null, '', `#/work/${item.id}`);
  };

  const closeProject = () => {
    setSelectedItem(null);
    if (window.location.hash.startsWith('#/work/')) {
      window.history.pushState(null, '', isUpworkMode ? '#/upwork' : '#work');
    }
  };

  const currentIndex = selectedItem
    ? catalog.items.findIndex((i) => i.id === selectedItem.id)
    : -1;

  const handlePrev = () => {
    if (currentIndex > 0) {
      openProject(catalog.items[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex >= 0 && currentIndex < catalog.items.length - 1) {
      openProject(catalog.items[currentIndex + 1]);
    }
  };

  const handleToggleUpwork = (upwork: boolean) => {
    setIsUpworkMode(upwork);
    window.location.hash = upwork ? '/upwork' : '';
  };

  const featuredShowreel =
    catalog.items.find((i) => i.featured && (i.type === 'video' || i.type === 'motion')) ||
    catalog.items.find((i) => i.featured) ||
    catalog.items[0];

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors selection:bg-blue-500 selection:text-white">
      {/* Top Bar */}
      <Navbar
        isUpworkMode={isUpworkMode}
        onToggleUpworkMode={handleToggleUpwork}
      />

      <main id="main-content">
        {!isUpworkMode ? (
          <>
            <Hero
              featuredItem={featuredShowreel}
              onOpenProject={openProject}
              isUpworkMode={false}
            />

            <ToolsMarquee />

            <CatalogueGrid
              items={catalog.items}
              categories={catalog.categories}
              onOpenProject={openProject}
            />

            <Services />

            <Process />

            <About />

            <Socials />
          </>
        ) : (
          <UpworkView
            items={catalog.items}
            categories={catalog.categories}
            onOpenProject={openProject}
          />
        )}
      </main>

      <Footer
        lastSyncedAt={catalog.lastSyncedAt}
        isUpworkMode={isUpworkMode}
        onToggleUpworkMode={handleToggleUpwork}
      />

      {/* Accessible Project Lightbox / Modal */}
      <ProjectModal
        item={selectedItem}
        onClose={closeProject}
        onPrev={handlePrev}
        onNext={handleNext}
        hasPrev={currentIndex > 0}
        hasNext={currentIndex >= 0 && currentIndex < catalog.items.length - 1}
      />
    </div>
  );
}
