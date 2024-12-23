import React from 'react';
import Header from '../components/layout/Header';
import HeroSection from '../components/layout/HeroSection';
import FeaturedProducts from '../components/layout/FeaturedProducts';
import ValueProposition from '../components/layout/ValuePosition';
import Footer from '../components/layout/Footer';
import DiscountCard from '../components/layout/Discount';
import { SEO } from '../components/SEO';

const HomePage: React.FC = () => {
  return (
    <div className="font-poppins text-gray-800">
       <SEO 
        title="ArtZbyUsha | Handcrafted Art & Items"
        description="Discover unique handcrafted items and art pieces created with passion. Browse our collection of artisanal products at ArtZbyUsha."
        canonicalUrl="https://artzbyusha.netlify.app"
      />
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