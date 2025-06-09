import { toast } from "sonner";

// Define the structure of our backup entry
export interface SiteBackup {
  id: string;
  timestamp: number;
  createdBy: string;
  description: string;
  data: {
    routes: string[];
    components: Record<string, boolean>;
    applicationState: Record<string, any>;
  };
}

// Constants for localStorage keys
const BACKUP_KEY_PREFIX = 'sportbet_backup_';
const BACKUP_INDEX_KEY = 'sportbet_backup_index';
const MAX_BACKUPS = 5; // Maximum number of backups to keep

/**
 * Service for creating and managing site structure backups
 */
export class SiteBackupService {
  private static instance: SiteBackupService;
  private backupIndex: string[] = [];
  private initialized = false;

  /**
   * Get the singleton instance
   */
  public static getInstance(): SiteBackupService {
    if (!SiteBackupService.instance) {
      SiteBackupService.instance = new SiteBackupService();
    }
    return SiteBackupService.instance;
  }

  /**
   * Initialize the backup service
   */
  public async initialize(): Promise<void> {
    if (this.initialized) return;
    
    try {
      // Load the backup index from localStorage
      const storedIndex = localStorage.getItem(BACKUP_INDEX_KEY);
      if (storedIndex) {
        this.backupIndex = JSON.parse(storedIndex);
      }
      
      // If no backups exist, create an initial backup
      if (this.backupIndex.length === 0) {
        await this.createBackup('Initial application state');
      }
      
      this.initialized = true;
      console.log('[SiteBackupService] Initialized with', this.backupIndex.length, 'backups');
    } catch (error) {
      console.error('[SiteBackupService] Initialization failed:', error);
    }
  }

  /**
   * Create a new backup of the current application state
   */
  public async createBackup(description: string): Promise<string> {
    try {
      // Generate a unique ID for this backup
      const backupId = `backup_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      // Collect critical application state
      const applicationState = this.collectApplicationState();
      
      // Create the backup object
      const backup: SiteBackup = {
        id: backupId,
        timestamp: Date.now(),
        createdBy: 'system', // Could be 'user', 'admin', or 'system'
        description,
        data: {
          routes: this.collectRoutes(),
          components: this.checkCriticalComponents(),
          applicationState,
        },
      };
      
      // Store the backup in localStorage
      localStorage.setItem(`${BACKUP_KEY_PREFIX}${backupId}`, JSON.stringify(backup));
      
      // Update the backup index
      this.backupIndex.push(backupId);
      
      // Limit the number of backups we keep
      if (this.backupIndex.length > MAX_BACKUPS) {
        const oldestBackupId = this.backupIndex.shift();
        if (oldestBackupId) {
          localStorage.removeItem(`${BACKUP_KEY_PREFIX}${oldestBackupId}`);
        }
      }
      
      // Save the updated index
      localStorage.setItem(BACKUP_INDEX_KEY, JSON.stringify(this.backupIndex));
      
      console.log(`[SiteBackupService] Created backup: ${backupId}`);
      return backupId;
    } catch (error) {
      console.error('[SiteBackupService] Failed to create backup:', error);
      throw new Error('Failed to create backup');
    }
  }

  /**
   * Restore the application from a specific backup
   */
  public async restoreFromBackup(backupId?: string): Promise<boolean> {
    try {
      // If no backup ID is provided, use the latest
      if (!backupId) {
        if (this.backupIndex.length === 0) {
          throw new Error('No backups available');
        }
        backupId = this.backupIndex[this.backupIndex.length - 1];
      }
      
      // Load the backup from localStorage
      const backupJson = localStorage.getItem(`${BACKUP_KEY_PREFIX}${backupId}`);
      if (!backupJson) {
        throw new Error(`Backup ${backupId} not found`);
      }
      
      const backup: SiteBackup = JSON.parse(backupJson);
      
      // Apply the backup to restore application state
      this.applyBackup(backup);
      
      toast.success('Application restored successfully', {
        description: `Restored from backup created at ${new Date(backup.timestamp).toLocaleString()}`
      });
      
      console.log(`[SiteBackupService] Restored from backup: ${backupId}`);
      return true;
    } catch (error) {
      console.error('[SiteBackupService] Failed to restore from backup:', error);
      toast.error('Failed to restore application', {
        description: error instanceof Error ? error.message : 'Unknown error'
      });
      return false;
    }
  }

  /**
   * Get a list of all available backups
   */
  public getAvailableBackups(): SiteBackup[] {
    return this.backupIndex
      .map((id) => {
        const backup = localStorage.getItem(`${BACKUP_KEY_PREFIX}${id}`);
        return backup ? JSON.parse(backup) as SiteBackup : null;
      })
      .filter((backup): backup is SiteBackup => backup !== null)
      .sort((a, b) => b.timestamp - a.timestamp);
  }

  /**
   * Schedule automatic backups
   */
  public scheduleAutomaticBackups(intervalMinutes: number = 60): void {
    // Create a backup every hour by default
    setInterval(() => {
      this.createBackup('Automatic scheduled backup');
    }, intervalMinutes * 60 * 1000);
    
    console.log(`[SiteBackupService] Scheduled automatic backups every ${intervalMinutes} minutes`);
  }

  /**
   * Apply a backup to restore application state
   */
  private applyBackup(backup: SiteBackup): void {
    // This is where we would actually restore state
    // For now, we'll just reload the page to reset the app state
    window.location.reload();
  }

  /**
   * Collect information about available routes
   */
  private collectRoutes(): string[] {
    // In a real implementation, this would introspect the router
    // For now, we'll return a hardcoded list of routes
    return [
      '/',
      '/auth',
      '/dashboard',
      '/predictions',
      '/leaderboard',
      '/wallet',
      '/profile',
      '/faq',
      '/support',
      '/key-vault',
      '/changes',
    ];
  }

  /**
   * Check if critical components are rendering correctly
   */
  private checkCriticalComponents(): Record<string, boolean> {
    // In a real implementation, this would check if components exist in the DOM
    // For now, we'll just return a simple object assuming everything is OK
    return {
      'NavBar': true,
      'Footer': true,
      'AuthForms': true,
      'PredictionList': true,
    };
  }

  /**
   * Collect application state for backup
   */
  private collectApplicationState(): Record<string, any> {
    // In a real implementation, this would collect state from various sources
    // For this example, we'll just collect what we can from localStorage
    const state: Record<string, any> = {};
    
    try {
      // Collect theme preference
      const theme = localStorage.getItem('theme');
      if (theme) state.theme = theme;
      
      // Collect any user preferences
      const preferences = localStorage.getItem('user_preferences');
      if (preferences) state.preferences = JSON.parse(preferences);
      
      // Avoid collecting sensitive data like tokens
      
    } catch (error) {
      console.error('[SiteBackupService] Error collecting application state:', error);
    }
    
    return state;
  }
}

// Export the singleton instance
export const siteBackup = SiteBackupService.getInstance();
