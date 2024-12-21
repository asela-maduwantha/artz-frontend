import React from "react";
import { FaShoppingCart } from "react-icons/fa";

const CartButton: React.FC = () => {
  return (
    <button
      className="mt-auto bg-green-500 text-white py-2 px-6 rounded-lg flex items-center justify-center overflow-hidden group transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:bg-green-700"
    >
      <div className="flex items-center transition-all duration-300">
        {/* Cart Icon */}
        <div className="group-hover:translate-x-3 transition-transform duration-300 mr-1">
          <FaShoppingCart />
        </div>
        {/* Button Text */}
        <span className="ml-3">Add to Cart</span>
      </div>
    </button>
  );
};

export default CartButton;