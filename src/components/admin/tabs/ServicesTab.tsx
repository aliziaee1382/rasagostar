import React, { useState } from 'react';
import { useData } from '../../../context/DataContext';
import { ServiceDetail, ServiceCategory, ComplementaryService } from '../../../types';
import { Wrench, Plus, Trash2, Upload, Cog, Check, AlertCircle } from 'lucide-react';

export const ServicesTab: React.FC = () => {
  const { 
    data, 
    updateSingleService, 
    updateComplementaryServices, 
    addComplementaryService, 
    deleteComplementaryService,
    uploadFile 
  } = useData();

  const services = data.services || [];
  const complementaryServices = data.complementaryServices || [];

  const [selectedServiceIndex, setSelectedServiceIndex] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadFeedback, setUploadFeedback] = useState<string | null>(null);
  const [isUploadingSecond, setIsUploadingSecond] = useState<boolean>(false);
  const [uploadSecondFeedback, setUploadSecondFeedback] = useState<string | null>(null);

  // Active Main Service
  const activeService = services[selectedServiceIndex] || services[0];

  // Complementary service add state
  const [showAddComp, setShowAddComp] = useState<boolean>(false);
  const [newComp, setNewComp] = useState<Partial<ComplementaryService>>({
    title: '',
    description: '',
    equipment: '',
    icon: 'Cog'
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeService) return;

    setIsUploading(true);
    setUploadFeedback(null);
    try {
      const res = await uploadFile(file);
      if (res.success && res.url) {
        updateSingleService({
          ...activeService,
          image: res.url
        });
        setUploadFeedback('تصویر اول با موفقیت در سرور آپلود شد.');
      } else {
        setUploadFeedback('خطا: ' + res.message);
      }
    } catch {
      setUploadFeedback('خطا در ارتباط با سرور');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSecondImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeService) return;

    setIsUploadingSecond(true);
    setUploadSecondFeedback(null);
    try {
      const res = await uploadFile(file);
      if (res.success && res.url) {
        updateSingleService({
          ...activeService,
          secondaryImage: res.url
        });
        setUploadSecondFeedback('تصویر دوم با موفقیت در سرور آپلود شد.');
      } else {
        setUploadSecondFeedback('خطا: ' + res.message);
      }
    } catch {
      setUploadSecondFeedback('خطا در ارتباط با سرور');
    } finally {
      setIsUploadingSecond(false);
    }
  };

  const handleAddFeature = () => {
    if (!activeService) return;
    updateSingleService({
      ...activeService,
      features: [...activeService.features, 'ویژگی جدید خدمت']
    });
  };

  const handleUpdateFeature = (idx: number, val: string) => {
    if (!activeService) return;
    const updated = [...activeService.features];
    updated[idx] = val;
    updateSingleService({ ...activeService, features: updated });
  };

  const handleDeleteFeature = (idx: number) => {
    if (!activeService) return;
    const updated = activeService.features.filter((_, i) => i !== idx);
    updateSingleService({ ...activeService, features: updated });
  };

  const handleAddEquipment = () => {
    if (!activeService) return;
    updateSingleService({
      ...activeService,
      equipmentList: [...activeService.equipmentList, 'دستگاه جدید']
    });
  };

  const handleUpdateEquipment = (idx: number, val: string) => {
    if (!activeService) return;
    const updated = [...activeService.equipmentList];
    updated[idx] = val;
    updateSingleService({ ...activeService, equipmentList: updated });
  };

  const handleDeleteEquipment = (idx: number) => {
    if (!activeService) return;
    const updated = activeService.equipmentList.filter((_, i) => i !== idx);
    updateSingleService({ ...activeService, equipmentList: updated });
  };

  const handleSaveNewComp = () => {
    if (!newComp.title || !newComp.description) {
      alert('لطفاً عنوان و توضیحات خدمت تکمیلی را وارد نمایید.');
      return;
    }
    const comp: ComplementaryService = {
      id: 'comp_' + Date.now(),
      title: newComp.title || '',
      description: newComp.description || '',
      equipment: newComp.equipment || '',
      icon: newComp.icon || 'Cog'
    };
    addComplementaryService(comp);
    setNewComp({ title: '', description: '', equipment: '', icon: 'Cog' });
    setShowAddComp(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn text-right">
      
      {/* Header Info */}
      <div className="bg-emerald-50/80 p-5 rounded-2xl border border-[#0F612F]/20 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#0F612F] text-[#DECA19] flex items-center justify-center shrink-0 shadow-sm">
          <Wrench className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-black text-gray-900 mb-1">
            مدیریت خطوط تولید ۴ گانه و تجهیزات تکمیلی
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            ویرایش مشخصات فنی، لیست ماشین‌آلات، متریال‌های قابل پردازش، ظرفیت‌ها و تصاویر هر دپارتمان صنعتی.
          </p>
        </div>
      </div>

      {/* Main 4 Services Navigation */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2 overflow-x-auto">
        {services.map((srv, idx) => (
          <button
            key={srv.id}
            type="button"
            onClick={() => setSelectedServiceIndex(idx)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer border ${
              selectedServiceIndex === idx
                ? 'bg-[#0F612F] text-white border-[#0F612F] shadow-sm'
                : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-[#DECA19] text-gray-950 text-[10px] font-mono font-black flex items-center justify-center">
              {idx + 1}
            </span>
            <span>{srv.title}</span>
          </button>
        ))}
      </div>

      {/* Main Service Editor Form */}
      {activeService && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-6">
          <h4 className="text-sm font-black text-gray-900 pb-2 border-b border-gray-100">
            ویرایش اطلاعات: {activeService.title} ({activeService.titleEn})
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">عنوان خدمت (فارسی)</label>
              <input
                type="text"
                value={activeService.title}
                onChange={(e) => updateSingleService({ ...activeService, title: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">عنوان انگلیسی (Latin Title)</label>
              <input
                type="text"
                dir="ltr"
                value={activeService.titleEn}
                onChange={(e) => updateSingleService({ ...activeService, titleEn: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl font-mono"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1">شعار دپارتمان (Slogan)</label>
              <input
                type="text"
                value={activeService.slogan}
                onChange={(e) => updateSingleService({ ...activeService, slogan: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl font-bold text-[#0F612F]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1">توضیح کوتاه کارت‌ها</label>
              <textarea
                rows={2}
                value={activeService.shortDescription}
                onChange={(e) => updateSingleService({ ...activeService, shortDescription: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl leading-relaxed"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1">توضیحات کامل تخصصی</label>
              <textarea
                rows={3}
                value={activeService.fullDescription}
                onChange={(e) => updateSingleService({ ...activeService, fullDescription: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl leading-relaxed"
              />
            </div>

            {/* Image 1 URL & Upload */}
            <div className="md:col-span-2 space-y-2 p-3 bg-gray-50/80 rounded-xl border border-gray-200">
              <label className="block text-xs font-bold text-gray-900 mb-1">تصویر اول (بالایی) خدمت</label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <input
                  type="text"
                  dir="ltr"
                  placeholder="https://..."
                  value={activeService.image}
                  onChange={(e) => updateSingleService({ ...activeService, image: e.target.value })}
                  className="flex-1 px-3 py-2 text-xs bg-white border border-gray-300 rounded-xl font-mono"
                />
                <label className="bg-[#0F612F] hover:bg-[#0c4e26] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shrink-0 transition-colors">
                  {isUploading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4 text-[#DECA19]" />
                  )}
                  <span>{isUploading ? 'در حال آپلود...' : 'آپلود تصویر اول'}</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
              <div>
                <label className="block text-[10px] font-medium text-gray-500 mb-0.5">تیتر زیرنویس تصویر اول (اختیاری):</label>
                <input
                  type="text"
                  placeholder="مثال: کارگاه قالب‌سازی و ماشین‌کاری دقیق CNC"
                  value={activeService.imageCaption || ''}
                  onChange={(e) => updateSingleService({ ...activeService, imageCaption: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg text-gray-700"
                />
              </div>
              {uploadFeedback && <p className="text-xs text-emerald-600 font-bold">{uploadFeedback}</p>}
            </div>

            {/* Image 2 URL & Upload */}
            <div className="md:col-span-2 space-y-2 p-3 bg-gray-50/80 rounded-xl border border-gray-200">
              <label className="block text-xs font-bold text-gray-900 mb-1">تصویر دوم (پایینی - زیر تصویر اول) خدمت</label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <input
                  type="text"
                  dir="ltr"
                  placeholder="https://..."
                  value={activeService.secondaryImage || ''}
                  onChange={(e) => updateSingleService({ ...activeService, secondaryImage: e.target.value })}
                  className="flex-1 px-3 py-2 text-xs bg-white border border-gray-300 rounded-xl font-mono"
                />
                <label className="bg-[#0F612F] hover:bg-[#0c4e26] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shrink-0 transition-colors">
                  {isUploadingSecond ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4 text-[#DECA19]" />
                  )}
                  <span>{isUploadingSecond ? 'در حال آپلود...' : 'آپلود تصویر دوم'}</span>
                  <input type="file" accept="image/*" onChange={handleSecondImageUpload} className="hidden" />
                </label>
              </div>
              <div>
                <label className="block text-[10px] font-medium text-gray-500 mb-0.5">تیتر زیرنویس تصویر دوم (اختیاری):</label>
                <input
                  type="text"
                  placeholder="مثال: تست انطباق و مونتاژ سنبه و ماتریس در کارخانه"
                  value={activeService.secondaryImageCaption || ''}
                  onChange={(e) => updateSingleService({ ...activeService, secondaryImageCaption: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg text-gray-700"
                />
              </div>
              {uploadSecondFeedback && <p className="text-xs text-emerald-600 font-bold">{uploadSecondFeedback}</p>}
            </div>
          </div>

          {/* Machine and Equipment List */}
          <div className="border-t border-gray-100 pt-5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-gray-900">لیست ماشین‌آلات و تجهیزات این خط</label>
              <button
                type="button"
                onClick={handleAddEquipment}
                className="text-xs text-[#0F612F] hover:underline font-bold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>افزودن دستگاه</span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeService.equipmentList.map((eq, eqIdx) => (
                <div key={eqIdx} className="flex items-center gap-2">
                  <Cog className="w-4 h-4 text-[#DECA19] shrink-0" />
                  <input
                    type="text"
                    value={eq}
                    onChange={(e) => handleUpdateEquipment(eqIdx, e.target.value)}
                    className="flex-1 px-2.5 py-1.5 text-xs bg-gray-50 border border-gray-300 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteEquipment(eqIdx)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="border-t border-gray-100 pt-5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-gray-900">مزایا و قابلیت‌های کلیدی</label>
              <button
                type="button"
                onClick={handleAddFeature}
                className="text-xs text-[#0F612F] hover:underline font-bold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>افزودن مزیت</span>
              </button>
            </div>
            <div className="space-y-2">
              {activeService.features.map((ft, ftIdx) => (
                <div key={ftIdx} className="flex items-center gap-2">
                  <span className="text-xs text-[#0F612F] font-bold">●</span>
                  <input
                    type="text"
                    value={ft}
                    onChange={(e) => handleUpdateFeature(ftIdx, e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs bg-gray-50 border border-gray-300 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteFeature(ftIdx)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Complementary Services Section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <h4 className="text-sm font-black text-gray-900">تجهیزات و خدمات تکمیلی / ابزارسازی</h4>
            <p className="text-[11px] text-gray-500">دستگاه‌های اسپارک، فرز، تراش، دریل رادیال و سنگ‌زنی</p>
          </div>
          <button
            type="button"
            onClick={() => setShowAddComp(!showAddComp)}
            className="bg-[#0F612F] hover:bg-[#0c4e26] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#DECA19]" />
            <span>افزودن دستگاه تکمیلی</span>
          </button>
        </div>

        {showAddComp && (
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-300 space-y-3">
            <h5 className="text-xs font-bold text-gray-800">مشخصات دستگاه یا خدمت پشتیبان جدید</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">عنوان (مثلاً: دستگاه دریل رادیال)</label>
                <input
                  type="text"
                  value={newComp.title}
                  onChange={(e) => setNewComp({ ...newComp, title: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">مدل و تجهیزات</label>
                <input
                  type="text"
                  value={newComp.equipment}
                  onChange={(e) => setNewComp({ ...newComp, equipment: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-gray-300 rounded-lg"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-gray-600 mb-1">توضیحات کاربردی</label>
                <input
                  type="text"
                  value={newComp.description}
                  onChange={(e) => setNewComp({ ...newComp, description: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddComp(false)}
                className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-200 rounded-lg"
              >
                انصراف
              </button>
              <button
                type="button"
                onClick={handleSaveNewComp}
                className="px-4 py-1 text-xs bg-[#0F612F] text-white font-bold rounded-lg"
              >
                ذخیره دستگاه
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {complementaryServices.map((comp) => (
            <div key={comp.id} className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 flex justify-between items-start">
              <div>
                <h5 className="text-xs font-bold text-gray-900">{comp.title}</h5>
                <p className="text-[11px] text-gray-600 mt-1 leading-snug">{comp.description}</p>
                {comp.equipment && (
                  <span className="inline-block mt-2 text-[10px] bg-emerald-100 text-[#0F612F] px-2 py-0.5 rounded font-bold">
                    {comp.equipment}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => deleteComplementaryService(comp.id)}
                className="text-red-500 hover:text-red-700 p-1"
                title="حذف"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
