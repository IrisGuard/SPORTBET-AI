
import { useState } from 'react';
import { ApiKey, ApiKeyInput } from '@/types/apiKeys';

export function useApiKeysState() {
  const [loading, setLoading] = useState(false);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [apiKeyToDelete, setApiKeyToDelete] = useState<ApiKey | null>(null);
  const [newKeyDialogOpen, setNewKeyDialogOpen] = useState(false);
  const [newKeyData, setNewKeyData] = useState<ApiKeyInput>({
    name: '',
    value: '',
    category: 'blockchain',
    status: 'active',
    description: '',
    is_required: false,
    provider_type: null,
    expiry_date: null
  });

  // Derived state
  const categories = Array.from(new Set(apiKeys.map(key => key.category)));
  
  const filteredKeys = apiKeys.filter(key => {
    const matchesSearch = searchTerm === '' || 
      key.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      key.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      key.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === null || key.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return {
    loading,
    setLoading,
    apiKeys,
    setApiKeys,
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
    filteredKeys,
    categories
  };
}
