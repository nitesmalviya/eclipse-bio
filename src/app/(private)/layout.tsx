"use client";

import { useState } from "react";
import Sidebar from "@/src/components/layout/sidebar";
import Header from "@/src/components/layout/header";


interface PrivateLayoutProps {
  readonly children: React.ReactNode;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9FBFB] via-[#F9FBFB] to-[#D9F2F4]">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Header */}
      <Header onMenuClick={() => setSidebarOpen(true)} />

      {/* Main Content */}
      <main className="mt-25 lg:ml-[240px] min-h-screen">
        <div className="w-full">{children}</div>
      </main>
    </div>
  );
};

export default PrivateLayout;
