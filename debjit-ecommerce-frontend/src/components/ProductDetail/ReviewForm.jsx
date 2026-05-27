import React, { useState } from 'react';

export default function ReviewForm({ onSubmit, onClose }) {
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [images, setImages] = useState([]);
  const [hoverRating, setHoverRating] = useState(0);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) {
      alert('You can upload a maximum of 5 images.');
      return;
    }
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      rating,
      title,
      review,
      images: images.map(img => img.preview),
      author: 'You',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      likes: 0
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">Write a Review</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Star Rating */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Your Rating</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <svg className={`w-8 h-8 ${star <= (hoverRating || rating) ? 'text-[#FF9F00]' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Review Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Review Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Sum up your review in a line"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9F00]/50 focus:border-[#FF9F00] text-sm transition-colors"
              required
            />
          </div>

          {/* Review Body */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Your Review</label>
            <textarea
              value={review}
              onChange={e => setReview(e.target.value)}
              rows={4}
              placeholder="Tell us what you liked or disliked about the product..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9F00]/50 focus:border-[#FF9F00] text-sm resize-none transition-colors"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Images <span className="text-gray-400 font-normal">(Max 5)</span></label>
            
            <div className="flex flex-wrap gap-3">
              {images.map((img, idx) => (
                <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 group">
                  <img src={img.preview} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
              
              {images.length < 5 && (
                <label className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#FF9F00] hover:bg-orange-50 transition-colors">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="text-[10px] text-gray-400 mt-1">Add</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-[#FF9F00] hover:bg-[#e58f00] text-white font-bold rounded-lg transition-colors shadow-md text-sm"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}
