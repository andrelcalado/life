"use client";

import { userStore } from '@/store/user';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'

const useLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const user = userStore((state) => state.user);
  const updateUser = userStore((state) => state.updateUser);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user]);

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error);
      }

      updateUser(data.data);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('Falha no login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  }

  return {
    username,
    setUsername,
    password,
    setPassword,
    email,
    setEmail,
    error,
    loading,
    handleLogin,
  }
}

export default useLogin