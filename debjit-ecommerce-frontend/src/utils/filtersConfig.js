export const filterConfig = {
  fashion: {
    sortOptions: [
      { id: 'price_asc', label: 'Price: Low to High' },
      { id: 'price_desc', label: 'Price: High to Low' },
      { id: 'newest', label: 'Newest Arrivals' },
      { id: 'rating', label: 'Customer Rating' }
    ],
    filters: [
      { id: 'gender', name: 'Gender', options: ['Male', 'Female', 'Unisex', 'Kids'] },
      { id: 'brand', name: 'Brand', options: ['Nike', 'Adidas', 'Zara', 'H&M', 'Levi\'s'] },
      { id: 'color', name: 'Color', options: ['Black', 'White', 'Blue', 'Red', 'Grey', 'Green'] },
      { id: 'fabric', name: 'Fabric', options: ['Cotton', 'Denim', 'Polyester', 'Linen', 'Silk', 'Wool'] },
      { id: 'type', name: 'Type', options: ['T-Shirts', 'Shirts', 'Jeans', 'Dresses', 'Jackets', 'Hoodies'] },
      { id: 'size', name: 'Size', options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
      { id: 'fit', name: 'Fit', options: ['Slim Fit', 'Regular Fit', 'Loose Fit', 'Oversized'] },
      { id: 'pattern', name: 'Pattern', options: ['Solid', 'Striped', 'Checked', 'Printed', 'Graphic'] },
      { id: 'occasion', name: 'Occasion', options: ['Casual', 'Formal', 'Party', 'Sports', 'Ethnic'] },
      { id: 'collar', name: 'Collar', options: ['Crew Neck', 'V-Neck', 'Polo', 'Hooded', 'Mandarin Collar'] }
    ],
    subcategories: {
      jeans: {
        sortOptions: [
          { id: 'price_asc', label: 'Price: Low to High' },
          { id: 'price_desc', label: 'Price: High to Low' },
          { id: 'rating', label: 'Customer Rating' }
        ],
        filters: [
          { id: 'brand', name: 'Brand', options: ['Levi\'s', 'Wrangler', 'Pepe Jeans', 'Lee', 'Flying Machine'] },
          { id: 'fit', name: 'Fit', options: ['Slim', 'Skinny', 'Regular', 'Relaxed', 'Bootcut'] },
          { id: 'shade', name: 'Shade', options: ['Light', 'Dark', 'Medium'] },
          { id: 'waist', name: 'Waist Size', options: ['28', '30', '32', '34', '36', '38'] }
        ]
      },
      watches: {
        sortOptions: [
          { id: 'price_asc', label: 'Price: Low to High' },
          { id: 'price_desc', label: 'Price: High to Low' },
          { id: 'rating', label: 'Customer Rating' }
        ],
        filters: [
          { id: 'brand', name: 'Brand', options: ['Titan', 'Fossil', 'Casio', 'Fastrack', 'Armani Exchange'] },
          { id: 'type', name: 'Type', options: ['Analog', 'Digital', 'Smart', 'Chronograph'] },
          { id: 'strap', name: 'Strap Material', options: ['Metal', 'Leather', 'Silicone', 'Fabric'] },
          { id: 'dial', name: 'Dial Shape', options: ['Round', 'Square', 'Rectangle', 'Oval'] }
        ]
      },
      trends: {
        sortOptions: [
          { id: 'newest', label: 'Newest Arrivals' },
          { id: 'rating', label: 'Customer Rating' },
          { id: 'price_asc', label: 'Price: Low to High' }
        ],
        filters: [
          { id: 'trend', name: 'Trend Type', options: ['Y2K', 'Oversized', 'Minimalist', 'Athleisure', 'Vintage'] },
          { id: 'gender', name: 'Gender', options: ['Unisex', 'Female', 'Male'] },
          { id: 'color', name: 'Color', options: ['Neon', 'Pastel', 'Earth Tones', 'Monochrome'] }
        ]
      }
    }
  },
  mobiles: {
    sortOptions: [
      { id: 'price_asc', label: 'Price: Low to High' },
      { id: 'price_desc', label: 'Price: High to Low' },
      { id: 'popularity', label: 'Popularity' },
      { id: 'release', label: 'Release Date' }
    ],
    filters: [
      { id: 'brand', name: 'Brand', options: ['Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Realme', 'Google'] },
      { id: 'ram', name: 'RAM', options: ['4 GB', '6 GB', '8 GB', '12 GB', '16 GB'] },
      { id: 'storage', name: 'Internal Storage', options: ['64 GB', '128 GB', '256 GB', '512 GB', '1 TB'] },
      { id: 'screen', name: 'Screen Size', options: ['Under 5.5 inches', '5.5 - 6.0 inches', '6.1 - 6.5 inches', 'Above 6.5 inches'] },
      { id: 'camera', name: 'Primary Camera', options: ['12 MP - 32 MP', '48 MP - 64 MP', '108 MP & Above'] },
      { id: 'battery', name: 'Battery Capacity', options: ['3000 - 4000 mAh', '4001 - 5000 mAh', '5000 mAh & Above'] },
      { id: 'os', name: 'Operating System', options: ['iOS', 'Android'] },
      { id: 'network', name: 'Network', options: ['5G', '4G VoLTE'] }
    ]
  },
  electronics: {
    sortOptions: [
      { id: 'price_asc', label: 'Price: Low to High' },
      { id: 'price_desc', label: 'Price: High to Low' },
      { id: 'top_rated', label: 'Top Rated' }
    ],
    filters: [
      { id: 'product_type', name: 'Product Type', options: ['Laptops', 'Headphones', 'Smartwatches', 'Televisions', 'Refrigerators', 'Washing Machines'] },
      { id: 'brand', name: 'Brand', options: ['Sony', 'LG', 'Samsung', 'Dell', 'HP', 'bAt (BoAt)'] },
      { id: 'power', name: 'Power Consumption', options: ['1 Star', '2 Star', '3 Star', '4 Star', '5 Star (Energy Rating)'] },
      { id: 'warranty', name: 'Warranty', options: ['1 Year', '2 Years', '3 Years & Above'] }
    ]
  },
  appliances: { // Uses same config as electronics based on request
    sortOptions: [
      { id: 'price_asc', label: 'Price: Low to High' },
      { id: 'price_desc', label: 'Price: High to Low' },
      { id: 'top_rated', label: 'Top Rated' }
    ],
    filters: [
      { id: 'product_type', name: 'Product Type', options: ['Laptops', 'Headphones', 'Smartwatches', 'Televisions', 'Refrigerators', 'Washing Machines'] },
      { id: 'brand', name: 'Brand', options: ['Sony', 'LG', 'Samsung', 'Dell', 'HP', 'bAt (BoAt)'] },
      { id: 'power', name: 'Power Consumption', options: ['1 Star', '2 Star', '3 Star', '4 Star', '5 Star (Energy Rating)'] },
      { id: 'warranty', name: 'Warranty', options: ['1 Year', '2 Years', '3 Years & Above'] }
    ]
  },
  beauty: {
    sortOptions: [
      { id: 'price_asc', label: 'Price: Low to High' },
      { id: 'price_desc', label: 'Price: High to Low' },
      { id: 'best_sellers', label: 'Best Sellers' }
    ],
    filters: [
      { id: 'gender', name: 'Gender', options: ['Female', 'Male (Grooming)', 'Unisex'] },
      { id: 'category', name: 'Product Category', options: ['Skin Care', 'Hair Care', 'Makeup', 'Fragrances', 'Personal Care'] },
      { id: 'brand', name: 'Brand', options: ['Cetaphil', 'L\'Oreal', 'Gillette', 'Nivea', 'CeraVe', 'Mamaearth'] },
      { id: 'skin_type', name: 'Skin/Hair Type', options: ['Dry', 'Oily', 'Combination', 'Normal', 'Sensitive'] },
      { id: 'preference', name: 'Preference', options: ['Organic', 'Paraben-Free', 'Cruelty-Free', 'Vegan', 'Dermatologically Tested'] }
    ]
  },
  home: {
    sortOptions: [
      { id: 'price_asc', label: 'Price: Low to High' },
      { id: 'price_desc', label: 'Price: High to Low' },
      { id: 'reviews', label: 'Customer Reviews' }
    ],
    filters: [
      { id: 'room_type', name: 'Room Type', options: ['Living Room', 'Bedroom', 'Kitchen', 'Office', 'Bathroom'] },
      { id: 'material', name: 'Material', options: ['Solid Wood', 'Engineered Wood', 'Metal', 'Plastic', 'Glass', 'Fabric/Upholstery'] },
      { id: 'color', name: 'Color', options: ['Brown', 'White', 'Black', 'Beige', 'Grey', 'Blue'] },
      { id: 'brand', name: 'Brand', options: ['IKEA', 'Pepperfry', 'Wakefit', 'Godrej Interio'] }
    ]
  },
  furniture: { // Uses same config as home based on request
    sortOptions: [
      { id: 'price_asc', label: 'Price: Low to High' },
      { id: 'price_desc', label: 'Price: High to Low' },
      { id: 'reviews', label: 'Customer Reviews' }
    ],
    filters: [
      { id: 'room_type', name: 'Room Type', options: ['Living Room', 'Bedroom', 'Kitchen', 'Office', 'Bathroom'] },
      { id: 'material', name: 'Material', options: ['Solid Wood', 'Engineered Wood', 'Metal', 'Plastic', 'Glass', 'Fabric/Upholstery'] },
      { id: 'color', name: 'Color', options: ['Brown', 'White', 'Black', 'Beige', 'Grey', 'Blue'] },
      { id: 'brand', name: 'Brand', options: ['IKEA', 'Pepperfry', 'Wakefit', 'Godrej Interio'] }
    ]
  },
  'toys-baby-kids': {
    sortOptions: [
      { id: 'price_asc', label: 'Price: Low to High' },
      { id: 'price_desc', label: 'Price: High to Low' },
      { id: 'age', label: 'Age Range' }
    ],
    filters: [
      { id: 'age_group', name: 'Age Group', options: ['0-2 Years', '3-4 Years', '5-7 Years', '8-11 Years', '12+ Years'] },
      { id: 'gender', name: 'Gender', options: ['Boys', 'Girls', 'Unisex'] },
      { id: 'category', name: 'Category', options: ['Soft Toys', 'Puzzles', 'Board Games', 'Action Figures', 'Baby Care', 'Educational Toys'] },
      { id: 'brand', name: 'Brand', options: ['Lego', 'Hasbro', 'Mattel', 'Fisher-Price', 'Barbie'] }
    ]
  },
  'food-health': {
    sortOptions: [
      { id: 'price_asc', label: 'Price: Low to High' },
      { id: 'price_desc', label: 'Price: High to Low' },
      { id: 'expiry', label: 'Expiry Date: Longest' }
    ],
    filters: [
      { id: 'diet', name: 'Dietary Preference', options: ['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Gluten-Free', 'Organic'] },
      { id: 'product_type', name: 'Product Type', options: ['Health Supplements', 'Packaged Snacks', 'Beverages', 'Staples', 'Daily Nutrition'] },
      { id: 'brand', name: 'Brand', options: ['MuscleBlaze', 'Nestle', 'Britannia', 'Amul', 'Dabur'] }
    ]
  },
  'sports-fitness': {
    sortOptions: [
      { id: 'price_asc', label: 'Price: Low to High' },
      { id: 'price_desc', label: 'Price: High to Low' },
      { id: 'relevance', label: 'Relevance' }
    ],
    filters: [
      { id: 'activity', name: 'Activity Type', options: ['Cricket', 'Football', 'Gym & Fitness', 'Badminton', 'Running', 'Yoga'] },
      { id: 'product_type', name: 'Product Type', options: ['Equipment', 'Sportswear', 'Footwear', 'Accessories'] },
      { id: 'brand', name: 'Brand', options: ['Decathlon', 'Cosco', 'Yonex', 'Nivia', 'Puma'] }
    ]
  },
  'auto-accessories': {
    sortOptions: [
      { id: 'price_asc', label: 'Price: Low to High' },
      { id: 'price_desc', label: 'Price: High to Low' }
    ],
    filters: [
      { id: 'vehicle', name: 'Vehicle Type', options: ['4 Wheeler (Car)', '2 Wheeler (Bike/Scooter)'] },
      { id: 'category', name: 'Category', options: ['Car Cleaning', 'Helmets', 'Mobile Holders', 'Seat Covers', 'Lighting', 'Tyres & Rims'] },
      { id: 'brand', name: 'Brand', options: ['Vega', 'Steelbird', '3M', 'Bosch', 'Mi'] }
    ]
  },
  'books-stationery': {
    sortOptions: [
      { id: 'price_asc', label: 'Price: Low to High' },
      { id: 'price_desc', label: 'Price: High to Low' },
      { id: 'best_sellers', label: 'Best Sellers' }
    ],
    filters: [
      { id: 'genre', name: 'Book Genre', options: ['Fiction', 'Non-Fiction', 'Self-Help', 'Educational/Textbooks', 'Comics'] },
      { id: 'stationery', name: 'Stationery Type', options: ['Notebooks', 'Pens/Pencils', 'Art Supplies', 'Calculators', 'Office Organizers'] },
      { id: 'language', name: 'Language', options: ['English', 'Hindi', 'Regional Languages'] },
      { id: 'binding', name: 'Binding', options: ['Paperback', 'Hardcover'] }
    ]
  }
};

// Default fallback configuration
export const defaultFilterConfig = {
  sortOptions: [
    { id: 'popularity', label: 'Popularity' },
    { id: 'price_asc', label: 'Price: Low to High' },
    { id: 'price_desc', label: 'Price: High to Low' },
    { id: 'newest', label: 'Newest First' }
  ],
  filters: [
    { id: 'price_range', name: 'Price', options: ['Under ₹500', '₹500 - ₹1000', '₹1000 - ₹2000', 'Over ₹2000'] },
    { id: 'rating', name: 'Customer Ratings', options: ['4★ & above', '3★ & above', '2★ & above'] }
  ]
};
