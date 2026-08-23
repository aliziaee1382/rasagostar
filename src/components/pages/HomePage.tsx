import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId, ServiceCategory, PortfolioItem } from '../../types';
import { useData } from '../../context/DataContext';
import { DEFAULT_HERO_SLIDES } from '../../data/mockData';
import { 
  Award, 
  Factory, 
  Users, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Cog, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  PhoneCall, 
  ChevronLeft, 
  ChevronRight, 
  FileCheck, 
  Compass, 
  ArrowUpRight, 
  Building2, 
  Handshake, 
  Sliders, 
  Check, 
  Phone, 
  Maximize2,
  FileText,
  Download
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenService: (serviceId: ServiceCategory) => void;
  onSelectPortfolioItem?: (item: PortfolioItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenService,
  onSelectPortfolioItem,
}) => {
  const { data } = useData();
  const companyInfo = data?.companyInfo || {};
  const companyStats = data?.stats || [];
  const servicesData = data?.services || [];
  const portfolioItems = data?.portfolioItems || [];
  const workflowSteps = data?.integratedProcessSteps || [];
  const partnerCompanies = data?.partners || [];
  const heroSlides = data?.heroSlides && data.heroSlides.length > 0 ? data.heroSlides : DEFAULT_HERO_SLIDES;
  const homeContent = data?.pagesContent?.home || {};

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Guard against out of range slide index
  useEffect(() => {
    if (currentSlide >= heroSlides.length) {
      setCurrentSlide(0);
    }
  }, [heroSlides.length, currentSlide]);

  // Auto-play timer for Hero Carousel
  useEffect(() => {
    if (isPaused || heroSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const activeSlideData = heroSlides[currentSlide] || heroSlides[0] || DEFAULT_HERO_SLIDES[0];

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Award': return <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#0F612F] group-hover:text-[#DECA19] transition-colors" />;
      case 'Factory': return <Factory className="w-5 h-5 sm:w-6 sm:h-6 text-[#0F612F] group-hover:text-[#DECA19] transition-colors" />;
      case 'Users': return <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#0F612F] group-hover:text-[#DECA19] transition-colors" />;
      case 'Zap': return <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-[#0F612F] group-hover:text-[#DECA19] transition-colors" />;
      case 'Layers': return <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-[#0F612F] group-hover:text-[#DECA19] transition-colors" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#0F612F] group-hover:text-[#DECA19] transition-colors" />;
      case 'Cpu': return <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-[#0F612F]" />;
      case 'Cog': return <Cog className="w-5 h-5 sm:w-6 sm:h-6 text-[#0F612F]" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#0F612F]" />;
      default: return <Factory className="w-5 h-5 sm:w-6 sm:h-6 text-[#0F612F]" />;
    }
  };

  return (
    <div id="home-page-container" className="space-y-8 sm:space-y-16 lg:space-y-24 pb-8 sm:pb-16">
      
      {/* 1. Animated Hero Carousel / Slider */}
      <section 
        id="hero-section" 
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative bg-gradient-to-b from-[#0a2315] via-[#0c1f13] to-[#0d160f] text-white pt-4 sm:pt-14 pb-8 sm:pb-24 px-3 sm:px-6 lg:px-8 border-b-4 border-[#DECA19] overflow-hidden min-h-auto sm:min-h-[690px] flex flex-col justify-between"
      >
        {/* Background Overlay & Texture */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#DECA19 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />

        {/* Ambient Glows */}
        <div className="absolute -top-24 right-1/4 w-96 h-96 bg-[#0F612F]/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#DECA19]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 lg:gap-12 items-center relative z-10 my-auto">
          
          {/* Main Hero Content for Active Slide with Smooth Animation */}
          <div className="lg:col-span-7 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentSlide}
                initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-2.5 sm:space-y-5 text-right"
              >
                {/* Top Badge */}
                <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#DECA19]/15 text-[#DECA19] px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold border border-[#DECA19]/30">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span>{activeSlideData.badge || 'بیش از ۴۰ سال سابقه درخشان در صنعت'} • {companyInfo.name || 'رسا قطعه گستر مهر'}</span>
                </div>

                {/* Slide Title */}
                <h1 className="text-xl sm:text-4.5xl lg:text-5xl font-black text-white leading-tight sm:leading-[1.25] tracking-tight">
                  {activeSlideData.title}
                </h1>

                {/* Slide Slogan / Key Punchline */}
                {(activeSlideData.slogan || activeSlideData.tagline || activeSlideData.subtitle) && (
                  <div className="p-2 sm:p-3.5 bg-white/5 border-r-3 sm:border-r-4 border-[#DECA19] rounded-l-xl backdrop-blur-xs">
                    <p className="text-xs sm:text-base font-bold text-[#DECA19] leading-snug">
                      {activeSlideData.slogan || activeSlideData.tagline || activeSlideData.subtitle}
                    </p>
                  </div>
                )}

                {/* Description */}
                <p className="text-[11px] sm:text-sm text-gray-300 leading-relaxed font-light max-w-2xl text-justify">
                  {activeSlideData.description}
                </p>

                {/* Dynamic Bullet Points */}
                {(activeSlideData.bulletPoints && activeSlideData.bulletPoints.length > 0) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2.5 pt-0.5 sm:pt-1 text-[11px] sm:text-xs text-gray-200">
                    {activeSlideData.bulletPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 sm:gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#DECA19] shrink-0 mt-0.5" />
                        <span className="leading-snug">{point}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3.5 pt-2 sm:pt-4">
                  <button
                    id="hero-services-cta"
                    onClick={() => {
                      const action = activeSlideData.secondaryBtnAction || 'services';
                      if (['mold_making', 'stamping', 'plastic_injection', 'laser_cutting'].includes(action)) {
                        onOpenService(action as ServiceCategory);
                      } else if (['home', 'about', 'services', 'portfolio', 'contact'].includes(action)) {
                        onNavigate(action as PageId);
                      } else {
                        onNavigate('services');
                      }
                    }}
                    className="bg-[#0F612F] hover:bg-[#0c4e26] text-white px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm shadow-md hover:shadow-xl transition-all border border-[#DECA19]/50 flex items-center gap-1.5 sm:gap-2 cursor-pointer active:scale-95"
                  >
                    <span>{activeSlideData.secondaryBtnText || 'مشاهده خطوط تولید و خدمات'}</span>
                    <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#DECA19]" />
                  </button>

                  <button
                    id="hero-contact-cta"
                    onClick={() => {
                      const action = activeSlideData.primaryBtnAction || 'contact';
                      if (['home', 'about', 'services', 'portfolio', 'contact'].includes(action)) {
                        onNavigate(action as PageId);
                      } else {
                        onNavigate('contact');
                      }
                    }}
                    className="bg-[#DECA19] hover:bg-[#ebd828] text-gray-950 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl font-black text-xs sm:text-sm shadow-md hover:shadow-xl transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer active:scale-95"
                  >
                    <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-900" />
                    <span>{activeSlideData.primaryBtnText || 'استعلام قیمت و مشاوره فنی'}</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Hero Image Visual Card for Active Slide with Smooth Transition */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.03, filter: 'blur(4px)' }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border sm:border-2 border-[#DECA19]/50 group bg-gray-900"
              >
                <img 
                  src={activeSlideData.image || activeSlideData.bgImage} 
                  alt={activeSlideData.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-[180px] xs:h-[220px] sm:h-[390px] object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                {/* Metrics Overlay on bottom */}
                <div className="absolute bottom-2.5 sm:bottom-5 right-2.5 sm:right-5 left-2.5 sm:left-5 text-right space-y-1.5 sm:space-y-2.5">
                  {(activeSlideData.metrics && activeSlideData.metrics.length > 0) && (
                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                      {activeSlideData.metrics.map((metric, idx) => (
                        <div key={idx} className="bg-[#0c2214]/90 backdrop-blur-md p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border border-[#DECA19]/40 text-center">
                          <span className="block text-[10px] sm:text-[11px] text-gray-300">{metric.label}</span>
                          <span className="text-xs sm:text-sm font-black text-[#DECA19] en-num">{metric.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-gray-300 pt-0.5 sm:pt-1">
                    <span>تولید مطابق نقشه و نمونه</span>
                    <span className="text-[#DECA19] font-bold">{companyInfo.name || 'شرکت رسا قطعه گستر مهر'}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Carousel Bottom Control Bar & Slide Selectors */}
        <div className="max-w-7xl mx-auto w-full pt-4 sm:pt-8 relative z-20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 border-t border-white/10 pt-2.5 sm:pt-4">
            
            {/* 4 Interactive Slide Tab Triggers */}
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2 w-full sm:w-auto flex-1 max-w-4xl">
              {heroSlides.map((slide, idx) => {
                const isActive = idx === currentSlide;
                return (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlide(idx)}
                    className={`p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl text-right transition-all text-xs cursor-pointer flex flex-col justify-between border ${
                      isActive
                        ? 'bg-[#DECA19] text-gray-950 font-black border-[#DECA19] shadow-md scale-102'
                        : 'bg-white/5 hover:bg-white/10 text-gray-300 border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-0.5 sm:mb-1">
                      <span className="text-[9px] sm:text-[10px] opacity-75 font-mono">0{idx + 1}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-gray-950 animate-pulse" />}
                    </div>
                    <span className="truncate block font-bold text-[9px] sm:text-xs">
                      {slide.title.replace('طراحی و ساخت ', '').replace('برش دقیق ', '').replace('قطعات مهندسی', '')}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-2 self-end sm:self-center shrink-0">
              <button
                onClick={prevSlide}
                aria-label="اسلاید قبلی"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#DECA19] hover:text-gray-950 text-white border border-white/20 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="اسلاید بعدی"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#DECA19] hover:text-gray-950 text-white border border-white/20 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>

      </section>

      {/* 2. Key Factory Statistics */}
      <section id="factory-stats" className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 -mt-5 sm:-mt-12 relative z-20">
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-1.5 sm:gap-3 lg:gap-4">
          {companyStats.map((stat, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-lg sm:rounded-2xl p-1.5 sm:p-3.5 lg:p-4 shadow-sm sm:shadow-lg border border-gray-100/90 flex flex-col items-center text-center hover:border-[#0F612F]/40 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-md sm:rounded-xl bg-emerald-50/90 text-[#0F612F] flex items-center justify-center mb-1 sm:mb-2 group-hover:bg-[#0F612F] transition-colors">
                {getIconComponent(stat.icon)}
              </div>
              <span className="text-xs sm:text-base lg:text-lg font-black text-gray-900 en-num font-mono tracking-tight leading-none mb-0.5 sm:mb-1">
                {stat.value}
              </span>
              <span className="text-[9px] sm:text-xs font-bold text-gray-700 leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Partner Companies Marquee & Grid */}
      <section id="partner-companies" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 text-right">
        
        <div className="bg-gradient-to-b from-[#F9FAF9] to-white rounded-2xl sm:rounded-3xl p-4 sm:p-10 border border-gray-200 shadow-sm">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2.5 sm:gap-4 mb-4 sm:mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#DECA19]/20 text-[#0F612F] px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-black border border-[#DECA19]/40 mb-1.5 sm:mb-2">
                <Handshake className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#0F612F]" />
                <span>اعتماد برندهای تراز اول کشور</span>
              </div>
              <h2 className="text-base sm:text-3xl font-black text-gray-900">
                مشتریان و شرکای تجاری {companyInfo.name}
              </h2>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-500 max-w-md font-medium leading-relaxed">
              تولید قطعات و مجموعه‌های دقیق برای صنایع پیشرو در خودروسازی، لوازم خانگی، صنایع برودتی و ماشین‌آلات صنعتی
            </p>
          </div>

          {/* Marquee Ticker Ribbon */}
          <div className="relative overflow-hidden py-2 sm:py-4 bg-white rounded-xl sm:rounded-2xl border border-gray-200/80 shadow-2xs">
            <div className="absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee-continuous flex items-center gap-2.5 sm:gap-6">
              {[...partnerCompanies, ...partnerCompanies].map((partner, index) => (
                <div
                  key={`${partner.id}-${index}`}
                  className="flex items-center gap-2 sm:gap-3 px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl bg-gray-50 hover:bg-emerald-50/60 border border-gray-200 hover:border-[#0F612F]/40 transition-colors shrink-0 cursor-default"
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-[#0F612F] text-[#DECA19] flex items-center justify-center font-black text-[10px] sm:text-xs">
                    <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] sm:text-xs font-black text-gray-900 block leading-tight">
                      {partner.name}
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-gray-400 font-mono en-num font-bold">
                      {partner.latinName}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </section>

      {/* 4. The 4 Main Pillars / Services Grid with Exact Catalog Specs */}
      <section id="services-pillars" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center sm:text-right mb-4 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-emerald-50 text-[#0F612F] px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold mb-1.5 sm:mb-3 border border-[#0F612F]/20">
            <Cog className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#0F612F]" />
            <span>خدمات <span className="en-num font-bold">۴</span> گانه تخصصی کارخانه</span>
          </div>
          <h2 className="text-lg sm:text-3xl font-black text-gray-900 mb-1 sm:mb-2">
            خطوط تولید و توانمندی‌های اجرایی {companyInfo.name}
          </h2>
          <p className="text-[10px] sm:text-sm text-gray-500 max-w-3xl">
            ارائه کلیه خدمات صنعتی مطابق با استاندارد، نقشه‌های فنی مهندسی و نمونه‌های ارائه‌شده توسط کارفرما
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {servicesData.map((srv) => (
            <div 
              key={srv.id}
              onClick={() => onOpenService(srv.id)}
              className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200 shadow-xs sm:shadow-sm hover:shadow-xl hover:border-[#0F612F] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="relative h-32 sm:h-44 overflow-hidden bg-gray-900">
                  <img 
                    src={srv.image} 
                    alt={srv.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-white/90 backdrop-blur-xs text-[#0F612F] p-1.5 sm:p-2 rounded-md sm:rounded-lg shadow-xs">
                    {getIconComponent(srv.icon)}
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 to-transparent p-2 sm:p-3 text-right">
                    <span className="text-[10px] sm:text-[11px] font-bold text-[#DECA19]">{srv.capacities[0]}</span>
                  </div>
                </div>

                <div className="p-3.5 sm:p-5 text-right space-y-2 sm:space-y-3">
                  <h3 className="text-xs sm:text-base font-black text-gray-900 group-hover:text-[#0F612F] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed line-clamp-2 sm:line-clamp-3">
                    {srv.shortDescription}
                  </p>

                  <ul className="space-y-1 sm:space-y-1.5 pt-1.5 sm:pt-2 border-t border-gray-100 text-[10px] sm:text-[11px] text-gray-500">
                    {srv.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#DECA19] shrink-0" />
                        <span className="truncate">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-3.5 sm:p-5 pt-0">
                <button className="w-full mt-1.5 sm:mt-2 py-1.5 sm:py-2 px-2.5 sm:px-3 bg-emerald-50 hover:bg-[#0F612F] text-[#0F612F] hover:text-white rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-colors flex items-center justify-center gap-1">
                  <span>مشاهده جزئیات و تجهیزات</span>
                  <ChevronLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Why Unified Production Chain (Advantages) */}
      <section id="why-unified-chain" className="bg-[#0c2214] text-white py-8 sm:py-16 lg:py-20 px-3 sm:px-6 lg:px-8 border-y-4 border-[#DECA19]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center sm:text-right mb-6 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#DECA19]/15 text-[#DECA19] px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold mb-2 sm:mb-3 border border-[#DECA19]/30">
              <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>مزیت رقابتی منحصر‌به‌فرد</span>
            </div>
            <h2 className="text-base sm:text-3.5xl font-black text-white mb-1.5 sm:mb-2">
              چرا تولید در یک مجموعه متمرکز، ریسک شما را به صفر می‌رساند؟
            </h2>
            <p className="text-[10px] sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
              بزرگ‌ترین چالش تولیدکنندگان، پاس‌کاری مشکلات میان «قالب‌ساز» و «پرسکار یا تزریق‌کار» است. در رسا قطعه گستر مهر، صفر تا صد زنجیره تحت مدیریت یکپارچه قرار دارد.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6 text-right">
            
            <div className="bg-[#122b1b] rounded-xl sm:rounded-2xl p-3.5 sm:p-6 border border-[#DECA19]/30 space-y-1.5 sm:space-y-3">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#0F612F] text-[#DECA19] flex items-center justify-center font-bold text-xs sm:text-lg en-num font-mono">
                01
              </div>
              <h3 className="text-xs sm:text-base font-bold text-white">پاسخگویی و ضمانت <span className="en-num font-bold">100%</span> یکپارچه</h3>
              <p className="text-[11px] sm:text-xs text-gray-300 leading-relaxed font-light">
                از طراحی و تست قالب تا تزریق یا پرسکاری تیراژ نهایی توسط یک تیم فنی انجام می‌شود؛ بدون بهانه‌تراشی و انتقال تقصیر میان سازنده قالب و تولیدکننده قطعه.
              </p>
            </div>

            <div className="bg-[#122b1b] rounded-xl sm:rounded-2xl p-3.5 sm:p-6 border border-[#DECA19]/30 space-y-1.5 sm:space-y-3">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#0F612F] text-[#DECA19] flex items-center justify-center font-bold text-xs sm:text-lg en-num font-mono">
                02
              </div>
              <h3 className="text-xs sm:text-base font-bold text-white">کاهش چشمگیر زمان و هزینه لجستیک</h3>
              <p className="text-[11px] sm:text-xs text-gray-300 leading-relaxed font-light">
                حذف جابه‌جایی‌های مکرر قالب‌های سنگین چندصد کیلویی میان کارگاه‌های مختلف، کاهش هزینه‌های حمل‌ونقل و رفع فوری هرگونه نقص در همان خط تولید.
              </p>
            </div>

            <div className="bg-[#122b1b] rounded-xl sm:rounded-2xl p-3.5 sm:p-6 border border-[#DECA19]/30 space-y-1.5 sm:space-y-3">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#0F612F] text-[#DECA19] flex items-center justify-center font-bold text-xs sm:text-lg en-num font-mono">
                03
              </div>
              <h3 className="text-xs sm:text-base font-bold text-white">تضمین تطابق <span className="en-num font-bold">100%</span> قطعه با نقشه و نمونه</h3>
              <p className="text-[11px] sm:text-xs text-gray-300 leading-relaxed font-light">
                تست و سمپل‌گیری دقیق با نظارت مستقیم مهندسان طراح در سالن تولید و ارائه نمونه اولیه قبل از شروع پروسه تولید تیراژ انبوه.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Production Workflow (From CAD to Mass Production) */}
      <section id="workflow-process" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-12 border border-gray-200 shadow-sm">
          <div className="text-center sm:text-right mb-4 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-emerald-50 text-[#0F612F] px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold mb-1.5 sm:mb-3 border border-[#0F612F]/20">
              <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#0F612F]" />
              <span>مراحل تولید از آغاز تا تحویل</span>
            </div>
            <h2 className="text-base sm:text-3xl font-black text-gray-900 mb-1 sm:mb-2">
              تولید دقیق قطعات مطابق <span className="text-[#0F612F]">نقشه، فایل سه‌بعدی و نمونه فیزیکی</span>
            </h2>
            <p className="text-[10px] sm:text-sm text-gray-500 max-w-3xl leading-relaxed">
              چه دارای فایل‌های طراحی CAD (نظیر فرمت‌های DWG, DXF, STP, STEP, IGS) باشید و چه صرفاً یک نمونه فیزیکی در اختیار داشته باشید، تیم مهندسی رسا قطعه گستر مهر با تجهیزات پیشرفته اسکن، نقشه‌کشی و ساخت قالب، مسیر تولید انبوه را برای شما هموار می‌سازد.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
            {workflowSteps.map((step) => (
              <div 
                key={step.step}
                className="relative bg-[#F8FAF9] rounded-xl sm:rounded-2xl p-3 sm:p-6 border border-gray-200 flex flex-col justify-between text-right group hover:border-[#0F612F] hover:bg-emerald-50/30 hover:shadow-md transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-4">
                    <span className="text-base sm:text-2xl font-black en-num text-[#0F612F] font-mono">{step.step}</span>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-emerald-100 text-[#0F612F] flex items-center justify-center font-bold text-xs group-hover:bg-[#0F612F] group-hover:text-[#DECA19] transition-colors">
                      {step.icon === 'FileText' && <FileCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                      {step.icon === 'Cpu' && <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                      {step.icon === 'Sparkles' && <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                      {step.icon === 'Cog' && <Cog className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                      {step.icon === 'Layers' && <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                      {step.icon === 'ShieldCheck' && <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                      {!['FileText', 'Cpu', 'Sparkles', 'Cog', 'Layers', 'ShieldCheck'].includes(step.icon) && <FileCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                    </div>
                  </div>
                  <h4 className="text-[11px] sm:text-sm font-bold text-gray-900 mb-1 sm:mb-2">{step.title}</h4>
                  <p className="text-[9px] sm:text-xs text-gray-600 leading-relaxed line-clamp-3 sm:line-clamp-none">{step.description}</p>
                </div>

                <div className="mt-2 sm:mt-4 pt-1.5 sm:pt-3 border-t border-gray-200/60 text-[8px] sm:text-[10px] font-bold text-[#0F612F]">
                  مرحله <span className="en-num font-bold">{step.step}</span> زنجیره تولید
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6.5. Official Catalog Download Callout Banner */}
      <section id="catalog-download-callout" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div 
          id="catalog-download-card"
          className="bg-gradient-to-r from-[#0c2214] to-[#12331e] rounded-xl sm:rounded-2xl py-4 px-5 sm:px-8 border border-[#DECA19]/30 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3.5 sm:gap-6 text-right"
        >
          {/* Right Content: Icon & Texts */}
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#0F612F]/80 border border-[#DECA19]/40 text-[#DECA19] flex items-center justify-center shrink-0 shadow-inner">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="space-y-0.5 sm:space-y-1">
              <h3 className="text-xs sm:text-base font-bold text-white flex items-center gap-2">
                <span>کاتالوگ جامع محصولات و تجهیزات صنعتی</span>
                <span className="hidden sm:inline-block bg-[#DECA19]/20 text-[#DECA19] text-[10px] font-bold px-2 py-0.5 rounded-md border border-[#DECA19]/30 font-mono en-num">PDF</span>
              </h3>
              <p className="text-[10px] sm:text-xs text-gray-300 font-light leading-relaxed">
                شامل مشخصات فنی پرس‌ها، ابعاد دستگاه برش لیزر و نمونه قطعات تولیدی
              </p>
            </div>
          </div>

          {/* Left Content: Action Button */}
          <div className="w-full sm:w-auto shrink-0 flex justify-end">
            <a
              id="btn-download-catalog-home"
              href="../upload/rasa.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#DECA19] hover:bg-[#c9b715] text-gray-950 font-bold text-xs py-2.5 px-5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 whitespace-nowrap"
            >
              <Download className="w-4 h-4 text-gray-950" />
              <span>دانلود کاتالوگ رسمی (PDF)</span>
            </a>
          </div>
        </div>
      </section>

      {/* 7. Call To Action Ribbon */}
      <section id="home-cta-ribbon" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="bg-[#0c2214] text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-12 border sm:border-2 border-[#DECA19] shadow-xl sm:shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-center text-right relative z-10">
            <div className="lg:col-span-8 space-y-2 sm:space-y-3">
              <span className="text-[10px] sm:text-xs font-bold text-[#DECA19] bg-[#DECA19]/15 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-[#DECA19]/30 inline-block">
                همکاری صنعتی مطمئن
              </span>
              <h2 className="text-base sm:text-3xl font-black text-white leading-tight">
                آماده شروع همکاری در طراحی قالب یا تولید قطعه هستید؟
              </h2>
              <p className="text-[11px] sm:text-sm text-gray-300 leading-relaxed max-w-2xl font-light">
                کارشناسان فنی رسا قطعه گستر مهر آماده بررسی نقشه‌ها، فایل‌های سه‌بعدی و ارائه مشاوره تخصصی در زمینه بهینه‌سازی فرآیند تولید قطعات شما می‌باشند.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2 sm:gap-3 justify-end">
              <button
                onClick={() => onNavigate('contact')}
                className="w-full bg-[#DECA19] hover:bg-[#ebd828] text-gray-950 py-2.5 sm:py-3.5 px-4 sm:px-6 rounded-lg sm:rounded-xl font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer active:scale-95"
              >
                <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-900" />
                <span>تماس و هماهنگی با کارخانه</span>
              </button>

              <a
                href={`tel:${companyInfo.phoneTel || '02176266543'}`}
                className="w-full bg-[#0F612F] hover:bg-[#0c4e26] text-white py-2.5 sm:py-3.5 px-4 sm:px-6 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all border border-[#DECA19]/40 flex items-center justify-center gap-1.5 sm:gap-2"
              >
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#DECA19]" />
                <span>تماس مستقیم: <span className="en-num font-bold">{companyInfo.phone}</span></span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
