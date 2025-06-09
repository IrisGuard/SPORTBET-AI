
import React, { createContext, useState, useContext } from 'react';
import { ApiKey } from '@/types/apiKeys';
import { useApiKeysContext } from '@/context/apiKeys';

type KeyVaultContextType = {
  selectedApiKey: ApiKey | null;
  setSelectedApiKey: (apiKey: ApiKey | null) => void;
  keyDetailsOpen: boolean;
  setKeyDetailsOpen: (open: boolean) => void;
  viewHistoryOpen: boolean;
  setViewHistoryOpen: (open: boolean) => void;
  selectedKeyHistory: any[];
  setSelectedKeyHistory: (history: any[]) => void;
  isHistoryLoading: boolean;
  setIsHistoryLoading: (loading: boolean) => void;
};

const KeyVaultContext = createContext<KeyVaultContextType | undefined>(undefined);

export const KeyVaultProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedApiKey, setSelectedApiKey] = useState<ApiKey | null>(null);
  const [keyDetailsOpen, setKeyDetailsOpen] = useState<boolean>(false);
  const [viewHistoryOpen, setViewHistoryOpen] = useState<boolean>(false);
  const [selectedKeyHistory, setSelectedKeyHistory] = useState<any[]>([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState<boolean>(false);
  
  const value = {
    selectedApiKey,
    setSelectedApiKey,
    keyDetailsOpen,
    setKeyDetailsOpen,
    viewHistoryOpen,
    setViewHistoryOpen,
    selectedKeyHistory,
    setSelectedKeyHistory,
    isHistoryLoading,
    setIsHistoryLoading,
  };

  return (
    <KeyVaultContext.Provider value={value}>
      {children}
    </KeyVaultContext.Provider>
  );
};

export const useKeyVaultContext = () => {
  const context = useContext(KeyVaultContext);
  if (context === undefined) {
    throw new Error('useKeyVaultContext must be used within a KeyVaultProvider');
  }
  return context;
};
