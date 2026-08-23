import React, { useState } from 'react';
import { PageId } from '../../types';
import { COMPANY_INFO, FAQS } from '../../data/mockData';
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
  ExternalLink
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

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
            تماس با کارخانه <span className="text-[#DECA19]">رسا قطعه گستر مهر</span>
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
                    <p className="text-gray-600 leading-relaxed">{COMPANY_INFO.address}</p>
                    <span className="text-[11px] text-gray-400 mt-1 block">کد پستی: <span className="en-num font-mono">{COMPANY_INFO.postalCode}</span></span>
                  </div>
                </div>

                {/* Phones */}
                <div className="flex items-start gap-3 p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0F612F] flex items-center justify-center shrink-0 border border-[#0F612F]/20">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-gray-900 mb-0.5">شماره‌های تماس:</strong>
                    <p className="text-gray-700">تلفن کارخانه: <span className="en-num font-bold text-gray-900 dir-ltr">{COMPANY_INFO.phone}</span></p>
                    <p className="text-gray-700 mt-1">واحد مهندسی و فروش: <span className="en-num font-bold text-gray-900 dir-ltr">{COMPANY_INFO.phoneDirect}</span></p>
                    <p className="text-gray-700 mt-1">پشتیبانی و واتساپ: <span className="en-num font-bold text-[#0F612F] dir-ltr">{COMPANY_INFO.mobileSupport}</span></p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3 p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0F612F] flex items-center justify-center shrink-0 border border-[#0F612F]/20">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-gray-900 mb-0.5">پست الکترونیک (ایمیل):</strong>
                    <p className="text-gray-700 en-num">{COMPANY_INFO.email}</p>
                    <p className="text-gray-700 en-num mt-1">{COMPANY_INFO.emailSales}</p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3 p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0F612F] flex items-center justify-center shrink-0 border border-[#0F612F]/20">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-gray-900 mb-0.5">ساعات فعالیت و پذیرش:</strong>
                    <p className="text-gray-600 leading-relaxed"><span className="en-num">{COMPANY_INFO.workingHours}</span></p>
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
                  href={COMPANY_INFO.neshanMapsUrl}
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
                  src={COMPANY_INFO.neshanMapsEmbedUrl}
                  className="w-full h-full border-0"
                  allowFullScreen={true}
                  loading="lazy"
                />
              </div>

              <div className="flex items-center justify-between bg-emerald-50/70 border border-[#0F612F]/20 rounded-xl p-3 text-xs text-gray-700">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#0F612F] shrink-0" />
                  <span className="font-semibold text-gray-900">شرکت رسا قطعه گستر مهر</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={COMPANY_INFO.neshanMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#0F612F] hover:bg-[#0c4e26] text-white px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all shadow-xs shrink-0 flex items-center gap-1 cursor-pointer"
                  >
                    <Navigation className="w-3 h-3 text-[#DECA19]" />
                    <span>مسیریابی با نشان</span>
                  </a>
                  <a
                    href={COMPANY_INFO.googleMapsUrl}
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
