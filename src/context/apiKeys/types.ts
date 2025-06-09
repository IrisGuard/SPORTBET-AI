
import { ApiKey, ApiKeyInput } from '@/types/apiKeys';

export type ApiKeysContextType = {
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
  newKeyData: ApiKeyInput;
  setNewKeyData: (data: ApiKeyInput) => void;
  fetchApiKeys: () => Promise<ApiKey[]>;
  createApiKey: (newKey: ApiKeyInput) => Promise<boolean>;
  updateApiKey: (id: string, updates: Partial<ApiKey>) => Promise<boolean>;
  deleteApiKey: (id: string) => Promise<boolean>;
  filteredKeys: ApiKey[];
  categories: string[];
};
