import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useApiKeysContext } from '@/context/apiKeys';

export function DeleteApiKeyDialog() {
  const { apiKeyToDelete, setApiKeyToDelete, deleteApiKey } = useApiKeysContext();

  const handleEscapeKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setApiKeyToDelete(null);
    }
  };

  return (
    <AlertDialog 
      open={!!apiKeyToDelete} 
      onOpenChange={(open) => !open && setApiKeyToDelete(null)}
    >
      <AlertDialogContent 
        onKeyDown={handleEscapeKeyPress}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <AlertDialogHeader>
          <AlertDialogTitle id="delete-dialog-title">Are you sure?</AlertDialogTitle>
          <AlertDialogDescription id="delete-dialog-description">
            This action will permanently delete the API key "{apiKeyToDelete?.name}". 
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel aria-label="Cancel deletion">Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={() => {
              if (apiKeyToDelete) {
                deleteApiKey(apiKeyToDelete.id);
              }
            }}
            className="bg-destructive hover:bg-destructive/90"
            aria-label={`Confirm deletion of ${apiKeyToDelete?.name}`}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
