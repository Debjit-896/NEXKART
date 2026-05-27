import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

export default function ProductCarousel({ title, products }) {
  return (
    <div className="w-full py-10 border-t border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <Link to="/" className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">View All</Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {products.map((product, index) => (
          <Link to={`/product/${product.id || index + 1}`} key={index} className="flex flex-col group cursor-pointer">
            {/* Image */}
            <div className="relative aspect-[3/4] bg-[#F4F5F7] rounded-lg overflow-hidden mb-3">
              <img
                src={product.image}
                alt={product.name || product.title}
                className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Details */}
            <div>
              <p className="text-xs text-gray-500 mb-0.5">{product.brand || 'Brand'}</p>
              <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 mb-1">{product.name || product.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-1 mb-1">{product.subtitle || ''}</p>

              <div className="flex items-center space-x-2 mb-1">
                <span className="text-base font-bold text-gray-900">${product.displayPrice || product.price}</span>
              </div>

              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span className="flex items-center">
                  {product.rating || '4.5'} <Star size={10} fill="#FF9F00" className="text-[#FF9F00] ml-0.5" />
                </span>
                <span>{product.sold || '1,238 Sold'}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
