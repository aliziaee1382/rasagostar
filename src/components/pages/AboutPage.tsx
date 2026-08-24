import React from 'react';
import { PageId, CoreValueItem, QualityCertItem } from '../../types';
import { useData } from '../../context/DataContext';
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
  Cpu, 
  FileText,
  Clock,
  Coins,
  MapPin,
  CalendarCheck,
  CheckCircle2,
  Sliders,
  Scale,
  Microscope,
  Zap,
  Boxes
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

// Fallback Core Values if CMS content is empty
const DEFAULT_CORE_VALUES: CoreValueItem[] = [
  {
    icon: 'Target',
    title: 'تعهد به دقت و کیفیت ابعادی',
    badge: 'انطباق ۱۰۰٪ با نقشه',
    description: 'تضمین تلرانس‌های میکرونی و رعایت کامل مشخصات فنی نقشه کارفرما با بهره‌گیری از قالب‌های دقیق ساخت داخل و فرآیندهای ماشین‌کاری CNC و اسپارک.',
    points: [
      'انطباق قطعه تولیدی با نقشه‌ها و نمونه اولیه',
      'کنترل سختی‌سنجی و تست استحکام متریال',
      'حذف خطاهای انباشته ابعادی در تیراژ انبوه'
    ]
  },
  {
    icon: 'Clock',
    title: 'پایبندی به زمان‌بندی و تحویل تیراژ',
    badge: 'تعهد در تحویل به‌موقع',
    description: 'برنامه‌ریزی دقیق تولید (MRP) و بهره‌گیری از ماشین‌آلات موازی با ظرفیت بالا، مانع از هرگونه تاخیر در خطوط مونتاژ صنایع همکار و خودروسازان می‌گردد.',
    points: [
      'زمان‌بندی شفاف و گزارش‌دهی دوره‌ای به کارفرما',
      'ظرفیت تولید پرسرعت در شیفت‌های کاری منظم',
      'پایداری در زنجیره تامین و تحویل مرحله‌ای'
    ]
  },
  {
    icon: 'Coins',
    title: 'بهینه‌سازی هزینه تمام‌شده',
    badge: 'مدیریت یکپارچه قالب تا قطعه',
    description: 'تجمیع صفر تا صد زنجیره ساخت قالب، برش لیزر، پرسکاری و تزریق پلاستیک در یک کارخانه، هزینه‌های حمل‌ونقل و واسطه‌های فرآیندی را به حداقل می‌رساند.',
    points: [
      'چیدمان هوشمند متریال (Nesting) و کاهش ضایعات ورق',
      'حذف هزینه واسطه‌ها و مغایرت قالب‌ساز و تولیدکننده',
      'تعمیرات و نگهداری رایگان قالب در طول قرارداد تولید'
    ]
  }
];

