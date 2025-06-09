
import { useState } from 'react';
import { ApiKey, ApiKeyInput } from '@/types/apiKeys';
import { useApiKeysFetching } from './api-keys/useApiKeysFetching';
import { useApiKeysManagement } from './api-keys/useApiKeysManagement';

export { type ApiKey, type ApiKeyInput } from '@/types/apiKeys';

export const useApiKeys = () => {
  const {
    loading: fetchLoading,
    apiKeys,
    fetchApiKeys,
    fetchApiKeysByCategory,
    fetchApiKeysByProvider
  } = useApiKeysFetching();

  const {
    loading: managementLoading,
    createApiKey,
    updateApiKey,
    deleteApiKey
  } = useApiKeysManagement(fetchApiKeys);

  // Combining loading states from both hooks
  const loading = fetchLoading || managementLoading;

  return {
    loading,
    apiKeys,
    fetchApiKeys,
    fetchApiKeysByCategory,
    fetchApiKeysByProvider,
    createApiKey,
    updateApiKey,
    deleteApiKey
  };
};
