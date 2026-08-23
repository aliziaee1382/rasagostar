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
  Plus, 
  Trash2, 
  Check, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles,
  Layers,
  Cpu,
  Cog,
  FileCheck,
  ShieldCheck,
  Phone,
  MapPin,
  Mail,
  Clock,
  Image as ImageIcon
} from 'lucide-react';
import { 
  ServiceDetail, 
  PortfolioItem, 
  PartnerCompany, 
  IntegratedProcessStep, 
  CompanyStat,
  ServiceCategory
} from '../../types';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AdminTab = 'general' | 'services' | 'workflow' | 'products' | 'partners' | 'stats';

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { 
    data, 
    updateCompanyInfo, 
    updateSingleService, 
    updatePortfolioItems,
    addPortfolioItem,
    deletePortfolioItem,
    updatePartners,
    addPartner,
    deletePartner,
    updateStats,
    updateIntegratedProcessSteps,
    saveToBackend,
    resetToDefaults,
    exportBackup,
    importBackup,
    logout,
    adminUser
  } = useData();

  const [activeTab, setActiveTab] = useState<AdminTab>('general');
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSavingLocal, setIsSavingLocal] = useState(false);

  // Selected Service for editing in tab 2
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<number>(0);

  // Selected Product for editing/adding in tab 4
  const [editingProduct, setEditingProduct] = useState<PortfolioItem | null>(null);
  const [isAddingNewProduct, setIsAddingNewProduct] = useState<boolean>(false);

  // Partner edit/add state in tab 5
  const [newPartner, setNewPartner] = useState<Partial<PartnerCompany>>({
    name: '',
    latinName: '',
    sector: 'خودروسازی',
    cooperationType: 'تولید مجموعه‌ها و قطعات پرسی'
  });
  const [showAddPartnerForm, setShowAddPartnerForm] = useState<boolean>(false);

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

  const tabs = [
    { id: 'general' as AdminTab, label: '۱. اطلاعات عمومی کارخانه', icon: Building2 },
    { id: 'services' as AdminTab, label: '۲. خدمات و خطوط تولید', icon: Wrench },
    { id: 'workflow' as AdminTab, label: '۳. مراحل ۶گانه تولید', icon: Workflow },
    { id: 'products' as AdminTab, label: '۴. محصولات و نمونه‌کارها', icon: Package },
    { id: 'partners' as AdminTab, label: '۵. مشتریان و شرکای تجاری', icon: Handshake },
    { id: 'stats' as AdminTab, label: '۶. آمار، اهداف و شعارها', icon: BarChart3 },
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
                  v2.0 cPanel MySQL Live
                </span>
              </div>
              <p className="text-xs text-gray-300">
                کاربر جاری: <strong className="text-white">{adminUser?.displayName || 'مدیریت کارخانه'}</strong> ({adminUser?.username || 'aliziaee1382'})
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
            </button>

            <button
              onClick={onClose}
              className="bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white p-2 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toast Alert */}
        {toastMessage && (
          <div className={`px-6 py-3 text-xs font-bold flex items-center gap-2 ${
            toastMessage.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
          } animate-fadeIn`}>
            {toastMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{toastMessage.text}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center gap-1.5 overflow-x-auto shrink-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-[#0F612F] text-white shadow-sm' 
                    : 'bg-white text-gray-700 hover:bg-gray-200 hover:text-gray-900 border border-gray-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#DECA19]' : 'text-gray-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-[#F8FAF9]">

          {/* ========================================================================= */}
          {/* TAB 1: General Info */}
          {/* ========================================================================= */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 pb-2 border-b border-gray-100">
                  <Building2 className="w-4 h-4 text-[#0F612F]" />
                  <span>اطلاعات هویتی و ثبتی کارخانه</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-gray-600 font-bold mb-1">نام رسمی شرکت (فارسی)</label>
                    <input
                      type="text"
                      value={data.companyInfo.name}
                      onChange={(e) => updateCompanyInfo({ name: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-[#0F612F] outline-none font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 font-bold mb-1">نام لاتین (English Name)</label>
                    <input
                      type="text"
                      dir="ltr"
                      value={data.companyInfo.nameEn}
                      onChange={(e) => updateCompanyInfo({ nameEn: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-[#0F612F] outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 font-bold mb-1">شماره ثبت رسمی</label>
                    <input
                      type="text"
                      value={data.companyInfo.registrationNumber}
                      onChange={(e) => updateCompanyInfo({ registrationNumber: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-[#0F612F] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 font-bold mb-1">سابقه فعالیت (سال)</label>
                    <input
                      type="text"
                      value={data.companyInfo.experienceYears}
                      onChange={(e) => updateCompanyInfo({ experienceYears: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-[#0F612F] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 font-bold mb-1">تعداد پرسنل متخصص</label>
                    <input
                      type="text"
                      value={data.companyInfo.personnelCount}
                      onChange={(e) => updateCompanyInfo({ personnelCount: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-[#0F612F] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 font-bold mb-1">حداکثر توان پرسکاری</label>
                    <input
                      type="text"
                      value={data.companyInfo.maxPressCapacity}
                      onChange={(e) => updateCompanyInfo({ maxPressCapacity: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-[#0F612F] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 font-bold mb-1">مساحت سالن تولید</label>
                    <input
                      type="text"
                      value={data.companyInfo.productionArea}
                      onChange={(e) => updateCompanyInfo({ productionArea: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-[#0F612F] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 font-bold mb-1">مساحت واحد اداری و مهندسی</label>
                    <input
                      type="text"
                      value={data.companyInfo.officeArea}
                      onChange={(e) => updateCompanyInfo({ officeArea: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-[#0F612F] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 font-bold mb-1">مساحت کل مجموعه کارخانه‌ای</label>
                    <input
                      type="text"
                      value={data.companyInfo.totalArea}
                      onChange={(e) => updateCompanyInfo({ totalArea: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-[#0F612F] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-gray-600 font-bold mb-1 text-xs">شعار اصلی کارخانه</label>
                    <input
                      type="text"
                      value={data.companyInfo.slogan}
                      onChange={(e) => updateCompanyInfo({ slogan: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-[#0F612F] outline-none text-xs font-bold text-[#0F612F]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 font-bold mb-1 text-xs">توضیح زیرشعار (Sub-Slogan)</label>
                    <input
                      type="text"
                      value={data.companyInfo.subSlogan}
                      onChange={(e) => updateCompanyInfo({ subSlogan: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-[#0F612F] outline-none text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 pb-2 border-b border-gray-100">
                  <Phone className="w-4 h-4 text-[#0F612F]" />
                  <span>راه‌های ارتباطی، تماس و آدرس کارخانه</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-gray-600 font-bold mb-1">تلفن کارخانه (نمایش عمومی)</label>
                    <input
                      type="text"
                      dir="ltr"
                      value={data.companyInfo.phone}
                      onChange={(e) => updateCompanyInfo({ phone: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-[#0F612F] outline-none font-mono text-left"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 font-bold mb-1">تلفن فروش مستقیم</label>
                    <input
                      type="text"
                      dir="ltr"
                      value={data.companyInfo.phoneDirect}
                      onChange={(e) => updateCompanyInfo({ phoneDirect: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-[#0F612F] outline-none font-mono text-left"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 font-bold mb-1">موبایل / پشتیبانی واتساپ</label>
                    <input
                      type="text"
                      dir="ltr"
                      value={data.companyInfo.mobileSupport}
                      onChange={(e) => updateCompanyInfo({ mobileSupport: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-[#0F612F] outline-none font-mono text-left"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 font-bold mb-1">ایمیل رسمی کارخانه</label>
                    <input
                      type="email"
                      dir="ltr"
                      value={data.companyInfo.email}
                      onChange={(e) => updateCompanyInfo({ email: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-[#0F612F] outline-none font-mono text-left"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 font-bold mb-1">کد پستی</label>
                    <input
                      type="text"
                      dir="ltr"
                      value={data.companyInfo.postalCode}
                      onChange={(e) => updateCompanyInfo({ postalCode: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-[#0F612F] outline-none font-mono text-left"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 font-bold mb-1">ساعات کاری مجموعه</label>
                    <input
                      type="text"
                      value={data.companyInfo.workingHours}
                      onChange={(e) => updateCompanyInfo({ workingHours: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-[#0F612F] outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-xs">
                  <div>
                    <label className="block text-gray-600 font-bold mb-1">نشانی دقیق پستی کارخانه</label>
                    <input
                      type="text"
                      value={data.companyInfo.address}
                      onChange={(e) => updateCompanyInfo({ address: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-[#0F612F] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-600 font-bold mb-1">لینک نقشه نشان (Neshan Map URL)</label>
                      <input
                        type="text"
                        dir="ltr"
                        value={data.companyInfo.neshanMapsUrl}
                        onChange={(e) => updateCompanyInfo({ neshanMapsUrl: e.target.value })}
                        className="w-full p-2 rounded-xl border border-gray-300 text-xs font-mono text-left"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 font-bold mb-1">لینک نقشه گوگل (Google Maps URL)</label>
                      <input
                        type="text"
                        dir="ltr"
                        value={data.companyInfo.googleMapsUrl}
                        onChange={(e) => updateCompanyInfo({ googleMapsUrl: e.target.value })}
                        className="w-full p-2 rounded-xl border border-gray-300 text-xs font-mono text-left"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: Services & Production Lines */}
          {/* ========================================================================= */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              {/* Service Selector */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {data.services.map((srv, idx) => (
                  <button
                    key={srv.id}
                    onClick={() => setSelectedServiceIndex(idx)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      selectedServiceIndex === idx
                        ? 'bg-[#0F612F] text-white shadow-md'
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <span>{srv.title}</span>
                  </button>
                ))}
              </div>

              {/* Edit Selected Service Form */}
              {data.services[selectedServiceIndex] && (
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4 text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-[#0F612F]" />
                      <span>ویرایش خط: {data.services[selectedServiceIndex].title}</span>
                    </h3>
                    <span className="font-mono text-gray-400">ID: {data.services[selectedServiceIndex].id}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-bold mb-1">عنوان خدمت</label>
                      <input
                        type="text"
                        value={data.services[selectedServiceIndex].title}
                        onChange={(e) => {
                          const updated = { ...data.services[selectedServiceIndex], title: e.target.value };
                          updateSingleService(updated);
                        }}
                        className="w-full p-2.5 rounded-xl border border-gray-300 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold mb-1">آدرس تصویر (Image URL)</label>
                      <input
                        type="text"
                        dir="ltr"
                        value={data.services[selectedServiceIndex].image}
                        onChange={(e) => {
                          const updated = { ...data.services[selectedServiceIndex], image: e.target.value };
                          updateSingleService(updated);
                        }}
                        className="w-full p-2.5 rounded-xl border border-gray-300 font-mono text-left"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-bold mb-1">توضیح کوتاه خلاصه</label>
                    <textarea
                      rows={2}
                      value={data.services[selectedServiceIndex].shortDescription}
                      onChange={(e) => {
                        const updated = { ...data.services[selectedServiceIndex], shortDescription: e.target.value };
                        updateSingleService(updated);
                      }}
                      className="w-full p-2.5 rounded-xl border border-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-bold mb-1">توضیحات کامل فنی و کاربردی</label>
                    <textarea
                      rows={4}
                      value={data.services[selectedServiceIndex].fullDescription}
                      onChange={(e) => {
                        const updated = { ...data.services[selectedServiceIndex], fullDescription: e.target.value };
                        updateSingleService(updated);
                      }}
                      className="w-full p-2.5 rounded-xl border border-gray-300"
                    />
                  </div>

                  {/* Arrays: capacities, features, equipmentList */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    <div>
                      <label className="block text-gray-700 font-bold mb-1">ظرفیت‌ها و تناژ (هر مورد در یک خط)</label>
                      <textarea
                        rows={5}
                        value={data.services[selectedServiceIndex].capacities.join('\n')}
                        onChange={(e) => {
                          const list = e.target.value.split('\n').filter((x) => x.trim() !== '');
                          const updated = { ...data.services[selectedServiceIndex], capacities: list };
                          updateSingleService(updated);
                        }}
                        className="w-full p-2.5 rounded-xl border border-gray-300 font-mono text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold mb-1">ویژگی‌های فنی و مزایا (هر مورد در یک خط)</label>
                      <textarea
                        rows={5}
                        value={data.services[selectedServiceIndex].features.join('\n')}
                        onChange={(e) => {
                          const list = e.target.value.split('\n').filter((x) => x.trim() !== '');
                          const updated = { ...data.services[selectedServiceIndex], features: list };
                          updateSingleService(updated);
                        }}
                        className="w-full p-2.5 rounded-xl border border-gray-300 font-mono text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold mb-1">تجهیزات و ماشین‌آلات (هر مورد در یک خط)</label>
                      <textarea
                        rows={5}
                        value={data.services[selectedServiceIndex].equipmentList.join('\n')}
                        onChange={(e) => {
                          const list = e.target.value.split('\n').filter((x) => x.trim() !== '');
                          const updated = { ...data.services[selectedServiceIndex], equipmentList: list };
                          updateSingleService(updated);
                        }}
                        className="w-full p-2.5 rounded-xl border border-gray-300 font-mono text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: 6-Stage Production Workflow */}
          {/* ========================================================================= */}
          {activeTab === 'workflow' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-xs text-emerald-900">
                در این بخش می‌توانید عناوین، توضیحات و آیکون‌های زنجیره ۶ مرحله‌ای تولید (از نقشه تا تحویل) را ویرایش فرمایید.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.integratedProcessSteps.map((step, index) => (
                  <div key={index} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-3 text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-[#0F612F] text-white flex items-center justify-center font-bold text-xs font-mono">
                          {step.step}
                        </span>
                        <span className="font-bold text-gray-900">مرحله {step.step}</span>
                      </div>
                      <select
                        value={step.icon}
                        onChange={(e) => {
                          const nextSteps = [...data.integratedProcessSteps];
                          nextSteps[index] = { ...nextSteps[index], icon: e.target.value };
                          updateIntegratedProcessSteps(nextSteps);
                        }}
                        className="p-1 rounded-lg border border-gray-300 text-xs font-mono"
                      >
                        <option value="FileText">FileText (بررسی نقشه)</option>
                        <option value="Cpu">Cpu (قالب‌سازی)</option>
                        <option value="Sparkles">Sparkles (برش لیزر)</option>
                        <option value="Cog">Cog (پرسکاری و تزریق)</option>
                        <option value="Layers">Layers (پوشش و تکمیلی)</option>
                        <option value="ShieldCheck">ShieldCheck (کنترل کیفیت)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-600 font-bold mb-1">عنوان مرحله</label>
                      <input
                        type="text"
                        value={step.title}
                        onChange={(e) => {
                          const nextSteps = [...data.integratedProcessSteps];
                          nextSteps[index] = { ...nextSteps[index], title: e.target.value };
                          updateIntegratedProcessSteps(nextSteps);
                        }}
                        className="w-full p-2 rounded-xl border border-gray-300 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-600 font-bold mb-1">توضیحات فرآیند</label>
                      <textarea
                        rows={3}
                        value={step.description}
                        onChange={(e) => {
                          const nextSteps = [...data.integratedProcessSteps];
                          nextSteps[index] = { ...nextSteps[index], description: e.target.value };
                          updateIntegratedProcessSteps(nextSteps);
                        }}
                        className="w-full p-2 rounded-xl border border-gray-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: Products & Portfolio */}
          {/* ========================================================================= */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#0F612F]" />
                  <span>مدیریت کاتالوگ قطعات و محصولات ({data.portfolioItems.length} قطعه)</span>
                </h3>
                <button
                  onClick={() => {
                    setEditingProduct({
                      id: 'custom_item_' + Date.now(),
                      title: 'قطعه جدید صنعتی',
                      category: 'stamping',
                      categoryLabel: 'پرسکاری سنگین',
                      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
                      description: 'توضیحات قطعه و ویژگی‌های ساختاری...',
                      material: 'فولاد آلیاژی / ورق روغنی ST14',
                      dimensions: 'سفارشی طبق نقشه',
                      application: 'صنعت خودروسازی و لوازم خانگی',
                      productionCapacity: '50,000 عدد در ماه',
                      tags: ['پرسکاری', 'سفارشی', 'تیراژ بالا']
                    });
                    setIsAddingNewProduct(true);
                  }}
                  className="bg-[#0F612F] hover:bg-[#0c4e26] text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4 text-[#DECA19]" />
                  <span>افزودن قطعه جدید</span>
                </button>
              </div>

              {/* Add / Edit Product Modal Form */}
              {editingProduct && (
                <div className="bg-white p-5 rounded-2xl border-2 border-[#0F612F] shadow-lg space-y-4 text-xs animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                    <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#DECA19]" />
                      <span>{isAddingNewProduct ? 'افزودن قطعه جدید به کاتالوگ' : `ویرایش قطعه: ${editingProduct.title}`}</span>
                    </h4>
                    <button
                      onClick={() => {
                        setEditingProduct(null);
                        setIsAddingNewProduct(false);
                      }}
                      className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-700 font-bold mb-1">نام قطعه</label>
                      <input
                        type="text"
                        value={editingProduct.title}
                        onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                        className="w-full p-2 rounded-xl border border-gray-300 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold mb-1">دسته‌بندی فرآیند</label>
                      <select
                        value={editingProduct.category}
                        onChange={(e) => {
                          const cat = e.target.value as ServiceCategory;
                          const labels: Record<ServiceCategory, string> = {
                            stamping: 'پرسکاری سنگین',
                            mold_making: 'طراحی و ساخت قالب',
                            plastic_injection: 'تزریق پلاستیک',
                            laser_cutting: 'برش دقیق لیزر'
                          };
                          setEditingProduct({ 
                            ...editingProduct, 
                            category: cat,
                            categoryLabel: labels[cat] || 'قطعات صنعتی'
                          });
                        }}
                        className="w-full p-2 rounded-xl border border-gray-300"
                      >
                        <option value="stamping">پرسکاری سبک و سنگین (Stamping)</option>
                        <option value="mold_making">طراحی و ساخت قالب (Mold Making)</option>
                        <option value="plastic_injection">تزریق پلاستیک (Plastic Injection)</option>
                        <option value="laser_cutting">برش لیزر فایبر (Laser Cutting)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold mb-1">جنس متریال</label>
                      <input
                        type="text"
                        value={editingProduct.material}
                        onChange={(e) => setEditingProduct({ ...editingProduct, material: e.target.value })}
                        className="w-full p-2 rounded-xl border border-gray-300"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold mb-1">ابعاد و مشخصات ابعادی</label>
                      <input
                        type="text"
                        value={editingProduct.dimensions}
                        onChange={(e) => setEditingProduct({ ...editingProduct, dimensions: e.target.value })}
                        className="w-full p-2 rounded-xl border border-gray-300"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold mb-1">کاربرد صنعتی قطعه</label>
                      <input
                        type="text"
                        value={editingProduct.application}
                        onChange={(e) => setEditingProduct({ ...editingProduct, application: e.target.value })}
                        className="w-full p-2 rounded-xl border border-gray-300"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold mb-1">ظرفیت تولید ماهانه</label>
                      <input
                        type="text"
                        value={editingProduct.productionCapacity}
                        onChange={(e) => setEditingProduct({ ...editingProduct, productionCapacity: e.target.value })}
                        className="w-full p-2 rounded-xl border border-gray-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-bold mb-1">آدرس تصویر قطعه (Image URL)</label>
                    <input
                      type="text"
                      dir="ltr"
                      value={editingProduct.image}
                      onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                      className="w-full p-2 rounded-xl border border-gray-300 font-mono text-left"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-bold mb-1">توضیحات کامل و ویژگی‌های کیفی</label>
                    <textarea
                      rows={3}
                      value={editingProduct.description}
                      onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                      className="w-full p-2 rounded-xl border border-gray-300"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProduct(null);
                        setIsAddingNewProduct(false);
                      }}
                      className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      انصراف
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (isAddingNewProduct) {
                          addPortfolioItem(editingProduct);
                          showToast('قطعه جدید با موفقیت اضافه گردید.');
                        } else {
                          const updatedList = data.portfolioItems.map((item) =>
                            item.id === editingProduct.id ? editingProduct : item
                          );
                          updatePortfolioItems(updatedList);
                          showToast('اطلاعات قطعه با موفقیت به‌روزرسانی شد.');
                        }
                        setEditingProduct(null);
                        setIsAddingNewProduct(false);
                      }}
                      className="bg-[#0F612F] hover:bg-[#0c4e26] text-white px-5 py-2 rounded-xl font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Check className="w-4 h-4 text-[#DECA19]" />
                      <span>ثبت و تأیید قطعه</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Product Grid List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.portfolioItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs flex flex-col justify-between text-xs">
                    <div>
                      <div className="h-36 relative bg-gray-100 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-2 right-2 bg-black/70 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                          {item.categoryLabel}
                        </span>
                      </div>
                      <div className="p-4 space-y-2">
                        <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{item.title}</h4>
                        <p className="text-gray-500 line-clamp-2 leading-relaxed">{item.description}</p>
                        <div className="pt-2 border-t border-gray-100 text-[11px] text-gray-600 space-y-1">
                          <div><strong>متریال:</strong> {item.material}</div>
                          <div><strong>کاربرد:</strong> {item.application}</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setEditingProduct(item);
                          setIsAddingNewProduct(false);
                        }}
                        className="text-[#0F612F] hover:text-[#0c4e26] font-bold cursor-pointer"
                      >
                        ویرایش مشخصات
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`آیا از حذف قطعه «${item.title}» مطمئن هستید؟`)) {
                            deletePortfolioItem(item.id);
                            showToast(`قطعه «${item.title}» حذف شد.`);
                          }
                        }}
                        className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                        title="حذف قطعه"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: Partners & Clients */}
          {/* ========================================================================= */}
          {activeTab === 'partners' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <Handshake className="w-4 h-4 text-[#0F612F]" />
                  <span>مدیریت شرکای تجاری و مشتریان کارخانه ({data.partners.length} برند)</span>
                </h3>
                <button
                  onClick={() => setShowAddPartnerForm(true)}
                  className="bg-[#0F612F] hover:bg-[#0c4e26] text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4 text-[#DECA19]" />
                  <span>افزودن مشتری جدید</span>
                </button>
              </div>

              {/* Add Partner Form */}
              {showAddPartnerForm && (
                <div className="bg-white p-5 rounded-2xl border-2 border-[#0F612F] shadow-lg space-y-4 text-xs animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                    <h4 className="font-bold text-gray-900 text-sm">افزودن برند همکار جدید</h4>
                    <button onClick={() => setShowAddPartnerForm(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-gray-700 font-bold mb-1">نام شرکت (فارسی)</label>
                      <input
                        type="text"
                        value={newPartner.name || ''}
                        onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                        placeholder="مثلاً ساپکو"
                        className="w-full p-2 rounded-xl border border-gray-300 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold mb-1">نام لاتین (Latin Name)</label>
                      <input
                        type="text"
                        dir="ltr"
                        value={newPartner.latinName || ''}
                        onChange={(e) => setNewPartner({ ...newPartner, latinName: e.target.value })}
                        placeholder="SAPCO"
                        className="w-full p-2 rounded-xl border border-gray-300 font-mono text-left"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold mb-1">حوزه فعالیت</label>
                      <input
                        type="text"
                        value={newPartner.sector || ''}
                        onChange={(e) => setNewPartner({ ...newPartner, sector: e.target.value })}
                        placeholder="خودروسازی / لوازم خانگی"
                        className="w-full p-2 rounded-xl border border-gray-300"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold mb-1">نوع همکاری و تامین</label>
                      <input
                        type="text"
                        value={newPartner.cooperationType || ''}
                        onChange={(e) => setNewPartner({ ...newPartner, cooperationType: e.target.value })}
                        placeholder="تولید مجموعه‌ها و قطعات پرسی"
                        className="w-full p-2 rounded-xl border border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setShowAddPartnerForm(false)}
                      className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      انصراف
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!newPartner.name) {
                          alert('لطفاً نام شرکت را وارد نمایید.');
                          return;
                        }
                        const item: PartnerCompany = {
                          id: 'partner_' + Date.now(),
                          name: newPartner.name || '',
                          latinName: newPartner.latinName || '',
                          sector: newPartner.sector || 'صنعت',
                          cooperationType: newPartner.cooperationType || 'تولید قطعات صنعتی'
                        };
                        addPartner(item);
                        setShowAddPartnerForm(false);
                        setNewPartner({ name: '', latinName: '', sector: 'خودروسازی', cooperationType: 'تولید مجموعه‌ها و قطعات پرسی' });
                        showToast(`مشتری «${item.name}» با موفقیت افزوده شد.`);
                      }}
                      className="bg-[#0F612F] hover:bg-[#0c4e26] text-white px-5 py-2 rounded-xl font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Check className="w-4 h-4 text-[#DECA19]" />
                      <span>افزودن همکار</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Partners Table */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
                <table className="w-full text-right text-xs">
                  <thead className="bg-[#0F612F]/10 text-gray-800 font-bold border-b border-gray-200">
                    <tr>
                      <th className="p-3">نام شرکت</th>
                      <th className="p-3">نام لاتین</th>
                      <th className="p-3">بخش صنعت</th>
                      <th className="p-3">نوع همکاری و محصولات</th>
                      <th className="p-3 text-center">عملیات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data.partners.map((partner, index) => (
                      <tr key={partner.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-bold text-gray-900">{partner.name}</td>
                        <td className="p-3 font-mono text-gray-500 text-left" dir="ltr">{partner.latinName}</td>
                        <td className="p-3">
                          <span className="bg-emerald-100 text-[#0F612F] px-2 py-0.5 rounded-md font-bold text-[11px]">
                            {partner.sector}
                          </span>
                        </td>
                        <td className="p-3 text-gray-600">{partner.cooperationType}</td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => {
                              if (window.confirm(`آیا از حذف مشتری «${partner.name}» اطمینان دارید؟`)) {
                                deletePartner(partner.id);
                                showToast(`مشتری «${partner.name}» حذف شد.`);
                              }
                            }}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 6: Stats & Timeline */}
          {/* ========================================================================= */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 pb-2 border-b border-gray-100">
                  <BarChart3 className="w-4 h-4 text-[#0F612F]" />
                  <span>آمار و شاخص‌های کلیدی کارخانه (Stats Counter)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  {data.stats.map((stat, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl border border-gray-200 bg-gray-50 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-700">شاخص {idx + 1}</span>
                        <input
                          type="text"
                          dir="ltr"
                          value={stat.value}
                          onChange={(e) => {
                            const nextStats = [...data.stats];
                            nextStats[idx] = { ...nextStats[idx], value: e.target.value };
                            updateStats(nextStats);
                          }}
                          className="w-20 p-1 text-center font-bold text-[#0F612F] bg-white rounded border border-gray-300 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-gray-500 mb-0.5">عنوان شاخص</label>
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) => {
                            const nextStats = [...data.stats];
                            nextStats[idx] = { ...nextStats[idx], label: e.target.value };
                            updateStats(nextStats);
                          }}
                          className="w-full p-1.5 text-xs font-bold bg-white rounded border border-gray-300"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-gray-500 mb-0.5">توضیح زیرین</label>
                        <input
                          type="text"
                          value={stat.sublabel}
                          onChange={(e) => {
                            const nextStats = [...data.stats];
                            nextStats[idx] = { ...nextStats[idx], sublabel: e.target.value };
                            updateStats(nextStats);
                          }}
                          className="w-full p-1.5 text-xs bg-white rounded border border-gray-300 text-gray-600"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Bar */}
        <div className="bg-gray-100 p-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-gray-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>وضعیت: آماده و متصل به سیستم دیتابیس پایدار cPanel</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              بستن پنجره
            </button>
            <button
              onClick={handleGlobalSave}
              disabled={isSavingLocal}
              className="bg-[#0F612F] hover:bg-[#0c4e26] text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4 text-[#DECA19]" />
              <span>ذخیره نهایی در دیتابیس</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
