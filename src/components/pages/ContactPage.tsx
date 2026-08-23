import React, { useState } from 'react';
import { PageId } from '../../types';
import { useData } from '../../context/DataContext';
import { FAQS } from '../../data/mockData';
import { RubikaIcon } from '../RubikaIcon';
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
  const { data } = useData();
  const companyInfo = data?.companyInfo || {};

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(companyInfo.mobileSupport);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = 'MSG-' + Math.floor(100000 + Math.random() * 900000);
    setTrackingCode(code);
    setSubmitted(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div id="contact-page-container" className="space-y-16 lg:space-y-20 pb-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#0a2315] to-[#0c1a11] text-white py-14 sm:py-18 px-4 border-b-4 border-[#DECA19] relative">
        <div className="max-w-7xl mx-auto text-right">
          <div className="inline-flex items-center gap-2 bg-[#DECA19]/15 text-[#DECA19] px-3.5 py-1 rounded-full text-xs font-bold border border-[#DECA19]/30 mb-3">
            <Phone className="w-3.5 h-3.5" />
            <span>راه‌های ارتباطی و آدرس</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white mb-3">
            تماس با کارخانه <span className="text-[#DECA19]">{companyInfo.name}</span>
          </h1>
          <div className="w-24 h-1 bg-[#DECA19] rounded-full mb-4" />
          <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
            مشاوره فنی، ارسال نقشه و فایل‌های CAD، استعلام قیمت پرسکاری تا <span className="en-num font-bold">400</span> تن، تزریق پلاستیک و هماهنگی بازدید حضوری از خطوط تولید
          </p>
        </div>
      </section>

      {/* Main Contact Grid (Cards + Form) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Contact Details Cards & Map */}
          <div className="lg:col-span-5 space-y-6 text-right">
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
              <h3 className="text-base font-black text-gray-900 pb-3 border-b border-gray-100 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#0F612F]" />
                <span>اطلاعات دفتر و سالن تولید</span>
              </h3>

              <div className="space-y-4 text-xs">
                
                {/* Address */}
                <div className="flex items-start gap-3 p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0F612F] flex items-center justify-center shrink-0 border border-[#0F612F]/20">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-gray-900 mb-0.5">آدرس کارخانه:</strong>
                    <p className="text-gray-600 leading-relaxed">{companyInfo.address}</p>
                    <span className="text-[11px] text-gray-400 mt-1 block">کد پستی: <span className="en-num font-mono">{companyInfo.postalCode}</span></span>
                  </div>
                </div>

                {/* Phones */}
                <div className="flex items-start gap-3 p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0F612F] flex items-center justify-center shrink-0 border border-[#0F612F]/20">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-gray-900 mb-0.5">شماره‌های تماس:</strong>
                    <p className="text-gray-700">تلفن کارخانه: <span className="en-num font-bold text-gray-900 dir-ltr">{companyInfo.phone}</span></p>
                    <p className="text-gray-700 mt-1">واحد مهندسی و فروش: <span className="en-num font-bold text-gray-900 dir-ltr">{companyInfo.phoneDirect}</span></p>
                    <p className="text-gray-700 mt-1">پشتیبانی و واتساپ: <span className="en-num font-bold text-[#0F612F] dir-ltr">{companyInfo.mobileSupport}</span></p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3 p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0F612F] flex items-center justify-center shrink-0 border border-[#0F612F]/20">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-gray-900 mb-0.5">پست الکترونیک (ایمیل):</strong>
                    <p className="text-gray-700 en-num">{companyInfo.email}</p>
                    <p className="text-gray-700 en-num mt-1">{companyInfo.emailSales}</p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3 p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0F612F] flex items-center justify-center shrink-0 border border-[#0F612F]/20">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-gray-900 mb-0.5">ساعات فعالیت و پذیرش:</strong>
                    <p className="text-gray-600 leading-relaxed"><span className="en-num">{companyInfo.workingHours}</span></p>
                  </div>
                </div>

              </div>
            </div>

            {/* Interactive Map Box Container with Neshan Map Embed */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-gray-900 flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-[#0F612F]" />
                  <span>موقعیت مکانی روی نقشه</span>
                </h3>
                <a
                  href={companyInfo.neshanMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0F612F] hover:text-[#0c4e26] transition-colors"
                >
                  <span>مسیریابی در نقشه نشان</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Neshan Map Embed iFrame */}
              <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden border border-gray-300 shadow-sm bg-gray-100">
                <iframe
                  title="موقعیت شرکت رسا قطعه گستر مهر در نقشه نشان"
                  src={companyInfo.neshanMapsEmbedUrl}
                  className="w-full h-full border-0"
                  allowFullScreen={true}
                  loading="lazy"
                />
              </div>

              <div className="flex items-center justify-between bg-emerald-50/70 border border-[#0F612F]/20 rounded-xl p-3 text-xs text-gray-700">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#0F612F] shrink-0" />
                  <span className="font-semibold text-gray-900">{companyInfo.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={companyInfo.neshanMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#0F612F] hover:bg-[#0c4e26] text-white px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all shadow-xs shrink-0 flex items-center gap-1 cursor-pointer"
                  >
                    <Navigation className="w-3 h-3 text-[#DECA19]" />
                    <span>مسیریابی با نشان</span>
                  </a>
                  <a
                    href={companyInfo.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1.5 rounded-lg text-[10px] font-medium transition-all shrink-0 hidden sm:inline-flex items-center gap-1"
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
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-md text-right">
              
              <div className="mb-6 pb-4 border-b border-gray-100">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0F612F] bg-emerald-50 px-3 py-1 rounded-md border border-[#0F612F]/20 mb-2">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>فرم ارسال پیام و درخواست مشاوره</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                  ارسال پیام به واحد مهندسی و فروش
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  پیام شما مستقیماً توسط مدیران فنی رسا قطعه گستر مهر بررسی و پاسخ داده می‌شود.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-[#0F612F] rounded-full flex items-center justify-center mx-auto border-2 border-[#DECA19]">
                    <CheckCircle className="w-10 h-10 text-[#0F612F]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">پیام شما با موفقیت ارسال شد</h3>
                  <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
                    از پیام شما سپاسگزاریم. کارشناسان ما در سریع‌ترین زمان با شما تماس خواهند گرفت.
                  </p>
                  
                  <div className="inline-block bg-gray-50 border border-gray-200 rounded-xl p-4 my-2 text-center">
                    <span className="text-xs text-gray-500 block mb-1">کد رهگیری پیام شما:</span>
                    <span className="text-lg font-black en-num text-[#0F612F] tracking-wider">{trackingCode}</span>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFullName('');
                        setPhone('');
                        setEmail('');
                        setSubject('');
                        setMessage('');
                        setFileName(null);
                      }}
                      className="bg-[#0F612F] text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-md hover:bg-[#0c4e26] transition-colors cursor-pointer"
                    >
                      ارسال پیام جدید
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-right">
                  
                  {/* Row 1: Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        نام و نام خانوادگی <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="نام شما"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0F612F] focus:border-[#0F612F] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        شماره تماس همراه / ثابت <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="09123456789"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0F612F] focus:border-[#0F612F] outline-none en-num dir-ltr text-right"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email & Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        آدرس ایمیل
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0F612F] focus:border-[#0F612F] outline-none en-num dir-ltr text-right"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        موضوع پیام <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="مثال: استعلام ساخت قالب پروگرسیو"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0F612F] focus:border-[#0F612F] outline-none"
                      />
                    </div>
                  </div>

                  {/* Attachment */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      پیوست نقشه فنی یا تصویر قطعه (اختیاری):
                    </label>
                    <label className="border-2 border-dashed border-gray-200 hover:border-[#0F612F] rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition-colors bg-gray-50/50">
                      <UploadCloud className="w-5 h-5 text-gray-400 mb-1" />
                      <span className="text-xs text-gray-600 font-medium">
                        {fileName ? (
                          <span className="text-[#0F612F] font-bold">فایل پیوست شد: {fileName}</span>
                        ) : (
                          'برای انتخاب فایل (DWG, DXF, STP, PDF, JPG) کلیک کنید'
                        )}
                      </span>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept=".dwg,.dxf,.stp,.step,.pdf,.png,.jpg,.jpeg,.zip"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      متن پیام <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="متن پیام خود، تیراژ، مشخصات قطعه و سوالات خود را بنویسید..."
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0F612F] focus:border-[#0F612F] outline-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3 flex items-center justify-between">
                    <span className="text-[11px] text-gray-400">پاسخگویی سریع ظرف کمتر از <span className="en-num font-bold">24</span> ساعت کاری</span>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 bg-[#0F612F] hover:bg-[#0c4e26] text-white px-6 py-3 rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all border border-[#DECA19]/40 cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-[#DECA19]" />
                      <span>ارسال نهایی پیام</span>
                    </button>
                  </div>

                </form>
              )}

            </div>

            {/* Social Messengers & Fast Communication Channels */}
            <div id="online-messengers-card" className="mt-6 bg-white rounded-3xl p-6 sm:p-7 border border-gray-200 shadow-sm text-right space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-gray-100">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0F612F] bg-emerald-50 px-3 py-1 rounded-md border border-[#0F612F]/20 mb-1">
                    <Share2 className="w-3.5 h-3.5 text-[#0F612F]" />
                    <span>ارتباط مستقیم در شبکه‌های اجتماعی و پیام‌رسان‌ها</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-gray-900">
                    استعلام سریع، مشاوره فنی و ارسال فایل
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5 font-light">
                    جهت گفتگوی آنلاین و تبادل نقشه، از طریق درگاه‌های پیام‌رسان زیر با شماره متصل اقدام فرمایید:
                  </p>
                </div>

                {/* Quick Phone Copy Badge */}
                <div className="flex items-center gap-2 bg-[#F8FAF9] px-3 py-2 rounded-2xl border border-gray-200/80 self-start sm:self-center shrink-0">
                  <div className="text-right">
                    <span className="text-[10px] text-gray-400 block font-light">شماره متصل به برنامه‌ها:</span>
                    <span className="text-xs font-black en-num font-mono text-[#0F612F] dir-ltr">09103176904</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-emerald-50 text-[#0F612F] border border-gray-200 hover:border-[#0F612F]/40 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                    title="کپی شماره تماس"
                  >
                    {copiedPhone ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-[11px] text-emerald-700 font-bold">کپی شد</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#0F612F]" />
                        <span className="text-[11px]">کپی</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* 4 Messengers Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* 1. WhatsApp */}
                <a
                  href="https://wa.me/989103176904?text=%D8%B3%D9%84%D8%A7%D9%85%D8%8C%20%D8%AC%D9%87%D8%AA%20%D8%A7%D8%B3%D8%AA%D8%B9%D9%84%D8%A7%D9%85%20%D9%82%DB%8C%D9%85%D8%AA%20%D9%88%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D8%B5%D9%86%D8%B9%D8%AA%DB%8C%20%D9%BE%DB%8C%D8%A7%D9%85%20%D9%85%DB%8C%E2%80%8C%D8%AF%D9%87%D9%85."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl border border-gray-200 hover:border-[#25D366] bg-[#FAFCFA] hover:bg-white transition-all shadow-2xs hover:shadow-md flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-[#25D366]/30">
                      {/* WhatsApp SVG Logo */}
                      <svg className="w-6 h-6 fill-[#25D366]" viewBox="0 0 24 24">
                        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.17 8.17 0 012.41 5.82c0 4.54-3.7 8.24-8.24 8.24-1.44 0-2.85-.38-4.09-1.1l-.29-.17-3.04.8 1.05-2.96-.19-.3a8.16 8.16 0 01-1.25-4.51c0-4.54 3.7-8.24 8.24-8.24zm4.51 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.07-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.16 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29z" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs sm:text-sm font-black text-gray-900 group-hover:text-[#25D366] transition-colors">واتساپ (WhatsApp)</h4>
                        <span className="text-[10px] bg-emerald-100 text-[#0F612F] px-1.5 py-0.2 rounded font-bold">چت مستقیم</span>
                      </div>
                      <p className="text-[11px] text-gray-500 leading-tight mt-0.5 font-light">ارسال سریع فایل و چت آنلاین</p>
                      <span className="text-[11px] font-mono text-gray-800 font-bold en-num dir-ltr block mt-0.5">09103176904</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#25D366] transition-colors shrink-0" />
                </a>

                {/* 2. Rubika */}
                <a
                  href="https://rubika.ir/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl border border-gray-200 hover:border-amber-500/60 bg-[#FCFAFC] hover:bg-white transition-all shadow-2xs hover:shadow-md flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-gray-200 shadow-2xs p-1.5">
                      {/* Rubika Official Hexagon 3D Logo */}
                      <RubikaIcon className="w-full h-full" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs sm:text-sm font-black text-gray-900 group-hover:text-purple-700 transition-colors">روبیکا (Rubika)</h4>
                        <span className="text-[10px] bg-purple-100 text-purple-800 px-1.5 py-0.2 rounded font-bold">پیام‌رسان</span>
                      </div>
                      <p className="text-[11px] text-gray-500 leading-tight mt-0.5 font-light">ارسال پیام و تصویر قطعه</p>
                      <span className="text-[11px] font-mono text-gray-800 font-bold en-num dir-ltr block mt-0.5">09103176904</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors shrink-0" />
                </a>

                {/* 3. Bale */}
                <a
                  href="https://ble.ir/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl border border-gray-200 hover:border-[#00A884] bg-[#F7FCFB] hover:bg-white transition-all shadow-2xs hover:shadow-md flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-[#00A884]/15 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-[#00A884]/30">
                      {/* Bale Messenger SVG Logo */}
                      <svg className="w-6 h-6" viewBox="0 0 36 36" fill="none">
                        <rect width="36" height="36" rx="9" fill="#00A884" />
                        <path d="M18 7.5C12.2 7.5 7.5 12.2 7.5 18C7.5 20.1 8.1 22.1 9.2 23.8L8 28.5L12.9 27.4C14.4 28.1 16.2 28.5 18 28.5C23.8 28.5 28.5 23.8 28.5 18C28.5 12.2 23.8 7.5 18 7.5Z" fill="white" />
                        <path d="M14.5 18.2L16.8 20.5L21.5 15.5" stroke="#00A884" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs sm:text-sm font-black text-gray-900 group-hover:text-[#00A884] transition-colors">پیام‌رسان بله (Bale)</h4>
                        <span className="text-[10px] bg-teal-100 text-teal-800 px-1.5 py-0.2 rounded font-bold">سازمانی</span>
                      </div>
                      <p className="text-[11px] text-gray-500 leading-tight mt-0.5 font-light">تبادل مدارک و استعلام فنی</p>
                      <span className="text-[11px] font-mono text-gray-800 font-bold en-num dir-ltr block mt-0.5">09103176904</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#00A884] transition-colors shrink-0" />
                </a>

                {/* 4. Instagram */}
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl border border-gray-200 hover:border-[#E1306C] bg-[#FCF8F9] hover:bg-white transition-all shadow-2xs hover:shadow-md flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-[#E1306C]/15 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-[#E1306C]/30">
                      {/* Instagram SVG Logo */}
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                        <defs>
                          <linearGradient id="ig-grad-card" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#f09433" />
                            <stop offset="25%" stopColor="#e6683c" />
                            <stop offset="50%" stopColor="#dc2743" />
                            <stop offset="75%" stopColor="#cc2366" />
                            <stop offset="100%" stopColor="#bc1888" />
                          </linearGradient>
                        </defs>
                        <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#ig-grad-card)" />
                        <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" stroke="white" strokeWidth="1.8" />
                        <circle cx="12" cy="12" r="3.2" stroke="white" strokeWidth="1.8" />
                        <circle cx="15.8" cy="8.2" r="0.9" fill="white" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs sm:text-sm font-black text-gray-900 group-hover:text-[#E1306C] transition-colors">اینستاگرام (Instagram)</h4>
                        <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded font-bold">ویدیو و دایرکت</span>
                      </div>
                      <p className="text-[11px] text-gray-500 leading-tight mt-0.5 font-light">مشاهده ویدیوهای خطوط تولید</p>
                      <span className="text-[11px] font-mono text-gray-800 font-bold en-num dir-ltr block mt-0.5">09103176904</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#E1306C] transition-colors shrink-0" />
                </a>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F612F] bg-emerald-50 px-3 py-1 rounded-full border border-[#0F612F]/20 mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#0F612F]" />
            <span>پاسخ به پرسش‌های پرتکرار</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-gray-900">
            سوالات متداول مشتریان و همکاران صنعتی
          </h3>
          <div className="w-16 h-1 bg-[#DECA19] mx-auto mt-2 rounded-full" />
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-right font-bold text-xs sm:text-sm text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#DECA19]" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-[#0F612F]' : ''}`} />
                </button>

                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 text-xs text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50">
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
