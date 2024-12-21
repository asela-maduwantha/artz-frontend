import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Heart from "./Heart_wishlist";

// Define the type of the product prop expected in the Card component
interface Product {
  id: number;
  name: string;
  image_path: string;
  description: string;
  price: string;
}

interface CardProps {
  product: Product;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ product, onClick }) => {
  const controls = useAnimation(); // Framer Motion controls for animation
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 }); // Trigger animation when 20% of the card is visible

  // Trigger animation when the card is in view
  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  // Framer Motion animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref} // Attach the ref for inView tracking
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white rounded-lg shadow-md relative cursor-pointer w-full h-full"
      onClick={onClick}
      whileHover={{ scale: 1.005 }} // Subtle hover effect
    >
      {/* Image occupying 5/3 of the height */}
      <div className="h-5/3 w-full">
        <img
          src={product.image_path}
          alt={product.name}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>

      {/* Details occupying 5/2 of the height */}
      <div className="h-5/2 w-full flex flex-col justify-between p-2">
        <h2 className="text-lg font-bold">{product.name}</h2>
        <p className="text-sm text-gray-600 mt-2">{product.description}</p>
        <p className="text-xl font-semibold text-green-600 mt-2">LKR {product.price}</p>
      </div>

      {/* Heart icon for wishlist at bottom right */}
      <div className="absolute bottom-4 right-4">
        <Heart />
      </div>
    </motion.div>
  );
};

export default Card;