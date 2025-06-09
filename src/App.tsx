import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Predictions from "./pages/Predictions";
import Leaderboard from "./pages/Leaderboard";
import Wallet from "./pages/Wallet";
import Profile from "./pages/Profile";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import FAQ from "./pages/FAQ";
import ApiDocs from "./pages/ApiDocs";
import Support from "./pages/Support";
import KeyVault from "./pages/KeyVault";
import Changes from "./pages/Changes";
import BuyToken from "./pages/BuyToken";
import Staking from "./pages/Staking";
import NotFound from "./pages/NotFound";
import InstructionsDialog from "./components/InstructionsDialog";
import PlatformHelper from "./components/PlatformHelper";
import ErrorReporter from "./components/ErrorReporter";
import EmergencyRecovery from "./components/EmergencyRecovery";
import { systemProtection } from "./services/systemProtectionService";

const App = () => {
  const [emergencyMode, setEmergencyMode] = useState(false);

  // Initialize system protection when the app loads
  useEffect(() => {
    const initializeProtection = async () => {
      await systemProtection.initialize();
      setEmergencyMode(systemProtection.isEmergencyModeActive());
    };
    
    initializeProtection();
    
    // Listen for emergency mode changes
    const handleEmergencyMode = () => setEmergencyMode(true);
    const handleEmergencyModeDeactivated = () => setEmergencyMode(false);
    
    window.addEventListener('sportbet:emergency-mode', handleEmergencyMode);
    window.addEventListener('sportbet:emergency-mode-deactivated', handleEmergencyModeDeactivated);
    
    return () => {
      window.removeEventListener('sportbet:emergency-mode', handleEmergencyMode);
      window.removeEventListener('sportbet:emergency-mode-deactivated', handleEmergencyModeDeactivated);
    };
  }, []);

  return (
    <TooltipProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/predictions" element={<Predictions />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/buy-token" element={<BuyToken />} />
        <Route path="/staking" element={<Staking />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/support" element={<Support />} />
        <Route path="/api-docs" element={<ApiDocs />} />
        <Route path="/key-vault" element={<KeyVault />} />
        <Route path="/changes" element={<Changes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <InstructionsDialog />
      <PlatformHelper />
      <ErrorReporter />
      <EmergencyRecovery visible={emergencyMode} />
      <Toaster />
      <Sonner />
    </TooltipProvider>
  );
};

export default App;
