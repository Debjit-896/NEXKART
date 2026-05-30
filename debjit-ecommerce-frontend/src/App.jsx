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
import FashionPage from './pages/category/FashionPage';
import MobilesPage from './pages/category/MobilesPage';
import BeautyPage from './pages/category/BeautyPage';
import ElectronicsPage from './pages/category/ElectronicsPage';
import HomeCategoryPage from './pages/category/HomeCategoryPage';
import AppliancesPage from './pages/category/AppliancesPage';
import ToysBabyKidsPage from './pages/category/ToysBabyKidsPage';
import FoodHealthPage from './pages/category/FoodHealthPage';
import AutoAccessoriesPage from './pages/category/AutoAccessoriesPage';
import SportsFitnessPage from './pages/category/SportsFitnessPage';
import BooksStationeryPage from './pages/category/BooksStationeryPage';
import FurniturePage from './pages/category/FurniturePage';
import ProductListingPage from './pages/ProductListingPage';

// Fashion Subcategory Pages
import JeansPage from './pages/category/subcategory/Fashion/jeans';
import TrendsPage from './pages/category/subcategory/Fashion/trends';
import WatchesPage from './pages/category/subcategory/Fashion/watches';
import ShirtsTeesPage from './pages/category/subcategory/Fashion/shirts-tees';
import SportsShoesPage from './pages/category/subcategory/Fashion/sports-shoes';
import KidsClothingPage from './pages/category/subcategory/Fashion/kids-clothing';
import LuggagePage from './pages/category/subcategory/Fashion/luggage';
import TrackpantsPage from './pages/category/subcategory/Fashion/trackpants';
import CasualWearPage from './pages/category/subcategory/Fashion/casual-wear';
import KurtaPajamaPage from './pages/category/subcategory/Fashion/kurta-pajama';
import BriefsPage from './pages/category/subcategory/Fashion/briefs';


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
                      <Route path="/fashion" element={<FashionPage />} />
                      {/* Fashion Subcategory Routes */}
                      <Route path="/products/fashion/jeans" element={<JeansPage />} />
                      <Route path="/products/fashion/trends" element={<TrendsPage />} />
                      <Route path="/products/fashion/watches" element={<WatchesPage />} />
                      <Route path="/products/fashion/shirts-tees" element={<ShirtsTeesPage />} />
                      <Route path="/products/fashion/sports-shoes" element={<SportsShoesPage />} />
                      <Route path="/products/fashion/kids-clothing" element={<KidsClothingPage />} />
                      <Route path="/products/fashion/luggage" element={<LuggagePage />} />
                      <Route path="/products/fashion/trackpants" element={<TrackpantsPage />} />
                      <Route path="/products/fashion/casual-wear" element={<CasualWearPage />} />
                      <Route path="/products/fashion/kurta-pajama" element={<KurtaPajamaPage />} />
                      <Route path="/products/fashion/briefs" element={<BriefsPage />} />

                      <Route path="/mobiles" element={<MobilesPage />} />
                      <Route path="/beauty" element={<BeautyPage />} />
                      <Route path="/electronics" element={<ElectronicsPage />} />
                      <Route path="/home" element={<HomeCategoryPage />} />
                      <Route path="/appliances" element={<AppliancesPage />} />
                      <Route path="/toys-baby-kids" element={<ToysBabyKidsPage />} />
                      <Route path="/food-health" element={<FoodHealthPage />} />
                      <Route path="/auto-accessories" element={<AutoAccessoriesPage />} />
                      <Route path="/sports-fitness" element={<SportsFitnessPage />} />
                      <Route path="/books-stationery" element={<BooksStationeryPage />} />
                      <Route path="/furniture" element={<FurniturePage />} />
                      <Route path="/products" element={<ProductListingPage />} />
                      <Route path="/products/:category" element={<ProductListingPage />} />
                      <Route path="/products/:category/:subcategory" element={<ProductListingPage />} />
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
