import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import BrandCard from './BrandCard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Brand data reflecting the design
const brandsData = [
  {
    id: 1,
    brandName: 'Iphone',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    phoneImage: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=300&q=80',
    discountText: 'UP to 80% OFF',
    styles: {
      bgColor: '#333333',
      circleColor: '#3F3F3F',
      textColor: '#FFFFFF',
      tagBgColor: '#4A4A4A',
      tagTextColor: '#B3B3B3',
    }
  },
  {
    id: 2,
    brandName: 'Realme',
    logo: '',
    phoneImage: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=300&q=80',
    discountText: 'UP to 80% OFF',
    styles: {
      bgColor: '#FFF5CC',
      circleColor: '#FFEB99',
      textColor: '#1A1A1A',
      tagBgColor: '#F0E6A1',
      tagTextColor: '#A8923A',
    }
  },
  {
    id: 3,
    brandName: 'Xiaomi',
    logo: '',
    phoneImage: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=300&q=80',
    discountText: 'UP to 80% OFF',
    styles: {
      bgColor: '#FFEAE0',
      circleColor: '#FFD6C2',
      textColor: '#1A1A1A',
      tagBgColor: '#F5D3C4',
      tagTextColor: '#C25A2B',
    }
  },
  {
    id: 4,
    brandName: 'Samsung',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
    phoneImage: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=300&q=80',
    discountText: 'UP to 80% OFF',
    styles: {
      bgColor: '#E1F5FE',      // Pastel light blue
      circleColor: '#B3E5FC',
      textColor: '#0D47A1',
      tagBgColor: '#B3E5FC',
      tagTextColor: '#0D47A1',
    }
  },
  {
    id: 5,
    brandName: 'OnePlus',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/29/OnePlus_logo.svg',
    phoneImage: 'https://images.unsplash.com/photo-1642425149556-b6f90e946859?auto=format&fit=crop&w=300&q=80',
    discountText: 'UP to 80% OFF',
    styles: {
      bgColor: '#FFEBEE',      // Soft pastel red/pink tint
      circleColor: '#FFCDD2',
      textColor: '#1A1A1A',
      tagBgColor: '#FFCDD2',
      tagTextColor: '#C62828',
    }
  },
  {
    id: 6,
    brandName: 'Google Pixel',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    phoneImage: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=300&q=80',
    discountText: 'UP to 80% OFF',
    styles: {
      bgColor: '#F4F4F5',      // Neutral minimal light grey
      circleColor: '#E4E4E7',
      textColor: '#18181B',
      tagBgColor: '#E4E4E7',
      tagTextColor: '#52525B',
    }
  },
  {
    id: 7,
    brandName: 'Nothing',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Nothing_Logo.svg',
    phoneImage: 'https://images.unsplash.com/photo-1678834469591-62fc97e3a985?auto=format&fit=crop&w=300&q=80',
    discountText: 'UP to 80% OFF',
    styles: {
      bgColor: '#1A1A1A',      // Sleek stark dark theme
      circleColor: '#262626',
      textColor: '#FFFFFF',
      tagBgColor: '#262626',
      tagTextColor: '#A3A3A3',
    }
  },
  {
    id: 8,
    brandName: 'Motorola',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Motorola_logo.svg',
    phoneImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=80',
    discountText: 'UP to 80% OFF',
    styles: {
      bgColor: '#E0F2F1',      // Pastel teal
      circleColor: '#B2DFDB',
      textColor: '#004D40',
      tagBgColor: '#B2DFDB',
      tagTextColor: '#004D40',
    }
  },
  {
    id: 9,
    brandName: 'Vivo',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Vivo_logo.svg',
    phoneImage: 'https://images.unsplash.com/photo-1565630916779-e303be97b6f5?auto=format&fit=crop&w=300&q=80',
    discountText: 'UP to 80% OFF',
    styles: {
      bgColor: '#E8EAF6',      // Soft Indigo
      circleColor: '#C5CAE9',
      textColor: '#1A237E',
      tagBgColor: '#C5CAE9',
      tagTextColor: '#283593',
    }
  },
  {
    id: 10,
    brandName: 'Oppo',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Oppo_Logo.svg',
    phoneImage: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=300&q=80',
    discountText: 'UP to 80% OFF',
    styles: {
      bgColor: '#E8F5E9',      // Pastel Mint Green
      circleColor: '#C8E6C9',
      textColor: '#1B5E20',
      tagBgColor: '#C8E6C9',
      tagTextColor: '#2E7D32',
    }
  }
];

export default function BrandSection() {
  return (
    <div className="w-full mb-10">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-2">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-700 flex items-center gap-2">
          Top
          <span className="text-[#0A88FF] font-semibold relative">
            Electronics Brands
            <span className="absolute -bottom-[11px] left-0 w-full h-[3px] bg-[#0A88FF]"></span>
          </span>
        </h2>
        <a href="#" className="text-sm font-semibold text-gray-500 hover:text-[#0A88FF] flex items-center gap-1 transition-colors">
          View All <span className="text-[#0A88FF] text-lg leading-none font-bold">&rsaquo;</span>
        </a>
      </div>

      {/* Swiper Slider */}
      <div className="brands-carousel-wrapper">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="mySwiper !pb-12"
        >
          {brandsData.map((brand) => (
            <SwiperSlide key={brand.id}>
              <BrandCard {...brand} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
