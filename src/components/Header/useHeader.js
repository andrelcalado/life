"use client";

import { userStore } from '@/store/user';
import { useRouter } from 'next/navigation';

const useHeader = () => {
  const updateUser = userStore((state) => state.updateUser);
  const router = useRouter();

  const handleLogout = () => {
    updateUser(undefined);
    router.push('/login');
  }
    
  return {
    handleLogout,
  }
}

export default useHeader