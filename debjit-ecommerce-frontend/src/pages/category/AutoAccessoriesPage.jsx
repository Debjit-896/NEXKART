import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AutoAccessoriesPage() {
  const navigate = useNavigate();

  const banners = [
    { id: 1, image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80', title: 'Car accessories', discount: 'Starting ₹199' },
    { id: 2, image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80', title: 'Bike accessories', discount: 'Top Deals' },
  ];

  const subCategories = [
    { id: 'minutes', label: 'Get in Mins.', image: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=150&q=80' },
    { id: 'cleaners', label: 'Cleaners', image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=150&q=80' },
    { id: 'lights', label: 'Lights', image: 'https://images.unsplash.com/photo-1550524458-71e19488a088?auto=format&fit=crop&w=150&q=80' },
    { id: 'tyre-inflator', label: 'Tyre inflator', image: 'https://images.unsplash.com/photo-1616715243851-e737c02b2ea2?auto=format&fit=crop&w=150&q=80' },
    { id: 'batteries', label: 'Batteries', image: 'https://images.unsplash.com/photo-1588610537482-1e967a57a829?auto=format&fit=crop&w=150&q=80' },
    { id: 'styling', label: 'Styling', image: 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&w=150&q=80' },
    { id: 'riding-gear', label: 'Riding gear', image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=150&q=80' },
    { id: 'subwoofers', label: 'Subwoofers', image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=150&q=80' },
    { id: 'air-fresheners', label: 'Air fresheners', image: 'https://images.unsplash.com/photo-1602444983226-f77e682e1858?auto=format&fit=crop&w=150&q=80' },
    { id: 'dashcams', label: 'Dashcams', image: 'https://images.unsplash.com/photo-1511468205461-9c6f2e249b6b?auto=format&fit=crop&w=150&q=80' },
    { id: 'helmets', label: 'Helmets', image: 'https://images.unsplash.com/photo-1558981001-1995369a39cd?auto=format&fit=crop&w=150&q=80' },
    { id: 'covers', label: 'Covers', image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=150&q=80' },
    { id: 'car-washer', label: 'Car washer', image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=150&q=80' },
    { id: 'tyres', label: 'Tyres', image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=150&q=80' },
    { id: 'media-player', label: 'Media player', image: 'https://images.unsplash.com/photo-1520926581452-9426f490059c?auto=format&fit=crop&w=150&q=80' },
    { id: 'car-mats', label: 'Car mats', image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=150&q=80' },
    { id: 'engine-oils', label: 'Engine oils', image: 'https://images.unsplash.com/photo-1623869269553-73130d740c03?auto=format&fit=crop&w=150&q=80' },
  ];

  const handleCategoryClick = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
  };

  return (
    <div className="flex-grow w-full bg-white pb-12">
      <div className="w-full px-4 md:px-10 lg:px-16 xl:px-24 mx-auto pt-6">
        
        {/* Categories Grid */}
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4 mb-10">
          {subCategories.map((cat) => (
            <div 
              key={cat.id} 
              onClick={() => handleCategoryClick(cat.id)}
              className="flex flex-col items-center gap-2 cursor-pointer group"
            >
              <div className="w-full aspect-square bg-[#FEF3C7] rounded-xl overflow-hidden flex items-center justify-center p-2 group-hover:shadow-md transition-shadow">
                <img src={cat.image} alt={cat.label} className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300" />
              </div>
              <span className="text-[12px] md:text-[13px] font-medium text-gray-800 text-center leading-tight">
                {cat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Banners Section */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          {banners.map((banner) => (
            <div key={banner.id} className="w-1/2 min-w-[300px] h-32 md:h-48 rounded-xl overflow-hidden relative flex-shrink-0 cursor-pointer shadow-sm hover:shadow-md transition-shadow">
              <img src={banner.image} alt={banner.title} className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-[#0f3460]/80 flex flex-col justify-center p-6 text-white text-center">
                <h3 className="text-xl md:text-3xl font-bold leading-tight mb-1">{banner.title}</h3>
                <p className="text-lg font-bold text-gray-200">{banner.discount}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
