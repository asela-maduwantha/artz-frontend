import React from "react";
import { AiOutlineHeart } from "react-icons/ai"; // Importing a heart icon from react-icons

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
  return (
    <div className="bg-white p-4 rounded-lg shadow-md relative" onClick={onClick}>
      {/* Image with fixed size */}
      <img
        src={product.image_path}
        alt={product.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      
      <div className="p-2">
        {/* Name on left under image */}
        <h2 className="text-lg font-bold">{product.name}</h2>

        {/* Description left */}
        <p className="text-sm text-gray-600 mt-2">{product.description}</p>

        {/* Price left */}
        <p className="text-xl font-semibold text-green-600 mt-2">{product.price}</p>
      </div>

      {/* Heart icon for wishlist at bottom right */}
      <div className="absolute bottom-4 right-4">
        <AiOutlineHeart className="text-2xl cursor-pointer hover:text-red-500" />
      </div>
    </div>
  );
};

export default Card;
