import React from 'react';
import { Loader2, Key } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ApiKeyCard } from './ApiKeyCard';
import { useApiKeysContext } from '@/context/apiKeys';

export function ApiKeysList() {
  const { loading, filteredKeys } = useApiKeysContext();

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12" aria-live="polite" aria-busy="true">
        <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
        <span className="sr-only">Loading API keys</span>
      </div>
    );
  }

  if (filteredKeys.length === 0) {
    return (
      <Card role="status" aria-live="polite">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <div className="rounded-full bg-muted p-3 mb-4">
            <Key className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
          </div>
          <h3 className="text-lg font-medium">No API keys found</h3>
          <p className="text-sm text-muted-foreground text-center max-w-xs mt-2">
            No API keys match your current filter criteria. Try adjusting your search or filter settings.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div 
      className="space-y-4"
      aria-label={`API keys list, ${filteredKeys.length} keys found`}
      aria-live="polite"
    >
      {filteredKeys.map(apiKey => (
        <ApiKeyCard 
          key={apiKey.id} 
          apiKey={apiKey}
        />
      ))}
    </div>
  );
}
