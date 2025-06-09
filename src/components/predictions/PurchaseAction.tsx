
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

type PurchaseActionProps = {
  price: number;
  isFree: boolean;
  onClose: () => void;
};

const PurchaseAction = ({ price, isFree, onClose }: PurchaseActionProps) => {
  const [purchasing, setPurchasing] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handlePurchase = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to purchase predictions",
        variant: "destructive"
      });
      return;
    }
    
    setPurchasing(true);
    
    // In a real implementation, we would:
    // 1. Check if user has enough tokens
    // 2. Deduct tokens
    // 3. Record purchase
    // 4. Unlock prediction
    
    try {
      // Demo implementation
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      toast({
        title: "Purchase successful",
        description: `You've purchased this prediction for ${price} SBET tokens`,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Purchase failed",
        description: "There was an error processing your purchase",
        variant: "destructive"
      });
    } finally {
      setPurchasing(false);
    }
  };

  if (isFree) {
    return (
      <Button className="bg-sportbet-green hover:bg-sportbet-green/80 text-white" onClick={onClose}>
        Close
      </Button>
    );
  }

  return (
    <Button 
      className="bg-sportbet-blue hover:bg-sportbet-blue/80 text-white min-w-[120px]"
      onClick={handlePurchase}
      disabled={purchasing}
    >
      {purchasing ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        `Buy for ${price} SBET`
      )}
    </Button>
  );
};

export default PurchaseAction;
