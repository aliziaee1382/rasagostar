import React, { useState } from 'react';
import { useData } from '../../../context/DataContext';
import { FileText, Home, Info, Wrench, PhoneCall, Sparkles } from 'lucide-react';

export const PagesContentTab: React.FC = () => {
  const { data, updatePagesContent } = useData();
  const [selectedSubTab, setSelectedSubTab] = useState<'home' | 'about' | 'services' | 'contact'>('about');

  const pages = data.pagesContent || {
    home: {
      heroBadge: 'واحد تخصصی قالب‌سازی و پرسکاری صنعتی',
      statsTitle: 'آمار و دستاوردهای کارخانه رسا قطعه گستر مهر',
      partnersTitle: 'مشتریان و شرکای تجاری ما',
      partnersSubtitle: 'تولید قطعات و مجموعه‌های دقیق برای صنایع پیشرو در خودروسازی، لوازم خانگی و صنایع برودتی',
      servicesTitle: 'خطوط تولید و توانمندی‌های اجرایی کارخانه',
      servicesSubtitle: 'ارائه کلیه خدمات صنعتی مطابق با استاندارد، نقشه‌های فنی مهندسی و نمونه‌های ارائه‌شده',
      ctaTitle: 'آماده شروع همکاری در طراحی قالب یا تولید قطعه هستید؟',
      ctaDescription: 'کارشناسان فنی ما آماده بررسی نقشه‌ها، فایل‌های سه‌بعدی و ارائه مشاوره تخصصی می‌باشند.'
    },
    about: {
      headline: 'مجتمع صنعتی رسا قطعه گستر مهر؛ بیش از ۴ دهه پیشگامی در صنعت قالب و قطعه‌سازی',
      subheadline: 'زنجیره یکپارچه از طراحی مهندسی CAD/CAM تا ساخت انواع قالب‌های صنعتی و تولید انبوه قطعات پرسی و تزریق پلاستیک',
      historyTitle: 'داستان شکل‌گیری و تاریخچه کارخانه',
      historyParagraph1: 'کارخانه رسا قطعه گستر مهر با تکیه بر تجربه ارزشمند و مستمر از سال ۱۳۷۶، فعالیت خود را با هدف خودکفایی صنایع کشور در زمینه ساخت قالب‌های دقیق سنبه-ماتریس و پروگرسیو آغاز نمود.',
      historyParagraph2: 'امروزه با تجمیع سالن‌های تخصصی قالب‌سازی، پرسکاری سنگین تا ۴۰۰ تن، برش فایبر لیزر و تزریق پلاستیک مهندسی تحت یک مدیریت متمرکز، کلیه دغدغه‌های کارفرمایان در انطباق قطعه با قالب برطرف شده است.',
      missionTitle: 'ماموریت و چشم‌انداز ما',
      missionDescription: 'تعهد ما تضمین ۱۰۰ درصدی دقت ابعادی، کاهش بهای تمام‌شده تولید با مهندسی چیدمان متریال، و تسریع فرآیند ساخت نمونه تا تحویل تیراژ انبوه به صنایع کشور می‌باشد.'
    },
    services: {
      pageTitle: 'خدمات تخصصی و خطوط تولید کارخانه',
      pageSubtitle: '۴ دپارتمان صنعتی پیشرفته مجهز به ماشین‌آلات مدرن و کادر مهندسی باتجربه',
      complementaryTitle: 'تجهیزات و خدمات پشتیبان کارخانه',
      complementarySubtitle: 'مجموعه ماشین‌آلات ابزارسازی، اسپارک، سنگ‌زنی مغناطیسی و دریل رادیال'
    },
    contact: {
      pageTitle: 'ارتباط مستقیم با مدیریت، فروش و مهندسی',
      pageSubtitle: 'جهت استعلام قیمت، ارسال نقشه و مشاوره تخصصی در ساخت قالب و قطعه',
      formTitle: 'ارسال پیام و استعلام آنلاین',
      formSubtitle: 'نقشه‌ها و فایل‌های سه‌بعدی خود (DWG, DXF, STP, PDF) را از طریق فرم زیر ارسال فرمایید.'
    }
  };

  const updateSubPage = (pageKey: 'home' | 'about' | 'services' | 'contact', field: string, value: string) => {
    updatePagesContent({
      [pageKey]: {
        ...(pages[pageKey] as any),
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn text-right">
      
      {/* Header */}
      <div className="bg-emerald-50/80 p-5 rounded-2xl border border-[#0F612F]/20 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#0F612F] text-[#DECA19] flex items-center justify-center shrink-0 shadow-sm">
          <FileText className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-black text-gray-900 mb-1">
            مدیریت متون، تیترها و محتوای صفحات وب‌سایت
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            کلیه عنوان‌ها، پاراگراف‌های معرفی، متن تاریخچه، ماموریت و شعارهای بخش‌های مختلف را ویرایش کنید.
          </p>
        </div>
      </div>

      {/* Sub tabs navigation */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setSelectedSubTab('about')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
            selectedSubTab === 'about'
              ? 'bg-[#0F612F] text-white border-[#0F612F] shadow-sm'
              : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
          }`}
        >
          <Info className="w-4 h-4 text-[#DECA19]" />
          <span>صفحه درباره ما (About Us)</span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedSubTab('home')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
            selectedSubTab === 'home'
              ? 'bg-[#0F612F] text-white border-[#0F612F] shadow-sm'
              : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
          }`}
        >
          <Home className="w-4 h-4 text-[#DECA19]" />
          <span>صفحه اصلی (Home Content)</span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedSubTab('services')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
            selectedSubTab === 'services'
              ? 'bg-[#0F612F] text-white border-[#0F612F] shadow-sm'
              : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
          }`}
        >
          <Wrench className="w-4 h-4 text-[#DECA19]" />
          <span>صفحه خدمات و خطوط تولید</span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedSubTab('contact')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
            selectedSubTab === 'contact'
              ? 'bg-[#0F612F] text-white border-[#0F612F] shadow-sm'
              : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
          }`}
        >
          <PhoneCall className="w-4 h-4 text-[#DECA19]" />
          <span>صفحه تماس با ما</span>
        </button>
      </div>

      {/* Sub Tab: About Us */}
      {selectedSubTab === 'about' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
          <h4 className="text-sm font-black text-gray-900 pb-2 border-b border-gray-100">
            محتوا و بیوگرافی صفحه «درباره ما»
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                تیتر اصلی معرفی (H1 Headline)
              </label>
              <input
                type="text"
                value={pages.about?.headline || ''}
                onChange={(e) => updateSubPage('about', 'headline', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl font-bold text-[#0F612F]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                زیرتیتر توضیحی هدر
              </label>
              <input
                type="text"
                value={pages.about?.subheadline || ''}
                onChange={(e) => updateSubPage('about', 'subheadline', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              پاراگراف اول معرفی و تاریخچه کارخانه
            </label>
            <textarea
              rows={3}
              value={pages.about?.historyParagraph1 || pages.about?.historyText || ''}
              onChange={(e) => {
                updateSubPage('about', 'historyParagraph1', e.target.value);
                updateSubPage('about', 'historyText', e.target.value);
              }}
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              پاراگراف دوم معرفی، چشم‌انداز و ماموریت
            </label>
            <textarea
              rows={3}
              value={pages.about?.historyParagraph2 || pages.about?.missionDescription || pages.about?.missionText || ''}
              onChange={(e) => {
                updateSubPage('about', 'historyParagraph2', e.target.value);
                updateSubPage('about', 'missionDescription', e.target.value);
              }}
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl leading-relaxed"
            />
          </div>

          {/* Ethics & Core Values */}
          <div className="pt-4 border-t border-gray-200/80 space-y-3">
            <h5 className="text-xs font-black text-gray-900 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#DECA19]" />
              <span>منشور اخلاقی و ارکان تعهد سازمانی (۳ ستون)</span>
            </h5>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">بج بالای سکشن منشور اخلاقی</label>
                <input
                  type="text"
                  value={pages.about?.ethicsTitle || 'منشور اخلاقی و تعهدات بنیادین'}
                  onChange={(e) => updateSubPage('about', 'ethicsTitle', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">تیتر اصلی سکشن تعهدات</label>
                <input
                  type="text"
                  value={pages.about?.ethicsSubtitle || 'سه رکن اساسی تعهد سازمانی در رسا قطعه گستر مهر'}
                  onChange={(e) => updateSubPage('about', 'ethicsSubtitle', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Quality Policy & Certifications */}
          <div className="pt-4 border-t border-gray-200/80 space-y-3">
            <h5 className="text-xs font-black text-gray-900 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#DECA19]" />
              <span>خط‌مشی کنترل کیفیت و استانداردهای بازرسی</span>
            </h5>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">تیتر خط‌مشی کیفیت</label>
                <input
                  type="text"
                  value={pages.about?.qualityPolicyTitle || 'پایش مستمر، تجهیزات کالیبره و تضمین صفر درصد عدم‌انطباق'}
                  onChange={(e) => updateSubPage('about', 'qualityPolicyTitle', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">بج سیستم کنترل کیفیت</label>
                <input
                  type="text"
                  value={pages.about?.qualityPolicySubtitle || 'سیستم مدیریت کیفیت (Quality Control)'}
                  onChange={(e) => updateSubPage('about', 'qualityPolicySubtitle', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">توضیحات فرآیند بازرسی و کنترل کیفیت</label>
              <textarea
                rows={3}
                value={pages.about?.qualityPolicyText || pages.about?.qualityText || ''}
                onChange={(e) => {
                  updateSubPage('about', 'qualityPolicyText', e.target.value);
                  updateSubPage('about', 'qualityText', e.target.value);
                }}
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl leading-relaxed"
              />
            </div>
          </div>

          {/* CTA Box */}
          <div className="pt-4 border-t border-gray-200/80 space-y-3">
            <h5 className="text-xs font-black text-gray-900 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#DECA19]" />
              <span>باکس دعوت به بازدید حضوری از کارخانه (CTA انتهای صفحه)</span>
            </h5>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">تیتر باکس دعوت</label>
                <input
                  type="text"
                  value={pages.about?.ctaTitle || 'میزبان مدیران محترم فنی، زنجیره تامین و کارفرمایان صنعتی هستیم'}
                  onChange={(e) => updateSubPage('about', 'ctaTitle', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">بج هدر باکس دعوت</label>
                <input
                  type="text"
                  value={pages.about?.ctaSubtitle || 'دعوت به بازدید حضوری از کارخانه'}
                  onChange={(e) => updateSubPage('about', 'ctaSubtitle', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">متن توضیحات دعوت به بازدید</label>
              <textarea
                rows={2}
                value={pages.about?.ctaDescription || ''}
                onChange={(e) => updateSubPage('about', 'ctaDescription', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl leading-relaxed"
              />
            </div>
          </div>
        </div>
      )}

      {/* Sub Tab: Home */}
      {selectedSubTab === 'home' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
          <h4 className="text-sm font-black text-gray-900 pb-2 border-b border-gray-100">
            تیترها و بخش‌های صفحه اصلی
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                عنوان بخش مشتریان و شرکا
              </label>
              <input
                type="text"
                value={pages.home.partnersTitle}
                onChange={(e) => updateSubPage('home', 'partnersTitle', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                عنوان بخش خدمات ۴گانه
              </label>
              <input
                type="text"
                value={pages.home.servicesTitle}
                onChange={(e) => updateSubPage('home', 'servicesTitle', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl font-bold"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1">
                عنوان بنر فراخوان نهایی (CTA Banner)
              </label>
              <input
                type="text"
                value={pages.home.ctaTitle}
                onChange={(e) => updateSubPage('home', 'ctaTitle', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl font-bold text-[#0F612F]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1">
                توضیحات بنر فراخوان نهایی
              </label>
              <textarea
                rows={2}
                value={pages.home.ctaDescription}
                onChange={(e) => updateSubPage('home', 'ctaDescription', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl leading-relaxed"
              />
            </div>
          </div>
        </div>
      )}

      {/* Sub Tab: Services */}
      {selectedSubTab === 'services' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
          <h4 className="text-sm font-black text-gray-900 pb-2 border-b border-gray-100">
            تیترهای صفحه خدمات و تجهیزات
          </h4>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              عنوان صفحه خدمات
            </label>
            <input
              type="text"
              value={pages.services.pageTitle}
              onChange={(e) => updateSubPage('services', 'pageTitle', e.target.value)}
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              زیرتیتر توضیحی صفحه خدمات
            </label>
            <input
              type="text"
              value={pages.services.pageSubtitle}
              onChange={(e) => updateSubPage('services', 'pageSubtitle', e.target.value)}
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              عنوان بخش تجهیزات و خدمات پشتیبان
            </label>
            <input
              type="text"
              value={pages.services.complementaryTitle}
              onChange={(e) => updateSubPage('services', 'complementaryTitle', e.target.value)}
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl font-bold"
            />
          </div>
        </div>
      )}

      {/* Sub Tab: Contact */}
      {selectedSubTab === 'contact' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
          <h4 className="text-sm font-black text-gray-900 pb-2 border-b border-gray-100">
            تیترها و متون صفحه «تماس با ما»
          </h4>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              عنوان اصلی صفحه تماس
            </label>
            <input
              type="text"
              value={pages.contact.pageTitle}
              onChange={(e) => updateSubPage('contact', 'pageTitle', e.target.value)}
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              زیرتیتر صفحه تماس
            </label>
            <input
              type="text"
              value={pages.contact.pageSubtitle}
              onChange={(e) => updateSubPage('contact', 'pageSubtitle', e.target.value)}
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              عنوان فرم ثبت استعلام و ارسال نقشه
            </label>
            <input
              type="text"
              value={pages.contact.formTitle}
              onChange={(e) => updateSubPage('contact', 'formTitle', e.target.value)}
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl font-bold text-[#0F612F]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              راهنما و متن توضیحی زیر فرم
            </label>
            <textarea
              rows={2}
              value={pages.contact.formSubtitle}
              onChange={(e) => updateSubPage('contact', 'formSubtitle', e.target.value)}
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl leading-relaxed"
            />
          </div>

          {/* Quick Notice for Messengers tab */}
          <div className="p-4 bg-emerald-50/80 rounded-xl border border-emerald-200/60 flex items-center justify-between gap-3 mt-4">
            <div className="text-right">
              <span className="text-xs font-bold text-gray-900 block">مدیریت کارت پیام‌رسان‌ها و چت آنلاین</span>
              <span className="text-[11px] text-gray-600 font-light">جهت تغییر عناوین، شماره‌ها، تگ‌ها و لینک پیام‌رسان‌ها به تب اختصاصی «پیام‌رسان‌ها و درگاه‌های چت» در منوی کناری مراجعه فرمایید.</span>
            </div>
            <span className="px-2.5 py-1 bg-[#0F612F] text-[#DECA19] text-[10px] font-bold rounded-lg shrink-0">
              تب پیام‌رسان‌ها
            </span>
          </div>
        </div>
      )}

    </div>
  );
};
