
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { DialogFooter } from '@/components/ui/dialog';
import { ApiKeyInput } from '@/types/apiKeys';
import { CategorySelect } from './CategorySelect';
import { ProviderTypeSelect } from './ProviderTypeSelect';

interface ApiKeyFormProps {
  newKeyData: ApiKeyInput;
  setNewKeyData: (data: ApiKeyInput) => void;
  onSubmit: () => Promise<void>;
  onCancel: () => void;
}

export function ApiKeyForm({ 
  newKeyData, 
  setNewKeyData, 
  onSubmit, 
  onCancel 
}: ApiKeyFormProps) {
  return (
    <>
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
        
        <CategorySelect 
          value={newKeyData.category}
          onChange={(value) => setNewKeyData({...newKeyData, category: value})}
        />

        <ProviderTypeSelect
          value={newKeyData.provider_type || ''}
          onChange={(value) => setNewKeyData({...newKeyData, provider_type: value || null})}
        />
        
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
          onClick={onCancel}
          aria-label="Cancel creating a new API key"
        >
          Cancel
        </Button>
        <Button 
          onClick={onSubmit}
          aria-label="Add new API key"
        >
          Add API Key
        </Button>
      </DialogFooter>
    </>
  );
}
