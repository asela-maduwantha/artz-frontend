import React from 'react';
import Header from '../components/layout/Header';
import HeroSection from '../components/layout/HeroSection';
import FeaturedProducts from '../components/layout/FeaturedProducts';
import ValueProposition from '../components/layout/ValuePosition';
import Footer from '../components/layout/Footer';

const HomePage: React.FC = () => {
  return (
    <div className="font-poppins text-gray-800">
      <Header />
      <HeroSection />
      <FeaturedProducts />
      <ValueProposition />
      <Footer />
    </div>
  );
};

export default HomePage;