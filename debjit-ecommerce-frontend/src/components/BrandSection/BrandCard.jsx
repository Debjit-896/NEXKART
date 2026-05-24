import React from 'react';

export default function BrandCard({ brandName, logo, phoneImage, discountText, styles }) {
  return (
    <div 
      className="relative flex justify-between items-center h-48 rounded-2xl p-6 overflow-hidden shadow-sm transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
      style={{ backgroundColor: styles.bgColor }}
    >
      {/* Decorative Background Circles */}
      <div 
        className="absolute right-0 top-1/2 w-64 h-64 rounded-full pointer-events-none transform translate-x-12 -translate-y-1/2" 
        style={{ backgroundColor: styles.circleColor }}
      />
      <div 
        className="absolute right-0 top-1/2 w-80 h-80 rounded-full border pointer-events-none transform translate-x-24 -translate-y-1/2" 
        style={{ borderColor: styles.circleColor }}
      />

      {/* Left Content Column */}
      <div className="flex flex-col justify-between h-full z-10">
        {/* Brand Tag */}
        <span 
          className="uppercase text-xs font-semibold tracking-wider px-3 py-1.5 rounded-md w-fit"
          style={{ backgroundColor: styles.tagBgColor, color: styles.tagTextColor }}
        >
          {brandName}
        </span>
        
        {/* Brand Logo & Offer */}
        <div className="flex flex-col gap-3 mt-4">
          {brandName === 'Iphone' && (
            <div className="bg-white rounded-2xl w-12 h-12 flex items-center justify-center">
              <img src={logo} alt="Apple logo" className="h-6 object-contain" />
            </div>
          )}
          {brandName === 'Realme' && (
            <div className="bg-[#FFCC00] rounded-sm px-2 w-fit">
              <span className="text-black font-bold text-[1.35rem] tracking-tighter">realme</span>
            </div>
          )}
          {brandName === 'Xiaomi' && (
            <div className="bg-[#FF6900] rounded-xl w-12 h-12 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">mi</span>
            </div>
          )}

          <h3 
            className="text-xl font-bold tracking-tight mt-1"
            style={{ color: styles.textColor }}
          >
            {discountText}
          </h3>
        </div>
      </div>

      {/* Right Image Column */}
      <div className="relative h-full w-1/2 flex justify-end items-center z-10">
        <img 
          src={phoneImage} 
          alt={`${brandName} phones`} 
          className="h-[110%] object-contain drop-shadow-xl transform translate-y-1 scale-110" 
        />
      </div>
    </div>
  );
}
