
import React from "react";
import { Header } from "./header";
import { SidebarNavigation } from "./sidebar-navigation";

interface LayoutProps {
  children: React.ReactNode;
  systemStatus?: "online" | "degraded" | "offline";
}

export function Layout({ children, systemStatus = "online" }: LayoutProps) {
  return (
    <div className="min-h-screen flex">
      <SidebarNavigation />
      <div className="flex-1 flex flex-col ml-0 lg:ml-64">
        <Header systemStatus={systemStatus} />
        <main className="flex-1 p-4 pt-20 lg:p-6 lg:pt-20">
          {children}
        </main>
      </div>
    </div>
  );
}
