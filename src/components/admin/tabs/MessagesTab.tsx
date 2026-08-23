import React, { useState } from 'react';
import { useData } from '../../../context/DataContext';
import { ContactMessage, MessageStatus } from '../../../types';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  RefreshCw, 
  Paperclip, 
  CheckCircle, 
  Copy, 
  Phone, 
  Mail, 
  ExternalLink, 
  Trash2, 
  Clock, 
  Eye,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const MessagesTab: React.FC = () => {
  const { 
    messages, 
    unreadMessagesCount, 
    isLoadingMessages, 
    fetchMessages, 
    updateMessageStatus, 
    deleteMessage 
  } = useData();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | MessageStatus>('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filteredMessages = messages.filter((msg) => {
    const matchesQuery = 
      msg.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.phone.includes(searchQuery) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (msg.trackingCode && msg.trackingCode.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || msg.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const handleCopyTrackingCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleStatusChange = async (id: string, newStatus: MessageStatus) => {
    await updateMessageStatus(id, newStatus);
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage({ ...selectedMessage, status: newStatus });
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`آیا از حذف پیام کاربر «${name}» اطمینان دارید؟`)) {
      await deleteMessage(id);
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage(null);
      }
    }
  };

  const getStatusBadge = (status: MessageStatus) => {
    switch (status) {
      case 'new':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">جدید / بررسی‌نشده</span>;
      case 'reviewed':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-300">در حال بررسی فنی</span>;
      case 'confirmed':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-[#0F612F] border border-emerald-300">تایید شده / پاسخ‌داده‌شده</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn text-right">
      
      {/* Header Info */}
      <div className="bg-emerald-50/80 p-5 rounded-2xl border border-[#0F612F]/20 flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#0F612F] text-[#DECA19] flex items-center justify-center shrink-0 shadow-sm">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-gray-900 mb-1">
              صندوق پیام‌ها و استعلام‌های نقشه دریافتی از فرم تماس
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              مشاهده فایل‌های نقشه، کد پیگیری اختصاصی، تغییر وضعیت پیام به بررسی‌شده و ارتباط مستقیم با مشتری.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => fetchMessages()}
          disabled={isLoadingMessages}
          className="bg-white hover:bg-gray-100 text-gray-800 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs border border-gray-300 transition-all cursor-pointer shrink-0 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#0F612F] ${isLoadingMessages ? 'animate-spin' : ''}`} />
          <span>بروزرسانی پیام‌ها</span>
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
            placeholder="جستجو در نام فرستنده، شماره تماس، کد پیگیری..."
            className="w-full pr-9 pl-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl"
            >
              <option value="all">همه وضعیت‌ها ({messages.length})</option>
              <option value="new">فقط پیام‌های جدید</option>
              <option value="reviewed">در حال بررسی</option>
              <option value="confirmed">پاسخ‌داده‌شده</option>
            </select>
          </div>

          <span className="text-xs text-gray-500 font-bold">
            پیام‌های بررسی نشده: <strong className="text-amber-600 font-mono">{unreadMessagesCount}</strong>
          </span>
        </div>
      </div>

      {/* Messages Table / List */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
        {filteredMessages.length === 0 ? (
          <div className="p-12 text-center text-gray-400 space-y-2">
            <MessageSquare className="w-10 h-10 mx-auto text-gray-300" />
            <p className="text-xs font-bold">هیچ پیامی با این مشخصات یافت نشد.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredMessages.map((msg) => (
              <div
                key={msg.id}
                className={`p-4 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                  msg.status === 'new' ? 'bg-amber-50/40 hover:bg-amber-50/70' : 'hover:bg-gray-50'
                }`}
              >
                {/* Message Summary */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs font-black text-gray-900">{msg.fullName}</span>
                    {msg.company && <span className="text-[11px] text-gray-500">({msg.company})</span>}
                    {getStatusBadge(msg.status)}
                    {msg.trackingCode && (
                      <button
                        type="button"
                        onClick={() => handleCopyTrackingCode(msg.trackingCode!)}
                        className="text-[10px] font-mono bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-0.5 rounded border border-gray-200 flex items-center gap-1 cursor-pointer"
                        title="کپی کد رهگیری"
                      >
                        <Copy className="w-3 h-3 text-[#0F612F]" />
                        <span>کد: {msg.trackingCode}</span>
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-gray-600 line-clamp-1 leading-relaxed">{msg.message}</p>

                  <div className="flex items-center gap-4 text-[11px] text-gray-400 pt-1 flex-wrap">
                    <span className="flex items-center gap-1 font-mono text-gray-600 font-bold">
                      <Phone className="w-3 h-3 text-[#0F612F]" />
                      <span>{msg.phone}</span>
                    </span>
                    {msg.email && (
                      <span className="flex items-center gap-1 font-mono">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span>{msg.email}</span>
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span>{msg.createdAt}</span>
                    </span>
                    {msg.attachment && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded font-bold border border-indigo-200">
                        <Paperclip className="w-3 h-3" />
                        <span>دارای پیوست نقشه</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <button
                    type="button"
                    onClick={() => setSelectedMessage(msg)}
                    className="bg-[#0F612F] hover:bg-[#0c4e26] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#DECA19]" />
                    <span>مشاهده جزئیات</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(msg.id, msg.fullName)}
                    className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="حذف پیام"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-6 shadow-2xl border border-gray-200 text-right space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0F612F] text-[#DECA19] flex items-center justify-center font-bold">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-black text-gray-900">
                  استعلام ارسالی توسط: {selectedMessage.fullName}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="text-gray-400 hover:text-gray-700 text-xs font-bold"
              >
                ✕ بستن
              </button>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-gray-50 p-4 rounded-2xl border border-gray-200">
              <div>
                <span className="text-gray-400 block mb-0.5">شماره تماس:</span>
                <a href={`tel:${selectedMessage.phone}`} className="font-bold text-[#0F612F] font-mono text-sm hover:underline">
                  {selectedMessage.phone}
                </a>
              </div>
              <div>
                <span className="text-gray-400 block mb-0.5">تاریخ و ساعت ثبت:</span>
                <span className="font-medium text-gray-700">{selectedMessage.createdAt}</span>
              </div>
              {selectedMessage.email && (
                <div>
                  <span className="text-gray-400 block mb-0.5">ایمیل فرستنده:</span>
                  <span className="font-mono text-gray-700">{selectedMessage.email}</span>
                </div>
              )}
              {selectedMessage.company && (
                <div>
                  <span className="text-gray-400 block mb-0.5">نام شرکت / کارفرما:</span>
                  <span className="font-bold text-gray-800">{selectedMessage.company}</span>
                </div>
              )}
              {selectedMessage.trackingCode && (
                <div className="col-span-2 pt-1 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-gray-500">کد رهگیری پیام:</span>
                  <span className="font-mono font-bold text-xs bg-white px-2.5 py-1 rounded border border-gray-300">
                    {selectedMessage.trackingCode}
                  </span>
                </div>
              )}
            </div>

            {/* Message Body */}
            <div>
              <label className="block text-xs font-black text-gray-900 mb-1">متن پیام یا استعلام:</label>
              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-800 leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </div>
            </div>

            {/* Attachment File */}
            {selectedMessage.attachment && (
              <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-indigo-900 font-bold">
                  <Paperclip className="w-4 h-4 text-indigo-600" />
                  <span>فایل نقشه / پیوست فنی بارگذاری شده</span>
                </div>
                <a
                  href={selectedMessage.attachment}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>دانلود / مشاهده نقشه</span>
                </a>
              </div>
            )}

            {/* Status Selector */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-700">تغییر وضعیت پیام:</span>
                <select
                  value={selectedMessage.status}
                  onChange={(e) => handleStatusChange(selectedMessage.id, e.target.value as MessageStatus)}
                  className="px-3 py-1.5 text-xs bg-gray-50 border border-gray-300 rounded-xl font-bold"
                >
                  <option value="new">جدید (بررسی نشده)</option>
                  <option value="reviewed">در حال بررسی فنی</option>
                  <option value="confirmed">تایید شده و پاسخ‌داده‌شده</option>
                </select>
              </div>

              <a
                href={`https://wa.me/98${selectedMessage.phone.replace(/^0/, '')}?text=${encodeURIComponent(`با سلام و احترام جناب ${selectedMessage.fullName}، پیام و استعلام شما در کارخانه رسا قطعه گستر مهر بررسی گردید.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <span>ارسال پاسخ در واتساپ</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
