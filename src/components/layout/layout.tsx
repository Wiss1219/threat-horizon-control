
import React from "react";
import { Header } from "./header";
import { SidebarNavigation } from "./sidebar-navigation";
import { useAuth } from "@/context/AuthContext";

interface LayoutProps {
  children: React.ReactNode;
  systemStatus?: "online" | "degraded" | "offline";
}

export function Layout({ children, systemStatus = "online" }: LayoutProps) {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen flex">
      {/* Fixed sidebar */}
      <div className="fixed left-0 top-0 h-full z-40 hidden lg:block">
        <SidebarNavigation />
      </div>
      
      {/* Main content that doesn't overlap with sidebar */}
      <div className="flex-1 flex flex-col ml-0 lg:ml-64">
        <Header systemStatus={systemStatus} />
        <main className="flex-1 p-4 pt-20 lg:p-6 lg:pt-20">
          {children}
        </main>
      </div>
    </div>
  );
}
