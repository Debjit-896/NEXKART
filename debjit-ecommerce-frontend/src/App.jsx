import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import { OrderProvider } from './context/OrderContext';
import useAuthStore from './store/authStore';

import Header from './components/Header/Header';
import CategoryBar from './components/CategoryBar/CategoryBar';
import Footer from './components/Footer/Footer';

import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import OtpVerificationPage from './pages/OtpVerificationPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import OrdersPage from './pages/OrdersPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <ToastProvider>
        <OrderProvider>
          <CartProvider>
            <WishlistProvider>
              <Router>
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <CategoryBar />

                  <main className="flex-grow flex flex-col">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/cart" element={
                        <ProtectedRoute>
                          <CartPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/wishlist" element={
                        <ProtectedRoute>
                          <WishlistPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/orders" element={
                        <ProtectedRoute>
                          <OrdersPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/profile" element={
                        <ProtectedRoute>
                          <ProfilePage />
                        </ProtectedRoute>
                      } />
                      <Route path="/product/:id" element={<ProductDetailPage />} />
                      <Route path="/signin" element={<SignInPage />} />
                      <Route path="/signup" element={<SignUpPage />} />
                      <Route path="/verify-otp" element={<OtpVerificationPage />} />
                      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    </Routes>
                  </main>

                  <Footer />
                </div>
              </Router>
            </WishlistProvider>
          </CartProvider>
        </OrderProvider>
    </ToastProvider>
  );
}

export default App;
