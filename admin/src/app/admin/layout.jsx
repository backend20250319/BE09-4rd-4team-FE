// src/app/admin/layout.jsx
"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import "../../styles/globals.css";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
