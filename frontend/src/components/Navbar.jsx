import React, { useState } from "react";
import { ShoppingBag, Search, User, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/10.png";

const Navbar = () => {
  const { toggleCart, getCartCount } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Our Story", path: "#story" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-0 left-0 right-0 z-50 py-7 px-4 md:px-8"
      >
        <div className="flex justify-between items-center max-w-[1800px] mx-auto">
          {/* Left: Nav Links (Desktop) */}
          <div className="flex-1 hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium tracking-widest uppercase text-primary hover:text-accent transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Hamburger (Mobile) */}
          <div className="flex-1 md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-primary p-1"
              aria-label="Open Menu"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src={logo}
              alt="GuleAsr"
              className="h-20 md:h-28 object-contain filter drop-shadow-2xl"
              style={{ maxWidth: "320px" }}
            />
          </Link>

          {/* Right: Icons */}
          <div className="flex-1 flex justify-end items-center gap-4 md:gap-5">
            <button
              className="text-primary hover:text-accent transition-colors hidden sm:block"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <Link
              to={user ? "/profile" : "/login"}
              className="text-primary hover:text-accent transition-colors hidden sm:block"
              aria-label="Account"
            >
              <User size={20} />
            </Link>

            {isAdmin && (
              <Link
                to="/admin"
                className="text-[10px] md:text-xs uppercase tracking-widest text-secondary hover:text-primary hidden sm:block"
              >
                Admin
              </Link>
            )}

            <button
              onClick={toggleCart}
              className="relative text-primary hover:text-accent transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {getCartCount() > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-accent text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {getCartCount()}
                </span>
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-background flex flex-col p-8 md:hidden"
          >
            <div className="flex justify-between items-center mb-16">
              <img
                src={logo}
                alt="GuleAsr"
                className="h-20 md:h-22 object-contain drop-shadow-xl"
              />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-primary"
              >
                <X size={28} />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-bold tracking-tighter text-primary hover:text-accent transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="mt-auto border-t border-secondary/10 pt-8">
              {user ? (
                <div className="flex flex-col gap-6">
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-xl font-medium text-primary"
                  >
                    <User size={24} /> My Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left text-xl font-medium text-secondary"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl font-medium text-primary"
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
