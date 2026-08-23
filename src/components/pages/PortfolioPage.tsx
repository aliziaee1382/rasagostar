import React, { useState } from 'react';
import { PageId, PortfolioItem } from '../../types';
import { useData } from '../../context/DataContext';
import { 
  Layers, 
  Search, 
  Filter, 
  CheckCircle2, 
  Cpu, 
  Cog, 
  Sparkles,
  ArrowUpRight,
  Phone
} from 'lucide-react';

interface PortfolioPageProps {
  onNavigate: (page: PageId) => void;
  onSelectPortfolioItem: (item: PortfolioItem) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  onNavigate,
  onSelectPortfolioItem,
}) => {
  const { data } = useData();
  const products = data?.portfolioItems || [];
  const companyInfo = data?.companyInfo || {};

  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterOptions = [
    { id: 'all', label: 'همه قطعات و محصولات' },
    { id: 'stamping', label: 'قطعات پرسی فلزی' },
    { id: 'mold_making', label: 'قالب‌های صنعتی و دایکست' },
    { id: 'plastic_injection', label: 'قطعات تزریق پلاستیک' },
    { id: 'laser_cutting', label: 'قطعات برش لیزر' },
  ];

  const filteredItems = products.filter((item) => {
    const matchesCategory = selectedFilter === 'all' || item.category === selectedFilter;
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      (item.title || '').toLowerCase().includes(query) ||
      (item.description || '').toLowerCase().includes(query) ||
      (item.material || '').toLowerCase().includes(query) ||
      (item.application || '').toLowerCase().includes(query) ||
      (item.tags || []).some(t => t.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <div id="portfolio-page-container" className="space-y-6 sm:space-y-16 pb-8 sm:pb-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#0a2315] to-[#0c1a11] text-white py-6 sm:py-18 px-3 sm:px-4 border-b-4 border-[#DECA19] relative">
        <div className="max-w-7xl mx-auto text-right">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#DECA19]/15 text-[#DECA19] px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold border border-[#DECA19]/30 mb-2 sm:mb-3">
            <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>گالری دستاوردها و تولیدات</span>
          </div>
          <h1 className="text-xl sm:text-4xl font-black text-white mb-2 sm:mb-3">
            نمونه قطعات و قالب‌های ساخته شده در <span className="text-[#DECA19]">{companyInfo.name}</span>
          </h1>
          <div className="w-16 sm:w-24 h-0.5 sm:h-1 bg-[#DECA19] rounded-full mb-2.5 sm:mb-4" />
          <p className="text-[11px] sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
            مجموعه‌ای منتخب از قطعات تولیدی در حوزه‌های قطعات خودرو، لوازم خانگی، الکترونیک، تاسیسات و قالب‌های سنبه‌ماتریس و تزریق
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="bg-white p-3 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-200 shadow-xs sm:shadow-sm flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full md:w-auto">
            {filterOptions.map((f) => {
              const active = selectedFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setSelectedFilter(f.id)}
                  className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
                    active 
                      ? 'bg-[#0F612F] text-white shadow-xs sm:shadow-sm scale-[1.02] sm:scale-105 border border-[#DECA19]/40' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Search Input Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="جستجوی نام قطعه، متریال یا کاربرد..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 sm:pl-9 pr-3 sm:pr-4 py-2 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0F612F] focus:border-[#0F612F] text-right"
            />
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2" />
          </div>

        </div>
      </section>

      {/* Portfolio Gallery Grid */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-12 text-center border border-gray-200">
            <p className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4">قطعه‌ای با مشخصات مورد نظر یافت نشد.</p>
            <button
              onClick={() => { setSelectedFilter('all'); setSearchQuery(''); }}
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-[#0F612F] text-white rounded-lg text-xs font-bold"
            >
              نمایش همه قطعات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
            {filteredItems.map((item) => (
              <div 
                key={item.id}
                onClick={() => onSelectPortfolioItem(item)}
                className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200 hover:border-[#0F612F] hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group text-right"
              >
                <div>
                  <div className="relative h-32 sm:h-52 bg-gray-900 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-[#0F612F] text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md shadow-xs border border-[#DECA19]/40">
                      {item.categoryLabel}
                    </div>
                  </div>

                  <div className="p-2.5 sm:p-5">
                    <h3 className="text-xs sm:text-base font-black text-gray-900 group-hover:text-[#0F612F] transition-colors mb-1 sm:mb-2 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-gray-600 line-clamp-2 leading-relaxed mb-2 sm:mb-4">
                      {item.description}
                    </p>
                    
                    <div className="bg-gray-50 p-2 sm:p-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs text-gray-700 space-y-1 sm:space-y-1.5 border border-gray-100">
                      <div className="flex justify-between">
                        <span className="text-gray-400">متریال:</span>
                        <span className="font-semibold text-gray-800 truncate max-w-[90px] sm:max-w-[180px]">{item.material}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">کاربرد:</span>
                        <span className="font-semibold text-gray-800 truncate max-w-[90px] sm:max-w-[180px]">{item.application}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">ظرفیت:</span>
                        <span className="font-semibold text-[#0F612F] truncate max-w-[90px] sm:max-w-[180px]">{item.productionCapacity}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 sm:p-5 pt-0 flex items-center justify-between text-[10px] sm:text-xs font-bold text-[#0F612F]">
                  <span>مشاهده جزئیات</span>
                  <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#DECA19]" />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Custom Manufacturing Note */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="bg-[#0c2214] text-white rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-[#DECA19]/40 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-6 text-right">
          <div className="space-y-1">
            <h4 className="text-xs sm:text-base font-black text-white">قطعه یا قالب مد نظر شما در لیست نیست؟</h4>
            <p className="text-[10px] sm:text-xs text-gray-300 leading-relaxed">
              ما بیش از <span className="en-num font-bold">40</span> سال سابقه در طراحی و ساخت انواع قطعات و قالب‌های سفارشی داریم. نقشه یا عکس قطعه خود را ارسال نمایید.
            </p>
          </div>

          <button
            onClick={() => onNavigate('contact')}
            className="w-full sm:w-auto bg-[#DECA19] hover:bg-[#c9b715] text-gray-950 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs font-black shrink-0 transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-900" />
            <span>تماس با واحد مهندسی</span>
          </button>
        </div>
      </section>

    </div>
  );
};
