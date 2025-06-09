
import React from 'react';
import { Button } from '@/components/ui/button';
import { ApiKey } from '@/types/apiKeys';

interface ApiKeyActionsProps {
  apiKey: ApiKey;
  onViewHistory: () => void;
  onToggleStatus: () => void;
  onDelete: () => void;
}

export function ApiKeyActions({ apiKey, onViewHistory, onToggleStatus, onDelete }: ApiKeyActionsProps) {
  const toggleStatusAction = apiKey.status === 'active' ? 'Deactivate' : 'Activate';
  
  return (
    <div className="flex justify-between w-full">
      <Button 
        variant="outline" 
        size="sm"
        onClick={onViewHistory}
        aria-label="View API key history"
      >
        View History
      </Button>
      
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleStatus}
          aria-label={`${toggleStatusAction} this API key`}
        >
          {toggleStatusAction}
        </Button>
        
        <Button
          variant="destructive"
          size="sm"
          onClick={onDelete}
          aria-label={`Delete ${apiKey.name} API key`}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
