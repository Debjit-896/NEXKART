import React from 'react';
import Carousel from '../components/Carousel/Carousel';
import ProductSection from '../components/ProductSection/ProductSection';
import TopCategoriesSection from '../components/TopCategoriesSection/TopCategoriesSection';
import BrandSection from '../components/BrandSection/BrandSection';
import DailyEssentialsSection from '../components/DailyEssentialsSection/DailyEssentialsSection';
import SpotlightsSection from '../components/SpotlightsSection/SpotlightsSection';
import ProductGridSection from '../components/ProductGridSection/ProductGridSection';

export default function HomePage() {
  const smartphones = [
    { id: 1, name: 'Galaxy S22 Ultra', price: '32999', originalPrice: '74999', save: '32999', discount: '56%', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=200&q=80' },
    { id: 2, name: 'Galaxy M13 (4GB | 64 GB )', price: '10499', originalPrice: '14999', save: '4500', discount: '56%', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=200&q=80' },
    { id: 3, name: 'Galaxy M33 (4GB | 64 GB )', price: '16999', originalPrice: '24999', save: '8000', discount: '56%', image: 'https://images.unsplash.com/photo-1533228100845-08145b01de14?auto=format&fit=crop&w=200&q=80' },
    { id: 4, name: 'Galaxy M53 (4GB | 64 GB )', price: '31999', originalPrice: '40999', save: '9000', discount: '56%', image: 'https://images.unsplash.com/photo-1544228428-1b22e1180b72?auto=format&fit=crop&w=200&q=80' },
    { id: 5, name: 'Galaxy S22 Ultra', price: '67999', originalPrice: '85999', save: '18000', discount: '56%', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cd8d3?auto=format&fit=crop&w=200&q=80' },
  ];

  const topCategories = [
    { name: 'Mobile', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=100&q=80', active: false },
    { name: 'Cosmetics', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=100&q=80', active: false },
    { name: 'Electronics', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=100&q=80', active: false },
    { name: 'Furniture', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=100&q=80', active: false },
    { name: 'Watches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=100&q=80', active: false },
    { name: 'Decor', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=100&q=80', active: false },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=100&q=80', active: false },
  ];

  const dailyEssentials = [
    { name: 'Daily Essentials', discount: 'UP to 50% OFF', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=200&q=80', active: false },
    { name: 'Vegitables', discount: 'UP to 50% OFF', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=200&q=80', active: false },
    { name: 'Fruits', discount: 'UP to 50% OFF', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=200&q=80', active: false },
    { name: 'Strowberry', discount: 'UP to 50% OFF', image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=200&q=80', active: false },
    { name: 'Mango', discount: 'UP to 50% OFF', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=200&q=80', active: false },
    { name: 'Cherry', discount: 'UP to 50% OFF', image: 'https://images.unsplash.com/photo-1528821128474-27f963b062bf?auto=format&fit=crop&w=200&q=80', active: false },
  ];

  const spotlights = [
    { subtitle: 'Most Loved', title: 'Top Rated', image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=400&q=80', badge: '4 STAR RATED' },
    { subtitle: 'Popular', title: 'Min. 70% Off', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=400&q=80' },
    { subtitle: 'Most Loved', title: 'Top Rated', image: 'https://images.unsplash.com/photo-1581404118029-7756f70dc01b?auto=format&fit=crop&w=400&q=80', badge: '4 STAR RATED' },
    { subtitle: 'Top Rated', title: 'Min. 50% Off', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80' },
  ];

  const coolSummer = [
    { subtitle: 'Face Wash', title: 'Min. 50% Off', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=400&q=80' },
    { subtitle: "Men's Casual Shoes", title: 'Min. 70% Off', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80' },
    { subtitle: "Men's Track Pants", title: 'Min. 50% Off', image: 'https://images.unsplash.com/photo-1584865288642-42078afe6942?auto=format&fit=crop&w=400&q=80' },
    { subtitle: "Men's Slippers & Flip Flops", title: 'Min. 70% Off', image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=400&q=80' },
  ];

  const suggestedProducts = [
    { brand: 'Apple', title: 'iPhone 17 Pro Max', image: 'https://images.unsplash.com/photo-1605236453806-6ff368528761?auto=format&fit=crop&w=400&q=80', rating: '4.8', reviews: '1,030', price: '1,49,900', bankOffer: '1,43,900' },
    { brand: 'NIKORA', title: 'Women Viscose Kurti', image: 'https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=400&q=80', rating: '4.1', reviews: '2,227', price: '398', originalPrice: '1,299', bankOffer: '348', moreOffers: true },
    { brand: 'CARLTON', title: 'Chelsea Analog Watch', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80', rating: '4.4', reviews: '4,405', price: '3,109', originalPrice: '5,560', bankOffer: '2,953' },
    { brand: 'Apple', title: 'iPhone 17 (White)', image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=400&q=80', rating: '4.6', reviews: '12,145', price: '82,900', bankOffer: '75,905' },
    { brand: 'cyuxee', title: 'Premium Shoe Cleaner', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80', rating: '4.3', reviews: '23', price: '92', originalPrice: '400' },
    { brand: 'Royal Export', title: 'Women Chanderi Kurta', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80', rating: '4.3', reviews: '478', price: '1,070', originalPrice: '4,999', bankOffer: '1,022', moreOffers: true },
    { brand: 'Apple', title: 'iPhone 17 Pro (Blue)', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80', rating: '4.7', reviews: '1,815', price: '1,34,900', bankOffer: '1,28,900' },
    { brand: 'Flipkart', title: 'Back Cover for IP...', image: 'https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?auto=format&fit=crop&w=400&q=80', rating: '4.2', reviews: '2,562', price: '180', originalPrice: '999', bankOffer: '121' },
    { brand: 'ASICS', title: 'GT-2000 13 Running Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80', rating: '4.3', reviews: '2,007', price: '5,719', originalPrice: '12,000', bankOffer: '5,433' },
    { brand: 'CASIO', title: 'Vintage A168WA Watch', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', rating: '4.4', reviews: '17,819', price: '2,694', originalPrice: '2,800', bankOffer: '2,380' },
  ];

  return (
    <div className="flex-grow w-full bg-white">
      {/* Container with top padding adjusted */}
      <div className="w-full px-4 md:px-10 lg:px-16 xl:px-24 mx-auto pt-4 pb-12">
        <Carousel />

        <div className="mt-14 flex flex-col gap-10">
          <ProductSection
            title="Grab the best deal on"
            highlightText="Smartphones"
            products={smartphones}
          />

          <TopCategoriesSection
            title="Shop From"
            highlightText="Top Categories"
            categories={topCategories}
          />

          <BrandSection />

          <DailyEssentialsSection
            title="Daily"
            highlightText="Essentials"
            items={dailyEssentials}
          />

          <SpotlightsSection 
            title="Spotlight's"
            highlightText="On"
            items={spotlights}
          />

          <SpotlightsSection 
            title="Shop for a cool"
            highlightText="summer"
            items={coolSummer}
          />

          <ProductGridSection 
            title="Suggested"
            highlightText="For You"
            products={suggestedProducts}
          />
        </div>
      </div>
    </div>
  );
}
