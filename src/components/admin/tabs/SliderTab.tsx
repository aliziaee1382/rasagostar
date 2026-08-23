import React, { useState } from 'react';
import { useData } from '../../../context/DataContext';
import { HeroSlide } from '../../../types';
import { 
  Sliders, 
  Plus, 
  Trash2, 
  Upload, 
  Image as ImageIcon, 
  Check, 
  Eye, 
  AlertCircle 
} from 'lucide-react';

export const SliderTab: React.FC = () => {
  const { data, updateHeroSlides, updateSingleHeroSlide, addHeroSlide, deleteHeroSlide, uploadFile } = useData();
  const slides = data.heroSlides || [];

  const [selectedSlideIndex, setSelectedSlideIndex] = useState<number>(0);
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
  const [uploadFeedback, setUploadFeedback] = useState<string | null>(null);

  const activeSlide: HeroSlide | undefined = slides[selectedSlideIndex] || slides[0];

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeSlide) return;

    setIsUploadingImage(true);
    setUploadFeedback(null);
    try {
      const res = await uploadFile(file);
      if (res.success && res.url) {
        updateSingleHeroSlide({
          ...activeSlide,
          bgImage: res.url,
          image: res.url
        });
        setUploadFeedback('تصویر با موفقیت در سرور آپلود و جایگزین شد.');
      } else {
        setUploadFeedback('خطا در آپلود تصویر: ' + res.message);
      }
    } catch {
      setUploadFeedback('خطا در برقراری ارتباط با سرور.');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleAddNewSlide = () => {
    const newSlide: HeroSlide = {
      id: 'slide_' + Date.now(),
      title: 'عنوان اسلاید جدید کارخانه',
      subtitle: 'توضیحات کوتاه خط تولید و قابلیت‌ها',
      slogan: 'شعار کوتاه و برجسته خط تولید جدید',
      description: 'توضیحات تکمیلی توانمندی‌ها و استانداردهای این واحد صنعتی.',
      badge: 'واحد تخصصی جدید',
      bgImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80',
      primaryBtnText: 'استعلام قیمت و ارسال نقشه',
      primaryBtnAction: 'contact',
      secondaryBtnText: 'مشاهده مشخصات خط تولید',
      secondaryBtnAction: 'services',
      order: slides.length + 1,
      isActive: true,
      metrics: [
        { label: 'ظرفیت اسمی', value: '۱۰۰%' },
        { label: 'دقت ابعادی', value: '۰.۰۱ mm' }
      ],
      bulletPoints: [
        'ویژگی فنی اول خط تولید',
        'ویژگی فنی دوم و استانداردها',
        'تضمین تطابق با نقشه مهندسی'
      ]
    };
    addHeroSlide(newSlide);
    setSelectedSlideIndex(slides.length);
  };

  const handleDeleteSlide = (indexToDelete: number) => {
    if (slides.length <= 1) {
      alert('حداقل یک اسلاید باید در صفحه اصلی وجود داشته باشد.');
      return;
    }
    const slideToDelete = slides[indexToDelete];
    if (slideToDelete && window.confirm(`آیا از حذف اسلاید «${slideToDelete.title}» اطمینان دارید؟`)) {
      const updated = slides.filter((_, i) => i !== indexToDelete);
      updateHeroSlides(updated);
      setSelectedSlideIndex(Math.max(0, indexToDelete - 1));
    }
  };

  const handleUpdateBulletPoint = (bulletIndex: number, text: string) => {
    if (!activeSlide) return;
    const currentBullets = activeSlide.bulletPoints || [];
    const newBullets = [...currentBullets];
    newBullets[bulletIndex] = text;
    updateSingleHeroSlide({ ...activeSlide, bulletPoints: newBullets });
  };

  const handleAddBulletPoint = () => {
    if (!activeSlide) return;
    const currentBullets = activeSlide.bulletPoints || [];
    updateSingleHeroSlide({
      ...activeSlide,
      bulletPoints: [...currentBullets, 'ویژگی فنی جدید']
    });
  };

  const handleDeleteBulletPoint = (bulletIndex: number) => {
    if (!activeSlide) return;
    const currentBullets = activeSlide.bulletPoints || [];
    const newBullets = currentBullets.filter((_, i) => i !== bulletIndex);
    updateSingleHeroSlide({ ...activeSlide, bulletPoints: newBullets });
  };

  const handleUpdateMetric = (metricIndex: number, field: 'label' | 'value', text: string) => {
    if (!activeSlide) return;
    const currentMetrics = activeSlide.metrics || [];
    const newMetrics = [...currentMetrics];
    newMetrics[metricIndex] = { ...newMetrics[metricIndex], [field]: text };
    updateSingleHeroSlide({ ...activeSlide, metrics: newMetrics });
  };

  return (
    <div className="space-y-6 animate-fadeIn text-right">
      
      {/* Header Info */}
      <div className="bg-emerald-50/80 p-5 rounded-2xl border border-[#0F612F]/20 flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#0F612F] text-[#DECA19] flex items-center justify-center shrink-0 shadow-sm">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-gray-900 mb-1">
              مدیریت اسلایدر صفحه نخست (Hero Banner Carousel)
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              افزودن، ویرایش، حذف، تغییر پس‌زمینه و تنظیم متن‌ها، نشان‌ها و دکمه‌های اسلایدر بالای سایت.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddNewSlide}
          className="bg-[#0F612F] hover:bg-[#0c4e26] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-[#DECA19]" />
          <span>افزودن اسلاید جدید</span>
        </button>
      </div>

      {/* Slide Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2 overflow-x-auto">
        {slides.map((slide, idx) => (
          <div key={slide.id || idx} className="flex items-center">
            <button
              type="button"
              onClick={() => setSelectedSlideIndex(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer border ${
                selectedSlideIndex === idx
                  ? 'bg-[#0F612F] text-white border-[#0F612F] shadow-sm'
                  : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-200'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-[#DECA19] text-gray-950 text-[10px] font-mono font-black flex items-center justify-center">
                {idx + 1}
              </span>
              <span>{slide.title || `اسلاید ${idx + 1}`}</span>
            </button>
          </div>
        ))}
      </div>

      {/* Active Slide Form */}
      {activeSlide && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-gray-900">
                ویرایش اسلاید #{selectedSlideIndex + 1}: {activeSlide.title}
              </span>
              <span className="text-[10px] text-gray-400 font-mono">({activeSlide.id})</span>
            </div>

            <button
              type="button"
              onClick={() => handleDeleteSlide(selectedSlideIndex)}
              disabled={slides.length <= 1}
              className="text-red-500 hover:text-red-700 disabled:opacity-30 text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>حذف این اسلاید</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">عنوان اصلی اسلاید (H1)</label>
              <input
                type="text"
                value={activeSlide.title}
                onChange={(e) => updateSingleHeroSlide({ ...activeSlide, title: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl font-bold"
              />
            </div>

            {/* Badge */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">نشان یا برچسب بالای عنوان (Badge)</label>
              <input
                type="text"
                value={activeSlide.badge || ''}
                onChange={(e) => updateSingleHeroSlide({ ...activeSlide, badge: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl"
              />
            </div>

            {/* Slogan */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1">شعار یا زیرعنوان برجسته</label>
              <input
                type="text"
                value={activeSlide.slogan || activeSlide.subtitle || ''}
                onChange={(e) => updateSingleHeroSlide({ ...activeSlide, slogan: e.target.value, subtitle: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl text-[#0F612F] font-bold"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1">متن توضیحات اسلاید</label>
              <textarea
                rows={3}
                value={activeSlide.description}
                onChange={(e) => updateSingleHeroSlide({ ...activeSlide, description: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl leading-relaxed"
              />
            </div>

            {/* Background Image & Upload */}
            <div className="md:col-span-2 space-y-2">
              <label className="block text-xs font-bold text-gray-700 mb-1">
                تصویر پس‌زمینه اسلاید (آدرس URL یا بارگذاری فایل از کامپیوتر)
              </label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <input
                  type="text"
                  dir="ltr"
                  value={activeSlide.bgImage || activeSlide.image || ''}
                  onChange={(e) => updateSingleHeroSlide({ ...activeSlide, bgImage: e.target.value, image: e.target.value })}
                  className="flex-1 px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl font-mono text-gray-800"
                />

                <label className="bg-[#0F612F] hover:bg-[#0c4e26] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shrink-0 transition-colors shadow-2xs">
                  {isUploadingImage ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4 text-[#DECA19]" />
                  )}
                  <span>{isUploadingImage ? 'در حال آپلود...' : 'بارگذاری تصویر جدید'}</span>
                  <input type="file" accept="image/*" onChange={handleImageFileChange} className="hidden" />
                </label>
              </div>

              {uploadFeedback && (
                <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>{uploadFeedback}</span>
                </p>
              )}

              {/* Preview Thumbnail */}
              <div className="mt-2 h-32 rounded-xl overflow-hidden border border-gray-200 relative bg-gray-900">
                <img
                  src={activeSlide.bgImage || activeSlide.image}
                  alt={activeSlide.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-3 text-white text-xs font-bold">
                  پیش‌نمایش پس‌زمینه اسلاید: {activeSlide.title}
                </div>
              </div>
            </div>

            {/* Buttons Customization */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">متن دکمه اصلی (Primary Button)</label>
              <input
                type="text"
                value={activeSlide.primaryBtnText || 'استعلام قیمت و ارسال نقشه'}
                onChange={(e) => updateSingleHeroSlide({ ...activeSlide, primaryBtnText: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">متن دکمه ثانویه (Secondary Button)</label>
              <input
                type="text"
                value={activeSlide.secondaryBtnText || 'مشاهده مشخصات خط تولید'}
                onChange={(e) => updateSingleHeroSlide({ ...activeSlide, secondaryBtnText: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl"
              />
            </div>

          </div>

          {/* Bullet Points */}
          <div className="border-t border-gray-100 pt-5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-gray-900">نکات و مزایای برجسته اسلاید (Bullet Points)</label>
              <button
                type="button"
                onClick={handleAddBulletPoint}
                className="text-xs text-[#0F612F] hover:underline font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>افزودن نکته جدید</span>
              </button>
            </div>

            <div className="space-y-2">
              {(activeSlide.bulletPoints || []).map((bp, bpIdx) => (
                <div key={bpIdx} className="flex items-center gap-2">
                  <span className="text-xs text-[#0F612F] font-bold">●</span>
                  <input
                    type="text"
                    value={bp}
                    onChange={(e) => handleUpdateBulletPoint(bpIdx, e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs bg-gray-50 border border-gray-300 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteBulletPoint(bpIdx)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div className="border-t border-gray-100 pt-5 space-y-3">
            <label className="text-xs font-black text-gray-900 block">شاخص‌های عددی کارت اسلاید (Metrics)</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(activeSlide.metrics || []).map((m, mIdx) => (
                <div key={mIdx} className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center gap-2">
                  <div className="flex-1 space-y-1">
                    <input
                      type="text"
                      placeholder="عنوان شاخص (مثلاً ظرفیت)"
                      value={m.label}
                      onChange={(e) => handleUpdateMetric(mIdx, 'label', e.target.value)}
                      className="w-full px-2 py-1 text-xs bg-white border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      placeholder="مقدار شاخص (مثلاً ۴۰۰ تن)"
                      value={m.value}
                      onChange={(e) => handleUpdateMetric(mIdx, 'value', e.target.value)}
                      className="w-full px-2 py-1 text-xs bg-white border border-gray-300 rounded font-bold text-[#0F612F]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
