
import { Link } from 'react-router-dom';
import { ChevronRight, ExternalLink, History, Clock, Lock } from 'lucide-react';
import SBETIcon from '@/components/icons/SBETIcon';
import { SOLANA_NETWORKS } from '@/config/solana';
import { useSolanaWallet } from '@/context/SolanaWalletContext';

const QuickLinks = () => {
  const { network } = useSolanaWallet();
  
  return (
    <div className="bg-sportbet-gray rounded-lg border border-sportbet-light-gray">
      <div className="p-6 border-b border-sportbet-light-gray">
        <div className="flex items-center gap-3">
          <Clock size={18} className="text-sportbet-green" />
          <h3 className="text-lg font-medium text-white">Quick Links</h3>
        </div>
      </div>
      
      <div className="p-3">
        <Link to="/predictions">
          <div className="flex items-center justify-between p-3 hover:bg-sportbet-dark/50 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-sportbet-blue/20 rounded-full flex items-center justify-center">
                <SBETIcon size={16} className="text-sportbet-blue" />
              </div>
              <span className="text-white">Browse Predictions</span>
            </div>
            <ChevronRight size={16} className="text-gray-500" />
          </div>
        </Link>
        
        <Link to="/profile">
          <div className="flex items-center justify-between p-3 hover:bg-sportbet-dark/50 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-sportbet-green/20 rounded-full flex items-center justify-center">
                <History size={16} className="text-sportbet-green" />
              </div>
              <span className="text-white">Purchase History</span>
            </div>
            <ChevronRight size={16} className="text-gray-500" />
          </div>
        </Link>
        
        <Link to="/faq">
          <div className="flex items-center justify-between p-3 hover:bg-sportbet-dark/50 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-sportbet-orange/20 rounded-full flex items-center justify-center">
                <Lock size={16} className="text-sportbet-orange" />
              </div>
              <span className="text-white">Token FAQ</span>
            </div>
            <ChevronRight size={16} className="text-gray-500" />
          </div>
        </Link>
        
        {/* Solana Explorer link */}
        <a 
          href={`${SOLANA_NETWORKS[network].explorerUrl}`} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <div className="flex items-center justify-between p-3 hover:bg-sportbet-dark/50 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                <ExternalLink size={16} className="text-purple-500" />
              </div>
              <span className="text-white">Solana Explorer</span>
            </div>
            <ChevronRight size={16} className="text-gray-500" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default QuickLinks;
