import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAdminGuard } from '../hooks/useAdminGuard';
import { supabase } from '../lib/supabase';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
      onAuthStateChange: vi.fn(() => ({ data: { subscription: { unsubscribe: vi.fn() } } })),
    },
    from: vi.fn(),
  }
}));

describe('useAdminGuard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('blocks anonymous user (isAdmin false)', async () => {
    (supabase.auth.getSession as any).mockResolvedValue({ data: { session: null } });

    const { result } = renderHook(() => useAdminGuard(), { wrapper: BrowserRouter });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.isAdmin).toBe(false);
  });

  it('blocks non-admin user (isAdmin false)', async () => {
    (supabase.auth.getSession as any).mockResolvedValue({ data: { session: { user: { id: '123' } } } });
    const selectMock = vi.fn().mockReturnThis();
    const eqMock = vi.fn().mockReturnThis();
    const singleMock = vi.fn().mockResolvedValue({ data: { role: 'user' } });
    (supabase.from as any).mockReturnValue({ select: selectMock, eq: eqMock, single: singleMock });

    const { result } = renderHook(() => useAdminGuard(), { wrapper: BrowserRouter });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.isAdmin).toBe(false);
  });

  it('allows admin user (isAdmin true)', async () => {
    (supabase.auth.getSession as any).mockResolvedValue({ data: { session: { user: { id: '123' } } } });
    const selectMock = vi.fn().mockReturnThis();
    const eqMock = vi.fn().mockReturnThis();
    const singleMock = vi.fn().mockResolvedValue({ data: { role: 'admin' } });
    (supabase.from as any).mockReturnValue({ select: selectMock, eq: eqMock, single: singleMock });

    const { result } = renderHook(() => useAdminGuard(), { wrapper: BrowserRouter });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.isAdmin).toBe(true);
  });
});
