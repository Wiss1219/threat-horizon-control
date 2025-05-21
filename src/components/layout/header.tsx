
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, User, ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarNavigation } from "./sidebar-navigation";
import { useAuth } from "@/context/AuthContext";

interface HeaderProps {
  systemStatus: "online" | "degraded" | "offline";
}

export function Header({ systemStatus = "online" }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  
  const statusClassName = {
    online: "status-badge-online",
    degraded: "status-badge-warning",
    offline: "status-badge-error",
  };

  const statusLabel = {
    online: "System Online",
    degraded: "System Degraded",
    offline: "System Offline",
  };

  const currentTime = new Date().toLocaleString();
  
  // Extract initials for avatar
  const getInitials = () => {
    if (!user?.email) return "U";
    return user.email
      .split("@")[0]
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 h-14 border-b border-border flex items-center justify-between px-4 lg:px-6 bg-navy-100">
      <div className="flex items-center gap-4">
        {/* Mobile menu trigger */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="block lg:hidden">
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <div className="h-full">
              <SidebarNavigation onItemClick={() => setMobileMenuOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>

        <span className={`status-badge ${statusClassName[systemStatus]}`}>
          {statusLabel[systemStatus]}
        </span>
        <span className="text-sm text-muted-foreground hidden md:block">
          {currentTime}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent-error rounded-full"></span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{getInitials()}</AvatarFallback>
              </Avatar>
              <span className="hidden md:block">
                {user?.email?.split("@")[0] || "User"}
              </span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link to="/profile">My Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
