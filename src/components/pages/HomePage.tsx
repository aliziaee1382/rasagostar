import React from 'react';
import { PageId, ServiceCategory, PortfolioItem } from '../../types';
import { 
  COMPANY_INFO, 
  COMPANY_STATS, 
  SERVICES_DATA, 
  PORTFOLIO_ITEMS, 
  INTEGRATED_PROCESS_STEPS 
} from '../../data/mockData';
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
  FileCheck,
  Compass,
  ArrowUpRight
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenService: (serviceId: ServiceCategory) => void;
  onSelectPortfolioItem: (item: PortfolioItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenService,
  onSelectPortfolioItem,
}) => {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Award': return <Award className="w-7 h-7 text-[#DECA19]" />;
      case 'Factory': return <Factory className="w-7 h-7 text-[#DECA19]" />;
      case 'Users': return <Users className="w-7 h-7 text-[#DECA19]" />;
      case 'Zap': return <Zap className="w-7 h-7 text-[#DECA19]" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-[#0F612F]" />;
      case 'Cog': return <Cog className="w-6 h-6 text-[#0F612F]" />;
      case 'Layers': return <Layers className="w-6 h-6 text-[#0F612F]" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-[#0F612F]" />;
      default: return <Factory className="w-6 h-6 text-[#0F612F]" />;
    }
  };

  return (
    <div id="home-page-container" className="space-y-16 lg:space-y-24 pb-16">
      
      {/* 1. Industrial Hero Banner */}
      <section id="hero-section" className="relative bg-gradient-to-b from-[#0a2315] via-[#0c1f13] to-[#0d160f] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b-4 border-[#DECA19] overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#DECA19 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Main Hero Headline & Introduction */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            <div className="inline-flex items-center gap-2 bg-[#DECA19]/15 text-[#DECA19] px-4 py-1.5 rounded-full text-xs font-bold border border-[#DECA19]/30">
              <ShieldCheck className="w-4 h-4" />
              <span>کارخانه صنعتی رسا قطعه گستر مهر • بیش از <span className="en-num font-bold">40</span> سال تجربه تخصصی</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5.5xl font-black text-white leading-[1.25] tracking-tight">
              زنجیره یکپارچه <span className="text-[#DECA19]">طراحی و ساخت قالب</span>، پرسکاری سنگین و تزریق پلاستیک
            </h1>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light max-w-2xl">
              تولید تخصصی انواع قطعات صنعتی دقیق فلزی و پلیمری از مرحله طراحی، نقشه‌کشی و قالب‌سازی تا پرسکاری تا <span className="en-num font-bold">400</span> تن، تزریق پلاستیک مهندسی تا <span className="en-num font-bold">200</span> گرم و برش لیزر با تجهیزات مدرن در شهرک صنعتی کارآفرینان جاجرود.
            </p>

            {/* Quick Value Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-gray-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#DECA19] shrink-0" />
                <span>طراحی، ساخت و تعمیر انواع قالب‌های صنعتی</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#DECA19] shrink-0" />
                <span>پرسکاری ضربه‌ای و هیدرولیک تا <span className="en-num font-bold">400</span> تن</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#DECA19] shrink-0" />
                <span>تزریق پلاستیک مهندسی تا <span className="en-num font-bold">200</span> گرم</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#DECA19] shrink-0" />
                <span>تولید مطابق نقشه و نمونه فیزیکی</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                id="hero-services-cta"
                onClick={() => onNavigate('services')}
                className="bg-[#0F612F] hover:bg-[#0c4e26] text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all border border-[#DECA19]/40 flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>مشاهده خدمات کارخانه</span>
                <ChevronLeft className="w-4 h-4 text-[#DECA19]" />
              </button>

              <button
                id="hero-contact-cta"
                onClick={() => onNavigate('contact')}
                className="bg-[#DECA19] hover:bg-[#c9b715] text-gray-950 px-6 py-3.5 rounded-xl font-black text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <PhoneCall className="w-4 h-4 text-gray-900" />
                <span>تماس با واحد فروش و هماهنگی</span>
              </button>
            </div>

          </div>

          {/* Hero Image Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#DECA19]/40 group bg-gray-900">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" 
                alt="کارخانه رسا قطعه گستر مهر"
                referrerPolicy="no-referrer"
                className="w-full h-[360px] sm:h-[420px] object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              
              <div className="absolute bottom-5 right-5 left-5 text-right space-y-2">
                <div className="inline-flex items-center gap-2 bg-[#0F612F]/90 backdrop-blur-xs text-white text-xs px-3 py-1.5 rounded-lg border border-[#DECA19]">
                  <Factory className="w-3.5 h-3.5 text-[#DECA19]" />
                  <span>سالن تولید <span className="en-num font-bold">1200</span> متری مجهز</span>
                </div>
                <h3 className="text-white text-sm sm:text-base font-bold">
                  خطوط اختصاصی قالب‌سازی، پرسکاری و تزریق در یک مجموعه
                </h3>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Key Factory Statistics */}
      <section id="factory-stats" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {COMPANY_STATS.map((stat, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-xl border border-gray-100 flex flex-col items-center sm:items-start text-center sm:text-right hover:border-[#0F612F] transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#0F612F] flex items-center justify-center mb-3 group-hover:bg-[#0F612F] group-hover:text-[#DECA19] transition-colors">
                {getIconComponent(stat.icon)}
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-2xl sm:text-3xl font-black text-gray-900 en-num font-mono tracking-tight">{stat.value}</span>
              </div>
              <span className="text-xs font-bold text-gray-800 mb-1">{stat.label}</span>
              <span className="text-[11px] text-gray-500 font-light">{stat.sublabel}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. The 4 Main Pillars / Services Grid */}
      <section id="services-pillars" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center sm:text-right mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-[#0F612F] px-3.5 py-1 rounded-full text-xs font-bold mb-3 border border-[#0F612F]/20">
            <Cog className="w-3.5 h-3.5 text-[#0F612F]" />
            <span>خدمات <span className="en-num font-bold">4</span> گانه کارخانه</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
            توانمندی‌های تولیدی و اجرایی رسا قطعه گستر مهر
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-3xl">
            ارائه کلیه خدمات صنعتی مطابق با استاندارد، نقشه‌های فنی مهندسی و نمونه‌های ارائه‌شده توسط کارفرما
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_DATA.map((srv) => (
            <div 
              key={srv.id}
              onClick={() => onOpenService(srv.id)}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:border-[#0F612F] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-gray-900">
                  <img 
                    src={srv.image} 
                    alt={srv.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[#0F612F] p-2 rounded-lg shadow-sm">
                    {getIconComponent(srv.icon)}
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-right">
                    <span className="text-[11px] font-bold text-[#DECA19]">{srv.capacities[0]}</span>
                  </div>
                </div>

                <div className="p-5 text-right space-y-3">
                  <h3 className="text-base font-black text-gray-900 group-hover:text-[#0F612F] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {srv.shortDescription}
                  </p>

                  <ul className="space-y-1.5 pt-2 border-t border-gray-100 text-[11px] text-gray-500">
                    {srv.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#DECA19]" />
                        <span className="truncate">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button className="w-full mt-2 py-2 px-3 bg-emerald-50 hover:bg-[#0F612F] text-[#0F612F] hover:text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5">
                  <span>مشاهده جزئیات و تجهیزات</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Why Unified Production Chain (Advantages) */}
      <section id="why-unified-chain" className="bg-[#0c2214] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-y-4 border-[#DECA19]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center sm:text-right mb-12">
            <div className="inline-flex items-center gap-2 bg-[#DECA19]/15 text-[#DECA19] px-3.5 py-1 rounded-full text-xs font-bold mb-3 border border-[#DECA19]/30">
              <Award className="w-3.5 h-3.5" />
              <span>مزیت رقابتی منحصر‌به‌فرد</span>
            </div>
            <h2 className="text-2xl sm:text-3.5xl font-black text-white mb-2">
              چرا تولید در یک مجموعه متمرکز، ریسک شما را به صفر می‌رساند؟
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
              بزرگ‌ترین چالش تولیدکنندگان، پاس‌کاری مشکلات میان «قالب‌ساز» و «پرسکار یا تزریق‌کار» است. در رسا قطعه گستر مهر، صفر تا صد زنجیره تحت مدیریت یکپارچه قرار دارد.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-right">
            
            <div className="bg-[#122b1b] rounded-2xl p-6 border border-[#DECA19]/30 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#0F612F] text-[#DECA19] flex items-center justify-center font-bold text-lg en-num">
                01
              </div>
              <h3 className="text-base font-bold text-white">پاسخگویی و ضمانت <span className="en-num font-bold">100%</span> یکپارچه</h3>
              <p className="text-xs text-gray-300 leading-relaxed font-light">
                از طراحی و تست قالب تا تزریق یا پرسکاری تیراژ نهایی توسط یک تیم فنی انجام می‌شود؛ بدون بهانه‌تراشی و انتقال تقصیر میان سازنده قالب و تولیدکننده قطعه.
              </p>
            </div>

            <div className="bg-[#122b1b] rounded-2xl p-6 border border-[#DECA19]/30 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#0F612F] text-[#DECA19] flex items-center justify-center font-bold text-lg en-num">
                02
              </div>
              <h3 className="text-base font-bold text-white">کاهش چشمگیر زمان و هزینه لجستیک</h3>
              <p className="text-xs text-gray-300 leading-relaxed font-light">
                حذف جابه‌جایی‌های مکرر قالب‌های سنگین چندصد کیلویی میان کارگاه‌های مختلف، کاهش هزینه‌های حمل‌ونقل و رفع فوری هرگونه نقص در همان خط تولید.
              </p>
            </div>

            <div className="bg-[#122b1b] rounded-2xl p-6 border border-[#DECA19]/30 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#0F612F] text-[#DECA19] flex items-center justify-center font-bold text-lg en-num">
                03
              </div>
              <h3 className="text-base font-bold text-white">تضمین تطابق <span className="en-num font-bold">100%</span> قطعه با نقشه و نمونه</h3>
              <p className="text-xs text-gray-300 leading-relaxed font-light">
                تست و سمپل‌گیری دقیق با نظارت مستقیم مهندسان طراح در سالن تولید و ارائه نمونه اولیه قبل از شروع پروسه تولید تیراژ انبوه.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Production Workflow (From CAD to Mass Production) */}
      <section id="workflow-process" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm">
          <div className="text-center sm:text-right mb-12">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-[#0F612F] px-3.5 py-1 rounded-full text-xs font-bold mb-3 border border-[#0F612F]/20">
              <Compass className="w-3.5 h-3.5 text-[#0F612F]" />
              <span>مراحل تولید از آغاز تا تحویل</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
              تولید دقیق قطعات مطابق <span className="text-[#0F612F]">نقشه، فایل سه‌بعدی و نمونه فیزیکی</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-3xl leading-relaxed">
              چه دارای فایل‌های طراحی CAD (نظیر فرمت‌های DWG, DXF, STP, STEP, IGS) باشید و چه صرفاً یک نمونه فیزیکی در اختیار داشته باشید، تیم مهندسی رسا قطعه گستر مهر با تجهیزات پیشرفته اسکن، نقشه‌کشی و ساخت قالب، مسیر تولید انبوه را برای شما هموار می‌سازد.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INTEGRATED_PROCESS_STEPS.map((step) => (
              <div 
                key={step.step}
                className="relative bg-[#F8FAF9] rounded-2xl p-6 border border-gray-200 flex flex-col justify-between text-right group hover:border-[#0F612F] hover:bg-emerald-50/30 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black en-num text-[#0F612F]">{step.step}</span>
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#0F612F] flex items-center justify-center font-bold text-xs">
                      <FileCheck className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{step.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200/60 text-[10px] font-bold text-[#0F612F]">
                  مرحله <span className="en-num font-bold">{step.step}</span> فرآیند کنترل کیفی
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Selected Sample Parts (Portfolio Teaser) */}
      <section id="portfolio-teaser" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 text-right">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-[#0F612F] px-3.5 py-1 rounded-full text-xs font-bold mb-2 border border-[#0F612F]/20">
              <Layers className="w-3.5 h-3.5 text-[#0F612F]" />
              <span>نمونه قطعات و پروژه‌ها</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              نمونه قطعات تولید شده در خطوط کارخانه
            </h2>
          </div>

          <button
            onClick={() => onNavigate('portfolio')}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0F612F] hover:text-[#0c4e26] cursor-pointer"
          >
            <span>مشاهده همه نمونه کارها</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_ITEMS.slice(0, 3).map((item) => (
            <div 
              key={item.id}
              onClick={() => onSelectPortfolioItem(item)}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#0F612F] hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group text-right"
            >
              <div>
                <div className="relative h-48 bg-gray-900 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-[#0F612F] text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-xs border border-[#DECA19]/50">
                    {item.categoryLabel}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#0F612F] transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">
                    {item.description}
                  </p>
                  
                  <div className="bg-gray-50 p-2.5 rounded-lg text-[11px] text-gray-600 space-y-1 border border-gray-100">
                    <div className="flex justify-between">
                      <span className="text-gray-400">متریال:</span>
                      <span className="font-medium text-gray-700 truncate max-w-[170px]">{item.material}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">کاربرد:</span>
                      <span className="font-medium text-gray-700 truncate max-w-[170px]">{item.application}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 flex items-center justify-between text-xs font-bold text-[#0F612F]">
                <span>مشاهده مشخصات فنی</span>
                <ArrowUpRight className="w-4 h-4 text-[#DECA19]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Call To Action Ribbon */}
      <section id="home-cta-ribbon" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0c2214] text-white rounded-3xl p-8 sm:p-12 border-2 border-[#DECA19] shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-right relative z-10">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-bold text-[#DECA19] bg-[#DECA19]/15 px-3 py-1 rounded-full border border-[#DECA19]/30 inline-block">
                همکاری صنعتی مطمئن
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                آماده شروع همکاری در طراحی قالب یا تولید قطعه هستید؟
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl">
                کارشناسان فنی رسا قطعه گستر مهر آماده بررسی نقشه‌ها و ارائه مشاوره تخصصی در زمینه بهینه‌سازی فرآیند تولید قطعات شما می‌باشند.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <button
                onClick={() => onNavigate('contact')}
                className="w-full bg-[#DECA19] hover:bg-[#c9b715] text-gray-950 py-3.5 px-6 rounded-xl font-black text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <PhoneCall className="w-4 h-4 text-gray-900" />
                <span>تماس و هماهنگی با کارخانه</span>
              </button>

              <a
                href={`tel:${COMPANY_INFO.phoneTel || '02176266543'}`}
                className="w-full bg-[#0F612F] hover:bg-[#0c4e26] text-white py-3.5 px-6 rounded-xl font-bold text-sm shadow-md transition-all border border-[#DECA19]/40 flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#DECA19]" />
                <span>تماس مستقیم: <span className="en-num font-bold">{COMPANY_INFO.phone}</span></span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
