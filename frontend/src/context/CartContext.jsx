import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from "react-hot-toast";
import { cartApi, wishlistApi } from "../services/api";
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const normalizeCartItem = (entry) => ({
    id: entry.product?._id || entry.id,
    name: entry.product?.name || entry.name,
    category: entry.product?.category || entry.category,
    price: entry.product?.price || entry.price || 0,
    image: entry.product?.images?.[0] || entry.image,
    quantity: entry.quantity || 1,
  });

  const syncServerCart = async () => {
    const token = localStorage.getItem("guleasr_token");
    if (!token) return;
    try {
      const { data } = await cartApi.get();
      setCartItems((data.items || []).map(normalizeCartItem));
    } catch {
      // Ignore sync failures for guest sessions.
    }
  };

  const syncWishlist = async () => {
    const token = localStorage.getItem("guleasr_token");
    if (!token) return;
    try {
      const { data } = await wishlistApi.get();
      setWishlist(data.products || []);
    } catch {
      // Keep local state if unavailable.
    }
  };

  // Sync cart and wishlist when user logs in or page first loads with auth token
  useEffect(() => {
    syncServerCart();
    syncWishlist();
  }, [user]);

  const addToCart = (product, quantity = 1) => {
    const normalized = {
      id: product._id || product.id,
      name: product.name,
      category: product.category,
      price: Number(product.price),
      image: product.images?.[0] || product.image,
      quantity,
    };
    setCartItems(prev => {
      const existing = prev.find(item => item.id === normalized.id);
      if (existing) {
        return prev.map(item => 
          item.id === normalized.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, normalized];
    });
    if (product._id) cartApi.add(product._id, quantity).catch(() => {});
    toast.success("Added to cart");
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
    cartApi.remove(productId).catch(() => {});
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
    cartApi.update(productId, newQuantity).catch(() => {});
  };

  const toggleWishlist = async (productId) => {
    const token = localStorage.getItem("guleasr_token");
    if (!token) {
      toast.error("Please login to use wishlist");
      return;
    }
    const { data } = await wishlistApi.toggle(productId);
    setWishlist(data.products || []);
  };

  const isInWishlist = (productId) =>
    wishlist.some((item) => String(item._id || item.id) === String(productId));

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      // Parse price assuming format "$240"
      const price = Number(item.price);
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleCart,
      getCartTotal,
      getCartCount,
      wishlist,
      toggleWishlist,
      isInWishlist
    }}>
      {children}
    </CartContext.Provider>
  );
};
