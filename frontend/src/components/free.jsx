import React from 'react';
import { motion } from 'framer-motion';

const free = () => {
  const text = "Free Shipping on Orders Above ₹2,000 • Authentic Luxury Fragrances  • Easy Returns • Secure Payments";
  
  return (
    <div className="w-full h-12 bg-primary text-background overflow-hidden py-4 border-y border-secondary/20 flex my-8 items-center">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 15
        }}
      >
        <h2 className="text-sm md:text-xl font-bold tracking-tighter uppercase px-4 m-0 text-background">
          {text}
        </h2>
        <h2 className="text-sm md:text-xl font-bold tracking-tighter uppercase px-4 m-0 text-background">
          {text}
        </h2>
      </motion.div>
    </div>
  );
};

export default free;
