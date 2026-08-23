import React from 'react';
import { PageId } from '../../types';
import { COMPANY_INFO, PARTNER_COMPANIES, COMPANY_STATS } from '../../data/mockData';
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
  Layers, 
  Cpu, 
  Cog, 
  Sparkles,
  ChevronLeft
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (

    <div id="about-page-container" className="space-y-16 lg:space-y-20 pb-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#0a2315] to-[#0c1a11] text-white py-14 sm:py-18 px-4 border-b-4 border-[#DECA19] relative">
        <div className="max-w-7xl mx-auto text-right">
          <div className="inline-flex items-center gap-2 bg-[#DECA19]/15 text-[#DECA19] px-3.5 py-1 rounded-full text-xs font-bold border border-[#DECA19]/30 mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>بیش از <span className="en-num font-bold">40</span> سال سابقه درخشان در صنعت</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white mb-3">
            درباره کارخانه <span className="text-[#DECA19]">رسا قطعه گستر مهر</span>
          </h1>
          <div className="w-24 h-1 bg-[#DECA19] rounded-full mb-4" />
          <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
            پیشگام در طراحی و ساخت انواع قالب‌های صنعتی، پرسکاری تا <span className="en-num font-bold">400</span> تن، تزریق پلاستیک و مدیریت یکپارچه زنجیره تامین قطعات از سال <span className="en-num font-bold">1376</span>
          </p>
        </div>
      </section>

      {/* Main Narrative & Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Narrative Text */}
          <div className="lg:col-span-7 space-y-5 text-right">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0F612F] bg-emerald-50 px-3 py-1 rounded-md border border-[#0F612F]/20">
              <Factory className="w-4 h-4 text-[#0F612F]" />
              <span>هویت و تاریخچه شرکت</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-snug">
              تعهد به کیفیت صنعتی، <br />
              <span className="text-[#0F612F]">بیش از چهار دهه حضور موثر در زنجیره تولید کشور</span>
            </h2>

            <div className="space-y-3 text-xs sm:text-sm text-gray-600 leading-relaxed text-justify">
              <p>
                شرکت <strong className="text-gray-900 font-bold">رسا قطعه گستر مهر</strong> فعالیت رسمی خود را از سال <span className="en-num font-bold">1376</span> در زمینه ماشین‌کاری، قالب‌سازی و تولید قطعات فلزی آغاز نمود. طی دهه‌های گذشته با توسعه مداوم زیرساخت‌های مهندسی و تجهیز سالن‌های تولید به مدرن‌ترین پرس‌های ضربه‌ای و هیدرولیک تا تناژ <span className="en-num font-bold">400</span> تن و ماشین‌آلات تزریق پلاستیک، توانسته است به عنوان یکی از مجموعه‌های پیشرو در تامین قطعات صنایع خودروسازی، لوازم خانگی، الکترونیک و تجهیزات ساختمانی شناخته شود.
              </p>
              <p>
                مهم‌ترین وجه تمایز این کارخانه، گردآوری تمامی فرآیندهای حساس تولید (از تحلیل نقشه CAD، ساخت قالب سنبه‌ماتریس و پروگرسیو گرفته تا کشش، پانچ، پرسکاری، تزریق قطعات پلیمری و برش لیزر) در یک سالن تولید <span className="en-num font-bold">1200</span> متری با مدیریت متمرکز مهندسی است. این یکپارچگی، ریسک‌های کیفی و عدم هماهنگی میان قالب‌ساز و خطوط تولید را به کلی مرتفع ساخته است.
              </p>
            </div>

            {/* Core Values / Strengths Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
              <div className="p-3 bg-white rounded-xl border border-gray-200 shadow-xs flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0F612F] flex items-center justify-center font-bold">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">طراحی و ساخت قالب داخلی</h4>
                  <span className="text-[10px] text-gray-500">بدون وابستگی به کارگاه‌های متفرقه</span>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-gray-200 shadow-xs flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0F612F] flex items-center justify-center font-bold">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">ظرفیت پرسکاری تا <span className="en-num font-bold">400</span> تن</h4>
                  <span className="text-[10px] text-gray-500">کشش عمیق، سنبه‌ماتریس و پروگرسیو</span>
                </div>
              </div>
            </div>

          </div>

          {/* Side Image / Stats Visual */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-gray-200 group bg-gray-900 relative">
              <img 
                src="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80" 
                alt="کارگاه قالب‌سازی و ماشین‌کاری رسا قطعه گستر مهر"
                referrerPolicy="no-referrer"
                className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 text-right text-white">
                <span className="text-xs font-bold text-[#DECA19] block mb-1">واحد قالب‌سازی و ماشین‌کاری دقیق</span>
                <span className="text-xs font-light text-gray-200">مجهز به فرز، تراش، اسپارک و ابزارهای اندازه‌گیری کالیبره</span>
              </div>
            </div>

            <div className="bg-[#0c2214] text-white p-5 rounded-2xl border border-[#DECA19]/40 space-y-2 text-right">
              <div className="flex items-center gap-2 text-xs font-bold text-[#DECA19]">
                <Target className="w-4 h-4" />
                <span>چشم‌انداز و استراتژی شرکت:</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-light">
                دستیابی به بالاترین راندمان تولید و بهینه‌سازی هزینه تمام‌شده قطعات صنعتی برای صنایع مادر، با ارتقای مستمر تجهیزات قالب‌سازی و خطوط پرسکاری تمام اتوماتیک.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Partner Companies & Co-operations Slider */}
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

          {/* Continuous 6-In-View Moving Slider Track */}
          <div 
            className="overflow-x-auto no-scrollbar relative py-2"
          >
            <div 
              className="flex gap-3 sm:gap-4 w-max animate-marquee-continuous"
              style={{ animationDuration: '30s' }}
            >
              {[...PARTNER_COMPANIES, ...PARTNER_COMPANIES].map((company, idx) => (
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


      {/* Quality Control & Assurance */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0c2214] text-white rounded-3xl p-8 sm:p-10 border-2 border-[#DECA19] shadow-xl text-right">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#DECA19]/15 text-[#DECA19] px-3 py-1 rounded-full text-xs font-bold border border-[#DECA19]/30">
                <ShieldCheck className="w-4 h-4" />
                <span>واحد کنترل کیفیت (QC) و آزمایشگاه ابعادی</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                تعهد بی قید و شرط به دقت ابعادی و انطباق استاندارد
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                در تمامی مراحل تولید، از تحویل شمش و ورق فلزی تا سنبه‌کاری، پانچ، کشش عمیق و خروج قطعات پلاستیکی، بازرسی‌های دقیق ابعادی با ابزارهای اندازه‌گیری کالیبره (کولیس دیجیتال، میکرومتر، سختی‌سنج و دستگاه‌های اندازه‌گیری سه‌بعدی) انجام می‌پذیرد.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                onClick={() => onNavigate('contact')}
                className="w-full bg-[#DECA19] hover:bg-[#c9b715] text-gray-950 py-3 rounded-xl font-bold text-xs shadow-md transition-all text-center cursor-pointer"
              >
                بازدید و هماهنگی جلسه حضوری در کارخانه
              </button>
              <a
                href={`tel:${COMPANY_INFO.phoneTel || '02176266543'}`}
                className="w-full bg-[#0F612F] hover:bg-[#0c4e26] text-white py-3 rounded-xl font-bold text-xs border border-[#DECA19]/40 transition-all text-center cursor-pointer flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#DECA19]" />
                <span>تماس مستقیم: <span className="en-num font-bold">{COMPANY_INFO.phone}</span></span>
              </a>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
