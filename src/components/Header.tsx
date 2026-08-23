import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { useData } from '../context/DataContext';
import { Logo } from './Logo';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  Award,
  ChevronLeft,
  Home,
  Building2,
  Wrench,
  PhoneCall
} from 'lucide-react';

interface HeaderProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  onNavigate,
}) => {
  const { data } = useData();
  const companyInfo = data?.companyInfo || {};
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);


  // Monitor scroll position with 3-second delay when returning to top
  useEffect(() => {
    let topTimer: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 40) {
        if (topTimer) {
          clearTimeout(topTimer);
          topTimer = null;
        }
        setIsScrolled(true);
      } else if (currentScrollY <= 10) {
        // If scrolled and reached the very top, wait 3 seconds before expanding the top bar
        setIsScrolled((prevScrolled) => {
          if (prevScrolled && !topTimer) {
            topTimer = setTimeout(() => {
              if (window.scrollY <= 10) {
                setIsScrolled(false);
              }
              topTimer = null;
            }, 3000);
            return true; // keep compact state during the 3-second wait
          }
          return prevScrolled;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    if (window.scrollY > 40) {
      setIsScrolled(true);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (topTimer) {
        clearTimeout(topTimer);
      }
    };
  }, []);

  const navItems = [
    { id: 'home' as PageId, label: 'صفحه اصلی', icon: Home },
    { id: 'about' as PageId, label: 'درباره ما', icon: Building2 },
    { id: 'services' as PageId, label: 'خدمات کارخانه', icon: Wrench },
    { id: 'contact' as PageId, label: 'تماس با ما', icon: PhoneCall },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      id="main-header" 
      className={`sticky top-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-xl shadow-md border-b border-gray-200/70' 
          : 'bg-white/95 backdrop-blur-md shadow-xs border-b border-gray-200'
      }`}
    >
      {/* Top Notification & Contact Bar (Smoothly collapses on scroll, reappears after 3s at top) */}
      <div 
        id="top-contact-bar" 
        className={`bg-[#0c2214] text-gray-200 text-xs px-4 border-b border-[#DECA19]/20 hidden md:block transition-all duration-500 ease-in-out overflow-hidden ${
          isScrolled 
            ? 'max-h-0 opacity-0 py-0 border-b-0 pointer-events-none' 
            : 'max-h-16 opacity-100 py-2'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-gray-300">
              <Phone className="w-3.5 h-3.5 text-[#DECA19]" />
              <span className="font-semibold text-white">تماس واحد فروش:</span>
              <span className="en-num font-bold text-white tracking-wide">{companyInfo.phone}</span>
            </span>
            <span className="flex items-center gap-1.5 text-gray-300">
              <Clock className="w-3.5 h-3.5 text-[#DECA19]" />
              <span>ساعت کاری: <span className="en-num text-gray-200">{companyInfo.workingHours}</span></span>
            </span>
            <span className="flex items-center gap-1.5 text-gray-300">
              <MapPin className="w-3.5 h-3.5 text-[#DECA19]" />
              <span>{companyInfo.address}</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 bg-[#DECA19]/15 text-[#DECA19] px-2.5 py-0.5 rounded-full text-[11px] font-medium border border-[#DECA19]/30">
              <Award className="w-3 h-3" />
              <span>بیش از <span className="en-num font-bold">40</span> سال تجربه در صنعت قالب‌سازی و قطعه</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-in-out">
        <div className={`flex items-center justify-between transition-all duration-300 ease-in-out ${
          isScrolled ? 'h-14 sm:h-16' : 'h-20'
        }`}>
          
          {/* Logo & Company Identity Area */}
          <div 
            id="brand-logo-container" 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group transition-all duration-300"
          >
            <div className="relative flex items-center justify-center text-[#0F612F] group-hover:text-[#0c4e26] transition-colors">
              <Logo 
                className={`w-auto object-contain transition-all duration-300 ease-in-out group-hover:scale-105 ${
                  isScrolled ? 'h-8 sm:h-9' : 'h-11 sm:h-12'
                }`}
                fillColor="#0F612F"
              />
            </div>

            <div className="flex flex-col transition-all duration-300 ease-in-out">
              <div className="flex items-center gap-1.5">
                <span className={`font-black text-[#0F612F] tracking-tight transition-all duration-300 ease-in-out ${
                  isScrolled ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'
                }`}>
                  رسا قطعه گستر مهر
                </span>
              </div>
              <span className={`text-[11px] text-gray-500 font-medium hidden sm:inline-block transition-all duration-300 ease-in-out overflow-hidden ${
                isScrolled ? 'max-h-0 opacity-0 -translate-y-1' : 'max-h-6 opacity-100 translate-y-0'
              }`}>
                طراحی و ساخت قالب • پرسکاری تا <span className="en-num font-bold">400</span> تن • تزریق پلاستیک • برش لیزر
              </span>
            </div>
          </div>

          {/* Desktop Horizontal Navigation Menu */}
          <nav id="desktop-nav-menu" className="hidden lg:flex items-center gap-1.5 sm:gap-2">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative rounded-lg font-bold transition-all duration-200 flex items-center gap-1.5 sm:gap-2 cursor-pointer
                    ${isScrolled ? 'px-3.5 py-1.5 text-xs sm:text-sm' : 'px-4 py-2.5 text-sm'}
                    ${isActive 
                      ? 'text-[#0F612F] bg-emerald-50/90 shadow-xs font-black' 
                      : 'text-gray-700 hover:text-[#0F612F] hover:bg-gray-100/60'
                    }
                  `}
                >
                  <IconComponent className={`transition-colors ${isScrolled ? 'w-3.5 h-3.5' : 'w-4 h-4'} ${isActive ? 'text-[#0F612F]' : 'text-gray-500'}`} />
                  <span>{item.label}</span>
                  
                  {isActive && (
                    <span className="absolute bottom-0 right-3 left-3 h-0.5 bg-[#DECA19] rounded-full shadow-xs" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={`tel:${companyInfo.phoneTel || '02176266543'}`}
              className={`bg-[#0F612F] text-white rounded-lg font-bold flex items-center justify-center shadow-sm transition-all duration-300 ${
                isScrolled ? 'p-1.5 text-xs' : 'p-2 text-xs'
              }`}
              title="تماس با کارخانه"
            >
              <Phone className={`text-[#DECA19] transition-all duration-300 ${isScrolled ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
            </a>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 rounded-lg text-gray-700 hover:text-[#0F612F] hover:bg-gray-100/70 focus:outline-none transition-colors"
              aria-label="باز کردن منو"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div id="mobile-menu-drawer" className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-gray-200 px-4 pt-2 pb-6 space-y-2 shadow-xl animate-fadeIn">
          <div className="py-2 border-b border-gray-100 mb-2">
            <span className="text-xs text-gray-500 font-semibold block mb-1">صفحات وب‌سایت:</span>
          </div>
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-right text-sm font-bold transition-colors
                  ${isActive 
                    ? 'bg-[#0F612F] text-white' 
                    : 'text-gray-800 hover:bg-emerald-50 hover:text-[#0F612F]'
                  }
                `}
              >
                <div className="flex items-center gap-2.5">
                  <IconComponent className={`w-4 h-4 ${isActive ? 'text-[#DECA19]' : 'text-gray-500'}`} />
                  <span>{item.label}</span>
                </div>
                <ChevronLeft className={`w-4 h-4 ${isActive ? 'text-[#DECA19]' : 'text-gray-400'}`} />
              </button>
            );
          })}

          <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
            <a 
              href={`tel:${companyInfo.phoneTel || '02176266543'}`}
              className="w-full flex items-center justify-center gap-2 bg-[#0F612F] text-white py-3 rounded-lg text-xs font-bold transition-colors shadow-md"
            >
              <Phone className="w-4 h-4 text-[#DECA19]" />
              <span>تماس مستقیم با کارخانه: <span className="en-num font-bold">{companyInfo.phone}</span></span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
