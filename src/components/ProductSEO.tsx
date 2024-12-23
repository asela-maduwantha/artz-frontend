import { Helmet } from "react-helmet-async";

interface ProductSEOProps {
    product: {
      name: string;
      description: string;
      price: number;
      image: string;
      slug: string;
    };
  }
  
  export const ProductSEO = ({ product }: ProductSEOProps) => {
    const canonicalUrl = `https://artzbyusha.netlify.app/products/${product.slug}`;
    
    const schema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      name: product.name,
      description: product.description,
      image: product.image,
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock"
      }
    };
  
    return (
      <Helmet>
        <title>{`${product.name} | ArtZbyUsha`}</title>
        <meta name="description" content={product.description} />
        <link rel="canonical" href={canonicalUrl} />
        
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="product" />
        
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>
    );
  };