import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApiKeysContext } from '@/context/apiKeys';

export function KeyVaultHeader() {
  const { setNewKeyDialogOpen } = useApiKeysContext();
  
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold">API Key Vault</h1>
        <p className="text-muted-foreground">Manage and monitor all API keys securely</p>
      </div>
      <Button onClick={() => setNewKeyDialogOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Add New API Key
      </Button>
    </div>
  );
}
