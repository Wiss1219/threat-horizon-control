
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import worldMapSvg from "./world-map-simplified.svg";

interface ThreatPoint {
  id: number;
  source: string;
  destination: string;
  lat: number;
  lng: number;
  magnitude: number;
}

interface ThreatMapProps {
  data: ThreatPoint[];
  className?: string;
}

export function ThreatMap({ data, className }: ThreatMapProps) {
  // This is a simplified world map implementation for demo purposes
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Threat Map</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-[300px] w-full bg-navy-200 rounded-md overflow-hidden">
          {/* Simplified world map background */}
          <div className="absolute inset-0 flex items-center justify-center text-navy-50 opacity-20">
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Very simplified world map outline - just for visualization */}
              <path
                d="M200,250 Q400,150 600,250 T1000,250 M0,250 Q200,350 400,250 T800,250"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </div>

          {/* Threat points */}
          {data.map((point) => {
            // Convert lat/lng to x/y coordinates for our simplified map
            // This is very approximated for demo purposes
            const x = ((point.lng + 180) / 360) * 100;
            const y = ((90 - point.lat) / 180) * 100;
            const size = Math.max(10, Math.min(30, point.magnitude / 3));

            return (
              <div
                key={point.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                }}
              >
                <div
                  className="rounded-full bg-accent-error/70 animate-pulse"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                  }}
                >
                  <div className="absolute inset-0 bg-accent-error rounded-full animate-ping opacity-75"></div>
                </div>
              </div>
            );
          })}

          {/* Legend */}
          <div className="absolute bottom-2 left-2 bg-navy-100/80 p-2 rounded text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-accent-error rounded-full"></div>
              <span>Attack Source</span>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium">Top Attacks</h4>
          <div className="space-y-1">
            {data.slice(0, 3).map((point) => (
              <div
                key={`detail-${point.id}`}
                className="flex items-center justify-between text-xs"
              >
                <span className="text-muted-foreground">
                  {point.source} → {point.destination}
                </span>
                <span className="text-accent-error">{point.magnitude} attempts</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
