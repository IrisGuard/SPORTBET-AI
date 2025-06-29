
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { ApiKey, ApiKeyInput } from '@/types/apiKeys';
import { 
  fetchAllApiKeys, 
  createApiKeyInDB, 
  updateApiKeyInDB, 
  deleteApiKeyFromDB 
} from '@/services/apiKeyService';

export function useApiKeysActions(
  setLoading: (loading: boolean) => void,
  setApiKeys: (keys: ApiKey[]) => void
) {
  const { toast } = useToast();
  const { isAdmin } = useAuth();

  const fetchApiKeys = async () => {
    if (!isAdmin) {
      toast({
        variant: 'destructive',
        title: 'Permission denied',
        description: 'Only administrators can manage API keys',
      });
      return [];
    }

    try {
      setLoading(true);
      const data = await fetchAllApiKeys();
      setApiKeys(data);
      return data;
    } catch (error: any) {
      console.error('Error fetching API keys:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load API keys',
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  const createApiKey = async (newKey: ApiKeyInput) => {
    if (!isAdmin) {
      toast({
        variant: 'destructive',
        title: 'Permission denied',
        description: 'Only administrators can manage API keys',
      });
      return false;
    }

    try {
      setLoading(true);
      await createApiKeyInDB(newKey);
      
      toast({
        title: 'Success',
        description: 'API key created successfully',
      });
      
      // Refresh the API keys list
      await fetchApiKeys();
      return true;
    } catch (error: any) {
      console.error('Error creating API key:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create API key',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateApiKey = async (id: string, updates: Partial<ApiKey>) => {
    if (!isAdmin) {
      toast({
        variant: 'destructive',
        title: 'Permission denied',
        description: 'Only administrators can manage API keys',
      });
      return false;
    }

    try {
      setLoading(true);
      await updateApiKeyInDB(id, updates);
      
      toast({
        title: 'Success',
        description: 'API key updated successfully',
      });
      
      // Refresh the API keys list
      await fetchApiKeys();
      return true;
    } catch (error: any) {
      console.error('Error updating API key:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update API key',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteApiKey = async (id: string) => {
    if (!isAdmin) {
      toast({
        variant: 'destructive',
        title: 'Permission denied',
        description: 'Only administrators can manage API keys',
      });
      return false;
    }

    try {
      setLoading(true);
      await deleteApiKeyFromDB(id);
      
      toast({
        title: 'Success',
        description: 'API key deleted successfully',
      });
      
      // Refresh the API keys list
      await fetchApiKeys();
      return true;
    } catch (error: any) {
      console.error('Error deleting API key:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete API key',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchApiKeys,
    createApiKey,
    updateApiKey,
    deleteApiKey
  };
}
