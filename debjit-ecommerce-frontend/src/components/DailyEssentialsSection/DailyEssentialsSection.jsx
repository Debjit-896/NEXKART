import React from 'react';

export default function DailyEssentialsSection({ title, highlightText, items }) {
  return (
    <div className="w-full mb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-2">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-700 flex items-center gap-2">
          {title} 
          <span className="text-[#0A88FF] font-semibold relative">
            {highlightText}
            {/* Blue underline matching exactly */}
            <span className="absolute -bottom-[11px] left-0 w-full h-[3px] bg-[#0A88FF]"></span>
          </span>
        </h2>
        <a href="#" className="text-sm font-semibold text-gray-500 hover:text-[#0A88FF] flex items-center gap-1 transition-colors">
          View All <span className="text-[#0A88FF] text-lg leading-none font-bold">&rsaquo;</span>
        </a>
      </div>

      {/* Items Scroll Container */}
      <div className="flex items-center gap-6 sm:gap-10 overflow-x-auto scrollbar-hide pb-6">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-4 min-w-[130px] cursor-pointer group">
            {/* Image Box */}
            <div className={`w-[130px] h-[130px] sm:w-[150px] sm:h-[150px] rounded-[1rem] flex items-center justify-center p-4 transition-all duration-300 ${
              item.active 
                ? 'bg-[#F2F7FF] border-2 border-[#0A88FF] shadow-[0_8px_20px_rgba(10,136,255,0.2)]' 
                : 'bg-[#F4F5F7] border-2 border-transparent group-hover:border-[#0A88FF] group-hover:bg-blue-50/50 group-hover:shadow-[0_8px_20px_rgba(10,136,255,0.2)]'
            }`}>
              <img 
                src={item.image} 
                alt={item.name} 
                className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300 mix-blend-multiply drop-shadow-sm" 
              />
            </div>
            
            {/* Text details */}
            <div className="flex flex-col items-center gap-1 mt-1">
              <span className="text-[13px] font-semibold text-gray-500">{item.name}</span>
              <span className="text-[15px] font-bold text-gray-800 tracking-tight">{item.discount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
