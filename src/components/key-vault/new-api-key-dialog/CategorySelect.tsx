
import React from 'react';

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function CategorySelect({ value, onChange }: CategorySelectProps) {
  return (
    <div className="grid gap-2">
      <label htmlFor="category" className="text-sm font-medium">Category</label>
      <select
        id="category"
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
  );
}
