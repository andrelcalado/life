"use client";

import useAuthStore from '@/store/user';
import { useRouter } from 'next/navigation';
import { useState } from 'react'

const useLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { login, loading, error } = useAuthStore();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await login({ username, email, password });
      router.push('/');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
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