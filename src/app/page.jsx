"use client";

import React from "react";
import { DashboardProvider } from "./useDashboard";
import Header from "@/components/Header";
import Dashboard from "./dashboard";

export default function Home() {
  return (
    <>
      <Header />

      <DashboardProvider>
        <Dashboard />        
      </DashboardProvider>
    </>
  );
}
