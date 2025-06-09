
import { Activity, Dumbbell, BadgeCheck, Citrus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type PredictionCardProps = {
  id: string;
  sport: 'football' | 'basketball' | 'tennis' | 'volleyball';
  competition: string;
  teamA: string;
  teamB: string;
  prediction: string;
  confidence: number;
  timeRemaining: string;
  price: number;
  isFree?: boolean;
  onBuy?: () => void;
  onClick?: () => void;
};

const PredictionCard = ({
  id,
  sport,
  competition,
  teamA,
  teamB,
  prediction,
  confidence,
  timeRemaining,
  price,
  isFree = false,
  onBuy,
  onClick
}: PredictionCardProps) => {
  const sportIcons = {
    football: <Activity className="h-6 w-6 text-sportbet-blue" />,
    basketball: <Dumbbell className="h-6 w-6 text-sportbet-orange" />,
    tennis: <BadgeCheck className="h-6 w-6 text-sportbet-green" />,
    volleyball: <Citrus className="h-6 w-6 text-white" />
  };

  const getConfidenceColor = () => {
    if (confidence >= 80) return 'bg-sportbet-green/10 text-sportbet-green';
    if (confidence >= 50) return 'bg-yellow-500/10 text-yellow-500';
    return 'bg-red-500/10 text-red-500';
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (onClick) onClick();
  };

  const handleBuyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onBuy) onBuy();
  };

  return (
    <div 
      className="bg-sportbet-gray rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="p-5">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            {sportIcons[sport]}
            <span className="text-gray-300">{competition}</span>
          </div>
          <Badge variant="outline" className={getConfidenceColor()}>
            {confidence}% Confidence
          </Badge>
        </div>

        <div className="flex items-center justify-between mb-5">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-sportbet-dark rounded-full flex items-center justify-center mb-2">
              <span className="text-white font-medium">{teamA.substring(0, 3).toUpperCase()}</span>
            </div>
            <span className="text-white text-sm">{teamA}</span>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-white my-1">{prediction}</div>
            <span className="text-xs text-gray-400">Prediction</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-sportbet-dark rounded-full flex items-center justify-center mb-2">
              <span className="text-white font-medium">{teamB.substring(0, 3).toUpperCase()}</span>
            </div>
            <span className="text-white text-sm">{teamB}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-sportbet-blue rounded-full animate-pulse"></div>
            <span className="text-gray-400 text-sm">{timeRemaining}</span>
          </div>
          {isFree ? (
            <Badge className="bg-sportbet-green text-white">
              Free Tip
            </Badge>
          ) : (
            <Button 
              className="bg-sportbet-blue hover:bg-sportbet-blue/80 text-white"
              onClick={handleBuyClick}
            >
              Buy for {price} SBET
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictionCard;
