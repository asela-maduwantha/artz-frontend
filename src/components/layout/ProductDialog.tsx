import React from "react";
import { Dialog } from "@headlessui/react";

interface Product {
  id: number;
  name: string;
  image_path: string;
  description: string;
  price: string;
  category: string;
  subCategory: string;
  is_customizable: boolean;
}

interface ProductDetailsDialogProps {
  isOpen: boolean;
  product: Product | null; // Product can be null initially
  onClose: () => void;
}

const ProductDetailsDialog: React.FC<ProductDetailsDialogProps> = ({
  isOpen,
  product,
  onClose,
}) => {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50" />

      {/* Dialog Panel */}
      <div className="relative bg-white rounded-lg w-11/12 sm:w-3/4 lg:w-1/2 mx-auto my-10 shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        {/* Product Details */}
        <div className="p-6 flex flex-col sm:flex-row gap-6">
          {/* Left Section */}
          <div className="flex flex-col items-center sm:items-start sm:w-1/2">
            <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
            <img
              src={product.image_path}
              alt={product.name}
              className="w-full max-w-sm rounded-lg"
            />
          </div>

          {/* Right Section */}
          <div className="sm:w-1/2 flex flex-col gap-4">
            <p className="text-lg font-semibold">{product.price}</p>
            <p className="text-gray-600">{product.description}</p>
            <div className="flex gap-2 mt-2">
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                {product.category}
              </span>
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full">
                {product.subCategory}
              </span>
            </div>

            {product.is_customizable && (
              <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                Customize Product
              </button>
            )}

            <button className="mt-auto bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductDetailsDialog;
