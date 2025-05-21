
import React, { useState } from "react";
import { SidebarNavigation } from "@/components/layout/sidebar-navigation";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Card, 
  CardContent,
  CardDescription, 
  CardFooter,
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { ThreatLevelIndicator } from "@/components/ui/threat-level-indicator";
import {
  Zap,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowRight,
  RefreshCw,
  Clock,
  Wifi,
  Server,
  Shield
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Sample AI recommendations data
const recommendations = [
  {
    id: 1,
    title: "Update SSH Configuration",
    description: "Your SSH service is configured to use outdated ciphers that could be vulnerable to attacks.",
    action: "Update SSH configuration to disable legacy ciphers and enforce stronger encryption.",
    confidence: 92,
    impact: "medium",
    category: "security",
    status: "pending"
  },
  {
    id: 2,
    title: "Enable Two-Factor Authentication",
    description: "Several administrator accounts do not have two-factor authentication enabled.",
    action: "Enable 2FA for all administrator accounts to improve security posture.",
    confidence: 98,
    impact: "high",
    category: "security",
    status: "pending"
  },
  {
    id: 3,
    title: "Optimize Firewall Rules",
    description: "Detected 12 redundant firewall rules that can be consolidated for better performance.",
    action: "Consolidate redundant rules to improve firewall processing time.",
    confidence: 87,
    impact: "low",
    category: "optimization",
    status: "pending"
  },
  {
    id: 4,
    title: "Apply Security Patches",
    description: "System is missing recent security patches for OpenSSL (CVE-2025-1234).",
    action: "Apply latest security patches to address known vulnerabilities.",
    confidence: 99,
    impact: "critical",
    category: "security",
    status: "pending"
  },
  {
    id: 5,
    title: "Segment IoT Network",
    description: "IoT devices are currently on the same network as critical systems.",
    action: "Create a separate VLAN for IoT devices to isolate them from critical systems.",
    confidence: 91,
    impact: "high",
    category: "network",
    status: "implemented"
  },
  {
    id: 6,
    title: "Adjust Intrusion Detection Sensitivity",
    description: "Current IDS sensitivity is generating too many false positives.",
    action: "Tune IDS sensitivity parameters to reduce false positive alerts by approximately 35%.",
    confidence: 85,
    impact: "medium",
    category: "optimization",
    status: "dismissed"
  }
];

// Security score metrics
const securityMetrics = [
  { name: "Authentication & Access", score: 78, recommendations: 2 },
  { name: "Network Security", score: 92, recommendations: 1 },
  { name: "System Updates", score: 65, recommendations: 1 },
  { name: "Encryption", score: 88, recommendations: 1 },
  { name: "Data Protection", score: 95, recommendations: 0 },
  { name: "Monitoring & Logging", score: 82, recommendations: 1 }
];

// Security risk factors
const riskFactors = [
  { name: "Missing Security Patches", severity: "high", affectedSystems: 3 },
  { name: "Weak Authentication", severity: "high", affectedSystems: 5 },
  { name: "Insecure Network Configuration", severity: "medium", affectedSystems: 2 },
  { name: "Excessive User Permissions", severity: "medium", affectedSystems: 8 },
  { name: "Unencrypted Data Transfer", severity: "low", affectedSystems: 1 }
];

const InsightsPage = () => {
  const [currentTab, setCurrentTab] = useState("recommendations");
  const [pendingAction, setPendingAction] = useState<number | null>(null);

  const handleImplement = (id: number) => {
    setPendingAction(id);
    setTimeout(() => {
      setPendingAction(null);
      toast({
        title: "Recommendation Implemented",
        description: "The security recommendation has been successfully implemented.",
      });
    }, 1500);
  };

  const handleDismiss = (id: number) => {
    setPendingAction(id);
    setTimeout(() => {
      setPendingAction(null);
      toast({
        title: "Recommendation Dismissed",
        description: "The recommendation has been dismissed and won't appear in your active list.",
      });
    }, 1500);
  };

  const handleRefreshInsights = () => {
    toast({
      description: "AI analysis in progress. This may take a few minutes.",
      duration: 3000,
    });
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'low':
        return (
          <Badge className="bg-accent-success/20 text-accent-success border-transparent flex items-center gap-1">
            <ShieldCheck className="h-3 w-3" /> Low Impact
          </Badge>
        );
      case 'medium':
        return (
          <Badge className="bg-accent-warning/20 text-accent-warning border-transparent flex items-center gap-1">
            <ShieldAlert className="h-3 w-3" /> Medium Impact
          </Badge>
        );
      case 'high':
        return (
          <Badge className="bg-accent-error/20 text-accent-error border-transparent flex items-center gap-1">
            <ShieldX className="h-3 w-3" /> High Impact
          </Badge>
        );
      case 'critical':
        return (
          <Badge className="bg-accent-error border-transparent text-white flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" /> Critical Impact
          </Badge>
        );
      default:
        return <Badge>{impact}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className="border-accent-warning text-accent-warning flex items-center gap-1">
            <Clock className="h-3 w-3" /> Pending
          </Badge>
        );
      case 'implemented':
        return (
          <Badge variant="outline" className="border-accent-success text-accent-success flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> Implemented
          </Badge>
        );
      case 'dismissed':
        return (
          <Badge variant="outline" className="border-muted-foreground text-muted-foreground flex items-center gap-1">
            <XCircle className="h-3 w-3" /> Dismissed
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-accent-success";
    if (score >= 70) return "bg-accent-blue";
    if (score >= 50) return "bg-accent-warning";
    return "bg-accent-error";
  };

  const getSeverityIndicator = (severity: string) => {
    switch (severity) {
      case 'low':
        return <ThreatLevelIndicator level="low" />;
      case 'medium':
        return <ThreatLevelIndicator level="medium" />;
      case 'high':
        return <ThreatLevelIndicator level="high" />;
      case 'critical':
        return <ThreatLevelIndicator level="critical" />;
      default:
        return <Badge>{severity}</Badge>;
    }
  };

  // Calculate overall security score (average of all metrics)
  const overallScore = Math.round(
    securityMetrics.reduce((sum, metric) => sum + metric.score, 0) / securityMetrics.length
  );

  // Get active recommendations (not implemented or dismissed)
  const activeRecommendations = recommendations.filter(rec => rec.status === 'pending');

  return (
    <div className="min-h-screen bg-navy-200 text-foreground flex">
      <SidebarNavigation />
      
      <div className="flex-1 flex flex-col">
        <Header systemStatus="online" />
        
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">AI Insights & Recommendations</h1>
              <p className="text-muted-foreground">AI-powered security analysis and optimization suggestions</p>
            </div>
            
            <Button onClick={handleRefreshInsights}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Analysis
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-3">
              <Card className="bg-navy-100 border-border">
                <div className="border-b border-border">
                  <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
                    <div className="px-6 py-2">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="recommendations">Recommendations ({activeRecommendations.length})</TabsTrigger>
                        <TabsTrigger value="securityScore">Security Score</TabsTrigger>
                        <TabsTrigger value="riskFactors">Risk Factors</TabsTrigger>
                      </TabsList>
                    </div>
                  </Tabs>
                </div>
                
                <CardContent className="p-6">
                  <TabsContent value="recommendations" className="mt-0">
                    <div className="space-y-6">
                      {recommendations.map((rec) => (
                        <Card 
                          key={rec.id} 
                          className={`bg-navy-50 border-border overflow-hidden ${rec.status !== 'pending' ? 'opacity-70' : ''}`}
                        >
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Zap className={`h-5 w-5 ${rec.impact === 'critical' ? 'text-accent-error' : 'text-accent-blue'}`} />
                                <CardTitle className="text-lg">{rec.title}</CardTitle>
                              </div>
                              <div className="flex items-center gap-2">
                                {getImpactBadge(rec.impact)}
                                {getStatusBadge(rec.status)}
                              </div>
                            </div>
                            <CardDescription className="mt-2">{rec.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="pb-0">
                            <div className="bg-navy-100 p-3 rounded-md">
                              <p className="text-sm font-medium mb-1">Recommended Action:</p>
                              <p className="text-sm">{rec.action}</p>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between pt-4 pb-4">
                            <div className="flex items-center">
                              <div className="text-sm text-muted-foreground">AI Confidence:</div>
                              <div className="ml-2 flex items-center">
                                <span className="font-bold">{rec.confidence}%</span>
                                <div className="w-24 h-2 bg-navy-200 rounded-full ml-2 overflow-hidden">
                                  <div 
                                    className={`h-full ${rec.confidence > 90 ? 'bg-accent-success' : 'bg-accent-blue'}`}
                                    style={{ width: `${rec.confidence}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                            
                            {rec.status === 'pending' && (
                              <div className="flex gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  disabled={pendingAction === rec.id}
                                  onClick={() => handleDismiss(rec.id)}
                                >
                                  {pendingAction === rec.id ? (
                                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                  ) : (
                                    <XCircle className="h-4 w-4 mr-2" />
                                  )}
                                  Dismiss
                                </Button>
                                <Button 
                                  size="sm"
                                  disabled={pendingAction === rec.id}
                                  onClick={() => handleImplement(rec.id)}
                                >
                                  {pendingAction === rec.id ? (
                                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                  ) : (
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                  )}
                                  Implement
                                </Button>
                              </div>
                            )}
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="securityScore" className="mt-0">
                    <div className="space-y-6">
                      <Card className="bg-navy-50 border-border">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-center">Overall Security Score</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center">
                          <div className="w-48 h-48 rounded-full border-8 border-navy-100 flex items-center justify-center mb-4 relative">
                            <div 
                              className="absolute inset-0 rounded-full border-8 border-t-accent-blue border-r-accent-blue"
                              style={{ 
                                borderColor: `${getScoreColor(overallScore)} ${getScoreColor(overallScore)} transparent transparent`,
                                transform: `rotate(${45 + (overallScore * 1.8)}deg)`,
                                transition: 'transform 1s ease-in-out'
                              }}
                            ></div>
                            <div className="text-center">
                              <div className="text-5xl font-bold">{overallScore}</div>
                              <div className="text-sm text-muted-foreground">out of 100</div>
                            </div>
                          </div>
                          
                          <div className="text-center mb-6">
                            <p className="text-lg font-medium">
                              {overallScore >= 90 ? 'Excellent' : 
                               overallScore >= 70 ? 'Good' : 
                               overallScore >= 50 ? 'Fair' : 
                               'Poor'} Security Posture
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {activeRecommendations.length > 0 
                                ? `${activeRecommendations.length} active recommendations to improve security`
                                : 'No active recommendations at this time'}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-navy-50 border-border">
                        <CardHeader className="pb-2">
                          <CardTitle>Security Metrics Breakdown</CardTitle>
                          <CardDescription>Individual scores across security domains</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {securityMetrics.map((metric, index) => (
                              <div key={index} className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    <span className="font-medium">{metric.name}</span>
                                    {metric.recommendations > 0 && (
                                      <Badge className="ml-2 bg-accent-blue text-white">
                                        {metric.recommendations} {metric.recommendations === 1 ? 'issue' : 'issues'}
                                      </Badge>
                                    )}
                                  </div>
                                  <span className="font-bold">{metric.score}/100</span>
                                </div>
                                <Progress 
                                  value={metric.score} 
                                  className={`h-2 ${getScoreColor(metric.score)}`} 
                                />
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="riskFactors" className="mt-0">
                    <div className="space-y-6">
                      <Card className="bg-navy-50 border-border">
                        <CardHeader className="pb-2">
                          <CardTitle>Security Risk Assessment</CardTitle>
                          <CardDescription>Identified risk factors in your environment</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {riskFactors.map((risk, index) => (
                              <div key={index} className="p-4 bg-navy-100 rounded-md">
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-3">
                                    {risk.severity === 'high' ? (
                                      <ShieldX className="h-5 w-5 text-accent-error" />
                                    ) : risk.severity === 'medium' ? (
                                      <ShieldAlert className="h-5 w-5 text-accent-warning" />
                                    ) : (
                                      <ShieldCheck className="h-5 w-5 text-accent-success" />
                                    )}
                                    <div>
                                      <div className="font-medium">{risk.name}</div>
                                      <div className="text-sm text-muted-foreground">
                                        Affects {risk.affectedSystems} {risk.affectedSystems === 1 ? 'system' : 'systems'}
                                      </div>
                                    </div>
                                  </div>
                                  {getSeverityIndicator(risk.severity)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-navy-50 border-border">
                        <CardHeader className="pb-2">
                          <CardTitle>Risk Mitigation Plan</CardTitle>
                          <CardDescription>AI-generated plan to address identified risks</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="p-4 bg-navy-100 rounded-md">
                              <h3 className="font-medium mb-2 flex items-center">
                                <Shield className="h-5 w-5 mr-2 text-accent-blue" />
                                Short-term Actions (0-30 days)
                              </h3>
                              <ul className="ml-6 space-y-2 list-disc">
                                <li>Apply all missing security patches</li>
                                <li>Enable multi-factor authentication for all admin accounts</li>
                                <li>Review and revoke excessive user permissions</li>
                              </ul>
                            </div>
                            
                            <div className="p-4 bg-navy-100 rounded-md">
                              <h3 className="font-medium mb-2 flex items-center">
                                <Server className="h-5 w-5 mr-2 text-accent-blue" />
                                Medium-term Actions (30-90 days)
                              </h3>
                              <ul className="ml-6 space-y-2 list-disc">
                                <li>Implement network segmentation for IoT devices</li>
                                <li>Review and update firewall rules</li>
                                <li>Update encryption protocols for data transfer</li>
                              </ul>
                            </div>
                            
                            <div className="p-4 bg-navy-100 rounded-md">
                              <h3 className="font-medium mb-2 flex items-center">
                                <Wifi className="h-5 w-5 mr-2 text-accent-blue" />
                                Long-term Strategy (90+ days)
                              </h3>
                              <ul className="ml-6 space-y-2 list-disc">
                                <li>Implement continuous security monitoring</li>
                                <li>Deploy advanced threat protection</li>
                                <li>Develop security awareness training program</li>
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-2">
                          <Button className="ml-auto">
                            View Full Security Report
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </TabsContent>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="bg-navy-100 border-border sticky top-6">
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-accent-blue" />
                    <div>
                      <CardTitle>AI Assistant</CardTitle>
                      <CardDescription>Security insights</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-navy-50 rounded-md">
                      <h3 className="font-medium mb-2">Security Summary</h3>
                      <p className="text-sm">
                        Your network has <span className="font-bold text-accent-warning">{activeRecommendations.length} active issues</span> that 
                        require attention. The most critical is related to missing security patches.
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-2">Protection Status</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Firewall</span>
                          <Badge variant="outline" className="border-accent-success text-accent-success">Protected</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Intrusion Prevention</span>
                          <Badge variant="outline" className="border-accent-success text-accent-success">Protected</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">End-to-End Encryption</span>
                          <Badge variant="outline" className="border-accent-warning text-accent-warning">Partial</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Authentication</span>
                          <Badge variant="outline" className="border-accent-error text-accent-error">At Risk</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-2">Recent Activity</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-accent-blue"></div>
                          <p className="text-muted-foreground">AI analysis completed (10 min ago)</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-accent-success"></div>
                          <p className="text-muted-foreground">IoT VLAN recommendation implemented (2 hrs ago)</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-accent-warning"></div>
                          <p className="text-muted-foreground">New security vulnerability detected (5 hrs ago)</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <Button variant="outline" className="w-full">
                        Chat with Security AI
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InsightsPage;
