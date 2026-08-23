import React, { useState, useEffect } from 'react';
import { PageId, ServiceCategory, PortfolioItem } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { PortfolioPage } from './components/pages/PortfolioPage';
import { ContactPage } from './components/pages/ContactPage';
import { ProductDetailModal } from './components/ProductDetailModal';

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [selectedProduct, setSelectedProduct] = useState<PortfolioItem | null>(null);
  const [servicePageInitialTab, setServicePageInitialTab] = useState<ServiceCategory>('mold_making');

  // Handle URL hash changes for deep linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'about', 'services', 'portfolio', 'contact'].includes(hash)) {
        setActivePage(hash as PageId);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageId) => {
    setActivePage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenService = (serviceId: ServiceCategory) => {
    setServicePageInitialTab(serviceId);
    navigateTo('services');
  };

  const handleSelectPortfolioItem = (item: PortfolioItem) => {
    setSelectedProduct(item);
  };

  const handleOrderThisItem = (_item: PortfolioItem) => {
    setSelectedProduct(null);
    navigateTo('contact');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF9] text-gray-800 font-['Vazirmatn',sans-serif]">
      
      {/* Header */}
      <Header
        activePage={activePage}
        onNavigate={navigateTo}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onOpenService={handleOpenService}
            onSelectPortfolioItem={handleSelectPortfolioItem}
          />
        )}

        {activePage === 'about' && (
          <AboutPage
            onNavigate={navigateTo}
          />
        )}

        {activePage === 'services' && (
          <ServicesPage
            onNavigate={navigateTo}
            initialSelectedService={servicePageInitialTab}
          />
        )}

        {activePage === 'portfolio' && (
          <PortfolioPage
            onNavigate={navigateTo}
            onSelectPortfolioItem={handleSelectPortfolioItem}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage
            onNavigate={navigateTo}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={navigateTo}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        item={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOrderThisItem={handleOrderThisItem}
      />

    </div>
  );
}
