import { siteBackup } from './siteBackupService';
import { healthMonitor } from './healthMonitoringService';
import { captureError } from './errorTrackingService';
import { toast } from "sonner";

/**
 * Service for managing system protection
 */
export class SystemProtectionService {
  private static instance: SystemProtectionService;
  private initialized = false;
  private emergencyModeActive = false;

  /**
   * Get the singleton instance
   */
  public static getInstance(): SystemProtectionService {
    if (!SystemProtectionService.instance) {
      SystemProtectionService.instance = new SystemProtectionService();
    }
    return SystemProtectionService.instance;
  }

  /**
   * Initialize the system protection
   */
  public async initialize(): Promise<void> {
    if (this.initialized) return;
    
    try {
      console.log('[SystemProtectionService] Initializing system protection...');
      
      // Initialize services
      await siteBackup.initialize();
      
      // Start health monitoring
      healthMonitor.startMonitoring(60); // Check every minute
      
      // Schedule automatic backups
      siteBackup.scheduleAutomaticBackups(120); // Create backup every 2 hours
      
      // Create initial backup if none exists
      const backups = siteBackup.getAvailableBackups();
      if (backups.length === 0) {
        await siteBackup.createBackup('Initial system backup');
      }
      
      // Register system protection error handler
      window.addEventListener('error', this.handleSystemError.bind(this));
      
      // Check for recovery mode
      this.checkForRecoveryMode();
      
      this.initialized = true;
      console.log('[SystemProtectionService] System protection initialized');
    } catch (error) {
      console.error('[SystemProtectionService] Failed to initialize system protection:', error);
      captureError(error instanceof Error ? error : new Error('Failed to initialize system protection'), 'SystemProtectionService');
    }
  }

  /**
   * Check if system is in recovery mode
   */
  private checkForRecoveryMode(): void {
    try {
      // Check URL parameters for recovery mode
      const urlParams = new URLSearchParams(window.location.search);
      const recoveryMode = urlParams.get('recovery');
      
      if (recoveryMode === 'true') {
        this.activateEmergencyMode('User activated recovery mode');
        return;
      }
      
      // Check localStorage for recovery flag
      const recoveryFlag = localStorage.getItem('sportbet_recovery_needed');
      if (recoveryFlag === 'true') {
        localStorage.removeItem('sportbet_recovery_needed');
        this.activateEmergencyMode('Automatic recovery triggered');
        return;
      }
      
      // Check system health
      const healthResult = healthMonitor.performHealthCheck();
      if (healthResult.status === 'critical') {
        this.activateEmergencyMode('Critical system health detected');
        return;
      }
    } catch (error) {
      console.error('[SystemProtectionService] Error checking recovery mode:', error);
      // If we hit an error here, activate emergency mode just to be safe
      this.activateEmergencyMode('Error during system check');
    }
  }

  /**
   * Activate emergency recovery mode
   */
  public activateEmergencyMode(reason: string): void {
    if (this.emergencyModeActive) return;
    
    console.warn(`[SystemProtectionService] Activating emergency mode: ${reason}`);
    this.emergencyModeActive = true;
    
    // Set a flag in localStorage so we know we're in recovery mode
    // even if the page reloads
    localStorage.setItem('sportbet_emergency_mode', 'true');
    
    // Notify the user
    toast.error('System protection activated', {
      description: 'Emergency recovery mode has been enabled'
    });
    
    // Dispatch a custom event that the EmergencyRecovery component can listen for
    window.dispatchEvent(new CustomEvent('sportbet:emergency-mode', {
      detail: { reason }
    }));
  }

  /**
   * Deactivate emergency recovery mode
   */
  public deactivateEmergencyMode(): void {
    if (!this.emergencyModeActive && localStorage.getItem('sportbet_emergency_mode') !== 'true') return;
    
    console.log('[SystemProtectionService] Deactivating emergency mode');
    this.emergencyModeActive = false;
    
    // Remove the flag from localStorage
    localStorage.removeItem('sportbet_emergency_mode');
    localStorage.removeItem('sportbet_recovery_needed');
    localStorage.removeItem('sportbet_critical_errors');
    
    // Dispatch an event to notify components
    window.dispatchEvent(new CustomEvent('sportbet:emergency-mode-deactivated'));
    
    toast.success('System protection deactivated', {
      description: 'Emergency recovery mode has been disabled'
    });
  }

  /**
   * Check if emergency mode is active
   */
  public isEmergencyModeActive(): boolean {
    // Check the instance flag
    if (this.emergencyModeActive) return true;
    
    // Check localStorage as a fallback
    return localStorage.getItem('sportbet_emergency_mode') === 'true';
  }

  /**
   * Handle system errors
   */
  private handleSystemError(event: ErrorEvent): void {
    console.error('[SystemProtectionService] System error detected:', event.error);
    
    // Count critical errors in localStorage
    const criticalErrorKey = 'sportbet_critical_errors';
    const currentErrorCount = parseInt(localStorage.getItem(criticalErrorKey) || '0', 10);
    
    // Increment the error count
    localStorage.setItem(criticalErrorKey, (currentErrorCount + 1).toString());
    
    // If we hit a threshold of critical errors, activate emergency mode
    if (currentErrorCount + 1 >= 3) {
      localStorage.setItem('sportbet_recovery_needed', 'true');
      this.activateEmergencyMode('Multiple critical errors detected');
      
      // Reset the error count
      localStorage.setItem(criticalErrorKey, '0');
    }
  }

  /**
   * Create a manual backup
   */
  public async createManualBackup(description: string): Promise<string> {
    try {
      const backupId = await siteBackup.createBackup(description);
      toast.success('Backup created successfully');
      return backupId;
    } catch (error) {
      console.error('[SystemProtectionService] Failed to create manual backup:', error);
      toast.error('Failed to create backup');
      throw error;
    }
  }

  /**
   * Force a system recovery
   */
  public async forceSystemRecovery(): Promise<void> {
    try {
      this.activateEmergencyMode('Manual system recovery');
      
      // A different approach would be to navigate to a recovery page
      // window.location.href = '/?recovery=true';
    } catch (error) {
      console.error('[SystemProtectionService] Failed to force system recovery:', error);
      captureError(error instanceof Error ? error : new Error('Failed to force system recovery'), 'SystemProtectionService');
    }
  }
}

// Export the singleton instance
export const systemProtection = SystemProtectionService.getInstance();
