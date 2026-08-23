import React, { useState } from 'react';
import { PageId, ServiceCategory } from '../../types';
import { SERVICES_DATA, COMPANY_INFO } from '../../data/mockData';
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
  Phone
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
      case 'plastic_injection': return <Layers className="w-6 h-6" />;
      case 'laser_cutting': return <Sparkles className="w-6 h-6" />;
      default: return <Cpu className="w-6 h-6" />;
    }
  };

  const selectedServiceData = SERVICES_DATA.find((s) => s.id === activeTab) || SERVICES_DATA[0];

  return (
    <div id="services-page-container" className="space-y-16 lg:space-y-20 pb-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#0a2315] to-[#0c1a11] text-white py-14 sm:py-18 px-4 border-b-4 border-[#DECA19] relative">
        <div className="max-w-7xl mx-auto text-right">
          <div className="inline-flex items-center gap-2 bg-[#DECA19]/15 text-[#DECA19] px-3.5 py-1 rounded-full text-xs font-bold border border-[#DECA19]/30 mb-3">
            <Cog className="w-3.5 h-3.5" />
            <span>مدیریت یکپارچه زنجیره تولید</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white mb-3">
            خدمات صنعتی و خطوط تولید <span className="text-[#DECA19]">رسا قطعه گستر مهر</span>
          </h1>
          <div className="w-24 h-1 bg-[#DECA19] rounded-full mb-4" />
          <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
            <span className="en-num font-bold">4</span> حوزه تخصصی صنعتی با امکان تولید دقیق <strong className="text-white font-bold">«مطابق نقشه و نمونه»</strong> و یکپارچگی کامل از مرحله طراحی و ساخت قالب تا تحویل قطعه نهایی
          </p>
        </div>
      </section>

      {/* Interactive Tabs for the 4 Core Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Service Tab Buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {SERVICES_DATA.map((srv) => {
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
                    {srv.capacities[0]}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black mb-1">{srv.title}</h3>
                  <span className={`text-[11px] ${isCurrent ? 'text-emerald-100' : 'text-gray-500'}`}>
                    تولید مطابق نقشه و نمونه
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Service Detailed View */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm text-right">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left/Main Column: Text, Specs, Capabilities */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 bg-emerald-50 text-[#0F612F] px-3 py-1 rounded-md text-xs font-bold border border-[#0F612F]/20">
                  <ShieldCheck className="w-4 h-4" />
                  <span>مشخصات فنی و خطوط تولید</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                  {selectedServiceData.title}
                </h2>
                <span className="text-xs text-[#0F612F] font-bold block">
                  ظرفیت نامی: <span className="en-num font-bold">{selectedServiceData.capacities[0]}</span>
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed text-justify">
                {selectedServiceData.fullDescription}
              </p>

              {/* Machinery & Equipment List */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-gray-900 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-[#0F612F]" />
                  <span>تجهیزات و ماشین‌آلات مستقر در کارخانه:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedServiceData.equipmentList.map((mach, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-800">
                      <CheckCircle2 className="w-4 h-4 text-[#0F612F] shrink-0" />
                      <span className="font-medium">{mach}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features / Standards */}
              <div className="space-y-3 pt-2 border-t border-gray-100">
                <h4 className="text-xs font-bold text-gray-900">ویژگی‌ها و مزیت‌های اجرایی:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedServiceData.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                      <span className="w-2 h-2 rounded-full bg-[#DECA19] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Materials Worked */}
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
                  <span>تماس و مشاوره فنی برای این خدمت</span>
                </button>
                <button
                  onClick={() => onNavigate('portfolio')}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-3 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  مشاهده نمونه قطعات تولیدی
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 right-4 left-4 text-right">
                  <span className="text-xs font-bold text-[#DECA19] block mb-1">کارخانه رسا قطعه گستر مهر</span>
                  <p className="text-white text-xs font-light">
                    انجام فرآیند در سالن تولید <span className="en-num font-bold">1200</span> متری با توان پرس تا <span className="en-num font-bold">400</span> تن
                  </p>
                </div>
              </div>

              {/* Quick Summary Spec Box */}
              <div className="bg-[#0c2214] text-white p-5 rounded-2xl border border-[#DECA19]/40 space-y-3">
                <h4 className="text-xs font-bold text-[#DECA19] flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>نکته کلیدی فرآیند یکپارچه:</span>
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed font-light">
                  کلیه خدمات قالب‌سازی، پرسکاری، تزریق و برش لیزر تحت یک مدیریت متمرکز اداره می‌شوند؛ بنابراین در صورت نیاز به هرگونه تغییرات، اصلاح قالب یا تنظیم تناژ پرس، بدون اتلاف زمان فرآیند اصلاح در همان کارخانه اجرا می‌گردد.
                </p>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* Comprehensive 4 Services Grid Breakdown (All on one page) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
        <div className="mb-8">
          <h3 className="text-xl sm:text-2xl font-black text-gray-900">
            خلاصه مشخصات فنی <span className="en-num font-bold">4</span> بخش تولیدی کارخانه
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            دسترسی سریع به اطلاعات هر خط تولید به صورت یکجا
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 1. قالب‌سازی */}
          <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#0F612F] transition-all shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0F612F] flex items-center justify-center font-bold">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-black text-gray-900"><span className="en-num font-bold">1</span>. طراحی و ساخت انواع قالب</h4>
                </div>
                <span className="text-[11px] bg-emerald-50 text-[#0F612F] px-2.5 py-1 rounded-md font-bold">
                  بیش از <span className="en-num font-bold">40</span> سال سابقه
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                طراحی سه‌بعدی و ساخت انواع قالب‌های سنبه‌ماتریس، پروگرسیو، کشش عمیق، دایکست و تزریق پلاستیک به همراه تعمیر و بهینه‌سازی قالب‌های مستعمل.
              </p>
            </div>
            <button
              onClick={() => { setActiveTab('mold_making'); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
              className="text-xs font-bold text-[#0F612F] hover:text-[#0c4e26] flex items-center gap-1 cursor-pointer pt-2"
            >
              <span>مشاهده کامل مشخصات قالب‌سازی</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* 2. پرسکاری */}
          <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#0F612F] transition-all shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0F612F] flex items-center justify-center font-bold">
                    <Cog className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-black text-gray-900"><span className="en-num font-bold">2</span>. پرسکاری سبک و سنگین</h4>
                </div>
                <span className="text-[11px] bg-emerald-50 text-[#0F612F] px-2.5 py-1 rounded-md font-bold">
                  توان پرس تا <span className="en-num font-bold">400</span> تن
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                تولید انواع قطعات پرسی فلزی از ضخامت <span className="en-num font-bold">0.3</span> تا <span className="en-num font-bold">10</span> میلی‌متر با <span className="en-num font-bold">8</span> دستگاه پرس ضربه‌ای و هیدرولیک، مناسب برای تیراژهای انبوه خودروسازی و لوازم خانگی.
              </p>
            </div>
            <button
              onClick={() => { setActiveTab('stamping'); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
              className="text-xs font-bold text-[#0F612F] hover:text-[#0c4e26] flex items-center gap-1 cursor-pointer pt-2"
            >
              <span>مشاهده کامل مشخصات پرسکاری</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* 3. تزریق پلاستیک */}
          <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#0F612F] transition-all shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0F612F] flex items-center justify-center font-bold">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-black text-gray-900"><span className="en-num font-bold">3</span>. تزریق پلاستیک مهندسی</h4>
                </div>
                <span className="text-[11px] bg-emerald-50 text-[#0F612F] px-2.5 py-1 rounded-md font-bold">
                  ظرفیت تا <span className="en-num font-bold">200</span> گرم
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                تولید قطعات پلیمری صنعتی و مهندسی تا <span className="en-num font-bold">200</span> گرم با <span className="en-num font-bold">2</span> دستگاه مدرن، تولید مطابق نقشه و نمونه، و همکاری نزدیک در ساخت و اصلاح سریع قالب‌ها.
              </p>
            </div>
            <button
              onClick={() => { setActiveTab('plastic_injection'); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
              className="text-xs font-bold text-[#0F612F] hover:text-[#0c4e26] flex items-center gap-1 cursor-pointer pt-2"
            >
              <span>مشاهده کامل مشخصات تزریق پلاستیک</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* 4. برش لیزر */}
          <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#0F612F] transition-all shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0F612F] flex items-center justify-center font-bold">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-black text-gray-900"><span className="en-num font-bold">4</span>. برش لیزر فایبر</h4>
                </div>
                <span className="text-[11px] bg-emerald-50 text-[#0F612F] px-2.5 py-1 rounded-md font-bold">
                  دقت میلیمتری بدون پلیسه
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                برش دقیق ورق‌های فلزی (آهن، استیل، آلومینیوم)، آماده‌سازی قطعات جهت پرسکاری، فرم‌دهی و جوشکاری با چیدمان بهینه (نستینگ) و حداقل ضایعات.
              </p>
            </div>
            <button
              onClick={() => { setActiveTab('laser_cutting'); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
              className="text-xs font-bold text-[#0F612F] hover:text-[#0c4e26] flex items-center gap-1 cursor-pointer pt-2"
            >
              <span>مشاهده کامل مشخصات برش لیزر</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
