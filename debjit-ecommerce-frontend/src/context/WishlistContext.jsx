import { createContext, useState, useContext } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  const toggleWishlist = (item) => {
    const isWishlisted = wishlistItems.some(w => w.id === item.id);
    if (isWishlisted) {
      setWishlistItems(wishlistItems.filter(w => w.id !== item.id));
    } else {
      setWishlistItems([...wishlistItems, item]);
    }
  };

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, wishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
