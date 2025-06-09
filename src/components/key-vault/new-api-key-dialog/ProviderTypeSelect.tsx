
import React from 'react';

interface ProviderTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProviderTypeSelect({ value, onChange }: ProviderTypeSelectProps) {
  return (
    <div className="grid gap-2">
      <label htmlFor="provider_type" className="text-sm font-medium">Provider Type (Optional)</label>
      <select
        id="provider_type"
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
  );
}
