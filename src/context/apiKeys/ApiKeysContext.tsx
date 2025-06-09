
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ApiKey } from '@/types/apiKeys';
import { useApiKeys } from '@/hooks/useApiKeys';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface ApiKeysContextProps {
  loading: boolean;
  apiKeys: ApiKey[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  apiKeyToDelete: ApiKey | null;
  setApiKeyToDelete: (apiKey: ApiKey | null) => void;
  newKeyDialogOpen: boolean;
  setNewKeyDialogOpen: (open: boolean) => void;
  newKeyData: any;
  setNewKeyData: (data: any) => void;
  fetchApiKeys: () => Promise<ApiKey[]>;
  createApiKey: (newKey: any) => Promise<boolean>;
  updateApiKey: (id: string, updates: Partial<ApiKey>) => Promise<boolean>;
  deleteApiKey: (id: string) => Promise<boolean>;
  filteredKeys: ApiKey[];
  categories: string[];
  getKeyByName: (name: string) => ApiKey | undefined;
  getKeysByProvider: (provider: string) => ApiKey[];
}

const ApiKeysContext = createContext<ApiKeysContextProps | undefined>(undefined);

export const ApiKeysProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const {
    loading,
    apiKeys,
    fetchApiKeys,
    createApiKey,
    updateApiKey,
    deleteApiKey
  } = useApiKeys();
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [apiKeyToDelete, setApiKeyToDelete] = useState<ApiKey | null>(null);
  const [newKeyDialogOpen, setNewKeyDialogOpen] = useState(false);
  const [newKeyData, setNewKeyData] = useState({
    name: '',
    value: '',
    category: 'blockchain',
    status: 'active',
    description: '',
    is_required: false,
    provider_type: null,
    expiry_date: null
  });

  // Fetch API keys on component mount
  useEffect(() => {
    if (isAdmin) {
      fetchApiKeys().catch(error => {
        console.error('Failed to fetch API keys:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to load API keys'
        });
      });
    }
  }, [isAdmin, fetchApiKeys, toast]);

  // Derive categories from API keys
  const categories = Array.from(new Set(apiKeys.map(key => key.category)));

  // Filter keys based on search term and category
  const filteredKeys = apiKeys.filter(key => {
    const matchesSearch = searchTerm === '' || 
      key.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (key.description && key.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      key.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === null || key.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Helper function to get a key by name
  const getKeyByName = (name: string): ApiKey | undefined => {
    return apiKeys.find(key => key.name === name && key.status === 'active');
  };

  // Helper function to get keys by provider
  const getKeysByProvider = (provider: string): ApiKey[] => {
    return apiKeys.filter(key => key.provider_type === provider && key.status === 'active');
  };

  const value = {
    loading,
    apiKeys,
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    apiKeyToDelete,
    setApiKeyToDelete,
    newKeyDialogOpen,
    setNewKeyDialogOpen,
    newKeyData,
    setNewKeyData,
    fetchApiKeys,
    createApiKey,
    updateApiKey,
    deleteApiKey,
    filteredKeys,
    categories,
    getKeyByName,
    getKeysByProvider
  };

  return (
    <ApiKeysContext.Provider value={value}>
      {children}
    </ApiKeysContext.Provider>
  );
};

export const useApiKeysContext = () => {
  const context = useContext(ApiKeysContext);
  if (context === undefined) {
    throw new Error('useApiKeysContext must be used within a ApiKeysProvider');
  }
  return context;
};
