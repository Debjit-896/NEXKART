import React, { useEffect, useState } from 'react';
import { Check, X, XCircle } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  const { type, title, message } = toast;
  
  // For the slide-in animation
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger slide-in shortly after mount
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const isSuccess = type === 'success';

  return (
    <div
      className={`relative w-80 p-4 rounded-xl shadow-lg bg-white border-2 flex items-center gap-4 transition-all duration-300 ease-out transform ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'
      } ${
        isSuccess ? 'border-green-400' : 'border-red-400'
      }`}
    >
      {/* Icon */}
      <div className={`flex-shrink-0 flex items-center justify-center ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
        {isSuccess ? <Check strokeWidth={4} size={32} /> : <X strokeWidth={4} size={32} />}
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col justify-center">
        <h4 className={`font-bold text-sm leading-tight ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
          {title}
        </h4>
        <p className="text-gray-500 text-xs mt-1 leading-snug">
          {message}
        </p>
      </div>

      {/* Close button */}
      <button 
        onClick={onClose}
        className={`absolute top-2 right-2 rounded-full focus:outline-none transition-colors ${
          isSuccess ? 'text-green-400 hover:text-green-600' : 'text-red-400 hover:text-red-600'
        }`}
      >
        <XCircle size={16} fill="currentColor" className="text-white" />
      </button>
    </div>
  );
}
