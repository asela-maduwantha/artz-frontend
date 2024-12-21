import React from 'react';
import { Leaf, Heart, ShoppingCart } from 'lucide-react';



const ValueProposition: React.FC = () => {
  const features = [
    {
      icon: <Leaf size={48} className="text-green-600" />,
      title: "Eco-Friendly",
      description: "Sustainable materials and environmentally conscious production"
    },
    {
      icon: <Heart size={48} className="text-red-600" />,
      title: "Personalized",
      description: "Unique gifts tailored to your specific preferences"
    },
    {
      icon: <ShoppingCart size={48} className="text-blue-600" />,
      title: "Island-wide Delivery",
      description: "Convenient shipping across Sri Lanka"
    }
  ];

  return (
    <div className="bg-green-50 py-12 px-4 sm:py-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8">Why Choose Artz by Usha?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105">
              <div className="flex flex-col items-center">
                <div className="mx-auto mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ValueProposition;