import { useState, useEffect, useCallback } from 'react';

type QueryStatus = 'idle' | 'loading' | 'success' | 'error';

export function useSupabaseQuery<T>(
  queryFn: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<QueryStatus>('idle');
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const result = await queryFn();
      setData(result);
      setStatus('success');
    } catch (err: any) {
      setError(err);
      setStatus('error');
    }
  }, [queryFn]);

  useEffect(() => {
    execute();
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, status, error, refetch: execute };
}
