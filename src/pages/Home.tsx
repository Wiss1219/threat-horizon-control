
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, ChevronRight, Server, Lock, LineChart, Users } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-navy-100">
      {/* Hero section */}
      <section className="pt-20 pb-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2">
              <Shield className="h-10 w-10 text-accent-blue" />
              <span className="text-3xl font-bold">SecureDashboard</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Enterprise Network Security Management
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Secure, monitor, and optimize your network infrastructure with our comprehensive security dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="w-full sm:w-auto">
                Sign In <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Request Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-navy-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Comprehensive Network Security Suite
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-navy-100 p-6 rounded-lg border border-border">
              <Server className="h-10 w-10 text-accent-blue mb-4" />
              <h3 className="text-xl font-bold mb-2">Network Monitoring</h3>
              <p className="text-muted-foreground">
                Real-time traffic analysis and threat detection to keep your infrastructure secure.
              </p>
            </div>
            
            <div className="bg-navy-100 p-6 rounded-lg border border-border">
              <Lock className="h-10 w-10 text-accent-blue mb-4" />
              <h3 className="text-xl font-bold mb-2">Firewall Management</h3>
              <p className="text-muted-foreground">
                Centralized control of all firewall rules across your enterprise network.
              </p>
            </div>
            
            <div className="bg-navy-100 p-6 rounded-lg border border-border">
              <LineChart className="h-10 w-10 text-accent-blue mb-4" />
              <h3 className="text-xl font-bold mb-2">Advanced Analytics</h3>
              <p className="text-muted-foreground">
                Gain insights with AI-powered analysis of network traffic patterns.
              </p>
            </div>
            
            <div className="bg-navy-100 p-6 rounded-lg border border-border">
              <Users className="h-10 w-10 text-accent-blue mb-4" />
              <h3 className="text-xl font-bold mb-2">User Management</h3>
              <p className="text-muted-foreground">
                Granular access control and permissions for your security team.
              </p>
            </div>
            
            <div className="bg-navy-100 p-6 rounded-lg border border-border">
              <Shield className="h-10 w-10 text-accent-blue mb-4" />
              <h3 className="text-xl font-bold mb-2">Threat Protection</h3>
              <p className="text-muted-foreground">
                Proactive detection and mitigation of security threats in real time.
              </p>
            </div>
            
            <div className="bg-navy-100 p-6 rounded-lg border border-border">
              <Server className="h-10 w-10 text-accent-blue mb-4" />
              <h3 className="text-xl font-bold mb-2">VLAN Management</h3>
              <p className="text-muted-foreground">
                Organize and secure your network with comprehensive VLAN controls.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to secure your network?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get started with SecureDashboard today and take control of your enterprise security.
          </p>
          <Link to="/login">
            <Button size="lg">Get Started</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
