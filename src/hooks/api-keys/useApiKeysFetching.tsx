
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { ApiKey } from '@/types/apiKeys';
import { 
  fetchAllApiKeys,
  fetchApiKeysByCategory,
  fetchApiKeysByProvider
} from '@/services/apiKeyService';

export const useApiKeysFetching = () => {
  const [loading, setLoading] = useState(false);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
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

  const fetchApiKeysByCategories = async (category: string) => {
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
      return await fetchApiKeysByCategory(category);
    } catch (error: any) {
      console.error('Error fetching API keys by category:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load API keys for the specified category',
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchApiKeysByProviders = async (providerType: string) => {
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
      return await fetchApiKeysByProvider(providerType);
    } catch (error: any) {
      console.error('Error fetching API keys by provider:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load API keys for the specified provider',
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    setLoading,
    apiKeys,
    setApiKeys,
    fetchApiKeys,
    fetchApiKeysByCategory: fetchApiKeysByCategories,
    fetchApiKeysByProvider: fetchApiKeysByProviders
  };
};
