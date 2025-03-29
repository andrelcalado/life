"use client";

import Image from "next/image";
import useDashboard from "./useDashboard";
import Loading from "@/components/Loading";
import Header from "@/components/Header";

export default function Home() {
  const { user, screenLoading } = useDashboard();

  return (
    <>
      <Loading fixed size="lg" loading={screenLoading} />
      <Header />

      <main></main>
    </>
  );
}