// Fallback Quality Certifications if CMS content is empty
const DEFAULT_QUALITY_CERTS: QualityCertItem[] = [
  {
    title: 'ISO 9001:2015',
    subtitle: 'سیستم مدیریت کیفیت صنعتی',
    description: 'انطباق فرآیندهای تولید، نگهداری مدارک و بازرسی با استانداردهای بین‌المللی مدیریت کیفیت',
    tag: 'استاندارد مرجع'
  },
  {
    title: 'الزامات کیفی صنعت خودرو',
    subtitle: 'تطابق با استانداردهای ساپکو و سازه‌گستر',
    description: 'تولید قطعات حساس پرسی و پلیمری بر اساس گریدها و دستورالعمل‌های سخت‌گیرانه خودروسازان',
    tag: 'صنعت خودرو'
  },
  {
    title: 'استاندارد بازرسی لوازم خانگی',
    subtitle: 'تست‌های ظاهری و دوام ساختاری',
    description: 'آزمون‌های مداوم کشش عمیق، پایداری رنگ، آزمون انطباق و مقاومت به سایش قطعات خانگی',
    tag: 'لوازم خانگی'
  }
];

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { data } = useData();
  
  // 1. Fully dynamic CMS data resolution
  const companyInfo = data?.companyInfo || {};
  const aboutContent = data?.pagesContent?.about || {};
  const partnerCompanies = (data?.partners && data.partners.length > 0) ? data.partners : [];
  
  // Company Base Data
  const companyName = companyInfo.name || 'رسا قطعه گستر مهر';
  const registrationNo = companyInfo.registrationNo || companyInfo.registrationNumber || '1876';
  const experienceYears = companyInfo.experienceYears || '40+';
  const companyAddress = companyInfo.address || 'جاجرود، شهرک صنعتی کارآفرینان، خیابان اصلی، پلاک 4';
  const companySlogan = companyInfo.slogan || '«تجربه، تخصص و توانمندی در خدمت تولید»';
  const maxPressCapacity = companyInfo.maxPressCapacity || '۴۰۰ تن';
  
  // Header texts
  const headline = aboutContent.headline || aboutContent.heroTitle || `مجتمع صنعتی و قالب‌سازی ${companyName}`;
  const subheadline = aboutContent.subheadline || 'مدیریت یکپارچه زنجیره تولید از طراحی و ساخت قالب تا تولید و تحویل قطعه نهایی';
  
  // Paragraphs
  const historyP1 = aboutContent.historyParagraph1 || aboutContent.historyText || 
    `کارخانه صنعتی ${companyName} با بیش از ۴ دهه حضور مستمر و پیشگام در صنعت کشور، به عنوان یکی از مجموعه‌های برتر در زمینه طراحی و ساخت انواع قالب‌های صنعتی، خطوط پرسکاری ضربه‌ای و هیدرولیک تا ۴۰۰ تن، تزریق پلاستیک مهندسی و برش لیزر فایبر فعالیت می‌نماید.`;
  
  const historyP2 = aboutContent.historyParagraph2 || aboutContent.missionDescription || aboutContent.missionText || 
    'تمرکز ما بر ایجاد یک زنجیره تامین یکپارچه و مطمئن از فاز ایده و نقشه اولیه تا تولید انبوه قطعات صنعتی، کاهش بهای تمام‌شده و تضمین ۱۰۰ درصدی کیفیت و دقت ابعادی است.';

  // Helper to extract clean display value from string (e.g. '2000 متر مربع' -> '2000')
  const cleanNumericStat = (val: string | undefined, fallback: string): string => {
    if (!val || typeof val !== 'string') return fallback;
    const trimmed = val.trim();
    if (!trimmed) return fallback;
    const match = trimmed.match(/[\d\u06F0-\u06F9+]+/);
    return match ? match[0] : trimmed;
  };

  // 2. Physical Infrastructure Facilities (4 dynamic cards)
  const totalAreaValue = cleanNumericStat(companyInfo.totalArea || companyInfo.factoryArea, '2000');
  const prodAreaValue = cleanNumericStat(companyInfo.productionArea, '1200');
  const officeAreaValue = cleanNumericStat(companyInfo.officeArea, '300');
  const personnelValue = cleanNumericStat(companyInfo.personnelCount, '60+');

  const infrastructureFacilities = [
    {
      value: totalAreaValue,
      unit: 'متر مربع',
      title: 'متراژ کل مجموعه',
      description: 'مساحت کل کارخانه، محوطه اختصاصی بارگیری، انبار متریال و تاسیسات فنی',
      icon: Building2,
      accent: 'border-emerald-500/30'
    },
    {
      value: prodAreaValue,
      unit: 'متر مربع',
      title: 'سالن اختصاصی تولید و ماشین‌آلات',
      description: `استقرار خطوط پرس ضربه‌ای و هیدرولیک ۳ تا ${maxPressCapacity}، تزریق پلاستیک و برش لیزر`,
      icon: Factory,
      accent: 'border-[#DECA19]/40'
    },
    {
      value: officeAreaValue,
      unit: 'متر مربع',
      title: 'واحد مهندسی، طراحی و اداری',
      description: 'آتلیه تخصصی طراحی CAD/CAM، مدل‌سازی سه‌بعدی، کنترل پروژه و جلسات فنی',
      icon: Cpu,
      accent: 'border-blue-500/30'
    },
    {
      value: personnelValue,
      unit: 'نفر متخصص',
      title: 'سرمایه انسانی و کادر فنی',
      description: 'تیم فعال مستقیم و غیرمستقیم شامل مهندسان طراح، قالب‌سازان و اپراتورهای خط تولید',
      icon: Users,
      accent: 'border-amber-500/30'
    }
  ];

  // 3. Dynamic Core Values and Ethics
  const coreValuesList: CoreValueItem[] = (aboutContent.coreValues && aboutContent.coreValues.length > 0)
    ? aboutContent.coreValues
    : DEFAULT_CORE_VALUES;

  const ethicsSectionBadge = aboutContent.ethicsTitle || 'منشور اخلاقی و تعهدات بنیادین';
  const ethicsSectionTitle = aboutContent.ethicsSubtitle || `سه رکن اساسی تعهد سازمانی در ${companyName}`;

  // Helper for dynamic icon mapping
  const resolveCoreValueIcon = (iconName?: string) => {
    switch (iconName?.toLowerCase()) {
      case 'target':
        return Target;
      case 'clock':
        return Clock;
      case 'coins':
      case 'coin':
      case 'handshake':
        return Coins;
      case 'factory':
        return Factory;
      case 'cpu':
        return Cpu;
      case 'zap':
        return Zap;
      case 'boxes':
        return Boxes;
      case 'award':
        return Award;
      default:
        return ShieldCheck;
    }
  };

  // 4. Quality Policy and Inspection Standards
  const qualityPolicyTitle = aboutContent.qualityPolicyTitle || 'پایش مستمر، تجهیزات کالیبره و تضمین صفر درصد عدم‌انطباق';
  const qualityPolicySubtitle = aboutContent.qualityPolicySubtitle || 'سیستم مدیریت کیفیت (Quality Control)';
  const qualityPolicyText = aboutContent.qualityPolicyText || aboutContent.qualityText || 
    `واحد کنترل کیفیت (QC) کارخانه ${companyName} به صورت مستقل و سیستماتیک، بر کلیه مراحل ورودی متریال، در حین تولید (IPQC) و بازرسی نهایی محصول نظارت دارد. تجهیزات اندازه‌گیری دقیق، فیکسچرهای کنترلی و فرآیند پایش دوره‌ای تضمین می‌کنند که قطعه تولیدی بدون کمترین خطا و با بالاترین سطح انطباق تحویل مشتری گردد.`;

  const qualityCertificationsList: QualityCertItem[] = (aboutContent.qualityCertifications && aboutContent.qualityCertifications.length > 0)
    ? aboutContent.qualityCertifications
    : DEFAULT_QUALITY_CERTS;

  // 5. CTA Section texts
  const ctaTitle = aboutContent.ctaTitle || 'میزبان مدیران محترم فنی، زنجیره تامین و کارفرمایان صنعتی هستیم';
  const ctaSubtitle = aboutContent.ctaSubtitle || 'دعوت به بازدید حضوری از کارخانه';
  const ctaDescription = aboutContent.ctaDescription || 
    'جهت بررسی میدانی توانمندی‌های خطوط قالب‌سازی، پرسکاری سنگین، برش لیزر و تزریق پلاستیک و همچنین مذاکره فنی پروژه‌های تولیدی، از شما دعوت می‌کنیم تا با هماهنگی قبلی از سالن‌های کارخانه در شهرک صنعتی کارآفرینان جاجرود بازدید فرمایید.';
  const ctaAddress = aboutContent.ctaAddress || companyAddress;

  // Contact clean phone protocols
  const cleanTelNumber = (phoneStr?: string): string => {
    if (!phoneStr) return '';
    return phoneStr.replace(/[^0-9+]/g, '');
  };

  const directPhoneDisplay = companyInfo.phone || '021-76266543-5';
  const directPhoneTel = cleanTelNumber(companyInfo.phoneTel || companyInfo.phone || '02176266543');
  
  const mobileSupportDisplay = companyInfo.mobileSupport || '0910-3176904';
  const mobileSupportTel = cleanTelNumber(companyInfo.mobileTel || companyInfo.mobileSupport || '09103176904');

  return (
    <div id="about-page-container" className="space-y-8 sm:space-y-16 lg:space-y-20 pb-8 sm:pb-16 text-right">
      
      {/* 1. Company Profile & Header Banner */}
      <section className="bg-gradient-to-b from-[#0a2315] to-[#0c1a11] text-white py-8 sm:py-16 lg:py-20 px-3 sm:px-6 lg:px-8 border-b-4 border-[#DECA19] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#DECA19_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#DECA19]/15 text-[#DECA19] px-3 py-1 rounded-full text-xs font-bold border border-[#DECA19]/30">
              <Award className="w-3.5 h-3.5 text-[#DECA19]" />
              <span>بیش از <span className="en-num font-bold">{experienceYears}</span> سال سابقه فعالیت در صنعت</span>
            </div>
            
            <div className="inline-flex items-center gap-1.5 bg-white/10 text-gray-200 px-3 py-1 rounded-full text-xs font-medium border border-white/15">
              <FileText className="w-3.5 h-3.5 text-[#DECA19]" />
              <span>شماره ثبت رسمی: <span className="en-num font-bold text-[#DECA19]">{registrationNo}</span></span>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-emerald-950/80 text-emerald-300 px-3 py-1 rounded-full text-xs font-medium border border-emerald-500/20">
              <MapPin className="w-3.5 h-3.5 text-[#DECA19]" />
              <span>{companyAddress.split('،')[0] || 'جاجرود، شهرک صنعتی کارآفرینان'}</span>
            </div>
          </div>

          {/* Main Title & Slogan */}
          <div className="max-w-4xl space-y-2 sm:space-y-3">
            <h1 className="text-xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-snug sm:leading-tight">
              {headline.includes(companyName) ? (
                <span>
                  {headline.replace(companyName, '').trim()}{' '}
                  <span className="text-[#DECA19]">{companyName}</span>
                </span>
              ) : (
                <span>
                  {headline} - <span className="text-[#DECA19]">{companyName}</span>
                </span>
              )}
            </h1>
            
            <div className="w-20 sm:w-28 h-1 bg-[#DECA19] rounded-full" />
            
            <p className="text-sm sm:text-lg text-emerald-200 font-bold flex flex-wrap items-center gap-2 pt-1">
              <span>شعار رسمی کارخانه:</span>
              <span className="text-[#DECA19] bg-white/5 px-2.5 py-0.5 rounded-md border border-[#DECA19]/20 font-black">
                {companySlogan}
              </span>
            </p>

            {subheadline && (
              <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed pt-0.5">
                {subheadline}
              </p>
            )}

            <div className="space-y-2 pt-2">
              <p className="text-xs sm:text-base text-gray-300 leading-relaxed font-light text-justify">
                {historyP1}
              </p>
              {historyP2 && (
                <p className="text-xs sm:text-base text-gray-300 leading-relaxed font-light text-justify">
                  {historyP2}
                </p>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* 2. Infrastructure & Physical Facilities (4 Distinct Corporate Cards) */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 -mt-6 sm:-mt-12 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {infrastructureFacilities.map((facility, idx) => {
            const IconComp = facility.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-xl border-2 border-gray-200 hover:border-[#0F612F] transition-all duration-300 flex flex-col justify-between group text-right"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-50 text-[#0F612F] flex items-center justify-center group-hover:bg-[#0F612F] group-hover:text-[#DECA19] transition-colors border border-emerald-100">
                      <IconComp className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-lg">
                      {facility.unit}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-1.5 mb-1.5">
                    <span className="text-2xl sm:text-4xl font-black text-gray-900 en-num font-mono tracking-tight group-hover:text-[#0F612F] transition-colors">
                      {facility.value}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-gray-600">
                      {facility.unit}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-black text-gray-900 mb-1.5 leading-snug">
                    {facility.title}
                  </h3>

                  <p className="text-xs text-gray-500 leading-relaxed font-light">
                    {facility.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] font-medium text-emerald-800">
                  <span>زیرساخت رسمی کارخانه</span>
                  <CheckCircle2 className="w-4 h-4 text-[#0F612F]" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Core Values & Ethical Commitments (3 Columns) */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="bg-[#F8FAF9] border-2 border-emerald-900/10 rounded-2xl sm:rounded-3xl p-5 sm:p-10 text-right">
          
          <div className="max-w-3xl mb-6 sm:mb-10">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#0F612F]/10 text-[#0F612F] px-3 py-1 rounded-full text-xs font-bold mb-2.5 border border-[#0F612F]/20">
              <ShieldCheck className="w-4 h-4 text-[#0F612F]" />
              <span>{ethicsSectionBadge}</span>
            </div>
            <h2 className="text-lg sm:text-3xl font-black text-gray-900 leading-tight">
              {ethicsSectionTitle}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1.5 leading-relaxed font-light">
              اعتماد صنایع مادر و برندهای برتر کشور، حاصل بیش از {experienceYears} سال پایبندی مستمر ما به اصول بنیادین کیفیت، زمان‌بندی و شفافیت مالی است:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {coreValuesList.map((val, idx) => {
              const IconComponent = resolveCoreValueIcon(val.icon);
              return (
                <div 
                  key={val.id || idx}
                  className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-[#0F612F] transition-all flex flex-col justify-between group text-right"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-50 text-[#0F612F] flex items-center justify-center group-hover:bg-[#0F612F] group-hover:text-white transition-colors">
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <span className="text-[10px] sm:text-xs font-bold text-[#0F612F] bg-emerald-50 px-2.5 py-1 rounded-md border border-[#0F612F]/20">
                        {val.badge}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-lg font-black text-gray-900 mb-2 group-hover:text-[#0F612F] transition-colors">
                      {val.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light mb-4 text-justify">
                      {val.description}
                    </p>
                  </div>

                  {val.points && val.points.length > 0 && (
                    <div className="pt-3 border-t border-gray-100 space-y-2">
                      {val.points.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2 text-xs text-gray-700 font-medium">
                          <CheckCircle className="w-3.5 h-3.5 text-[#0F612F] shrink-0 mt-0.5" />
                          <span className="leading-snug">{pt}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. Quality Policy & Inspection Standards */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
          
          {/* Text & Approach */}
          <div className="lg:col-span-6 space-y-3 sm:space-y-4 text-right">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F612F] bg-emerald-50 px-3 py-1 rounded-md border border-[#0F612F]/20">
              <Microscope className="w-4 h-4 text-[#0F612F]" />
              <span>{qualityPolicySubtitle}</span>
            </div>

            <h2 className="text-lg sm:text-3xl font-black text-gray-900 leading-snug">
              {qualityPolicyTitle}
            </h2>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light text-justify">
              {qualityPolicyText}
            </p>

            <div className="space-y-2.5 pt-2">
              <div className="p-3 bg-[#F8FAF9] rounded-xl border border-gray-200/90 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#0F612F] flex items-center justify-center shrink-0">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900">سنجش متالورژیکی و آنالیز ورق‌ها</h4>
                  <p className="text-[11px] text-gray-500 font-light">تایید گرید فولاد (ST12, ST14, DC01, استیل و آلومینیوم) پیش از بارگذاری در پرس‌ها</p>
                </div>
              </div>

              <div className="p-3 bg-[#F8FAF9] rounded-xl border border-gray-200/90 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#0F612F] flex items-center justify-center shrink-0">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900">کنترل ابعادی دوره‌ای در حین تولید</h4>
                  <p className="text-[11px] text-gray-500 font-light">نمونه‌برداری آماری و اندازه‌گیری تلرانس‌ها در فواصل منظم ضرب پرس‌ها و شات‌های تزریق</p>
                </div>
              </div>
            </div>

          </div>

          {/* Certifications & Badges Display */}
          <div className="lg:col-span-6 space-y-3 sm:space-y-4">
            <div className="bg-[#0c2214] text-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border-2 border-[#DECA19] shadow-xl space-y-4 text-right">
              <div className="flex items-center justify-between border-b border-white/15 pb-3">
                <div>
                  <span className="text-xs font-bold text-[#DECA19] block mb-0.5">استانداردهای مهندسی و بازرسی</span>
                  <h3 className="text-base sm:text-xl font-black text-white">انطباق با الزامات صنایع مادر</h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#DECA19]/20 text-[#DECA19] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
              </div>

              <div className="space-y-3">
                {qualityCertificationsList.map((cert, cIdx) => (
                  <div key={cert.id || cIdx} className="bg-white/5 hover:bg-white/10 p-3.5 rounded-xl border border-white/10 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-xs sm:text-sm font-black text-[#DECA19]">{cert.title}</h4>
                      <span className="text-[10px] font-bold bg-white/15 text-gray-200 px-2 py-0.5 rounded">
                        {cert.tag}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-white block mb-0.5">{cert.subtitle}</span>
                    <p className="text-[11px] text-gray-300 font-light leading-relaxed">{cert.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Clients & Strategic Partners (Continuous Animated Slider from data.partners) */}
      <section className="bg-white py-8 sm:py-16 border-y-2 border-gray-200/80 overflow-hidden text-right">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          
          <div className="mb-6 sm:mb-10">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-emerald-50 text-[#0F612F] px-3 py-1 rounded-full text-xs font-bold mb-2 border border-[#0F612F]/20">
              <Handshake className="w-4 h-4 text-[#0F612F]" />
              <span>شرکای تجاری و مشتریان برتر</span>
            </div>
            <h2 className="text-lg sm:text-3xl font-black text-gray-900">
              همکاری مستمر با نام‌آوران صنایع خودروسازی و لوازم خانگی
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-3xl mt-1.5 leading-relaxed font-light">
              کارنامه همکاری {companyName} با برترین شرکت‌ها و زنجیره‌های تامین معتبر کشور:
            </p>
          </div>

          {/* Continuous Moving Slider Track */}
          {partnerCompanies.length > 0 && (
            <div className="overflow-hidden relative py-2">
              <div 
                className="flex gap-3 sm:gap-4 w-max animate-marquee-continuous"
                style={{ animationDuration: '32s' }}
              >
                {[...partnerCompanies, ...partnerCompanies].map((company, idx) => (
                  <div 
                    key={`${company.id}-${idx}`}
                    className="w-[155px] sm:w-[210px] flex-shrink-0 bg-[#F8FAF9] hover:bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-gray-200 hover:border-[#0F612F] hover:shadow-lg transition-all text-right flex flex-col justify-between group select-none"
                  >
                    <div>
                      {/* Monogram / Logo Mark */}
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="text-[10px] sm:text-xs font-black en-num text-[#0F612F] bg-emerald-100/90 px-2 py-0.5 rounded-md font-mono">
                          {company.latinName}
                        </span>
                        <Building2 className="w-4 h-4 text-gray-400 group-hover:text-[#0F612F] transition-colors" />
                      </div>

                      {/* Company Persian Name */}
                      <h3 className="text-xs sm:text-base font-black text-gray-900 mb-1 group-hover:text-[#0F612F] transition-colors truncate">
                        {company.name}
                      </h3>
                      
                      {/* Sector */}
                      <span className="text-[10px] sm:text-xs text-gray-500 font-medium block mb-2 leading-tight truncate">
                        {company.sector}
                      </span>
                    </div>

                    {/* Cooperation Type */}
                    <div className="mt-2 pt-2 border-t border-gray-200/70">
                      <p className="text-[9px] sm:text-[11px] text-gray-600 leading-snug font-light line-clamp-2">
                        {company.cooperationType}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 6. Factory Tour & Contact CTA */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="bg-[#0c2214] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-10 border-2 border-[#DECA19] shadow-2xl text-right">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-2.5 sm:space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-[#DECA19]/15 text-[#DECA19] px-3 py-1 rounded-full text-xs font-bold border border-[#DECA19]/30">
                <MapPin className="w-4 h-4 text-[#DECA19]" />
                <span>{ctaSubtitle}</span>
              </div>
              
              <h3 className="text-lg sm:text-3xl font-black text-white leading-snug">
                {ctaTitle}
              </h3>
              
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light text-justify">
                {ctaDescription}
              </p>

              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-gray-300 space-y-1">
                <span className="text-[#DECA19] font-bold block">نشانی مستقیم کارخانه:</span>
                <p>{ctaAddress}</p>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-2.5 sm:gap-3.5">
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="w-full bg-[#DECA19] hover:bg-[#c9b715] text-gray-950 py-3 sm:py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm shadow-lg transition-all text-center cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                <CalendarCheck className="w-4 h-4 text-gray-950" />
                <span>هماهنگی جلسه و بازدید حضوری در کارخانه</span>
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a
                  href={`tel:${directPhoneTel}`}
                  className="bg-[#0F612F] hover:bg-[#0c4e26] text-white py-2.5 sm:py-3 px-3 rounded-xl font-bold text-xs border border-[#DECA19]/40 transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#DECA19]" />
                  <span>تلفن: <span className="en-num font-bold">{directPhoneDisplay}</span></span>
                </a>

                <a
                  href={`tel:${mobileSupportTel}`}
                  className="bg-white/10 hover:bg-white/20 text-white py-2.5 sm:py-3 px-3 rounded-xl font-bold text-xs border border-white/20 transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <Smartphone className="w-3.5 h-3.5 text-[#DECA19]" />
                  <span>همراه: <span className="en-num font-bold">{mobileSupportDisplay}</span></span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
