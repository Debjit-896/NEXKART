import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MobilesPage() {
  const navigate = useNavigate();

  const banners = [
    { id: 1, image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80', title: 'realme GT 7T', discount: 'From ₹26,499*' },
    { id: 2, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80', title: 'Ai+ Pulse 2', discount: 'From ₹8,999*' },
    { id: 3, image: 'https://images.unsplash.com/photo-1533228100845-08145b01de14?auto=format&fit=crop&w=800&q=80', title: 'Phone (4a)', discount: 'From ₹30,499*' },
  ];

  const subCategories = [
    { id: 'iphone', label: 'iPhone', image: 'https://images.unsplash.com/photo-1605236453806-6ff368528761?auto=format&fit=crop&w=150&q=80' },
    { id: 'vivo', label: 'vivo', image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=150&q=80' },
    { id: 'realme', label: 'realme', image: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=150&q=80' },
    { id: 'poco', label: 'POCO', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=150&q=80' },
    { id: 'ai-plus', label: 'Ai+', image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=150&q=80' },
    { id: 'google', label: 'Google', image: 'https://images.unsplash.com/photo-1533228100845-08145b01de14?auto=format&fit=crop&w=150&q=80' },
    { id: 'tecno', label: 'Tecno', image: 'https://images.unsplash.com/photo-1544228428-1b22e1180b72?auto=format&fit=crop&w=150&q=80' },
    { id: 'hmd', label: 'HMD', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cd8d3?auto=format&fit=crop&w=150&q=80' },
    { id: 'motorola', label: 'motorola', image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=150&q=80' },
    { id: 'samsung', label: 'Samsung', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=150&q=80' },
    { id: 'oppo', label: 'OPPO', image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=150&q=80' },
    { id: 'nothing', label: 'Nothing', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=150&q=80' },
    { id: 'snapdragon', label: 'Snapdragon', image: 'https://images.unsplash.com/photo-1526406915894-7bcd65f60845?auto=format&fit=crop&w=150&q=80' },
    { id: 'redmi', label: 'Redmi', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=150&q=80' },
    { id: 'infinix', label: 'Infinix', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cd8d3?auto=format&fit=crop&w=150&q=80' },
  ];

  const handleCategoryClick = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
  };

  return (
    <div className="flex-grow w-full bg-white pb-12">
      <div className="w-full px-4 md:px-10 lg:px-16 xl:px-24 mx-auto pt-6">
        
        {/* Banners Section */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide mb-10 pb-2">
          {banners.map((banner) => (
            <div key={banner.id} className="min-w-[300px] md:min-w-[400px] h-48 md:h-64 rounded-2xl overflow-hidden relative flex-shrink-0 cursor-pointer shadow-sm hover:shadow-md transition-shadow">
              <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center p-6 text-white">
                <span className="text-sm font-bold bg-yellow-400 text-black px-2 py-0.5 rounded w-max mb-2">GRWM SALE</span>
                <h3 className="text-xl md:text-2xl font-bold leading-tight mb-1">{banner.title}</h3>
                <p className="text-lg font-semibold text-yellow-300">{banner.discount}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
          {subCategories.map((cat) => (
            <div 
              key={cat.id} 
              onClick={() => handleCategoryClick(cat.id)}
              className="flex flex-col items-center gap-2 cursor-pointer group"
            >
              <div className="w-full aspect-square bg-[#E0F2FE] rounded-xl overflow-hidden flex items-center justify-center p-3 group-hover:shadow-md transition-shadow">
                <img src={cat.image} alt={cat.label} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" />
              </div>
              <span className="text-[12px] md:text-[13px] font-medium text-gray-800 text-center leading-tight">
                {cat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
