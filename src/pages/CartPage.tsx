import { Minus, Plus, X } from 'lucide-react';
import { useState } from 'react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Handmade Wall Decor',
      price: 149.99,
      quantity: 2,
      image: '/api/placeholder/100/100',
    },
    {
      id: 2,
      name: 'Decorative Vase',
      price: 89.99,
      quantity: 1,
      image: '/api/placeholder/100/100',
    },
    {
      id: 3,
      name: 'Crafted Jewelry Box',
      price: 199.99,
      quantity: 1,
      image: '/api/placeholder/100/100',
    },
  ]);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="bg-white rounded-lg shadow">
        {cartItems.map(item => (
          <div key={item.id} className="flex items-center p-6 border-b border-gray-200">
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded"
            />
            
            <div className="flex-grow ml-6">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-green-500 font-medium">${item.price}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="p-2 hover:bg-gray-100"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="p-2 hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        <div className="p-6">
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Total:</span>
            <span className="font-bold text-green-500">${total.toFixed(2)}</span>
          </div>
          
          <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;