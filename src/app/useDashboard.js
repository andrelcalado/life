import { redirect } from 'next/navigation';
import { userStore } from '@/store/user'
import { useEffect, useState } from 'react'

const useDashboard = () => {
  const user = userStore((state) => state.user);
  const [screenLoading, setScreenLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      redirect('/login');
    } else {
      setScreenLoading(false);
    }
  }, []);  

  return {
    screenLoading,
    user,
  }    
}

export default useDashboard