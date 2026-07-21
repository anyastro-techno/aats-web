import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEOHead({ 
  title, 
  description, 
  canonicalUrl, 
  ogImage = "/assets/branding/og-image.png", 
  type = "website",
  schema 
}) {
  const siteName = "AnyAstro Techno Solutions";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const currentUrl = canonicalUrl || "https://rebrand.ly/aatn";

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph Protocol */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@AnyAstroTech" />

      {/* JSON-LD Structured Data Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}