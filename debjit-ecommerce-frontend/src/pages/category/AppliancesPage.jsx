import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AppliancesPage() {
  const navigate = useNavigate();

  const banners = [
    { id: 1, image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80', title: 'FX Mini LED Series', discount: 'Launching on 4th June' },
    { id: 2, image: 'https://images.unsplash.com/photo-1552554705-7286a11af3e0?auto=format&fit=crop&w=800&q=80', title: '2026 Edition', discount: 'Shop Now' },
    { id: 3, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80', title: 'Premium TVs', discount: 'Up to 50% Off' },
  ];

  const subCategories = [
    { id: 'televisions', label: 'Televisions', image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=150&q=80' },
    { id: 'coolers', label: 'Coolers', image: 'https://images.unsplash.com/photo-1585250485600-85ee9180f124?auto=format&fit=crop&w=150&q=80' },
    { id: 'kitchen', label: 'Kitchen', image: 'https://images.unsplash.com/photo-1584269600519-112d071b65e6?auto=format&fit=crop&w=150&q=80' },
    { id: 'home', label: 'Home', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=150&q=80' },
    { id: 'inverters', label: 'Inverters', image: 'https://images.unsplash.com/photo-1628108169123-dc9550e05ba8?auto=format&fit=crop&w=150&q=80' },
    { id: 'stabilizers', label: 'Stabilizers', image: 'https://images.unsplash.com/photo-1584305574637-25e17da9d630?auto=format&fit=crop&w=150&q=80' },
    { id: 'built-in-appliances', label: 'Built-in appliances', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=150&q=80' },
    { id: 'microwave-ovens', label: 'Microwave Ovens', image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=150&q=80' },
    { id: 'acs', label: 'ACs', image: 'https://images.unsplash.com/photo-1585250485600-85ee9180f124?auto=format&fit=crop&w=150&q=80' },
    { id: 'laundry', label: 'Laundry', image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=150&q=80' },
    { id: 'fridges', label: 'Fridges', image: 'https://images.unsplash.com/photo-1584273523555-467f9a8dd642?auto=format&fit=crop&w=150&q=80' },
    { id: 'dishwashers', label: 'Dishwashers', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=150&q=80' },
    { id: 'freezer', label: 'Freezer', image: 'https://images.unsplash.com/photo-1584273523555-467f9a8dd642?auto=format&fit=crop&w=150&q=80' },
    { id: 'flipkart-league', label: 'Flipkart League', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=150&q=80' },
    { id: 'fk-originals', label: 'FK Originals', image: 'https://images.unsplash.com/photo-1552554705-7286a11af3e0?auto=format&fit=crop&w=150&q=80' },
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
              <div className="w-full aspect-square bg-[#E0E7FF] rounded-xl overflow-hidden flex items-center justify-center p-2 group-hover:shadow-md transition-shadow">
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
