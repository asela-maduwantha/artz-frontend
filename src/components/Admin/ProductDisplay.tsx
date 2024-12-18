import React, { useState, useEffect } from 'react';
import { Check, Award, Leaf } from 'lucide-react';

// Define types based on backend structure
type ProductFeature = {
  id: number;
  tag: string;
  description: string;
  icon: string;
};

type Product = {
  id: number;
  name: string;
  description: string;
  img_url: string;
  price: number;
  category: string;
  is_customizable: boolean;
  is_active: boolean;
  features: ProductFeature[];
};

// Icon mapping for feature icons
const FeatureIcons: { [key: string]: React.ElementType } = {
  'craft-icon': Award,
  'sustainability-icon': Leaf,
  'design-icon': Check
};

const ProductDisplay: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulated fetch - replace with actual API call
  useEffect(() => {
    // For now, use the provided sample data multiple times to show 6 boxes
    const sampleProducts = [
      {
        "id": 1,
        "name": "Handcrafted Wooden Jewelry Box",
        "description": "A beautifully designed wooden jewelry box, handcrafted with intricate carvings.",
        "img_url": "https://sp.apolloboxassets.com/vendor/product/productImages/2023-01-14/3W93TArray_16.jpg",
        "price": 49,
        "category": "Handicrafts",
        "is_customizable": true,
        "is_active": true,
        "features": [
          {
            "id": 1,
            "tag": "Artisan Craft",
            "description": "Handcrafted by skilled artisans with attention to detail.",
            "icon": "craft-icon"
          }
        ]
      }
    ];

    // Duplicate the sample product to create 6 products
    const fullProductList = Array(6).fill(null).map((_, index) => ({
      ...sampleProducts[0],
      id: index + 1,
      name: `Handcrafted Wooden Jewelry Box ${index + 1}`,
    }));

    setProducts(fullProductList);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 py-4">
      <h2 className="text-xl font-bold mb-4 text-center">Our Products</h2>
      
      <div className="grid grid-cols-3 gap-2">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="border rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
          >
            {/* Product Image */}
            <div className="relative h-32 overflow-hidden">
              <img 
                src={product.img_url} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              {product.is_customizable && (
                <div 
                  className="absolute top-1 right-1 bg-green-500 text-white px-1 py-0.5 rounded-full text-[8px]"
                  title="Customizable Product"
                >
                  Custom
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-2 flex-grow flex flex-col">
              <h3 className="text-xs font-semibold mb-1 line-clamp-1">{product.name}</h3>
              <p className="text-[10px] text-gray-600 mb-1 line-clamp-2">{product.description}</p>
              
              {/* Product Features */}
              <div className="mb-1 flex space-x-1 overflow-hidden">
                {product.features.map((feature) => {
                  const FeatureIcon = FeatureIcons[feature.icon] || Check;
                  return (
                    <div 
                      key={feature.id} 
                      className="flex items-center space-x-1 bg-gray-100 px-1 py-0.5 rounded-full text-[8px]"
                      title={feature.description}
                    >
                      <FeatureIcon size={8} className="mr-0.5" />
                      {feature.tag}
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between items-center mt-auto">
                <span className="text-sm font-bold text-green-600">${product.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDisplay;