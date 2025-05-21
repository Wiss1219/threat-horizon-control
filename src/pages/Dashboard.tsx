
import React from "react";
import { SidebarNavigation } from "@/components/layout/sidebar-navigation";
import { Header } from "@/components/layout/header";
import { CircularProgress } from "@/components/ui/circular-progress";
import { Sparkline } from "@/components/ui/sparkline";
import { StatCard } from "@/components/ui/stat-card";
import { ThreatLevelIndicator } from "@/components/ui/threat-level-indicator";
import { TrafficChart } from "@/components/dashboard/traffic-chart";
import { AlertFeed } from "@/components/dashboard/alert-feed";
import { ThreatMap } from "@/components/dashboard/threat-map";
import { AIRecommendationCard } from "@/components/dashboard/ai-recommendation-card";
import { Activity, Users, Upload, Download, Package } from "lucide-react";
import { 
  alertData, 
  cpuUsage, 
  generateTimeSeries, 
  memoryUsage, 
  activeConnections, 
  packetLoss, 
  trafficData, 
  threatMapData,
  aiRecommendations
} from "@/components/demo-data";
import { useToast } from "@/hooks/use-toast";

const DashboardPage = () => {
  const { toast } = useToast();

  const handleApplyRecommendation = (id: string, title: string) => {
    toast({
      title: "Recommendation Applied",
      description: `Successfully applied: ${title}`,
    });
  };

  const handleDismissRecommendation = (id: string) => {
    toast({
      title: "Recommendation Dismissed",
      description: "Recommendation has been dismissed.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen flex bg-navy-200">
      <SidebarNavigation />
      
      <div className="flex-1 flex flex-col lg:ml-64">
        <Header systemStatus="online" />
        
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="flex flex-col gap-6">
            {/* Page header */}
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Network security monitoring and insights
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="CPU Usage"
                value={
                  <CircularProgress
                    value={cpuUsage}
                    max={100}
                    label="CPU"
                    className="mx-auto"
                  />
                }
              />
              
              <StatCard
                title="Memory Usage"
                value={
                  <CircularProgress
                    value={memoryUsage}
                    max={100}
                    label="RAM"
                    className="mx-auto"
                  />
                }
              />
              
              <StatCard
                title="Active Connections"
                value={activeConnections.toLocaleString()}
                icon={<Activity className="h-5 w-5" />}
                trend={{ value: 12, isPositive: true }}
                footer={
                  <Sparkline 
                    data={generateTimeSeries(20, 50, 20)} 
                    width={150} 
                    color="#00BFFF"
                    className="mx-auto"
                  />
                }
              />
              
              <StatCard
                title="Threat Level"
                value={<ThreatLevelIndicator level="medium" className="justify-center" />}
                icon={<Users className="h-5 w-5" />}
              />
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Traffic chart - spans 2 columns on larger screens */}
              <TrafficChart 
                data={trafficData}
                className="lg:col-span-2"
              />
              
              {/* Alert feed */}
              <AlertFeed 
                alerts={alertData}
                className="lg:col-span-1"
              />

              {/* Threat map */}
              <ThreatMap 
                data={threatMapData}
                className="lg:col-span-2"
              />
              
              {/* AI Recommendations */}
              <div className="lg:col-span-1 space-y-4">
                <h3 className="font-semibold">AI Recommendations</h3>
                <div className="space-y-4">
                  {aiRecommendations.map(recommendation => (
                    <AIRecommendationCard
                      key={recommendation.id}
                      title={recommendation.title}
                      description={recommendation.description}
                      confidence={recommendation.confidence}
                      impact={recommendation.impact}
                      type={recommendation.type}
                      onApply={() => handleApplyRecommendation(recommendation.id, recommendation.title)}
                      onDismiss={() => handleDismissRecommendation(recommendation.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
