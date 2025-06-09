
import React from 'react';

interface ApiKeyValueProps {
  value: string;
  labelId: string;
}

export function ApiKeyValue({ value, labelId }: ApiKeyValueProps) {
  const truncatedValue = value.length > 40 
    ? `${value.substring(0, 40)}...` 
    : value;

  return (
    <div>
      <h4 className="text-sm font-medium mb-1" id={labelId}>API Key Value</h4>
      <div 
        className="bg-muted p-2 rounded text-sm font-mono overflow-x-auto" 
        aria-labelledby={labelId}
        tabIndex={0}
      >
        {truncatedValue}
      </div>
    </div>
  );
}
