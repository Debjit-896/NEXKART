import React from 'react';
import { useCart } from '../../context/CartContext';

export default function OrderSummarySidebar({ onPlaceOrder }) {
  const { cartCount, totalMRP, discountOnMRP, couponDiscount, shippingFee, totalAmount } = useCart();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden w-full">
      {/* Top Border Header */}
      <div className="h-1 bg-[#0A1172]"></div>
      <div className="p-5 text-center border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-800">Order Summary</h3>
      </div>

      <div className="p-6">
        {/* Coupon Section */}
        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg mb-6">
          <div className="flex items-center text-green-600">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span className="text-sm font-semibold">Apply Coupons</span>
          </div>
          <button className="bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-4 py-1.5 rounded transition-colors">
            APPLY
          </button>
        </div>

        {/* Price Details */}
        <h4 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">
          Price Details ({cartCount} {cartCount === 1 ? 'item' : 'items'})
        </h4>

        <div className="space-y-3 text-sm text-gray-600 mb-6">
          <div className="flex justify-between">
            <span>Total MRP</span>
            <span className="font-medium">₹{totalMRP}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount on MRP</span>
            <span className="font-medium text-red-500">-₹{discountOnMRP}</span>
          </div>
          <div className="flex justify-between">
            <span>Coupon Discount</span>
            <span className="font-medium text-green-500">Apply Coupon</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Shipping Fee <button className="text-blue-500 text-xs ml-1 hover:underline">Know more</button></span>
            <span className="font-medium text-green-500">
              {shippingFee === 0 ? 'Free' : `₹${shippingFee}`}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-800">Total Amount</span>
            <span className="font-bold text-gray-800 text-lg">₹{totalAmount}</span>
          </div>
        </div>

        <button 
          onClick={onPlaceOrder}
          className="w-full py-3 bg-[#0A1172] hover:bg-[#0A1172]/90 text-white font-bold rounded transition-colors uppercase tracking-wider text-sm shadow-md"
        >
          PLACE ORDER
        </button>

        {discountOnMRP > 0 && (
          <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded text-center text-green-600 text-sm font-semibold">
            You will save this ₹{discountOnMRP} on this order
          </div>
        )}
      </div>

      <div className="bg-gray-50 p-4 border-t border-gray-100 text-xs text-gray-500 flex items-center justify-center space-x-2">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <span>Safe and Secure Payments. Easy returns. 100% Authentic products.</span>
      </div>
      
      {/* Bottom Border Header */}
      <div className="h-2 bg-[#0A1172]"></div>
    </div>
  );
}
