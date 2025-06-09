
import { supabase } from '@/integrations/supabase/client';

/**
 * Ανακτά το κλειδί API Helius από τη βάση δεδομένων
 */
export const getHeliusApiKey = async (): Promise<string | null> => {
  try {
    // Προσπαθούμε πρώτα να βρούμε το κύριο κλειδί Helius
    const { data: mainKeyData, error: mainKeyError } = await supabase
      .from('api_keys')
      .select('value')
      .eq('name', 'HELIUS_API_KEY_MAIN')
      .eq('status', 'active')
      .maybeSingle();
    
    if (!mainKeyError && mainKeyData?.value) {
      console.log('Βρέθηκε το κύριο κλειδί Helius');
      return mainKeyData.value;
    }

    // Αν δεν βρούμε το κύριο κλειδί, ψάχνουμε οποιοδήποτε κλειδί με provider_type 'helius'
    const { data, error } = await supabase
      .from('api_keys')
      .select('value')
      .eq('provider_type', 'helius')
      .eq('status', 'active')
      .maybeSingle();
    
    if (error) {
      console.error('Σφάλμα κατά την ανάκτηση του κλειδιού Helius API:', error);
      return 'ddb32813-1f4b-459d-8964-310b1b73a053'; // Fallback στο προεπιλεγμένο κλειδί
    }
    
    if (data?.value) {
      console.log('Βρέθηκε εναλλακτικό κλειδί Helius');
      return data.value;
    } else {
      console.log('Δεν βρέθηκε κλειδί Helius, χρήση προεπιλεγμένου');
      return 'ddb32813-1f4b-459d-8964-310b1b73a053'; // Fallback στο προεπιλεγμένο κλειδί
    }
  } catch (error) {
    console.error('Απροσδόκητο σφάλμα κατά την ανάκτηση του κλειδιού Helius API:', error);
    return 'ddb32813-1f4b-459d-8964-310b1b73a053'; // Fallback στο προεπιλεγμένο κλειδί
  }
};

/**
 * Δημιουργεί URLs για διαφορετικά endpoints του Helius API
 */
export const getHeliusEndpoints = (apiKey: string = 'ddb32813-1f4b-459d-8964-310b1b73a053') => {
  return {
    rpcUrl: `https://mainnet.helius-rpc.com/?api-key=${apiKey}`,
    wsUrl: `wss://mainnet.helius-rpc.com/?api-key=${apiKey}`,
    eclipseUrl: 'https://eclipse.helius-rpc.com/',
    apiBaseUrl: `https://api.helius.xyz/v0`,
    transactionsUrl: `https://api.helius.xyz/v0/transactions/?api-key=${apiKey}`,
    addressTransactionsUrl: (address: string) => 
      `https://api.helius.xyz/v0/addresses/${address}/transactions/?api-key=${apiKey}`
  };
};

/**
 * Ελέγχει αν το API key είναι έγκυρο κάνοντας μια δοκιμαστική κλήση
 */
export const validateHeliusApiKey = async (apiKey: string): Promise<boolean> => {
  try {
    const endpoints = getHeliusEndpoints(apiKey);
    
    const response = await fetch(endpoints.rpcUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getHealth',
      }),
    });

    if (!response.ok) {
      console.error('Το κλειδί API Helius δεν είναι έγκυρο:', await response.text());
      return false;
    }

    const data = await response.json();
    return !data.error;
  } catch (error) {
    console.error('Σφάλμα κατά τον έλεγχο του κλειδιού API Helius:', error);
    return false;
  }
};

/**
 * Ανακτά τις συναλλαγές χρησιμοποιώντας το Helius API
 */
export const fetchTransactionsWithHelius = async () => {
  const apiKey = await getHeliusApiKey();
  
  if (!apiKey) {
    throw new Error('Το κλειδί API Helius δεν είναι διαθέσιμο');
  }
  
  const endpoints = getHeliusEndpoints(apiKey);
  
  try {
    const response = await fetch(endpoints.transactionsUrl);
    if (!response.ok) {
      throw new Error(`Σφάλμα API: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Σφάλμα κατά την ανάκτηση συναλλαγών:', error);
    throw error;
  }
};

/**
 * Ανακτά τις συναλλαγές μιας διεύθυνσης χρησιμοποιώντας το Helius API
 */
export const fetchAddressTransactions = async (address: string) => {
  const apiKey = await getHeliusApiKey();
  
  if (!apiKey) {
    throw new Error('Το κλειδί API Helius δεν είναι διαθέσιμο');
  }

  const endpoints = getHeliusEndpoints(apiKey);
  const url = endpoints.addressTransactionsUrl(address);
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Σφάλμα API: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Σφάλμα κατά την ανάκτηση συναλλαγών διεύθυνσης ${address}:`, error);
    throw error;
  }
};

/**
 * Ελέγχει την υγεία των endpoints του Helius API
 */
export const checkHeliusApiHealth = async (): Promise<{
  mainnet: boolean;
  websocket: boolean;
  transactions: boolean;
}> => {
  const apiKey = await getHeliusApiKey();
  if (!apiKey) {
    return { mainnet: false, websocket: false, transactions: false };
  }

  const endpoints = getHeliusEndpoints(apiKey);
  const results = {
    mainnet: false,
    websocket: false,
    transactions: false
  };

  // Έλεγχος του Mainnet RPC
  try {
    const response = await fetch(endpoints.rpcUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getHealth',
      }),
    });
    results.mainnet = response.ok;
  } catch (error) {
    console.error('Σφάλμα κατά τον έλεγχο του Mainnet RPC:', error);
  }

  // Έλεγχος του Transactions API
  try {
    const response = await fetch(`${endpoints.apiBaseUrl}/health?api-key=${apiKey}`);
    results.transactions = response.ok;
  } catch (error) {
    console.error('Σφάλμα κατά τον έλεγχο του Transactions API:', error);
  }

  // Δεν μπορούμε να ελέγξουμε απευθείας το WebSocket, οπότε υποθέτουμε ότι έχει την ίδια κατάσταση με το mainnet
  results.websocket = results.mainnet;

  return results;
};
