
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CardTitle, CardDescription } from '@/components/ui/card';

interface ApiKeyHeaderProps {
  name: string;
  description: string | null;
  status: string;
  isRequired: boolean;
}

export function ApiKeyHeader({ name, description, status, isRequired }: ApiKeyHeaderProps) {
  const statusText = status === 'active' ? 'Active' : 'Inactive';
  
  return (
    <div className="flex justify-between items-start">
      <div>
        <div className="flex items-center gap-2">
          <CardTitle>{name}</CardTitle>
          {isRequired && (
            <Badge 
              variant="outline" 
              className="bg-primary/10 text-primary border-primary/30"
              aria-label="Required API key"
            >
              Required
            </Badge>
          )}
        </div>
        <CardDescription>{description || 'No description provided'}</CardDescription>
      </div>
      <Badge
        variant={status === 'active' ? 'default' : 'outline'}
        className={status === 'active' 
          ? 'bg-green-500 hover:bg-green-500' 
          : 'text-yellow-500 border-yellow-500/50'
        }
        aria-label={`Status: ${statusText}`}
      >
        {status.toUpperCase()}
      </Badge>
    </div>
  );
}
