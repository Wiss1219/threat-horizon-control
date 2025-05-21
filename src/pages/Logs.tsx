
import React, { useState } from "react";
import { SidebarNavigation } from "@/components/layout/sidebar-navigation";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent,
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { ThreatLevelIndicator } from "@/components/ui/threat-level-indicator";
import {
  FileText,
  Shield,
  AlertTriangle,
  AlertCircle,
  Info,
  CalendarClock,
  Download,
  Search,
  Filter,
  Check,
  X,
  RefreshCw
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Sample log data
const systemLogs = [
  {
    id: 1,
    timestamp: "2025-05-21 14:32:18",
    type: "system",
    level: "info",
    source: "System",
    message: "System backup completed successfully",
    details: "Backup stored at /var/backups/security-2025-05-21.tar.gz"
  },
  {
    id: 2,
    timestamp: "2025-05-21 13:15:44",
    type: "system",
    level: "warning",
    source: "Hardware",
    message: "CPU temperature reaching threshold",
    details: "Current temperature: 78°C, Threshold: 85°C"
  },
  {
    id: 3,
    timestamp: "2025-05-21 10:08:30",
    type: "system",
    level: "error",
    source: "Storage",
    message: "Disk space critically low",
    details: "Available space: 2.3GB, Required: 5GB minimum"
  },
  {
    id: 4,
    timestamp: "2025-05-21 08:45:12",
    type: "system",
    level: "info",
    source: "Updates",
    message: "System updated to version 4.2.1",
    details: "Security patches and performance improvements applied"
  },
  {
    id: 5,
    timestamp: "2025-05-20 23:12:09",
    type: "system",
    level: "warning",
    source: "Network",
    message: "Network interface eth0 experiencing packet loss",
    details: "Current packet loss: 3.5%, Threshold: 2.0%"
  }
];

const securityLogs = [
  {
    id: 1,
    timestamp: "2025-05-21 14:28:36",
    type: "security",
    level: "critical",
    source: "Firewall",
    message: "Multiple failed SSH login attempts detected",
    details: "Source IP: 203.0.113.42, Attempts: 32, Time period: 5 minutes",
    threatLevel: "critical"
  },
  {
    id: 2,
    timestamp: "2025-05-21 13:42:15",
    type: "security",
    level: "high",
    source: "IDS",
    message: "Possible SQL injection attempt detected",
    details: "Source IP: 198.51.100.78, Target: /admin/login.php",
    threatLevel: "high"
  },
  {
    id: 3,
    timestamp: "2025-05-21 12:30:51",
    type: "security",
    level: "medium",
    source: "Authentication",
    message: "Failed login to admin portal",
    details: "Username: admin, Source IP: 192.168.1.105, Location: Internal Network",
    threatLevel: "medium"
  },
  {
    id: 4,
    timestamp: "2025-05-21 11:15:23",
    type: "security",
    level: "low",
    source: "SSL/TLS",
    message: "Weak cipher detected in client connection",
    details: "Client IP: 192.168.1.56, Cipher: TLS_RSA_WITH_AES_128_CBC_SHA",
    threatLevel: "low"
  },
  {
    id: 5,
    timestamp: "2025-05-21 09:05:48",
    type: "security",
    level: "critical",
    source: "Firewall",
    message: "Port scan detected from external source",
    details: "Source IP: 203.0.113.100, Ports scanned: 22,80,443,3389,8080",
    threatLevel: "high"
  }
];

const userLogs = [
  {
    id: 1,
    timestamp: "2025-05-21 14:15:32",
    type: "user",
    level: "info",
    source: "User Management",
    message: "New user account created",
    details: "User: john.doe@example.com, Role: Network Engineer"
  },
  {
    id: 2,
    timestamp: "2025-05-21 13:22:18",
    type: "user",
    level: "info",
    source: "User Management",
    message: "User role updated",
    details: "User: sarah.chen@example.com, Old role: Help Desk, New role: Network Engineer"
  },
  {
    id: 3,
    timestamp: "2025-05-21 11:48:05",
    type: "user",
    level: "warning",
    source: "Authentication",
    message: "Password reset requested",
    details: "User: alex.johnson@example.com, IP: 192.168.1.105"
  },
  {
    id: 4,
    timestamp: "2025-05-21 10:30:41",
    type: "user",
    level: "error",
    source: "Policy Control",
    message: "User attempted unauthorized action",
    details: "User: emma.wilson@example.com, Action: Delete firewall rule, Permission: Denied"
  },
  {
    id: 5,
    timestamp: "2025-05-21 09:15:22",
    type: "user",
    level: "info",
    source: "User Activity",
    message: "User logged in successfully",
    details: "User: david.kim@example.com, IP: 192.168.1.120, Browser: Chrome 125.0"
  }
];

const LogsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState("security");
  const [dateRange, setDateRange] = useState("today");
  const [levelFilter, setLevelFilter] = useState("all");

  const handleExportLogs = () => {
    toast({
      title: "Logs Export Started",
      description: "Your logs are being prepared for download as CSV.",
    });
  };

  const handleRefreshLogs = () => {
    toast({
      description: "Logs refreshed successfully",
      duration: 2000,
    });
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'info':
        return (
          <Badge className="bg-accent-blue/20 text-accent-blue border-transparent flex items-center gap-1">
            <Info className="h-3 w-3" /> Info
          </Badge>
        );
      case 'warning':
        return (
          <Badge className="bg-accent-warning/20 text-accent-warning border-transparent flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" /> Warning
          </Badge>
        );
      case 'error':
        return (
          <Badge className="bg-accent-error/20 text-accent-error border-transparent flex items-center gap-1">
            <X className="h-3 w-3" /> Error
          </Badge>
        );
      case 'critical':
        return (
          <Badge className="bg-accent-error/20 text-accent-error border-transparent flex items-center gap-1">
            <AlertCircle className="h-3 w-3" /> Critical
          </Badge>
        );
      case 'success':
        return (
          <Badge className="bg-accent-success/20 text-accent-success border-transparent flex items-center gap-1">
            <Check className="h-3 w-3" /> Success
          </Badge>
        );
      case 'low':
      case 'medium':
      case 'high':
        return <ThreatLevelIndicator level={level as any} />;
      default:
        return <Badge>{level}</Badge>;
    }
  };

  // Filter logs based on search term, date range and level
  const getFilteredLogs = () => {
    let logs;
    
    switch (currentTab) {
      case 'system':
        logs = systemLogs;
        break;
      case 'security':
        logs = securityLogs;
        break;
      case 'user':
        logs = userLogs;
        break;
      default:
        logs = [...securityLogs, ...systemLogs, ...userLogs];
    }
    
    return logs.filter(log => {
      const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           log.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           log.details.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
      
      // For simplicity, we're not implementing actual date filtering here
      return matchesSearch && matchesLevel;
    });
  };

  const filteredLogs = getFilteredLogs();

  return (
    <div className="min-h-screen bg-navy-200 text-foreground flex">
      <SidebarNavigation />
      
      <div className="flex-1 flex flex-col">
        <Header systemStatus="online" />
        
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">System Logs</h1>
              <p className="text-muted-foreground">View and analyze system, security, and user activity logs</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleRefreshLogs}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" onClick={handleExportLogs}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-3">
              <Card className="bg-navy-100 border-border">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      <div>
                        <CardTitle>Log Explorer</CardTitle>
                        <CardDescription>Browse and filter system logs</CardDescription>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search logs..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-64 pl-10"
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="border-b border-border">
                    <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
                      <div className="px-6 py-2">
                        <TabsList className="grid w-full grid-cols-4">
                          <TabsTrigger value="security">Security</TabsTrigger>
                          <TabsTrigger value="system">System</TabsTrigger>
                          <TabsTrigger value="user">User Activity</TabsTrigger>
                          <TabsTrigger value="all">All Logs</TabsTrigger>
                        </TabsList>
                      </div>
                    </Tabs>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[180px]">Timestamp</TableHead>
                        <TableHead className="w-[100px]">Level</TableHead>
                        <TableHead className="w-[120px]">Source</TableHead>
                        <TableHead>Message</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLogs.length > 0 ? (
                        filteredLogs.map((log) => (
                          <TableRow 
                            key={`${log.type}-${log.id}`} 
                            className="cursor-pointer hover:bg-navy-50"
                            onClick={() => toast({
                              title: "Log Details",
                              description: log.details,
                            })}
                          >
                            <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                            <TableCell>{getLevelBadge(log.level)}</TableCell>
                            <TableCell>{log.source}</TableCell>
                            <TableCell>{log.message}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-8">
                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                              <AlertCircle className="h-8 w-8 mb-2" />
                              <p>No logs found matching your search criteria</p>
                              <Button 
                                variant="link" 
                                className="mt-2"
                                onClick={() => {
                                  setSearchTerm("");
                                  setLevelFilter("all");
                                }}
                              >
                                Clear filters
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="bg-navy-100 border-border sticky top-6">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Filter className="h-5 w-5 mr-2" />
                    Filters
                  </CardTitle>
                  <CardDescription>Refine log results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Date Range</label>
                      <select 
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                      >
                        <option value="today">Today</option>
                        <option value="yesterday">Yesterday</option>
                        <option value="week">Last 7 days</option>
                        <option value="month">Last 30 days</option>
                        <option value="custom">Custom Range</option>
                      </select>
                    </div>
                    
                    {dateRange === 'custom' && (
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Start Date</label>
                          <Input type="date" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">End Date</label>
                          <Input type="date" />
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Log Level</label>
                      <select 
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={levelFilter}
                        onChange={(e) => setLevelFilter(e.target.value)}
                      >
                        <option value="all">All Levels</option>
                        <option value="info">Info</option>
                        <option value="warning">Warning</option>
                        <option value="error">Error</option>
                        <option value="critical">Critical</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Sources</label>
                      <div className="p-3 rounded-md bg-navy-50 text-sm">
                        <div className="flex items-center space-x-2 mb-2">
                          <input type="checkbox" id="source-firewall" className="rounded text-accent-blue" checked />
                          <label htmlFor="source-firewall">Firewall</label>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <input type="checkbox" id="source-ids" className="rounded text-accent-blue" checked />
                          <label htmlFor="source-ids">IDS/IPS</label>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <input type="checkbox" id="source-auth" className="rounded text-accent-blue" checked />
                          <label htmlFor="source-auth">Authentication</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="source-system" className="rounded text-accent-blue" checked />
                          <label htmlFor="source-system">System</label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-2 flex justify-between">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          setSearchTerm("");
                          setLevelFilter("all");
                          setDateRange("today");
                        }}
                      >
                        Reset
                      </Button>
                      <Button size="sm">Apply Filters</Button>
                    </div>
                    
                    <div className="border-t border-border pt-4">
                      <h4 className="font-medium text-sm mb-2">Quick Actions</h4>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Shield className="h-4 w-4 mr-2" />
                          Security Analysis
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <CalendarClock className="h-4 w-4 mr-2" />
                          Schedule Report
                        </Button>
                      </div>
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

export default LogsPage;
