import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  canonicalUrl?: string;
  pageType?: 'website' | 'article' | 'product';
  schema?: object;
}

export const SEO = ({
  title,
  description,
  keywords = "handcraft, art, handmade items, crafts, ArtZbyUsha",
  image = "https://artzbyusha.netlify.app/preview-image.jpg",
  canonicalUrl = "https://artzbyusha.netlify.app",
  pageType = "website",
  schema
}: SEOProps) => {
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ArtZbyUsha",
    url: canonicalUrl,
    description: description,
    image: image
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{`${title} | ArtZbyUsha`}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={pageType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="ArtZbyUsha" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="content-language" content="en" />
      <meta name="geo.region" content="US" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schema || defaultSchema)}
      </script>
    </Helmet>
  );
};