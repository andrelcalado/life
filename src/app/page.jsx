"use client";

import React from "react";
import { DashboardProvider } from "./hooks/useDashboard";
import Header from "@/components/Header";
import Dashboard from "./Dashboard";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Home() {
  return (
    <>
      <Header />

      <DashboardProvider>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </DashboardProvider>
    </>
  );
}
