
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ApiKeysProvider } from '@/context/apiKeys';
import { KeyVaultProvider } from '@/context/KeyVaultContext';
import { KeyVaultHeader } from '@/components/key-vault/KeyVaultHeader';
import { KeyStats } from '@/components/key-vault/KeyStats';
import { ApiKeyFilters } from '@/components/key-vault/ApiKeyFilters';
import { ApiKeysList } from '@/components/key-vault/ApiKeysList';
import { NewApiKeyDialog } from '@/components/key-vault/NewApiKeyDialog';
import { DeleteApiKeyDialog } from '@/components/key-vault/DeleteApiKeyDialog';
import { ViewHistoryDialog } from '@/components/key-vault/ViewHistoryDialog';

export default function KeyVault() {
  const { user, isAdmin } = useAuth();

  // Redirect if not authenticated or not admin
  if (!user) return <Navigate to="/auth" />;
  if (!isAdmin) return <Navigate to="/dashboard" />;

  return (
    <ApiKeysProvider>
      <KeyVaultProvider>
        <div 
          className="container mx-auto py-6"
          aria-labelledby="key-vault-title"
        >
          <KeyVaultHeader />
          <KeyStats />
          <ApiKeyFilters />
          <main>
            <ApiKeysList />
          </main>
          <NewApiKeyDialog />
          <DeleteApiKeyDialog />
          <ViewHistoryDialog />
        </div>
      </KeyVaultProvider>
    </ApiKeysProvider>
  );
}
