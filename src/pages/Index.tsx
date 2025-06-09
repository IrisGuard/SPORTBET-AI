
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import FooterWithPrivacy from '@/components/FooterWithPrivacy';
import HowItWorks from '@/components/home/HowItWorks';
import TodaysPredictions from '@/components/home/TodaysPredictions';
import TokenInfo from '@/components/home/TokenInfo';
import SystemHealthIndicator from '@/components/system/SystemHealthIndicator';
import { systemProtection } from '@/services/systemProtectionService';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { toast } from 'sonner';

const Index = () => {
  const [showDebug, setShowDebug] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  
  const triggerEmergencyMode = () => {
    systemProtection.activateEmergencyMode('Manual test trigger');
    toast.error('Emergency mode activated for testing');
  };
  
  const handleCornerClick = () => {
    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        setShowDebug(true);
        return 0;
      }
      return newCount;
    });
  };
  
  // Reset click count after a timeout
  useEffect(() => {
    if (clickCount > 0) {
      const timer = setTimeout(() => {
        setClickCount(0);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [clickCount]);
  
  return (
    <div className="min-h-screen bg-sportbet-dark">
      <NavBar />
      <SystemHealthIndicator />
      <Hero />
      <HowItWorks />
      <TodaysPredictions />
      <TokenInfo />
      <FooterWithPrivacy />
      
      {/* Debug Panel - Accessible by clicking 5 times in bottom right corner */}
      <div 
        className="fixed bottom-2 right-2 w-12 h-12 cursor-pointer flex items-center justify-center opacity-50 hover:opacity-80" 
        onClick={handleCornerClick}
      >
        {clickCount > 0 && (
          <div className="absolute w-6 h-6 rounded-full bg-gray-700/50 flex items-center justify-center text-xs text-white">
            {5 - clickCount}
          </div>
        )}
      </div>
      
      {showDebug && (
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className="fixed bottom-4 right-4 bg-black/70 border-red-500/30 text-red-500/80 flex items-center gap-2"
            >
              <Shield size={16} />
              Debug Tools
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="max-h-96">
            <SheetHeader>
              <SheetTitle>Debug & Testing Tools</SheetTitle>
              <SheetDescription>
                These tools are for testing and development purposes only
              </SheetDescription>
            </SheetHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              <Button variant="destructive" onClick={triggerEmergencyMode}>
                Trigger Emergency Mode
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  systemProtection.deactivateEmergencyMode();
                  toast.success('Emergency mode deactivated');
                }}
              >
                Deactivate Emergency Mode
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => {
                  setShowDebug(false);
                  toast.info('Debug panel closed');
                }}
              >
                Close Debug Panel
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default Index;
