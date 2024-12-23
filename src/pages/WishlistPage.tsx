import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { wishlistService } from '../services/api/wishlistservice';
import { toast } from 'react-toastify';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  img_url?: string;
}

interface WishlistItem {
  product: Product;
}

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID not found');
      }
      const response = await wishlistService.getUserWishlist(parseInt(userId));
      setWishlistItems(response.items.map((item: WishlistItem) => item.product));
    } catch (err) {
      toast.error('Failed to load wishlist items');
      console.error('Error fetching wishlist:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeFromWishlist = async (productId: number) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID not found');
      }
      
      const wishlistItem = wishlistItems.find(item => item.id === productId);
      if (!wishlistItem) return;

      await wishlistService.removeWishlistItem(parseInt(userId), productId);
      setWishlistItems(items => items.filter(item => item.id !== productId));
      
      toast.success('Item removed from wishlist');
    } catch (err) {
      toast.error('Failed to remove item from wishlist');
      console.error('Error removing item from wishlist:', err);
    }
  };

  const clearWishlist = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID not found');
      }
      
      await wishlistService.clearWishlist(parseInt(userId));
      setWishlistItems([]);
      
      toast.success('Wishlist cleared successfully');
    } catch (err) {
      toast.error('Failed to clear wishlist');
      console.error('Error clearing wishlist:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-green-500" />
          <h1 className="text-2xl font-bold">My Wishlist</h1>
        </div>
        {wishlistItems.length > 0 && (
          <button
            onClick={clearWishlist}
            className="text-red-500 hover:text-red-600 text-sm"
          >
            Clear Wishlist
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <img
              src={item.img_url || '/api/placeholder/200/200'}
              alt={item.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{item.category}</p>
              <p className="text-green-500 font-medium mb-4">LKR {item.price}</p>
              
              <div className="flex gap-2">
                <button className="flex-1 bg-green-600 text-white py-2 rounded flex items-center justify-center gap-2 hover:bg-green-600 transition-colors">
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