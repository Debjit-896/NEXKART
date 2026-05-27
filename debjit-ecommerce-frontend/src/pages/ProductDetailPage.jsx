import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductReviews from '../components/ProductDetail/ProductReviews';
import ProductCarousel from '../components/ProductDetail/ProductCarousel';

// Mock product database
const allProducts = [
  { id: 1, name: 'Galaxy S22 Ultra', brand: 'Samsung', price: 32999, originalPrice: 74999, description: 'Experience the ultimate smartphone with the Galaxy S22 Ultra. Featuring a stunning 6.8-inch Dynamic AMOLED display, 108MP camera system, and the integrated S Pen for productivity. Built with premium materials and cutting-edge technology for the most demanding users.', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80', images: ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80'], colors: ['Black', 'White', 'Green', 'Burgundy'], sizes: ['128GB', '256GB', '512GB', '1TB'], rating: 4.5, sold: 1238, category: 'Electronics' },
  { id: 2, name: 'Galaxy M13 (4GB | 64 GB)', brand: 'Samsung', price: 10499, originalPrice: 14999, description: 'The Samsung Galaxy M13 offers a great balance of performance and value. With a 6.6-inch FHD+ display, 50MP triple camera setup, and a massive 6000mAh battery, it keeps you going all day long.', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80', images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80'], colors: ['Black', 'Blue', 'Green'], sizes: ['64GB', '128GB'], rating: 4.2, sold: 3456, category: 'Electronics' },
  { id: 3, name: 'Galaxy M33 (4GB | 64 GB)', brand: 'Samsung', price: 16999, originalPrice: 24999, description: 'Samsung Galaxy M33 5G delivers future-ready connectivity and performance. With Exynos 1280 processor and 6000mAh battery, it is built for speed and endurance.', image: 'https://images.unsplash.com/photo-1533228100845-08145b01de14?auto=format&fit=crop&w=600&q=80', images: ['https://images.unsplash.com/photo-1533228100845-08145b01de14?auto=format&fit=crop&w=600&q=80'], colors: ['Black', 'Blue'], sizes: ['64GB', '128GB'], rating: 4.3, sold: 2100, category: 'Electronics' },
  { id: 4, name: 'Galaxy M53 (4GB | 64 GB)', brand: 'Samsung', price: 31999, originalPrice: 40999, description: 'The Samsung Galaxy M53 5G features a sleek design with a 108MP main camera and a 6.7-inch Super AMOLED+ display for an immersive viewing experience.', image: 'https://images.unsplash.com/photo-1544228428-1b22e1180b72?auto=format&fit=crop&w=600&q=80', images: ['https://images.unsplash.com/photo-1544228428-1b22e1180b72?auto=format&fit=crop&w=600&q=80'], colors: ['Black', 'Brown'], sizes: ['128GB', '256GB'], rating: 4.4, sold: 890, category: 'Electronics' },
  { id: 5, name: 'Galaxy S22 Ultra (Limited)', brand: 'Samsung', price: 67999, originalPrice: 85999, description: 'Limited edition Galaxy S22 Ultra with exclusive colorway and premium packaging. All the power of the S22 Ultra in a collector\'s edition.', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cd8d3?auto=format&fit=crop&w=600&q=80', images: ['https://images.unsplash.com/photo-1601784551446-20c9e07cd8d3?auto=format&fit=crop&w=600&q=80'], colors: ['Phantom Black', 'Sky Blue'], sizes: ['256GB', '512GB'], rating: 4.8, sold: 456, category: 'Electronics' },
];

