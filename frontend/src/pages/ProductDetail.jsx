import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Zap, Clock, Tag, Plus, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { productApi } from "../services/api";
import { formatINR } from "../utils/currency";
import { fallbackProducts, toCardProduct } from "../data/products";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  const mapProductDetails = (source) => {
    const fallback = fallbackProducts.find((item) => item.id === String(source?._id || source?.id));
    return {
      ...toCardProduct(source || fallback || fallbackProducts[0]),
      quote: source?.quote || fallback?.quote || "Crafted to leave a premium signature with every spray.",
      longevity: source?.longevity || fallback?.longevity || "8-10 hours",
      families: source?.families || fallback?.families || [source?.category || fallback?.category, "Oriental"],
      notes:
        source?.notes?.top
          ? source.notes
          : fallback?.notes || { top: source?.notes || ["Bergamot"], middle: ["Rose"], base: ["Musk"] },
    };
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const localMatch = fallbackProducts.find((item) => item.id === String(id));
    if (localMatch) {
      setProduct(mapProductDetails(localMatch));
    }
    productApi
      .getOne(id)
      .then(({ data }) => setProduct(mapProductDetails(data)))
      .catch(() => {
        if (!localMatch) setProduct(null);
      });

    productApi
      .list({ featured: true })
      .then(({ data }) => {
        if (data?.length) {
          setRecommendations(data.map(toCardProduct).filter((item) => item.id !== String(id)).slice(0, 4));
        } else {
          setRecommendations(fallbackProducts.map(toCardProduct).filter((item) => item.id !== String(id)).slice(0, 4));
        }
      })
      .catch(() => setRecommendations(fallbackProducts.map(toCardProduct).filter((item) => item.id !== String(id)).slice(0, 4)));
  }, [id]);

  if (!product) {
    return <div className="pt-32 text-center text-secondary">Product not found.</div>;
  }

  return (
    <div className="bg-background pt-32 pb-24 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Back Link */}
        <Link to="/shop" className="inline-flex items-center text-xs font-bold tracking-[0.2em] uppercase text-secondary hover:text-primary transition-colors mb-12">
          <ArrowLeft size={14} className="mr-2" /> Back to Shop
        </Link>

        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-24 md:mb-32">
          
          {/* Left: Product Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-1/2"
          >
            <div className="vexo-card aspect-[4/5] overflow-hidden group rounded-3xl">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out"
              />
            </div>
          </motion.div>

          {/* Right: Details */}
          <div className="w-full lg:w-1/2 flex flex-col pt-0 md:pt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-primary/5 border border-primary/10 rounded-full text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-primary">
                  {product.category}
                </span>
                <span className="flex items-center gap-1.5 text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-secondary">
                  <Clock size={12} /> {product.longevity}
                </span>
              </div>

              <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-primary mb-4">
                {product.name}
              </h1>
              
              <p className="text-2xl md:text-3xl font-medium text-primary mb-8">{formatINR(product.price)}</p>

              <blockquote className="border-l-2 border-accent pl-6 py-2 mb-10 italic text-lg md:text-2xl text-primary/80 font-light leading-relaxed">
                "{product.quote}"
              </blockquote>

              <p className="text-base md:text-lg text-secondary mb-12 leading-relaxed max-w-lg">
                {product.description}
              </p>

              {/* Fragrance Families */}
              <div className="flex flex-wrap gap-2 mb-12">
                {product.families.map(family => (
                  <span key={family} className="px-4 py-2 bg-surface border border-secondary/10 rounded-full text-[10px] md:text-xs font-semibold text-secondary flex items-center gap-2">
                    <Tag size={12} /> {family}
                  </span>
                ))}
              </div>

              {/* Notes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16 p-6 md:p-8 bg-surface rounded-3xl border border-secondary/5">
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-accent mb-4">Top Notes</h4>
                  <ul className="space-y-2">
                    {product.notes.top.map(note => <li key={note} className="text-sm font-medium text-primary">{note}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-accent mb-4">Middle Notes</h4>
                  <ul className="space-y-2">
                    {product.notes.middle.map(note => <li key={note} className="text-sm font-medium text-primary">{note}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-accent mb-4">Base Notes</h4>
                  <ul className="space-y-2">
                    {product.notes.base.map(note => <li key={note} className="text-sm font-medium text-primary">{note}</li>)}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 max-w-md">
                <button 
                  onClick={() => addToCart(product)}
                  className="vexo-btn flex-1 py-5 flex items-center justify-center gap-3 uppercase text-[10px] tracking-widest font-bold"
                >
                  <ShoppingBag size={18} /> Add to Cart
                </button>
                <button
                  onClick={() => {
                    addToCart(product);
                    navigate("/checkout");
                  }}
                  className="flex-1 py-5 bg-primary text-background flex items-center justify-center gap-3 uppercase text-[10px] tracking-widest font-bold hover:bg-secondary transition-all rounded-full"
                >
                  <Zap size={18} /> Buy Now
                </button>
                <button onClick={() => toggleWishlist(product.id)} className="flex-1 py-5 bg-surface text-primary flex items-center justify-center gap-3 uppercase text-[10px] tracking-widest font-bold hover:bg-primary/10 transition-all rounded-full border border-secondary/20">
                  <Heart size={18} className={isInWishlist(product.id) ? "fill-primary" : ""} /> Wishlist
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* You May Also Love Section */}
        <section className="pt-20 md:pt-24 border-t border-secondary/10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-primary mb-2 uppercase">YOU MAY ALSO LOVE</h2>
              <p className="text-secondary text-xs md:text-sm">Curated recommendations for you.</p>
            </div>
            <Link to="/shop" className="text-[10px] font-bold uppercase tracking-widest underline underline-offset-8 text-primary hover:text-accent transition-colors">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <Link to={`/product/${item.id}`} className="block mb-4">
                  <div className="vexo-card aspect-[3/4] overflow-hidden bg-surface relative rounded-2xl">
                    <img 
                      src={item.images?.[0] || item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all hidden md:flex">
                       <button 
                        onClick={(e) => { e.preventDefault(); addToCart(item); }}
                        className="w-10 h-10 bg-background text-primary rounded-full flex items-center justify-center shadow-xl hover:scale-95 transition-transform"
                       >
                         <Plus size={18} />
                       </button>
                    </div>
                  </div>
                </Link>
                <div className="px-1 text-center sm:text-left">
                  <span className="text-[9px] uppercase tracking-widest font-bold text-accent block mb-1">{item.category}</span>
                  <h3 className="text-lg font-bold tracking-tight text-primary">{item.name}</h3>
                  <p className="text-sm font-medium text-secondary mt-1">{formatINR(item.price)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default ProductDetail;
