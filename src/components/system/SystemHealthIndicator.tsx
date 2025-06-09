
import React, { useState, useEffect } from 'react';
import { Shield, AlertCircle, CheckCircle, RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { healthMonitor } from '@/services/healthMonitoringService';
import { systemProtection } from '@/services/systemProtectionService';
import { siteBackup } from '@/services/siteBackupService';
import { toast } from 'sonner';

const SystemHealthIndicator: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [health, setHealth] = useState<'healthy' | 'warning' | 'critical'>('healthy');
  const [lastCheck, setLastCheck] = useState<Date>(new Date());
  const [backupCount, setBackupCount] = useState(0);
  
  useEffect(() => {
    // Check health when component mounts
    checkSystemHealth();
    
    // Get backup count
    const backups = siteBackup.getAvailableBackups();
    setBackupCount(backups.length);
    
    // Set up interval to check health periodically (every 30 seconds)
    const intervalId = setInterval(checkSystemHealth, 30000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const checkSystemHealth = () => {
    const healthResult = healthMonitor.performHealthCheck();
    setHealth(healthResult.status);
    setLastCheck(new Date(healthResult.timestamp));
  };
  
  const handleCreateBackup = async () => {
    try {
      await systemProtection.createManualBackup("Manual backup from indicator");
      toast.success("System backup created");
      setBackupCount(siteBackup.getAvailableBackups().length);
    } catch (error) {
      toast.error("Failed to create backup");
      console.error(error);
    }
  };
  
  const handleActivateRecovery = () => {
    systemProtection.forceSystemRecovery();
    toast.info("Recovery mode activated");
  };
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  
  if (!isExpanded) {
    return (
      <Button
        onClick={toggleExpanded}
        variant="outline"
        size="sm"
        className="fixed top-20 right-4 z-40 bg-white/90 backdrop-blur-sm border shadow-md flex items-center gap-2 px-3 py-2 animate-pulse"
      >
        {health === 'healthy' ? (
          <CheckCircle size={16} className="text-green-500" />
        ) : health === 'warning' ? (
          <AlertCircle size={16} className="text-yellow-500" />
        ) : (
          <AlertCircle size={16} className="text-red-500" />
        )}
        <span>System Status</span>
      </Button>
    );
  }
  
  return (
    <Card className="fixed top-20 right-4 z-40 p-4 shadow-lg bg-white/90 backdrop-blur-sm border w-64">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Shield size={18} />
          <h3 className="font-medium">System Health</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={toggleExpanded} className="h-8 w-8 p-0">
          <X size={16} />
        </Button>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Status:</span>
          <Badge 
            className={
              health === 'healthy' 
                ? 'bg-green-500' 
                : health === 'warning' 
                  ? 'bg-yellow-500' 
                  : 'bg-red-500'
            }
          >
            {health.toUpperCase()}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm">Last Check:</span>
          <span className="text-sm text-muted-foreground">
            {lastCheck.toLocaleTimeString()}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm">Backups:</span>
          <span className="text-sm text-muted-foreground">{backupCount}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleCreateBackup}
            className="w-full"
          >
            Create Backup
          </Button>
          
          <Button 
            variant="outline"
            size="sm"
            onClick={checkSystemHealth}
            className="w-full flex items-center justify-center gap-1"
          >
            <RefreshCw size={14} />
            Check Now
          </Button>
        </div>
        
        <Button 
          variant={health === 'critical' ? 'destructive' : 'secondary'}
          size="sm"
          onClick={handleActivateRecovery}
          className="w-full"
        >
          Recovery Mode
        </Button>
      </div>
    </Card>
  );
};

export default SystemHealthIndicator;
