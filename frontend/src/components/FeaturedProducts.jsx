import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { fallbackProducts, toCardProduct } from "../data/products";
import { formatINR } from "../utils/currency";

const allProducts = fallbackProducts.map(toCardProduct);

const filters = ["All", "For Him", "For Her", "Unisex", "Floral", "Woody", "Fresh", "Oriental", "Citrus", "perfume", "oil"];

const FeaturedProducts = () => {
  const targetRef = useRef(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");

  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);

  const filtered = allProducts.filter(
    (p) =>
      activeFilter === "All" ||
      p.category === activeFilter ||
      p.type === activeFilter ||
      p.families?.includes(activeFilter)
  );

  return (
    <>
      {/* ── Horizontal Scroll Section ── */}
      <section ref={targetRef} id="collections" className="relative h-[200vh] md:h-[320vh] bg-background">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4 md:gap-8 px-6 md:px-16 w-max">
            {/* Label card at front */}
            <div className="shrink-0 flex flex-col justify-center min-w-[70vw] sm:min-w-[40vw] md:min-w-[30vw] pr-8">
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-accent font-bold mb-3 md:mb-4">New Drop 2026</span>
              <h2 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter text-primary leading-[0.9] mb-4 md:mb-6">
                CURATED<br /><span className="text-secondary">SELECTION.</span>
              </h2>
              <p className="text-secondary text-sm md:text-lg max-w-xs leading-relaxed">
                Scroll to discover our finest fragrances — each one a journey.
              </p>
            </div>

            {allProducts.slice(0, 8).map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="vexo-card group shrink-0 relative overflow-hidden w-65 sm:w-[320px] lg:w-90 aspect-3/4"
              >
                <div className="relative w-full h-full bg-surface overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 right-4 z-20">
                    <button
                      onClick={(e) => { 
                        e.preventDefault(); 
                        const success = addToCart(product);
                        if (!success) {
                          navigate("/login");
                        }
                      }}
                      className="bg-background text-primary p-2.5 sm:p-3 rounded-full shadow-lg hover:scale-95 transition-transform"
                    >
                      <Plus size={18} className="sm:w-5 sm:h-5" strokeWidth={2.5} />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-linear-to-t from-black/80 via-black/30 to-transparent">
                    <span className="text-[10px] sm:text-[11px] text-white/60 uppercase tracking-widest font-semibold mb-1 block">{product.category} • {product.type}</span>
                    <div className="flex justify-between items-end">
                      <h3 className="text-xl sm:text-2xl text-white font-bold tracking-tight">{product.name}</h3>
                      <span className="text-base sm:text-lg text-white font-semibold">{formatINR(product.price)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── All Products Grid with Filters ── */}
      <section className="pt-4 pb-16 md:py-24 px-4 md:px-8 max-w-450 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-primary mb-2">SHOP</h2>
            <p className="text-secondary text-sm md:text-base">Find your signature scent.</p>
          </div>

          {/* Filter Buttons - Scrollable on Mobile */}
          <div className="flex overflow-x-auto pb-4 md:pb-0 md:flex-wrap gap-3 no-scrollbar scroll-smooth">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`shrink-0 px-5 py-2 rounded-full text-[10px] md:text-sm font-semibold uppercase tracking-widest transition-all ${
                  activeFilter === f
                    ? "bg-primary text-background"
                    : "bg-surface text-secondary hover:bg-primary/10 hover:text-primary border border-secondary/5"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {filtered.slice(0, 8).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="vexo-card group cursor-pointer"
            >
              <Link to={`/product/${product.id}`} className="block relative aspect-3/4 overflow-hidden bg-surface">
                <img
                   src={product.image}
                   alt={product.name}
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 right-3 z-20">
                  <button
                    onClick={(e) => { 
                      e.preventDefault(); 
                      const success = addToCart(product);
                      if (!success) {
                        navigate("/login");
                      }
                    }}
                    className="bg-background text-primary p-2.5 rounded-full shadow-md hover:scale-95 transition-transform"
                  >
                    <Plus size={16} strokeWidth={2.5} />
                  </button>
                </div>
              </Link>
              <div className="p-4 bg-surface">
                <span className="text-[10px] text-accent uppercase tracking-widest font-bold block mb-1">{product.category} • {product.type}</span>
                <h3 className="text-base text-primary font-bold tracking-tight">{product.name}</h3>
                <span className="text-sm text-secondary font-medium mt-1 block">{formatINR(product.price)}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 md:mt-16 flex justify-center">
          <Link
            to="/shop"
            className="group relative inline-flex items-center gap-4 px-12 py-5 bg-primary text-background overflow-hidden transition-all hover:pr-16"
          >
            <span className="relative z-10 text-sm font-bold uppercase tracking-[0.2em]">View All Collections</span>
            <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo"></div>
            <Plus size={18} className="relative z-10 transition-transform group-hover:rotate-90" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default FeaturedProducts;
