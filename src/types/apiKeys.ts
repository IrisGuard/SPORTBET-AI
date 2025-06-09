
export type ApiKey = {
  id: string;
  name: string;
  value: string;
  category: string;
  status: string;
  description: string | null;
  created_at: string;
  last_updated: string;
  expiry_date: string | null;
  is_required: boolean;
  provider_type: string | null;
};

export type ApiKeyInput = Omit<ApiKey, 'id' | 'created_at' | 'last_updated'>;

export type ApiEndpointUrls = {
  helius: {
    mainnet: string | null;
    websocket: string | null;
    eclipse: string;
    transactions: string | null;
    getAddressTransactions: (address: string) => string | null;
    apiKey: string | null;
  },
  // Εδώ μπορούν να προστεθούν περισσότερα API endpoints
};

export type ApiHealthStatus = {
  helius: {
    mainnet: boolean;
    transactions: boolean;
    websocket: boolean;
  };
};
