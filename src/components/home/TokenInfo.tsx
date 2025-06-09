
import { Brain, TrendingUp, BarChart3, Wallet, Zap, Trophy } from 'lucide-react';

const TokenInfo = () => {
  return (
    <section className="bg-sportbet-gray py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-sportbet-blue/10 text-sportbet-blue rounded-full px-4 py-1 text-sm font-medium inline-block">
              SBET Token
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-6">
              Power Your Predictions with SBET Token
            </h2>
            <p className="text-gray-300 mb-6">
              Our native cryptocurrency powers the entire ecosystem, allowing you to purchase predictions, 
              earn rewards, and participate in the platform governance.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-sportbet-dark p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-sportbet-green/10 p-2 rounded-full">
                    <Zap className="h-5 w-5 text-sportbet-green" />
                  </div>
                  <h3 className="text-white font-semibold">Purchase Predictions</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  Use SBET tokens to access premium AI-powered predictions across multiple sports.
                </p>
              </div>
              
              <div className="bg-sportbet-dark p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-sportbet-blue/10 p-2 rounded-full">
                    <BarChart3 className="h-5 w-5 text-sportbet-blue" />
                  </div>
                  <h3 className="text-white font-semibold">Stake & Earn</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  Stake your tokens to earn passive income and platform rewards.
                </p>
              </div>
              
              <div className="bg-sportbet-dark p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-sportbet-orange/10 p-2 rounded-full">
                    <Trophy className="h-5 w-5 text-sportbet-orange" />
                  </div>
                  <h3 className="text-white font-semibold">Compete & Win</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  Join prediction competitions and win from the prize pool.
                </p>
              </div>
              
              <div className="bg-sportbet-dark p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-sportbet-green/10 p-2 rounded-full">
                    <Brain className="h-5 w-5 text-sportbet-green" />
                  </div>
                  <h3 className="text-white font-semibold">Governance Power</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  Vote on platform decisions and help shape its future.
                </p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-sportbet-blue to-sportbet-green rounded-xl blur-xl opacity-20"></div>
            <div className="relative bg-sportbet-dark rounded-xl overflow-hidden p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-white">SBET Token</h3>
                  <p className="text-gray-400">Current Price</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">$1.24</div>
                  <div className="text-sportbet-green text-sm">+5.2% (24h)</div>
                </div>
              </div>
              
              <div className="h-40 bg-sportbet-gray/20 rounded-lg mb-8">
                {/* This would be a chart in production */}
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-400">Price chart would be displayed here</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Market Cap</p>
                  <p className="text-white font-semibold">$18.6M</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">24h Volume</p>
                  <p className="text-white font-semibold">$2.4M</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Circulating Supply</p>
                  <p className="text-white font-semibold">15M SBET</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Supply</p>
                  <p className="text-white font-semibold">50M SBET</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button className="bg-sportbet-blue hover:bg-sportbet-blue/80 text-white font-semibold py-2 px-6 rounded-lg flex-1">
                  Buy SBET
                </button>
                <button className="bg-transparent border border-sportbet-gray hover:border-sportbet-blue text-white font-semibold py-2 px-6 rounded-lg flex-1">
                  View Tokenomics
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenInfo;
