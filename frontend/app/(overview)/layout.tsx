"use client";

import type React from "react";
import Header from "@/components/overview/layout/header";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <Header />
      </header>

      <main className="px-6 py-8">{children}</main>
    </div>
  );
}
