
import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const LockedRewards = () => {
  return (
    <div className="bg-sportbet-gray rounded-lg border border-sportbet-light-gray">
      <div className="p-6 border-b border-sportbet-light-gray">
        <div className="flex items-center gap-3">
          <Lock size={18} className="text-sportbet-orange" />
          <h3 className="text-lg font-medium text-white">Locked Rewards</h3>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-sm text-gray-300 mb-4">
          Tokens earned from winning predictions are locked for 1 year from the date they are earned.
        </p>
        
        <div className="p-4 bg-sportbet-dark rounded-lg border border-sportbet-light-gray mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400 text-sm">Total Locked:</span>
            <span className="text-white font-medium">0 SBET</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 text-sm">Available After:</span>
            <span className="text-white font-medium">N/A</span>
          </div>
        </div>
        
        {/* No locked rewards state */}
        <div className="text-center py-4">
          <p className="text-sm text-gray-400">
            You haven't earned any rewards yet.
          </p>
          <Link to="/predictions" className="text-sportbet-blue text-sm hover:underline mt-2 inline-block">
            Start making predictions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LockedRewards;
