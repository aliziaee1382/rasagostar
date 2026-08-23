import React from 'react';
import { useData } from '../../../context/DataContext';
import { Building2, Phone, Mail, MapPin, Clock, MessageCircle, Shield } from 'lucide-react';
import { RubikaIcon } from '../../RubikaIcon';

export const GeneralInfoTab: React.FC = () => {
  const { data, updateCompanyInfo } = useData();
  const info = data.companyInfo;

  return (
    <div className="space-y-6 animate-fadeIn text-right">
      
      {/* Header Info */}
      <div className="bg-emerald-50/80 p-5 rounded-2xl border border-[#0F612F]/20 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#0F612F] text-[#DECA19] flex items-center justify-center shrink-0 shadow-sm">
          <Building2 className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-black text-gray-900 mb-1">
            اطلاعات پایه کارخانه، راه‌های ارتباطی و شبکه‌های اجتماعی
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            تغییر نام رسمی، شماره‌های تماس مستقیم، شماره پشتیبانی شبکه‌های اجتماعی (روبیکا، بله، واتساپ) و آدرس کارخانه.
          </p>
        </div>
      </div>

      {/* Main Company Identity */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
        <h4 className="text-sm font-black text-gray-900 pb-2 border-b border-gray-100 flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#0F612F]" />
          <span>مشخصات هویتی و ثبتی شرکت</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">نام رسمی شرکت (فارسی)</label>
            <input
              type="text"
              value={info.name}
              onChange={(e) => updateCompanyInfo({ name: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">نام لاتین / برند تجاری</label>
            <input
              type="text"
              dir="ltr"
              value={info.nameEn}
              onChange={(e) => updateCompanyInfo({ nameEn: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">سابقه کاری (مثلاً: بیش از ۴۰ سال)</label>
            <input
              type="text"
              value={info.experienceYears}
              onChange={(e) => updateCompanyInfo({ experienceYears: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">حداکثر ظرفیت پرسکاری (مثلاً: ۴۰۰ تن)</label>
            <input
              type="text"
              value={info.maxPressCapacity}
              onChange={(e) => updateCompanyInfo({ maxPressCapacity: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl font-bold text-[#0F612F]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">مساحت و زیربنای کارخانه</label>
            <input
              type="text"
              value={info.factoryArea}
              onChange={(e) => updateCompanyInfo({ factoryArea: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">شماره ثبت / شناسه ملی</label>
            <input
              type="text"
              value={info.registrationNo}
              onChange={(e) => updateCompanyInfo({ registrationNo: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl font-mono"
            />
          </div>
        </div>
      </div>

      {/* Contact & Support Numbers */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
        <h4 className="text-sm font-black text-gray-900 pb-2 border-b border-gray-100 flex items-center gap-2">
          <Phone className="w-4 h-4 text-[#0F612F]" />
          <span>تلفن‌ها، راه‌های ارتباطی و پیام‌رسان‌ها</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">تلفن ثابت کارخانه</label>
            <input
              type="text"
              dir="ltr"
              value={info.phone}
              onChange={(e) => updateCompanyInfo({ phone: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">تلفن فروش مستقیم</label>
            <input
              type="text"
              dir="ltr"
              value={info.phoneDirect}
              onChange={(e) => updateCompanyInfo({ phoneDirect: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              موبایل پشتیبانی و پیام‌رسان‌ها (روبیکا، بله، واتساپ)
            </label>
            <input
              type="text"
              dir="ltr"
              value={info.mobileSupport}
              onChange={(e) => updateCompanyInfo({ mobileSupport: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl font-mono font-bold text-[#0F612F]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">ایمیل سازمانی</label>
            <input
              type="text"
              dir="ltr"
              value={info.email}
              onChange={(e) => updateCompanyInfo({ email: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl font-mono"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-700 mb-1">ساعات کاری رسمی</label>
            <input
              type="text"
              value={info.workingHours}
              onChange={(e) => updateCompanyInfo({ workingHours: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-xs font-bold text-gray-700 mb-1">نشانی دقیق کارخانه</label>
            <input
              type="text"
              value={info.address}
              onChange={(e) => updateCompanyInfo({ address: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl"
            />
          </div>
        </div>
      </div>

    </div>
  );
};
