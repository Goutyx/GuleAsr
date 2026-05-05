import React from 'react';
import { motion } from 'framer-motion';

const BannerSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: 1.5 + i * 0.2, 
        duration: 0.8, 
        ease: "easeOut" 
      }
    }),
  };

  return (
    <section
      id="story"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: 'clamp(500px, 70vh, 90vh)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#0a0a0a',
      }}
    >
      {/* Background image with slow fade in and slight scale down */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        whileInView={{ opacity: 0.55, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1800&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />

      {/* Animated glow orbs */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '20%',
          left: '15%',
          width: '35vw',
          height: '35vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(150,125,106,0.6) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.4, 0.15] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '40vw',
          height: '40vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
          filter: 'blur(80px)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 1.5rem', maxWidth: '1000px', margin: '0 auto' }}
      >
        {/* Label */}
        <motion.span 
          variants={itemVariants}
          style={{
            display: 'inline-block',
            fontSize: '0.7rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.5)',
            marginBottom: '1rem',
            marginTop: '1rem',
          }}
        >
          The GuleAsr Story
        </motion.span>

        {/* Main Headline with slow typing animation */}
        <h2 style={{
          fontSize: 'clamp(3rem, 11vw, 10rem)',
          fontFamily: '"Inter", sans-serif',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 0.9,
          color: '#ffffff',
          marginBottom: '2rem',
        }}>
          <motion.div 
            variants={{
              hidden: { opacity: 1 },
              visible: {
                transition: { staggerChildren: 0.1, delayChildren: 1.5 }
              }
            }}
            className="flex flex-col items-center"
          >
            <div className="flex flex-wrap justify-center gap-x-4">
              {["WHERE", "SCENT"].map((word, wordIdx) => (
                <span key={word} className="inline-flex">
                  {word.split("").map((char, charIdx) => (
                    <motion.span 
                      key={`${word}-${charIdx}`}
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 }
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                  {/* Add space after word if it's not the last in line */}
                  {wordIdx === 0 && <span className="w-[0.3em]" />}
                </span>
              ))}
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-4 mt-2">
              <span 
                style={{ 
                  WebkitTextStroke: '2px rgba(255,255,255,0.4)', 
                  color: 'transparent',
                }}
                className="inline-flex"
              >
                {"BECOMES".split("").map((char, i) => (
                  <motion.span 
                    key={`becomes-${i}`}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 }
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
              
              <span 
                style={{ 
                  fontStyle: 'italic', 
                  color: '#ffffff',
                }}
                className="inline-flex"
              >
                {"SOUL.".split("").map((char, i) => (
                  <motion.span 
                    key={`soul-${i}`}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 }
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </div>
          </motion.div>
        </h2>

        {/* Sub text */}
        <motion.p 
          variants={itemVariants}
          style={{
            color: 'rgba(255,255,255,0.65)',
            fontSize: '1.1rem',
            lineHeight: 1.8,
            maxWidth: '520px',
            margin: '0 auto 3rem',
            fontWeight: 300,
          }}
        >
          Born from the ancient art of perfumery, GuleAsr blends heritage with modernity — creating fragrances that tell a thousand stories.
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={itemVariants}>
          <a
            href="#collections"
            style={{
              display: 'inline-block',
              marginBottom: '2rem',
              background: '#ffffff',
              color: '#111111',
              borderRadius: '9999px',
              padding: '1.1rem 3rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'transform 0.2s ease, opacity 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Explore Collection
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default BannerSection;
