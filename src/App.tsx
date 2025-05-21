
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import DashboardPage from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import RulesPage from "./pages/Rules";
import VLANsPage from "./pages/VLANs";
import UsersPage from "./pages/Users";
import InsightsPage from "./pages/Insights";
import LogsPage from "./pages/Logs";
import SettingsPage from "./pages/Settings";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected routes with Layout */}
          <Route 
            path="/dashboard" 
            element={<Layout><DashboardPage /></Layout>} 
          />
          <Route 
            path="/rules" 
            element={<Layout><RulesPage /></Layout>} 
          />
          <Route 
            path="/vlans" 
            element={<Layout><VLANsPage /></Layout>} 
          />
          <Route 
            path="/users" 
            element={<Layout><UsersPage /></Layout>} 
          />
          <Route 
            path="/insights" 
            element={<Layout><InsightsPage /></Layout>} 
          />
          <Route 
            path="/logs" 
            element={<Layout><LogsPage /></Layout>} 
          />
          <Route 
            path="/settings" 
            element={<Layout><SettingsPage /></Layout>} 
          />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
