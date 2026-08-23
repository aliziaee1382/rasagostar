import React, { useState } from 'react';
import { PageId, PortfolioItem } from '../../types';
import { PORTFOLIO_ITEMS, COMPANY_INFO } from '../../data/mockData';
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
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterOptions = [
    { id: 'all', label: 'همه قطعات و محصولات' },
    { id: 'stamping', label: 'قطعات پرسی فلزی' },
    { id: 'mold_making', label: 'قالب‌های صنعتی و دایکست' },
    { id: 'plastic_injection', label: 'قطعات تزریق پلاستیک' },
    { id: 'laser_cutting', label: 'قطعات برش لیزر' },
  ];

  const filteredItems = PORTFOLIO_ITEMS.filter((item) => {
    const matchesCategory = selectedFilter === 'all' || item.category === selectedFilter;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.application.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div id="portfolio-page-container" className="space-y-12 lg:space-y-16 pb-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#0a2315] to-[#0c1a11] text-white py-14 sm:py-18 px-4 border-b-4 border-[#DECA19] relative">
        <div className="max-w-7xl mx-auto text-right">
          <div className="inline-flex items-center gap-2 bg-[#DECA19]/15 text-[#DECA19] px-3.5 py-1 rounded-full text-xs font-bold border border-[#DECA19]/30 mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>گالری دستاوردها و تولیدات</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white mb-3">
            نمونه قطعات و قالب‌های ساخته شده در <span className="text-[#DECA19]">رسا قطعه گستر مهر</span>
          </h1>
          <div className="w-24 h-1 bg-[#DECA19] rounded-full mb-4" />
          <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
            مجموعه‌ای منتخب از قطعات تولیدی در حوزه‌های قطعات خودرو، لوازم خانگی، الکترونیک، تاسیسات و قالب‌های سنبه‌ماتریس و تزریق
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {filterOptions.map((f) => {
              const active = selectedFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setSelectedFilter(f.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    active 
                      ? 'bg-[#0F612F] text-white shadow-sm scale-105 border border-[#DECA19]/40' 
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
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0F612F] focus:border-[#0F612F] text-right"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

        </div>
      </section>

      {/* Portfolio Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
            <p className="text-gray-500 text-sm mb-4">قطعه‌ای با مشخصات مورد نظر یافت نشد.</p>
            <button
              onClick={() => { setSelectedFilter('all'); setSearchQuery(''); }}
              className="px-4 py-2 bg-[#0F612F] text-white rounded-lg text-xs font-bold"
            >
              نمایش همه قطعات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div 
                key={item.id}
                onClick={() => onSelectPortfolioItem(item)}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#0F612F] hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group text-right"
              >
                <div>
                  <div className="relative h-52 bg-gray-900 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-[#0F612F] text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-xs border border-[#DECA19]/40">
                      {item.categoryLabel}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-sm sm:text-base font-black text-gray-900 group-hover:text-[#0F612F] transition-colors mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">
                      {item.description}
                    </p>
                    
                    <div className="bg-gray-50 p-3 rounded-xl text-xs text-gray-700 space-y-1.5 border border-gray-100">
                      <div className="flex justify-between">
                        <span className="text-gray-400">جنس و متریال:</span>
                        <span className="font-semibold text-gray-800 truncate max-w-[180px]">{item.material}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">صنعت و کاربرد:</span>
                        <span className="font-semibold text-gray-800 truncate max-w-[180px]">{item.application}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">ظرفیت تولید:</span>
                        <span className="font-semibold text-[#0F612F] truncate max-w-[180px]">{item.productionCapacity}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between text-xs font-bold text-[#0F612F]">
                  <span>مشاهده مشخصات فنی</span>
                  <ArrowUpRight className="w-4 h-4 text-[#DECA19]" />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Custom Manufacturing Note */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0c2214] text-white rounded-2xl p-6 sm:p-8 border border-[#DECA19]/40 flex flex-col md:flex-row items-center justify-between gap-6 text-right">
          <div className="space-y-1.5">
            <h4 className="text-base font-black text-white">قطعه یا قالب مد نظر شما در لیست نیست؟</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              ما بیش از <span className="en-num font-bold">40</span> سال سابقه در طراحی و ساخت انواع قطعات و قالب‌های سفارشی داریم. نقشه یا عکس قطعه خود را ارائه نمایید تا بررسی فنی انجام گردد.
            </p>
          </div>

          <button
            onClick={() => onNavigate('contact')}
            className="bg-[#DECA19] hover:bg-[#c9b715] text-gray-950 px-6 py-3 rounded-xl text-xs font-black shrink-0 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Phone className="w-4 h-4 text-gray-900" />
            <span>تماس با واحد مهندسی کارخانه</span>
          </button>
        </div>
      </section>

    </div>
  );
};
