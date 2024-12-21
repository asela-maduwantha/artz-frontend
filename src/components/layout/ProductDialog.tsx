import React from "react";
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import CartButton from "../../components/common/CartButton";

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
    product: Product | null; 
    onClose: () => void;
}

const ProductDetailsDialog: React.FC<ProductDetailsDialogProps> = ({
    isOpen,
    product,
    onClose,
}) => {
    if (!product) return null;

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const dialogVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 },
    };

    const childVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50"
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    />

                    {/* Dialog Panel */}
                    <motion.div
                        className="relative bg-white rounded-lg w-11/12 sm:w-3/4 lg:w-3/4 h-[80vh] mx-auto my-10 shadow-lg overflow-auto"
                        variants={dialogVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-2 text-lg right-4 text-gray-500 hover:text-gray-800 transform transition-transform duration-300 hover:rotate-90"
                        >
                            ✕
                        </button>

                        {/* Product Details */}
                        <div className="p-6 flex flex-col sm:flex-row gap-6 w-full h-full">
                            {/* Left Section */}
                            <motion.div
                                className="flex flex-col items-center sm:items-start"
                                variants={childVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 0.1, duration: 0.3 }}
                            >
                                <h2 className="text-2xl font-bold mb-4 h-[10%] text-green-700">
                                    {product.name}
                                </h2>
                                <img
                                    src={product.image_path}
                                    alt={product.name}
                                    className="w-full max-w-sm h-[90%] rounded-lg"
                                />
                            </motion.div>

                            {/* Right Section */}
                            <motion.div
                                className="sm:w-1/2 flex flex-col gap-4"
                                variants={childVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 0.2, duration: 0.3 }}
                            >
                                <p className="text-lg font-semibold text-green-600">{product.price}</p>
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
                                    <motion.button
                                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 hover:scale-[1.01] w-1/2 duration-300 ease-in-out"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        Customize Product
                                    </motion.button>
                                )}
                                <CartButton />
                            </motion.div>
                        </div>
                    </motion.div>
                </Dialog>
            )}
        </AnimatePresence>
    );
};

export default ProductDetailsDialog;
