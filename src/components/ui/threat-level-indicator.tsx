
import { cn } from "@/lib/utils";
import React from "react";

type ThreatLevel = "low" | "medium" | "high" | "critical";

interface ThreatLevelIndicatorProps {
  level: ThreatLevel;
  pulsating?: boolean;
  className?: string;
}

export function ThreatLevelIndicator({
  level,
  pulsating = true,
  className,
}: ThreatLevelIndicatorProps) {
  const colors = {
    low: "bg-accent-success",
    medium: "bg-accent-blue",
    high: "bg-accent-warning",
    critical: "bg-accent-error",
  };

  const labels = {
    low: "Low",
    medium: "Medium",
    high: "High",
    critical: "Critical",
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div
        className={cn(
          "w-3 h-3 rounded-full",
          colors[level],
          pulsating && "animate-pulse"
        )}
      ></div>
      <span 
        className={cn(
          "text-sm font-medium",
          level === "low" && "text-accent-success",
          level === "medium" && "text-accent-blue",
          level === "high" && "text-accent-warning",
          level === "critical" && "text-accent-error"
        )}
      >
        {labels[level]}
      </span>
    </div>
  );
}
