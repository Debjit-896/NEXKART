import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ElectronicsPage() {
  const navigate = useNavigate();

  const banners = [
    { id: 1, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80', title: 'Styling & Wellness', discount: 'From ₹259' },
    { id: 2, image: 'https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?auto=format&fit=crop&w=800&q=80', title: 'Covers & More', discount: 'From ₹149' },
    { id: 3, image: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?auto=format&fit=crop&w=800&q=80', title: 'Powerbanks', discount: 'From ₹799' },
  ];

  const subCategories = [
    { id: 'new-launches', label: 'New launches', image: 'https://images.unsplash.com/photo-1550009158-9ffcb4f8d227?auto=format&fit=crop&w=150&q=80' },
    { id: 'earphones', label: 'Earphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=150&q=80' },
    { id: 'two-wheelers', label: 'Two Wheelers', image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=150&q=80' },
    { id: 'grooming', label: 'Grooming', image: 'https://images.unsplash.com/photo-1588731247530-4076bfc54c1f?auto=format&fit=crop&w=150&q=80' },
    { id: 'mobile-cases', label: 'Mobile cases', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=150&q=80' },
    { id: 'storage', label: 'Storage', image: 'https://images.unsplash.com/photo-1582239401763-7925c4ef699b?auto=format&fit=crop&w=150&q=80' },
    { id: 'chargers-cable', label: 'Chargers & cable', image: 'https://images.unsplash.com/photo-1615526675159-e248c3021d3f?auto=format&fit=crop&w=150&q=80' },
    { id: 'gaming', label: 'Gaming', image: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?auto=format&fit=crop&w=150&q=80' },
    { id: 'health-care', label: 'Health Care', image: 'https://images.unsplash.com/photo-1584308666744-24d5e1cc1529?auto=format&fit=crop&w=150&q=80' },
    { id: 'gaming-hub', label: 'Gaming Hub', image: 'https://images.unsplash.com/photo-1593118247619-e2d6f056869e?auto=format&fit=crop&w=150&q=80' },
    { id: 'laptops', label: 'Laptops', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=150&q=80' },
    { id: 'tablets', label: 'Tablets', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=150&q=80' },
    { id: 'wearables', label: 'Wearables', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=150&q=80' },
    { id: 'accessories', label: 'Accessories', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=150&q=80' },
    { id: 'it-peripherals', label: 'IT Peripherals', image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=150&q=80' },
    { id: 'camera', label: 'Camera', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=150&q=80' },
    { id: 'power-banks', label: 'Power Banks', image: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?auto=format&fit=crop&w=150&q=80' },
    { id: 'smart-devices', label: 'Smart devices', image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&w=150&q=80' },
    { id: 'speakers', label: 'Speakers', image: 'https://images.unsplash.com/photo-1608223666579-d102e3b320d7?auto=format&fit=crop&w=150&q=80' },
    { id: 'networking', label: 'Networking', image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=150&q=80' },
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
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-4">
          {subCategories.map((cat) => (
            <div 
              key={cat.id} 
              onClick={() => handleCategoryClick(cat.id)}
              className="flex flex-col items-center gap-2 cursor-pointer group"
            >
              <div className="w-full aspect-square bg-[#E0EAFF] rounded-xl overflow-hidden flex items-center justify-center p-3 group-hover:shadow-md transition-shadow">
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
