import React from 'react';
import { PortfolioItem } from '../types';
import { COMPANY_INFO } from '../data/mockData';
import { 
  X, 
  Phone
} from 'lucide-react';

interface ProductDetailModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  onOrderThisItem: (item: PortfolioItem) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  item,
  onClose,
  onOrderThisItem,
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4">
      <div className="relative bg-white rounded-xl sm:rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-10 p-1.5 sm:p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-colors cursor-pointer"
          aria-label="بستن پنجره"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Image Side */}
          <div className="relative bg-gray-900 min-h-[180px] sm:min-h-[260px] md:min-h-[420px] flex items-center justify-center overflow-hidden">
            <img 
              src={item.image} 
              alt={item.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            
            <div className="absolute bottom-2.5 right-2.5 left-2.5 sm:bottom-4 sm:right-4 sm:left-4 text-right">
              <span className="inline-block bg-[#0F612F] text-white text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md mb-1 sm:mb-1.5 border border-[#DECA19]/40">
                {item.categoryLabel}
              </span>
              <p className="text-white text-[10px] sm:text-xs font-light opacity-90">
                تولید شده در خطوط کارخانه رسا قطعه گستر مهر
              </p>
            </div>
          </div>

          {/* Content Side */}
          <div className="p-3.5 sm:p-8 flex flex-col justify-between text-right">
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#DECA19]" />
                <span className="text-[11px] sm:text-xs text-[#0F612F] font-bold">شناسه فنی: <span className="en-num font-mono font-bold">{item.id.toUpperCase()}</span></span>
              </div>

              <h3 className="text-sm sm:text-xl font-black text-gray-900 leading-snug mb-1.5 sm:mb-3">
                {item.title}
              </h3>

              <p className="text-[11px] sm:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-6">
                {item.description}
              </p>

              {/* Specs Table */}
              <div className="space-y-1.5 sm:space-y-2.5 bg-gray-50 p-2.5 sm:p-4 rounded-lg sm:rounded-xl border border-gray-100 text-[10px] sm:text-xs mb-3 sm:mb-6">
                <div className="flex justify-between items-center py-0.5 sm:py-1 border-b border-gray-200/60">
                  <span className="text-gray-500 font-medium">جنس و متریال:</span>
                  <span className="font-bold text-gray-800">{item.material}</span>
                </div>
                <div className="flex justify-between items-center py-0.5 sm:py-1 border-b border-gray-200/60">
                  <span className="text-gray-500 font-medium">ابعاد و مشخصات:</span>
                  <span className="font-bold text-gray-800 en-num dir-ltr text-left">{item.dimensions}</span>
                </div>
                <div className="flex justify-between items-center py-0.5 sm:py-1 border-b border-gray-200/60">
                  <span className="text-gray-500 font-medium">کاربرد در صنعت:</span>
                  <span className="font-bold text-gray-800">{item.application}</span>
                </div>
                <div className="flex justify-between items-center py-0.5 sm:py-1">
                  <span className="text-gray-500 font-medium">ظرفیت تولید:</span>
                  <span className="font-bold text-[#0F612F]">{item.productionCapacity}</span>
                </div>
              </div>

              {/* Tags */}
              {(item.tags && item.tags.length > 0) && (
                <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-6">
                  {item.tags.map((t, idx) => (
                    <span 
                      key={idx}
                      className="text-[9px] sm:text-[11px] bg-emerald-50 text-[#0F612F] px-2 sm:px-2.5 py-0.5 rounded-full font-medium border border-[#0F612F]/20"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-2.5 sm:pt-4 border-t border-gray-100 flex items-center justify-between gap-2 sm:gap-3">
              <button
                onClick={onClose}
                className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 text-[10px] sm:text-xs font-bold transition-colors cursor-pointer"
              >
                بستن
              </button>

              <a
                href={`tel:${COMPANY_INFO.phoneTel || '02176266543'}`}
                onClick={() => {
                  onClose();
                  onOrderThisItem(item);
                }}
                className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-[#0F612F] hover:bg-[#0c4e26] text-white py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg text-[10px] sm:text-xs font-bold shadow-md hover:shadow-lg transition-all border border-[#DECA19]/40 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#DECA19]" />
                <span>تماس جهت سفارش: <span className="en-num font-bold">{COMPANY_INFO.phone}</span></span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
