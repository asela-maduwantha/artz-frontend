import React, { useState, useEffect } from "react";
import ProductCategories from "../components/layout/ProductCategories";
import Card from "../components/common/Card";
import ProductDetailsDialog from "../components/layout/ProductDialog";
import { productService } from "../services/api/productservice";
import { ShoppingBag } from "lucide-react";

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getAllProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filterProducts = () => {
    if (selectedCategory === "All") {
      return products;
    }
    return products.filter((product) => product.category === selectedCategory);
  };

  const handleCardClick = (product: any) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 text-center">
          <p className="text-xl font-semibold">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
       <div className="flex items-center place-content-center gap-2 mb-8">
        <ShoppingBag className="w-6 h-6 text-green-500" />
        <h1 className="text-2xl font-bold">Explore Your Desires</h1>
      </div>
      <div className="mt-5 my-7">
        <ProductCategories
          onCategoryChange={(category) => setSelectedCategory(category)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 m-6">
        {filterProducts().map((product) => (
          <Card
            key={product.id}
            product={{
              ...product,
              image_path: product.img_url,
              product_feature: product.features?.[0] && {
                feature_id: product.features[0].id,
                tag: product.features[0].tag,
                icon_path: product.features[0].icon,
                feature_description: product.features[0].description,
              },
              customization_option: product.customization_options?.[0] && {
                customization_id: product.customization_options[0].id,
                option_type: product.customization_options[0].type,
                option_name: product.customization_options[0].name,
                option_description: `${product.customization_options[0].name} - Additional cost: LKR ${product.customization_options[0].additional_price}`,
              }
            }}
            onClick={() => handleCardClick(product)}
          />
        ))}
      </div>

      <ProductDetailsDialog
        isOpen={isDialogOpen}
        product={selectedProduct}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default ProductPage;