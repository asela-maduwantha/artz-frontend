import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ShoppingCart, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'react-toastify';
import { productService } from '../../services/api/productservice';

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


// Customization Panel Component
const CustomizationPanel: React.FC<{
  options: CustomizationOption[];
  onClose: () => void;
}> = ({ options, onClose }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    className="absolute top-0 right-0 bg-white rounded-lg shadow-xl p-6 w-96 z-20"
  >
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-bold">Customize Your Product</h3>
      <button 
        onClick={onClose} 
        className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
      >
        ×
      </button>
    </div>
    <div className="space-y-4">
      {options.map((option) => (
        <div key={option.id} className="space-y-2">
          <label className="block font-medium">
            {option.name}
            {option.is_required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {option.type === 'text' ? (
            <input
              type="text"
              maxLength={option.max_value}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
              placeholder={`Enter ${option.name.toLowerCase()}`}
            />
          ) : (
            <select className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500">
              <option value="">Select {option.name}</option>
              {option.available_values.map((value, index) => (
                <option key={index} value={value}>{value}</option>
              ))}
            </select>
          )}
          {option.additional_price > 0 && (
            <p className="text-sm text-gray-600">+${option.additional_price.toFixed(2)}</p>
          )}
        </div>
      ))}
    </div>
    <button className="w-full mt-6 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition">
      Apply Customization
    </button>
  </motion.div>
);

// Product Detail Section Component
const ProductDetailSection: React.FC<{
  currentProduct: Product;
}> = ({ currentProduct }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const leftFeatureX = useTransform(scrollYProgress, [0.2, 0.5], [-100, 0]);
  const rightFeatureX = useTransform(scrollYProgress, [0.2, 0.5], [100, 0]);
  const featureOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  const midPoint = Math.ceil(currentProduct.features.length / 2);
  const leftFeatures = currentProduct.features.slice(0, midPoint);
  const rightFeatures = currentProduct.features.slice(midPoint);

  return (
    <> <div className='text-4xl font-bold bg-gray-50 pt-16 mb-0 pb-10 text-center'  >{currentProduct.name}</div>
    <div 
      ref={ref} 
      className="h-3/4 flex items-center justify-center bg-gray-50  pb-10"
    >
      <div className="max-w-6xl mx-auto flex items-center space-x-8">
        <motion.div 
          style={{
            x: leftFeatureX,
            opacity: featureOpacity
          }}
          className="w-1/3 space-y-6"
        >
          {leftFeatures.map((feature) => (
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
            className="rounded-full shadow-2xl object-cover w-full aspect-square"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/api/placeholder/600/400";
            }}
          />
        </motion.div>

        <motion.div 
          style={{
            x: rightFeatureX,
            opacity: featureOpacity
          }}
          className="w-1/3 space-y-6"
        >
          {rightFeatures.map((feature) => (
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
    </div></>
    
  );
};

// Main Hero Section Component
const HeroSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [showCustomization, setShowCustomization] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getAllProducts();
        
        const activeProducts = data.filter((product: Product) => product.is_active);
        
        if (activeProducts.length === 0) {
          toast.warning('No active products available at the moment');
          
        } else {
          setProducts(activeProducts);
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  // Auto-slide functionality
  useEffect(() => {
    if (isHovered || showCustomization || products.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [products.length, isHovered, showCustomization]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  if (loading || products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const currentProduct = products[currentSlide];
  const bgColorClass ='from-amber-50 to-green-200'
  return (
    <div className="relative ">
      <div className={`bg-gradient-to-r ${bgColorClass} py-32 px-4 transition-all duration-500`}>
        <div className="max-w-6xl mx-auto flex items-center relative">
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
              LKR {currentProduct.price.toFixed(2)}
            </motion.div>
            
            <div className="flex space-x-4">
              <button className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition flex items-center">
                <ShoppingCart className="mr-2" /> Add to Cart
              </button>
              {currentProduct.is_customizable && (
                <button 
                  onClick={() => setShowCustomization(!showCustomization)}
                  className="border border-green-600 text-green-600 px-6 py-3 rounded-full hover:bg-green-50 transition flex items-center"
                >
                  <Settings className="mr-2" /> Customize
                </button>
              )}
            </div>
          </div>

          <div 
            className="w-1/2 overflow-hidden relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
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

            {products.length > 1 && (
              <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-4">
                <button 
                  onClick={prevSlide}
                  className="bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition backdrop-blur-sm"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextSlide}
                  className="bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition backdrop-blur-sm"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            )}
          </div>

          <AnimatePresence>
            {showCustomization && (
              <CustomizationPanel 
                options={currentProduct.customization_options}
                onClose={() => setShowCustomization(false)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      <ProductDetailSection currentProduct={currentProduct} />
    </div>
  );
};

export default HeroSection;


