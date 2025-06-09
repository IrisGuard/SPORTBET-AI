
import { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface BuyTokensTabProps {
  profile: any;
}

const BuyTokensTab = ({ profile }: BuyTokensTabProps) => {
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  
  const amountOptions = [
    { value: "10", tokens: "1,000" },
    { value: "50", tokens: "5,000" },
    { value: "100", tokens: "10,000" },
    { value: "500", tokens: "50,000" },
    { value: "1000", tokens: "100,000" },
  ];

  const handleBuyTokens = () => {
    if (!selectedAmount) {
      toast.error("Please select an amount to purchase.");
      return;
    }
    
    toast.success(`Processing your purchase of $${selectedAmount} worth of SBET tokens.`);
  };

  return (
    <div className="p-6">
      <h3 className="text-lg font-medium text-white mb-4">Purchase SBET Tokens</h3>
      <p className="text-sm text-gray-300 mb-6">
        Select an amount below to purchase SBET tokens. Purchased tokens will be available immediately in your wallet.
      </p>
      
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        {amountOptions.map((option) => (
          <button
            key={option.value}
            className={`p-4 rounded-lg border ${
              selectedAmount === option.value
                ? 'bg-sportbet-blue/20 border-sportbet-blue'
                : 'bg-sportbet-dark border-sportbet-light-gray hover:bg-sportbet-dark/70'
            } transition-colors`}
            onClick={() => setSelectedAmount(option.value)}
          >
            <p className="text-white font-medium">${option.value}</p>
            <p className="text-xs text-gray-400">{option.tokens} SBET</p>
          </button>
        ))}
      </div>
      
      <div className="flex items-center gap-2 mb-6 text-sm text-gray-400">
        <CreditCard size={16} />
        <span>Secure payment via Stripe</span>
      </div>
      
      <Button 
        className="w-full bg-sportbet-blue hover:bg-sportbet-blue/80 text-white"
        onClick={handleBuyTokens}
      >
        Buy SBET Tokens
      </Button>
      
      <p className="text-xs text-gray-500 mt-3 text-center">
        Maximum $1,000 per day. By purchasing, you agree to our <a href="/terms" className="text-sportbet-blue hover:underline">Terms of Service</a>.
      </p>
    </div>
  );
};

export default BuyTokensTab;
