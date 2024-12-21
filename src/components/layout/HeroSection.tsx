import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ShoppingCart, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';

// Type Definitions
type Feature = {
  id: number;
  tag: string;
  description: string;
  icon: string;
};

type CustomizationOption = {
  id: number;
  name: string;
  type: string;
  available_values: string[];
  min_value: number;
  max_value: number;
  additional_price: number;
  is_required: boolean;
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
  features: Feature[];
  customization_options: CustomizationOption[];
};

const HeroSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://usha-arts-fmhwhcc4hka4h3ce.eastasia-01.azurewebsites.net/products'); // Replace with your API endpoint
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  if (loading || products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const currentProduct = products[currentSlide];
  const bgColorClass = currentProduct.category === 'Home Decor' 
    ? 'from-amber-50 to-green-50'
    : 'from-blue-50 to-purple-50';

  return (
    <div className="relative">
      {/* Hero Slider */}
      <div className={`bg-gradient-to-r ${bgColorClass} py-16 px-4 transition-all duration-500`}>
        <div className="max-w-6xl mx-auto flex items-center relative">
          {/* Text Content */}
          <div className="w-1/2 pr-8 z-10">
            <motion.h1 
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-4"
            >
              {currentProduct.name}
            </motion.h1>
            <motion.p
              key={`desc-${currentSlide}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="text-xl mb-6"
            >
              {currentProduct.description}
            </motion.p>
            
            <motion.div 
              key={`price-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-2xl font-bold mb-6"
            >
              ${currentProduct.price}
            </motion.div>
            
            <div className="flex space-x-4">
              <button className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition flex items-center">
                <ShoppingCart className="mr-2" /> Add to Cart
              </button>
              {currentProduct.is_customizable && (
                <button className="border border-green-600 text-green-600 px-6 py-3 rounded-full hover:bg-green-50 transition flex items-center">
                  <Settings className="mr-2" /> Customize
                </button>
              )}
            </div>
          </div>

          {/* Image Section */}
          <div className="w-1/2 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={`img-${currentSlide}`}
                src={currentProduct.img_url}
                alt={currentProduct.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="rounded-lg shadow-lg w-full h-96 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/api/placeholder/600/400";
                }}
              />
            </AnimatePresence>
          </div>

          {/* Slider Navigation */}
          {products.length > 1 && (
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex justify-between w-full">
              <button 
                onClick={prevSlide}
                className="bg-white/50 hover:bg-white/75 rounded-full p-2 transition"
              >
                <ChevronLeft />
              </button>
              <button 
                onClick={nextSlide}
                className="bg-white/50 hover:bg-white/75 rounded-full p-2 transition"
              >
                <ChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Product Details Section */}
      <ProductDetailSection currentProduct={currentProduct} />
    </div>
  );
};

type ProductDetailSectionProps = {
  currentProduct: Product;
};

const ProductDetailSection: React.FC<ProductDetailSectionProps> = ({ currentProduct }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const leftFeatureX = useTransform(scrollYProgress, [0.2, 0.5], [-100, 0]);
  const rightFeatureX = useTransform(scrollYProgress, [0.2, 0.5], [100, 0]);
  const featureOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  // Split features into two groups for left and right sides
  const midPoint = Math.ceil(currentProduct.features.length / 2);
  const leftFeatures = currentProduct.features.slice(0, midPoint);
  const rightFeatures = currentProduct.features.slice(midPoint);

  return (
    <div 
      ref={ref} 
      className="min-h-screen flex items-center justify-center bg-gray-50 py-16 px-4"
    >
      <div className="max-w-6xl mx-auto flex items-center space-x-8">
        {/* Left Features */}
        <motion.div 
          style={{
            x: leftFeatureX,
            opacity: featureOpacity
          }}
          className="w-1/3 space-y-6"
        >
          {leftFeatures.map((feature: Feature) => (
            <div 
              key={feature.id} 
              className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4"
            >
              <div className="flex-shrink-0 text-2xl">{feature.icon}</div>
              <div>
                <h3 className="text-xl font-semibold">{feature.tag}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Central Image */}
        <motion.div 
          style={{
            scale: useTransform(scrollYProgress, [0.2, 0.5], [0.8, 1]),
            opacity: useTransform(scrollYProgress, [0.2, 0.5], [0.5, 1])
          }}
          className="w-1/3 flex justify-center"
        >
          <img 
            src={currentProduct.img_url}
            alt={currentProduct.name}
            className="rounded-xl shadow-2xl object-cover w-full aspect-square"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/api/placeholder/600/400";
            }}
          />
        </motion.div>

        {/* Right Features */}
        <motion.div 
          style={{
            x: rightFeatureX,
            opacity: featureOpacity
          }}
          className="w-1/3 space-y-6"
        >
          {rightFeatures.map((feature: Feature) => (
            <div 
              key={feature.id} 
              className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4"
            >
              <div className="flex-shrink-0 text-2xl">{feature.icon}</div>
              <div>
                <h3 className="text-xl font-semibold">{feature.tag}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;