
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useApiKeysContext } from '@/context/apiKeys';
import { ApiKeyForm } from './ApiKeyForm';

export function NewApiKeyDialog() {
  const { 
    newKeyDialogOpen, 
    setNewKeyDialogOpen, 
    newKeyData, 
    setNewKeyData,
    createApiKey 
  } = useApiKeysContext();

  const handleCreateApiKey = async () => {
    const result = await createApiKey(newKeyData);
    if (result) {
      setNewKeyDialogOpen(false);
      setNewKeyData({
        name: '',
        value: '',
        category: 'blockchain',
        status: 'active',
        description: '',
        is_required: false,
        provider_type: null,
        expiry_date: null
      });
    }
  };

  const handleEscapeKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setNewKeyDialogOpen(false);
    }
  };

  return (
    <Dialog 
      open={newKeyDialogOpen} 
      onOpenChange={setNewKeyDialogOpen}
      aria-labelledby="new-key-dialog-title"
      aria-describedby="new-key-dialog-description"
    >
      <DialogContent 
        className="sm:max-w-[425px]"
        onKeyDown={handleEscapeKeyPress}
      >
        <DialogHeader>
          <DialogTitle id="new-key-dialog-title">Add New API Key</DialogTitle>
          <DialogDescription id="new-key-dialog-description">
            Enter the details of the API key to add to the vault.
          </DialogDescription>
        </DialogHeader>
        
        <ApiKeyForm 
          newKeyData={newKeyData}
          setNewKeyData={setNewKeyData}
          onSubmit={handleCreateApiKey}
          onCancel={() => setNewKeyDialogOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
