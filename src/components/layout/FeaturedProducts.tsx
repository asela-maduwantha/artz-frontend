import React, { useState, useEffect } from 'react';
import { ShoppingBag } from "lucide-react";
import { productService } from '../../services/api/productservice';
import { SEO } from '../SEO';
import { useProductSchema } from '../hooks/seoHooks';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  img_url: string;
  inStock?: boolean;
}

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts();
        setProducts(data.slice(0, 3));
        setLoading(false);
      } catch (err) {
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Generate schema for all featured products
  const productsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: useProductSchema({
        name: product.name,
        image: product.img_url,
        description: product.description,
        price: product.price,
        inStock: product.inStock ?? true,
      })
    }))
  };

  const pageTitle = "Featured Handcrafted Gifts | Shop Unique Artisan Products";
  const pageDescription = "Discover our handpicked selection of unique, handcrafted gifts. Each piece is carefully created with attention to detail and artistic excellence. Shop now for exclusive artisan products.";
  const keywords = "handcrafted gifts, artisan products, unique gifts, handmade items, featured products, ArtZbyUsha";

  if (loading) {
    return (
      <div className="py-12 px-4 sm:py-16 bg-green-100">
        <SEO 
          title={pageTitle}
          description={pageDescription}
          keywords={keywords}
          pageType="product"
          schema={productsSchema}
        />
        <div className="max-w-6xl mx-auto text-center">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 px-4 sm:py-16 bg-green-100">
        <SEO 
          title={pageTitle}
          description={pageDescription}
          keywords={keywords}
          pageType="product"
          schema={productsSchema}
        />
        <div className="max-w-6xl mx-auto text-center text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:py-16 bg-green-100">
      <SEO 
        title={pageTitle}
        description={pageDescription}
        keywords={keywords}
        pageType="product"
        schema={productsSchema}
      />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Our Featured Gifts</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <article
              key={product.id}
              className="bg-white rounded-lg p-4 sm:p-6 shadow-md hover:shadow-xl transition duration-300"
              itemScope
              itemType="https://schema.org/Product"
            >
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <img
                  src={product.img_url}
                  alt={product.name}
                  className="w-full h-48 sm:h-64 object-cover rounded-md"
                  itemProp="image"
                />
              </div>
              <h2 className="text-lg sm:text-xl font-semibold mb-2" itemProp="name">{product.name}</h2>
              <p className="text-gray-600 mb-4" itemProp="description">{product.description}</p>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <span className="text-lg font-bold" itemProp="price">LKR {product.price.toLocaleString()}</span>
                <meta itemProp="priceCurrency" content="LKR" />
                <button 
                  className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition flex items-center justify-center"
                  aria-label={`Buy ${product.name}`}
                >
                  <ShoppingBag className="inline mr-2" size={20} />
                  <span>Buy Product</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;