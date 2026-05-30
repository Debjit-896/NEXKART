import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FashionPage() {
  const navigate = useNavigate();

  // Mock banners based on screenshot
  const banners = [
    { id: 1, image: 'https://images.unsplash.com/photo-1550614000-4b95d415f8e9?auto=format&fit=crop&w=800&q=80', title: 'Embroidered kurta sets', discount: 'Min. 70% Off' },
    { id: 2, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80', title: 'Go agile. Be stylish', discount: 'Min. 75% Off' },
    { id: 3, image: 'https://images.unsplash.com/photo-1512496015851-a1cae5e1e809?auto=format&fit=crop&w=800&q=80', title: 'Kicks that keep up', discount: 'Min. 60% Off' },
  ];

  // Mock fashion subcategories based on screenshot
  const subCategories = [
    { id: 'trends', label: 'Trends', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=150&q=80' },
    { id: 'shirts-tees', label: 'Shirts, Tees', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=150&q=80' },
    { id: 'jeans', label: 'Jeans', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=150&q=80' },
    { id: 'sports-shoes', label: 'Sports Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=150&q=80' },
    { id: 'watches', label: 'Watches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=150&q=80' },
    { id: 'kids-clothing', label: "Kids' clothing", image: 'https://images.unsplash.com/photo-1519241047957-be31d7379a5d?auto=format&fit=crop&w=150&q=80' },
    { id: 'luggage', label: 'Luggage', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=150&q=80' },
    { id: 'trackpants', label: 'Trackpants', image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=150&q=80' },
    { id: 'casual-wear', label: 'Casual Wear', image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=150&q=80' },
    { id: 'kurta-pajama', label: 'Kurta, pajama', image: 'https://images.unsplash.com/photo-1596455607563-ad6193f76b11?auto=format&fit=crop&w=150&q=80' },
    { id: 'briefs', label: 'Briefs', image: 'https://images.unsplash.com/photo-1616150854483-294025a1f649?auto=format&fit=crop&w=150&q=80' },
  ];

  const handleCategoryClick = (categoryId) => {
    navigate(`/products/fashion/${categoryId}`);
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
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-4">
          {subCategories.map((cat) => (
            <div 
              key={cat.id} 
              onClick={() => handleCategoryClick(cat.id)}
              className="flex flex-col items-center gap-2 cursor-pointer group"
            >
              <div className="w-full aspect-square bg-[#FDF8E4] rounded-xl overflow-hidden flex items-center justify-center p-2 group-hover:shadow-md transition-shadow">
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
