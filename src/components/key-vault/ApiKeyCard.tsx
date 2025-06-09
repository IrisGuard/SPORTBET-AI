
import React from 'react';
import { ApiKey } from '@/types/apiKeys';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { useApiKeysContext } from '@/context/apiKeys';
import { useKeyVaultContext } from '@/context/KeyVaultContext';
import {
  ApiKeyHeader,
  ApiKeyValue,
  ApiKeyCategory,
  ApiKeyMetadata,
  ApiKeyActions
} from './api-key-card';

type ApiKeyCardProps = {
  apiKey: ApiKey;
};

export function ApiKeyCard({ apiKey }: ApiKeyCardProps) {
  const { updateApiKey, setApiKeyToDelete } = useApiKeysContext();
  const { setSelectedApiKey, setViewHistoryOpen } = useKeyVaultContext();
  
  const handleViewHistory = () => {
    setSelectedApiKey(apiKey);
    setViewHistoryOpen(true);
  };

  const handleToggleStatus = () => {
    updateApiKey(apiKey.id, {
      status: apiKey.status === 'active' ? 'inactive' : 'active'
    });
  };

  const handleDelete = () => {
    setApiKeyToDelete(apiKey);
  };

  return (
    <Card className={apiKey.is_required ? 'border-primary/30' : ''}>
      <CardHeader className="pb-3">
        <ApiKeyHeader 
          name={apiKey.name}
          description={apiKey.description}
          status={apiKey.status}
          isRequired={apiKey.is_required}
        />
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="flex flex-col space-y-1.5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ApiKeyValue 
              value={apiKey.value}
              labelId={`key-value-label-${apiKey.id}`}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <ApiKeyCategory 
                category={apiKey.category}
                labelId={`category-label-${apiKey.id}`}
              />
              
              <ApiKeyMetadata 
                lastUpdated={apiKey.last_updated}
                labelId={`updated-label-${apiKey.id}`}
              />
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-3">
        <ApiKeyActions 
          apiKey={apiKey}
          onViewHistory={handleViewHistory}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDelete}
        />
      </CardFooter>
    </Card>
  );
}
