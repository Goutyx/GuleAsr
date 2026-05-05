import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { formatINR } from "../utils/currency";

const Cart = () => {
  const { isCartOpen, toggleCart, cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    toggleCart();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-background z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-secondary/20 flex justify-between items-center bg-surface">
              <h2 className="text-2xl font-bold tracking-tighter text-primary flex items-center">
                <ShoppingBag className="mr-2" /> YOUR CART
              </h2>
              <button onClick={toggleCart} className="p-2 hover:bg-black/5 rounded-full text-secondary hover:text-primary transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-secondary">
                  <ShoppingBag size={48} className="mb-4 opacity-20" />
                  <p className="text-lg font-medium">Your cart is empty.</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-surface rounded-2xl">
                    <div className="w-24 h-32 bg-white rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-primary">{item.name}</h3>
                          <button onClick={() => removeFromCart(item.id)} className="text-secondary hover:text-red-500 transition-colors">
                            <X size={16} />
                          </button>
                        </div>
                        <p className="text-xs text-secondary uppercase tracking-widest">{item.category}</p>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center border border-secondary/20 rounded-full px-2 py-1">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-primary text-secondary">
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center font-medium text-sm text-primary">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-primary text-secondary">
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-bold text-primary">{formatINR(item.price)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-secondary/20 bg-surface">
                <div className="flex justify-between items-center mb-6 text-lg">
                  <span className="font-medium text-secondary">Subtotal</span>
                  <span className="font-bold text-primary">{formatINR(getCartTotal())}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="vexo-btn w-full py-4 uppercase tracking-widest text-sm flex items-center justify-center"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
