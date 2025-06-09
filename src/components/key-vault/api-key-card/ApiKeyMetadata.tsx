
import React from 'react';
import { format } from 'date-fns';

interface ApiKeyMetadataProps {
  lastUpdated: string;
  labelId: string;
}

export function ApiKeyMetadata({ lastUpdated, labelId }: ApiKeyMetadataProps) {
  return (
    <div>
      <h4 className="text-sm font-medium mb-1" id={labelId}>Last Updated</h4>
      <div 
        className="text-sm text-muted-foreground"
        aria-labelledby={labelId}
      >
        {format(new Date(lastUpdated), 'MMM d, yyyy')}
      </div>
    </div>
  );
}
