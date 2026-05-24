import React from 'react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
      <h1 className="text-3xl font-bold text-text-dark mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-border-light">
          <p className="text-gray-500 text-lg">Your cart is currently empty.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-border-light p-6">
          <ul className="divide-y divide-gray-200">
            {cartItems.map(item => (
              <li key={item.id} className="py-4 flex justify-between items-center">
                <span>{item.name}</span>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
