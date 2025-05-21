
import { cn } from "@/lib/utils";
import React from "react";

interface CircularProgressProps {
  value: number;
  max: number;
  size?: number;
  thickness?: number;
  color?: string;
  bgColor?: string;
  label?: string;
  className?: string;
}

export function CircularProgress({
  value,
  max,
  size = 80,
  thickness = 8,
  color = "var(--accent-success, #00FFB0)",
  bgColor = "#2B2E38",
  label,
  className,
}: CircularProgressProps) {
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressValue = Math.min(Math.max(value, 0), max);
  const percentage = (progressValue / max) * 100;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  let displayColor = color;
  if (percentage > 85) {
    displayColor = "var(--accent-error, #FF4C4C)";
  } else if (percentage > 70) {
    displayColor = "var(--accent-warning, #FFC107)";
  }

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={thickness}
          stroke={bgColor}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={thickness}
          stroke={displayColor}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <div className="text-xl font-medium">{Math.round(percentage)}%</div>
        {label && <div className="text-xs text-muted-foreground">{label}</div>}
      </div>
    </div>
  );
}
