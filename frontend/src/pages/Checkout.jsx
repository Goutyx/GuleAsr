import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import toast from "react-hot-toast";
import { formatINR } from "../utils/currency";
import { orderApi, paymentApi, cartApi } from "../services/api";

const Checkout = () => {
  const { cartItems, getCartTotal, cartItems: items, removeFromCart } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Card");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    line1: "",
    city: "",
    postalCode: "",
    state: "",
    country: "India",
  });

  const loadRazorpay = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const placeCodOrder = async () => {
    try {
      setIsLoading(true);
      const serverCart = await cartApi.get();
      if (!serverCart.data?.items?.length) {
        toast.error("Your cart is empty or not synced. Please re-add items and try again.");
        setIsLoading(false);
        return;
      }
      await orderApi.create({
        shippingAddress: formData,
        paymentMethod: "COD",
        paymentStatus: "pending",
      });
      await Promise.all(cartItems.map((item) => removeFromCart(item.id)));
      setIsSubmitted(true);
      toast.success("Order placed successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create order");
      setIsLoading(false);
    }
  };

  const placeOnlineOrder = async () => {
    try {
      // 1. Make sure the server cart is in sync before creating an order
      const serverCart = await cartApi.get();
      if (!serverCart.data?.items?.length) {
        toast.error("Your cart is empty or not synced. Please re-add items and try again.");
        setIsLoading(false);
        return;
      }

      // 2. Create the Razorpay order (gives us a razorpay_order_id)
      const { data } = await paymentApi.createOrder(getCartTotal());

      // 3. Pre-create our order in the DB with paymentStatus: "pending" and the razorpayOrderId
      //    so the verify endpoint has something to update
      const { data: order } = await orderApi.create({
        shippingAddress: formData,
        paymentMethod,
        paymentStatus: "pending",
        razorpayOrderId: data.order.id,
      });

      // 4. Open Razorpay
      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "GuleAsr",
        description: "Premium fragrance checkout",
        order_id: data.order.id,
        handler: async (response) => {
          try {
            // 5. Verify signature + update order.paymentStatus to "paid" server-side
            await paymentApi.verify(response);
            await Promise.all(cartItems.map((item) => removeFromCart(item.id)));
            setIsSubmitted(true);
            toast.success("Payment successful! Order placed.");
          } catch (error) {
            toast.error("Payment verification failed. Please contact support.");
            setIsLoading(false);
          }
        },
        modal: {
          // 6. If user closes the popup without paying, mark the order as failed
          ondismiss: async () => {
            try {
              await paymentApi.markFailed(data.order.id);
            } catch {}
            setIsLoading(false);
            toast("Payment cancelled. Your order was not completed.");
          },
        },
        prefill: { name: formData.name, email: formData.email, contact: formData.phone },
        theme: { color: "#967D6A" },
      };
      const gateway = new window.Razorpay(options);
      gateway.open();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to process payment");
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cartItems.length) {
      toast.error("Your cart is empty");
      return;
    }
    if (!localStorage.getItem("guleasr_token")) {
      toast.error("Please login before checkout");
      return;
    }
    if (!formData.name || !formData.email || !formData.phone || !formData.line1 || !formData.city || !formData.postalCode || !formData.state) {
      toast.error("Please fill all fields");
      return;
    }

    setIsLoading(true);

    if (paymentMethod === "COD") {
      await placeCodOrder();
      return;
    }

    const ready = await loadRazorpay();
    if (!ready) {
      toast.error("Unable to load payment gateway");
      setIsLoading(false);
      return;
    }
    await placeOnlineOrder();
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="vexo-card max-w-lg w-full p-12 text-center"
        >
          <CheckCircle2 size={64} className="text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold tracking-tighter text-primary mb-4">Order Confirmed</h2>
          <p className="text-secondary mb-8">Thank you for your purchase. Your luxury fragrance is being prepared.</p>
          <Link to="/" className="vexo-btn inline-block px-8 py-4 text-sm uppercase tracking-widest">
            Return Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-4 md:px-8 max-w-300 mx-auto min-h-screen">
      <Link to="/shop" className="inline-flex items-center text-sm font-semibold tracking-widest uppercase text-secondary hover:text-primary transition-colors mb-8">
        <ArrowLeft size={16} className="mr-2" /> Back to Shop
      </Link>
      
      <h1 className="text-5xl font-bold tracking-tighter text-primary mb-12">CHECKOUT</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Form */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="vexo-card p-8">
              <h2 className="text-xl font-bold mb-6 text-primary">Shipping Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <input required type="text" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData((s) => ({ ...s, name: e.target.value }))} className="col-span-2 p-4 bg-background border border-secondary/20 rounded-xl focus:outline-none focus:border-primary text-primary" />
                <input required type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData((s) => ({ ...s, email: e.target.value }))} className="col-span-2 p-4 bg-background border border-secondary/20 rounded-xl focus:outline-none focus:border-primary text-primary" />
                <input required type="tel" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData((s) => ({ ...s, phone: e.target.value }))} className="col-span-2 p-4 bg-background border border-secondary/20 rounded-xl focus:outline-none focus:border-primary text-primary" />
                <input required type="text" placeholder="Address" value={formData.line1} onChange={(e) => setFormData((s) => ({ ...s, line1: e.target.value }))} className="col-span-2 p-4 bg-background border border-secondary/20 rounded-xl focus:outline-none focus:border-primary text-primary" />
                <input required type="text" placeholder="City" value={formData.city} onChange={(e) => setFormData((s) => ({ ...s, city: e.target.value }))} className="col-span-1 p-4 bg-background border border-secondary/20 rounded-xl focus:outline-none focus:border-primary text-primary" />
                <input required type="text" placeholder="Postal Code" value={formData.postalCode} onChange={(e) => setFormData((s) => ({ ...s, postalCode: e.target.value }))} className="col-span-1 p-4 bg-background border border-secondary/20 rounded-xl focus:outline-none focus:border-primary text-primary" />
                <input required type="text" placeholder="State" value={formData.state} onChange={(e) => setFormData((s) => ({ ...s, state: e.target.value }))} className="col-span-2 p-4 bg-background border border-secondary/20 rounded-xl focus:outline-none focus:border-primary text-primary" />
              </div>
            </div>

            <div className="vexo-card p-8">
              <h2 className="text-xl font-bold mb-6 text-primary">Payment Method</h2>
              <div className="grid grid-cols-3 gap-3">
                {["UPI", "Card", "COD"].map((method) => (
                  <button key={method} type="button" onClick={() => setPaymentMethod(method)} className={`p-3 rounded-xl border ${paymentMethod === method ? "border-primary text-primary" : "border-secondary/20 text-secondary"}`}>
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="vexo-btn w-full py-5 text-sm uppercase tracking-widest font-bold disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? "Processing..." : `Place Order - ${formatINR(getCartTotal())}`}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-100">
          <div className="vexo-card p-8 sticky top-32">
            <h2 className="text-xl font-bold mb-6 text-primary">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-secondary">{item.quantity}x {item.name}</span>
                  <span className="text-primary font-bold">{formatINR(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="h-px w-full bg-secondary/20 mb-6" />
            <div className="flex justify-between items-center text-lg font-bold">
              <span className="text-primary">Total</span>
              <span className="text-primary">{formatINR(getCartTotal())}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
