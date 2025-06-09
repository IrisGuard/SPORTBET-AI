
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { MessageCircle, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAuth } from '@/context/AuthContext';

interface ErrorLogItem {
  id: string;
  message: string;
  component?: string;
  timestamp: Date;
  status: 'new' | 'in_progress' | 'resolved';
}

export default function ErrorReporter() {
  const [errors, setErrors] = useState<ErrorLogItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  
  // Fetch errors for the current user
  useEffect(() => {
    if (!user?.id) return;
    
    const fetchErrors = async () => {
      // Using 'any' to bypass the type checking since we manually created this table
      const { data, error } = await supabase
        .from('error_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: false })
        .limit(20);
        
      if (error) {
        console.error('Failed to fetch errors:', error);
      } else {
        // Cast the data to our expected type
        setErrors(data as unknown as ErrorLogItem[]);
      }
    };
    
    fetchErrors();
    
    // Set up realtime subscription for new errors
    const channel = supabase
      .channel('errors_channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'error_logs',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          setErrors((currentErrors) => [payload.new as ErrorLogItem, ...currentErrors]);
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);
  
  // Number of unresolved errors
  const newErrorsCount = errors.filter(e => e.status === 'new').length;
  
  // Function to report an error to support
  const reportToSupport = async (errorId: string, message: string) => {
    // This is a placeholder for your chat integration
    // In a real implementation, you would open a chat with support
    // and send the error details
    
    // Mark the error as in_progress
    await supabase
      .from('error_logs')
      .update({ status: 'in_progress' })
      .eq('id', errorId);
      
    // Update local state
    setErrors(errors.map(err => 
      err.id === errorId ? { ...err, status: 'in_progress' } : err
    ));
    
    // Here you would integrate with your chat support system
    console.log(`Reporting error to support: ${message}`);
    
    // For demo purposes, show an alert
    alert("Error reported to support. A representative will assist you shortly.");
  };
  
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="fixed bottom-4 right-4 rounded-full shadow-lg h-12 w-12 bg-white dark:bg-gray-800"
          >
            <MessageCircle className="h-6 w-6" />
            {newErrorsCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 bg-red-500">
                {newErrorsCount}
              </Badge>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Error Reporting</DialogTitle>
            <DialogDescription>
              Recent errors detected in your session. Click "Get Help" to report to support.
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="h-[400px] mt-4">
            {errors.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4">
                <AlertCircle className="h-12 w-12 mb-2" />
                <p>No errors detected in your current session</p>
              </div>
            ) : (
              <div className="space-y-4">
                {errors.map((error) => (
                  <Alert key={error.id} variant={error.status === 'new' ? 'destructive' : 'default'}>
                    <AlertTitle className="flex justify-between">
                      <span>
                        {error.component || 'Unknown Component'}
                      </span>
                      <span className="text-xs opacity-70">
                        {new Date(error.timestamp).toLocaleString()}
                      </span>
                    </AlertTitle>
                    <AlertDescription className="mt-2">
                      <p className="mb-2">{error.message}</p>
                      {error.status === 'new' && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => reportToSupport(error.id, error.message)}
                          className="mt-2"
                        >
                          Get Help
                        </Button>
                      )}
                      {error.status === 'in_progress' && (
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                          Being addressed
                        </Badge>
                      )}
                      {error.status === 'resolved' && (
                        <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          Resolved
                        </Badge>
                      )}
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
