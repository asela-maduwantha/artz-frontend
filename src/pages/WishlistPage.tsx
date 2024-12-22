import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useState } from 'react';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Handwoven Basket',
      price: 79.99,
      image: '/api/placeholder/200/200',
    },
    {
      id: 2,
      name: 'Ceramic Plant Pot',
      price: 45.99,
      image: '/api/placeholder/200/200',
    },
    {
      id: 3,
      name: 'Macrame Wall Hanging',
      price: 129.99,
      image: '/api/placeholder/200/200',
    },
    {
      id: 4,
      name: 'Decorative Cushion Cover',
      price: 34.99,
      image: '/api/placeholder/200/200',
    },
  ]);

  const removeFromWishlist = (id: number) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-2 mb-8">
        <Heart className="w-6 h-6 text-green-500" />
        <h1 className="text-2xl font-bold">My Wishlist</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
              <p className="text-green-500 font-medium mb-4">${item.price}</p>
              
              <div className="flex gap-2">
                <button className="flex-1 bg-green-500 text-white py-2 rounded flex items-center justify-center gap-2 hover:bg-green-600 transition-colors">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
                <button 
                  onClick={() => removeFromWishlist(item.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {wishlistItems.length === 0 && (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600">Your wishlist is empty</h2>
          <p className="text-gray-500 mt-2">Start adding items you love!</p>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;