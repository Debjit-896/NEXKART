import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  MapPin,
  Package,
  Heart,
  Store,
  Gift,
  CreditCard,
  Bell,
  HeadphonesIcon,
  TrendingUp,
  Download,
  Star,
  Ticket,
  Zap,
  LogOut,
  X,
  Crosshair,
  Menu,
  LayoutGrid,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import useAuthStore from "../../store/authStore";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("Add Location");
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, logout } = useAuthStore();

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation("Current Location");
          setTimeout(() => setIsLocationOpen(false), 500);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve your location");
        },
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="bg-white border-b border-border-light py-2 lg:py-3 sticky top-0 z-50 shadow-sm text-sm">
      <div className="w-full px-4 md:px-10 lg:px-16 xl:px-24 mx-auto">
        {/* TOP ROW: Logo, Desktop Search, Desktop Nav & Cart */}
        <div className="flex items-center justify-between gap-4">
          {/* Left Side: Hamburger (Mobile) + Logo + Location (Desktop) */}
          <div className="flex items-center gap-2 lg:gap-8 shrink-0">
            {/* Hamburger Menu Icon */}
            <button
              className="lg:hidden p-1 -ml-1 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0">
              <div className="overflow-hidden flex items-center justify-center h-8 sm:h-10 lg:h-12 w-[120px] sm:w-[150px] lg:w-[170px] -ml-2 lg:-ml-4">
                <img
                  src="/logo.png"
                  alt="NextKart Logo"
                  className="w-[120px] sm:w-[150px] lg:w-[170px] max-w-none"
                />
              </div>
            </Link>

            {/* Location Picker (Hidden on Mobile) */}
            <button
              onClick={() => setIsLocationOpen(true)}
              className="hidden md:flex items-center gap-1 hover:text-primary-blue transition-colors"
            >
              <MapPin size={20} className="text-primary-blue" />
              <div className="flex flex-col items-start text-left leading-tight">
                <span className="text-[11px] text-gray-500">Delivering to</span>
                <span className="font-medium text-[13px] text-primary-blue flex items-center gap-1">
                  {currentLocation} <ChevronDown size={14} />
                </span>
              </div>
            </button>
          </div>

          {/* Center: Search Bar (Desktop Only) */}
          <form
            onSubmit={handleSearch}
            className="hidden lg:flex flex-grow max-w-2xl mx-6"
          >
            <div className="relative flex items-center w-full h-10 rounded-sm bg-[#F0F5FF] overflow-hidden focus-within:ring-1 focus-within:ring-primary-blue focus-within:bg-white transition-all border border-transparent focus-within:border-primary-blue">
              <div className="pl-3 pr-2 text-gray-500">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="Search essentials, groceries and more..."
                className="w-full h-full bg-transparent outline-none text-[13px] text-text-dark placeholder-gray-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* Right Side: Navigation & Cart */}
          <div className="flex items-center gap-3 sm:gap-6 shrink-0">
            {/* Login Dropdown (Hidden on Mobile) */}
            <div className="relative group cursor-pointer h-12 hidden lg:flex items-center">
              {user ? (
                <div className="flex items-center gap-2 hover:text-primary-blue hover:bg-blue-50 px-3 py-1.5 rounded-md transition-colors">
                  <span className="font-medium">
                    Hi, {(user.name || user.fullName || user.email || 'User').split(" ")[0]}
                  </span>
                  <ChevronDown
                    size={16}
                    className="group-hover:-rotate-180 transition-transform duration-300"
                  />
                </div>
              ) : (
                <Link
                  to="/signin"
                  className="flex items-center gap-2 hover:bg-blue-50 hover:text-primary-blue px-3 py-1.5 rounded-md transition-colors text-[15px]"
                >
                  <User size={20} />
                  <span className="font-medium">Login</span>
                  <ChevronDown
                    size={16}
                    className="group-hover:-rotate-180 transition-transform duration-300"
                  />
                </Link>
              )}

              {/* Dropdown Menu (Login) */}
              <div className="absolute top-10 right-0 w-64 bg-white shadow-xl border border-gray-100 rounded-b-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pt-2 pb-2">
                {!user && (
                  <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100">
                    <span className="text-gray-600 text-[13px]">
                      New customer?
                    </span>
                    <Link
                      to="/signup"
                      className="text-primary-blue font-semibold text-[13px] hover:underline"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
                <ul className="flex flex-col text-[14px]">
                  <li className="hover:bg-gray-100">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700"
                    >
                      <User size={18} className="text-gray-400" /> My Profile
                    </Link>
                  </li>
                  <li className="hover:bg-gray-100">
                    <Link
                      to="/orders"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700"
                    >
                      <Package size={18} className="text-gray-400" /> Orders
                    </Link>
                  </li>
                  {user && (
                    <li className="hover:bg-gray-100">
                      <Link
                        to="#"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700"
                      >
                        <Ticket size={18} className="text-gray-400" /> Coupons
                      </Link>
                    </li>
                  )}
                  {user && (
                    <li className="hover:bg-gray-100">
                      <Link
                        to="#"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700"
                      >
                        <CreditCard size={18} className="text-gray-400" /> Saved Cards & Wallet
                      </Link>
                    </li>
                  )}
                  {user && (
                    <li className="hover:bg-gray-100">
                      <Link
                        to="#"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700"
                      >
                        <MapPin size={18} className="text-gray-400" /> Saved Addresses
                      </Link>
                    </li>
                  )}
                  <li className="hover:bg-gray-100">
                    <Link
                      to="/wishlist"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700"
                    >
                      <Heart size={18} className="text-gray-400" /> Wishlist
                      {wishlistCount > 0 && (
                        <span className="ml-auto bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-full">
                          {wishlistCount}
                        </span>
                      )}
                    </Link>
                  </li>
                  {user && (
                    <li className="hover:bg-gray-100">
                      <Link
                        to="#"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700"
                      >
                        <Bell size={18} className="text-gray-400" /> Notifications
                      </Link>
                    </li>
                  )}
                  {user && (
                    <li className="hover:bg-gray-100 mt-2 border-t border-gray-100">
                      <button
                        onClick={logout}
                        className="w-full text-left flex items-center gap-3 px-4 py-3 text-red-500 font-medium"
                      >
                        <LogOut size={18} className="text-red-500" /> Logout
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* More Dropdown (Hidden on Mobile) */}
            <div className="relative group cursor-pointer h-12 hidden lg:flex items-center">
              <div className="flex items-center gap-1 hover:bg-gray-50 px-2 py-1.5 rounded-md transition-colors text-[15px]">
                <span>More</span>
                <ChevronDown
                  size={16}
                  className="group-hover:-rotate-180 transition-transform duration-300"
                />
              </div>
              <div className="absolute top-10 right-0 w-56 bg-white shadow-xl border border-gray-100 rounded-b-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-2">
                <ul className="flex flex-col text-[14px]">
                  <li className="hover:bg-gray-50">
                    <Link
                      to="#"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700"
                    >
                      <HeadphonesIcon size={18} className="text-gray-400" />{" "}
                      24x7 Customer Care
                    </Link>
                  </li>
                  <li className="hover:bg-gray-50">
                    <Link
                      to="#"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700"
                    >
                      <Download size={18} className="text-gray-400" /> Download
                      App
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Cart (Always Visible) */}
            <Link
              to="/cart"
              className="relative flex items-center gap-1.5 sm:gap-2 hover:bg-gray-50 p-1.5 sm:px-2 sm:py-1.5 rounded-md transition-colors text-[15px]"
            >
              <ShoppingCart size={22} className="text-gray-800" />
              <span className="font-medium text-gray-800 hidden sm:inline">
                Cart
              </span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1 sm:top-0 sm:right-0 bg-[#FF6F00] text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* BOTTOM ROW: Mobile Search Bar (Hidden on Desktop) */}
        <form
          onSubmit={handleSearch}
          className="flex lg:hidden w-full mt-2 sm:mt-3"
        >
          <div className="relative flex items-center w-full h-10 rounded-sm bg-[#F0F5FF] overflow-hidden focus-within:ring-1 focus-within:ring-primary-blue focus-within:bg-white transition-all border border-transparent focus-within:border-primary-blue shadow-sm">
            <div className="pl-3 pr-2 text-gray-500">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search essentials, groceries and more..."
              className="w-full h-full bg-transparent outline-none text-[13px] text-text-dark placeholder-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </div>

      {/* --- MOBILE NAVIGATION DRAWER --- */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-[100] lg:hidden backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-white z-[101] shadow-2xl flex flex-col transform transition-transform lg:hidden overflow-y-auto">
            {/* Header section of Drawer */}
            <div className="bg-[#0A88FF] text-white p-5 flex flex-col gap-4 relative">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#0A88FF] shadow-inner">
                <User size={24} />
              </div>

              {user ? (
                <div>
                  <h2 className="font-bold text-lg">Hi, {user.name || user.fullName || 'User'}</h2>
                  <p className="text-blue-100 text-xs">{user.email}</p>
                </div>
              ) : (
                <div>
                  <h2 className="font-bold text-lg mb-1">
                    Welcome to NextKart
                  </h2>
                  <Link
                    to="/signin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm font-semibold text-white hover:underline flex items-center gap-1"
                  >
                    Login / Sign Up <ChevronRight size={16} />
                  </Link>
                </div>
              )}
            </div>

            {/* Menu Links */}
            <div className="flex-grow py-2">
              <ul className="flex flex-col text-sm text-gray-700">
                <li>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsLocationOpen(true);
                    }}
                    className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-50 border-b border-gray-100"
                  >
                    <MapPin size={20} className="text-gray-400" />
                    <div className="flex flex-col text-left">
                      <span className="font-medium text-gray-800">
                        Delivery Address
                      </span>
                      <span className="text-xs text-gray-500">
                        {currentLocation}
                      </span>
                    </div>
                  </button>
                </li>

                <li>
                  <Link
                    to="#"
                    className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50"
                  >
                    <LayoutGrid size={20} className="text-gray-400" /> All
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    to="/wishlist"
                    className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50"
                  >
                    <Heart size={20} className="text-gray-400" /> Wishlist
                    {wishlistCount > 0 && (
                      <span className="ml-auto bg-blue-100 text-primary-blue text-xs font-bold px-2 py-0.5 rounded-full">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50"
                  >
                    <Package size={20} className="text-gray-400" /> My Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50"
                  >
                    <Star size={20} className="text-gray-400" /> NextKart Plus
                  </Link>
                </li>

                <li className="my-2 border-t border-gray-100"></li>

                <li>
                  <Link
                    to="#"
                    className="flex items-center gap-4 px-6 py-3 hover:bg-gray-50 text-gray-600"
                  >
                    <Store size={18} className="text-gray-400" /> Become a
                    Seller
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="flex items-center gap-4 px-6 py-3 hover:bg-gray-50 text-gray-600"
                  >
                    <HeadphonesIcon size={18} className="text-gray-400" /> 24x7
                    Customer Care
                  </Link>
                </li>

                {user && (
                  <>
                    <li className="my-2 border-t border-gray-100"></li>
                    <li>
                      <button
                        onClick={() => {
                          logout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full text-left flex items-center gap-4 px-6 py-4 text-red-500 font-medium hover:bg-red-50"
                      >
                        <LogOut size={20} /> Logout
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50 text-center">
              <p className="text-xs text-gray-400">NextKart v1.0.0</p>
            </div>
          </div>
        </>
      )}

      {/* --- LOCATION DRAWER (Existing) --- */}
      {isLocationOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-[100]"
            onClick={() => setIsLocationOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl transform transition-transform overflow-y-auto flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-text-dark">
                Select delivery address
              </h2>
              <button
                onClick={() => setIsLocationOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-6 flex-grow">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Search by area, street name, pin code"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue text-sm placeholder-gray-400 transition-all"
                />
              </div>
              <button
                onClick={handleGetCurrentLocation}
                className="flex items-start gap-3 p-4 border border-blue-100 bg-blue-50/50 rounded-xl hover:bg-blue-50 transition-colors text-left"
              >
                <Crosshair
                  size={20}
                  className="text-primary-blue mt-0.5 shrink-0"
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-primary-blue text-sm">
                    Use my current location
                  </span>
                  <span className="text-xs text-gray-500">
                    Allow access to location
                  </span>
                </div>
              </button>
              <div className="border-t border-gray-100 border-dashed my-2"></div>
              <div className="flex flex-col gap-4">
                <h3 className="text-xs font-semibold text-gray-800 uppercase tracking-wide">
                  Saved addresses
                </h3>
                {!user ? (
                  <button
                    onClick={() => setIsLocationOpen(false)}
                    className="flex items-center gap-3 text-primary-blue hover:underline text-left"
                  >
                    <User size={18} />
                    <span className="text-sm font-semibold">
                      Login to see saved addresses
                    </span>
                  </button>
                ) : (
                  <div className="text-sm text-gray-500">
                    No saved addresses found.
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
