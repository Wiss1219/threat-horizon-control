
import React from "react";
import { Link } from "react-router-dom";
import { Bell, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface HeaderProps {
  systemStatus: "online" | "degraded" | "offline";
}

export function Header({ systemStatus = "online" }: HeaderProps) {
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

  return (
    <header className="h-14 border-b border-border flex items-center justify-between px-4 lg:px-6 bg-navy-100">
      <div className="flex items-center gap-4">
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
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <span className="hidden md:block">Admin</span>
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
            <DropdownMenuItem asChild>
              <Link to="/logout">Logout</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
