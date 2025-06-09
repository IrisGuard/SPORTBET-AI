
import { captureError } from './errorTrackingService';
import { siteBackup, SiteBackup } from './siteBackupService';
import { toast } from "sonner";

export interface HealthCheckResult {
  status: 'healthy' | 'warning' | 'critical';
  details: {
    componentsHealth: Record<string, boolean>;
    apiConnectivity: boolean;
    routesAvailable: boolean;
    storageAvailable: boolean;
  };
  timestamp: number;
}

/**
 * Service for monitoring application health
 */
export class HealthMonitoringService {
  private static instance: HealthMonitoringService;
  private lastHealthCheck: HealthCheckResult | null = null;
  private criticalComponents = ['NavBar', 'Footer', 'ErrorBoundary'];
  private isMonitoring = false;

  /**
   * Get the singleton instance
   */
  public static getInstance(): HealthMonitoringService {
    if (!HealthMonitoringService.instance) {
      HealthMonitoringService.instance = new HealthMonitoringService();
    }
    return HealthMonitoringService.instance;
  }

  /**
   * Start monitoring the application health
   */
  public startMonitoring(intervalSeconds: number = 30): void {
    if (this.isMonitoring) return;
    
    // Perform an initial health check
    this.performHealthCheck();
    
    // Set up regular health checks
    setInterval(() => {
      this.performHealthCheck();
    }, intervalSeconds * 1000);
    
    this.isMonitoring = true;
    console.log(`[HealthMonitoringService] Started monitoring every ${intervalSeconds} seconds`);
  }

  /**
   * Perform a health check on the application
   */
  public performHealthCheck(): HealthCheckResult {
    try {
      const componentsHealth = this.checkComponentsHealth();
      const apiConnectivity = this.checkApiConnectivity();
      const routesAvailable = this.checkRoutesAvailable();
      const storageAvailable = this.checkStorageAvailable();
      
      // Determine overall health status
      let status: 'healthy' | 'warning' | 'critical' = 'healthy';
      
      // Check for critical component failures
      const criticalFailed = this.criticalComponents.some(
        component => !componentsHealth[component]
      );
      
      if (criticalFailed || !storageAvailable) {
        status = 'critical';
      } else if (!apiConnectivity || !routesAvailable) {
        status = 'warning';
      }
      
      const result: HealthCheckResult = {
        status,
        details: {
          componentsHealth,
          apiConnectivity,
          routesAvailable,
          storageAvailable,
        },
        timestamp: Date.now(),
      };
      
      this.lastHealthCheck = result;
      console.log(`[HealthMonitoringService] Health check result:`, status);
      
      // If the status is critical, trigger recovery
      if (status === 'critical') {
        this.triggerRecovery();
      }
      
      return result;
    } catch (error) {
      console.error('[HealthMonitoringService] Error performing health check:', error);
      
      // If we can't even perform a health check, the situation is critical
      const result: HealthCheckResult = {
        status: 'critical',
        details: {
          componentsHealth: {},
          apiConnectivity: false,
          routesAvailable: false,
          storageAvailable: false,
        },
        timestamp: Date.now(),
      };
      
      this.lastHealthCheck = result;
      
      // Try to recover
      this.triggerRecovery();
      
      return result;
    }
  }

  /**
   * Get the latest health check result
   */
  public getLastHealthCheck(): HealthCheckResult | null {
    return this.lastHealthCheck;
  }

  /**
   * Trigger recovery from a backup
   */
  private async triggerRecovery(): Promise<void> {
    console.warn('[HealthMonitoringService] Triggering automatic recovery due to critical health status');
    
    try {
      toast.warning('System has detected issues', {
        description: 'Attempting automatic recovery...'
      });
      
      // Get available backups
      const backups = siteBackup.getAvailableBackups();
      
      if (backups.length === 0) {
        throw new Error('No backups available for recovery');
      }
      
      // Find the latest backup
      const latestBackup = backups[0];
      
      // Attempt to restore from the backup
      const success = await siteBackup.restoreFromBackup(latestBackup.id);
      
      if (!success) {
        throw new Error('Failed to restore from backup');
      }
      
      // If we get here, recovery was successful
      console.log('[HealthMonitoringService] Automatic recovery successful');
      
    } catch (error) {
      console.error('[HealthMonitoringService] Automatic recovery failed:', error);
      captureError(error instanceof Error ? error : new Error('Unknown error during recovery'), 'HealthMonitoringService');
      
      toast.error('Automatic recovery failed', {
        description: 'Please use the emergency recovery option'
      });
    }
  }

  /**
   * Check if critical components are healthy
   */
  private checkComponentsHealth(): Record<string, boolean> {
    const result: Record<string, boolean> = {};
    
    // For a real implementation, we would check if components are rendered in the DOM
    // For now, we'll simulate this with some basic checks
    
    try {
      // Check if NavBar exists
      result['NavBar'] = document.querySelector('header') !== null;
      
      // Check if Footer exists
      result['Footer'] = document.querySelector('footer') !== null;
      
      // Check for other key components
      result['ErrorBoundary'] = true; // We can't really check this directly
      
    } catch (error) {
      console.error('[HealthMonitoringService] Error checking components health:', error);
      // If we can't check components, assume they're not healthy
      this.criticalComponents.forEach(component => {
        result[component] = false;
      });
    }
    
    return result;
  }

  /**
   * Check if API connectivity is available
   */
  private checkApiConnectivity(): boolean {
    // In a real implementation, we would make a simple request to a health endpoint
    // For now, we'll assume it's available
    return navigator.onLine;
  }

  /**
   * Check if routes are available
   */
  private checkRoutesAvailable(): boolean {
    // In a real implementation, we would check if the router is functioning
    // For now, we'll return true
    return true;
  }

  /**
   * Check if storage is available
   */
  private checkStorageAvailable(): boolean {
    try {
      const testKey = '__storage_test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  }
}

// Export the singleton instance
export const healthMonitor = HealthMonitoringService.getInstance();
