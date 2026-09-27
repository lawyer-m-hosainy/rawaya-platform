import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export function useAdminGuard() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setIsAdmin(false);
          navigate('/');
          return;
        }

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (error || profile?.role !== 'admin') {
          setIsAdmin(false);
          navigate('/');
        } else {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error('Error checking admin role:', err);
        setIsAdmin(false);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    checkAdmin();
  }, [navigate]);

  return { isAdmin, isLoading };
}
