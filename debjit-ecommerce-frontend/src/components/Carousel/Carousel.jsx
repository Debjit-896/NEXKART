import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerData = [
    {
      id: 1,
      bg: 'bg-[#21273D]', // Dark Navy
      tagline: 'Best Deal Online on smart watches',
      title: 'SMART WEARABLE.',
      subtitle: 'UP to 80% OFF',
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=400&q=80',
      dots: true,
    },
    {
      id: 2,
      bg: 'bg-[#0A88FF]', // Vivid Blue
      tagline: 'Mega Sale on Laptops',
      title: 'POWERFUL MACHINES.',
      subtitle: 'Starting at ₹29,990',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=400&q=80',
      dots: false,
    },
    {
      id: 3,
      bg: 'bg-[#155E75]', // Teal/Cyan Dark
      tagline: 'Upgrade your home setup',
      title: 'PREMIUM FURNITURE.',
      subtitle: 'Extra 20% OFF on Cards',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80',
      dots: false,
    },
    {
      id: 4,
      bg: 'bg-[#1E1B4B]', // Deep Indigo
      tagline: 'Immersive sound, everywhere',
      title: 'AUDIO & HEADPHONES.',
      subtitle: 'No Cost EMI from ₹999/mo',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
      dots: false,
    },
    {
      id: 5,
      bg: 'bg-[#111827]', // Jet Black
      tagline: 'Next-gen mobile experience',
      title: 'FLAGSHIP PHONES.',
      subtitle: 'Exchange Bonus Up to ₹10,000',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
      dots: false,
    },
    {
      id: 6,
      bg: 'bg-[#065F46]', // Forest Green
      tagline: 'Step up your fitness game',
      title: 'ATHLETIC FOOTWEAR.',
      subtitle: 'Flat 40% OFF | Nike, Adidas & More',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
      dots: false,
    },
    {
      id: 7,
      bg: 'bg-[#7C2D12]', // Terracotta/Rust Red
      tagline: 'Chef-grade kitchen essentials',
      title: 'SMART APPLIANCES.',
      subtitle: 'Free Installation & 2 Year Warranty',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80',
      dots: false,
    },
    {
      id: 8,
      bg: 'bg-[#581C87]', // Deep Purple
      tagline: 'Level up your gameplay',
      title: 'GAMING ZONE.',
      subtitle: 'Latest Consoles & Accessories',
      image: 'https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?auto=format&fit=crop&w=400&q=80',
      dots: false,
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === bannerData.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [bannerData.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev === bannerData.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? bannerData.length - 1 : prev - 1));

  return (
    <div className="relative w-full mb-6 px-4 sm:px-8 md:px-12">
      {/* Main Banner Track Wrapper */}
      <div className="w-full h-[220px] sm:h-[260px] md:h-[320px] rounded-xl overflow-hidden relative group shadow-sm">

        {/* Slides Container */}
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {bannerData.map((slide) => (
            <div key={slide.id} className={`w-full h-full flex-shrink-0 ${slide.bg} flex items-center justify-between px-8 md:px-16 lg:px-24 relative overflow-hidden`}>

              {/* Decorative background curves/circles matching the image style */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] border-[1px] border-white/5 rounded-full -translate-y-1/2 translate-x-1/4"></div>
              <div className="absolute top-0 right-0 w-[600px] h-[600px] border-[1px] border-white/5 rounded-full -translate-y-1/3 translate-x-1/3"></div>
              <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] border-[1px] border-white/5 rounded-full translate-y-1/2"></div>

              {/* Text Content */}
              <div className="flex flex-col z-10 w-full md:w-1/2 text-left justify-center h-full pt-4 pb-12 sm:pb-0">
                <p className="text-white/90 font-medium text-xs sm:text-sm md:text-base lg:text-lg mb-1 sm:mb-2">{slide.tagline}</p>
                <h2 className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-1 sm:mb-3 tracking-tight leading-snug">{slide.title}</h2>
                <p className="text-white/80 text-sm sm:text-lg lg:text-xl font-medium tracking-wide">{slide.subtitle}</p>

                {/* Decorative dotted line matching the image */}
                {slide.dots && (
                  <div className="mt-4 sm:mt-6 hidden sm:flex gap-2 items-center">
                    <div className="w-6 h-1.5 bg-white rounded-full opacity-100"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full opacity-100"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full opacity-100"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full opacity-100"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full opacity-100"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full opacity-100"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full opacity-100"></div>
                  </div>
                )}
              </div>

              {/* Image Content */}
              <div className="hidden sm:flex w-1/2 h-full items-center justify-end z-10 relative">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 object-cover rounded-[2rem] shadow-2xl mix-blend-normal"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots (Moved to bottom-left) */}
        <div className="absolute bottom-4 sm:bottom-6 left-8 md:left-16 flex items-center gap-2 z-20">
          {bannerData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`rounded-full transition-all duration-300 ${currentSlide === index ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/60 hover:bg-white/90'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Arrows (Outside the banner with notch effect) */}
      <button
        onClick={prevSlide}
        className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#F6FAFF] text-[#0A88FF] rounded-full flex items-center justify-center shadow-md ring-[8px] ring-white z-30 transition-transform hover:scale-105 focus:outline-none"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} strokeWidth={2.5} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#F6FAFF] text-[#0A88FF] rounded-full flex items-center justify-center shadow-md ring-[8px] ring-white z-30 transition-transform hover:scale-105 focus:outline-none"
        aria-label="Next slide"
      >
        <ChevronRight size={20} strokeWidth={2.5} />
      </button>

    </div>
  );
}
