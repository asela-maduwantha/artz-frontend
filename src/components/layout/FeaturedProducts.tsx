import React from 'react';
import { Heart } from 'lucide-react';

const FeaturedProducts: React.FC = () => {
  const featuredProducts = [
    {
      name: 'Personalized Photo Frame',
      description: 'Custom pencil drawing framed in premium wood',
      price: 3500,
      image: 'https://img.freepik.com/free-vector/wedding-invitation-template_1340-147.jpg?t=st=1732288592~exp=1732292192~hmac=78f30e1165eef83904a12506a7423c04450aea305fda480ad6de74c2dcf30d8f&w=740'
    },
    {
      name: 'Eco-Friendly Gift Hamper',
      description: 'Handcrafted sustainable gift box',
      price: 4500,
      image: 'https://img.freepik.com/free-photo/flat-lay-composition-flowers-with-copyspace_23-2148134775.jpg?t=st=1732288638~exp=1732292238~hmac=d917c0d5fbb3cf45370e0a22d03ef84fb93bbb1734416087e8e11e2fee2f7e48&w=996'
    },
    {
      name: 'Handmade Earrings',
      description: 'Natural materials, unique design',
      price: 2500,
      image: 'https://img.freepik.com/free-photo/top-view-essentials-bead-working-with-scissors_23-2148815798.jpg?t=st=1732288675~exp=1732292275~hmac=a295542df9a8094e66b40f953b73b3d29df0f4ac03a311f85d657a4879136c95&w=996'
    }
  ];

  return (
    <div className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Featured Gifts</h2>
        <div className="grid grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-xl transition"
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">LKR {product.price}</span>
                <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition">
                  <Heart className="inline mr-2" size={20} /> Add to Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;