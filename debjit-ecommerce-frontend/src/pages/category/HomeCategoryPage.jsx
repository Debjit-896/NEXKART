import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomeCategoryPage() {
  const navigate = useNavigate();

  const banners = [
    { id: 1, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80', title: 'Lowest Price of the Year', discount: 'Up to 90% OFF' },
    { id: 2, image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', title: 'Be the best host!', discount: 'Up to 60% Off' },
    { id: 3, image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80', title: 'Best furnishing finds', discount: 'Up to 70% Off' },
  ];

  const subCategories = [
    { id: 'dining', label: 'Dining', image: 'https://images.unsplash.com/photo-1518136247453-74e7b5265980?auto=format&fit=crop&w=150&q=80' },
    { id: 'bedsheets', label: 'Bedsheets', image: 'https://images.unsplash.com/photo-1629853965935-4d2be73887b4?auto=format&fit=crop&w=150&q=80' },
    { id: 'bath-linen', label: 'Bath linen', image: 'https://images.unsplash.com/photo-1601614742718-ceebbc183204?auto=format&fit=crop&w=150&q=80' },
    { id: 'wallpaper', label: 'Wallpaper', image: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&w=150&q=80' },
    { id: 'utilities', label: 'Utilities', image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=150&q=80' },
    { id: 'hardware', label: 'Hardware', image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=150&q=80' },
    { id: 'lighting', label: 'Lighting', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=150&q=80' },
    { id: 'containers', label: 'Containers', image: 'https://images.unsplash.com/photo-1590740924976-b3eb2b00fdfb?auto=format&fit=crop&w=150&q=80' },
    { id: 'mats-rugs', label: 'Mats & rugs', image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=150&q=80' },
    { id: 'sofas', label: 'Sofas', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=150&q=80' },
    { id: 'protectors', label: 'Protectors', image: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&w=150&q=80' },
    { id: 'minutes', label: 'Minutes', image: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=150&q=80' },
    { id: 'decor', label: 'Decor', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=150&q=80' },
    { id: 'drinkware', label: 'Drinkware', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=150&q=80' },
    { id: 'bathroom', label: 'Bathroom', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=150&q=80' },
    { id: 'cookware', label: 'Cookware', image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=150&q=80' },
    { id: 'mosquito-nets', label: 'Mosquito nets', image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=150&q=80' },
    { id: 'cleaning', label: 'Cleaning', image: 'https://images.unsplash.com/photo-1584820927498-cafe4c2317fa?auto=format&fit=crop&w=150&q=80' },
    { id: 'mattresses', label: 'Mattresses', image: 'https://images.unsplash.com/photo-1631557984465-27a3c31e21b5?auto=format&fit=crop&w=150&q=80' },
    { id: 'beds', label: 'Beds', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=150&q=80' },
    { id: 'gardening', label: 'Gardening', image: 'https://images.unsplash.com/photo-1416879598555-220b33b003c9?auto=format&fit=crop&w=150&q=80' },
    { id: 'solar', label: 'Solar', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=150&q=80' },
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
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-4">
          {subCategories.map((cat) => (
            <div 
              key={cat.id} 
              onClick={() => handleCategoryClick(cat.id)}
              className="flex flex-col items-center gap-2 cursor-pointer group"
            >
              <div className="w-full aspect-square bg-[#FFF3E0] rounded-xl overflow-hidden flex items-center justify-center p-1 group-hover:shadow-md transition-shadow">
                <img src={cat.image} alt={cat.label} className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300" />
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
