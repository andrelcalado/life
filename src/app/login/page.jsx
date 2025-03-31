"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";
import useLogin from "./useLogin";
import Badge from "@/components/Badge";

export default function Login() {
  const {
    username,
    setUsername,
    password,
    setPassword,
    email,
    setEmail,
    error,
    loading,
    handleLogin,
  } = useLogin();

  return (
    <main className="flex items-center p-5 justify-center bg-gray-100 min-h-screen h-full sm:p-10">
      <section className="rounded-lg overflow-hidden shadow-lg grid grid-cols-1 max-w-[900px] sm:grid-cols-2">
        <div className="bg-white p-6 w-full sm:p-10">
          <Image
            className="mb-4 sm:mb-6"
            src="/assets/images/logo-sm.png"
            alt="Life logo"
            width={35}
            height={35}
          />
          <h1 className="text-xl font-bold text-sky-950 sm:text-2xl">Acesse sua conta</h1>
          <p className="text-sm text-sky-950 pb-4 mb-4 border-b border-gray-300">Gerencie suas operações logísticas com eficiência.</p>

          <Input
            className="mb-2"
            value={username}
            onChange={({target}) => setUsername(target.value)}
            type="text"
            error={error}
            placeholder="Nome de usuário"
          />
          <Input
            className="mb-2"
            value={email}
            onChange={({target}) => setEmail(target.value)}
            type="email"
            error={error}
            placeholder="E-mail"
          />
          <Input
            value={password}
            onChange={({target}) => setPassword(target.value)}
            type="password"
            error={error}
            placeholder="Senha"
          />

          <Badge className="mt-1" variation="error" visibility={error}>
            {error}
          </Badge>

          <Button
            loading={loading}
            className="mt-4"
            text="Entrar"
            onClick={handleLogin}
            disabled={!username || !email || !password}
          />
        </div>
        <div className="w-full bg-sky-500 overflow-hidden flex items-center justify-center">
          <Image
            alt="Ilustração de logistica"
            src="/assets/images/login-illustration.svg"
            width={600}
            height={600}
          />
        </div>
      </section>
    </main>
  );
}
