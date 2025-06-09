
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PendingChange, ChangeSubmitParams } from '@/types/changeApproval';
import { toast } from '@/components/ui/sonner';
import { useAuth } from './AuthContext';

interface ChangeApprovalContextType {
  userChanges: PendingChange[];
  pendingChanges: PendingChange[];
  loadingChanges: boolean;
  submitChange: (params: ChangeSubmitParams) => Promise<string | null>;
  approveChange: (changeId: string) => Promise<boolean>;
  rejectChange: (changeId: string, comments?: string) => Promise<boolean>;
  refreshChanges: () => Promise<void>;
}

const ChangeApprovalContext = createContext<ChangeApprovalContextType | null>(null);

export const useChangeApproval = () => {
  const context = useContext(ChangeApprovalContext);
  if (!context) {
    throw new Error('useChangeApproval must be used within a ChangeApprovalProvider');
  }
  return context;
};

export const ChangeApprovalProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const { user, isAdmin } = useAuth();
  const [userChanges, setUserChanges] = useState<PendingChange[]>([]);
  const [pendingChanges, setPendingChanges] = useState<PendingChange[]>([]);
  const [loadingChanges, setLoadingChanges] = useState(true);

  const fetchUserChanges = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase.rpc('get_user_changes');
      
      if (error) {
        console.error('Error fetching user changes:', error);
        return;
      }
      
      // Process the data to ensure changes_json is a Record<string, any>
      const processedData = data?.map(item => ({
        ...item,
        changes_json: typeof item.changes_json === 'string' 
          ? JSON.parse(item.changes_json) 
          : item.changes_json
      })) || [];
      
      setUserChanges(processedData as PendingChange[]);
    } catch (error) {
      console.error('Error in fetchUserChanges:', error);
    }
  };

  const fetchPendingChanges = async () => {
    if (!user || !isAdmin) return;
    
    try {
      const { data, error } = await supabase.rpc('get_pending_changes');
      
      if (error) {
        console.error('Error fetching pending changes:', error);
        return;
      }
      
      // Process the data to ensure changes_json is a Record<string, any>
      const processedData = data?.map(item => ({
        ...item,
        changes_json: typeof item.changes_json === 'string' 
          ? JSON.parse(item.changes_json) 
          : item.changes_json
      })) || [];
      
      setPendingChanges(processedData as PendingChange[]);
    } catch (error) {
      console.error('Error in fetchPendingChanges:', error);
    }
  };

  const refreshChanges = async () => {
    setLoadingChanges(true);
    await Promise.all([fetchUserChanges(), fetchPendingChanges()]);
    setLoadingChanges(false);
  };

  useEffect(() => {
    if (user) {
      refreshChanges();
    } else {
      setUserChanges([]);
      setPendingChanges([]);
    }
  }, [user, isAdmin]);

  const submitChange = async ({ tableName, recordId, changes }: ChangeSubmitParams): Promise<string | null> => {
    if (!user) {
      toast.error('You must be logged in to submit changes');
      return null;
    }

    try {
      const { data, error } = await supabase.rpc('submit_change', {
        p_table_name: tableName,
        p_record_id: recordId,
        p_changes: changes
      });

      if (error) {
        console.error('Error submitting change:', error);
        toast.error('Failed to submit change: ' + error.message);
        return null;
      }

      toast.success('Change submitted for approval');
      await refreshChanges();
      return data;
    } catch (error) {
      console.error('Error in submitChange:', error);
      toast.error('An unexpected error occurred');
      return null;
    }
  };

  const approveChange = async (changeId: string): Promise<boolean> => {
    if (!user || !isAdmin) {
      toast.error('Only administrators can approve changes');
      return false;
    }

    try {
      const { data, error } = await supabase.rpc('approve_change', {
        p_change_id: changeId
      });

      if (error) {
        console.error('Error approving change:', error);
        toast.error('Failed to approve change: ' + error.message);
        return false;
      }

      toast.success('Change approved successfully');
      await refreshChanges();
      return true;
    } catch (error) {
      console.error('Error in approveChange:', error);
      toast.error('An unexpected error occurred');
      return false;
    }
  };

  const rejectChange = async (changeId: string, comments?: string): Promise<boolean> => {
    if (!user || !isAdmin) {
      toast.error('Only administrators can reject changes');
      return false;
    }

    try {
      const { data, error } = await supabase.rpc('reject_change', {
        p_change_id: changeId,
        p_comments: comments || null
      });

      if (error) {
        console.error('Error rejecting change:', error);
        toast.error('Failed to reject change: ' + error.message);
        return false;
      }

      toast.success('Change rejected');
      await refreshChanges();
      return true;
    } catch (error) {
      console.error('Error in rejectChange:', error);
      toast.error('An unexpected error occurred');
      return false;
    }
  };

  const value = {
    userChanges,
    pendingChanges,
    loadingChanges,
    submitChange,
    approveChange,
    rejectChange,
    refreshChanges
  };

  return (
    <ChangeApprovalContext.Provider value={value}>
      {children}
    </ChangeApprovalContext.Provider>
  );
};
