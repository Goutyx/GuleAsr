import React from 'react';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import FeaturedProducts from '../components/FeaturedProducts';
import BannerSection from '../components/BannerSection';
import Reviews from '../components/Reviews';
import Free from '../components/free';

const Home = () => {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedProducts />
      <BannerSection />
      <Reviews />
      <Free />
    </>
  );
};

export default Home;
