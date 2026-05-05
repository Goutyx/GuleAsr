import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { orderApi } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { formatINR } from "../utils/currency";
import { User, Package, Heart, LogOut, Settings, ChevronRight, Clock } from "lucide-react";

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { wishlist } = useCart();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      orderApi.myOrders()
        .then(({ data }) => setOrders(data))
        .catch(() => setOrders([]))
        .finally(() => setLoading(false));
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="pt-40 pb-20 flex flex-col items-center justify-center min-h-[70vh] px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
            <User size={40} className="text-secondary" />
          </div>
          <h2 className="text-3xl font-bold text-primary mb-4">Account Access</h2>
          <p className="text-secondary mb-8 max-w-xs mx-auto">Please login to view your orders, wishlist and personal preferences.</p>
          <Link to="/login" className="bg-primary text-background px-10 py-4 font-bold uppercase tracking-widest hover:bg-accent transition-colors inline-block">
            Login Now
          </Link>
        </motion.div>
      </div>
    );
  }

  const userInitials = user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : "GA";

  const stats = [
    { label: "Orders", value: orders.length, icon: <Package size={20} />, color: "bg-blue-500/10 text-blue-500" },
    { label: "Wishlist", value: wishlist.length, icon: <Heart size={20} />, color: "bg-rose-500/10 text-rose-500" },
    { label: "Loyalty Tier", value: "Premium", icon: <Settings size={20} />, color: "bg-amber-500/10 text-amber-500" },
  ];

  return (
    <div className="pt-32 pb-20 px-4 md:px-8 max-w-[1400px] mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16 border-b border-secondary/10 pb-10 md:pb-12">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 text-center sm:text-left">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-surface border border-secondary/20 rounded-2xl flex items-center justify-center text-3xl md:text-5xl font-bold text-primary shadow-xl shrink-0">
              {userInitials}
            </div>
            <div>
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-accent font-bold mb-2 block">Member Profile</span>
              <h1 className="text-3xl md:text-6xl font-bold tracking-tighter text-primary leading-none">{user?.name?.toUpperCase()}</h1>
              <p className="text-secondary mt-1 text-sm">{user?.email}</p>
            </div>
          </div>
          <div className="flex justify-center md:justify-end gap-4">
             <button 
               onClick={logout}
               className="flex items-center gap-2 px-6 py-3 border border-secondary/20 hover:bg-surface transition-colors text-[10px] font-bold uppercase tracking-widest rounded-xl"
             >
               <LogOut size={14} /> Sign Out
             </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="vexo-card p-6 md:p-8 flex items-center justify-between group hover:border-primary/30 transition-colors"
            >
              <div>
                <p className="text-secondary text-[10px] uppercase tracking-widest font-bold mb-1 md:mb-2">{stat.label}</p>
                <h3 className="text-3xl md:text-4xl font-bold text-primary tracking-tighter">{stat.value}</h3>
              </div>
              <div className={`p-3 md:p-4 rounded-xl ${stat.color} transition-transform group-hover:scale-110`}>
                {stat.icon}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content: Orders */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="vexo-card p-6 md:p-8 min-h-[400px] md:min-h-[500px]">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-primary">Order History</h2>
                <Clock size={20} className="text-secondary" />
              </div>
              
              {loading ? (
                <div className="space-y-4">
                  {[1,2,3].map(i => <div key={i} className="h-24 bg-surface animate-pulse rounded-xl" />)}
                </div>
              ) : orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order, i) => (
                    <motion.div 
                      key={order._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      className="group border border-secondary/10 rounded-2xl p-5 md:p-6 hover:bg-surface/50 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/5 rounded-full flex items-center justify-center text-primary shrink-0">
                          <Package size={18} />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="text-primary font-bold text-sm md:text-base">Order #{order._id.slice(-8).toUpperCase()}</span>
                            <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-[9px] font-bold uppercase tracking-tighter rounded">Processed</span>
                          </div>
                          <p className="text-secondary text-[10px] md:text-xs">{new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-4 sm:pt-0 border-secondary/5">
                        <div className="sm:text-right">
                          <p className="text-[10px] text-secondary uppercase font-bold tracking-widest mb-0.5">Amount</p>
                          <p className="text-lg md:text-xl font-bold text-primary">{formatINR(order.totalAmount)}</p>
                        </div>
                        <button className="p-2 hover:bg-primary hover:text-background rounded-full transition-colors border border-secondary/10 sm:border-0">
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-4">
                    <Package size={24} className="text-secondary/40" />
                  </div>
                  <p className="text-secondary text-sm">No orders found in your history.</p>
                  <Link to="/shop" className="text-primary font-bold text-xs uppercase tracking-widest mt-6 hover:underline underline-offset-8">Start Shopping</Link>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar: Preferences & Info */}
          <div className="space-y-6 order-1 lg:order-2">
            <div className="vexo-card p-6 md:p-8">
              <h2 className="text-lg md:text-xl font-bold text-primary mb-6 flex items-center gap-2">
                <Settings size={18} /> Settings
              </h2>
              <div className="space-y-1">
                {['Edit Profile', 'Shipping Addresses', 'Payment Methods', 'Notification Preferences'].map(item => (
                  <button key={item} className="w-full text-left p-4 hover:bg-surface rounded-xl transition-colors text-xs md:text-sm font-medium text-secondary hover:text-primary flex justify-between items-center group">
                    {item}
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>

            <div className="vexo-card p-6 md:p-8 bg-primary text-background overflow-hidden relative group rounded-[2rem]">
              <div className="relative z-10">
                <h2 className="text-xl font-bold mb-2 tracking-tight">Need help?</h2>
                <p className="text-background/70 text-sm mb-6 leading-relaxed">Our concierge team is available 24/7 for our premium members.</p>
                <button className="bg-background text-primary px-8 py-3.5 text-[10px] font-bold uppercase tracking-widest hover:bg-accent transition-colors rounded-xl">
                  Contact Support
                </button>
              </div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-background/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
