
import React, { useState } from "react";
import { SidebarNavigation } from "@/components/layout/sidebar-navigation";
import { Header } from "@/components/layout/header";
import { ThreatLevelIndicator } from "@/components/ui/threat-level-indicator";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Plus, Filter, ArrowUpDown, AlertCircle, Shield, CheckCircle, XCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Sample firewall rules data
const firewallRules = [
  {
    id: 1,
    name: "Block Suspicious IPs",
    source: "Any",
    destination: "192.168.1.0/24",
    port: "Any",
    protocol: "Any",
    action: "Block",
    status: "active",
    lastUpdated: "2025-05-20 14:32:41",
    threatLevel: "high"
  },
  {
    id: 2,
    name: "Allow Internal Traffic",
    source: "10.0.0.0/8",
    destination: "10.0.0.0/8",
    port: "Any",
    protocol: "Any",
    action: "Allow",
    status: "active",
    lastUpdated: "2025-05-19 09:15:22",
    threatLevel: "low"
  },
  {
    id: 3,
    name: "SSH Access",
    source: "Any",
    destination: "192.168.1.5",
    port: "22",
    protocol: "TCP",
    action: "Allow",
    status: "inactive",
    lastUpdated: "2025-05-18 11:43:07",
    threatLevel: "medium"
  },
  {
    id: 4,
    name: "Web Server Rules",
    source: "Any",
    destination: "192.168.1.10",
    port: "80,443",
    protocol: "TCP",
    action: "Allow",
    status: "active",
    lastUpdated: "2025-05-17 16:27:55",
    threatLevel: "low"
  },
  {
    id: 5,
    name: "Block Malicious Domains",
    source: "Any",
    destination: "Any",
    port: "Any",
    protocol: "Any",
    action: "Block",
    status: "active",
    lastUpdated: "2025-05-16 08:19:33",
    threatLevel: "critical"
  }
];

const FirewallRulesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState("table");
  const [showAddRuleDialog, setShowAddRuleDialog] = useState(false);

  const filteredRules = firewallRules.filter(rule => 
    rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Rule Added",
      description: "New firewall rule has been successfully added.",
    });
    setShowAddRuleDialog(false);
  };

  const getStatusIcon = (status: string) => {
    return status === "active" ? (
      <CheckCircle className="h-5 w-5 text-accent-success" />
    ) : (
      <XCircle className="h-5 w-5 text-accent-error" />
    );
  };

  const getActionStyle = (action: string) => {
    return action === "Block" 
      ? "bg-accent-error/20 text-accent-error font-medium px-2 py-0.5 rounded-full text-xs"
      : "bg-accent-success/20 text-accent-success font-medium px-2 py-0.5 rounded-full text-xs";
  };

  return (
    <div className="min-h-screen bg-navy-200 text-foreground flex">
      <SidebarNavigation />
      
      <div className="flex-1 flex flex-col">
        <Header systemStatus="online" />
        
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Firewall Rules</h1>
              <p className="text-muted-foreground">Manage and configure network access policies</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Input
                  placeholder="Search rules..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 pl-10"
                />
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              
              <Dialog open={showAddRuleDialog} onOpenChange={setShowAddRuleDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Rule
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Add New Firewall Rule</DialogTitle>
                    <DialogDescription>
                      Create a new rule to control network traffic
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={handleAddRule} className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="rule-name">Rule Name</Label>
                        <Input id="rule-name" placeholder="Enter rule name" required />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="action">Action</Label>
                        <select id="action" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                          <option value="allow">Allow</option>
                          <option value="block">Block</option>
                          <option value="log">Log Only</option>
                        </select>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="source">Source</Label>
                        <Input id="source" placeholder="IP, Range, or Any" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="destination">Destination</Label>
                        <Input id="destination" placeholder="IP, Range, or Any" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="protocol">Protocol</Label>
                        <select id="protocol" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                          <option value="any">Any</option>
                          <option value="tcp">TCP</option>
                          <option value="udp">UDP</option>
                          <option value="icmp">ICMP</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="port">Port</Label>
                        <Input id="port" placeholder="Port or range" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <select id="status" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-3 pt-4">
                      <Button variant="outline" type="button" onClick={() => setShowAddRuleDialog(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        <Shield className="h-4 w-4 mr-2" />
                        Create Rule
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div className="bg-navy-100 rounded-lg border border-border overflow-hidden">
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
              <div className="border-b border-border px-4 py-2">
                <TabsList className="grid w-[400px] grid-cols-2">
                  <TabsTrigger value="table">Table View</TabsTrigger>
                  <TabsTrigger value="json">JSON View</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="table" className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10 text-center">Status</TableHead>
                      <TableHead>Rule Name</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Port/Protocol</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Threat Level</TableHead>
                      <TableHead className="text-right">Last Updated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRules.length > 0 ? (
                      filteredRules.map((rule) => (
                        <TableRow key={rule.id} className="cursor-pointer hover:bg-navy-50">
                          <TableCell className="text-center">{getStatusIcon(rule.status)}</TableCell>
                          <TableCell className="font-medium">{rule.name}</TableCell>
                          <TableCell>{rule.source}</TableCell>
                          <TableCell>{rule.destination}</TableCell>
                          <TableCell>{rule.port}/{rule.protocol}</TableCell>
                          <TableCell>
                            <span className={getActionStyle(rule.action)}>
                              {rule.action}
                            </span>
                          </TableCell>
                          <TableCell>
                            <ThreatLevelIndicator level={rule.threatLevel as any} />
                          </TableCell>
                          <TableCell className="text-right text-sm text-muted-foreground">{rule.lastUpdated}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <AlertCircle className="h-8 w-8 mb-2" />
                            <p>No rules found matching your search criteria</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="json" className="p-0">
                <div className="h-96 overflow-auto bg-navy-200 font-mono text-sm p-4">
                  <pre>{JSON.stringify(filteredRules, null, 2)}</pre>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FirewallRulesPage;
