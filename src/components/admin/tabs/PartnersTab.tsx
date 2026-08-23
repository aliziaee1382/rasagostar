import React, { useState } from 'react';
import { useData } from '../../../context/DataContext';
import { PartnerCompany } from '../../../types';
import { Handshake, Plus, Trash2, Building2, Check } from 'lucide-react';

export const PartnersTab: React.FC = () => {
  const { data, updatePartners, addPartner, deletePartner } = useData();
  const partners = data.partners || [];

  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newPartner, setNewPartner] = useState<Partial<PartnerCompany>>({
    name: '',
    latinName: '',
    sector: 'خودروسازی',
    cooperationType: 'تولید مجموعه‌ها و قطعات پرسی'
  });

  const handleSavePartner = () => {
    if (!newPartner.name) {
      alert('لطفاً نام شرکت را وارد نمایید.');
      return;
    }
    const p: PartnerCompany = {
      id: 'partner_' + Date.now(),
      name: newPartner.name || '',
      latinName: newPartner.latinName || '',
      sector: newPartner.sector || 'صنعتی',
      cooperationType: newPartner.cooperationType || 'تولید قطعات'
    };
    addPartner(p);
    setNewPartner({ name: '', latinName: '', sector: 'خودروسازی', cooperationType: 'تولید مجموعه‌ها و قطعات پرسی' });
    setShowAddForm(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`آیا از حذف شریک تجاری «${name}» اطمینان دارید؟`)) {
      deletePartner(id);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn text-right">
      
      {/* Header Info */}
      <div className="bg-emerald-50/80 p-5 rounded-2xl border border-[#0F612F]/20 flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#0F612F] text-[#DECA19] flex items-center justify-center shrink-0 shadow-sm">
            <Handshake className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-gray-900 mb-1">
              مدیریت مشتریان و شرکای تجاری (نوار متحرک صفحه نخست)
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              شرکت‌های طرف قرارداد، صنایع همکار و خودروسازان را مدیریت کنید.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-[#0F612F] hover:bg-[#0c4e26] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-[#DECA19]" />
          <span>افزودن شرکت همکار</span>
        </button>
      </div>

      {/* Add Partner Form */}
      {showAddForm && (
        <div className="bg-white rounded-2xl border-2 border-[#0F612F] p-5 shadow-lg space-y-4 animate-fadeIn">
          <h4 className="text-xs font-black text-gray-900 pb-2 border-b border-gray-100">
            مشخصات شرکت یا کارخانه همکار جدید
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">نام شرکت (فارسی)</label>
              <input
                type="text"
                value={newPartner.name}
                onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                className="w-full px-3 py-1.5 text-xs bg-gray-50 border border-gray-300 rounded-lg font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">نام لاتین / برند</label>
              <input
                type="text"
                dir="ltr"
                value={newPartner.latinName}
                onChange={(e) => setNewPartner({ ...newPartner, latinName: e.target.value })}
                className="w-full px-3 py-1.5 text-xs bg-gray-50 border border-gray-300 rounded-lg font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">حوزه فعالیت</label>
              <input
                type="text"
                value={newPartner.sector}
                onChange={(e) => setNewPartner({ ...newPartner, sector: e.target.value })}
                className="w-full px-3 py-1.5 text-xs bg-gray-50 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">نوع همکاری</label>
              <input
                type="text"
                value={newPartner.cooperationType}
                onChange={(e) => setNewPartner({ ...newPartner, cooperationType: e.target.value })}
                className="w-full px-3 py-1.5 text-xs bg-gray-50 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              انصراف
            </button>
            <button
              type="button"
              onClick={handleSavePartner}
              className="px-4 py-1.5 text-xs bg-[#0F612F] text-white font-bold rounded-lg flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5 text-[#DECA19]" />
              <span>ثبت شرکت</span>
            </button>
          </div>
        </div>
      )}

      {/* Partners List Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {partners.map((p) => (
          <div
            key={p.id}
            className="p-4 bg-white rounded-xl border border-gray-200 shadow-xs flex items-center justify-between gap-3 hover:border-[#0F612F] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#0F612F] text-[#DECA19] flex items-center justify-center font-bold shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs font-black text-gray-900">{p.name}</h5>
                <span className="text-[10px] text-gray-400 font-mono block">{p.latinName}</span>
                <span className="text-[10px] text-[#0F612F] font-bold mt-0.5 inline-block">{p.sector}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleDelete(p.id, p.name)}
              className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50"
              title="حذف شرکت"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
