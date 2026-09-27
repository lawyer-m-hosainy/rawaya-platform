/// <reference types="@testing-library/jest-dom/vitest" />
import { render } from '@testing-library/react';
import App from '../App';
import { describe, it, expect, vi } from 'vitest';

// Mock the Supabase client itself (not just individual services). src/lib/supabase.ts
// throws at *module-load time* if VITE_SUPABASE_URL/VITE_SUPABASE_ANON_KEY are missing,
// which crashes this whole test file before a single assertion runs in any environment
// (CI included) that doesn't have real secrets wired up — mocking it here means this
// smoke test needs zero real credentials to prove the app renders.
vi.mock('../lib/supabase', () => {
  const chainable = (): any => {
    const target: any = {
      then: (resolve: any) => resolve({ data: [], error: null }),
      single: () => Promise.resolve({ data: null, error: null }),
    };
    return new Proxy(target, {
      get(obj, prop) {
        if (prop in obj) return (obj as any)[prop];
        return () => chainable();
      },
    });
  };

  return {
    supabase: {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null } }),
        signInWithPassword: () => Promise.resolve({ data: {}, error: null }),
        signOut: () => Promise.resolve({ error: null }),
      },
      from: () => chainable(),
      storage: {
        from: () => ({
          upload: () => Promise.resolve({ data: null, error: null }),
          getPublicUrl: () => ({ data: { publicUrl: '' } }),
        }),
      },
    },
  };
});

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
