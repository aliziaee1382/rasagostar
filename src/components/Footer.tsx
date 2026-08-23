import React from 'react';
import { PageId } from '../types';
import { useData } from '../context/DataContext';
import { Logo } from './Logo';
import { RubikaIcon } from './RubikaIcon';
import { 
  Factory, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  ChevronLeft
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenAdminLogin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdminLogin }) => {
  const { data } = useData();
  const companyInfo = data?.companyInfo || {};
  const services = data?.services || [];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <footer id="main-footer" className="bg-[#0c1a11] text-gray-300 border-t-4 border-[#DECA19] relative">
      {/* Brand Value Highlights Ribbon */}
      <div className="bg-[#12281b] border-b border-[#DECA19]/20 py-3.5 sm:py-6 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 text-right">
          <div className="flex items-center gap-2.5 sm:gap-3 p-1 sm:p-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#0F612F] flex items-center justify-center text-[#DECA19] shrink-0 border border-[#DECA19]/30">
              <Award className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">بیش از <span className="en-num font-bold">40</span> سال سابقه درخشان</h4>
              <p className="text-[10px] sm:text-xs text-gray-400">تجربه مستمر از سال <span className="en-num font-bold">1376</span> در صنعت قالب و قطعه‌سازی</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 p-1 sm:p-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#0F612F] flex items-center justify-center text-[#DECA19] shrink-0 border border-[#DECA19]/30">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">یکپارچگی کامل زنجیره تولید</h4>
              <p className="text-[10px] sm:text-xs text-gray-400">از طراحی و ساخت قالب تا تحویل قطعه نهایی بدون واسطه</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 p-1 sm:p-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#0F612F] flex items-center justify-center text-[#DECA19] shrink-0 border border-[#DECA19]/30">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">تولید مطابق نقشه و نمونه</h4>
              <p className="text-[10px] sm:text-xs text-gray-400">تضمین بالاترین دقت ابعادی با استاندارد کنترل کیفیت</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 text-right">
          
          {/* Column 1: Company Profile */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="flex items-center justify-center shrink-0">
                <Logo
                  className="h-9 sm:h-12 w-auto object-contain text-white hover:text-[#DECA19] transition-colors"
                  fillColor="white"
                />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white">{companyInfo.name}</h3>
                <span className="text-[10px] sm:text-[11px] text-[#DECA19] font-mono">{companyInfo.nameEn}</span>
              </div>
            </div>

            <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed">
              کارخانه تولیدی {companyInfo.name} با بیش از <span className="en-num font-bold">{companyInfo.experienceYears}</span> سابقه درخشان در زمینه طراحی و ساخت انواع قالب‌های صنعتی، پرسکاری سنگین و سبک تا <span className="en-num font-bold">{companyInfo.maxPressCapacity}</span>، تزریق پلاستیک مهندسی و برش لیزر فایبر فعالیت می‌نماید.
            </p>

            <div className="pt-1.5 sm:pt-2 space-y-2.5 sm:space-y-3">
              <a
                href={`tel:${companyInfo.phoneTel || '02176266543'}`}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0F612F] hover:bg-[#0c4e26] text-white py-2 sm:py-2.5 px-3.5 sm:px-4 rounded-lg text-xs font-bold transition-all border border-[#DECA19]/40 shadow-xs cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#DECA19]" />
                <span>تماس مستقیم با واحد فروش: <span className="en-num font-bold">{companyInfo.phone}</span></span>
              </a>

              {/* Social Communication Icons */}
              <div>
                <span className="text-[10px] sm:text-[11px] text-gray-400 block mb-1.5 sm:mb-2 font-medium">ارتباط مستقیم و ارسال پیام ({companyInfo.mobileSupport}):</span>
                <div className="flex items-center gap-2 sm:gap-2.5">
                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/98${companyInfo.mobileTel.replace(/^0/, '')}?text=%D8%B3%D9%84%D8%A7%D9%85%D8%8C%20%D8%AC%D9%87%D8%AA%20%D8%A7%D8%B3%D8%AA%D8%B9%D9%84%D8%A7%D9%85%20%D9%82%DB%8C%D9%85%D8%AA%20%D9%88%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D8%B5%D9%86%D8%B9%D8%AA%DB%8C%20%D9%BE%DB%8C%D8%A7%D9%85%20%D9%85%DB%8C%E2%80%8C%D8%AF%D9%87%D9%85.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-white/5 hover:bg-[#25D366]/20 border border-white/10 hover:border-[#25D366]/60 flex items-center justify-center transition-all group cursor-pointer shadow-2xs hover:scale-105"
                    title={`واتساپ: ${companyInfo.mobileSupport}`}
                    aria-label="واتساپ"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-[#25D366]" viewBox="0 0 24 24">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.17 8.17 0 012.41 5.82c0 4.54-3.7 8.24-8.24 8.24-1.44 0-2.85-.38-4.09-1.1l-.29-.17-3.04.8 1.05-2.96-.19-.3a8.16 8.16 0 01-1.25-4.51c0-4.54 3.7-8.24 8.24-8.24zm4.51 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.07-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.16 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29z" />
                    </svg>
                  </a>

                  {/* Rubika */}
                  <a
                    href="https://rubika.ir/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-amber-400/60 flex items-center justify-center transition-all group cursor-pointer shadow-2xs hover:scale-105 p-1"
                    title={`روبیکا: ${companyInfo.mobileSupport}`}
                    aria-label="روبیکا"
                  >
                    <RubikaIcon className="w-full h-full" />
                  </a>

                  {/* Bale */}
                  <a
                    href="https://ble.ir/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-white/5 hover:bg-[#00A884]/20 border border-white/10 hover:border-[#00A884]/60 flex items-center justify-center transition-all group cursor-pointer shadow-2xs hover:scale-105"
                    title={`پیام‌رسان بله: ${companyInfo.mobileSupport}`}
                    aria-label="پیام‌رسان بله"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 36 36" fill="none">
                      <rect width="36" height="36" rx="9" fill="#00A884" />
                      <path d="M18 7.5C12.2 7.5 7.5 12.2 7.5 18C7.5 20.1 8.1 22.1 9.2 23.8L8 28.5L12.9 27.4C14.4 28.1 16.2 28.5 18 28.5C23.8 28.5 28.5 23.8 28.5 18C28.5 12.2 23.8 7.5 18 7.5Z" fill="white" />
                      <path d="M14.5 18.2L16.8 20.5L21.5 15.5" stroke="#00A884" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-white/5 hover:bg-[#E1306C]/20 border border-white/10 hover:border-[#E1306C]/60 flex items-center justify-center transition-all group cursor-pointer shadow-2xs hover:scale-105"
                    title="اینستاگرام (Instagram)"
                    aria-label="اینستاگرام"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none">
                      <defs>
                        <linearGradient id="ig-grad-footer" x1="0%" y1="100%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#f09433" />
                          <stop offset="25%" stopColor="#e6683c" />
                          <stop offset="50%" stopColor="#dc2743" />
                          <stop offset="75%" stopColor="#cc2366" />
                          <stop offset="100%" stopColor="#bc1888" />
                        </linearGradient>
                      </defs>
                      <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#ig-grad-footer)" />
                      <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" stroke="white" strokeWidth="1.8" />
                      <circle cx="12" cy="12" r="3.2" stroke="white" strokeWidth="1.8" />
                      <circle cx="15.8" cy="8.2" r="0.9" fill="white" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (Desktop only) */}
          <div className="hidden md:block">
            <h4 className="text-xs sm:text-sm font-bold text-white mb-2.5 sm:mb-4 pb-1.5 sm:pb-2 border-b border-[#DECA19]/30 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#DECA19]"></span>
              <span>صفحات اصلی سایت</span>
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-[11px] sm:text-xs text-gray-300">
              <li>
                <button 
                  onClick={() => { onNavigate('home'); scrollToTop(); }}
                  className="hover:text-[#DECA19] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-[#0F612F]" />
                  <span>صفحه اصلی (خانه)</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('about'); scrollToTop(); }}
                  className="hover:text-[#DECA19] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-[#0F612F]" />
                  <span>درباره ما و تاریخچه کارخانه</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('services'); scrollToTop(); }}
                  className="hover:text-[#DECA19] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-[#0F612F]" />
                  <span>خدمات <span className="en-num font-bold">4</span> گانه تولیدی</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('contact'); scrollToTop(); }}
                  className="hover:text-[#DECA19] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-[#0F612F]" />
                  <span>تماس با ما و موقعیت روی نقشه</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: 4 Core Services List (Desktop only) */}
          <div className="hidden md:block">
            <h4 className="text-xs sm:text-sm font-bold text-white mb-2.5 sm:mb-4 pb-1.5 sm:pb-2 border-b border-[#DECA19]/30 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#DECA19]"></span>
              <span>خدمات و خطوط تولید</span>
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-[11px] sm:text-xs text-gray-300">
              {services.map((srv) => (
                <li key={srv.id}>
                  <button
                    onClick={() => { onNavigate('services'); scrollToTop(); }}
                    className="hover:text-[#DECA19] transition-colors flex items-center gap-1.5 text-right cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 text-[#DECA19]" />
                    <span>{srv.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Factory Address */}
          <div className="space-y-2.5 sm:space-y-3 text-[11px] sm:text-xs">
            <h4 className="text-xs sm:text-sm font-bold text-white mb-2.5 sm:mb-4 pb-1.5 sm:pb-2 border-b border-[#DECA19]/30 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#DECA19]"></span>
              <span>اطلاعات تماس کارخانه</span>
            </h4>

            <div className="flex items-start gap-2.5 text-gray-300">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#DECA19] shrink-0 mt-0.5" />
              <span className="leading-relaxed">{companyInfo.address}</span>
            </div>

            <div className="flex items-center gap-2.5 text-gray-300">
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#DECA19] shrink-0" />
              <div className="flex flex-col">
                <span>تلفن: <span className="en-num font-bold">{companyInfo.phone}</span></span>
                <span className="text-[10px] sm:text-[11px] text-gray-400">فروش مستقیم: <span className="en-num">{companyInfo.phoneDirect}</span></span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-gray-300">
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#DECA19] shrink-0" />
              <span className="font-mono text-gray-400">{companyInfo.email}</span>
            </div>

            <div className="flex items-start gap-2.5 text-gray-300">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#DECA19] shrink-0 mt-0.5" />
              <span className="text-gray-400 leading-relaxed"><span className="en-num">{companyInfo.workingHours}</span></span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar with Discreet Admin Trigger */}
        <div className="mt-6 sm:mt-12 pt-4 sm:pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[10px] sm:text-xs text-gray-500">
          <div 
            onClick={() => onOpenAdminLogin && onOpenAdminLogin()}
            className="cursor-default select-none transition-none"
            title=""
          >
            © کلیه حقوق مادی و معنوی برای <strong className="text-gray-300">کارخانه رسا قطعه گستر مهر</strong> محفوظ می‌باشد.
          </div>
          <div>
            طراحی توسط{' '}
            <a
              href="https://ali0003.ir"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#DECA19] hover:text-[#f4e04d] font-bold transition-colors hover:underline en-num"
            >
              0003
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
