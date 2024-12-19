import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ShoppingCart, Leaf, Tag, Shield, ChevronLeft, ChevronRight, Sparkles, TreeDeciduousIcon, Coffee, Zap, BookOpen, Droplet, Feather, Paintbrush, PenTool, Scissors, ShieldCheck, Smile } from 'lucide-react';

// Type Definitions
type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  bgColor: string;
  price: string;
  features: Feature[];
};

// Dummy product data
const products: Product[] = [
  {
    id: 1,
    name: "Eco-Friendly Wood Craft Box",
    description: "Sustainable handmade wooden gift box",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWlwmb0M-smdzt3hBlygIIJoIUldb6AmbfxQ&s",
    bgColor: "from-amber-50 to-green-50",
    price: "$49.99",
    features: [
      {
        icon: <Leaf className="text-green-600" />,
        title: "Eco-Friendly",
        description: "Made from 100% sustainable bamboo wood"
      },
      {
        icon: <Tag className="text-blue-600" />,
        title: "Affordable Luxury",
        description: "Premium quality at an accessible price point"
      },
      {
        icon: <Shield className="text-purple-600" />,
        title: "Durable Design",
        description: "Crafted to last with high-quality materials"
      }
    ]
  },
  {
    id: 2,
    name: "Handwoven Boho Wall Hanging",
    description: "Intricate macrame wall decor for cozy spaces",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9-ah7tXzv14kDm_pkiIrxVfKSMAbgQHFgUQ&s",
    bgColor: "from-pink-50 to-yellow-50",
    price: "$35.99",
    features: [
      {
        icon: <Feather className="text-pink-600" />,
        title: "Lightweight",
        description: "Adds charm without weighing down your walls"
      },
      {
        icon: <Scissors className="text-yellow-600" />,
        title: "Handcrafted",
        description: "Lovingly woven by skilled artisans"
      },
      {
        icon: <Smile className="text-orange-600" />,
        title: "Warm Ambiance",
        description: "Creates a welcoming and cozy environment"
      }
    ]
  },
  {
    id: 3,
    name: "Ceramic Artisan Vase",
    description: "Handcrafted ceramic vase with a modern design",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSrt7Gaqej0wZGM8juuBe124M4kE4Fhk3W2w&s",
    bgColor: "from-blue-50 to-gray-50",
    price: "$79.99",
    features: [
      {
        icon: <Droplet className="text-blue-600" />,
        title: "Waterproof",
        description: "Perfect for fresh or dried floral arrangements"
      },
      {
        icon: <Paintbrush className="text-red-600" />,
        title: "Unique Finish",
        description: "Each vase features a one-of-a-kind hand-painted pattern"
      },
      {
        icon: <ShieldCheck className="text-green-600" />,
        title: "Durable",
        description: "Fired at high temperatures for long-lasting quality"
      }
    ]
  },
  {
    id: 4,
    name: "Hand-Stitched Leather Notebook",
    description: "Premium leather-bound notebook for journaling",
    image: "/api/placeholder/600/400",
    bgColor: "from-brown-50 to-yellow-50",
    price: "$59.99",
    features: [
      {
        icon: <PenTool className="text-yellow-600" />,
        title: "Elegant Design",
        description: "Classic leather cover with fine stitching"
      },
      {
        icon: <BookOpen className="text-brown-600" />,
        title: "Refillable Pages",
        description: "Eco-friendly with replaceable paper inserts"
      },
      {
        icon: <Zap className="text-red-600" />,
        title: "Perfect Gift",
        description: "Ideal for writers, artists, and thinkers"
      }
    ]
  },
  {
    id: 5,
    name: "Hand-Carved Wooden Coasters",
    description: "Set of 4 handcrafted wooden coasters with intricate designs",
    image: "/api/placeholder/600/400",
    bgColor: "from-amber-50 to-teal-50",
    price: "$29.99",
    features: [
      {
        icon: <Coffee className="text-brown-600" />,
        title: "Functional Beauty",
        description: "Protects surfaces while adding style"
      },
      {
        icon: <TreeDeciduousIcon className="text-green-600" />,
        title: "Sustainable Materials",
        description: "Made from responsibly sourced wood"
      },
      {
        icon: <Sparkles className="text-teal-600" />,
        title: "Artisan Quality",
        description: "Meticulously hand-carved for a premium look"
      }
    ]
  }
];


const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <div className="relative">
      {/* Hero Slider */}
      <div 
        className={`bg-gradient-to-r ${products[currentSlide].bgColor} py-16 px-4 transition-all duration-500`}
      >
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
              {products[currentSlide].name}
            </motion.h1>
            <motion.p
              key={`desc-${currentSlide}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="text-xl mb-6"
            >
              {products[currentSlide].description}
            </motion.p>
            
            <div className="flex space-x-4">
              <button className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition flex items-center">
                <ShoppingCart className="mr-2" /> Shop Now
              </button>
              <button className="border border-green-600 text-green-600 px-6 py-3 rounded-full hover:bg-green-50 transition flex items-center">
                <Leaf className="mr-2" /> Explore Options
              </button>
            </div>

            {/* Slider Navigation */}
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
          </div>

          {/* Image Section with Animations */}
          <div className="w-1/2 overflow-hidden">
            <AnimatePresence>
              <motion.img
                key={`img-${currentSlide}`}
                src={products[currentSlide].image}
                alt={products[currentSlide].name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="rounded-lg shadow-lg w-full object-cover"
              />
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <ProductDetailSection currentProduct={products[currentSlide]} />
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

  // Animations for feature entries
  const leftFeatureX = useTransform(scrollYProgress, [0.2, 0.5], [-100, 0]);
  const rightFeatureX = useTransform(scrollYProgress, [0.2, 0.5], [100, 0]);
  const featureOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

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
          {currentProduct.features.slice(0, 2).map((feature: Feature, index: number) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4"
            >
              <div className="flex-shrink-0">{feature.icon}</div>
              <div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
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
            src={currentProduct.image} 
            alt={currentProduct.name}
            className="rounded-xl shadow-2xl object-cover w-full aspect-square"
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
          {currentProduct.features.slice(2).map((feature: Feature, index: number) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4"
            >
              <div className="flex-shrink-0">{feature.icon}</div>
              <div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
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