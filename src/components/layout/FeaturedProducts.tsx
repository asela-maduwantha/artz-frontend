import React, { useState, useEffect } from 'react';
import { Heart } from "lucide-react";
import { productService } from '../../services/api/productservice';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  img_url: string;
}

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts();
        setProducts(data.slice(0, 3)); 
        setLoading(false);
      } catch (err) {
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="py-12 px-4 sm:py-16 bg-green-100">
        <div className="max-w-6xl mx-auto text-center">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 px-4 sm:py-16 bg-green-100">
        <div className="max-w-6xl mx-auto text-center text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:py-16 bg-green-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Our Featured Gifts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg p-4 sm:p-6 shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <img
                  src={product.img_url}
                  alt={product.name}
                  className="w-full h-48 sm:h-64 object-cover rounded-md"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <span className="text-lg font-bold">LKR {product.price.toLocaleString()}</span>
                <button className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition flex items-center justify-center">
                  <Heart className="inline mr-2" size={20} />
                  <span>Add to Wishlist</span>
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