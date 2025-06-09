
import React from 'react';
import { Database, Search, BarChart, Wallet, Key, Shield } from 'lucide-react';

interface ApiKeyCategoryProps {
  category: string;
  labelId: string;
}

export function ApiKeyCategory({ category, labelId }: ApiKeyCategoryProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'blockchain': return <Database className="h-4 w-4" aria-hidden="true" />;
      case 'explorer': return <Search className="h-4 w-4" aria-hidden="true" />;
      case 'crypto_data': return <BarChart className="h-4 w-4" aria-hidden="true" />;
      case 'defi': return <Wallet className="h-4 w-4" aria-hidden="true" />;
      case 'wallet': return <Key className="h-4 w-4" aria-hidden="true" />;
      default: return <Shield className="h-4 w-4" aria-hidden="true" />;
    }
  };

  return (
    <div>
      <h4 className="text-sm font-medium mb-1" id={labelId}>Category</h4>
      <div 
        className="flex items-center gap-1.5"
        aria-labelledby={labelId}
      >
        {getCategoryIcon(category)}
        <span className="capitalize">
          {category.replace('_', ' ')}
        </span>
      </div>
    </div>
  );
}
