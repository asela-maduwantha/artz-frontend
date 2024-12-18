import React, { useState } from "react";
import Header from "../components/layout/Header";
import ProductCategories from "../components/layout/ProductCategories";
import Card from "../components/common/Card";
import ProductDetailsDialog from "../components/layout/ProductDialog";


// Sample product data
const productData = [
  {
    id: 1,
    name: "Product 1",
    image_path:"https://img.freepik.com/free-photo/still-life-aesthetic-earrings_23-2149649128.jpg?t=st=1734506267~exp=1734509867~hmac=c9df8d10b085b88f3064eb321c163a6d551db334424432247f1633361223c1d7&w=826",
    description: "This is product 1 description",
    price: "$10",
    category: "Jewelry",
    subCategory: "Earrings",
    is_customizable: true,
    customization_option: {
      customization_id: 1,
      option_type: "Red",
      option_name: "Change Color",
      option_description: "Change your item color as you needed",
    },
    product_feature: {
      feature_id: 1,
      tag: "Eco-Friendly",
      icon_path: "https://img.icons8.com/?size=100&id=4vyrmSbTQDVW&format=png&color=000000",
      feature_description: "Eco-friendly materials, safe for the environment",
    },
  },
  {
    id: 2,
    name: "Product 2",
    image_path:"https://img.freepik.com/free-photo/still-life-aesthetic-earrings_23-2149649128.jpg?t=st=1734506267~exp=1734509867~hmac=c9df8d10b085b88f3064eb321c163a6d551db334424432247f1633361223c1d7&w=826",
    description: "This is product 2 description",
    price: "$15",
    category: "Jewelry",
    subCategory: "Necklaces",
    is_customizable: false,
    product_feature: {
      feature_id: 2,
      tag: "Handmade",
      icon_path: "https://img.icons8.com/?size=100&id=4vyrmSbTQDVW&format=png&color=000000",
      feature_description: "Handcrafted with love and attention to detail",
    },
  },
  {
    id: 3,
    name: "Product 3",
    image_path:"https://img.freepik.com/free-photo/still-life-aesthetic-earrings_23-2149649128.jpg?t=st=1734506267~exp=1734509867~hmac=c9df8d10b085b88f3064eb321c163a6d551db334424432247f1633361223c1d7&w=826",
    description: "This is product 3 description",
    price: "$20",
    category: "Jewelry",
    subCategory: "Rings",
    is_customizable: true,
    customization_option: {
      customization_id: 2,
      option_type: "Size",
      option_name: "Choose Ring Size",
      option_description: "Select your preferred ring size for a perfect fit",
    },
    product_feature: {
      feature_id: 3,
      tag: "Eco-Friendly",
      icon_path: "https://img.icons8.com/?size=100&id=4vyrmSbTQDVW&format=png&color=000000",
      feature_description: "Made with sustainable and eco-friendly materials",
    },
  },
  {
    id: 4,
    name: "Product 4",
    image_path:"https://img.freepik.com/free-photo/still-life-aesthetic-earrings_23-2149649128.jpg?t=st=1734506267~exp=1734509867~hmac=c9df8d10b085b88f3064eb321c163a6d551db334424432247f1633361223c1d7&w=826",
    description: "A beautiful handmade bracelet with vibrant colors",
    price: "$12",
    category: "Gift Items",
    subCategory: "Gift Hamper",
    is_customizable: true,
    customization_option: {
      customization_id: 3,
      option_type: "Engraving",
      option_name: "Add Custom Engraving",
      option_description: "Engrave a special message or name on the bracelet",
    },
    product_feature: {
      feature_id: 4,
      tag: "Eco-Friendly",
      icon_path: "https://img.icons8.com/?size=100&id=4vyrmSbTQDVW&format=png&color=000000",
      feature_description: "Made from biodegradable and eco-friendly materials",
    },
  },
  {
    id: 5,
    name: "Product 5",
    image_path:"https://img.freepik.com/free-photo/still-life-aesthetic-earrings_23-2149649128.jpg?t=st=1734506267~exp=1734509867~hmac=c9df8d10b085b88f3064eb321c163a6d551db334424432247f1633361223c1d7&w=826",
    description: "Elegant necklace with a unique charm",
    price: "$18",
    category: "Gift Items",
    subCategory: "Upcycled Decor",
    is_customizable: false,
    product_feature: {
      feature_id: 5,
      tag: "Luxury",
      icon_path: "https://img.icons8.com/?size=100&id=4vyrmSbTQDVW&format=png&color=000000",
      feature_description: "Crafted with luxurious materials for a premium look",
    },
  },
  {
    id: 6,
    name: "Product 6",
    image_path:"https://img.freepik.com/free-photo/still-life-aesthetic-earrings_23-2149649128.jpg?t=st=1734506267~exp=1734509867~hmac=c9df8d10b085b88f3064eb321c163a6d551db334424432247f1633361223c1d7&w=826",
    description: "Stylish ring that fits any occasion",
    price: "$25",
    category: "Keepsakes",
    subCategory: "Memory Books",
    is_customizable: true,
    customization_option: {
      customization_id: 4,
      option_type: "Color",
      option_name: "Choose Your Ring Color",
      option_description: "Pick a color that suits your style",
    },
    product_feature: {
      feature_id: 6,
      tag: "Premium",
      icon_path: "https://img.icons8.com/?size=100&id=4vyrmSbTQDVW&format=png&color=000000",
      feature_description: "A premium ring made with high-quality materials",
    },
  },
  {
    id: 7,
    name: "Product 7",
    image_path:"https://img.freepik.com/free-photo/still-life-aesthetic-earrings_23-2149649128.jpg?t=st=1734506267~exp=1734509867~hmac=c9df8d10b085b88f3064eb321c163a6d551db334424432247f1633361223c1d7&w=826",
    description: "Charming anklet for beach lovers",
    price: "$8",
    category: "Keepsakes",
    subCategory: "Customized Keychains",
    is_customizable: false,
    product_feature: {
      feature_id: 7,
      tag: "Summer",
      icon_path: "https://img.icons8.com/?size=100&id=4vyrmSbTQDVW&format=png&color=000000",
      feature_description: "Perfect accessory for summer outfits",
    },
  },
  {
    id: 8,
    name: "Product 8",
    image_path:"https://img.freepik.com/free-photo/still-life-aesthetic-earrings_23-2149649128.jpg?t=st=1734506267~exp=1734509867~hmac=c9df8d10b085b88f3064eb321c163a6d551db334424432247f1633361223c1d7&w=826",
    description: "Personalized photo frame to preserve memories",
    price: "$30",
    category: "Keepsakes",
    subCategory: "Personalized Photo Frames",
    is_customizable: true,
    customization_option: {
      customization_id: 5,
      option_type: "Text",
      option_name: "Add Custom Text",
      option_description: "Add a personal message or name to the photo frame",
    },
    product_feature: {
      feature_id: 8,
      tag: "Personalized",
      icon_path: "https://img.icons8.com/?size=100&id=4vyrmSbTQDVW&format=png&color=000000",
      feature_description: "Customize your frame with personal text or message",
    },
  },
];


const ProductPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filterProducts = () => {
    if (selectedCategory === "All") {
      return productData;
    }
    return productData.filter((product) => 
      product.category === selectedCategory || product.subCategory === selectedCategory
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCardClick = (product: any) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  return (
    <div>
      <Header />
      {/* <p className="text-xl font-semibold text-center mb-4">
        Selected: {selectedCategory}
      </p> */}
      <div className="mt-5 my-7">
      <ProductCategories
        onCategoryChange={(category) => setSelectedCategory(category)}
      />
      </div>

      {/* Map through filtered products and send each product to the Card component */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 m-6">
        {filterProducts().map((product) => (

          <Card
            key={product.id}
            product={product}
            onClick={() => handleCardClick(product)}
          />

        ))}
      </div>

      {/* Dialog Component */}
      <ProductDetailsDialog
        isOpen={isDialogOpen}
        product={selectedProduct}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default ProductPage;
