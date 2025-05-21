
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import {
  BarChart3,
  Shield,
  Network,
  Users,
  FileText,
  Settings,
  Menu,
  X,
  Zap,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  href: string;
  onClick?: () => void;
}

function SidebarItem({
  icon,
  label,
  isActive = false,
  href,
  onClick,
}: SidebarItemProps) {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
        isActive
          ? "bg-secondary text-foreground"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      )}
      onClick={onClick}
    >
      <div className="w-5 h-5 flex items-center justify-center">{icon}</div>
      {label}
    </Link>
  );
}

export function SidebarNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = window.location.pathname;

  const routes = [
    {
      icon: <Home className="h-5 w-5" />,
      label: "Overview",
      href: "/",
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      label: "Firewall Rules",
      href: "/rules",
    },
    {
      icon: <Network className="h-5 w-5" />,
      label: "VLANs",
      href: "/vlans",
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Users",
      href: "/users",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      label: "AI Insights",
      href: "/insights",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Logs",
      href: "/logs",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      href: "/settings",
    },
  ];

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-all duration-200",
          isOpen ? "block" : "hidden lg:hidden"
        )}
        onClick={() => setIsOpen(false)}
      ></div>

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-navy-200 border-r border-border transition-transform duration-300 transform",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between h-14 px-4 border-b border-border">
          <div className="flex items-center gap-2 font-semibold">
            <Shield className="h-5 w-5 text-accent-blue" />
            <span>SecureDashboard</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-3 space-y-1">
          {routes.map((route) => (
            <SidebarItem
              key={route.href}
              icon={route.icon}
              label={route.label}
              href={route.href}
              isActive={currentPath === route.href}
              onClick={() => setIsOpen(false)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
