
import { cn } from "@/lib/utils";
import React from "react";

type AlertSeverity = "low" | "medium" | "high" | "critical";

interface AlertItemProps {
  title: string;
  description: string;
  timestamp: string;
  severity: AlertSeverity;
  source?: string;
  className?: string;
  onClick?: () => void;
}

export function AlertItem({
  title,
  description,
  timestamp,
  severity,
  source,
  className,
  onClick,
}: AlertItemProps) {
  const severityClasses = {
    low: "border-l-accent-success",
    medium: "border-l-accent-blue",
    high: "border-l-accent-warning",
    critical: "border-l-accent-error animate-pulse",
  };

  return (
    <div
      className={cn(
        "bg-navy-100 hover:bg-navy-50/50 border-t border-r border-b border-border border-l-4 p-4 cursor-pointer transition-colors",
        severityClasses[severity],
        className
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <h4 className="font-medium">{title}</h4>
        <span className="text-xs text-muted-foreground">{timestamp}</span>
      </div>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
      {source && (
        <div className="mt-2">
          <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">
            {source}
          </span>
        </div>
      )}
    </div>
  );
}
