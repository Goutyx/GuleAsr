import React from 'react';
import { motion } from 'framer-motion';

const Marquee = () => {
  const text = "GULEASR • SIGNATURE COLLECTION • FRAGRANCE BEYOND TIME • LUXURY PERFUMES • ";
  
  return (
    <div className="w-full bg-primary text-background overflow-hidden py-4 border-y border-secondary/20 flex items-center mb-8">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20
        }}
      >
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase px-4 m-0 text-background">
          {text}
        </h2>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase px-4 m-0 text-background">
          {text}
        </h2>
      </motion.div>
    </div>
  );
};

export default Marquee;
