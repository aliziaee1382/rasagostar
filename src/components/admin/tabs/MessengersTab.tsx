import React, { useState } from 'react';
import { useData } from '../../../context/DataContext';
import { OnlineMessengerItem } from '../../../types';
import { MessengerIconRenderer } from '../../MessengerIconRenderer';
import { 
  Share2, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Eye, 
  CheckCircle2, 
  Copy, 
  Sparkles,
  Phone,
  Link,
  Tag,
  FileText,
  Layers,
  ArrowUpDown
} from 'lucide-react';

export const MessengersTab: React.FC = () => {
  const { 
    data, 
    updateMessengersConfig, 
    updateOnlineMessengers, 
    updateSingleOnlineMessenger, 
    addOnlineMessenger, 
    deleteOnlineMessenger 
  } = useData();

  const config = data.messengersConfig || {
    badge: 'پیام‌رسان‌ها و ارتباط مستقیم',
    title: 'استعلام سریع، مشاوره فنی و ارسال فایل',
    description: 'جهت گفتگوی آنلاین و تبادل نقشه، از طریق درگاه‌های پیام‌رسان زیر با شماره متصل اقدام فرمایید:',
    connectedPhone: '09103176904',
  };

  const messengers = data.onlineMessengers || [];

  const [copiedPreview, setCopiedPreview] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddPreset = (preset: 'eitaa' | 'telegram' | 'whatsapp' | 'rubika' | 'bale' | 'instagram' | 'custom') => {
    let newItem: OnlineMessengerItem;
    const phone = config.connectedPhone || '09103176904';

    switch (preset) {
      case 'eitaa':
        newItem = {
          id: 'eitaa_' + Date.now(),
          name: 'ایتا (Eitaa)',
          tag: 'پیام‌رسان ایرانی',
          description: 'مشاوره و ارسال نقشه‌های فنی',
          phone: phone,
          link: `https://eitaa.com/rasaqateh`,
          icon: 'eitaa',
          isActive: true,
          order: messengers.length + 1,
        };
        break;
      case 'telegram':
        newItem = {
          id: 'telegram_' + Date.now(),
          name: 'تلگرام (Telegram)',
          tag: 'ارسال فایل حجیم',
          description: 'تبادل نقشه‌ها و فایل‌های سنگین مهندسی',
          phone: phone,
          link: `https://t.me/rasaqateh`,
          icon: 'telegram',
          isActive: true,
          order: messengers.length + 1,
        };
        break;
      case 'whatsapp':
        newItem = {
          id: 'whatsapp_' + Date.now(),
          name: 'واتساپ (WhatsApp)',
          tag: 'چت آنلاین',
          description: 'ارسال سریع فایل و چت آنلاین',
          phone: phone,
          link: `https://wa.me/98${phone.replace(/^0/, '')}?text=${encodeURIComponent('سلام، جهت استعلام قیمت و خدمات صنعتی پیام می‌دهم.')}`,
          icon: 'whatsapp',
          isActive: true,
          order: messengers.length + 1,
        };
        break;
      case 'rubika':
        newItem = {
          id: 'rubika_' + Date.now(),
          name: 'روبیکا (Rubika)',
          tag: 'پیام‌رسان',
          description: 'ارسال پیام و تصویر قطعه',
          phone: phone,
          link: 'https://rubika.ir/',
          icon: 'rubika',
          isActive: true,
          order: messengers.length + 1,
        };
        break;
      case 'bale':
        newItem = {
          id: 'bale_' + Date.now(),
          name: 'بله (Bale)',
          tag: 'سازمانی',
          description: 'تبادل مدارک و استعلام فنی',
          phone: phone,
          link: 'https://ble.ir/',
          icon: 'bale',
          isActive: true,
          order: messengers.length + 1,
        };
        break;
      case 'instagram':
        newItem = {
          id: 'instagram_' + Date.now(),
          name: 'اینستاگرام (Instagram)',
          tag: 'ویدیو',
          description: 'مشاهده ویدیوهای خطوط تولید',
          phone: phone,
          link: 'https://instagram.com/',
          icon: 'instagram',
          isActive: true,
          order: messengers.length + 1,
        };
        break;
      default:
        newItem = {
          id: 'custom_' + Date.now(),
          name: 'پیام‌رسان جدید',
          tag: 'پشتیبانی آنلاین',
          description: 'ارسال پیام و استعلام مستقیم',
          phone: phone,
          link: 'https://',
          icon: 'link',
          isActive: true,
          order: messengers.length + 1,
        };
        break;
    }

    addOnlineMessenger(newItem);
    setEditingId(newItem.id);
  };

  const handleUpdateItem = (item: OnlineMessengerItem, field: keyof OnlineMessengerItem, value: any) => {
    updateSingleOnlineMessenger({
      ...item,
      [field]: value,
    });
  };

  const handleDeleteItem = (id: string, name: string) => {
    if (window.confirm(`آیا از حذف پیام‌رسان «${name}» اطمینان دارید؟`)) {
      deleteOnlineMessenger(id);
      if (editingId === id) setEditingId(null);
    }
  };

  const activeMessengersForPreview = messengers.filter(m => m.isActive !== false);

  return (
    <div className="space-y-6 animate-fadeIn text-right">
      
      {/* Header Banner */}
      <div className="bg-emerald-50/80 p-5 rounded-2xl border border-[#0F612F]/20 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#0F612F] text-[#DECA19] flex items-center justify-center shrink-0 shadow-sm">
          <Share2 className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-black text-gray-900 mb-1">
            مدیریت درگاه‌های پیام‌رسان، چت آنلاین و شبکه‌های ارتباطی
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            امکان ویرایش نام، تگ‌های موضوعی (مثل: چت آنلاین، پیام‌رسان سازمانی، ویدیو)، متن توضیحات، شماره تماس اختصاصی و لینک دکمه‌های ارتباطی صفحه تماس با ما.
          </p>
        </div>
      </div>

      {/* 1. Header & General Section Settings */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#0F612F]" />
            <h4 className="text-sm font-black text-gray-900">تنظیمات سربرگ کادر پیام‌رسان‌ها</h4>
          </div>
          <span className="text-[10px] text-gray-400 font-mono">Section Header Controls</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              عنوان برچسب بالایی (Badge)
            </label>
            <input
              type="text"
              value={config.badge}
              onChange={(e) => updateMessengersConfig({ badge: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl font-bold text-[#0F612F]"
              placeholder="مثال: پیام‌رسان‌ها و ارتباط مستقیم"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              شماره متصل اصلی (نمایش داده شده در گوشه هدر)
            </label>
            <input
              type="text"
              dir="ltr"
              value={config.connectedPhone}
              onChange={(e) => updateMessengersConfig({ connectedPhone: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl font-mono font-bold text-gray-900"
              placeholder="09103176904"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-700 mb-1">
              تیتر اصلی کادر (Title)
            </label>
            <input
              type="text"
              value={config.title}
              onChange={(e) => updateMessengersConfig({ title: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl font-black text-gray-900"
              placeholder="مثال: استعلام سریع، مشاوره فنی و ارسال فایل"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-700 mb-1">
              متن توضیحات زیر تیتر (Description)
            </label>
            <textarea
              rows={2}
              value={config.description}
              onChange={(e) => updateMessengersConfig({ description: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl leading-relaxed"
              placeholder="جهت گفتگوی آنلاین و تبادل نقشه، از طریق درگاه‌های پیام‌رسان زیر اقدام فرمایید:"
            />
          </div>
        </div>
      </div>

      {/* 2. Messengers Management List */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
          <div>
            <h4 className="text-sm font-black text-gray-900 flex items-center gap-2">
              <Share2 className="w-4 h-4 text-[#0F612F]" />
              <span>لیست پیام‌رسان‌ها و درگاه‌های چت فعال</span>
            </h4>
            <p className="text-[11px] text-gray-500 mt-0.5 font-light">
              روی هر ردیف کلیک کنید تا جزئیات و لینک‌های آن را تغییر دهید.
            </p>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex items-center flex-wrap gap-1.5">
            <span className="text-[10px] text-gray-400 font-bold ml-1">افزودن سریع:</span>
            <button
              type="button"
              onClick={() => handleAddPreset('whatsapp')}
              className="px-2.5 py-1 text-[10px] font-bold bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] rounded-lg border border-[#25D366]/30 transition-all cursor-pointer"
            >
              + واتساپ
            </button>
            <button
              type="button"
              onClick={() => handleAddPreset('rubika')}
              className="px-2.5 py-1 text-[10px] font-bold bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg border border-purple-200 transition-all cursor-pointer"
            >
              + روبیکا
            </button>
            <button
              type="button"
              onClick={() => handleAddPreset('bale')}
              className="px-2.5 py-1 text-[10px] font-bold bg-[#00A884]/10 hover:bg-[#00A884]/20 text-[#00A884] rounded-lg border border-[#00A884]/30 transition-all cursor-pointer"
            >
              + بله
            </button>
            <button
              type="button"
              onClick={() => handleAddPreset('instagram')}
              className="px-2.5 py-1 text-[10px] font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg border border-rose-200 transition-all cursor-pointer"
            >
              + اینستاگرام
            </button>
            <button
              type="button"
              onClick={() => handleAddPreset('eitaa')}
              className="px-2.5 py-1 text-[10px] font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg border border-amber-300 transition-all cursor-pointer"
            >
              + ایتا
            </button>
            <button
              type="button"
              onClick={() => handleAddPreset('telegram')}
              className="px-2.5 py-1 text-[10px] font-bold bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-lg border border-sky-200 transition-all cursor-pointer"
            >
              + تلگرام
            </button>
            <button
              type="button"
              onClick={() => handleAddPreset('custom')}
              className="px-2.5 py-1 text-[10px] font-bold bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg border border-gray-300 transition-all cursor-pointer"
            >
              + دلخواه
            </button>
          </div>
        </div>

        {/* List of Messenger Items */}
        <div className="space-y-3">
          {messengers.length === 0 ? (
            <div className="p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300">
              <p className="text-xs text-gray-500 mb-3">هیچ پیام‌رسانی ثبت نشده است.</p>
              <button
                type="button"
                onClick={() => handleAddPreset('whatsapp')}
                className="px-4 py-2 bg-[#0F612F] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#0c4e26]"
              >
                افزودن پیام‌رسان پیش‌فرض
              </button>
            </div>
          ) : (
            messengers.map((item, idx) => {
              const isEditing = editingId === item.id;
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    item.isActive !== false ? 'border-gray-200 bg-white' : 'border-gray-200/60 bg-gray-50/70 opacity-75'
                  }`}
                >
                  {/* Summary Bar */}
                  <div className="p-3 sm:p-4 flex items-center justify-between gap-3">
                    <div 
                      onClick={() => setEditingId(isEditing ? null : item.id)}
                      className="flex items-center gap-3 cursor-pointer min-w-0 flex-1"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 p-1.5">
                        <MessengerIconRenderer iconType={item.icon} className="w-6 h-6" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs sm:text-sm font-black text-gray-900 truncate">{item.name}</span>
                          <span className="text-[10px] bg-emerald-50 text-[#0F612F] border border-[#0F612F]/20 px-2 py-0.5 rounded-full font-bold">
                            {item.tag || 'بدون برچسب'}
                          </span>
                          {item.isActive === false && (
                            <span className="text-[9px] bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded font-bold">
                              غیرفعال
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-500 truncate mt-0.5 font-light">
                          {item.description} • <span className="font-mono font-bold text-gray-700 en-num">{item.phone}</span>
                        </p>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                      {/* Active toggle */}
                      <button
                        type="button"
                        onClick={() => handleUpdateItem(item, 'isActive', item.isActive === false ? true : false)}
                        title={item.isActive !== false ? 'غیرفعال‌سازی نمایش' : 'فعال‌سازی نمایش'}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                          item.isActive !== false
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                            : 'bg-gray-100 text-gray-500 border-gray-300 hover:bg-gray-200'
                        }`}
                      >
                        {item.isActive !== false ? 'فعال' : 'خاموش'}
                      </button>

                      {/* Edit toggle */}
                      <button
                        type="button"
                        onClick={() => setEditingId(isEditing ? null : item.id)}
                        className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-[10px] font-bold transition-colors cursor-pointer"
                      >
                        {isEditing ? 'بستن فرم' : 'ویرایش'}
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(item.id, item.name)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="حذف پیام‌رسان"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Edit Form */}
                  {isEditing && (
                    <div className="p-4 sm:p-5 bg-[#F9FBFA] border-t border-gray-200 space-y-4 animate-fadeIn">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                        
                        {/* 1. Messenger Name */}
                        <div>
                          <label className="block text-[11px] font-bold text-gray-700 mb-1 flex items-center gap-1">
                            <span>نام پیام‌رسان</span>
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleUpdateItem(item, 'name', e.target.value)}
                            className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-xl font-bold"
                            placeholder="مثال: واتساپ"
                          />
                        </div>

                        {/* 2. Tag / Topic */}
                        <div>
                          <label className="block text-[11px] font-bold text-gray-700 mb-1 flex items-center gap-1">
                            <Tag className="w-3 h-3 text-[#0F612F]" />
                            <span>موضوع / برچسب کارت</span>
                          </label>
                          <input
                            type="text"
                            value={item.tag}
                            onChange={(e) => handleUpdateItem(item, 'tag', e.target.value)}
                            className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-xl font-bold text-[#0F612F]"
                            placeholder="مثال: چت آنلاین، پیام‌رسان سازمانی، ویدیو..."
                          />
                        </div>

                        {/* 3. Icon Selection */}
                        <div>
                          <label className="block text-[11px] font-bold text-gray-700 mb-1">
                            لوگو و نوع آیکون
                          </label>
                          <select
                            value={item.icon || 'whatsapp'}
                            onChange={(e) => handleUpdateItem(item, 'icon', e.target.value)}
                            className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-xl font-bold"
                          >
                            <option value="whatsapp">واتساپ (WhatsApp)</option>
                            <option value="rubika">روبیکا (Rubika)</option>
                            <option value="bale">بله (Bale)</option>
                            <option value="instagram">اینستاگرام (Instagram)</option>
                            <option value="eitaa">ایتا (Eitaa)</option>
                            <option value="telegram">تلگرام (Telegram)</option>
                            <option value="phone">تلفن مستقیم (Phone)</option>
                            <option value="link">پیوند و لینک وب (Link)</option>
                          </select>
                        </div>

                        {/* 4. Phone Number */}
                        <div>
                          <label className="block text-[11px] font-bold text-gray-700 mb-1 flex items-center gap-1">
                            <Phone className="w-3 h-3 text-[#0F612F]" />
                            <span>شماره تماس نمایش داده شده زیر توضیحات</span>
                          </label>
                          <input
                            type="text"
                            dir="ltr"
                            value={item.phone}
                            onChange={(e) => handleUpdateItem(item, 'phone', e.target.value)}
                            className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-xl font-mono font-bold"
                            placeholder="09103176904"
                          />
                        </div>

                        {/* 5. Description Text */}
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-bold text-gray-700 mb-1 flex items-center gap-1">
                            <FileText className="w-3 h-3 text-[#0F612F]" />
                            <span>متن توضیحات کارت</span>
                          </label>
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => handleUpdateItem(item, 'description', e.target.value)}
                            className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-xl"
                            placeholder="مثال: ارسال سریع فایل و چت آنلاین"
                          />
                        </div>

                        {/* 6. Button Link URL */}
                        <div className="sm:col-span-3">
                          <label className="block text-[11px] font-bold text-gray-700 mb-1 flex items-center gap-1">
                            <Link className="w-3 h-3 text-[#0F612F]" />
                            <span>لینک دکمه / آدرس باز شدن چت (URL)</span>
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              dir="ltr"
                              value={item.link}
                              onChange={(e) => handleUpdateItem(item, 'link', e.target.value)}
                              className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-xl font-mono"
                              placeholder="https://wa.me/989103176904..."
                            />
                            {item.link && (
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl border border-gray-300 shrink-0"
                                title="تست لینک"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                          <p className="text-[10px] text-gray-400 mt-1 font-light">
                            برای واتساپ می‌توانید از الگوی <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-[9px] text-gray-700">https://wa.me/989103176904</code> استفاده کنید.
                          </p>
                        </div>

                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 3. Live Preview Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#0F612F]" />
            <h4 className="text-sm font-black text-gray-900">پیش‌نمایش زنده در صفحه تماس با ما</h4>
          </div>
          <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Live Preview
          </span>
        </div>

        {/* The exact representation from ContactPage */}
        <div className="bg-gray-100 p-3 sm:p-6 rounded-2xl border border-gray-200">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-gray-200 shadow-sm text-right space-y-3 sm:space-y-4">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 pb-2.5 sm:pb-3.5 border-b border-gray-100">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-[#0F612F] bg-emerald-50 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-md border border-[#0F612F]/20 mb-1">
                  <Share2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#0F612F]" />
                  <span>{config.badge}</span>
                </div>
                <h3 className="text-sm sm:text-lg font-black text-gray-900">
                  {config.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 font-light">
                  {config.description}
                </p>
              </div>

              {/* Quick Phone Copy Badge */}
              <div className="flex items-center gap-2 bg-[#F8FAF9] px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl border border-gray-200/80 self-start sm:self-center shrink-0">
                <div className="text-right">
                  <span className="text-[9px] sm:text-[10px] text-gray-400 block font-light">شماره متصل:</span>
                  <span className="text-[11px] sm:text-xs font-black en-num font-mono text-[#0F612F] dir-ltr">{config.connectedPhone}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(config.connectedPhone);
                    setCopiedPreview(true);
                    setTimeout(() => setCopiedPreview(false), 2000);
                  }}
                  className="px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-white hover:bg-emerald-50 text-[#0F612F] border border-gray-200 text-[10px] sm:text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  {copiedPreview ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">کپی شد</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#0F612F]" />
                      <span>کپی</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Messengers Grid in Preview */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-3">
              {activeMessengersForPreview.map((item) => (
                <div
                  key={item.id}
                  className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-gray-200 bg-[#FAFCFA] hover:bg-white transition-all shadow-2xs flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-2xl bg-white text-[#0F612F] flex items-center justify-center shrink-0 border border-gray-200 p-1.5">
                      <MessengerIconRenderer iconType={item.icon} className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <h4 className="text-[11px] sm:text-sm font-black text-gray-900">{item.name}</h4>
                        {item.tag && (
                          <span className="text-[8px] sm:text-[10px] bg-emerald-100 text-[#0F612F] px-1 py-0.2 rounded font-bold hidden sm:inline-block">
                            {item.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-[9px] sm:text-[11px] text-gray-500 leading-tight mt-0.5 font-light hidden sm:block">
                        {item.description}
                      </p>
                      <span className="text-[9px] sm:text-[11px] font-mono text-gray-800 font-bold en-num dir-ltr block mt-0.5">
                        {item.phone}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 shrink-0" />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};
