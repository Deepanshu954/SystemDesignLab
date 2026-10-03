'use client';

import React, { useState } from 'react';
import { Copy, Check, Terminal, Info, AlertTriangle, Lightbulb } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Helper to format inline markdown (bold, code, links)
  const formatInline = (text: string) => {
    // Replace inline code
    const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code
            key={i}
            className="px-1.5 py-0.5 rounded bg-slate-800 text-blue-300 font-mono text-xs border border-slate-700/50"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="text-white font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  // Simple, robust line-by-line block parser
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let codeLanguage = '';
  let inTable = false;
  let tableRows: string[][] = [];
  let codeBlockCounter = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code blocks
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeLanguage = line.slice(3).trim();
        codeBuffer = [];
      } else {
        inCodeBlock = false;
        const codeText = codeBuffer.join('\n');
        const blockId = codeBlockCounter++;
        elements.push(
          <div key={`code-${i}`} className="my-6 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 font-mono text-sm">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-medium">
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                {codeLanguage || 'code'}
              </span>
              <button
                onClick={() => copyToClipboard(codeText, blockId)}
                className="flex items-center gap-1 hover:text-white transition-colors text-xs"
              >
                {copiedIndex === blockId ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 overflow-x-auto text-slate-300 leading-relaxed text-xs">
              <code>{codeText}</code>
            </pre>
          </div>
        );
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    // Markdown Tables
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      if (!inTable) {
        inTable = true;
        tableRows = [];
      }
      // Check if it's separator line |---|---|
      if (line.includes('---')) {
        continue;
      }
      const cells = line
        .split('|')
        .slice(1, -1)
        .map((c) => c.trim());
      tableRows.push(cells);
      continue;
    } else if (inTable) {
      inTable = false;
      const [header, ...bodyRows] = tableRows;
      elements.push(
        <div key={`table-${i}`} className="my-6 overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-sm">
            {header && (
              <thead className="bg-slate-900/80 text-xs font-semibold text-slate-300 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  {header.map((cell, idx) => (
                    <th key={idx} className="px-4 py-3 font-semibold">
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody className="divide-y divide-slate-800 bg-slate-900/30">
              {bodyRows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-800/20 transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-4 py-3 text-slate-300 text-xs sm:text-sm">
                      {formatInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    // Headers
    if (line.startsWith('# ')) {
      const title = line.replace(/^#\s+/, '');
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      elements.push(
        <h1 key={`h1-${i}`} id={id} className="text-2xl sm:text-3xl font-extrabold text-white mt-10 mb-4 pb-2 border-b border-slate-800">
          {title}
        </h1>
      );
      continue;
    }
    if (line.startsWith('## ')) {
      const title = line.replace(/^##\s+/, '');
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      elements.push(
        <h2 key={`h2-${i}`} id={id} className="text-xl sm:text-2xl font-bold text-white mt-8 mb-3 scroll-mt-20">
          {title}
        </h2>
      );
      continue;
    }
    if (line.startsWith('### ')) {
      const title = line.replace(/^###\s+/, '');
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      elements.push(
        <h3 key={`h3-${i}`} id={id} className="text-lg font-semibold text-blue-300 mt-6 mb-2 scroll-mt-20">
          {title}
        </h3>
      );
      continue;
    }

    // Callout quotes
    if (line.startsWith('> ')) {
      const quoteText = line.replace(/^>\s+/, '');
      elements.push(
        <div key={`quote-${i}`} className="my-4 p-4 rounded-xl border border-blue-500/30 bg-blue-500/5 text-blue-200 text-sm flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <div>{formatInline(quoteText)}</div>
        </div>
      );
      continue;
    }

    // Bullet lists
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const itemText = line.trim().replace(/^[-*]\s+/, '');
      elements.push(
        <li key={`li-${i}`} className="ml-5 list-disc text-slate-300 text-sm leading-relaxed my-1 marker:text-blue-500">
          {formatInline(itemText)}
        </li>
      );
      continue;
    }

    // Numbered lists
    if (/^\d+\.\s+/.test(line.trim())) {
      const itemText = line.trim().replace(/^\d+\.\s+/, '');
      elements.push(
        <li key={`oli-${i}`} className="ml-5 list-decimal text-slate-300 text-sm leading-relaxed my-1 marker:text-blue-400 marker:font-semibold">
          {formatInline(itemText)}
        </li>
      );
      continue;
    }

    // Empty lines
    if (!line.trim()) {
      continue;
    }

    // Regular paragraphs
    elements.push(
      <p key={`p-${i}`} className="my-3 text-slate-300 text-sm sm:text-base leading-relaxed">
        {formatInline(line)}
      </p>
    );
  }

  // Flush remaining table if file ends with table
  if (inTable && tableRows.length > 0) {
    const [header, ...bodyRows] = tableRows;
    elements.push(
      <div key="table-end" className="my-6 overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-left text-sm">
          {header && (
            <thead className="bg-slate-900/80 text-xs font-semibold text-slate-300 uppercase tracking-wider border-b border-slate-800">
              <tr>
                {header.map((cell, idx) => (
                  <th key={idx} className="px-4 py-3 font-semibold">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody className="divide-y divide-slate-800 bg-slate-900/30">
            {bodyRows.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-slate-800/20 transition-colors">
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="px-4 py-3 text-slate-300 text-xs sm:text-sm">
                    {formatInline(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return <div className="prose-system-design">{elements}</div>;
}
