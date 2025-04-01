import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/user';
import Loading from '../Loading';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { 
    accessToken, 
    isHydrated, 
    checkAuth,
    loading 
  } = useAuthStore();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      if (!isHydrated) return;
      
      setIsCheckingAuth(true);
      try {
        const isAuthenticated = await checkAuth();
        if (!isAuthenticated) {
          router.push('/login');
        }
      } catch (error) {
        console.error('Authentication error:', error);
        router.push('/login');
      } finally {
        setIsCheckingAuth(false);
      }
    };

    verifyAuth();
  }, [isHydrated, checkAuth, router]);

  if (!isHydrated || isCheckingAuth || loading) {
    return <Loading loading={true} fixed size="lg" />;
  }

  if (!accessToken) {
    return null; // Ou redireciona para login
  }

  return <>{children}</>;
};

export default ProtectedRoute;