// Related products mock
const relatedProducts = [
  { id: 1, brand: 'Whistle', name: 'Wide Leg Cropped Jeans, Denim', displayPrice: '26', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=400&q=80', rating: '4.8', sold: '1,238 Sold' },
  { id: 2, brand: 'John Lewis ANYDAY', name: 'Long Sleeve Utility Shirt, Navy, 6', displayPrice: '26', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&q=80', rating: '4.8', sold: '1,238 Sold' },
  { id: 3, brand: 'John Lewis ANYDAY', name: 'Stripe Curved Hem Shirt, Blue', displayPrice: '32', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&q=80', rating: '4.5', sold: '620 Sold' },
  { id: 4, brand: 'John Lewis ANYDAY', name: 'Denim Overshirt, Mid Wash', displayPrice: '40', image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=400&q=80', rating: '4.6', sold: '238 Sold' },
  { id: 5, brand: 'John Lewis', name: 'Linen Blazer, Navy', displayPrice: '79', image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=400&q=80', rating: '4.8', sold: '1,236 Sold' },
];

const popularProducts = [
  { id: 6, brand: 'Whistle', name: 'Wide Leg Cropped Jeans, Denim', displayPrice: '26', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=400&q=80', rating: '4.8', sold: '1,238 Sold' },
  { id: 7, brand: 'John Lewis ANYDAY', name: 'Long Sleeve Utility Shirt, Navy, 6', displayPrice: '26', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&q=80', rating: '4.8', sold: '1,238 Sold' },
  { id: 8, brand: 'John Lewis ANYDAY', name: 'Stripe Curved Hem Shirt, Blue', displayPrice: '32', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&q=80', rating: '4.5', sold: '620 Sold' },
  { id: 9, brand: 'John Lewis ANYDAY', name: 'Denim Overshirt, Mid Wash', displayPrice: '40', image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=400&q=80', rating: '4.6', sold: '238 Sold' },
  { id: 10, brand: 'John Lewis', name: 'Linen Blazer, Navy', displayPrice: '79', image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=400&q=80', rating: '4.8', sold: '1,236 Sold' },
];

const colorMap = {
  'Black': '#1a1a1a',
  'White': '#ffffff',
  'Green': '#3d5a3c',
  'Blue': '#2563eb',
  'Burgundy': '#722f37',
  'Brown': '#8B4513',
  'Phantom Black': '#0a0a0a',
  'Sky Blue': '#5b9bd5',
  'Royal Brown': '#6B3A2A',
  'Navy': '#1B2A4A',
  'Teal': '#2B6B6B',
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { wishlistItems, toggleWishlist } = useWishlist();

  // Find the product by ID, fallback to first product
  const product = allProducts.find(p => p.id === parseInt(id)) || allProducts[0];
  const isWishlisted = wishlistItems.some(w => w.id === product.id);

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] || product.sizes[0]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      color: selectedColor,
      size: selectedSize,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleToggleWishlist = () => {
    toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
    });
  };

  return (
    <div className="flex-grow w-full bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-12">

        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-400 py-4 space-x-2 overflow-x-auto">
          <Link to="/" className="hover:text-gray-600 whitespace-nowrap">Homepage</Link>
          <span>›</span>
          <span className="whitespace-nowrap">{product.category || 'Category'}</span>
          <span>›</span>
          <span className="text-gray-600 font-medium whitespace-nowrap">{product.name}</span>
        </nav>

        {/* Product Detail Section */}
        <div className="flex flex-col lg:flex-row gap-10">

          {/* LEFT: Images */}
          <div className="lg:w-1/2">
            {/* Main Image */}
            <div className="relative bg-[#F4F5F7] rounded-2xl overflow-hidden aspect-square mb-4">
              <img
                src={product.images[selectedImageIndex] || product.image}
                alt={product.name}
                className="w-full h-full object-contain p-6"
              />
              {/* Wishlist heart */}
              <button
                onClick={handleToggleWishlist}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
              >
                <svg className={`w-5 h-5 ${isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex space-x-3">
              {(product.images.length > 1 ? product.images : [product.image, product.image, product.image, product.image]).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${selectedImageIndex === idx ? 'border-gray-800' : 'border-transparent hover:border-gray-300'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Details */}
          <div className="lg:w-1/2">
            {/* Brand & Name */}
            <p className="text-sm text-gray-400 mb-1">{product.brand}</p>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h1>

            {/* Price & Stats */}
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
              <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
              <span>{product.sold.toLocaleString()} Sold</span>
              <span className="flex items-center text-[#FF9F00] font-semibold">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                {product.rating}
              </span>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-900 mb-2">Description:</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {showFullDesc ? product.description : product.description.substring(0, 180) + '...'}
                <button onClick={() => setShowFullDesc(!showFullDesc)} className="text-gray-900 font-semibold ml-1 hover:underline">
                  {showFullDesc ? 'See Less' : 'See More...'}
                </button>
              </p>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <p className="text-sm text-gray-900 mb-3">Color: <strong>{selectedColor}</strong></p>
              <div className="flex space-x-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === color ? 'border-gray-800 ring-2 ring-offset-2 ring-gray-400' : 'border-gray-200 hover:border-gray-400'}`}
                    style={{ backgroundColor: colorMap[color] || '#ccc' }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-gray-900">Size: <strong>{selectedSize}</strong></p>
                <button className="text-xs text-gray-500 hover:text-gray-700 underline">View Size Chart</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                      selectedSize === size
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-4">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 rounded-lg font-bold text-sm transition-all shadow-md ${
                  addedToCart
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                }`}
              >
                {addedToCart ? '✓ Added to Cart' : 'Add To Cart'}
              </button>
              <button
                onClick={handleToggleWishlist}
                className={`flex-1 py-3.5 rounded-lg font-bold text-sm border-2 transition-all ${
                  isWishlisted
                    ? 'bg-red-50 text-red-500 border-red-300'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                }`}
              >
                {isWishlisted ? '♥ Wishlisted' : '♡ Add to Wishlist'}
              </button>
            </div>

            <p className="text-xs text-gray-400 text-center">Delivery T&C</p>
          </div>
        </div>

        {/* Product Reviews */}
        <ProductReviews productId={product.id} />

        {/* Related Products */}
        <ProductCarousel title="Related Product" products={relatedProducts} />

        {/* Popular This Week */}
        <ProductCarousel title="Popular this week" products={popularProducts} />
      </div>
    </div>
  );
}
