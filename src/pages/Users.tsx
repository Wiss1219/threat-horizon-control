
import React, { useState } from "react";
import { SidebarNavigation } from "@/components/layout/sidebar-navigation";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Plus,
  Search,
  Shield,
  UserPlus,
  Users,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Filter
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Sample users data
const users = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    role: "Administrator",
    status: "active",
    lastActive: "2025-05-21 13:45:22",
    permissions: ["full_access", "user_management", "firewall_rules", "system_config"]
  },
  {
    id: 2,
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    role: "Network Engineer",
    status: "active",
    lastActive: "2025-05-21 10:12:05",
    permissions: ["view_all", "firewall_rules", "system_config"]
  },
  {
    id: 3,
    name: "Miguel Rodriguez",
    email: "miguel.rodriguez@example.com",
    role: "Security Analyst",
    status: "active",
    lastActive: "2025-05-20 16:38:47",
    permissions: ["view_all", "threat_analysis", "log_access"]
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    role: "Help Desk",
    status: "active",
    lastActive: "2025-05-19 09:22:31",
    permissions: ["view_basic", "log_access"]
  },
  {
    id: 5,
    name: "David Kim",
    email: "david.kim@example.com",
    role: "IT Manager",
    status: "pending",
    lastActive: "Never",
    permissions: ["view_all", "user_management"]
  },
  {
    id: 6,
    name: "Jennifer Smith",
    email: "jennifer.smith@example.com",
    role: "Contractor",
    status: "inactive",
    lastActive: "2025-05-10 11:30:59",
    permissions: ["view_basic"]
  }
];

// All available permissions
const allPermissions = [
  { id: "full_access", label: "Full System Access" },
  { id: "user_management", label: "User Management" },
  { id: "firewall_rules", label: "Firewall Rules" },
  { id: "system_config", label: "System Configuration" },
  { id: "threat_analysis", label: "Threat Analysis" },
  { id: "log_access", label: "Log Access" },
  { id: "view_all", label: "View All" },
  { id: "view_basic", label: "Basic View" },
];

