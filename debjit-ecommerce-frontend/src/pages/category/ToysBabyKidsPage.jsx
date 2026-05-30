import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ToysBabyKidsPage() {
  const navigate = useNavigate();

  const subCategories = [
    { id: 'minutes', label: 'Get in Mins.', image: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=150&q=80' },
    { id: 'diapers', label: 'Diapers', image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=150&q=80' },
    { id: 'toys-games', label: 'Toys & games', image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=150&q=80' },
    { id: 'skin-hair-care', label: 'Skin & hair care', image: 'https://images.unsplash.com/photo-1556228720-1c2773d2a7cc?auto=format&fit=crop&w=150&q=80' },
    { id: 'top-brands', label: 'Top brands', image: 'https://images.unsplash.com/photo-1581557991964-198650ed018e?auto=format&fit=crop&w=150&q=80' },
    { id: 'wipes', label: 'Wipes', image: 'https://images.unsplash.com/photo-1584305574637-25e17da9d630?auto=format&fit=crop&w=150&q=80' },
    { id: 'stationery', label: 'Stationery', image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=150&q=80' },
    { id: 'walkers', label: 'Walkers & more', image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=150&q=80' },
    { id: 'summer-play', label: 'Summer play', image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=150&q=80' },
    { id: 'combos', label: 'Combos', image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=150&q=80' },
    { id: 'school-supplies', label: 'School supplies', image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=150&q=80' },
  ];

  const handleCategoryClick = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
  };

  return (
    <div className="flex-grow w-full bg-white pb-12">
      <div className="w-full px-4 md:px-10 lg:px-16 xl:px-24 mx-auto pt-10">

        {/* Categories Grid */}
        <div className="flex gap-6 overflow-x-auto scrollbar-hide py-4 mb-8">
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
