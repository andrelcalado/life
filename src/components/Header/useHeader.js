"use client";

import useAuthStore from '@/store/user';

const useHeader = () => {
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  }
    
  return {
    handleLogout,
  }
}

export default useHeader