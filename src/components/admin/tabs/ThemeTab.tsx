import React from 'react';
import { useData } from '../../../context/DataContext';
import { Palette, Sparkles, RefreshCw, Check, Eye } from 'lucide-react';
import { ThemeSettings } from '../../../types';

export const ThemeTab: React.FC = () => {
  const { data, updateThemeSettings } = useData();
  const theme = data.themeSettings || {
    primaryColor: '#0F612F',
    primaryHoverColor: '#0c4e26',
    secondaryColor: '#DECA19',
    secondaryHoverColor: '#c4b214',
    accentColor: '#10b981',
    darkBgColor: '#0A3319',
    siteTitle: 'کارخانه رسا قطعه گستر مهر | طراحی و ساخت قالب، پرسکاری و تزریق پلاستیک',
    metaDescription: 'مجتمع صنعتی رسا قطعه گستر مهر با بیش از ۴۰ سال سابقه در طراحی و ساخت انواع قالب‌های صنعتی، پرسکاری تا ۴۰۰ تن و تزریق پلاستیک مهندسی'
  };

  const presetPalettes = [
    {
      name: 'سبز و طلایی سازمانی (پیش‌فرض)',
      primary: '#0F612F',
      primaryHover: '#0c4e26',
      secondary: '#DECA19',
      secondaryHover: '#c4b214',
      darkBg: '#0A3319',
      accent: '#10b981'
    },
    {
      name: 'سرمه‌ای و فیروزه‌ای صنعتی',
      primary: '#0B3C5D',
      primaryHover: '#082c44',
      secondary: '#328CC1',
      secondaryHover: '#2974a1',
      darkBg: '#061c2c',
      accent: '#00B4D8'
    },
    {
      name: 'نوک‌مدادی و نارنجی متالورژی',
      primary: '#2B2D42',
      primaryHover: '#1c1e2d',
      secondary: '#E85D04',
      secondaryHover: '#c44e03',
      darkBg: '#151622',
      accent: '#F48C06'
    },
    {
      name: 'سبز متالیک تیره و کهربایی',
      primary: '#145A32',
      primaryHover: '#0e3f23',
      secondary: '#F39C12',
      secondaryHover: '#d68910',
      darkBg: '#0B2912',
      accent: '#27AE60'
    }
  ];

  const applyPalette = (palette: typeof presetPalettes[0]) => {
    updateThemeSettings({
      primaryColor: palette.primary,
      primaryHoverColor: palette.primaryHover,
      secondaryColor: palette.secondary,
      secondaryHoverColor: palette.secondaryHover,
      darkBgColor: palette.darkBg,
      accentColor: palette.accent
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn text-right">
      
      {/* Header Info */}
      <div className="bg-emerald-50/80 p-5 rounded-2xl border border-[#0F612F]/20 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#0F612F] text-[#DECA19] flex items-center justify-center shrink-0 shadow-sm">
          <Palette className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-black text-gray-900 mb-1">
            شخصی‌سازی ظاهر، پالت رنگی و استایل‌های سراسری (CSS Variables)
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            تمامی رنگ‌های دکمه‌ها، هدرها، فوتر، نوارها و هاورها با تغییر مقادیر زیر به صورت آنی در کل وب‌سایت اعمال می‌گردند و در دیتابیس سرور ذخیره خواهند شد.
          </p>
        </div>
      </div>

      {/* Preset Palettes Quick Switch */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
        <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#DECA19]" />
          <span>پالت‌های رنگی آماده و بهینه‌شده صنعتی</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {presetPalettes.map((pal, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyPalette(pal)}
              className="p-3 rounded-xl border border-gray-200 hover:border-[#0F612F] hover:shadow-md transition-all text-right flex flex-col justify-between group cursor-pointer bg-gray-50/50"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-800">{pal.name}</span>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: pal.primary }} />
              </div>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="w-6 h-6 rounded-lg shadow-2xs border border-white" style={{ backgroundColor: pal.primary }} title="اصلی" />
                <span className="w-6 h-6 rounded-lg shadow-2xs border border-white" style={{ backgroundColor: pal.primaryHover }} title="هاور اصلی" />
                <span className="w-6 h-6 rounded-lg shadow-2xs border border-white" style={{ backgroundColor: pal.secondary }} title="مکمل / طلایی" />
                <span className="w-6 h-6 rounded-lg shadow-2xs border border-white" style={{ backgroundColor: pal.darkBg }} title="تیره" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Color Customizers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Primary Color */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-3">
          <label className="block text-xs font-black text-gray-900">
            رنگ سازمانی اصلی (Primary Color)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={theme.primaryColor || '#0F612F'}
              onChange={(e) => updateThemeSettings({ primaryColor: e.target.value })}
              className="w-12 h-12 rounded-xl border border-gray-300 cursor-pointer p-1"
            />
            <input
              type="text"
              dir="ltr"
              value={theme.primaryColor || '#0F612F'}
              onChange={(e) => updateThemeSettings({ primaryColor: e.target.value })}
              className="flex-1 px-3 py-2 text-xs font-mono font-bold bg-gray-50 border border-gray-300 rounded-xl"
            />
          </div>
          <p className="text-[11px] text-gray-500">استفاده در دکمه‌های اصلی، برچسب‌ها و نشانگرها</p>
        </div>

        {/* Primary Hover Color */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-3">
          <label className="block text-xs font-black text-gray-900">
            رنگ هاور دکمه‌های اصلی (Primary Hover)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={theme.primaryHoverColor || '#0c4e26'}
              onChange={(e) => updateThemeSettings({ primaryHoverColor: e.target.value })}
              className="w-12 h-12 rounded-xl border border-gray-300 cursor-pointer p-1"
            />
            <input
              type="text"
              dir="ltr"
              value={theme.primaryHoverColor || '#0c4e26'}
              onChange={(e) => updateThemeSettings({ primaryHoverColor: e.target.value })}
              className="flex-1 px-3 py-2 text-xs font-mono font-bold bg-gray-50 border border-gray-300 rounded-xl"
            />
          </div>
          <p className="text-[11px] text-gray-500">رنگ حالت لمس و موس روی دکمه‌ها</p>
        </div>

        {/* Secondary / Gold Color */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-3">
          <label className="block text-xs font-black text-gray-900">
            رنگ مکمل / خطوط تاکیدی (Secondary / Gold)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={theme.secondaryColor || '#DECA19'}
              onChange={(e) => updateThemeSettings({ secondaryColor: e.target.value })}
              className="w-12 h-12 rounded-xl border border-gray-300 cursor-pointer p-1"
            />
            <input
              type="text"
              dir="ltr"
              value={theme.secondaryColor || '#DECA19'}
              onChange={(e) => updateThemeSettings({ secondaryColor: e.target.value })}
              className="flex-1 px-3 py-2 text-xs font-mono font-bold bg-gray-50 border border-gray-300 rounded-xl"
            />
          </div>
          <p className="text-[11px] text-gray-500">استفاده در حاشیه‌ها، دکمه‌های استعلام و آیکون‌ها</p>
        </div>

        {/* Secondary Hover */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-3">
          <label className="block text-xs font-black text-gray-900">
            رنگ هاور مکمل (Secondary Hover)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={theme.secondaryHoverColor || '#c4b214'}
              onChange={(e) => updateThemeSettings({ secondaryHoverColor: e.target.value })}
              className="w-12 h-12 rounded-xl border border-gray-300 cursor-pointer p-1"
            />
            <input
              type="text"
              dir="ltr"
              value={theme.secondaryHoverColor || '#c4b214'}
              onChange={(e) => updateThemeSettings({ secondaryHoverColor: e.target.value })}
              className="flex-1 px-3 py-2 text-xs font-mono font-bold bg-gray-50 border border-gray-300 rounded-xl"
            />
          </div>
          <p className="text-[11px] text-gray-500">رنگ هاور دکمه طلایی تماس و استعلام</p>
        </div>

        {/* Dark Background */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-3">
          <label className="block text-xs font-black text-gray-900">
            رنگ پس‌زمینه تیره (Dark Sections BG)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={theme.darkBgColor || '#0A3319'}
              onChange={(e) => updateThemeSettings({ darkBgColor: e.target.value })}
              className="w-12 h-12 rounded-xl border border-gray-300 cursor-pointer p-1"
            />
            <input
              type="text"
              dir="ltr"
              value={theme.darkBgColor || '#0A3319'}
              onChange={(e) => updateThemeSettings({ darkBgColor: e.target.value })}
              className="flex-1 px-3 py-2 text-xs font-mono font-bold bg-gray-50 border border-gray-300 rounded-xl"
            />
          </div>
          <p className="text-[11px] text-gray-500">رنگ اسلایدر، فوتر و بنرهای تاریک کارخانه</p>
        </div>

        {/* Accent Color */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-3">
          <label className="block text-xs font-black text-gray-900">
            رنگ شاخص و تیک‌های تایید (Accent Color)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={theme.accentColor || '#10b981'}
              onChange={(e) => updateThemeSettings({ accentColor: e.target.value })}
              className="w-12 h-12 rounded-xl border border-gray-300 cursor-pointer p-1"
            />
            <input
              type="text"
              dir="ltr"
              value={theme.accentColor || '#10b981'}
              onChange={(e) => updateThemeSettings({ accentColor: e.target.value })}
              className="flex-1 px-3 py-2 text-xs font-mono font-bold bg-gray-50 border border-gray-300 rounded-xl"
            />
          </div>
          <p className="text-[11px] text-gray-500">برای پیام‌های موفقیت، نشان‌های استاندارد و وضعیت‌ها</p>
        </div>

      </div>

      {/* SEO & Site Identity Fields */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
        <h4 className="text-sm font-bold text-gray-900">عنوان و اطلاعات هویت وب‌سایت</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              عنوان تب مرورگر و صفحه اصلی (Site Title)
            </label>
            <input
              type="text"
              value={theme.siteTitle || ''}
              onChange={(e) => updateThemeSettings({ siteTitle: e.target.value })}
              className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-300 rounded-xl font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              توضیحات متای سئو و موتورهای جستجو (Meta Description)
            </label>
            <textarea
              rows={2}
              value={theme.metaDescription || ''}
              onChange={(e) => updateThemeSettings({ metaDescription: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* Live Preview Box */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-950 p-6 rounded-2xl text-white border border-gray-800 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#DECA19]" />
            <span>پیش‌نمایش زنده المان‌ها با تم انتخاب شده</span>
          </h4>
          <span className="text-[11px] text-gray-400">Live Preview</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Sample Button 1 */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-center">
            <span className="text-xs text-gray-400 block mb-2">دکمه سازمانی اصلی</span>
            <button
              type="button"
              style={{ backgroundColor: theme.primaryColor || '#0F612F' }}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>مشاهده خطوط تولید</span>
            </button>
          </div>

          {/* Sample Button 2 */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-center">
            <span className="text-xs text-gray-400 block mb-2">دکمه استعلام و اقدام فوری</span>
            <button
              type="button"
              style={{ backgroundColor: theme.secondaryColor || '#DECA19' }}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-black text-gray-950 shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>استعلام قیمت و مشاوره</span>
            </button>
          </div>

          {/* Sample Badge */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-center">
            <span className="text-xs text-gray-400 block mb-2">برچسب و نشان کیفیت</span>
            <div
              style={{ borderColor: theme.secondaryColor || '#DECA19', color: theme.secondaryColor || '#DECA19' }}
              className="w-full py-2 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 bg-white/5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>استاندارد کنترل کیفیت ۱۰۰٪</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
