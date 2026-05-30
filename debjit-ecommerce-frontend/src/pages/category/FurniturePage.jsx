import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FurniturePage() {
  const navigate = useNavigate();

  const subCategories = [
    { id: 'mattresses', label: 'Mattresses', image: 'https://images.unsplash.com/photo-1631557984465-27a3c31e21b5?auto=format&fit=crop&w=150&q=80' },
    { id: 'office-chairs', label: 'Office chairs', image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=150&q=80' },
    { id: 'beds', label: 'Beds', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=150&q=80' },
    { id: 'wardrobes', label: 'Wardrobes', image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=150&q=80' },
    { id: 'office-tables', label: 'Office tables', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=150&q=80' },
    { id: 'recliners', label: 'Recliners', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=150&q=80' },
    { id: 'hammock', label: 'Hammock', image: 'https://images.unsplash.com/photo-1520038410233-7141be7e6f97?auto=format&fit=crop&w=150&q=80' },
    { id: 'collapsibles', label: 'Collapsibles', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=150&q=80' },
    { id: 'bean-bags', label: 'Bean bags', image: 'https://images.unsplash.com/photo-1590500696498-032a4d30b7e6?auto=format&fit=crop&w=150&q=80' },
    { id: 'home-temples', label: 'Home temples', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=150&q=80' },
    { id: 'kids-furniture', label: 'Kids\' furniture', image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=150&q=80' },
    { id: 'sofas', label: 'Sofas', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=150&q=80' },
    { id: 'dining-sets', label: 'Dining sets', image: 'https://images.unsplash.com/photo-1518136247453-74e7b5265980?auto=format&fit=crop&w=150&q=80' },
    { id: 'coffee-tables', label: 'Coffee tables', image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=150&q=80' },
    { id: 'dressing-tables', label: 'Dressing tables', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=150&q=80' },
    { id: 'sofa-beds', label: 'Sofa beds', image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=150&q=80' },
    { id: 'tv-units', label: 'TV units', image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=150&q=80' },
    { id: 'laptop-tables', label: 'Laptop tables', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=150&q=80' },
    { id: 'shoe-racks', label: 'Shoe racks', image: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=150&q=80' },
    { id: 'inflatable-sofas', label: 'Inflatable sofas', image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=150&q=80' },
  ];

  const handleCategoryClick = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
  };

  return (
    <div className="flex-grow w-full bg-white pb-12">
      <div className="w-full px-4 md:px-10 lg:px-16 xl:px-24 mx-auto pt-6">

        {/* Categories Grid */}
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-4 mb-10">
          {subCategories.map((cat) => (
            <div 
              key={cat.id} 
              onClick={() => handleCategoryClick(cat.id)}
              className="flex flex-col items-center gap-2 cursor-pointer group"
            >
              <div className="w-full aspect-square bg-[#FFF8E1] rounded-xl overflow-hidden flex items-center justify-center p-1 group-hover:shadow-md transition-shadow">
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
