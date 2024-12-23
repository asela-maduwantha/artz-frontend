import { useMemo } from 'react';

export const useProductSchema = (product: any) => {
  return useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image,
    description: product.description,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: product.inStock ? "InStock" : "OutOfStock"
    }
  }), [product]);
};

export const useArticleSchema = (article: any) => {
  return useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    image: article.image,
    author: {
      "@type": "Person",
      name: article.author
    },
    datePublished: article.publishDate,
    dateModified: article.modifiedDate
  }), [article]);
};

export const useOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ArtZbyUsha",
    url: "https://artzbyusha.netlify.app",
    logo: "https://artzbyusha.netlify.app/logo.png",
    sameAs: [
      "https://www.facebook.com/artzbyusha",
      "https://www.instagram.com/artzbyusha",
      "https://www.twitter.com/artzbyusha"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-xxx-xxx-xxxx",
      contactType: "customer service"
    }
  };
};