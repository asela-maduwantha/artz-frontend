import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
    {
        name: "Jewelry",
        image:
            "https://img.freepik.com/free-photo/top-view-essentials-bead-working-with-scissors_23-2148815798.jpg",
        subcategories: ["Necklaces", "Bracelets", "Earrings", "Rings"],
    },
    {
        name: "Gift Items",
        image:
            "https://img.freepik.com/free-photo/wrapped-gift-tied-with-tag-string-beautiful-flower-wooden-surface_23-2148102874.jpg",
        subcategories: ["Reusable Bags", "Upcycled Decor", "Gift Hamper"],
    },
    {
        name: "Keepsakes",
        image:
            "https://img.freepik.com/free-photo/stationery-wedding-invitation-concept-flat-lay_23-2148188019.jpg",
        subcategories: [
            "Personalized Photo Frames",
            "Customized Keychains",
            "Engraved Wooden Plaques",
            "Memory Books",
        ],
    },
];

interface ProductCategoriesProps {
    onCategoryChange: (category: string) => void;
}

const ProductCategories: React.FC<ProductCategoriesProps> = ({
    onCategoryChange,
}) => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);

    const handleCategoryClick = (categoryName: string | null) => {
        const selectedCategory = categoryName || "All";
        setActiveCategory(categoryName);
        onCategoryChange(selectedCategory);
        setActiveSubcategory(null); // Reset subcategory when changing category
    };

    const handleSubcategoryClick = (subcategory: string) => {
        setActiveSubcategory(subcategory);
        onCategoryChange(subcategory); 
    };

    return (
        <div className="max-w-7xl mx-auto p-4">
            {/* Categories */}
            <motion.div
                className="flex flex-wrap justify-center gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.2,
                        },
                    },
                }}
            >

                {categories.map((category) => (
                    <motion.div
                        key={category.name}
                        className={`relative w-64 h-40 rounded-lg overflow-hidden cursor-pointer ${activeCategory === category.name ? "shadow-md shadow-green-300 border-2 border-green-400" : ""
                            }`}


                        onClick={() =>
                            handleCategoryClick(
                                activeCategory === category.name ? null : category.name
                            )
                        }
                        whileHover={{
                            scale: 1.03,
                        }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover"
                        />
                        <motion.div
                            className={`absolute bottom-0 w-full h-16 flex justify-start items-end py-2 bg-gradient-to-t from-black via-transparent to-transparent`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="text-white font-bold px-2">{category.name}</div>
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Subcategories */}
            <AnimatePresence mode="wait">
                {activeCategory && (
                    <motion.div
                        key={activeCategory} // Unique key ensures re-animation
                        className="mt-10 flex flex-wrap justify-center gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                    >
                        {categories
                            .find((category) => category.name === activeCategory)
                            ?.subcategories.map((subcategory) => (
                                <motion.button
                                    key={subcategory}
                                    className={`px-4 py-2 rounded-lg text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 ${activeSubcategory === subcategory
                                            ? "bg-green-700 shadow-md shadow-green-300"
                                            : "bg-green-500"
                                        }`}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleSubcategoryClick(subcategory)}
                                >
                                    {subcategory}
                                </motion.button>
                            ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProductCategories;
