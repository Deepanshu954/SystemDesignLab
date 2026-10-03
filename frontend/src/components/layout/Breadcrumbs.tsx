import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const schemaItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://systemdesignlab.dev',
    },
    ...items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 2,
      name: item.label,
      item: item.href ? `https://systemdesignlab.dev${item.href}` : undefined,
    })),
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: schemaItems,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-slate-400 py-3">
        <Link href="/" className="hover:text-cyan-400 flex items-center gap-1 transition-colors">
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              {isLast || !item.href ? (
                <span className="text-slate-200 font-medium">{item.label}</span>
              ) : (
                <Link href={item.href} className="hover:text-cyan-400 transition-colors">
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </>
  );
};

export default Breadcrumbs;
