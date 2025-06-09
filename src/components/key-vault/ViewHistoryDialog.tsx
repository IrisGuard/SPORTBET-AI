import React, { useEffect } from 'react';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useKeyVaultContext } from '@/context/KeyVaultContext';
import { useApiKeysContext } from '@/context/apiKeys';

export function ViewHistoryDialog() {
  const { 
    selectedApiKey, 
    viewHistoryOpen, 
    setViewHistoryOpen, 
    selectedKeyHistory,
    setSelectedKeyHistory,
    isHistoryLoading,
    setIsHistoryLoading
  } = useKeyVaultContext();
  
  // Fetch history for the selected API key when dialog opens
  useEffect(() => {
    const fetchHistory = async () => {
      if (viewHistoryOpen && selectedApiKey) {
        try {
          setIsHistoryLoading(true);
          
          // Mock history data for now 
          // In a real implementation, this would fetch from a service
          const mockHistory = [
            {
              id: '1',
              timestamp: new Date().toISOString(),
              action: 'UPDATE',
              admin_name: 'Admin User',
              details: JSON.stringify({ status: 'inactive', previous: 'active' })
            },
            {
              id: '2',
              timestamp: new Date(Date.now() - 86400000).toISOString(),
              action: 'CREATE',
              admin_name: 'Admin User',
              details: null
            }
          ];
          
          setTimeout(() => {
            setSelectedKeyHistory(mockHistory);
            setIsHistoryLoading(false);
          }, 500);
        } catch (error) {
          console.error('Error fetching API key history:', error);
          setIsHistoryLoading(false);
        }
      }
    };
    
    fetchHistory();
  }, [viewHistoryOpen, selectedApiKey, setSelectedKeyHistory, setIsHistoryLoading]);

  // Close dialog handler
  const handleClose = () => {
    setViewHistoryOpen(false);
    // Clear history when closing
    setSelectedKeyHistory([]);
  };

  const handleEscapeKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  return (
    <Dialog 
      open={viewHistoryOpen} 
      onOpenChange={setViewHistoryOpen}
      aria-labelledby="history-dialog-title"
      aria-describedby="history-dialog-description"
    >
      <DialogContent 
        className="sm:max-w-[600px]"
        onKeyDown={handleEscapeKeyPress}
      >
        <DialogHeader>
          <DialogTitle id="history-dialog-title">API Key History</DialogTitle>
          <DialogDescription id="history-dialog-description">
            {selectedApiKey ? `Change history for ${selectedApiKey.name}` : 'Loading...'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 max-h-[400px] overflow-y-auto">
          {isHistoryLoading ? (
            <div className="flex justify-center items-center p-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
              <span className="sr-only">Loading history</span>
            </div>
          ) : selectedKeyHistory.length > 0 ? (
            <div className="space-y-4">
              {selectedKeyHistory.map((item) => (
                <Card key={item.id}>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant={item.action === 'UPDATE' ? 'outline' : 'default'}>
                        {item.action}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {format(new Date(item.timestamp), 'MMM d, yyyy HH:mm')}
                      </span>
                    </div>
                    
                    <p className="text-sm"><strong>By:</strong> {item.admin_name}</p>
                    
                    {item.details && (
                      <>
                        <Separator className="my-2" />
                        <div className="text-sm">
                          <p className="font-medium mb-1">Changes:</p>
                          <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                            {JSON.stringify(JSON.parse(item.details), null, 2)}
                          </pre>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No history available</p>
          )}
        </div>
        
        <DialogFooter>
          <Button 
            onClick={handleClose}
            aria-label="Close history dialog"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
