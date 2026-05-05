import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  const sentence = "Discover the absolute essence of luxury. A curated collection of bold, provocative, and elegant scents.";
  
  const headingVariants = {
    hidden: { opacity: 0, x: -200 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.02, delayChildren: 0.8 },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      transition: { duration: 0.1 },
    },
    hidden: {
      opacity: 0,
    },
  };

  return (
    <section className="pt-20 md:pt-24 px-4 md:px-8 pb-0 md:pb-8 min-h-screen flex flex-col max-w-[1800px] mx-auto">
      <div className="flex-1 vexo-card relative flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Content Area */}
        <div className="flex-1 p-6 sm:p-8 md:p-16 flex flex-col justify-center z-10">
          <motion.div
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-block px-4 py-1.5 rounded-full border border-primary/20 text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-6 md:mb-8 text-primary"
            >
              New Collection 2026
            </motion.div>
            
            <motion.h1 
              variants={headingVariants}
              className="text-5xl sm:text-6xl md:text-[5.5rem] lg:text-[7rem] leading-[0.95] md:leading-[0.9] tracking-tighter text-primary mb-6 md:mb-8"
            >
              FRAGRANCE <br />
              <span className="text-secondary">BEYOND <br className="hidden sm:block" /> TIME.</span>
            </motion.h1>
            
            <motion.p 
              variants={container}
              className="text-secondary/80 text-base sm:text-lg md:text-xl max-w-md mb-10 md:mb-12 font-light leading-relaxed min-h-[4.5em] sm:min-h-[3.5em]"
            >
              {sentence.split("").map((char, index) => (
                <motion.span key={index} variants={child}>
                  {char}
                </motion.span>
              ))}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.5 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <Link to="/shop" className="vexo-btn px-10 py-5 text-sm uppercase tracking-widest flex items-center justify-center">
                Shop Collection
              </Link>
              <button className="px-10 py-5 text-sm uppercase tracking-widest flex items-center justify-center text-primary hover:text-secondary transition-colors underline underline-offset-4">
                Explore Story
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Image Area */}
        <div className="flex-1 relative min-h-[40vh] sm:min-h-[50vh] lg:min-h-0 overflow-hidden order-first lg:order-last">
          <motion.div
            initial={{ scale: 1.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <img 
              src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop" 
              alt="Luxury Perfume" 
              className="w-full h-full object-cover object-center"
            />
            {/* Gradient overlay to ensure text readability on mobile and desktop */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent lg:bg-gradient-to-r lg:from-background lg:via-transparent lg:to-transparent" />
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
