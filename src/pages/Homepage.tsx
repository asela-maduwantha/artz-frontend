import React from 'react';
import Header from '../components/layout/Header';
import HeroSection from '../components/layout/HeroSection';
import FeaturedProducts from '../components/layout/FeaturedProducts';
import ValueProposition from '../components/layout/ValuePosition';
import Footer from '../components/layout/Footer';
import DiscountCard from '../components/layout/Discount';

const HomePage: React.FC = () => {
  return (
    <div className="font-poppins text-gray-800">
      <Header />
      <div className="pt-20"> {/* Added padding top to account for fixed header */}
        <HeroSection />
        <FeaturedProducts />
        <DiscountCard/>
        <ValueProposition />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;