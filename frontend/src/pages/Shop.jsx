import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Filter, X as CloseIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { productApi } from "../services/api";
import { formatINR } from "../utils/currency";
import { fallbackProducts, toCardProduct } from "../data/products";

const Shop = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [family, setFamily] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await productApi.list();
        if (data && data.length > 0) {
          setProducts(data.map(toCardProduct));
        } else {
          setProducts(fallbackProducts.map(toCardProduct));
        }
      } catch (err) {
        console.error("Failed to fetch products, using fallbacks", err);
        setProducts(fallbackProducts.map(toCardProduct));
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let list = [...products];
    if (category) {
      list = list.filter((item) => item.category === category);
    }
    if (family) {
      list = list.filter((item) => item.families?.includes(family));
    }
    if (priceRange === "under_2500") list = list.filter((item) => Number(item.price) <= 2500);
    if (priceRange === "2500_3500") list = list.filter((item) => Number(item.price) >= 2500 && Number(item.price) <= 3500);
    if (priceRange === "above_3500") list = list.filter((item) => Number(item.price) >= 3500);

    return list;
  }, [products, category, family, priceRange]);

  const categories = useMemo(() => ["For Him", "For Her", "Unisex"], []);
  const fragranceFamilies = useMemo(() => ["Floral", "Woody", "Fresh", "Oriental", "Citrus"], []);

  return (
    <div className="pt-24 md:pt-32 pb-24 px-4 md:px-8 max-w-[1800px] mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 md:mb-16"
      >
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-primary mb-4">SHOP</h1>
        <p className="text-secondary text-base md:text-lg max-w-xl leading-relaxed">Explore our complete collection of signature perfumes and alcohol-free perfume oils.</p>
      </motion.div>

      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-8">
        <button 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="w-full py-4 bg-surface border border-secondary/10 rounded-2xl flex items-center justify-center gap-3 font-bold text-primary uppercase tracking-widest text-xs"
        >
          {isFilterOpen ? <CloseIcon size={18} /> : <Filter size={18} />}
          {isFilterOpen ? "Close Filters" : "Filter & Sort"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-12 relative">
        {/* Sidebar Filters */}
        <div className={`
          w-full md:w-64 flex-shrink-0 
          ${isFilterOpen ? "block" : "hidden md:block"}
          transition-all duration-300
        `}>
          <div className="space-y-8 md:sticky md:top-32 bg-background z-30">
            <div>
              <h3 className="font-black text-primary mb-5 uppercase tracking-[0.2em] text-[10px]">Categories</h3>
              <ul className="space-y-4 text-secondary">
                <li onClick={() => { setCategory(""); setIsFilterOpen(false); }} className={`cursor-pointer transition-colors text-sm ${category === "" ? "text-primary font-bold" : "hover:text-primary font-medium"}`}>All Categories</li>
                {categories.map((item) => (
                  <li key={item} onClick={() => { setCategory(item); setIsFilterOpen(false); }} className={`cursor-pointer transition-colors text-sm ${category === item ? "text-primary font-bold" : "hover:text-primary font-medium"}`}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-black text-primary mb-5 uppercase tracking-[0.2em] text-[10px]">Fragrance Family</h3>
              <ul className="space-y-4 text-secondary">
                <li onClick={() => { setFamily(""); setIsFilterOpen(false); }} className={`cursor-pointer transition-colors text-sm ${family === "" ? "text-primary font-bold" : "hover:text-primary font-medium"}`}>All Families</li>
                {fragranceFamilies.map((item) => (
                  <li key={item} onClick={() => { setFamily(item); setIsFilterOpen(false); }} className={`cursor-pointer transition-colors text-sm ${family === item ? "text-primary font-bold" : "hover:text-primary font-medium"}`}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-black text-primary mb-5 uppercase tracking-[0.2em] text-[10px]">Price Range</h3>
              <ul className="space-y-4 text-secondary">
                <li onClick={() => { setPriceRange(""); setIsFilterOpen(false); }} className={`cursor-pointer transition-colors text-sm ${priceRange === "" ? "text-primary font-bold" : "hover:text-primary font-medium"}`}>All Prices</li>
                <li onClick={() => { setPriceRange("under_2500"); setIsFilterOpen(false); }} className={`cursor-pointer transition-colors text-sm ${priceRange === "under_2500" ? "text-primary font-bold" : "hover:text-primary font-medium"}`}>Under Rs. 2500</li>
                <li onClick={() => { setPriceRange("2500_3500"); setIsFilterOpen(false); }} className={`cursor-pointer transition-colors text-sm ${priceRange === "2500_3500" ? "text-primary font-bold" : "hover:text-primary font-medium"}`}>Rs. 2500 - 3500</li>
                <li onClick={() => { setPriceRange("above_3500"); setIsFilterOpen(false); }} className={`cursor-pointer transition-colors text-sm ${priceRange === "above_3500" ? "text-primary font-bold" : "hover:text-primary font-medium"}`}>Over Rs. 3500</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="vexo-card group flex flex-col cursor-pointer overflow-hidden"
            >
              <Link to={`/product/${product.id}`} className="relative aspect-[4/5] overflow-hidden bg-surface block">
                <img 
                  src={product.images?.[0] || product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute bottom-4 right-4 z-20">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      const success = addToCart(product);
                      if (!success) {
                        navigate("/login");
                      }
                    }}
                    className="bg-primary text-background p-3 rounded-full hover:scale-95 transition-transform flex items-center justify-center shadow-xl"
                  >
                    <Plus size={20} strokeWidth={2.5} />
                  </button>
                </div>
              </Link>
              <div className="p-6 bg-surface flex flex-col flex-1">
                <span className="text-[10px] text-accent uppercase tracking-widest font-bold mb-2 block">{product.category}</span>
                <h3 className="text-xl md:text-2xl text-primary font-bold tracking-tight mb-3">{product.name}</h3>
                <span className="text-[10px] text-secondary uppercase tracking-widest font-semibold mb-4 leading-relaxed">{(product.families || []).join(" • ")}</span>
                <div className="mt-auto">
                  <span className="text-lg text-primary font-bold tracking-tight">{formatINR(product.price)}</span>
                </div>
              </div>
            </motion.div>
          ))}
          {!filteredProducts.length && (
            <div className="col-span-full vexo-card p-12 text-center text-secondary border-dashed">
              <p className="text-lg font-medium mb-2">No products matched this filter.</p>
              <button onClick={() => { setCategory(""); setFamily(""); setPriceRange(""); }} className="text-primary font-bold underline underline-offset-4 text-sm uppercase tracking-widest">Clear all filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
