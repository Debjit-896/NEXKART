import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Dynamic computations
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  
  // Assume each item has `originalPrice` (MRP) and `price` (discounted price)
  const totalMRP = cartItems.reduce((total, item) => total + (item.originalPrice || item.price || 0) * (item.quantity || 1), 0);
  const totalSellingPrice = cartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0);
  const discountOnMRP = totalMRP - totalSellingPrice;
  
  // Mock coupon logic for now
  const couponDiscount = 0; 
  
  // Mock shipping logic: free if total > 500, else 100
  const shippingFee = totalSellingPrice > 500 || totalSellingPrice === 0 ? 0 : 100;

  const totalAmount = totalSellingPrice - couponDiscount + shippingFee;

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      clearCart,
      updateQuantity,
      cartCount,
      totalMRP,
      discountOnMRP,
      couponDiscount,
      shippingFee,
      totalAmount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
