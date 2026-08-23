import React, { useState } from 'react';
import { PageId, ServiceCategory } from '../../types';
import { 
  SERVICES_DATA, 
  COMPANY_INFO,
  INHOUSE_PRODUCTION_PROCESSES,
  PARTNER_COMPLEMENTARY_SERVICES
} from '../../data/mockData';
import { 
  Cpu, 
  Cog, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Wrench, 
  ShieldCheck, 
  Zap, 
  ChevronLeft,
  Phone,
  Flame,
  RotateCw,
  Paintbrush,
  Shield,
  Sun,
  Boxes,
  ArrowLeft,
  Sliders,
  Check,
  Maximize2,
  FileCheck2,
  Share2
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
  initialSelectedService?: ServiceCategory;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  initialSelectedService = 'mold_making',
}) => {
  const [activeTab, setActiveTab] = useState<ServiceCategory>(initialSelectedService);

  const getIcon = (id: ServiceCategory) => {
    switch (id) {
      case 'mold_making': return <Cpu className="w-6 h-6" />;
      case 'stamping': return <Cog className="w-6 h-6" />;
      case 'laser_cutting': return <Sparkles className="w-6 h-6" />;
      case 'plastic_injection': return <Layers className="w-6 h-6" />;
      default: return <Cpu className="w-6 h-6" />;
    }
  };

  const getProcessIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-5 h-5 text-amber-500" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-500" />;
      case 'Wrench': return <Wrench className="w-5 h-5 text-[#0F612F]" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#0F612F]" />;
      case 'RotateCw': return <RotateCw className="w-5 h-5 text-[#0F612F]" />;
      case 'Paintbrush': return <Paintbrush className="w-5 h-5 text-purple-600" />;
      case 'Shield': return <Shield className="w-5 h-5 text-blue-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      case 'Sun': return <Sun className="w-5 h-5 text-orange-600" />;
      case 'Boxes': return <Boxes className="w-5 h-5 text-indigo-600" />;
      default: return <CheckCircle2 className="w-5 h-5 text-[#0F612F]" />;
    }
  };

  const selectedServiceData = SERVICES_DATA.find((s) => s.id === activeTab) || SERVICES_DATA[0];

  // 4-stage mold making process
  const moldProcessSteps = [
    { step: 1, title: 'طراحی سه‌بعدی', desc: 'مدل‌سازی CAD/CAM و تحلیل تنش و انقباض' },
    { step: 2, title: 'ساخت قطعات', desc: 'اسپارک، فرز، تراشکاری و سنگ مغناطیسی' },
    { step: 3, title: 'مونتاژ دقیق', desc: 'انطباق سنبه-ماتریس، کفشک و سیستم پران' },
    { step: 4, title: 'تست و اصلاح', desc: 'تولید نمونه اولیه، کنترل ابعادی و بهینه‌سازی' },
  ];

  return (
    <div id="services-page-container" className="space-y-14 sm:space-y-18 pb-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#0a2315] to-[#0c1a11] text-white py-14 sm:py-18 px-4 border-b-4 border-[#DECA19] relative">
        <div className="max-w-7xl mx-auto text-right">
          <div className="inline-flex items-center gap-2 bg-[#DECA19]/15 text-[#DECA19] px-3.5 py-1 rounded-full text-xs font-bold border border-[#DECA19]/30 mb-3">
            <Cog className="w-3.5 h-3.5" />
            <span>مدیریت یکپارچه زنجیره تولید • از قالب تا قطعه نهایی</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white mb-3">
            خدمات صنعتی و خطوط تولید <span className="text-[#DECA19]">رسا قطعه گستر مهر</span>
          </h1>
          <div className="w-24 h-1 bg-[#DECA19] rounded-full mb-4" />
          <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
            ارائه خدمات تخصصی در <span className="en-num font-bold">۴</span> حوزه اصلی تولید با امکان تولید دقیق <strong className="text-white font-bold">«مطابق نقشه و نمونه»</strong> و یکپارچگی کامل بین ساخت قالب، پرسکاری، برش لیزر و تزریق پلاستیک.
          </p>
        </div>
      </section>

      {/* Interactive Tabs for the 4 Core Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Service Tab Buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {SERVICES_DATA.map((srv, index) => {
            const isCurrent = srv.id === activeTab;
            return (
              <button
                key={srv.id}
                onClick={() => setActiveTab(srv.id)}
                className={`p-4 sm:p-5 rounded-2xl border-2 text-right transition-all flex flex-col justify-between cursor-pointer ${
                  isCurrent 
                    ? 'bg-[#0F612F] text-white border-[#DECA19] shadow-xl scale-[1.02]' 
                    : 'bg-white text-gray-800 border-gray-200 hover:border-[#0F612F]/50 hover:bg-emerald-50/40 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl ${isCurrent ? 'bg-[#DECA19] text-[#0F612F]' : 'bg-emerald-50 text-[#0F612F]'}`}>
                    {getIcon(srv.id)}
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${isCurrent ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>
                    بخش {index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black mb-1 leading-snug">{srv.title}</h3>
                  <span className={`text-[11px] block ${isCurrent ? 'text-emerald-100' : 'text-gray-500'}`}>
                    تولید مطابق نقشه و نمونه
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Service Detailed View */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm text-right">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left/Main Column: Text, Specs, Capabilities */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 bg-emerald-50 text-[#0F612F] px-3 py-1 rounded-md text-xs font-bold border border-[#0F612F]/20">
                  <ShieldCheck className="w-4 h-4" />
                  <span>مشخصات فنی و استانداردهای خط تولید</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                  {selectedServiceData.title}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">
                  {selectedServiceData.shortDescription}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed text-justify">
                {selectedServiceData.fullDescription}
              </p>

              {/* Special Feature: 4-Step Mold Making Process when activeTab is mold_making */}
              {activeTab === 'mold_making' && (
                <div className="bg-gradient-to-r from-emerald-50 to-[#F8FAF9] p-4 sm:p-5 rounded-2xl border border-[#0F612F]/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-black text-[#0F612F] flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-[#0F612F]" />
                      <span>فرآیند یکپارچه قالب‌سازی در ۴ مرحله متوالی:</span>
                    </h4>
                    <span className="text-[11px] font-bold text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">
                      فرآیند داخلی
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {moldProcessSteps.map((st, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-xl border border-gray-200/80 shadow-2xs text-center flex flex-col justify-between">
                        <div>
                          <span className="w-6 h-6 rounded-full bg-[#0F612F] text-[#DECA19] text-xs font-black inline-flex items-center justify-center mb-1.5 shadow-xs">
                            {st.step}
                          </span>
                          <h5 className="text-xs font-black text-gray-900">{st.title}</h5>
                        </div>
                        <p className="text-[10px] text-gray-500 mt-1 leading-tight">{st.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Capacities & Domain Scope List */}
              <div className="space-y-3 pt-1">
                <h4 className="text-xs font-bold text-gray-900 flex items-center gap-2">
                  <Maximize2 className="w-4 h-4 text-[#0F612F]" />
                  <span>دامنه‌ها، ظرفیت‌ها و انواع خدمات این بخش:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedServiceData.capacities.map((cap, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 bg-gray-50 hover:bg-emerald-50/40 rounded-xl border border-gray-200 text-xs text-gray-800 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-[#0F612F] shrink-0" />
                      <span className="font-semibold">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Machinery & Equipment List */}
              <div className="space-y-3 pt-2 border-t border-gray-100">
                <h4 className="text-xs font-bold text-gray-900 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-[#0F612F]" />
                  <span>ماشین‌آلات و تجهیزات مستقر در کارخانه:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedServiceData.equipmentList.map((mach, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 bg-[#FDFEFE] rounded-xl border border-gray-200 text-xs text-gray-800">
                      <span className="w-2 h-2 rounded-full bg-[#DECA19] shrink-0" />
                      <span className="font-medium">{mach}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features & Execution Advantages */}
              <div className="space-y-3 pt-2 border-t border-gray-100">
                <h4 className="text-xs font-bold text-gray-900">مزیت‌ها و ویژگی‌های اجرایی:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedServiceData.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
                      <Check className="w-3.5 h-3.5 text-[#0F612F] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Materials Covered */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <h4 className="text-xs font-bold text-gray-900">متریال‌ها و مواد اولیه تحت پوشش:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedServiceData.materials.map((mat, i) => (
                    <span key={i} className="bg-emerald-50 text-[#0F612F] px-3 py-1 rounded-lg text-xs font-bold border border-[#0F612F]/20">
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('contact')}
                  className="bg-[#0F612F] hover:bg-[#0c4e26] text-white px-6 py-3 rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all border border-[#DECA19]/40 flex items-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-[#DECA19]" />
                  <span>استعلام قیمت و مشاوره فنی برای این خدمت</span>
                </button>
                <button
                  onClick={() => onNavigate('portfolio')}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-3 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>مشاهده نمونه قطعات مرتبط</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* Right/Image Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-gray-200 bg-gray-900 group">
                <img 
                  src={selectedServiceData.image} 
                  alt={selectedServiceData.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-[320px] sm:h-[380px] object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute bottom-4 right-4 left-4 text-right">
                  <span className="text-xs font-black text-[#DECA19] block mb-1">کارخانه رسا قطعه گستر مهر</span>
                  <p className="text-white text-xs font-light leading-relaxed">
                    سالن تولید ۱۲۰۰ متری مجهز به پرس‌های ۳ تا ۴۰۰ تن، ۲ دستگاه Battenfeld آلمان و برش لیزر با میز ۲×۶ متر
                  </p>
                </div>
              </div>

              {/* Key Advantage Box */}
              <div className="bg-[#0c2214] text-white p-5 rounded-2xl border border-[#DECA19]/40 space-y-3 shadow-md">
                <h4 className="text-xs sm:text-sm font-black text-[#DECA19] flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#DECA19]" />
                  <span>مزیت محوری: استقرار همزمان قالب‌سازی و خطوط تولید</span>
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed font-light text-justify">
                  به دلیل استقرار واحد قالب‌سازی مجهز در کنار خطوط پرسکاری، برش لیزر و تزریق پلاستیک، کلیه فرآیندهای تست اولیه، عیب‌یابی، اصلاح و تغییرات نقشه بدون نیاز به برون‌سپاری و در کوتاه‌ترین زمان ممکن در خود کارخانه انجام می‌پذیرد.
                </p>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-300">
                  <span>پاسخگویی و استعلام:</span>
                  <span className="text-[#DECA19] font-bold en-num font-mono">09103176904</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* SECTION B: خدمات تکمیلی و فرآیندهای تولید (New 2-Column Section) */}
      <section id="complementary-services-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
        
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-[#DECA19]/20 text-[#0F612F] px-4 py-1.5 rounded-full text-xs font-black border border-[#DECA19]/40 mb-3">
            <FileCheck2 className="w-4 h-4 text-[#0F612F]" />
            <span>پوشش کامل زنجیره ارزش و تحویل نهایی</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
            خدمات تکمیلی و فرآیندهای تولید
          </h2>
          <div className="w-20 h-1 bg-[#DECA19] mx-auto rounded-full mb-3" />
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            رسا قطعه گستر مهر علاوه بر خطوط اصلی قالب‌سازی، پرسکاری، برش لیزر و تزریق، مجموعه کاملی از خدمات تکمیلی درون‌کارگاهی و برون‌کارگاهی را جهت تحویل محصول کاملاً آماده مونتاژ به مشتریان ارائه می‌دهد.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Column 1: فرآیندهای تولید داخلی (In-house) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-900/15 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#0F612F] text-white flex items-center justify-center shadow-md">
                  <Wrench className="w-6 h-6 text-[#DECA19]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-gray-900">
                    فرآیندهای تولید داخلی
                  </h3>
                  <p className="text-xs text-gray-500 font-light">
                    مستقر در سالن تولید و اداری کارخانه (۱۵۰۰ متر مربع)
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#0F612F] bg-emerald-50 px-3 py-1 rounded-full border border-[#0F612F]/20">
                ۵ فرآیند فعال
              </span>
            </div>

            <div className="space-y-3">
              {INHOUSE_PRODUCTION_PROCESSES.map((proc) => (
                <div 
                  key={proc.id}
                  className="p-3.5 rounded-2xl border border-gray-200/80 bg-[#FAFCFA] hover:bg-white hover:border-[#0F612F]/40 transition-all flex items-start gap-3.5 shadow-2xs group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                    {getProcessIcon(proc.icon)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs sm:text-sm font-black text-gray-900 group-hover:text-[#0F612F] transition-colors">
                        {proc.title}
                      </h4>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                        {proc.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-600 leading-relaxed mt-1 font-light">
                      {proc.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-[#0F612F]/15 flex items-center gap-2.5 text-xs text-[#0F612F] font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#0F612F] shrink-0" />
              <span>کلیه فرآیندهای فوق توسط کادر فنی کارخانه و با کنترل کیفی مستمر انجام می‌شود.</span>
            </div>
          </div>

          {/* Column 2: خدمات تکمیلی از طریق همکاران تخصصی (Specialized Partners) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-900/15 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#0c2214] text-white flex items-center justify-center shadow-md border border-[#DECA19]/40">
                  <Boxes className="w-6 h-6 text-[#DECA19]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-gray-900">
                    خدمات تکمیلی از طریق همکاران تخصصی
                  </h3>
                  <p className="text-xs text-gray-500 font-light">
                    پوشش‌دهی نهایی، عملیات حرارتی و ریخته‌گری با نظارت مستقیم QC
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                شبکه همکاران
              </span>
            </div>

            <div className="space-y-3">
              {PARTNER_COMPLEMENTARY_SERVICES.map((serv) => (
                <div 
                  key={serv.id}
                  className="p-3.5 rounded-2xl border border-gray-200/80 bg-[#FCFAFC] hover:bg-white hover:border-purple-300 transition-all flex items-start gap-3.5 shadow-2xs group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                    {getProcessIcon(serv.icon)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs sm:text-sm font-black text-gray-900 group-hover:text-purple-900 transition-colors">
                        {serv.title}
                      </h4>
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md">
                        {serv.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-600 leading-relaxed mt-1 font-light">
                      {serv.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-[#DECA19]/40 flex items-center gap-2.5 text-xs text-amber-900 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#0F612F] shrink-0" />
              <span>تطابق پوشش‌ها، تست ضخامت‌سنجی و سختی‌سنجی قبل از ارسال محصول به مشتری انجام می‌گیرد.</span>
            </div>
          </div>

        </div>

      </section>

      {/* Fast CTA & Direct Communication Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0F612F] to-[#0a351a] rounded-3xl p-7 sm:p-10 text-white border-2 border-[#DECA19]/60 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-right">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#DECA19] block">مشاوره تخصصی و بررسی رایگان نقشه</span>
            <h3 className="text-xl sm:text-2xl font-black">
              آماده شروع پروژه یا استعلام قیمت تولید قطعات هستید؟
            </h3>
            <p className="text-xs sm:text-sm text-gray-200 font-light max-w-2xl">
              نقشه دو‌بعدی، فایل سه‌بعدی (STEP/DXF) یا مشخصات نمونه قطعه خود را ارسال فرمایید تا مهندسان ما در اسرع وقت بررسی و برآورد هزینه را اعلام نمایند.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-[#DECA19] hover:bg-[#ebd828] text-gray-950 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-black shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>ارسال نقشه و استعلام آنلاین</span>
            </button>
            <a
              href="https://wa.me/989103176904?text=%D8%B3%D9%84%D8%A7%D9%85%D8%8C%20%D8%AC%D9%87%D8%AA%20%D8%A7%D8%B3%D8%AA%D8%B9%D9%84%D8%A7%D9%85%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D8%B5%D9%86%D8%B9%D8%AA%DB%8C%20%D9%BE%DB%8C%D8%A7%D9%85%20%D9%85%DB%8C%E2%80%8C%D8%AF%D9%87%D9%85."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/25 px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-[#DECA19]" />
              <span>گفتگو در واتساپ (09103176904)</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
