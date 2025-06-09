
import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useApiKeysContext } from './ApiKeysContext';

export function useHeliusApi() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();
  const apiKeysContext = useApiKeysContext();

  const fetchHeliusApiKey = useCallback(async () => {
    try {
      setLoading(true);
      
      // Πρώτα προσπαθούμε να βρούμε το κλειδί από το context, αν είναι διαθέσιμο
      if (apiKeysContext) {
        const mainKey = apiKeysContext.getKeyByName('HELIUS_API_KEY_MAIN');
        if (mainKey?.value) {
          setApiKey(mainKey.value);
          setLoading(false);
          console.log('Χρήση κλειδιού Helius API από το context');
          return;
        }
        
        // Εάν δεν βρούμε το κύριο κλειδί, αναζητούμε οποιοδήποτε κλειδί με provider_type 'helius'
        const heliusKeys = apiKeysContext.getKeysByProvider('helius');
        if (heliusKeys.length > 0) {
          setApiKey(heliusKeys[0].value);
          setLoading(false);
          console.log('Χρήση εναλλακτικού κλειδιού Helius API από το context');
          return;
        }
      }
      
      // Αν δεν έχουμε context ή δεν βρέθηκαν κλειδιά, χρησιμοποιούμε απευθείας τη βάση δεδομένων
      const { data: mainKeyData, error: mainKeyError } = await supabase
        .from('api_keys')
        .select('value')
        .eq('name', 'HELIUS_API_KEY_MAIN')
        .eq('status', 'active')
        .maybeSingle();
      
      if (!mainKeyError && mainKeyData?.value) {
        setApiKey(mainKeyData.value);
        setLoading(false);
        console.log('Χρήση κλειδιού Helius API από τη βάση δεδομένων');
        return;
      }

      // Αν δεν βρεθεί το κύριο κλειδί, ψάχνουμε οποιοδήποτε κλειδί με provider_type 'helius'
      const { data, error } = await supabase
        .from('api_keys')
        .select('value')
        .eq('provider_type', 'helius')
        .eq('status', 'active')
        .maybeSingle();
      
      if (error) throw error;
      
      if (data?.value) {
        console.log('Χρήση εναλλακτικού κλειδιού Helius API από τη βάση δεδομένων');
        setApiKey(data.value);
      } else {
        // Fallback σε προεπιλεγμένο κλειδί
        console.log('Χρήση προεπιλεγμένου κλειδιού Helius API');
        setApiKey('ddb32813-1f4b-459d-8964-310b1b73a053');
      }
    } catch (err) {
      console.error('Error fetching Helius API key:', err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
      
      toast({
        variant: "destructive",
        title: "Σφάλμα κλειδιού API",
        description: "Δεν ήταν δυνατή η ανάκτηση του κλειδιού Helius API. Χρησιμοποιείται το προεπιλεγμένο κλειδί."
      });
      
      // Fallback σε προεπιλεγμένο κλειδί
      setApiKey('ddb32813-1f4b-459d-8964-310b1b73a053');
    } finally {
      setLoading(false);
    }
  }, [apiKeysContext, toast]);

  useEffect(() => {
    fetchHeliusApiKey();
  }, [fetchHeliusApiKey]);

  const getMainnetRpcUrl = useCallback(() => {
    if (!apiKey) return null;
    return `https://mainnet.helius-rpc.com/?api-key=${apiKey}`;
  }, [apiKey]);

  const getWebSocketUrl = useCallback(() => {
    if (!apiKey) return null;
    return `wss://mainnet.helius-rpc.com/?api-key=${apiKey}`;
  }, [apiKey]);

  const getEclipseUrl = useCallback(() => {
    return 'https://eclipse.helius-rpc.com/';
  }, []);

  const getTransactionsUrl = useCallback(() => {
    if (!apiKey) return null;
    return `https://api.helius.xyz/v0/transactions/?api-key=${apiKey}`;
  }, [apiKey]);

  const getAddressTransactionsUrl = useCallback((address: string) => {
    if (!apiKey) return null;
    return `https://api.helius.xyz/v0/addresses/${address}/transactions/?api-key=${apiKey}`;
  }, [apiKey]);

  return {
    apiKey,
    loading,
    error,
    getMainnetRpcUrl,
    getWebSocketUrl,
    getEclipseUrl,
    getTransactionsUrl,
    getAddressTransactionsUrl,
    refetch: fetchHeliusApiKey
  };
}