// Available roles
const roles = [
  "Administrator",
  "Network Engineer",
  "Security Analyst",
  "IT Manager",
  "Help Desk",
  "Contractor",
  "Auditor"
];

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole ? user.role === selectedRole : true;
    return matchesSearch && matchesRole;
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "User Added",
      description: "New user has been successfully added to the system.",
    });
    setShowAddUserDialog(false);
    setSelectedPermissions([]);
  };

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setSelectedPermissions(user.permissions);
  };

  const handleCloseUserDetails = () => {
    setSelectedUser(null);
    setSelectedPermissions([]);
  };

  const handleUpdateUserStatus = (userId: number, newStatus: string) => {
    toast({
      title: "User Status Updated",
      description: `User status has been changed to ${newStatus}.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-accent-success/20 text-accent-success border-transparent flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> Active
          </Badge>
        );
      case 'inactive':
        return (
          <Badge className="bg-accent-error/20 text-accent-error border-transparent flex items-center gap-1">
            <XCircle className="h-3 w-3" /> Inactive
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-accent-warning/20 text-accent-warning border-transparent flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" /> Pending
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Administrator':
        return <Badge className="bg-accent-blue text-white">{role}</Badge>;
      case 'Network Engineer':
      case 'Security Analyst':
      case 'IT Manager':
        return <Badge className="bg-primary">{role}</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-navy-200 text-foreground flex">
      <SidebarNavigation />
      
      <div className="flex-1 flex flex-col">
        <Header systemStatus="online" />
        
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">User Management</h1>
              <p className="text-muted-foreground">Manage system users and permissions</p>
            </div>
            
            <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                    Create a new user account with specific role and permissions
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleAddUser} className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Enter full name" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="Enter email address" required />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <select id="role" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        {roles.map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="status">Initial Status</Label>
                      <select id="status" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option value="active">Active</option>
                        <option value="pending">Pending Approval</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Permissions</Label>
                    <div className="border rounded-md p-4 max-h-40 overflow-y-auto">
                      <div className="grid grid-cols-2 gap-2">
                        {allPermissions.map(permission => (
                          <div key={permission.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`permission-${permission.id}`}
                              checked={selectedPermissions.includes(permission.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedPermissions([...selectedPermissions, permission.id]);
                                } else {
                                  setSelectedPermissions(selectedPermissions.filter(p => p !== permission.id));
                                }
                              }}
                            />
                            <label 
                              htmlFor={`permission-${permission.id}`}
                              className="text-sm font-medium leading-none cursor-pointer"
                            >
                              {permission.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <textarea 
                      id="notes" 
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[80px]"
                      placeholder="Add any additional notes about this user"
                    />
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline" type="button" onClick={() => setShowAddUserDialog(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      <Plus className="h-4 w-4 mr-2" />
                      Create User
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-3">
              <Card className="bg-navy-100 border-border">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <Users className="h-5 w-5 mr-2" /> 
                        System Users
                      </CardTitle>
                      <CardDescription>Manage user accounts and access</CardDescription>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search users..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-64 pl-10"
                        />
                      </div>
                      
                      <select 
                        className="rounded-md border border-input bg-background h-10 px-3 py-2 text-sm"
                        value={selectedRole || ""}
                        onChange={(e) => setSelectedRole(e.target.value || null)}
                      >
                        <option value="">All Roles</option>
                        {roles.map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map(user => (
                        <TableRow key={user.id} className="cursor-pointer hover:bg-navy-50">
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarFallback className="bg-accent-blue text-white">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-muted-foreground">{user.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{getRoleBadge(user.role)}</TableCell>
                          <TableCell>{getStatusBadge(user.status)}</TableCell>
                          <TableCell className="text-sm">{user.lastActive}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleViewUser(user)}
                              >
                                View
                              </Button>
                              {user.status === 'active' ? (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-accent-error hover:text-accent-error"
                                  onClick={() => handleUpdateUserStatus(user.id, 'inactive')}
                                >
                                  Deactivate
                                </Button>
                              ) : user.status === 'inactive' ? (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-accent-success hover:text-accent-success"
                                  onClick={() => handleUpdateUserStatus(user.id, 'active')}
                                >
                                  Activate
                                </Button>
                              ) : (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-accent-warning hover:text-accent-warning"
                                  onClick={() => handleUpdateUserStatus(user.id, 'active')}
                                >
                                  Approve
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="bg-navy-100 border-border sticky top-6">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" /> 
                    Role Permissions
                  </CardTitle>
                  <CardDescription>Permission matrix for roles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {roles.slice(0, 4).map(role => (
                          <div key={role} className="flex items-center space-x-2">
                            <Checkbox id={`role-${role}`} />
                            <label 
                              htmlFor={`role-${role}`}
                              className="text-sm font-medium leading-none cursor-pointer"
                            >
                              {role}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-2 rounded-md bg-navy-50 text-sm text-center">
                      <p>Role permissions matrix will be expanded in a future update.</p>
                    </div>
                    
                    <div className="border-t border-border pt-4">
                      <h4 className="font-medium text-sm mb-2">Quick Actions</h4>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Plus className="h-4 w-4 mr-2" />
                          Create New Role
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Filter className="h-4 w-4 mr-2" />
                          Manage Permissions
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {selectedUser && (
            <Dialog open={!!selectedUser} onOpenChange={() => handleCloseUserDetails()}>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>User Details</DialogTitle>
                  <DialogDescription>
                    View and manage user information
                  </DialogDescription>
                </DialogHeader>
                
                <div className="py-4">
                  <div className="flex items-center space-x-4 mb-6">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="text-xl bg-accent-blue text-white">
                        {selectedUser.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-bold">{selectedUser.name}</h3>
                      <p className="text-muted-foreground">{selectedUser.email}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        {getRoleBadge(selectedUser.role)}
                        {getStatusBadge(selectedUser.status)}
                      </div>
                    </div>
                  </div>
                  
                  <Tabs defaultValue="permissions">
                    <TabsList className="w-full grid grid-cols-3">
                      <TabsTrigger value="permissions">Permissions</TabsTrigger>
                      <TabsTrigger value="activity">Activity</TabsTrigger>
                      <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="permissions" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label>User Permissions</Label>
                        <div className="border rounded-md p-4 max-h-60 overflow-y-auto">
                          <div className="grid grid-cols-2 gap-2">
                            {allPermissions.map(permission => (
                              <div key={permission.id} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`view-permission-${permission.id}`}
                                  checked={selectedPermissions.includes(permission.id)}
                                  disabled
                                />
                                <label 
                                  htmlFor={`view-permission-${permission.id}`}
                                  className="text-sm font-medium leading-none"
                                >
                                  {permission.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-3 pt-4">
                        <Button variant="outline" onClick={handleCloseUserDetails}>
                          Close
                        </Button>
                        <Button>
                          Edit Permissions
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="activity" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <p className="text-center text-muted-foreground py-8">
                          User activity tracking will be implemented in a future update.
                        </p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="settings" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <p className="text-center text-muted-foreground py-8">
                          User settings will be implemented in a future update.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </main>
      </div>
    </div>
  );
};

export default UsersPage;
