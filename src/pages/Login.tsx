
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Shield, Mail, Lock, ArrowRight, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signIn(email, password);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signUp(email, password);
      // Stay on the login tab after signup to let user log in
      // Note: In a real app with email verification, you might show a different UI here
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Left side - Background and branding */}
      <div className="hidden md:flex md:w-1/2 bg-navy-100 p-8 flex-col justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-accent-blue" />
          <span className="text-2xl font-bold text-white">SecureDashboard</span>
        </div>
        
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-white">Secure Network Management</h1>
          <p className="text-lg text-gray-300">
            Monitor, analyze, and secure your network infrastructure with our advanced dashboard.
          </p>
          <div className="flex gap-4">
            <div className="p-4 rounded-lg bg-navy-50 border border-navy-200 w-32">
              <h3 className="text-accent-blue font-medium">Real-time</h3>
              <p className="text-sm text-gray-300">Threat detection</p>
            </div>
            <div className="p-4 rounded-lg bg-navy-50 border border-navy-200 w-32">
              <h3 className="text-accent-success font-medium">AI-powered</h3>
              <p className="text-sm text-gray-300">Security analysis</p>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-gray-400">© 2025 SecureDashboard. All rights reserved.</p>
      </div>
      
      {/* Right side - Auth form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Logo for mobile */}
          <div className="flex justify-center mb-8 md:hidden">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-accent-blue" />
              <span className="text-2xl font-bold">SecureDashboard</span>
            </div>
          </div>
          
          <Card className="border-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-center">Welcome Back</CardTitle>
            </CardHeader>
            
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid grid-cols-2 mb-4 mx-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email-login"
                          type="email"
                          placeholder="Email"
                          className="pl-10"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password-login"
                          type="password"
                          placeholder="Password"
                          className="pl-10"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <div className="absolute right-3 top-2.5">
                          <Link to="/forgot-password" className="text-xs text-accent-blue hover:underline">
                            Forgot?
                          </Link>
                        </div>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Signing in..." : (
                        <>
                          Sign in <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="register">
                <CardContent>
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email-register"
                          type="email"
                          placeholder="Email"
                          className="pl-10"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password-register"
                          type="password"
                          placeholder="Password (min. 6 characters)"
                          className="pl-10"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          minLength={6}
                        />
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating account..." : (
                        <>
                          Create account <User className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </TabsContent>
            </Tabs>
            
            <CardFooter className="flex-col text-center text-sm pt-0">
              <div className="w-full border-t border-border my-3"></div>
              <p className="text-muted-foreground">
                By continuing, you agree to our{" "}
                <Link to="/terms" className="text-accent-blue hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-accent-blue hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
