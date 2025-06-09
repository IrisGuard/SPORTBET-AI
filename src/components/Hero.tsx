
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface HeroProps {
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}

const Hero = ({ onLoginClick, onRegisterClick }: HeroProps) => {
  const { user } = useAuth();
  
  return (
    <div className="container mx-auto px-6 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <div className="inline-block bg-sportbet-blue/10 text-sportbet-blue rounded-full px-4 py-1 text-sm font-medium">
            AI-Powered Sports Predictions
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="gradient-text">Machine Learning</span> 
            <br />
            <span className="text-white">Predictions with</span>
            <br />
            <span className="text-sportbet-green">Crypto Rewards</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">
            SportBet AI combines cutting-edge machine learning with blockchain rewards for the most accurate sports prediction platform on the market.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            {!user ? (
              <Link to="/predictions">
                <Button 
                  className="bg-sportbet-blue hover:bg-sportbet-blue/80 text-white button-glow px-8 py-6 text-lg"
                >
                  See Predictions
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/dashboard">
                  <Button 
                    className="bg-sportbet-blue hover:bg-sportbet-blue/80 text-white button-glow px-8 py-6 text-lg"
                  >
                    Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/predictions">
                  <Button 
                    variant="outline" 
                    className="border-sportbet-gray text-white hover:bg-sportbet-gray/50 px-8 py-6 text-lg"
                  >
                    See Predictions
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-4 mt-4">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-sportbet-blue flex items-center justify-center text-xs text-white">JD</div>
              <div className="w-8 h-8 rounded-full bg-sportbet-green flex items-center justify-center text-xs text-white">KL</div>
              <div className="w-8 h-8 rounded-full bg-sportbet-orange flex items-center justify-center text-xs text-white">SM</div>
            </div>
            <p className="text-gray-400 text-sm">
              <span className="text-white font-medium">2,500+</span> users already making predictions
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-sportbet-blue to-sportbet-green rounded-xl blur-xl opacity-20"></div>
          <div className="relative bg-sportbet-gray p-6 rounded-xl">
            <div className="bg-sportbet-dark rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">Featured Prediction</h3>
                <span className="text-xs text-sportbet-green bg-sportbet-green/10 px-3 py-1 rounded-full">
                  92% Confidence
                </span>
              </div>
              
              <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-2">
                    <span className="text-sportbet-dark font-bold">MCI</span>
                  </div>
                  <span className="text-white">Man City</span>
                </div>
                
                <div className="text-center">
                  <span className="text-gray-400 text-sm">Premier League</span>
                  <div className="text-2xl font-bold text-white my-1">2 - 0</div>
                  <span className="text-gray-400 text-sm">Prediction</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-2">
                    <span className="text-sportbet-dark font-bold">ARS</span>
                  </div>
                  <span className="text-white">Arsenal</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-400 text-sm">Live in 2 hours</span>
                </div>
                <Link to="/predictions">
                  <Button 
                    className="bg-sportbet-blue text-white hover:bg-sportbet-blue/80"
                  >
                    Buy Prediction
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="mt-4 bg-sportbet-dark rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">AI Analysis</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300">Home Form:</span>
                  <div className="flex gap-1">
                    <span className="w-6 h-6 rounded-full bg-sportbet-green text-white flex items-center justify-center text-xs">W</span>
                    <span className="w-6 h-6 rounded-full bg-sportbet-green text-white flex items-center justify-center text-xs">W</span>
                    <span className="w-6 h-6 rounded-full bg-sportbet-gray text-white flex items-center justify-center text-xs">D</span>
                    <span className="w-6 h-6 rounded-full bg-sportbet-green text-white flex items-center justify-center text-xs">W</span>
                    <span className="w-6 h-6 rounded-full bg-sportbet-green text-white flex items-center justify-center text-xs">W</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Key Player:</span>
                  <span className="text-white">De Bruyne (90% fit)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Weather Impact:</span>
                  <span className="text-white">Low (18°C, Clear)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
