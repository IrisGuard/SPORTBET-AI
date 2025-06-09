
import { Button } from '@/components/ui/button';

const StakeTab = () => {
  return (
    <div className="p-6">
      <h3 className="text-lg font-medium text-white mb-4">Stake SBET Tokens</h3>
      <p className="text-sm text-gray-300 mb-6">
        Lock your SBET tokens to earn rewards over time. The longer you stake, the higher the rewards.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-sportbet-dark p-4 rounded-lg border border-sportbet-light-gray">
          <h4 className="text-white font-medium mb-2">30 Day Lock</h4>
          <p className="text-xl font-bold text-sportbet-green">5% APY</p>
          <p className="text-xs text-gray-400 mb-4">Minimum: 1,000 SBET</p>
          <Button variant="outline" size="sm" className="w-full border-sportbet-green text-sportbet-green hover:bg-sportbet-green/10">
            Stake Now
          </Button>
        </div>
        
        <div className="bg-sportbet-dark p-4 rounded-lg border border-sportbet-light-gray">
          <h4 className="text-white font-medium mb-2">90 Day Lock</h4>
          <p className="text-xl font-bold text-sportbet-green">12% APY</p>
          <p className="text-xs text-gray-400 mb-4">Minimum: 1,000 SBET</p>
          <Button variant="outline" size="sm" className="w-full border-sportbet-green text-sportbet-green hover:bg-sportbet-green/10">
            Stake Now
          </Button>
        </div>
        
        <div className="bg-sportbet-dark p-4 rounded-lg border border-sportbet-light-gray">
          <h4 className="text-white font-medium mb-2">180 Day Lock</h4>
          <p className="text-xl font-bold text-sportbet-green">20% APY</p>
          <p className="text-xs text-gray-400 mb-4">Minimum: 1,000 SBET</p>
          <Button variant="outline" size="sm" className="w-full border-sportbet-green text-sportbet-green hover:bg-sportbet-green/10">
            Stake Now
          </Button>
        </div>
      </div>
      
      <p className="text-xs text-gray-500 text-center">
        Staked tokens cannot be withdrawn until the lock period ends.
      </p>
    </div>
  );
};

export default StakeTab;
