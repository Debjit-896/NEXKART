import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Stepper from '../components/Checkout/Stepper';
import CartItemList from '../components/Checkout/CartItemList';
import OrderSummarySidebar from '../components/Checkout/OrderSummarySidebar';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';

export default function CartPage() {
  const [currentStep, setCurrentStep] = useState(1); // 1: Cart/Address, 2: Order Summary, 3: Payment
  const { cartItems, totalAmount, clearCart } = useCart();
  const { addOrder } = useOrder();
  const navigate = useNavigate();

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePlaceOrder = () => {
    if (cartItems.length > 0) {
      // Simulate successful payment and place order
      addOrder(cartItems, totalAmount);
      clearCart();
      navigate('/orders');
    }
  };

  return (
    <div className="flex-grow w-full bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-14 py-8">

        {/* Stepper only visible on Checkout steps, but to match screenshot layout we show it */}
        <Stepper currentStep={currentStep} />

        <div className="flex flex-col lg:flex-row gap-6 mt-8">
          {/* Main Content (Left Side) */}
          <div className="w-full lg:w-2/3">
            {currentStep === 1 && (
              <div className="animate-step">
                <CartItemList />
              </div>
            )}

            {currentStep === 2 && (
              <div className="animate-step bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center text-gray-500 py-16">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Address Details</h2>
                <p>Address selection form goes here.</p>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="mt-4 text-[#0A1172] font-semibold hover:underline"
                >
                  &larr; Back to Order Summary
                </button>
              </div>
            )}

            {currentStep === 3 && (
              <div className="animate-step bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Options</h2>

                <div className="space-y-4 max-w-sm mx-auto mb-8 text-left">
                  <label className="flex items-center p-4 border border-[#0A1172] bg-blue-50 rounded-lg cursor-pointer">
                    <input type="radio" name="payment" defaultChecked className="w-4 h-4 text-[#0A1172]" />
                    <span className="ml-3 font-semibold text-gray-800">Credit / Debit Card</span>
                  </label>
                  <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer">
                    <input type="radio" name="payment" className="w-4 h-4 text-[#0A1172]" />
                    <span className="ml-3 font-semibold text-gray-800">Net Banking</span>
                  </label>
                  <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer">
                    <input type="radio" name="payment" className="w-4 h-4 text-[#0A1172]" />
                    <span className="ml-3 font-semibold text-gray-800">UPI</span>
                  </label>
                </div>

                <div className="flex flex-col space-y-3 max-w-sm mx-auto">
                  <button
                    onClick={handlePlaceOrder}
                    className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors uppercase tracking-wider text-sm shadow-md"
                  >
                    Pay & Place Order
                  </button>
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="text-gray-500 font-semibold hover:underline text-sm"
                  >
                    Back to Address
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center">
              <Link to="/" className="text-[#0A1172] font-semibold flex items-center hover:underline">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Right Sidebar (Order Summary) */}
          <div className="w-full lg:w-1/3">
            <OrderSummarySidebar onPlaceOrder={handleNextStep} />
          </div>
        </div>
      </div>
    </div>
  );
}
