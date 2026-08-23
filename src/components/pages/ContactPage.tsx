import React, { useState } from 'react';
import { PageId } from '../../types';
import { useData } from '../../context/DataContext';
import { FAQS } from '../../data/mockData';
import { RubikaIcon } from '../RubikaIcon';
import { MessengerIconRenderer } from '../MessengerIconRenderer';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  MessageSquare, 
  FileText, 
  HelpCircle, 
  ChevronDown, 
  Building2, 
  UploadCloud,
  Navigation,
  ExternalLink,
  Copy,
  Share2
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { data, submitContactMessage } = useData();
  const companyInfo = data?.companyInfo || {};

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [serviceInterest, setServiceInterest] = useState<string>('general');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const messengersConfig = data?.messengersConfig || {
    badge: 'پیام‌رسان‌ها و ارتباط مستقیم',
    title: 'استعلام سریع، مشاوره فنی و ارسال فایل',
    description: 'جهت گفتگوی آنلاین و تبادل نقشه، از طریق درگاه‌های پیام‌رسان زیر با شماره متصل اقدام فرمایید:',
    connectedPhone: companyInfo.mobileSupport || '09103176904',
  };

  const onlineMessengers = (data?.onlineMessengers && data.onlineMessengers.length > 0)
    ? data.onlineMessengers.filter((m) => m.isActive !== false)
    : [];

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(messengersConfig.connectedPhone || companyInfo.mobileSupport || '09103176904');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('companyName', companyName);
    formData.append('serviceInterest', serviceInterest);
    formData.append('subject', subject || 'درخواست استعلام فنی و ساخت');
    formData.append('message', message);
    if (selectedFile) {
      formData.append('attachment', selectedFile);
      formData.append('file', selectedFile);
    }

    try {
      const result = await submitContactMessage(formData);
      if (result.success) {
        setTrackingCode(result.trackingCode || 'MSG-' + Math.floor(100000 + Math.random() * 900000));
        setSubmitted(true);
      } else {
        setSubmitError(result.message || 'خطا در ارسال پیام. لطفاً مجدداً تلاش فرمایید.');
      }
    } catch (err) {
      setSubmitError('خطایی در ارتباط با سرور رخ داد.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div id="contact-page-container" className="space-y-6 sm:space-y-16 lg:space-y-20 pb-8 sm:pb-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#0a2315] to-[#0c1a11] text-white py-6 sm:py-18 px-3 sm:px-4 border-b-4 border-[#DECA19] relative">
        <div className="max-w-7xl mx-auto text-right">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#DECA19]/15 text-[#DECA19] px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold border border-[#DECA19]/30 mb-2 sm:mb-3">
            <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>راه‌های ارتباطی و آدرس</span>
          </div>
          <h1 className="text-xl sm:text-4xl font-black text-white mb-2 sm:mb-3">
            تماس با کارخانه <span className="text-[#DECA19]">{companyInfo.name}</span>
          </h1>
          <div className="w-16 sm:w-24 h-0.5 sm:h-1 bg-[#DECA19] rounded-full mb-2.5 sm:mb-4" />
          <p className="text-[11px] sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
            مشاوره فنی، ارسال نقشه و فایل‌های CAD، استعلام قیمت پرسکاری تا <span className="en-num font-bold">400</span> تن، تزریق پلاستیک و هماهنگی بازدید حضوری از خطوط تولید
          </p>
        </div>
      </section>

      {/* Main Contact Grid (Cards + Form) */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-10">
          
          {/* Left Column: Contact Details Cards & Map */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6 text-right">
            
            <div className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-6 border border-gray-200 shadow-xs sm:shadow-sm space-y-3 sm:space-y-6">
              <h3 className="text-sm sm:text-base font-black text-gray-900 pb-2 sm:pb-3 border-b border-gray-100 flex items-center gap-1.5 sm:gap-2">
                <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#0F612F]" />
                <span>اطلاعات دفتر و سالن تولید</span>
              </h3>

              <div className="space-y-2.5 sm:space-y-4 text-[11px] sm:text-xs">
                
                {/* Address */}
                <div className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3.5 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-100">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-50 text-[#0F612F] flex items-center justify-center shrink-0 border border-[#0F612F]/20">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <strong className="block text-gray-900 mb-0.5 text-xs sm:text-xs">آدرس کارخانه:</strong>
                    <p className="text-gray-600 leading-relaxed">{companyInfo.address}</p>
                    <span className="text-[10px] sm:text-[11px] text-gray-400 mt-0.5 sm:mt-1 block">کد پستی: <span className="en-num font-mono">{companyInfo.postalCode}</span></span>
                  </div>
                </div>

                {/* Phones */}
                <div className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3.5 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-100">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-50 text-[#0F612F] flex items-center justify-center shrink-0 border border-[#0F612F]/20">
                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <strong className="block text-gray-900 mb-0.5 text-xs sm:text-xs">شماره‌های تماس:</strong>
                    <p className="text-gray-700">تلفن کارخانه: <span className="en-num font-bold text-gray-900 dir-ltr">{companyInfo.phone}</span></p>
                    <p className="text-gray-700 mt-0.5 sm:mt-1">واحد مهندسی و فروش: <span className="en-num font-bold text-gray-900 dir-ltr">{companyInfo.phoneDirect}</span></p>
                    <p className="text-gray-700 mt-0.5 sm:mt-1">پشتیبانی و واتساپ: <span className="en-num font-bold text-[#0F612F] dir-ltr">{companyInfo.mobileSupport}</span></p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3.5 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-100">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-50 text-[#0F612F] flex items-center justify-center shrink-0 border border-[#0F612F]/20">
                    <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <strong className="block text-gray-900 mb-0.5 text-xs sm:text-xs">پست الکترونیک (ایمیل):</strong>
                    <p className="text-gray-700 en-num">{companyInfo.email}</p>
                    <p className="text-gray-700 en-num mt-0.5 sm:mt-1">{companyInfo.emailSales}</p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3.5 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-100">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-50 text-[#0F612F] flex items-center justify-center shrink-0 border border-[#0F612F]/20">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <strong className="block text-gray-900 mb-0.5 text-xs sm:text-xs">ساعات فعالیت و پذیرش:</strong>
                    <p className="text-gray-600 leading-relaxed"><span className="en-num">{companyInfo.workingHours}</span></p>
                  </div>
                </div>

              </div>
            </div>

            {/* Interactive Map Box Container with Neshan Map Embed */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-6 border border-gray-200 shadow-xs sm:shadow-sm space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-black text-gray-900 flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0F612F]" />
                  <span>موقعیت مکانی روی نقشه</span>
                </h3>
                <a
                  href={companyInfo.neshanMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-[#0F612F] hover:text-[#0c4e26] transition-colors"
                >
                  <span>مسیریابی با نشان</span>
                  <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </a>
              </div>

              {/* Neshan Map Embed iFrame */}
              <div className="relative w-full h-44 sm:h-72 rounded-lg sm:rounded-xl overflow-hidden border border-gray-300 shadow-xs sm:shadow-sm bg-gray-100">
                <iframe
                  title="موقعیت شرکت رسا قطعه گستر مهر در نقشه نشان"
                  src={companyInfo.neshanMapsEmbedUrl}
                  className="w-full h-full border-0"
                  allowFullScreen={true}
                  loading="lazy"
                />
              </div>

              <div className="flex items-center justify-between bg-emerald-50/70 border border-[#0F612F]/20 rounded-lg sm:rounded-xl p-2.5 sm:p-3 text-[11px] sm:text-xs text-gray-700">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0F612F] shrink-0" />
                  <span className="font-semibold text-gray-900 truncate max-w-[120px] sm:max-w-none">{companyInfo.name}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <a
                    href={companyInfo.neshanMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#0F612F] hover:bg-[#0c4e26] text-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all shadow-xs shrink-0 flex items-center gap-1 cursor-pointer"
                  >
                    <Navigation className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#DECA19]" />
                    <span>مسیریابی</span>
                  </a>
                  <a
                    href={companyInfo.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg text-[10px] font-medium transition-all shrink-0 hidden sm:inline-flex items-center gap-1"
                    title="مسیریابی در گوگل مپ"
                  >
                    <span>گوگل مپ</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-10 border border-gray-200 shadow-xs sm:shadow-md text-right">
              
              <div className="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-100">
                <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-[#0F612F] bg-emerald-50 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-md border border-[#0F612F]/20 mb-1.5 sm:mb-2">
                  <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>فرم ارسال پیام و درخواست مشاوره</span>
                </div>
                <h2 className="text-base sm:text-2xl font-black text-gray-900">
                  ارسال پیام به واحد مهندسی و فروش
                </h2>
                <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">
                  پیام شما مستقیماً توسط مدیران فنی رسا قطعه گستر مهر بررسی و پاسخ داده می‌شود.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-6 sm:py-10 space-y-3 sm:space-y-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-100 text-[#0F612F] rounded-full flex items-center justify-center mx-auto border-2 border-[#DECA19]">
                    <CheckCircle className="w-7 h-7 sm:w-10 sm:h-10 text-[#0F612F]" />
                  </div>
                  <h3 className="text-base sm:text-xl font-bold text-gray-900">پیام شما با موفقیت ارسال شد</h3>
                  <p className="text-[11px] sm:text-sm text-gray-600 max-w-md mx-auto">
                    از پیام شما سپاسگزاریم. کارشناسان ما در سریع‌ترین زمان با شما تماس خواهند گرفت.
                  </p>
                  
                  <div className="inline-block bg-gray-50 border border-gray-200 rounded-xl p-3 sm:p-4 my-1.5 sm:my-2 text-center">
                    <span className="text-[10px] sm:text-xs text-gray-500 block mb-0.5 sm:mb-1">کد رهگیری پیام شما:</span>
                    <span className="text-base sm:text-lg font-black en-num text-[#0F612F] tracking-wider">{trackingCode}</span>
                  </div>

                  <div className="pt-2 sm:pt-4">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFullName('');
                        setPhone('');
                        setEmail('');
                        setCompanyName('');
                        setServiceInterest('general');
                        setSubject('');
                        setMessage('');
                        setSelectedFile(null);
                      }}
                      className="bg-[#0F612F] text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs font-bold shadow-md hover:bg-[#0c4e26] transition-colors cursor-pointer"
                    >
                      ارسال پیام جدید
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 text-right">
                  
                  {submitError && (
                    <div className="p-2.5 sm:p-3 bg-red-50 border border-red-200 text-red-700 text-[11px] sm:text-xs rounded-xl flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Row 1: Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold text-gray-700 mb-1">
                        نام و نام خانوادگی <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="مثال: مهندس احمدی"
                        className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#0F612F] focus:border-[#0F612F] outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold text-gray-700 mb-1">
                        شماره تماس همراه / ثابت <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="09123456789"
                        className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#0F612F] focus:border-[#0F612F] outline-none en-num dir-ltr text-right transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Company & Service Interest */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold text-gray-700 mb-1">
                        نام شرکت / واحد صنعتی (اختیاری)
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="مثال: صنایع خودرویی پیشتاز"
                        className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#0F612F] focus:border-[#0F612F] outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold text-gray-700 mb-1">
                        دپارتمان یا خدمت مورد نظر
                      </label>
                      <select
                        value={serviceInterest}
                        onChange={(e) => setServiceInterest(e.target.value)}
                        className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#0F612F] focus:border-[#0F612F] outline-none bg-white text-gray-800 transition-all cursor-pointer"
                      >
                        <option value="general">استعلام عمومی / مشاوره فنی</option>
                        <option value="mold_making">طراحی و ساخت قالب سنبه‌ماتریس و پروگرسیو</option>
                        <option value="stamping">پرسکاری، کشش عمیق و برشکاری ورق</option>
                        <option value="plastic_injection">تزریق پلاستیک قطعات صنعتی و مهندسی</option>
                        <option value="cad_cam">مهندسی معکوس و نقشه‌کشی صنعتی CAD/CAM</option>
                        <option value="maintenance">تعمیرات، نگهداری و اصلاح قالب</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Email & Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold text-gray-700 mb-1">
                        آدرس ایمیل
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#0F612F] focus:border-[#0F612F] outline-none en-num dir-ltr text-right transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold text-gray-700 mb-1">
                        موضوع پیام <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="مثال: استعلام ساخت قالب پروگرسیو براکت"
                        className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#0F612F] focus:border-[#0F612F] outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Tip note regarding sending files and drawings via messengers */}
                  <div className="bg-emerald-50/80 border border-[#0F612F]/20 rounded-xl p-3 sm:p-3.5 flex items-start gap-2.5 sm:gap-3 text-right">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#0F612F]/10 text-[#0F612F] flex items-center justify-center shrink-0 border border-[#0F612F]/20 mt-0.5">
                      <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0F612F]" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[11px] sm:text-xs font-bold text-gray-900 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#DECA19]"></span>
                        <span>نکته مهم در خصوص ارسال فایل، نقشه یا تصویر:</span>
                      </h4>
                      <p className="text-[10px] sm:text-xs text-gray-600 leading-relaxed font-normal">
                        در صورتی که قصد ارسال نقشه‌های فنی (CAD/CAM/DWG/STEP)، اسناد PDF یا تصویر قطعه را دارید، لطفاً فایل‌های خود را از طریق پیام‌رسان‌های <strong className="text-[#0F612F] font-bold">واتساپ، ایتا، روبیکا یا تلگرام</strong> به شماره پشتیبانی <span className="en-num font-bold text-[#0F612F] dir-ltr font-mono">{companyInfo.mobileSupport || '09103176904'}</span> ارسال فرمایید.
                      </p>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold text-gray-700 mb-1">
                      متن پیام و مشخصات استعلام <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="متن پیام، تیراژ پیش‌بینی شده، جنس ورق یا پلیمر و الزامات ساخت..."
                      className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#0F612F] focus:border-[#0F612F] outline-none transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
                    <span className="text-[10px] sm:text-[11px] text-gray-400">پاسخگویی سریع ظرف کمتر از <span className="en-num font-bold">24</span> ساعت کاری</span>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-[#0F612F] hover:bg-[#0c4e26] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all border border-[#DECA19]/40 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>در حال ارسال...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#DECA19]" />
                          <span>ارسال نهایی پیام</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </div>

            {/* Social Messengers & Fast Communication Channels */}
            <div id="online-messengers-card" className="mt-4 sm:mt-6 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-gray-200 shadow-xs sm:shadow-sm text-right space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 pb-2.5 sm:pb-3.5 border-b border-gray-100">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-[#0F612F] bg-emerald-50 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-md border border-[#0F612F]/20 mb-1">
                    <Share2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#0F612F]" />
                    <span>{messengersConfig.badge}</span>
                  </div>
                  <h3 className="text-sm sm:text-lg font-black text-gray-900">
                    {messengersConfig.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 font-light">
                    {messengersConfig.description}
                  </p>
                </div>

                {/* Quick Phone Copy Badge */}
                <div className="flex items-center gap-2 bg-[#F8FAF9] px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl border border-gray-200/80 self-start sm:self-center shrink-0">
                  <div className="text-right">
                    <span className="text-[9px] sm:text-[10px] text-gray-400 block font-light">شماره متصل:</span>
                    <span className="text-[11px] sm:text-xs font-black en-num font-mono text-[#0F612F] dir-ltr">{messengersConfig.connectedPhone}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-white hover:bg-emerald-50 text-[#0F612F] border border-gray-200 hover:border-[#0F612F]/40 text-[10px] sm:text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                    title="کپی شماره تماس"
                  >
                    {copiedPhone ? (
                      <>
                        <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600" />
                        <span className="text-[10px] sm:text-[11px] text-emerald-700 font-bold">کپی شد</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#0F612F]" />
                        <span className="text-[10px] sm:text-[11px]">کپی</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Dynamic Messengers Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-3">
                {onlineMessengers.map((item) => (
                  <a
                    key={item.id}
                    href={item.link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-gray-200 hover:border-[#0F612F] bg-[#FAFCFA] hover:bg-white transition-all shadow-2xs hover:shadow-md flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-2xl bg-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-gray-200 shadow-2xs p-1">
                        <MessengerIconRenderer iconType={item.icon} className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1 flex-wrap">
                          <h4 className="text-[11px] sm:text-sm font-black text-gray-900 group-hover:text-[#0F612F] transition-colors truncate">{item.name}</h4>
                          {item.tag && (
                            <span className="text-[8px] sm:text-[10px] bg-emerald-100 text-[#0F612F] px-1 py-0.2 rounded font-bold hidden sm:inline-block">
                              {item.tag}
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-[9px] sm:text-[11px] text-gray-500 leading-tight mt-0.5 font-light hidden sm:block truncate">
                            {item.description}
                          </p>
                        )}
                        {item.phone && (
                          <span className="text-[9px] sm:text-[11px] font-mono text-gray-800 font-bold en-num dir-ltr block mt-0.5">
                            {item.phone}
                          </span>
                        )}
                      </div>
                    </div>
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-[#0F612F] transition-colors shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 text-right">
        <div className="text-center mb-4 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-[#0F612F] bg-emerald-50 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-[#0F612F]/20 mb-1.5 sm:mb-2">
            <HelpCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#0F612F]" />
            <span>پاسخ به پرسش‌های پرتکرار</span>
          </div>
          <h3 className="text-base sm:text-2xl font-black text-gray-900">
            سوالات متداول مشتریان و همکاران صنعتی
          </h3>
          <div className="w-12 sm:w-16 h-0.5 sm:h-1 bg-[#DECA19] mx-auto mt-1.5 sm:mt-2 rounded-full" />
        </div>

        <div className="space-y-2 sm:space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden transition-all shadow-2xs sm:shadow-xs"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-3 sm:p-5 flex items-center justify-between text-right font-bold text-xs sm:text-sm text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5 sm:gap-2">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#DECA19]" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-[#0F612F]' : ''}`} />
                </button>

                {isOpen && (
                  <div className="p-3 sm:p-5 pt-0 text-[11px] sm:text-xs text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
