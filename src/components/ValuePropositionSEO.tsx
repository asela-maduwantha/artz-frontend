import React from 'react';
import { SEO } from './SEO';

const ValuePropositionSEO: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Why Choose Artz by Usha - Handcrafted Art & Items in Colombo",
    "description": "Discover our eco-friendly, personalized handcrafted items with island-wide delivery across Sri Lanka. Learn about our unique value propositions.",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Eco-Friendly Crafting",
          "description": "Sustainable materials and environmentally conscious production"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Personalized Gifts",
          "description": "Unique gifts tailored to your specific preferences"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Island-wide Delivery",
          "description": "Convenient shipping across Sri Lanka"
        }
      ]
    }
  };

  return (
    <SEO
      title="Why Choose Artz by Usha | Eco-Friendly Handcrafted Gifts in Sri Lanka"
      description="Discover our eco-friendly handcrafted items, personalized gifts, and island-wide delivery across Sri Lanka. Shop sustainable and unique artisan products at Artz by Usha."
      keywords="eco-friendly gifts, personalized gifts, Sri Lankan handicrafts, sustainable art, handmade items, island-wide delivery, Colombo crafts"
      pageType="article"
      schema={schema}
    />
  );
};

export default ValuePropositionSEO;