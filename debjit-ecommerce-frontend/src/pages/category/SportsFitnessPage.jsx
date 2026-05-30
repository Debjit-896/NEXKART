import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SportsFitnessPage() {
  const navigate = useNavigate();

  const banners = [
    { id: 1, image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80', title: 'New deals every day', discount: 'Cycles, dumbels & more' },
  ];

  const subCategories = [
    { id: 'minutes', label: 'Get in Mins.', image: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=150&q=80' },
    { id: 'ball-sports', label: 'Ball sports', image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=150&q=80' },
    { id: 'fitness', label: 'Fitness', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=150&q=80' },
    { id: 'kids-favorites', label: 'Kids\' favorites', image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=150&q=80' },
    { id: 'cricket', label: 'Cricket', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=150&q=80' },
    { id: 'cycles', label: 'Cycles', image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=150&q=80' },
    { id: 'supplements', label: 'Supplements', image: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?auto=format&fit=crop&w=150&q=80' },
    { id: 'home-gym-combo', label: 'Home gym combo', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=150&q=80' },
    { id: 'badminton', label: 'Badminton', image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=150&q=80' },
    { id: 'yoga', label: 'Yoga', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=150&q=80' },
    { id: 'kids-cycles', label: 'Kids\' cycles', image: 'https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?auto=format&fit=crop&w=150&q=80' },
    { id: 'indoor-sports', label: 'Indoor sports', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=150&q=80' },
    { id: 'treadmills', label: 'Treadmills', image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=150&q=80' },
    { id: 'exercise-bike', label: 'Exercise bike', image: 'https://images.unsplash.com/photo-1532384816664-01b8b7238c8d?auto=format&fit=crop&w=150&q=80' },
    { id: 'camping', label: 'Camping', image: 'https://images.unsplash.com/photo-1504280390227-331bfcb19224?auto=format&fit=crop&w=150&q=80' },
  ];

  const handleCategoryClick = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
  };

  return (
    <div className="flex-grow w-full bg-white pb-12">
      <div className="w-full px-4 md:px-10 lg:px-16 xl:px-24 mx-auto pt-6">
        
        {/* Categories Grid */}
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 mb-10">
          {subCategories.map((cat) => (
            <div 
              key={cat.id} 
              onClick={() => handleCategoryClick(cat.id)}
              className="flex flex-col items-center gap-2 cursor-pointer group"
            >
              <div className="w-full aspect-square bg-[#FFF3E0] rounded-xl overflow-hidden flex items-center justify-center p-2 group-hover:shadow-md transition-shadow">
                <img src={cat.image} alt={cat.label} className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300" />
              </div>
              <span className="text-[12px] md:text-[13px] font-medium text-gray-800 text-center leading-tight">
                {cat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Banners Section */}
        <div className="w-full h-48 md:h-64 rounded-xl overflow-hidden relative flex-shrink-0 shadow-sm bg-[#FCE663]">
          <div className="absolute inset-0 flex flex-col p-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-4">New deals every day</h3>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide flex-grow">
               <div className="w-40 bg-white rounded-lg p-2 shadow-sm flex-shrink-0 flex flex-col">
                  <img src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=150&q=80" className="h-24 w-full object-contain mb-2" />
                  <span className="font-semibold text-sm text-center">Cycles</span>
               </div>
               <div className="w-40 bg-white rounded-lg p-2 shadow-sm flex-shrink-0 flex flex-col">
                  <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=150&q=80" className="h-24 w-full object-contain mb-2" />
                  <span className="font-semibold text-sm text-center">Dumbbells</span>
               </div>
               <div className="w-40 bg-white rounded-lg p-2 shadow-sm flex-shrink-0 flex flex-col">
                  <img src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=150&q=80" className="h-24 w-full object-contain mb-2" />
                  <span className="font-semibold text-sm text-center">Treadmills</span>
               </div>
               <div className="w-40 bg-white rounded-lg p-2 shadow-sm flex-shrink-0 flex flex-col">
                  <img src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=150&q=80" className="h-24 w-full object-contain mb-2" />
                  <span className="font-semibold text-sm text-center">Cricket bats</span>
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
