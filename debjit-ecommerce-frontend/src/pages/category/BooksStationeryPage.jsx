import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BooksStationeryPage() {
  const navigate = useNavigate();

  const subCategories = [
    { id: 'minutes', label: 'Get in Mins.', image: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=150&q=80' },
    { id: 'fiction', label: 'Fiction', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=150&q=80' },
    { id: 'non-fiction', label: 'Non-Fiction', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=150&q=80' },
    { id: 'academic', label: 'Academic', image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=150&q=80' },
    { id: 'kids-books', label: 'Kids\' Books', image: 'https://images.unsplash.com/photo-1629992101753-56d196c8aabb?auto=format&fit=crop&w=150&q=80' },
    { id: 'exam-prep', label: 'Exam Prep', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=150&q=80' },
    { id: 'self-help', label: 'Self Help', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=150&q=80' },
    { id: 'comics', label: 'Comics', image: 'https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?auto=format&fit=crop&w=150&q=80' },
    { id: 'pens', label: 'Pens', image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&fit=crop&w=150&q=80' },
    { id: 'notebooks', label: 'Notebooks', image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=150&q=80' },
    { id: 'art-supplies', label: 'Art Supplies', image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=150&q=80' },
    { id: 'calculators', label: 'Calculators', image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=150&q=80' },
    { id: 'school-bags', label: 'School Bags', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=150&q=80' },
    { id: 'office-supplies', label: 'Office Supplies', image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=150&q=80' },
    { id: 'diaries', label: 'Diaries', image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=150&q=80' },
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

        {/* Deals Banner */}
        <div className="w-full h-48 md:h-64 rounded-xl overflow-hidden relative shadow-sm bg-gradient-to-r from-[#FF6F00] to-[#FFB300]">
          <div className="absolute inset-0 flex flex-col p-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4">Bestselling Books</h3>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide flex-grow">
              <div className="w-40 bg-white rounded-lg p-2 shadow-sm flex-shrink-0 flex flex-col">
                <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=150&q=80" className="h-24 w-full object-contain mb-2" />
                <span className="font-semibold text-sm text-center">Fiction</span>
              </div>
              <div className="w-40 bg-white rounded-lg p-2 shadow-sm flex-shrink-0 flex flex-col">
                <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=150&q=80" className="h-24 w-full object-contain mb-2" />
                <span className="font-semibold text-sm text-center">Non-Fiction</span>
              </div>
              <div className="w-40 bg-white rounded-lg p-2 shadow-sm flex-shrink-0 flex flex-col">
                <img src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=150&q=80" className="h-24 w-full object-contain mb-2" />
                <span className="font-semibold text-sm text-center">Academic</span>
              </div>
              <div className="w-40 bg-white rounded-lg p-2 shadow-sm flex-shrink-0 flex flex-col">
                <img src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=150&q=80" className="h-24 w-full object-contain mb-2" />
                <span className="font-semibold text-sm text-center">Self Help</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
