import { Minus, Plus, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartService } from '../services/api/cartservice';
import { paymentService } from '../services/api/paymentservice';

interface Product {
  id: number;
  name: string;
  description: string;
  img_url: string;
  price: number;
  category: string;
  is_customizable: boolean;
  is_active: boolean;
}

interface CartItemResponse {
  id: number;
  quantity: number;
  customization_data: Record<string, any>;
  product: Product;
}

interface CartResponse {
  id: number;
  items: CartItemResponse[];
}

interface PaymentIntentResponse {
  clientSecret: string;
  payment_intent_id: string;
}

const CartPage = () => {
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  const navigate = useNavigate();


  const userId: any = localStorage.getItem('userId');

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await cartService.getUserCart(userId);
      setCart(data);
      setError(null);
    } catch (err) {
      setError('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: number, change: number) => {
    if (!cart) return;
    
    const item = cart.items.find(i => i.id === itemId);
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + change);
    
    try {
      await cartService.updateCartItem(userId, itemId, {
        productId: item.product.id,
        quantity: newQuantity,
        customization_data: item.customization_data
      });
      await fetchCart();
    } catch (err) {
      setError('Failed to update quantity');
    }
  };

  const removeItem = async (itemId: number) => {
    try {
      await cartService.removeCartItem(userId, itemId);
      await fetchCart();
    } catch (err) {
      setError('Failed to remove item');
    }
  };

  const handleProceedToCheckout = async () => {
    if (!cart || processingPayment) return;

    try {
      setProcessingPayment(true);
      setError(null);

      const orderItems = cart.items.map(item => ({
        product_id: item.product.id,
        quantity: item.quantity,
        customizations: Object.values(item.customization_data || {}).map(customization => ({
          customization_option_id: customization.id,
          selected_value: customization.value
        }))
      }));


      
      const total = cart.items.reduce((sum, item) => 
        sum + (item.product.price * item.quantity), 0);
      const userId = parseInt(localStorage.getItem('userId') || '0');
      const paymentIntent = {
        amount: Math.round(total * 100), 
        user_id:userId,
        order_items: orderItems
      };

      const response: PaymentIntentResponse = await paymentService.createPaymentIntent(paymentIntent);
      
      // Navigate to checkout page with payment intent data
      navigate('/artbyusha/checkout', {
        state: {
          clientSecret: response.clientSecret,
          paymentIntentId: response.payment_intent_id,
          amount: total
        }
      });
    } catch (err) {
      setError('Failed to initialize checkout process');
    } finally {
      setProcessingPayment(false);
    }
  };

  const total = cart?.items.reduce((sum, item) => 
    sum + (item.product.price * item.quantity), 0) || 0;

  if (loading) {
    return <div className="max-w-4xl mx-auto p-8">Loading cart...</div>;
  }

  if (error) {
    return <div className="max-w-4xl mx-auto p-8 text-red-500">{error}</div>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="bg-white rounded-lg shadow">
        {cart.items.map(item => (
          <div key={item.id} className="flex flex-col md:flex-row md:items-center p-6 border-b border-gray-200">
            <img
              src={item.product.img_url}
              alt={item.product.name}
              className="w-24 h-24 object-cover rounded"
            />
            
            <div className="flex-grow ml-6">
              <h3 className="font-semibold text-lg">{item.product.name}</h3>
              <p className="text-green-500 font-medium">${item.product.price}</p>
              
              {item.customization_data && (
                <div className="mt-2 text-sm text-gray-600">
                  {Object.entries(item.customization_data).map(([key, value]) => (
                    <div key={key} className="flex gap-2">
                      <span className="font-medium">{key}:</span>
                      <span>{typeof value === 'object' ? value.value : value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 mt-4 md:mt-0">
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
          
          <button 
            className={`w-full bg-green-500 text-white py-3 rounded-lg transition-colors ${
              processingPayment 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-green-600'
            }`}
            onClick={handleProceedToCheckout}
            disabled={processingPayment}
          >
            {processingPayment ? 'Processing...' : 'Proceed to Checkout'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;