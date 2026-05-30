import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FoodHealthPage() {
  const navigate = useNavigate();

  const banners = [
    { id: 1, image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80', title: 'Beat the heat', discount: 'Up to 60% Off' },
    { id: 2, image: 'https://images.unsplash.com/photo-1498837167922-41c54bfa3972?auto=format&fit=crop&w=800&q=80', title: 'Food bestsellers', discount: 'Up to 65% Off' },
    { id: 3, image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80', title: 'Pet summer ess', discount: 'Up to 80% Off' },
  ];

  const subCategories = [
    { id: 'dry-fruits', label: 'Dry fruits', image: 'https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?auto=format&fit=crop&w=150&q=80' },
    { id: 'beverages', label: 'Beverages', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=150&q=80' },
    { id: 'gourmet', label: 'Gourmet', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=150&q=80' },
    { id: 'chocolates', label: 'Chocolates', image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=150&q=80' },
    { id: 'breakfast-picks', label: 'Breakfast picks', image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=150&q=80' },
    { id: 'summer-finds', label: 'Summer finds', image: 'https://images.unsplash.com/photo-1498837167922-41c54bfa3972?auto=format&fit=crop&w=150&q=80' },
    { id: 'cooking-needs', label: 'Cooking needs', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=150&q=80' },
    { id: 'minutes', label: 'Get it in Mins.', image: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=150&q=80' },
    { id: 'pet-food', label: 'Pet food', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=150&q=80' },
    { id: 'health-drinks', label: 'Health drinks', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=150&q=80' },
    { id: 'proteins', label: 'Proteins', image: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?auto=format&fit=crop&w=150&q=80' },
    { id: 'vitamins', label: 'Vitamins', image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=150&q=80' },
    { id: 'hydrate-here', label: 'Hydrate here', image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=150&q=80' },
    { id: 'ayurveda', label: 'Ayurveda', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=150&q=80' },
    { id: 'beauty-picks', label: 'Beauty Picks', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=150&q=80' },
    { id: 'med-supplies', label: 'Med supplies', image: 'https://images.unsplash.com/photo-1584308666744-24d5e1cc1529?auto=format&fit=crop&w=150&q=80' },
    { id: 'household', label: 'Household', image: 'https://images.unsplash.com/photo-1584820927498-cafe4c2317fa?auto=format&fit=crop&w=150&q=80' },
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
              <div className="w-full aspect-square bg-[#FFEDD5] rounded-xl overflow-hidden flex items-center justify-center p-2 group-hover:shadow-md transition-shadow">
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
            <div key={banner.id} className="min-w-[300px] md:min-w-[400px] h-32 md:h-48 rounded-xl overflow-hidden relative flex-shrink-0 cursor-pointer shadow-sm hover:shadow-md transition-shadow">
              <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#e35a1e]/90 to-transparent flex flex-col justify-center p-6 text-white">
                <h3 className="text-xl md:text-2xl font-bold leading-tight mb-1">{banner.title}</h3>
                <p className="text-lg font-bold text-yellow-300">{banner.discount}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
