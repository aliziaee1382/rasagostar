import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { 
  Building2, 
  Wrench, 
  Workflow, 
  Package, 
  Handshake, 
  BarChart3, 
  Save, 
  RotateCcw, 
  Download, 
  Upload, 
  LogOut, 
  X, 
  Sliders, 
  Palette, 
  FileText, 
  MessageSquare,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

import { ThemeTab } from './tabs/ThemeTab';
import { SliderTab } from './tabs/SliderTab';
import { PagesContentTab } from './tabs/PagesContentTab';
import { GeneralInfoTab } from './tabs/GeneralInfoTab';
import { ServicesTab } from './tabs/ServicesTab';
import { ProductsTab } from './tabs/ProductsTab';
import { PartnersTab } from './tabs/PartnersTab';
import { WorkflowTab } from './tabs/WorkflowTab';
import { StatsTab } from './tabs/StatsTab';
import { MessagesTab } from './tabs/MessagesTab';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AdminTab = 
  | 'general' 
  | 'theme' 
  | 'slider' 
  | 'pages' 
  | 'messages' 
  | 'services' 
  | 'products' 
  | 'partners' 
  | 'workflow' 
  | 'stats';

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { 
    saveToBackend,
    resetToDefaults,
    exportBackup,
    importBackup,
    logout,
    adminUser,
    unreadMessagesCount,
    messages
  } = useData();

  const [activeTab, setActiveTab] = useState<AdminTab>('general');
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSavingLocal, setIsSavingLocal] = useState(false);

  if (!isOpen) return null;

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleGlobalSave = async () => {
    setIsSavingLocal(true);
    const res = await saveToBackend();
    setIsSavingLocal(false);
    if (res.success) {
      showToast(res.message, 'success');
    } else {
      showToast(res.message, 'error');
    }
  };

  const handleResetCatalog = async () => {
    if (window.confirm('آیا از بازنشانی کلیه اطلاعات به مقادیر پیش‌فرض کاتالوگ کارخانه اطمینان دارید؟')) {
      setIsSavingLocal(true);
      const res = await resetToDefaults();
      setIsSavingLocal(false);
      showToast(res.message, 'success');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      if (content) {
        setIsSavingLocal(true);
        const res = await importBackup(content);
        setIsSavingLocal(false);
        showToast(res.message, res.success ? 'success' : 'error');
      }
    };
    reader.readAsText(file);
  };

  const tabs: { id: AdminTab; label: string; icon: React.ComponentType<{ className?: string }>; badge?: number }[] = [
    { id: 'general', label: 'اطلاعات کارخانه و تماس', icon: Building2 },
    { id: 'theme', label: 'پالت رنگ و استایل (Theme)', icon: Palette },
    { id: 'slider', label: 'اسلایدر صفحه اصلی (Hero)', icon: Sliders },
    { id: 'pages', label: 'متون و محتوای صفحات', icon: FileText },
    { id: 'messages', label: 'صندوق پیام‌ها و استعلام‌ها', icon: MessageSquare, badge: unreadMessagesCount },
    { id: 'services', label: 'خطوط تولید و تجهیزات', icon: Wrench },
    { id: 'products', label: 'محصولات و پروژه‌ها', icon: Package },
    { id: 'partners', label: 'مشتریان و شرکای تجاری', icon: Handshake },
    { id: 'workflow', label: 'مراحل ۶گانه تولید', icon: Workflow },
    { id: 'stats', label: 'آمار و دستاوردهای کارخانه', icon: BarChart3 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div 
        className="bg-white rounded-3xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden text-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="bg-[#0c2214] text-white p-4 sm:p-6 border-b-4 border-[#DECA19] shrink-0 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0F612F] text-[#DECA19] border border-[#DECA19]/40 flex items-center justify-center font-bold">
              <Building2 className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white">پنل مدیریت محتوا و دیتابیس</h2>
                <span className="bg-[#DECA19]/20 text-[#DECA19] text-[10px] px-2 py-0.5 rounded-full font-mono border border-[#DECA19]/30">
                  Headless CMS Live
                </span>
              </div>
              <p className="text-xs text-gray-300">
                کاربر جاری: <strong className="text-white">{adminUser?.displayName || 'مدیریت کارخانه'}</strong> {adminUser?.username ? `(${adminUser.username})` : ''}
              </p>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center flex-wrap gap-2">
            <button
              onClick={handleGlobalSave}
              disabled={isSavingLocal}
              className="bg-[#DECA19] hover:bg-[#ebd827] text-gray-950 px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
            >
              {isSavingLocal ? (
                <div className="w-4 h-4 border-2 border-gray-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>ذخیره کلیه تغییرات</span>
            </button>

            <button
              onClick={exportBackup}
              title="دریافت فایل پشتیبان JSON"
              className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#DECA19]" />
              <span className="hidden sm:inline">پشتیبان</span>
            </button>

            <label 
              title="بارگذاری فایل پشتیبان JSON"
              className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Upload className="w-4 h-4 text-[#DECA19]" />
              <span className="hidden sm:inline">بازیابی</span>
              <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
            </label>

            <button
              onClick={handleResetCatalog}
              title="بازنشانی به کاتالوگ اولیه"
              className="bg-white/10 hover:bg-red-500/30 text-gray-300 hover:text-white p-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-amber-400" />
            </button>

            <button
              onClick={() => {
                logout();
                onClose();
              }}
              title="خروج از پنل مدیریت"
              className="bg-red-600/80 hover:bg-red-600 text-white p-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">خروج</span>
            </button>

            <button
              onClick={onClose}
              className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toast Alert */}
        {toastMessage && (
          <div className={`p-3 text-xs font-bold flex items-center justify-between px-6 ${
            toastMessage.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
          }`}>
            <div className="flex items-center gap-2">
              {toastMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              <span>{toastMessage.text}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-white/80 hover:text-white">✕</button>
          </div>
        )}

        {/* CMS Body Area: Sidebar Navigation + Active Content View */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-gray-50">
          
          {/* Tabs Sidebar Navigation */}
          <div className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-l border-gray-200 p-3 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-y-auto shrink-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full p-3 rounded-2xl text-xs font-bold flex items-center justify-between gap-2.5 transition-all text-right cursor-pointer shrink-0 md:shrink border ${
                    isActive
                      ? 'bg-[#0F612F] text-white border-[#0F612F] shadow-sm'
                      : 'bg-gray-50/70 hover:bg-gray-100 text-gray-700 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#DECA19]' : 'text-[#0F612F]'}`} />
                    <span className="truncate">{tab.label}</span>
                  </div>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-black shrink-0 ${
                      isActive ? 'bg-[#DECA19] text-gray-950' : 'bg-amber-500 text-white animate-pulse'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content Panel View */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            {activeTab === 'general' && <GeneralInfoTab />}
            {activeTab === 'theme' && <ThemeTab />}
            {activeTab === 'slider' && <SliderTab />}
            {activeTab === 'pages' && <PagesContentTab />}
            {activeTab === 'messages' && <MessagesTab />}
            {activeTab === 'services' && <ServicesTab />}
            {activeTab === 'products' && <ProductsTab />}
            {activeTab === 'partners' && <PartnersTab />}
            {activeTab === 'workflow' && <WorkflowTab />}
            {activeTab === 'stats' && <StatsTab />}
          </div>

        </div>

      </div>
    </div>
  );
};
