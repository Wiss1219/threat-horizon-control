
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, BarChart3, Network, Users, Zap } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const HomePage = () => {
  const { user } = useAuth();
  
  const features = [
    {
      icon: <Shield className="w-12 h-12 text-accent-blue" />,
      title: "Firewall Rules",
      description: "Create and manage firewall rules with an intuitive interface."
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-accent-blue" />,
      title: "Real-time Analytics",
      description: "Monitor network traffic and security events in real-time."
    },
    {
      icon: <Network className="w-12 h-12 text-accent-blue" />,
      title: "VLAN Management",
      description: "Segment your network for improved security and performance."
    },
    {
      icon: <Users className="w-12 h-12 text-accent-blue" />,
      title: "User Access Control",
      description: "Manage user permissions and access control policies."
    },
    {
      icon: <Zap className="w-12 h-12 text-accent-blue" />,
      title: "AI-Powered Insights",
      description: "Get intelligent recommendations and security insights."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="relative bg-navy-100 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10"></div>
        
        <div className="container mx-auto px-4 py-12 md:py-24">
          <nav className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-accent-blue" />
              <span className="text-2xl font-bold text-white">SecureDashboard</span>
            </div>
            
            <div className="flex gap-4">
              {user ? (
                <Button asChild>
                  <Link to="/dashboard">Go to Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button variant="ghost" className="text-white" asChild>
                    <Link to="/login">Log in</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/login?tab=register">Sign up</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
          
          <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-16">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Secure your network with AI-powered insights
              </h1>
              <p className="text-lg text-gray-300 max-w-lg">
                Monitor, analyze, and secure your network infrastructure with our advanced dashboard and real-time threat detection.
              </p>
              <div className="flex gap-4 pt-4">
                <Button size="lg" asChild>
                  <Link to={user ? "/dashboard" : "/login"}>
                    {user ? "Go to Dashboard" : "Get Started"}
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white" asChild>
                  <a href="#features">Learn More</a>
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/2 mt-8 md:mt-0">
              <img 
                src="/images/dashboard-preview.png" 
                alt="Dashboard Preview" 
                className="w-full rounded-lg shadow-2xl border border-navy-50"
                style={{ maxWidth: '600px' }}
              />
            </div>
          </div>
        </div>
        
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
            <path 
              fill="hsl(var(--background))" 
              fillOpacity="1" 
              d="M0,64L60,58.7C120,53,240,43,360,48C480,53,600,75,720,80C840,85,960,75,1080,64C1200,53,1320,43,1380,37.3L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path>
          </svg>
        </div>
      </header>
      
      {/* Features Section */}
      <section id="features" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Comprehensive Security Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="p-6 bg-card rounded-lg border border-border shadow-sm hover:shadow-md transition-all"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Button size="lg" asChild>
              <Link to={user ? "/dashboard" : "/login"}>
                {user ? "Access Your Dashboard" : "Get Started Now"}
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-navy-200 py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-accent-blue" />
              <span className="text-lg font-bold text-white">SecureDashboard</span>
            </div>
            
            <div className="flex gap-6">
              <Link to="/about" className="text-gray-300 hover:text-white">About</Link>
              <Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link>
              <Link to="/privacy" className="text-gray-300 hover:text-white">Privacy</Link>
              <Link to="/terms" className="text-gray-300 hover:text-white">Terms</Link>
            </div>
          </div>
          
          <div className="border-t border-navy-50 mt-6 pt-6 text-center text-gray-400 text-sm">
            © 2025 SecureDashboard. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
