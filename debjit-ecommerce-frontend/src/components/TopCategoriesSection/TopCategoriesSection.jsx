import React from 'react';

export default function TopCategoriesSection({ title, highlightText, categories }) {
  return (
    <div className="w-full mb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-2">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-700 flex items-center gap-2">
          {title} 
          <span className="text-[#0A88FF] font-semibold relative">
            {highlightText}
            <span className="absolute -bottom-[11px] left-0 w-full h-[3px] bg-[#0A88FF]"></span>
          </span>
        </h2>
        <a href="#" className="text-sm font-semibold text-gray-500 hover:text-[#0A88FF] flex items-center gap-1 transition-colors">
          View All <span className="text-[#0A88FF] text-lg leading-none font-bold">&rsaquo;</span>
        </a>
      </div>

      {/* Categories Circles */}
      <div className="flex items-center justify-between overflow-x-auto scrollbar-hide gap-6 pb-4">
        {categories.map((cat, index) => (
          <div key={index} className="flex flex-col items-center gap-4 min-w-[90px] cursor-pointer group">
            <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center transition-all duration-300 p-4 border-2 ${
              cat.active
                ? 'border-[#0A88FF] shadow-[0_4px_20px_rgba(10,136,255,0.3)] bg-white'
                : 'border-transparent bg-[#E8EEF6] group-hover:border-[#0A88FF] group-hover:shadow-[0_4px_16px_rgba(10,136,255,0.2)] group-hover:bg-blue-50/60'
            }`}>
              <img src={cat.image} alt={cat.name} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300 mix-blend-multiply" />
            </div>
            <span className={`text-[13px] font-semibold text-center transition-colors duration-200 ${
              cat.active ? 'text-[#0A88FF]' : 'text-gray-800 group-hover:text-[#0A88FF]'
            }`}>{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
