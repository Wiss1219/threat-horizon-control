
import React from "react";

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
  animated?: boolean;
  className?: string;
}

export function Sparkline({
  data,
  width = 120,
  height = 40,
  color = "#00BFFF",
  strokeWidth = 2,
  animated = true,
  className,
}: SparklineProps) {
  if (!data.length) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  const points: [number, number][] = data.map((value, index) => [
    index * (width / (data.length - 1 || 1)),
    height - ((value - min) / range) * height,
  ]);

  const d = points
    .map((point, i) => `${i === 0 ? "M" : "L"} ${point[0]},${point[1]}`)
    .join(" ");

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d={d}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className={animated ? "opacity-70" : ""}
      />
      {animated && (
        <path
          d={d}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className="animate-pulse-glow"
        />
      )}
      <path
        d={`${d} V ${height} H 0 Z`}
        fill={`url(#sparkline-gradient-${color.replace('#', '')})`}
        opacity="0.15"
      />
      <defs>
        <linearGradient
          id={`sparkline-gradient-${color.replace('#', '')}`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor={color} stopOpacity="0.5" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
