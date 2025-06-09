
import { supabase } from '@/integrations/supabase/client';
import { ApiKey, ApiKeyInput } from '@/types/apiKeys';

/**
 * Fetches all API keys from the database
 */
export const fetchAllApiKeys = async () => {
  const { data, error } = await supabase.rpc('get_api_keys');
  
  if (error) throw error;
  return data as ApiKey[];
};

/**
 * Fetches API keys by category
 */
export const fetchApiKeysByCategory = async (category: string) => {
  const { data, error } = await supabase.rpc('get_api_keys_by_category', { p_category: category });
  
  if (error) throw error;
  return data as ApiKey[];
};

/**
 * Fetches API keys by provider
 */
export const fetchApiKeysByProvider = async (providerType: string) => {
  const { data, error } = await supabase.rpc('get_api_keys_by_provider', { p_provider_type: providerType });
  
  if (error) throw error;
  return data as ApiKey[];
};

/**
 * Creates a new API key
 */
export const createApiKeyInDB = async (newKey: ApiKeyInput) => {
  const { error } = await supabase.from('api_keys').insert(newKey);
  
  if (error) throw error;
  return true;
};

/**
 * Updates an existing API key
 */
export const updateApiKeyInDB = async (id: string, updates: Partial<ApiKey>) => {
  // Log the action first
  await logApiKeyAction(id, 'UPDATE', updates);
  
  // Then update the key
  const { error } = await supabase
    .from('api_keys')
    .update(updates)
    .eq('id', id);
  
  if (error) throw error;
  return true;
};

/**
 * Deletes an API key
 */
export const deleteApiKeyFromDB = async (id: string) => {
  // Log the action first
  await logApiKeyAction(id, 'DELETE');
  
  // Then delete the key
  const { error } = await supabase
    .from('api_keys')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
};

/**
 * Logs an API key action
 */
export const logApiKeyAction = async (
  keyId: string,
  action: string,
  details?: object
) => {
  await supabase.rpc('log_api_key_action', { 
    p_key_id: keyId,
    p_action: action,
    p_details: details ? JSON.stringify(details) : null
  });
};
