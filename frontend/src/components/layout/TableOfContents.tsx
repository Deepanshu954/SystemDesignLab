'use client';

import React, { useEffect, useState } from 'react';
import { List } from 'lucide-react';

export interface TocItem {
  id: string;
  title?: string;
  text?: string;
  level?: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || '');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      for (let i = items.length - 1; i >= 0; i--) {
        const element = document.getElementById(items[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveId(items[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  return (
    <div className="p-4 rounded-xl glass-panel border border-slate-800 bg-slate-950/60 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-800 text-xs font-semibold uppercase tracking-wider text-slate-300">
        <List className="w-4 h-4 text-cyan-400" />
        <span>Table of Contents</span>
      </div>
      <nav className="space-y-1">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`block text-xs py-1.5 px-2 rounded-md transition-all ${
                item.level === 3 ? 'pl-4' : ''
              } ${
                isActive
                  ? 'text-cyan-400 font-semibold bg-cyan-500/10 border-l-2 border-cyan-400'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              {item.title || item.text}
            </a>
          );
        })}
      </nav>
    </div>
  );
};

export default TableOfContents;
