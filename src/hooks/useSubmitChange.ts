
import { useState } from 'react';
import { useChangeApproval } from '@/context/ChangeApprovalContext';
import { ChangeSubmitParams } from '@/types/changeApproval';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/sonner';

export function useSubmitChange() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { submitChange } = useChangeApproval();
  const { user, isAdmin } = useAuth();

  const submit = async ({ tableName, recordId, changes }: ChangeSubmitParams): Promise<boolean> => {
    if (!user) {
      toast.error('You must be logged in to submit changes');
      return false;
    }

    // If user is admin, we can bypass the approval process
    if (isAdmin) {
      // Logic for direct update would go here
      // This is just a placeholder - you'd implement real direct update logic
      toast.info('As admin, you could implement direct updates without approval');
    }

    setIsSubmitting(true);
    try {
      const changeId = await submitChange({ tableName, recordId, changes });
      
      if (changeId) {
        toast.success('Your changes have been submitted for approval');
        return true;
      } else {
        toast.error('Failed to submit your changes');
        return false;
      }
    } catch (error) {
      console.error('Error submitting change:', error);
      toast.error('An unexpected error occurred');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submit, isSubmitting };
}
