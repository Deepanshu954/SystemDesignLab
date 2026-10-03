import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import MarkdownRenderer from '../components/content/MarkdownRenderer';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Layout & Content Components', () => {
  describe('Breadcrumbs', () => {
    it('renders breadcrumb items and links correctly', () => {
      render(
        <Breadcrumbs
          items={[
            { label: 'Case Studies', href: '/case-studies' },
            { label: 'Distributed URL Shortener' },
          ]}
        />
      );

      expect(screen.getByText('Home')).toBeDefined();
      expect(screen.getByText('Case Studies')).toBeDefined();
      expect(screen.getByText('Distributed URL Shortener')).toBeDefined();
    });
  });

  describe('MarkdownRenderer', () => {
    it('renders headings and paragraphs', () => {
      const markdown = `# Main Title\n\n## Sub Heading\n\nThis is a test paragraph with **bold** text.`;
      render(<MarkdownRenderer content={markdown} />);

      expect(screen.getByText('Main Title')).toBeDefined();
      expect(screen.getByText('Sub Heading')).toBeDefined();
      expect(screen.getByText(/This is a test paragraph/)).toBeDefined();
    });

    it('renders code blocks with language badge', () => {
      const markdown = "```json\n{\n  \"status\": \"UP\"\n}\n```";
      render(<MarkdownRenderer content={markdown} />);

      expect(screen.getByText('json')).toBeDefined();
      expect(screen.getByText('Copy')).toBeDefined();
    });

    it('renders tables correctly', () => {
      const markdown = "| Feature | SQL | NoSQL |\n|---|---|---|\n| ACID | High | Tunable |";
      render(<MarkdownRenderer content={markdown} />);

      expect(screen.getByText('Feature')).toBeDefined();
      expect(screen.getByText('SQL')).toBeDefined();
      expect(screen.getByText('NoSQL')).toBeDefined();
      expect(screen.getByText('ACID')).toBeDefined();
      expect(screen.getByText('High')).toBeDefined();
    });
  });
});
