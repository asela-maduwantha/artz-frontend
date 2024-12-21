import React from "react";
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";

interface Feature {
    id: number;
    tag: string;
    description: string;
    icon: string;
}

interface CustomizationOption {
    id: number;
    name: string;
    type: string;
    available_values: string[];
    min_value: number;
    max_value: number;
    additional_price: number;
    is_required: boolean;
}

interface Product {
    id: number;
    name: string;
    img_url: string;
    description: string;
    price: number;
    category: string;
    subCategory?: string;
    is_customizable: boolean;
    features?: Feature[];
    customization_options?: CustomizationOption[];
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

    const [customizations, setCustomizations] = React.useState<Record<number, string>>({});
    const [totalPrice, setTotalPrice] = React.useState(product.price);

    const calculateTotalPrice = (newCustomizations: Record<number, string>) => {
        let newTotal = product.price;
        product.customization_options?.forEach((option) => {
            if (newCustomizations[option.id]) {
                newTotal += option.additional_price;
            }
        });
        setTotalPrice(newTotal);
    };

    const handleCustomizationChange = (optionId: number, value: string) => {
        const newCustomizations = {
            ...customizations,
            [optionId]: value,
        };
        setCustomizations(newCustomizations);
        calculateTotalPrice(newCustomizations);
    };

    const handleAddToCart = () => {
        const requiredOptions = product.customization_options?.filter(
            (option) => option.is_required
        );
        const missingRequired = requiredOptions?.some(
            (option) => !customizations[option.id]
        );

        if (missingRequired) {
            alert("Please fill in all required customization options");
            return;
        }

        // Here you would typically dispatch to your cart state management
        console.log("Adding to cart:", {
            product,
            customizations,
            totalPrice,
        });
    };

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
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50"
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    />

                    <motion.div
                        className="relative bg-white rounded-lg w-11/12 sm:w-3/4 lg:w-3/4 h-[80vh] mx-auto my-10 shadow-lg overflow-auto"
                        variants={dialogVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-2 right-4 text-gray-500 hover:text-gray-800 transform transition-transform duration-300 hover:rotate-90"
                        >
                            ✕
                        </button>

                        <div className="p-6 flex flex-col sm:flex-row gap-6 w-full h-full">
                            <motion.div
                                className="flex flex-col items-center sm:items-start sm:w-1/2"
                                variants={childVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 0.1, duration: 0.3 }}
                            >
                                <h2 className="text-2xl font-bold mb-4 text-green-700">
                                    {product.name}
                                </h2>
                                <img
                                    src={product.img_url}
                                    alt={product.name}
                                    className="w-full max-w-sm rounded-lg mb-4"
                                />
                                {product.features && (
                                    <div className="w-full mt-4">
                                        <h3 className="text-xl font-semibold mb-2">Features</h3>
                                        <div className="grid grid-cols-1 gap-2">
                                            {product.features.map((feature) => (
                                                <div
                                                    key={feature.id}
                                                    className="flex items-center gap-2 bg-gray-50 p-2 rounded"
                                                >
                                                    <span>{feature.icon}</span>
                                                    <span className="font-medium">{feature.tag}:</span>
                                                    <span>{feature.description}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>

                            <motion.div
                                className="sm:w-1/2 flex flex-col gap-4"
                                variants={childVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 0.2, duration: 0.3 }}
                            >
                                <div className="flex justify-between items-center">
                                    <p className="text-2xl font-semibold text-green-600">
                                        LKR {totalPrice.toFixed(2)}
                                    </p>
                                    <div className="flex gap-2">
                                        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                                            {product.category}
                                        </span>
                                        
                                    </div>
                                </div>

                                <p className="text-gray-600">{product.description}</p>

                                {product.is_customizable && product.customization_options && (
                                    <div className="mt-4">
                                        <h3 className="text-xl font-semibold mb-2">Customization Options</h3>
                                        <div className="space-y-4">
                                            {product.customization_options.map((option) => (
                                                <div key={option.id} className="flex flex-col gap-1">
                                                    <label className="font-medium">
                                                        {option.name}
                                                        {option.is_required && (
                                                            <span className="text-red-500 ml-1">*</span>
                                                        )}
                                                        {option.additional_price > 0 && (
                                                            <span className="text-sm text-gray-500 ml-2">
                                                                (+LKR{option.additional_price})
                                                            </span>
                                                        )}
                                                    </label>
                                                    {option.type === "dropdown" ? (
                                                        <select
                                                            className="border rounded-lg p-2"
                                                            value={customizations[option.id] || ""}
                                                            onChange={(e) =>
                                                                handleCustomizationChange(option.id, e.target.value)
                                                            }
                                                        >
                                                            <option value="">Select {option.name}</option>
                                                            {option.available_values.map((value) => (
                                                                <option key={value} value={value}>
                                                                    {value}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    ) : (
                                                        <input
                                                            type="text"
                                                            className="border rounded-lg p-2"
                                                            placeholder={`Enter ${option.name}`}
                                                            maxLength={option.max_value}
                                                            value={customizations[option.id] || ""}
                                                            onChange={(e) =>
                                                                handleCustomizationChange(option.id, e.target.value)
                                                            }
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="mt-auto pt-4 flex gap-4">
                                    <motion.button
                                        onClick={handleAddToCart}
                                        className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                       <ShoppingCart/> Add to Cart (LKR {totalPrice.toFixed(2)})
                                    </motion.button>
                               
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </Dialog>
            )}
        </AnimatePresence>
    );
};

export default ProductDetailsDialog;