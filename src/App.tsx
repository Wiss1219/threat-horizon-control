
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import RulesPage from "./pages/Rules";
import VLANsPage from "./pages/VLANs";
import UsersPage from "./pages/Users";
import InsightsPage from "./pages/Insights";
import LogsPage from "./pages/Logs";
import SettingsPage from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/vlans" element={<VLANsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/logs" element={<LogsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
