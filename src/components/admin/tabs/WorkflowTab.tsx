import React from 'react';
import { useData } from '../../../context/DataContext';
import { Workflow, Sparkles, Check, Cog } from 'lucide-react';

export const WorkflowTab: React.FC = () => {
  const { data, updateIntegratedProcessSteps } = useData();
  const steps = data.integratedProcessSteps || [];

  const handleUpdateStep = (index: number, field: string, value: string) => {
    const updated = steps.map((s, i) => (i === index ? { ...s, [field]: value } : s));
    updateIntegratedProcessSteps(updated);
  };

  return (
    <div className="space-y-6 animate-fadeIn text-right">
      
      {/* Header Info */}
      <div className="bg-emerald-50/80 p-5 rounded-2xl border border-[#0F612F]/20 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#0F612F] text-[#DECA19] flex items-center justify-center shrink-0 shadow-sm">
          <Workflow className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-black text-gray-900 mb-1">
            مراحل ۶‌گانه فرآیند یکپارچه تولید (از نقشه CAD تا تحویل تیراژ)
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            عناوین، توضیحات و جزئیات هر یک از گام‌های تولید در سالن‌های کارخانه را ویرایش نمایید.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {steps.map((step, idx) => (
          <div key={idx} className="p-5 bg-white rounded-2xl border border-gray-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <span className="text-xs font-black text-gray-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#0F612F] text-[#DECA19] font-mono text-xs flex items-center justify-center font-bold">
                  {step.step}
                </span>
                <span>گام {step.step} تولید</span>
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">عنوان مرحله</label>
              <input
                type="text"
                value={step.title}
                onChange={(e) => handleUpdateStep(idx, 'title', e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-gray-50 border border-gray-300 rounded-lg font-bold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">شرح خلاصه</label>
              <input
                type="text"
                value={step.description}
                onChange={(e) => handleUpdateStep(idx, 'description', e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-gray-50 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">توضیحات و استانداردهای فنی</label>
              <textarea
                rows={2}
                value={step.details || ''}
                onChange={(e) => handleUpdateStep(idx, 'details', e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-gray-50 border border-gray-300 rounded-lg leading-relaxed"
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
