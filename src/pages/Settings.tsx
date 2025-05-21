
import React, { useState } from "react";
import { SidebarNavigation } from "@/components/layout/sidebar-navigation";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Settings,
  User,
  Shield,
  Bell,
  Moon,
  Sun,
  Globe,
  Key,
  Save,
  MailOpen,
  Github,
  Database,
  Upload,
  Download,
  RefreshCw,
  AlertTriangle
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const [currentTab, setCurrentTab] = useState("general");
  const [darkMode, setDarkMode] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoBackups, setAutoBackups] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [apiKey, setApiKey] = useState("sk_live_••••••••••••••••••••••••••");
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveSettings = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Settings Saved",
        description: "Your settings have been updated successfully.",
      });
    }, 1000);
  };

  const handleGenerateApiKey = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setApiKey("sk_live_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
      toast({
        title: "API Key Generated",
        description: "Your new API key has been generated. Keep it secure!",
      });
    }, 1000);
  };

  const handleBackupNow = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Backup Completed",
        description: "System backup completed successfully.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-navy-200 text-foreground flex">
      <SidebarNavigation />
      
      <div className="flex-1 flex flex-col">
        <Header systemStatus="online" />
        
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Settings</h1>
              <p className="text-muted-foreground">Configure system preferences and options</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <Card className="bg-navy-100 border-border sticky top-6">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Settings
                  </CardTitle>
                  <CardDescription>
                    System configuration
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-2">
                  <nav className="space-y-1">
                    <Button 
                      variant={currentTab === "general" ? "secondary" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setCurrentTab("general")}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      General
                    </Button>
                    <Button 
                      variant={currentTab === "notifications" ? "secondary" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setCurrentTab("notifications")}
                    >
                      <Bell className="h-4 w-4 mr-2" />
                      Notifications
                    </Button>
                    <Button 
                      variant={currentTab === "security" ? "secondary" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setCurrentTab("security")}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Security
                    </Button>
                    <Button 
                      variant={currentTab === "profile" ? "secondary" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setCurrentTab("profile")}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                    <Button 
                      variant={currentTab === "api" ? "secondary" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setCurrentTab("api")}
                    >
                      <Key className="h-4 w-4 mr-2" />
                      API Access
                    </Button>
                    <Button 
                      variant={currentTab === "backups" ? "secondary" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setCurrentTab("backups")}
                    >
                      <Database className="h-4 w-4 mr-2" />
                      Backups
                    </Button>
                  </nav>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-3">
              <Card className="bg-navy-100 border-border">
                <CardContent className="p-6">
                  {currentTab === "general" && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-bold mb-4">General Settings</h2>
                        <Separator className="mb-6" />
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="font-medium">Dark Mode</div>
                            <div className="text-sm text-muted-foreground">
                              Toggle between light and dark theme
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Sun className="h-4 w-4 text-muted-foreground" />
                            <Switch 
                              checked={darkMode} 
                              onCheckedChange={setDarkMode} 
                            />
                            <Moon className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-2">
                          <Label htmlFor="language">Language</Label>
                          <div className="flex items-center space-x-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <select 
                              id="language"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <option value="en-US">English (US)</option>
                              <option value="es">Spanish</option>
                              <option value="fr">French</option>
                              <option value="de">German</option>
                              <option value="zh">Chinese</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="timezone">Timezone</Label>
                          <div className="flex items-center space-x-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <select 
                              id="timezone"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <option value="UTC">UTC</option>
                              <option value="EST">Eastern Time (GMT-5)</option>
                              <option value="CST">Central Time (GMT-6)</option>
                              <option value="MST">Mountain Time (GMT-7)</option>
                              <option value="PST">Pacific Time (GMT-8)</option>
                            </select>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-2">
                          <Label htmlFor="date-format">Date Format</Label>
                          <select 
                            id="date-format"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                          </select>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="font-medium">Session Timeout</div>
                            <div className="text-sm text-muted-foreground">
                              Automatically log out after period of inactivity
                            </div>
                          </div>
                          <select 
                            className="flex h-10 w-40 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="15">15 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="60">1 hour</option>
                            <option value="120">2 hours</option>
                            <option value="240">4 hours</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button onClick={handleSaveSettings} disabled={isLoading}>
                          {isLoading ? (
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <Save className="h-4 w-4 mr-2" />
                          )}
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {currentTab === "notifications" && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-bold mb-4">Notification Preferences</h2>
                        <Separator className="mb-6" />
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="font-medium">Enable Notifications</div>
                            <div className="text-sm text-muted-foreground">
                              Receive alerts and system notifications
                            </div>
                          </div>
                          <Switch 
                            checked={notificationsEnabled} 
                            onCheckedChange={setNotificationsEnabled}
                          />
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-6">
                          <h3 className="text-lg font-medium">Notification Channels</h3>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Email Notifications</div>
                              <div className="text-sm text-muted-foreground">
                                Receive important alerts via email
                              </div>
                            </div>
                            <Switch 
                              checked={emailNotifications} 
                              onCheckedChange={setEmailNotifications} 
                              disabled={!notificationsEnabled}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="email-address">Notification Email</Label>
                            <div className="flex items-center space-x-2">
                              <MailOpen className="h-4 w-4 text-muted-foreground" />
                              <Input 
                                id="email-address" 
                                placeholder="your@email.com" 
                                disabled={!notificationsEnabled || !emailNotifications}
                              />
                            </div>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Notification Types</h3>
                          
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <label htmlFor="security-alerts" className="font-medium cursor-pointer">
                                Security Alerts
                              </label>
                              <Switch 
                                id="security-alerts" 
                                defaultChecked={true}
                                disabled={!notificationsEnabled}
                              />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <label htmlFor="system-updates" className="font-medium cursor-pointer">
                                System Updates
                              </label>
                              <Switch 
                                id="system-updates" 
                                defaultChecked={true}
                                disabled={!notificationsEnabled}
                              />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <label htmlFor="user-logins" className="font-medium cursor-pointer">
                                User Login Activity
                              </label>
                              <Switch 
                                id="user-logins" 
                                defaultChecked={true}
                                disabled={!notificationsEnabled}
                              />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <label htmlFor="config-changes" className="font-medium cursor-pointer">
                                Configuration Changes
                              </label>
                              <Switch 
                                id="config-changes" 
                                defaultChecked={true}
                                disabled={!notificationsEnabled}
                              />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <label htmlFor="performance-alerts" className="font-medium cursor-pointer">
                                Performance Alerts
                              </label>
                              <Switch 
                                id="performance-alerts" 
                                defaultChecked={false}
                                disabled={!notificationsEnabled}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button onClick={handleSaveSettings} disabled={isLoading}>
                          {isLoading ? (
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <Save className="h-4 w-4 mr-2" />
                          )}
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {currentTab === "security" && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-bold mb-4">Security Settings</h2>
                        <Separator className="mb-6" />
                      </div>
                      
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Authentication</h3>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Two-Factor Authentication</div>
                              <div className="text-sm text-muted-foreground">
                                Add an extra layer of security to your account
                              </div>
                            </div>
                            <Switch 
                              checked={twoFactorAuth} 
                              onCheckedChange={setTwoFactorAuth}
                            />
                          </div>
                          
                          {twoFactorAuth && (
                            <div className="bg-navy-50 p-4 rounded-md mt-4">
                              <div className="flex items-center mb-2">
                                <AlertTriangle className="h-5 w-5 text-accent-warning mr-2" />
                                <h4 className="font-medium">Setup Required</h4>
                              </div>
                              <p className="text-sm text-muted-foreground mb-4">
                                Two-factor authentication has been enabled but requires additional setup.
                                Please complete the setup process.
                              </p>
                              <Button size="sm">
                                Complete 2FA Setup
                              </Button>
                            </div>
                          )}
                          
                          <div className="space-y-2 pt-2">
                            <Label htmlFor="password">Change Password</Label>
                            <Input 
                              id="current-password" 
                              type="password" 
                              placeholder="Current password" 
                              className="mb-2"
                            />
                            <Input 
                              id="new-password" 
                              type="password" 
                              placeholder="New password" 
                              className="mb-2"
                            />
                            <Input 
                              id="confirm-password" 
                              type="password" 
                              placeholder="Confirm new password" 
                            />
                            <Button className="mt-2" size="sm">
                              Update Password
                            </Button>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Session Security</h3>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Enforce Session Timeout</div>
                              <div className="text-sm text-muted-foreground">
                                Automatically log out after period of inactivity
                              </div>
                            </div>
                            <Switch defaultChecked={true} />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">IP Restriction</div>
                              <div className="text-sm text-muted-foreground">
                                Limit access to specific IP addresses
                              </div>
                            </div>
                            <Switch defaultChecked={false} />
                          </div>
                          
                          <div className="space-y-2 pt-2">
                            <div className="flex justify-between">
                              <Label htmlFor="allowed-ips">Allowed IP Addresses</Label>
                              <Badge variant="outline">Advanced</Badge>
                            </div>
                            <textarea 
                              id="allowed-ips" 
                              placeholder="e.g. 192.168.1.1, 10.0.0.0/24"
                              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button onClick={handleSaveSettings} disabled={isLoading}>
                          {isLoading ? (
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <Save className="h-4 w-4 mr-2" />
                          )}
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {currentTab === "profile" && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
                        <Separator className="mb-6" />
                      </div>
                      
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="h-20 w-20 rounded-full bg-navy-50 flex items-center justify-center">
                          <User className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">Admin User</h3>
                          <p className="text-muted-foreground">Administrator</p>
                          <div className="flex items-center mt-2 space-x-2">
                            <Button size="sm" variant="outline">
                              Change Photo
                            </Button>
                            <Button size="sm" variant="outline" className="text-accent-error border-accent-error hover:bg-accent-error/10">
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">First Name</Label>
                          <Input id="first-name" placeholder="Enter first name" defaultValue="Admin" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last Name</Label>
                          <Input id="last-name" placeholder="Enter last name" defaultValue="User" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="Enter email address" defaultValue="admin@example.com" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="job-title">Job Title</Label>
                        <Input id="job-title" placeholder="Enter job title" defaultValue="System Administrator" />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Connected Accounts</div>
                          <div className="text-sm text-muted-foreground">
                            Link your accounts for easier sign-in
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Github className="h-5 w-5" />
                            <div>
                              <div className="font-medium">GitHub</div>
                              <div className="text-sm text-muted-foreground">
                                Connect your GitHub account
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Connect</Button>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button onClick={handleSaveSettings} disabled={isLoading}>
                          {isLoading ? (
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <Save className="h-4 w-4 mr-2" />
                          )}
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {currentTab === "api" && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-bold mb-4">API Access</h2>
                        <Separator className="mb-6" />
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-navy-50 p-4 rounded-md">
                          <h3 className="font-medium mb-2">API Information</h3>
                          <p className="text-sm text-muted-foreground">
                            Use these credentials to authenticate your API requests. Keep your API key secure and do not share it publicly.
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="api-key">API Key</Label>
                          <div className="flex items-center space-x-2">
                            <Input 
                              id="api-key" 
                              value={apiKey} 
                              readOnly 
                              className="font-mono"
                            />
                            <Button 
                              variant="outline" 
                              onClick={handleGenerateApiKey} 
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <RefreshCw className="h-4 w-4 animate-spin" />
                              ) : (
                                "Generate New"
                              )}
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Last generated: 2025-05-15 09:43:21
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="api-url">API Endpoint</Label>
                          <Input 
                            id="api-url" 
                            value="https://api.securedashboard.com/v1" 
                            readOnly 
                            className="font-mono"
                          />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Access Permissions</h3>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label htmlFor="read-access" className="font-medium cursor-pointer">
                              Read Access
                            </label>
                            <Switch id="read-access" defaultChecked={true} />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <label htmlFor="write-access" className="font-medium cursor-pointer">
                              Write Access
                            </label>
                            <Switch id="write-access" defaultChecked={true} />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <label htmlFor="delete-access" className="font-medium cursor-pointer">
                              Delete Access
                            </label>
                            <Switch id="delete-access" defaultChecked={false} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">API Rate Limits</h3>
                        <div className="bg-navy-50 p-4 rounded-md">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground">Requests / Minute</p>
                              <p className="text-2xl font-bold">60</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground">Requests / Hour</p>
                              <p className="text-2xl font-bold">3,600</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground">Requests / Day</p>
                              <p className="text-2xl font-bold">86,400</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button onClick={handleSaveSettings} disabled={isLoading}>
                          {isLoading ? (
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <Save className="h-4 w-4 mr-2" />
                          )}
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {currentTab === "backups" && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-bold mb-4">Backup & Restore</h2>
                        <Separator className="mb-6" />
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="font-medium">Automatic Backups</div>
                            <div className="text-sm text-muted-foreground">
                              Schedule regular backups of your system configuration
                            </div>
                          </div>
                          <Switch 
                            checked={autoBackups} 
                            onCheckedChange={setAutoBackups}
                          />
                        </div>
                        
                        {autoBackups && (
                          <div className="space-y-2">
                            <Label htmlFor="backup-frequency">Backup Frequency</Label>
                            <select 
                              id="backup-frequency"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <option value="daily">Daily</option>
                              <option value="weekly">Weekly</option>
                              <option value="monthly">Monthly</option>
                            </select>
                          </div>
                        )}
                        
                        <div className="space-y-2">
                          <Label htmlFor="retention-period">Backup Retention Period</Label>
                          <select 
                            id="retention-period"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={!autoBackups}
                          >
                            <option value="7">7 days</option>
                            <option value="30">30 days</option>
                            <option value="90">90 days</option>
                            <option value="365">1 year</option>
                          </select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="storage-location">Backup Storage Location</Label>
                          <Input 
                            id="storage-location" 
                            defaultValue="/var/backups/security" 
                            disabled={!autoBackups}
                          />
                        </div>
                        
                        <div className="flex space-x-3 mt-4">
                          <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={handleBackupNow}
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <Download className="h-4 w-4 mr-2" />
                            )}
                            Backup Now
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Upload className="h-4 w-4 mr-2" />
                            Restore
                          </Button>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Backup History</h3>
                        
                        <div className="rounded-md border border-border">
                          <div className="bg-navy-50 px-4 py-2 border-b border-border grid grid-cols-4 text-sm font-medium">
                            <div>Backup Date</div>
                            <div>Size</div>
                            <div>Type</div>
                            <div className="text-right">Actions</div>
                          </div>
                          <div className="divide-y divide-border">
                            <div className="px-4 py-3 grid grid-cols-4 text-sm">
                              <div>2025-05-21 00:00:00</div>
                              <div>4.2 MB</div>
                              <div>Automated</div>
                              <div className="text-right">
                                <Button variant="link" size="sm" className="h-auto p-0">
                                  Download
                                </Button>
                              </div>
                            </div>
                            <div className="px-4 py-3 grid grid-cols-4 text-sm">
                              <div>2025-05-20 00:00:00</div>
                              <div>4.1 MB</div>
                              <div>Automated</div>
                              <div className="text-right">
                                <Button variant="link" size="sm" className="h-auto p-0">
                                  Download
                                </Button>
                              </div>
                            </div>
                            <div className="px-4 py-3 grid grid-cols-4 text-sm">
                              <div>2025-05-19 12:32:15</div>
                              <div>4.3 MB</div>
                              <div>Manual</div>
                              <div className="text-right">
                                <Button variant="link" size="sm" className="h-auto p-0">
                                  Download
                                </Button>
                              </div>
                            </div>
                            <div className="px-4 py-3 grid grid-cols-4 text-sm">
                              <div>2025-05-19 00:00:00</div>
                              <div>4.1 MB</div>
                              <div>Automated</div>
                              <div className="text-right">
                                <Button variant="link" size="sm" className="h-auto p-0">
                                  Download
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button onClick={handleSaveSettings} disabled={isLoading}>
                          {isLoading ? (
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <Save className="h-4 w-4 mr-2" />
                          )}
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
