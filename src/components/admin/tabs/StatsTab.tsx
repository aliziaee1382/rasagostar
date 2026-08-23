import React from 'react';
import { useData } from '../../../context/DataContext';
import { BarChart3, Plus, Trash2, Award, Zap, Factory, ShieldCheck, Users } from 'lucide-react';
import { CompanyStat } from '../../../types';

export const StatsTab: React.FC = () => {
  const { data, updateStats } = useData();
  const stats = data.stats || [];

  const handleUpdateStat = (index: number, field: string, value: string) => {
    const updated = stats.map((s, i) => (i === index ? { ...s, [field]: value } : s));
    updateStats(updated);
  };

  const handleAddStat = () => {
    updateStats([
      ...stats,
      { label: 'آمار جدید', value: '۱۰۰+', icon: 'Factory' }
    ]);
  };

  const handleDeleteStat = (index: number) => {
    const updated = stats.filter((_, i) => i !== index);
    updateStats(updated);
  };

  return (
    <div className="space-y-6 animate-fadeIn text-right">
      
      {/* Header Info */}
      <div className="bg-emerald-50/80 p-5 rounded-2xl border border-[#0F612F]/20 flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#0F612F] text-[#DECA19] flex items-center justify-center shrink-0 shadow-sm">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-gray-900 mb-1">
              مدیریت آمار و ارقام کلیدی کارخانه (نوار آماری زیر هدر)
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              ویرایش مقادیر تناژ پرس‌ها، سابقه، مساحت کارخانه و درصد رضایت مشتریان.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddStat}
          className="bg-[#0F612F] hover:bg-[#0c4e26] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-[#DECA19]" />
          <span>افزودن آمار جدید</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="p-4 bg-white rounded-2xl border border-gray-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <span className="text-xs font-bold text-gray-700">آیتم آماری #{idx + 1}</span>
              <button
                type="button"
                onClick={() => handleDeleteStat(idx)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">عنوان فارسی</label>
              <input
                type="text"
                value={stat.label}
                onChange={(e) => handleUpdateStat(idx, 'label', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-gray-50 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">مقدار عدد / نماد (مثلاً ۴۰۰ تن)</label>
              <input
                type="text"
                value={stat.value}
                onChange={(e) => handleUpdateStat(idx, 'value', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-gray-50 border border-gray-300 rounded-lg font-bold text-[#0F612F]"
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
