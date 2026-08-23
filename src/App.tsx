import React, { useState, useEffect } from 'react';
import { PageId, ServiceCategory, PortfolioItem } from './types';
import { DataProvider, useData } from './context/DataContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { ContactPage } from './components/pages/ContactPage';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboardModal } from './components/admin/AdminDashboardModal';
import { Shield } from 'lucide-react';

function MainApp() {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [selectedProduct, setSelectedProduct] = useState<PortfolioItem | null>(null);
  const [servicePageInitialTab, setServicePageInitialTab] = useState<ServiceCategory>('mold_making');
  
  // Admin modals state
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDashboardModalOpen, setIsDashboardModalOpen] = useState(false);

  const { adminUser } = useData();

  // Handle URL hash changes for deep linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'about', 'services', 'contact'].includes(hash)) {
        setActivePage(hash as PageId);
      } else if (hash === 'portfolio') {
        setActivePage('services');
      } else if (hash === 'admin') {
        if (adminUser) {
          setIsDashboardModalOpen(true);
        } else {
          setIsLoginModalOpen(true);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [adminUser]);

  const navigateTo = (page: PageId) => {
    const targetPage = page === 'portfolio' ? 'services' : page;
    setActivePage(targetPage);
    window.location.hash = targetPage;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenService = (serviceId: ServiceCategory) => {
    setServicePageInitialTab(serviceId);
    navigateTo('services');
  };

  const handleOrderThisItem = (_item: PortfolioItem) => {
    setSelectedProduct(null);
    navigateTo('contact');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF9] text-gray-800 font-['Vazirmatn',sans-serif]">
      
      {/* Admin Floating Badge (Only visible when logged in) */}
      {adminUser && (
        <div className="bg-[#0F612F] text-white px-4 py-2 text-xs font-bold flex items-center justify-between shadow-md z-40 border-b border-[#DECA19]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>مدیر سیستم وارد شده است ({adminUser.username})</span>
          </div>
          <button
            onClick={() => setIsDashboardModalOpen(true)}
            className="bg-[#DECA19] hover:bg-[#c4b316] text-gray-950 px-3 py-1 rounded-lg text-xs font-black shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>ورود به پنل مدیریت</span>
          </button>
        </div>
      )}

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

        {activePage === 'contact' && (
          <ContactPage
            onNavigate={navigateTo}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenAdminLogin={() => {
          if (adminUser) {
            setIsDashboardModalOpen(true);
          } else {
            setIsLoginModalOpen(true);
          }
        }}
      />

      {/* Product Detail Modal (if triggered) */}
      <ProductDetailModal
        item={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOrderThisItem={handleOrderThisItem}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={() => {
          setIsLoginModalOpen(false);
          setIsDashboardModalOpen(true);
        }}
      />

      {/* Admin Dashboard Modal */}
      <AdminDashboardModal
        isOpen={isDashboardModalOpen}
        onClose={() => setIsDashboardModalOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <MainApp />
    </DataProvider>
  );
}
