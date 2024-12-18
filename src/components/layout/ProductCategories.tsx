import React, { useState } from "react";

const categories = [
  {
    name: "Jewelry",
    image: "https://img.freepik.com/free-photo/top-view-essentials-bead-working-with-scissors_23-2148815798.jpg",
    subcategories: ["Necklaces", "Bracelets", "Earrings", "Rings"],
  },
  {
    name: "Gift Items",
    image: "https://img.freepik.com/free-photo/wrapped-gift-tied-with-tag-string-beautiful-flower-wooden-surface_23-2148102874.jpg",
    subcategories: ["Reusable Bags", "Upcycled Decor", "Gift Hamper"],
  },
  {
    name: "Keepsakes",
    image: "https://img.freepik.com/free-photo/stationery-wedding-invitation-concept-flat-lay_23-2148188019.jpg",
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

  const handleCategoryClick = (categoryName: string | null) => {
    const selectedCategory = categoryName || "All";
    setActiveCategory(categoryName);
    onCategoryChange(selectedCategory);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Categories */}
      <div className="flex flex-col items-center">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className={`relative w-64 h-40 rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105 ${
                activeCategory === category.name
                  ? "border-4 border-green-600"
                  : ""
              }`}
              onClick={() =>
                handleCategoryClick(
                  activeCategory === category.name ? null : category.name
                )
              }
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-green-800 to-transparent flex justify-center items-center">
                <div className="text-white font-bold px-2 py-1">
                  {category.name}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Subcategories */}
        {activeCategory && (
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {categories
              .find((category) => category.name === activeCategory)
              ?.subcategories.map((subcategory) => (
                <button
                  key={subcategory}
                  className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition-transform transform hover:scale-105"
                  onClick={() => onCategoryChange(subcategory)}
                >
                  {subcategory}
                </button>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCategories;
