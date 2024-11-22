import React from 'react';
import { ShoppingCart, Leaf } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-green-50 py-16 px-4">
      <div className="max-w-6xl mx-auto flex items-center">
        <div className="w-1/2 pr-8">
          <h1 className="text-4xl font-bold mb-4">Personalized Gifts, Crafted with Love</h1>
          <p className="text-xl mb-6">Unique, handcrafted gifts that tell your story</p>
          <div className="flex space-x-4">
            <button className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition flex items-center">
              <ShoppingCart className="mr-2" /> Shop Now
            </button>
            <button className="border border-green-600 text-green-600 px-6 py-3 rounded-full hover:bg-green-50 transition flex items-center">
              <Leaf className="mr-2" /> Explore Eco-Friendly Options
            </button>
          </div>
        </div>
        <div className="w-1/2">
          <img 
            src="https://img.freepik.com/free-photo/wrapped-gift-tied-with-tag-string-beautiful-flower-wooden-surface_23-2148102874.jpg?t=st=1732288550~exp=1732292150~hmac=9ee6d8a62a726dbd256c5758e85bb638446df7df7be2f9d3a40d42405ad3b10c&w=996" 
            alt="Handcrafted Gifts" 
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;