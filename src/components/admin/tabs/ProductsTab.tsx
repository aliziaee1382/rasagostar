import React, { useState } from 'react';
import { useData } from '../../../context/DataContext';
import { PortfolioItem, ServiceCategory } from '../../../types';
import { Package, Plus, Trash2, Edit3, Upload, Search, Filter, Check, Eye } from 'lucide-react';

export const ProductsTab: React.FC = () => {
  const { data, addPortfolioItem, updatePortfolioItems, deletePortfolioItem, uploadFile } = useData();
  const products = data.portfolioItems || [];

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [editingProduct, setEditingProduct] = useState<PortfolioItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadFeedback, setUploadFeedback] = useState<string | null>(null);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.application.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleStartAdd = () => {
    setEditingProduct({
      id: 'prod_' + Date.now(),
      title: '',
      titleEn: '',
      category: 'stamping',
      categoryLabel: 'پرسکاری صنعتی',
      description: '',
      material: 'ورق روغنی / ST12',
      application: 'صنایع خودروسازی',
      dimensions: 'ابعاد استاندارد',
      tolerance: '± 0.05 mm',
      toolingType: 'قالب پروگرسیو سنبه-ماتریس',
      image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
      technicalSpecs: ['پرسکاری دقیق', 'کنترل ابعادی ۱۰۰٪']
    });
    setIsAddingNew(true);
    setUploadFeedback(null);
  };

  const handleStartEdit = (product: PortfolioItem) => {
    setEditingProduct({ ...product });
    setIsAddingNew(false);
    setUploadFeedback(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProduct) return;

    setIsUploading(true);
    setUploadFeedback(null);
    try {
      const res = await uploadFile(file);
      if (res.success && res.url) {
        setEditingProduct({
          ...editingProduct,
          image: res.url
        });
        setUploadFeedback('تصویر با موفقیت در سرور آپلود شد.');
      } else {
        setUploadFeedback('خطا: ' + res.message);
      }
    } catch {
      setUploadFeedback('خطا در ارتباط با سرور.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveProduct = () => {
    if (!editingProduct) return;
    if (!editingProduct.title) {
      alert('لطفاً عنوان محصول را وارد نمایید.');
      return;
    }

    if (isAddingNew) {
      addPortfolioItem(editingProduct);
    } else {
      const updated = products.map((p) => (p.id === editingProduct.id ? editingProduct : p));
      updatePortfolioItems(updated);
    }

    setEditingProduct(null);
    setIsAddingNew(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`آیا از حذف محصول «${title}» اطمینان دارید؟`)) {
      deletePortfolioItem(id);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn text-right">
      
      {/* Header Info */}
      <div className="bg-emerald-50/80 p-5 rounded-2xl border border-[#0F612F]/20 flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#0F612F] text-[#DECA19] flex items-center justify-center shrink-0 shadow-sm">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-gray-900 mb-1">
              مدیریت نمونه قطعات، محصولات و پروژه‌ها
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              افزودن، ویرایش، حذف و آپلود تصاویر باکیفیت برای انواع قطعات پرسی، قالب‌های صنعتی و تزریق پلاستیک.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleStartAdd}
          className="bg-[#0F612F] hover:bg-[#0c4e26] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-[#DECA19]" />
          <span>افزودن قطعه جدید</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجو در عنوان، متریال یا کاربرد قطعه..."
            className="w-full pr-9 pl-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl"
          >
            <option value="all">همه دسته‌بندی‌ها</option>
            <option value="stamping">پرسکاری صنعتی</option>
            <option value="mold_making">قالب‌سازی صنعتی</option>
            <option value="plastic_injection">تزریق پلاستیک</option>
            <option value="laser_cutting">برش لیزر فایبر</option>
          </select>
          <span className="text-xs text-gray-500 font-bold">تعداد: {filteredProducts.length}</span>
        </div>
      </div>

      {/* Product Edit / Add Modal or Form */}
      {editingProduct && (
        <div className="bg-white rounded-2xl border-2 border-[#0F612F] p-6 shadow-xl space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h4 className="text-sm font-black text-gray-900">
              {isAddingNew ? 'افزودن قطعه صنعتی جدید به کاتالوگ' : `ویرایش قطعه: ${editingProduct.title}`}
            </h4>
            <button
              type="button"
              onClick={() => setEditingProduct(null)}
              className="text-gray-400 hover:text-gray-600 text-xs font-bold"
            >
              بستن فرم ✕
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">نام قطعه (فارسی)</label>
              <input
                type="text"
                value={editingProduct.title}
                onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">نام انگلیسی</label>
              <input
                type="text"
                dir="ltr"
                value={editingProduct.titleEn || ''}
                onChange={(e) => setEditingProduct({ ...editingProduct, titleEn: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">دسته‌بندی خط تولید</label>
              <select
                value={editingProduct.category}
                onChange={(e) => {
                  const cat = e.target.value as ServiceCategory;
                  const labels: Record<string, string> = {
                    stamping: 'پرسکاری صنعتی',
                    mold_making: 'قالب‌سازی صنعتی',
                    plastic_injection: 'تزریق پلاستیک',
                    laser_cutting: 'برش لیزر فایبر'
                  };
                  setEditingProduct({
                    ...editingProduct,
                    category: cat,
                    categoryLabel: labels[cat] || 'خدمات صنعتی'
                  });
                }}
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl font-bold"
              >
                <option value="stamping">پرسکاری صنعتی</option>
                <option value="mold_making">قالب‌سازی صنعتی</option>
                <option value="plastic_injection">تزریق پلاستیک</option>
                <option value="laser_cutting">برش لیزر فایبر</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">جنس و متریال</label>
              <input
                type="text"
                value={editingProduct.material}
                onChange={(e) => setEditingProduct({ ...editingProduct, material: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">کاربرد صنعتی / مشتری</label>
              <input
                type="text"
                value={editingProduct.application}
                onChange={(e) => setEditingProduct({ ...editingProduct, application: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">دقت و تلرانس ساخت</label>
              <input
                type="text"
                value={editingProduct.tolerance || ''}
                onChange={(e) => setEditingProduct({ ...editingProduct, tolerance: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl font-mono"
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-xs font-bold text-gray-700 mb-1">توضیحات مشخصات فنی</label>
              <textarea
                rows={2}
                value={editingProduct.description}
                onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl leading-relaxed"
              />
            </div>

            {/* Image URL & Upload */}
            <div className="sm:col-span-2 lg:col-span-3 space-y-2">
              <label className="block text-xs font-bold text-gray-700 mb-1">
                تصویر باکیفیت قطعه (آدرس وب یا آپلود از رایانه)
              </label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <input
                  type="text"
                  dir="ltr"
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  className="flex-1 px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl font-mono"
                />
                <label className="bg-[#0F612F] hover:bg-[#0c4e26] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shrink-0 transition-colors shadow-2xs">
                  {isUploading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4 text-[#DECA19]" />
                  )}
                  <span>{isUploading ? 'در حال آپلود...' : 'آپلود تصویر جدید'}</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
              {uploadFeedback && <p className="text-xs text-emerald-600 font-bold">{uploadFeedback}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setEditingProduct(null)}
              className="px-4 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded-xl"
            >
              انصراف
            </button>
            <button
              type="button"
              onClick={handleSaveProduct}
              className="px-6 py-2 text-xs bg-[#0F612F] hover:bg-[#0c4e26] text-white font-bold rounded-xl shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4 text-[#DECA19]" />
              <span>ذخیره قطعه در کاتالوگ</span>
            </button>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="h-36 bg-gray-900 relative overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 right-2 bg-[#0F612F] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                  {p.categoryLabel}
                </span>
              </div>
              <div className="p-4 space-y-2">
                <h5 className="text-xs font-bold text-gray-900">{p.title}</h5>
                <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">{p.description}</p>
                <div className="text-[10px] text-gray-400 font-medium">
                  <div>متریال: {p.material}</div>
                  <div>کاربرد: {p.application}</div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleStartEdit(p)}
                className="text-xs text-[#0F612F] hover:text-[#0c4e26] font-bold flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>ویرایش</span>
              </button>

              <button
                type="button"
                onClick={() => handleDelete(p.id, p.title)}
                className="text-xs text-red-500 hover:text-red-700 font-bold flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>حذف</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
