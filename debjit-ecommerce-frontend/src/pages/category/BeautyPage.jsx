import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BeautyPage() {
  const navigate = useNavigate();

  const subCategories = [
    { id: 'skin-care', label: 'Skin Care', image: 'https://images.unsplash.com/photo-1611077542456-407677b61f88?auto=format&fit=crop&w=150&q=80' },
    { id: 'top-50', label: 'Top 50 deals', image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=150&q=80' },
    { id: 'hair-care', label: 'Hair Care', image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=150&q=80' },
    { id: 'mens-grooming', label: 'Mens grooming', image: 'https://images.unsplash.com/photo-1559981442-1262d5e2197f?auto=format&fit=crop&w=150&q=80' },
    { id: 'makeup', label: 'Makeup', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=150&q=80' },
    { id: 'premium', label: 'Premium', image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=150&q=80' },
    { id: 'fragrances', label: 'Fragrances', image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=150&q=80' },
    { id: 'derma', label: 'Derma', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=150&q=80' },
    { id: 'personal-care', label: 'Personal care', image: 'https://images.unsplash.com/photo-1556228720-1c2773d2a7cc?auto=format&fit=crop&w=150&q=80' },
    { id: 'k-beauty', label: 'K-beauty', image: 'https://images.unsplash.com/photo-1599847113110-388a6d68bba3?auto=format&fit=crop&w=150&q=80' },
    { id: 'hygiene', label: 'Hygiene', image: 'https://images.unsplash.com/photo-1584305574637-25e17da9d630?auto=format&fit=crop&w=150&q=80' },
  ];

  const handleCategoryClick = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
  };

  return (
    <div className="flex-grow w-full bg-white pb-12">
      <div className="w-full px-4 md:px-10 lg:px-16 xl:px-24 mx-auto pt-10">

        {/* Categories Grid (No banners in screenshot, just a grid of items) */}
        <div className="flex gap-6 overflow-x-auto scrollbar-hide py-4">
          {subCategories.map((cat) => (
            <div 
              key={cat.id} 
              onClick={() => handleCategoryClick(cat.id)}
              className="flex flex-col items-center gap-2 cursor-pointer group min-w-[100px]"
            >
              <div className="w-24 h-24 bg-[#FFEDD5] rounded-xl overflow-hidden flex items-center justify-center p-2 group-hover:shadow-md transition-shadow">
                <img src={cat.image} alt={cat.label} className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300" />
              </div>
              <span className="text-[13px] font-medium text-gray-800 text-center leading-tight">
                {cat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
