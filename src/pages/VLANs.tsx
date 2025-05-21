
import React, { useState } from "react";
import { SidebarNavigation } from "@/components/layout/sidebar-navigation";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Plus, Network, Server, Laptop, Smartphone, Wifi } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

// Sample VLAN data
const vlans = [
  {
    id: 1,
    name: "Management Network",
    vlanId: 10,
    subnet: "192.168.10.0/24",
    gateway: "192.168.10.1",
    dhcpEnabled: true,
    devices: [
      { id: 1, name: "Core Switch", ip: "192.168.10.2", type: "switch", mac: "00:1A:2B:3C:4D:5E" },
      { id: 2, name: "Network Controller", ip: "192.168.10.3", type: "server", mac: "00:1A:2B:3C:4D:5F" },
      { id: 3, name: "Admin Workstation", ip: "192.168.10.15", type: "desktop", mac: "00:1A:2B:3C:4D:60" },
    ]
  },
  {
    id: 2,
    name: "User Network",
    vlanId: 20,
    subnet: "192.168.20.0/24",
    gateway: "192.168.20.1",
    dhcpEnabled: true,
    devices: [
      { id: 4, name: "Marketing Dept Switch", ip: "192.168.20.2", type: "switch", mac: "00:1A:2B:3C:4D:61" },
      { id: 5, name: "Sales Dept Switch", ip: "192.168.20.3", type: "switch", mac: "00:1A:2B:3C:4D:62" },
      { id: 6, name: "Conference Room AP", ip: "192.168.20.10", type: "ap", mac: "00:1A:2B:3C:4D:63" },
    ]
  },
  {
    id: 3,
    name: "Guest Network",
    vlanId: 30,
    subnet: "192.168.30.0/24",
    gateway: "192.168.30.1",
    dhcpEnabled: true,
    devices: [
      { id: 7, name: "Guest Wifi AP 1", ip: "192.168.30.2", type: "ap", mac: "00:1A:2B:3C:4D:64" },
      { id: 8, name: "Guest Wifi AP 2", ip: "192.168.30.3", type: "ap", mac: "00:1A:2B:3C:4D:65" },
    ]
  },
  {
    id: 4,
    name: "IoT Devices",
    vlanId: 40,
    subnet: "192.168.40.0/24",
    gateway: "192.168.40.1",
    dhcpEnabled: true,
    devices: [
      { id: 9, name: "Security Camera Switch", ip: "192.168.40.2", type: "switch", mac: "00:1A:2B:3C:4D:66" },
      { id: 10, name: "Building Automation Controller", ip: "192.168.40.10", type: "iot", mac: "00:1A:2B:3C:4D:67" },
    ]
  },
  {
    id: 5,
    name: "Server Network",
    vlanId: 50,
    subnet: "192.168.50.0/24",
    gateway: "192.168.50.1",
    dhcpEnabled: false,
    devices: [
      { id: 11, name: "Web Server 1", ip: "192.168.50.10", type: "server", mac: "00:1A:2B:3C:4D:68" },
      { id: 12, name: "Web Server 2", ip: "192.168.50.11", type: "server", mac: "00:1A:2B:3C:4D:69" },
      { id: 13, name: "Database Server", ip: "192.168.50.20", type: "server", mac: "00:1A:2B:3C:4D:6A" },
      { id: 14, name: "File Server", ip: "192.168.50.30", type: "server", mac: "00:1A:2B:3C:4D:6B" },
    ]
  }
];

const VLANsPage = () => {
  const [expandedVlan, setExpandedVlan] = useState<string>("item-1");

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'server':
        return <Server className="h-4 w-4" />;
      case 'desktop':
        return <Laptop className="h-4 w-4" />;
      case 'ap':
        return <Wifi className="h-4 w-4" />;
      case 'iot':
        return <Smartphone className="h-4 w-4" />;
      default:
        return <Network className="h-4 w-4" />;
    }
  };

  const handleAddVlan = () => {
    toast({
      title: "Create New VLAN",
      description: "The VLAN creation wizard will be implemented in a future update."
    });
  };

  return (
    <div className="min-h-screen bg-navy-200 text-foreground flex">
      <SidebarNavigation />
      
      <div className="flex-1 flex flex-col">
        <Header systemStatus="online" />
        
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">VLAN Management</h1>
              <p className="text-muted-foreground">Configure and manage network segmentation</p>
            </div>
            
            <Button onClick={handleAddVlan}>
              <Plus className="h-4 w-4 mr-2" />
              Add VLAN
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="bg-navy-100 border-border h-[750px]">
                <CardHeader className="pb-2">
                  <CardTitle>Network Segmentation Map</CardTitle>
                  <CardDescription>Visual representation of VLANs and their connections</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border border-border bg-navy-200 h-[650px] flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Network className="h-12 w-12 mx-auto mb-4" />
                      <p className="text-lg font-medium">Network Visualization</p>
                      <p className="max-w-md mx-auto mt-2">
                        Interactive network map will be implemented in a future update. This will show VLAN relationships, traffic flows, and device connections.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="bg-navy-100 border-border h-[750px] overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle>VLAN Configuration</CardTitle>
                  <CardDescription>Manage individual VLAN settings</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Accordion 
                    type="single" 
                    collapsible 
                    value={expandedVlan}
                    onValueChange={setExpandedVlan}
                    className="overflow-auto" 
                    style={{ maxHeight: "670px" }}
                  >
                    {vlans.map((vlan, index) => (
                      <AccordionItem key={vlan.id} value={`item-${vlan.id}`}>
                        <AccordionTrigger className="px-4 py-2 hover:bg-navy-50 hover:no-underline">
                          <div className="flex items-center justify-between w-full pr-4">
                            <div className="flex items-center">
                              <Badge variant="outline" className="mr-2 bg-navy-50">
                                VLAN {vlan.vlanId}
                              </Badge>
                              <span>{vlan.name}</span>
                            </div>
                            <Badge className="bg-accent-blue text-white">
                              {vlan.devices.length} Devices
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="border-t border-border bg-navy-200 px-4 py-3">
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <p className="text-muted-foreground">Subnet</p>
                                <p className="font-mono">{vlan.subnet}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Gateway</p>
                                <p className="font-mono">{vlan.gateway}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">DHCP</p>
                                <p>{vlan.dhcpEnabled ? "Enabled" : "Disabled"}</p>
                              </div>
                            </div>
                            
                            <Separator />
                            
                            <div>
                              <h4 className="text-sm font-medium mb-2">Connected Devices</h4>
                              <div className="space-y-2">
                                {vlan.devices.map(device => (
                                  <div 
                                    key={device.id}
                                    className="flex items-center justify-between p-2 rounded-md bg-navy-100 text-sm"
                                  >
                                    <div className="flex items-center">
                                      <div className="p-1 rounded-md bg-navy-50 mr-2">
                                        {getDeviceIcon(device.type)}
                                      </div>
                                      <div>
                                        <p className="font-medium">{device.name}</p>
                                        <p className="text-xs text-muted-foreground font-mono">{device.ip}</p>
                                      </div>
                                    </div>
                                    <div className="text-xs text-muted-foreground font-mono">
                                      {device.mac}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex justify-end space-x-2 pt-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="outline" size="sm" className="text-accent-error border-accent-error hover:bg-accent-error/10">
                                Delete
                              </Button>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VLANsPage;
