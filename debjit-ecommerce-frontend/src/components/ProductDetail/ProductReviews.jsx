import React, { useState } from 'react';
import ReviewForm from './ReviewForm';

// Mock review data
const mockReviews = [
  { id: 1, rating: 5, title: 'This is an amazing product I have.', review: 'Great quality and fast delivery.', author: 'Darrell Steward', date: 'July 2, 2020', time: '03:29 PM', likes: 28, images: [] },
  { id: 2, rating: 5, title: 'This is an amazing product I have.', review: 'Excellent value for money.', author: 'Darlene Robertson', date: 'July 3, 2020', time: '1:04 PM', likes: 62, images: [] },
  { id: 3, rating: 5, title: 'This is an amazing product I have.', review: 'Very comfortable.', author: 'Kathryn Murphy', date: 'June 28, 2020', time: '10:09 PM', likes: 6, images: [] },
  { id: 4, rating: 4, title: 'This is an amazing product I have.', review: 'Good product overall.', author: 'Ronald Richards', date: 'July 1, 2020', time: '10:14 AM', likes: 164, images: [] },
];

const ratingBreakdown = [
  { stars: 5, count: 2023 },
  { stars: 4, count: 38 },
  { stars: 3, count: 4 },
  { stars: 2, count: 0 },
  { stars: 1, count: 0 },
];

export default function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState(mockReviews);
  const [showForm, setShowForm] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All Reviews');

  const totalReviews = ratingBreakdown.reduce((a, b) => a + b.count, 0);
  const avgRating = (ratingBreakdown.reduce((a, b) => a + b.stars * b.count, 0) / totalReviews).toFixed(1);
  const maxCount = Math.max(...ratingBreakdown.map(r => r.count));

  const handleAddReview = (newReview) => {
    setReviews(prev => [{ id: Date.now(), ...newReview }, ...prev]);
  };

  const filters = ['All Reviews', 'With Photo & Video', 'With Description'];

  return (
    <div className="w-full py-10 border-t border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Product Reviews</h2>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left: Average & Breakdown */}
        <div className="flex flex-col items-start lg:w-1/4">
          {/* Average Score */}
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 rounded-full border-4 border-[#FF9F00] flex items-center justify-center mr-4">
              <span className="text-xl font-bold text-gray-900">{avgRating}</span>
            </div>
            <div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map(s => (
                  <svg key={s} className={`w-4 h-4 ${s <= Math.round(avgRating) ? 'text-[#FF9F00]' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">from {totalReviews.toLocaleString()} reviews</p>
            </div>
          </div>

          {/* Rating Bars */}
          <div className="w-full space-y-2 mb-8">
            {ratingBreakdown.map(r => (
              <div key={r.stars} className="flex items-center space-x-2 text-sm">
                <span className="w-6 text-right text-gray-600">{r.stars}.0</span>
                <svg className="w-3.5 h-3.5 text-[#FF9F00]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-800 rounded-full" style={{ width: `${maxCount > 0 ? (r.count / maxCount) * 100 : 0}%` }}></div>
                </div>
                <span className="w-10 text-right text-gray-600 text-xs">{r.count}</span>
              </div>
            ))}
          </div>

          {/* Reviews Filter - Left side */}
          <div className="hidden lg:block">
            <h4 className="text-sm font-bold text-gray-900 mb-3">Reviews Filter</h4>
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-700 mb-2 flex items-center justify-between">
                Rating <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" /></svg>
              </p>
              {[5, 4, 3, 2, 1].map(s => (
                <label key={s} className="flex items-center space-x-2 text-sm text-gray-600 mb-1.5 cursor-pointer hover:text-gray-900">
                  <input type="checkbox" className="rounded border-gray-300 text-[#FF9F00] focus:ring-[#FF9F00]" />
                  <span className="flex items-center">
                    <svg className="w-3.5 h-3.5 text-[#FF9F00] mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    {s}
                  </span>
                </label>
              ))}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-700 mb-2 flex items-center justify-between">
                Review Topics <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" /></svg>
              </p>
              {['Product Quality', 'Seller Services', 'Product Price', 'Shipment', 'Match with Description'].map(topic => (
                <label key={topic} className="flex items-center space-x-2 text-sm text-gray-600 mb-1.5 cursor-pointer hover:text-gray-900">
                  <input type="checkbox" className="rounded border-gray-300 text-[#FF9F00] focus:ring-[#FF9F00]" />
                  <span>{topic}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Review List */}
        <div className="flex-grow lg:w-3/4">
          {/* Tabs & Write Review Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Review Lists</h3>
              <div className="flex space-x-2">
                {filters.map(f => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-colors ${
                      activeFilter === f
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 sm:mt-0 px-5 py-2.5 bg-[#FF9F00] hover:bg-[#e58f00] text-white font-semibold rounded-lg transition-colors shadow-sm text-sm flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Write a Review
            </button>
          </div>

          {/* Reviews */}
          <div className="space-y-6">
            {reviews.map(r => (
              <div key={r.id} className="border-b border-gray-100 pb-6">
                {/* Stars */}
                <div className="flex mb-2">
                  {[1, 2, 3, 4, 5].map(s => (
                    <svg key={s} className={`w-5 h-5 ${s <= r.rating ? 'text-[#FF9F00]' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <h4 className="text-sm font-bold text-gray-900 mb-1">{r.title}</h4>
                <p className="text-xs text-gray-400 mb-3">{r.date} {r.time}</p>

                {/* Review Images */}
                {r.images && r.images.length > 0 && (
                  <div className="flex space-x-2 mb-3">
                    {r.images.map((img, idx) => (
                      <div key={idx} className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Author + Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600 mr-2">
                      {r.author.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{r.author}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-gray-400">
                    <button className="flex items-center space-x-1 text-xs hover:text-gray-600 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
                      <span>{r.likes}</span>
                    </button>
                    <button className="hover:text-gray-600 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center mt-8 space-x-2 text-sm">
            {[1, 2, '...', 19].map((p, i) => (
              <button key={i} className={`w-8 h-8 rounded flex items-center justify-center font-medium ${p === 1 ? 'border border-gray-900 text-gray-900' : 'text-gray-500 hover:bg-gray-100'}`}>
                {p}
              </button>
            ))}
            <button className="w-8 h-8 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Review Form Modal */}
      {showForm && <ReviewForm onSubmit={handleAddReview} onClose={() => setShowForm(false)} />}
    </div>
  );
}
