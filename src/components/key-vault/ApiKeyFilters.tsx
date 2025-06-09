import React from 'react';
import { Database, Search, BarChart, Wallet, Key, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApiKeysContext } from '@/context/apiKeys';

export function ApiKeyFilters() {
  const { 
    searchTerm, 
    setSearchTerm, 
    selectedCategory, 
    setSelectedCategory, 
    categories
  } = useApiKeysContext();

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
    <div 
      className="flex flex-col md:flex-row gap-4 mb-6"
      role="search"
      aria-label="API key filters"
    >
      <div className="flex-1">
        <Input
          placeholder="Search API keys..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
          aria-label="Search API keys"
        />
      </div>
      
      <div 
        className="flex gap-2 flex-wrap"
        role="group"
        aria-label="Filter by category"
      >
        <Button 
          variant="outline" 
          onClick={() => setSelectedCategory(null)} 
          className={selectedCategory === null ? 'border-primary' : ''}
          aria-pressed={selectedCategory === null}
        >
          All
        </Button>
        
        {categories.map(category => (
          <Button
            key={category}
            variant="outline"
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? 'border-primary' : ''}
            aria-pressed={selectedCategory === category}
          >
            {getCategoryIcon(category)}
            <span className="ml-2 capitalize">{category.replace('_', ' ')}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
