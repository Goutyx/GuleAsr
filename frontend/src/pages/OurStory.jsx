import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const OurStory = () => {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-xs font-semibold tracking-widest uppercase text-secondary hover:text-primary transition-colors mb-12"
        >
          <ArrowLeft size={14} className="mr-2" /> Back Home
        </Link>

        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="block text-[10px] md:text-xs uppercase tracking-[0.4em] text-accent font-bold mb-6"
        >
          Our Story
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-bold tracking-tighter text-primary mb-12 leading-[1.05]"
        >
          A heritage of scent, a future of craft.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-secondary leading-relaxed"
        >
          Born from the ancient art of perfumery, GuleAsr blends heritage with
          modernity — creating fragrances that tell a thousand.
        </motion.p>
      </div>
    </div>
  );
};

export default OurStory;
