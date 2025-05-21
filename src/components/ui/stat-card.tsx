
import { cn } from "@/lib/utils";
import React from "react";

interface StatCardProps {
  title: string;
  value: string | React.ReactNode;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
  trend?: {
    value: number;
    isPositive?: boolean;
  };
  isLoading?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function StatCard({
  title,
  value,
  icon,
  footer,
  trend,
  isLoading = false,
  className,
  children,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-navy-100 border border-border p-5 rounded-lg card-glow",
        className
      )}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {isLoading ? (
            <div className="h-7 w-20 bg-navy-50 rounded skeleton"></div>
          ) : (
            <div className="text-2xl font-semibold">{value}</div>
          )}
        </div>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>

      {trend && (
        <div className="mt-2 flex items-center">
          <span
            className={cn(
              "text-xs font-medium",
              trend.isPositive ? "text-accent-success" : "text-accent-error"
            )}
          >
            {trend.isPositive ? "+" : ""}
            {trend.value}%
          </span>
          <span className="text-xs text-muted-foreground ml-1">vs last 24h</span>
        </div>
      )}

      {footer && <div className="mt-3 pt-3 border-t border-border">{footer}</div>}
      {children}
    </div>
  );
}
