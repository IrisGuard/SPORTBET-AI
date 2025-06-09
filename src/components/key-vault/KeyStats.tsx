import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApiKeysContext } from '@/context/apiKeys';

export function KeyStats() {
  const { apiKeys, categories } = useApiKeysContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Keys</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{apiKeys.length}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Required Keys</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {apiKeys.filter(key => key.is_required).length}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{categories.length}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
              {apiKeys.filter(key => key.status === 'active').length} Active
            </Badge>
            <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
              {apiKeys.filter(key => key.status === 'inactive').length} Inactive
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
