import React from 'react';

interface JsonLdProps {
  type?: string;
  data: Record<string, any>;
}

export const JsonLd: React.FC<JsonLdProps> = ({ type, data }) => {
  const structuredData = {
    '@context': 'https://schema.org',
    ...(type ? { '@type': type } : {}),
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default JsonLd;
