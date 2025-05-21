
import React from "react";
import { Check, X, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AIRecommendationProps {
  title: string;
  description: string;
  confidence: number;
  impact: string;
  type: string;
  onApply?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export function AIRecommendationCard({
  title,
  description,
  confidence,
  impact,
  type,
  onApply,
  onDismiss,
  className,
}: AIRecommendationProps) {
  const getConfidenceColor = () => {
    if (confidence >= 90) return "text-accent-success";
    if (confidence >= 70) return "text-accent-blue";
    if (confidence >= 50) return "text-accent-warning";
    return "text-accent-error";
  };

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-3">
          <div className="flex justify-between items-start">
            <h3 className="font-medium">{title}</h3>
            <div className="flex items-center gap-1">
              <span
                className={`text-xs font-semibold rounded-full px-2 py-0.5 bg-secondary ${getConfidenceColor()}`}
              >
                {confidence}%
              </span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>AI confidence score</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">{description}</p>

          <div className="flex items-center gap-3">
            <div className="text-xs px-2 py-0.5 bg-secondary/50 rounded-full">
              {impact} Impact
            </div>
            <div className="text-xs px-2 py-0.5 bg-secondary/50 rounded-full">
              {type}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3"
              onClick={onDismiss}
            >
              <X className="h-4 w-4 mr-1" />
              Dismiss
            </Button>
            <Button
              variant="default"
              size="sm"
              className="h-8 px-3 bg-accent-blue hover:bg-accent-blue/80"
              onClick={onApply}
            >
              <Check className="h-4 w-4 mr-1" />
              Apply
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
