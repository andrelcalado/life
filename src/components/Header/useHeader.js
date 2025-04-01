"use client";

import useAuthStore from '@/store/user';
import { useRouter } from 'next/navigation';

const useHeader = () => {
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  }
    
  return {
    handleLogout,
  }
}

export default useHeader