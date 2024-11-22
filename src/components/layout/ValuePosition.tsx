import React from 'react';
import { Leaf, Heart, ShoppingCart } from 'lucide-react';

const ValueProposition: React.FC = () => {
  return (
    <div className="bg-gray-100 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Why Choose Artz by Usha?</h2>
        <div className="grid grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Leaf className="mx-auto mb-4 text-green-600" size={48} />
            <h3 className="text-xl font-semibold mb-4">Eco-Friendly</h3>
            <p>Sustainable materials and environmentally conscious production</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Heart className="mx-auto mb-4 text-red-600" size={48} />
            <h3 className="text-xl font-semibold mb-4">Personalized</h3>
            <p>Unique gifts tailored to your specific preferences</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ShoppingCart className="mx-auto mb-4 text-blue-600" size={48} />
            <h3 className="text-xl font-semibold mb-4">Island-wide Delivery</h3>
            <p>Convenient shipping across Sri Lanka</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueProposition;
