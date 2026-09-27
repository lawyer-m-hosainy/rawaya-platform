/// <reference types="@testing-library/jest-dom/vitest" />
import { render } from '@testing-library/react';
import App from '../App';
import { describe, it, expect, vi } from 'vitest';

// Mocks to prevent actual network calls during smoke tests
vi.mock('../services/articleService', () => ({
  articleService: {
    getArticles: vi.fn().mockResolvedValue([]),
    getArticleBySlug: vi.fn().mockResolvedValue({}),
  }
}));
vi.mock('../services/programService', () => ({
  programService: {
    getPrograms: vi.fn().mockResolvedValue([]),
  }
}));
vi.mock('../services/testimonialService', () => ({
  testimonialService: {
    getTestimonials: vi.fn().mockResolvedValue([]),
  }
}));

// Mock ResizeObserver for some React components
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('App Routing Smoke Test', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });
});
