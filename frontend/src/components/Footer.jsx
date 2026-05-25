import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Share2 } from 'lucide-react';

// Inline SVG for Instagram since it may not exist in this lucide version
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const TwitterXIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-primary text-background font-inter">

      {/* Main Footer */}
      <div className="px-4 md:px-16 py-20 max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">

        {/* Brand Column */}
        <div className="lg:col-span-1">
          <h2 className="text-5xl text-white font-bold tracking-tighter mb-6">
            GULE<span style={{ color: '#967D6A' }}>ASR</span>
          </h2>
          <p className="text-background/70 text-sm leading-relaxed mb-8 max-w-xs">
            Born from the ancient art of perfumery, GuleAsr crafts fragrances that are timeless, evocative, and utterly luxurious.
          </p>
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/guleasr.official"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-background/10 hover:bg-accent flex items-center justify-center transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://twitter.com/guleasr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-background/10 hover:bg-accent flex items-center justify-center transition-colors"
              aria-label="Twitter / X"
            >
              <TwitterXIcon />
            </a>
            <a
              href="mailto:hello@guleasr.com"
              className="w-10 h-10 rounded-full bg-background/10 hover:bg-accent flex items-center justify-center transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-background/60">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            {[
              { label: 'Home', to: '/' },
              { label: 'Shop All', to: '/shop' },
              { label: 'For Him', to: '/shop' },
              { label: 'For Her', to: '/shop' },
              { label: 'Perfume Oils', to: '/shop' },
              { label: 'Our Story', to: '/#story' },
            ].map(link => (
              <li key={link.label}>
                <Link to={link.to} className="text-background/80 hover:text-background transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-background/60">Support</h4>
          <ul className="space-y-3 text-sm text-background/80">
            <li><a href="#" className="hover:text-background transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-background transition-colors">Shipping & Delivery</a></li>
            <li><a href="#" className="hover:text-background transition-colors">Returns & Exchanges</a></li>
            <li><a href="#" className="hover:text-background transition-colors">Track My Order</a></li>
            <li><Link to="/login" className="hover:text-background transition-colors">My Account</Link></li>
            <li><a href="#" className="hover:text-background transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact & Newsletter */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-background/60">Stay Connected</h4>
          <ul className="space-y-3 text-sm text-background/80 mb-8">
            <li className="flex items-center gap-2">
              <Phone size={14} />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} />
              <a href="mailto:hello@guleasr.com" className="hover:text-background transition-colors">hello@guleasr.com</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 flex-shrink-0" />
              <span>GuleAsr HQ, Noida, Uttar Pradesh, India</span>
            </li>
            <li className="flex items-center gap-2 font-bold" style={{ color: '#967D6A' }}>
              <InstagramIcon />
              <a
                href="https://www.instagram.com/guleasr.official"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline underline-offset-2"
              >
                @guleasr.official
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10 px-4 md:px-16 py-6 max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-background/50">
        <p>&copy; {new Date().getFullYear()} GuleAsr. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Follow us&nbsp;
          <a href="https://www.instagram.com/guleasr.official" target="_blank" rel="noopener noreferrer" className="font-bold hover:underline" style={{ color: '#967D6A' }}>
            @guleasr.official
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
