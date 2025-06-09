
import { useCallback } from 'react';
import { useHeliusApi } from './useHeliusApi';
import { ApiEndpointUrls } from '@/types/apiKeys';

/**
 * Επιστρέφει τα URLs για τα διάφορα endpoints που χρησιμοποιεί η εφαρμογή.
 * Αυτό συγκεντρώνει την πρόσβαση σε εξωτερικά APIs σε ένα σημείο.
 */
export const useApiEndpoints = (): ApiEndpointUrls => {
  const heliusApi = useHeliusApi();

  const getHeliusAddressTransactions = useCallback((address: string) => {
    return heliusApi.getAddressTransactionsUrl(address);
  }, [heliusApi]);

  return {
    helius: {
      mainnet: heliusApi.getMainnetRpcUrl(),
      websocket: heliusApi.getWebSocketUrl(),
      eclipse: heliusApi.getEclipseUrl(),
      transactions: heliusApi.getTransactionsUrl(),
      getAddressTransactions: getHeliusAddressTransactions,
      apiKey: heliusApi.apiKey,
    },
    // Μπορούμε να προσθέσουμε κι άλλα API endpoints εδώ μελλοντικά
  };
};

// Διευκόλυνση για κλήσεις επικύρωσης των APIs
export const validateApiEndpoints = async (): Promise<{
  helius: {
    mainnet: boolean;
    transactions: boolean;
    websocket: boolean;
  };
}> => {
  const { checkHeliusApiHealth } = await import('@/services/heliusService');
  
  const heliusHealth = await checkHeliusApiHealth();
  
  return {
    helius: heliusHealth
  };
};
