
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useApiKeysContext } from '@/context/apiKeys';
import { Checkbox } from '@/components/ui/checkbox';

export function NewApiKeyDialog() {
  const { 
    newKeyDialogOpen, 
    setNewKeyDialogOpen, 
    newKeyData, 
    setNewKeyData,
    createApiKey 
  } = useApiKeysContext();

  const handleCreateApiKey = async () => {
    const result = await createApiKey(newKeyData);
    if (result) {
      setNewKeyDialogOpen(false);
      setNewKeyData({
        name: '',
        value: '',
        category: 'blockchain',
        status: 'active',
        description: '',
        is_required: false,
        provider_type: null,
        expiry_date: null
      });
    }
  };

  const handleEscapeKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setNewKeyDialogOpen(false);
    }
  };

  return (
    <Dialog 
      open={newKeyDialogOpen} 
      onOpenChange={setNewKeyDialogOpen}
      aria-labelledby="new-key-dialog-title"
      aria-describedby="new-key-dialog-description"
    >
      <DialogContent 
        className="sm:max-w-[425px]"
        onKeyDown={handleEscapeKeyPress}
      >
        <DialogHeader>
          <DialogTitle id="new-key-dialog-title">Add New API Key</DialogTitle>
          <DialogDescription id="new-key-dialog-description">
            Enter the details of the API key to add to the vault.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium">Name</label>
            <Input
              id="name"
              value={newKeyData.name}
              onChange={(e) => setNewKeyData({...newKeyData, name: e.target.value})}
              placeholder="e.g. SOLANA_RPC_URL"
              aria-required="true"
              aria-describedby="name-description"
            />
            <p id="name-description" className="text-xs text-muted-foreground">
              A descriptive name for your API key.
            </p>
          </div>
          
          <div className="grid gap-2">
            <label htmlFor="value" className="text-sm font-medium">Value</label>
            <Input
              id="value"
              value={newKeyData.value}
              onChange={(e) => setNewKeyData({...newKeyData, value: e.target.value})}
              placeholder="API key value"
              aria-required="true"
            />
          </div>
          
          <div className="grid gap-2">
            <label htmlFor="category" className="text-sm font-medium">Category</label>
            <select
              id="category"
              value={newKeyData.category}
              onChange={(e) => setNewKeyData({...newKeyData, category: e.target.value})}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-required="true"
            >
              <option value="blockchain">Blockchain</option>
              <option value="explorer">Explorer</option>
              <option value="crypto_data">Crypto Data</option>
              <option value="defi">DeFi</option>
              <option value="wallet">Wallet</option>
              <option value="helius">Helius</option>
              <option value="sports">Sports Data</option>
              <option value="ai">AI Services</option>
              <option value="payments">Payment Services</option>
              <option value="analytics">Analytics</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="grid gap-2">
            <label htmlFor="provider_type" className="text-sm font-medium">Provider Type (Optional)</label>
            <select
              id="provider_type"
              value={newKeyData.provider_type || ''}
              onChange={(e) => setNewKeyData({...newKeyData, provider_type: e.target.value || null})}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-required="false"
            >
              <option value="">Select Provider (Optional)</option>
              <option value="helius">Helius</option>
              <option value="quicknode">QuickNode</option>
              <option value="alchemy">Alchemy</option>
              <option value="chainstack">Chainstack</option>
              <option value="solscan">Solscan</option>
              <option value="solanabeach">Solana Beach</option>
              <option value="solanaexplorer">Solana Explorer</option>
              <option value="coingecko">CoinGecko</option>
              <option value="coinmarketcap">CoinMarketCap</option>
              <option value="sportmonks">SportMonks</option>
              <option value="openai">OpenAI</option>
              <option value="stripe">Stripe</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="grid gap-2">
            <label htmlFor="description" className="text-sm font-medium">Description (Optional)</label>
            <Input
              id="description"
              value={newKeyData.description || ''}
              onChange={(e) => setNewKeyData({...newKeyData, description: e.target.value})}
              placeholder="Brief description of the API key"
              aria-required="false"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="expiry_date" className="text-sm font-medium">Expiry Date (Optional)</label>
            <Input
              id="expiry_date"
              type="date"
              value={newKeyData.expiry_date ? new Date(newKeyData.expiry_date).toISOString().split('T')[0] : ''}
              onChange={(e) => {
                const value = e.target.value;
                setNewKeyData({
                  ...newKeyData, 
                  expiry_date: value ? new Date(value).toISOString() : null
                });
              }}
              placeholder="When does this API key expire?"
              aria-required="false"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="required"
              checked={newKeyData.is_required}
              onCheckedChange={(checked) => 
                setNewKeyData({...newKeyData, is_required: checked === true})
              }
              aria-labelledby="required-label"
            />
            <label 
              htmlFor="required" 
              className="text-sm font-medium"
              id="required-label"
            >
              Mark as required
            </label>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => setNewKeyDialogOpen(false)}
            aria-label="Cancel creating a new API key"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleCreateApiKey}
            aria-label="Add new API key"
          >
            Add API Key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
