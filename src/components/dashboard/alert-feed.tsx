
import React from "react";
import { AlertItem } from "@/components/ui/alert-item";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

interface Alert {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  severity: "low" | "medium" | "high" | "critical";
  source?: string;
}

interface AlertFeedProps {
  alerts: Alert[];
  className?: string;
}

export function AlertFeed({ alerts, className }: AlertFeedProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Alert Feed</CardTitle>
        <Button size="sm" variant="outline" className="h-8">
          View All
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        {alerts.length > 0 ? (
          <div className="divide-y divide-border">
            {alerts.map((alert) => (
              <AlertItem
                key={alert.id}
                title={alert.title}
                description={alert.description}
                timestamp={alert.timestamp}
                severity={alert.severity}
                source={alert.source}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 px-4 text-center text-muted-foreground">
            <Bell className="h-10 w-10 mb-2" />
            <p>No alerts at the moment.</p>
            <p className="text-sm">When alerts occur, they will appear here.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
