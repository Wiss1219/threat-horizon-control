
import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TrafficChartProps {
  data: {
    inbound: number[];
    outbound: number[];
    labels: string[];
  };
  className?: string;
}

export function TrafficChart({ data, className }: TrafficChartProps) {
  // Transform the data into the format recharts expects
  const chartData = data.labels.map((label, i) => ({
    name: label,
    inbound: data.inbound[i],
    outbound: data.outbound[i],
  }));

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Network Traffic</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="inboundGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00BFFF" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#00BFFF" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="outboundGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00FFB0" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#00FFB0" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                stroke="#64748b"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis
                stroke="#64748b"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
              />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2B2E38" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1C1D26",
                  borderColor: "#2B2E38",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                }}
                itemStyle={{ color: "#f8fafc" }}
              />
              <Area
                type="monotone"
                dataKey="inbound"
                stroke="#00BFFF"
                fillOpacity={1}
                fill="url(#inboundGradient)"
                name="Inbound"
              />
              <Area
                type="monotone"
                dataKey="outbound"
                stroke="#00FFB0"
                fillOpacity={1}
                fill="url(#outboundGradient)"
                name="Outbound"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-4 mt-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-accent-blue" />
            <span className="text-xs">Inbound</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-accent-success" />
            <span className="text-xs">Outbound</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
