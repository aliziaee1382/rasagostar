import React from 'react';
import { PageId } from '../types';
import { COMPANY_INFO, SERVICES_DATA } from '../data/mockData';
import { Logo } from './Logo';
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
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#0c1a11] text-gray-300 border-t-4 border-[#DECA19] relative">
      {/* Brand Value Highlights Ribbon */}
      <div className="bg-[#12281b] border-b border-[#DECA19]/20 py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-right">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0F612F] flex items-center justify-center text-[#DECA19] shrink-0 border border-[#DECA19]/30">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">بیش از <span className="en-num font-bold">40</span> سال سابقه درخشان</h4>
              <p className="text-xs text-gray-400">تجربه مستمر از سال <span className="en-num font-bold">1376</span> در صنعت قالب و قطعه‌سازی</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0F612F] flex items-center justify-center text-[#DECA19] shrink-0 border border-[#DECA19]/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">یکپارچگی کامل زنجیره تولید</h4>
              <p className="text-xs text-gray-400">از طراحی و ساخت قالب تا تحویل قطعه نهایی بدون واسطه</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0F612F] flex items-center justify-center text-[#DECA19] shrink-0 border border-[#DECA19]/30">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">تولید مطابق نقشه و نمونه</h4>
              <p className="text-xs text-gray-400">تضمین بالاترین دقت ابعادی با استاندارد کنترل کیفیت</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-right">
          
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center shrink-0">
                <Logo
                  className="h-12 w-auto object-contain text-white hover:text-[#DECA19] transition-colors"
                  fillColor="white"
                />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">{COMPANY_INFO.name}</h3>
                <span className="text-[11px] text-[#DECA19] font-mono">{COMPANY_INFO.nameEn}</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              کارخانه تولیدی رسا قطعه گستر مهر با بیش از <span className="en-num font-bold">40</span> سال سابقه درخشان در زمینه طراحی و ساخت انواع قالب‌های صنعتی، پرسکاری سنگین و سبک تا <span className="en-num font-bold">400</span> تن، تزریق پلاستیک مهندسی تا <span className="en-num font-bold">200</span> گرم و برش لیزر فایبر فعالیت می‌نماید.
            </p>

            <div className="pt-2">
              <a
                href={`tel:${COMPANY_INFO.phoneTel || '02176266543'}`}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0F612F] hover:bg-[#0c4e26] text-white py-2.5 px-4 rounded-lg text-xs font-bold transition-all border border-[#DECA19]/40 shadow-sm cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#DECA19]" />
                <span>تماس مستقیم با واحد فروش: <span className="en-num font-bold">{COMPANY_INFO.phone}</span></span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 pb-2 border-b border-[#DECA19]/30 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#DECA19]"></span>
              <span>صفحات اصلی سایت</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
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

          {/* Column 3: 4 Core Services List */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 pb-2 border-b border-[#DECA19]/30 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#DECA19]"></span>
              <span>خدمات و خطوط تولید</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              {SERVICES_DATA.map((srv) => (
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
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white mb-4 pb-2 border-b border-[#DECA19]/30 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#DECA19]"></span>
              <span>اطلاعات تماس کارخانه</span>
            </h4>

            <div className="flex items-start gap-2.5 text-gray-300">
              <MapPin className="w-4 h-4 text-[#DECA19] shrink-0 mt-0.5" />
              <span className="leading-relaxed">{COMPANY_INFO.address}</span>
            </div>

            <div className="flex items-center gap-2.5 text-gray-300">
              <Phone className="w-4 h-4 text-[#DECA19] shrink-0" />
              <div className="flex flex-col">
                <span>تلفن: <span className="en-num font-bold">{COMPANY_INFO.phone}</span></span>
                <span className="text-[11px] text-gray-400">فروش مستقیم: <span className="en-num">{COMPANY_INFO.phoneDirect}</span></span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-gray-300">
              <Mail className="w-4 h-4 text-[#DECA19] shrink-0" />
              <span className="font-mono text-gray-400">{COMPANY_INFO.email}</span>
            </div>

            <div className="flex items-start gap-2.5 text-gray-300">
              <Clock className="w-4 h-4 text-[#DECA19] shrink-0 mt-0.5" />
              <span className="text-gray-400 leading-relaxed"><span className="en-num">{COMPANY_INFO.workingHours}</span></span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
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
