import React from 'react';
import { PageId } from '../../types';
import { useData } from '../../context/DataContext';
import { ABOUT_INFRASTRUCTURE_STATS, PRODUCTION_CHAIN_STEPS } from '../../data/mockData';
import { 
  Building2, 
  Award, 
  Users, 
  CheckCircle, 
  Factory, 
  ShieldCheck, 
  Target, 
  Handshake, 
  Phone, 
  Smartphone,
  Layers, 
  Cpu, 
  Cog, 
  Sparkles,
  Wrench,
  FileText,
  Workflow,
  ArrowDownLeft,
  CalendarCheck
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { data } = useData();
  const companyInfo = data?.companyInfo || {};
  const partnerCompanies = data?.partners || [];

  const getStepIcon = (iconName: string) => {

    switch (iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Cog': return <Cog className="w-5 h-5" />;
      case 'Wrench': return <Wrench className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      default: return <Cog className="w-5 h-5" />;
    }
  };

  const getStatIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award': return <Award className="w-6 h-6 text-[#0F612F]" />;
      case 'Building2': return <Building2 className="w-6 h-6 text-[#0F612F]" />;
      case 'Factory': return <Factory className="w-6 h-6 text-[#0F612F]" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-[#0F612F]" />;
      case 'Users': return <Users className="w-6 h-6 text-[#0F612F]" />;
      default: return <Factory className="w-6 h-6 text-[#0F612F]" />;
    }
  };

  return (
    <div id="about-page-container" className="space-y-16 lg:space-y-20 pb-16">
      
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-[#0a2315] to-[#0c1a11] text-white py-14 sm:py-20 px-4 border-b-4 border-[#DECA19] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#DECA19_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto text-right relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <div className="inline-flex items-center gap-2 bg-[#DECA19]/15 text-[#DECA19] px-3.5 py-1 rounded-full text-xs font-bold border border-[#DECA19]/30">
              <Award className="w-3.5 h-3.5" />
              <span>بیش از <span className="en-num font-bold">40</span> سال تجربه در صنعت</span>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-white/10 text-gray-200 px-3 py-1 rounded-full text-xs font-medium border border-white/15">
              <FileText className="w-3.5 h-3.5 text-[#DECA19]" />
              <span>شماره ثبت رسمی: <span className="en-num font-bold text-[#DECA19]">1876</span></span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-3 tracking-tight">
            درباره کارخانه صنعتی <span className="text-[#DECA19]">رسا قطعه گستر مهر</span>
          </h1>
          
          <div className="w-24 h-1 bg-[#DECA19] rounded-full mb-4" />
          
          <p className="text-sm sm:text-base text-emerald-100 font-bold mb-2">
            شعار محوری: <span className="text-[#DECA19]">«تجربه، تخصص و توانمندی در خدمت تولید»</span>
          </p>

          <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed font-light">
            پیشگام در طراحی و ساخت قالب‌های صنعتی، پرسکاری سنگین و سبک تا <span className="en-num font-bold">400</span> تن، تزریق پلاستیک مهندسی، برش لیزر فایبر و مدیریت یکپارچه زنجیره تامین قطعات صنعتی.
          </p>
        </div>
      </section>

      {/* 2. Key Infrastructure & Capacity Stats Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {ABOUT_INFRASTRUCTURE_STATS.map((stat, idx) => (
            <div 
              key={idx}
              className={`bg-white rounded-2xl p-4 sm:p-5 shadow-lg border border-gray-200/80 flex flex-col items-center text-center hover:border-[#0F612F] hover:shadow-xl transition-all duration-300 group ${idx === 4 ? 'col-span-2 md:col-span-1' : ''}`}
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#0F612F] flex items-center justify-center mb-2.5 group-hover:bg-[#0F612F] group-hover:text-[#DECA19] transition-colors">
                {getStatIcon(stat.icon)}
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-2xl sm:text-3xl font-black text-gray-900 en-num font-mono tracking-tight">{stat.value}</span>
              </div>
              <span className="text-xs font-bold text-gray-800 mb-1 leading-tight">{stat.label}</span>
              <span className="text-[10px] text-gray-500 font-light leading-relaxed">{stat.sublabel}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Main Narrative & Company Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Narrative Text */}
          <div className="lg:col-span-7 space-y-5 text-right">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0F612F] bg-emerald-50 px-3 py-1 rounded-md border border-[#0F612F]/20">
              <Factory className="w-4 h-4 text-[#0F612F]" />
              <span>هویت سازمانی و تاریخچه</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-snug">
              تعهد به تعالی صنعتی، <br />
              <span className="text-[#0F612F]">بیش از چهار دهه حضور موثر در زنجیره تولید کشور</span>
            </h2>

            <div className="space-y-3 text-xs sm:text-sm text-gray-600 leading-relaxed text-justify">
              <p>
                شرکت <strong className="text-gray-900 font-bold">رسا قطعه گستر مهر</strong> (شماره ثبت رسمی: <span className="en-num font-bold">1876</span>) با تکیه بر بیش از <span className="en-num font-bold">40</span> سال سابقه اساتید بنیان‌گذار در زمینه ماشین‌کاری، قالب‌سازی و تولید قطعات فلزی، هم‌اکنون به عنوان یکی از قطب‌های توانمند و معتبر تولید قطعات صنعتی در کشور شناخته می‌شود.
              </p>
              <p>
                مجموعه با در اختیار داشتن <span className="en-num font-bold">2000</span> متر مربع مساحت کل و <span className="en-num font-bold">1200</span> متر مربع سالن تولید مجهز به پرس‌های ضربه‌ای و هیدرولیک تا تناژ <span className="en-num font-bold">400</span> تن، دستگاه‌های مدرن تزریق پلاستیک، میز برش لیزر فایبر <span className="en-num font-bold">2×6</span> متر و واحد اختصاصی ساخت قالب، صفر تا صد چرخه تبدیل نقشه فنی یا نمونه اولیه به محصول نهایی باکیفیت را در یک مکان پوشش می‌دهد.
              </p>
            </div>

            {/* Core Values / Strengths Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-[#F8FAF9] rounded-xl border border-gray-200/80 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#0F612F] flex items-center justify-center font-bold">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">طراحی و ساخت قالب در محل</h4>
                  <span className="text-[10px] text-gray-500">حذف وابستگی و تسریع چشمگیر زمان تحویل</span>
                </div>
              </div>

              <div className="p-3 bg-[#F8FAF9] rounded-xl border border-gray-200/80 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#0F612F] flex items-center justify-center font-bold">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">ظرفیت پرسکاری تا <span className="en-num font-bold">400</span> تن</h4>
                  <span className="text-[10px] text-gray-500">کشش عمیق، سنبه‌ماتریس و پروگرسیو سنگین</span>
                </div>
              </div>
            </div>

          </div>

          {/* Side Visual / Highlights */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-gray-200 group bg-gray-900 relative">
              <img 
                src="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80" 
                alt="سالن تولید و قالب‌سازی کارخانه رسا قطعه گستر مهر"
                referrerPolicy="no-referrer"
                className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 text-right text-white">
                <div className="inline-flex items-center gap-1.5 bg-[#DECA19] text-gray-950 text-[10px] font-bold px-2 py-0.5 rounded mb-1.5">
                  <span>سالن تولید ۱۲۰۰ متر مربع</span>
                </div>
                <h3 className="text-sm font-bold text-white block mb-0.5">واحد یکپارچه قالب‌سازی و تولید</h3>
                <span className="text-xs font-light text-gray-200">ماشین‌کاری CNC، پرس‌های سنگین و بازرسی ابعادی</span>
              </div>
            </div>

            <div className="bg-[#0c2214] text-white p-5 rounded-2xl border border-[#DECA19]/40 space-y-2 text-right">
              <div className="flex items-center gap-2 text-xs font-bold text-[#DECA19]">
                <Target className="w-4 h-4" />
                <span>چشم‌انداز و استراتژی شرکت:</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-light">
                دستیابی به بالاترین راندمان تولید و بهینه‌سازی هزینه تمام‌شده قطعات صنعتی برای صنایع مادر، با ارتقای مستمر تجهیزات قالب‌سازی، اتوماسیون خطوط و انطباق بی‌قیدوشرط با الزامات کیفی مشتریان.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Integrated Production Chain Section (From Mold to Final Product) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F8FAF9] border-2 border-emerald-900/10 rounded-3xl p-6 sm:p-10 text-right">
          
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 bg-[#0F612F]/10 text-[#0F612F] px-3.5 py-1 rounded-full text-xs font-bold mb-2.5 border border-[#0F612F]/20">
              <Workflow className="w-3.5 h-3.5 text-[#0F612F]" />
              <span>زنجیره ارزش یکپارچه (From Mold to Final Product)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              فرآیند ۶ مرحله‌ای تولید یکپارچه در کارخانه
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed font-light">
              تمامی گام‌های حیاتی از مهندسی معکوس و طراحی قالب تا فرآوری متریال، پرسکاری، تزریق، پرداخت و تحویل محموله تحت نظارت مستقیم کادر فنی انجام می‌گیرد:
            </p>
          </div>

          {/* 6-Step Flow Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative">
            {PRODUCTION_CHAIN_STEPS.map((step) => (
              <div 
                key={step.stepNumber}
                className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md hover:border-[#0F612F] transition-all flex flex-col justify-between group relative"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-xl bg-emerald-100 text-[#0F612F] font-black en-num flex items-center justify-center text-sm">
                      {step.stepNumber}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-gray-50 text-gray-700 flex items-center justify-center group-hover:bg-[#0F612F] group-hover:text-white transition-colors">
                      {getStepIcon(step.icon)}
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-[#0F612F] bg-emerald-50 px-2 py-0.5 rounded inline-block mb-1.5">
                    {step.tag}
                  </span>

                  <h3 className="text-base font-black text-gray-900 mb-2 group-hover:text-[#0F612F] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed font-light mb-4">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] font-medium text-gray-500">
                  <span className="text-[10px] font-bold text-gray-700">{step.highlight}</span>
                  <CheckCircle className="w-3.5 h-3.5 text-[#DECA19]" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Partner Companies & Co-operations Slider */}
      <section className="bg-white py-12 sm:py-16 border-y border-gray-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8 text-right">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-[#0F612F] px-3.5 py-1 rounded-full text-xs font-bold mb-2 border border-[#0F612F]/20">
                <Handshake className="w-3.5 h-3.5 text-[#0F612F]" />
                <span>همکاری با صنایع مادر و برندهای برتر</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                با شرکت‌های معتبر و بزرگ زیر همکاری داشته‌ایم
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 max-w-3xl mt-2 leading-relaxed font-light">
                کارخانه صنعتی <strong className="text-gray-900 font-bold">رسا قطعه گستر مهر</strong> مفتخر است در طول بیش از <span className="en-num font-bold">40</span> سال فعالیت، در قالب پروژه‌های ساخت قالب‌های سنبه‌ماتریس و پروگرسیو، پرسکاری تیراژ سنگین، تزریق پلاستیک مهندسی و مدیریت زنجیره تامین، با نام‌آوران صنایع خودروسازی و لوازم خانگی کشور همکاری مستمر داشته باشد:
              </p>
            </div>
          </div>

          {/* Continuous Moving Slider Track */}
          <div 
            className="overflow-x-auto no-scrollbar relative py-2"
          >
            <div 
              className="flex gap-3 sm:gap-4 w-max animate-marquee-continuous"
              style={{ animationDuration: '30s' }}
            >
              {[...partnerCompanies, ...partnerCompanies].map((company, idx) => (
                <div 
                  key={`${company.id}-${idx}`}
                  className="w-[170px] sm:w-[195px] lg:w-[200px] flex-shrink-0 bg-[#F8FAF9] hover:bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 hover:border-[#0F612F] hover:shadow-lg transition-all text-right flex flex-col justify-between group select-none"
                >
                  <div>
                    {/* Monogram / Logo Mark */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-black en-num text-[#0F612F] bg-emerald-100/80 px-2.5 py-0.5 rounded-md font-mono">
                        {company.latinName}
                      </span>
                      <Building2 className="w-4 h-4 text-gray-400 group-hover:text-[#0F612F] transition-colors" />
                    </div>

                    {/* Company Persian Name */}
                    <h3 className="text-base sm:text-lg font-black text-gray-900 mb-1 group-hover:text-[#0F612F] transition-colors">
                      {company.name}
                    </h3>
                    
                    {/* Sector */}
                    <span className="text-[11px] text-gray-500 font-medium block mb-2 leading-tight">
                      {company.sector}
                    </span>
                  </div>

                  {/* Cooperation Type */}
                  <div className="mt-3 pt-2.5 border-t border-gray-200/70">
                    <p className="text-[10px] text-gray-600 leading-snug font-light line-clamp-2">
                      {company.cooperationType}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-[#0F612F]" />
              <span>تامین قطعات پرسی، قالب‌های تخصصی و خدمات تزریق مطابق با استانداردهای سخت‌گیرانه صنعتی</span>
            </span>
            <span className="hidden sm:inline text-[11px] text-gray-400">
              * برای توقف حرکت، نشانگر ماوس را روی کارت‌ها نگه دارید
            </span>
          </div>

        </div>
      </section>

      {/* 6. Quality Control & Assurance + Contact CTAs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0c2214] text-white rounded-3xl p-8 sm:p-10 border-2 border-[#DECA19] shadow-xl text-right">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#DECA19]/15 text-[#DECA19] px-3.5 py-1 rounded-full text-xs font-bold border border-[#DECA19]/30">
                <ShieldCheck className="w-4 h-4" />
                <span>واحد کنترل کیفیت (QC) و آزمایشگاه ابعادی</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-snug">
                تعهد بی‌قیدوشرط به انطباق با نقشه و دقت ابعادی
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                در تمامی مراحل فرآیند—از آنالیز مواد اولیه تا خروج از قالب، پرسکاری، عملیات تکمیلی و مونتاژ نهایی—بازرسی‌های مستمر ابعادی با تجهیزات کالیبره (کولیس دیجیتال، میکرومتر، سختی‌سنج و ابزارهای سه‌بعدی) انجام می‌گردد تا عدم انطباق به صفر برسد.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-3">
              <button
                onClick={() => onNavigate('contact')}
                className="w-full bg-[#DECA19] hover:bg-[#c9b715] text-gray-950 py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all text-center cursor-pointer flex items-center justify-center gap-2"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>بازدید حضوری و هماهنگی جلسه در کارخانه</span>
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a
                  href={`tel:${companyInfo.phoneTel}`}
                  className="bg-[#0F612F] hover:bg-[#0c4e26] text-white py-3 px-3 rounded-xl font-bold text-xs border border-[#DECA19]/40 transition-all text-center cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#DECA19]" />
                  <span>تلفن: <span className="en-num font-bold">{companyInfo.phone}</span></span>
                </a>

                <a
                  href={`tel:${companyInfo.mobileTel}`}
                  className="bg-white/10 hover:bg-white/20 text-white py-3 px-3 rounded-xl font-bold text-xs border border-white/20 transition-all text-center cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Smartphone className="w-3.5 h-3.5 text-[#DECA19]" />
                  <span>همراه: <span className="en-num font-bold">{companyInfo.mobileSupport}</span></span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
