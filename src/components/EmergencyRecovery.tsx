
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Shield, AlertCircle, Clock, RefreshCw, X } from 'lucide-react';
import { siteBackup, SiteBackup } from '@/services/siteBackupService';
import { healthMonitor, HealthCheckResult } from '@/services/healthMonitoringService';
import { systemProtection } from '@/services/systemProtectionService';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from "sonner";

interface EmergencyRecoveryProps {
  visible: boolean;
}

export default function EmergencyRecovery({ visible }: EmergencyRecoveryProps) {
  const [backups, setBackups] = useState<SiteBackup[]>([]);
  const [isRestoring, setIsRestoring] = useState(false);
  const [healthStatus, setHealthStatus] = useState<HealthCheckResult | null>(null);
  
  useEffect(() => {
    if (visible) {
      loadBackups();
      checkHealth();
    }
  }, [visible]);
  
  const loadBackups = () => {
    try {
      const availableBackups = siteBackup.getAvailableBackups();
      setBackups(availableBackups);
    } catch (error) {
      console.error('Failed to load backups:', error);
    }
  };
  
  const checkHealth = () => {
    try {
      const result = healthMonitor.performHealthCheck();
      setHealthStatus(result);
    } catch (error) {
      console.error('Failed to check health:', error);
    }
  };
  
  const handleRestore = async (backupId: string) => {
    setIsRestoring(true);
    try {
      const success = await siteBackup.restoreFromBackup(backupId);
      if (!success) {
        throw new Error('Restoration failed');
      }
      toast.success('System restored successfully');
    } catch (error) {
      console.error('Restoration failed:', error);
      toast.error('Failed to restore system');
    } finally {
      setIsRestoring(false);
    }
  };
  
  const handleCreateBackup = async () => {
    try {
      await siteBackup.createBackup('Manual backup before recovery');
      toast.success('Backup created successfully');
      loadBackups();
    } catch (error) {
      console.error('Failed to create backup:', error);
      toast.error('Failed to create backup');
    }
  };
  
  const handleRefreshHealth = () => {
    checkHealth();
    toast.info('Health check performed');
  };
  
  const handleCloseRecovery = () => {
    // Deactivate emergency mode
    systemProtection.deactivateEmergencyMode();
    toast.success('Emergency recovery mode deactivated');
  };
  
  if (!visible) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-red-500" />
              <h2 className="text-2xl font-bold text-gray-800">Emergency Recovery</h2>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleCloseRecovery}
              className="rounded-full h-8 w-8 flex items-center justify-center"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          
          <Alert variant="destructive" className="mb-6 bg-red-50 text-red-500 border-red-200">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="text-red-500">System Issues Detected</AlertTitle>
            <AlertDescription className="text-red-500">
              The application has encountered critical issues. Use the recovery options below to restore functionality.
            </AlertDescription>
          </Alert>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-800">System Health</h3>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefreshHealth}
                className="flex items-center gap-1 bg-gray-50 text-gray-700"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
            
            {healthStatus ? (
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    className={
                      healthStatus.status === 'healthy' 
                        ? 'bg-green-500' 
                        : healthStatus.status === 'warning' 
                          ? 'bg-yellow-500' 
                          : 'bg-red-500'
                    }
                  >
                    {healthStatus.status.toUpperCase()}
                  </Badge>
                  <span className="text-sm text-gray-600">
                    Last checked: {new Date(healthStatus.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mt-2 text-gray-700">
                  <div className="flex items-center gap-1">
                    <span className={healthStatus.details.apiConnectivity ? 'text-green-500' : 'text-red-500'}>●</span>
                    API Connectivity: {healthStatus.details.apiConnectivity ? 'OK' : 'Failed'}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={healthStatus.details.routesAvailable ? 'text-green-500' : 'text-red-500'}>●</span>
                    Routes: {healthStatus.details.routesAvailable ? 'OK' : 'Failed'}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={healthStatus.details.storageAvailable ? 'text-green-500' : 'text-red-500'}>●</span>
                    Storage: {healthStatus.details.storageAvailable ? 'OK' : 'Failed'}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-gray-500 italic text-sm">Performing health check...</div>
            )}
          </div>
          
          <Separator className="my-4" />
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Available Backups</h3>
              <Button 
                onClick={handleCreateBackup} 
                variant="outline" 
                size="sm"
                className="text-gray-700"
              >
                Create New Backup
              </Button>
            </div>
            
            {backups.length > 0 ? (
              <div className="space-y-2">
                {backups.map((backup) => (
                  <div 
                    key={backup.id} 
                    className="bg-gray-50 p-3 rounded-md flex items-center justify-between"
                  >
                    <div>
                      <div className="font-medium text-gray-800">{backup.description}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(backup.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <Button
                      onClick={() => handleRestore(backup.id)}
                      disabled={isRestoring}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                      size="sm"
                    >
                      {isRestoring ? "Restoring..." : "Restore"}
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 italic text-center py-4">
                No backups available
              </div>
            )}
          </div>
          
          <div className="mt-6 flex justify-end gap-3">
            <Button 
              onClick={handleCloseRecovery} 
              className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              Close Recovery Mode
            </Button>
            <Button 
              onClick={() => {
                handleCloseRecovery();
                window.location.href = '/';
              }} 
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
