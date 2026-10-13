import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from "react-hot-toast";
import { cartApi } from "../services/api";
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

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

  // Sync cart when user logs in or page first loads with auth token
  useEffect(() => {
    syncServerCart();
  }, [user]);

  const addToCart = async (product, quantity = 1) => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return false;
    }

    // Guard: a real MongoDB ObjectId is 24 hex chars. Fallback products have
    // _id like "1" or "2" — refuse to push those to the backend cart.
    const hasRealId = typeof product._id === "string" && /^[a-f0-9]{24}$/i.test(product._id);
    if (!hasRealId) {
      toast.error("This product is not available for purchase yet.");
      return false;
    }

    const normalized = {
      id: product._id,
      name: product.name,
      category: product.category,
      price: Number(product.price),
      image: product.images?.[0] || product.image,
      quantity,
    };

    // Optimistic local update so UI feels instant
    setCartItems(prev => {
      const existing = prev.find(item => item.id === normalized.id);
      if (existing) {
        return prev.map(item =>
          item.id === normalized.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, normalized];
    });

    // Persist to backend BEFORE claiming success so checkout can rely on it
    try {
      await cartApi.add(product._id, quantity);
    } catch (err) {
      // Roll back the optimistic update
      setCartItems(prev => {
        const existing = prev.find(item => item.id === normalized.id);
        if (existing && (existing.quantity || 0) <= quantity) {
          return prev.filter(item => item.id !== normalized.id);
        }
        return prev.map(item =>
          item.id === normalized.id ? { ...item, quantity: item.quantity - quantity } : item
        );
      });
      toast.error(err.response?.data?.message || "Failed to add to cart");
      return false;
    }

    toast.success("Added to cart");
    setIsCartOpen(true);
    return true;
  };

  const removeFromCart = async (productId) => {
    const previous = cartItems;
    setCartItems(prev => prev.filter(item => item.id !== productId));
    try {
      await cartApi.remove(productId);
    } catch (err) {
      // Roll back on failure
      setCartItems(previous);
      toast.error(err.response?.data?.message || "Failed to remove item");
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    const previous = cartItems;
    setCartItems(prev => prev.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
    try {
      await cartApi.update(productId, newQuantity);
    } catch (err) {
      setCartItems(previous);
      toast.error(err.response?.data?.message || "Failed to update quantity");
    }
  };

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
    }}>
      {children}
    </CartContext.Provider>
  );
};
