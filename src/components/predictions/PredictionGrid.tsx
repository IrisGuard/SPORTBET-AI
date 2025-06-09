
import PredictionCard from '@/components/PredictionCard';
import { Prediction } from '@/types/prediction';

// Define valid sport types
type ValidSport = 'football' | 'basketball' | 'tennis' | 'volleyball';

interface PredictionGridProps {
  predictions: Prediction[];
  onBuyPrediction: (id: string, price: number) => void;
  onViewPrediction: (id: string) => void;
  timeRemainingFunction: (date: string) => string;
}

const PredictionGrid = ({ 
  predictions, 
  onBuyPrediction, 
  onViewPrediction, 
  timeRemainingFunction 
}: PredictionGridProps) => {
  // Function to safely cast sport to valid type
  const getSportType = (sport: string): ValidSport => {
    const validSports: ValidSport[] = ['football', 'basketball', 'tennis', 'volleyball'];
    return validSports.includes(sport as ValidSport) 
      ? (sport as ValidSport) 
      : 'football'; // Default to football if invalid sport
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {predictions.map((prediction) => (
        <PredictionCard 
          key={prediction.id}
          id={prediction.id}
          sport={getSportType(prediction.sport)}
          competition={prediction.competition}
          teamA={prediction.team_a}
          teamB={prediction.team_b}
          prediction={prediction.prediction}
          confidence={prediction.confidence}
          timeRemaining={timeRemainingFunction(prediction.match_date)}
          price={prediction.price}
          onBuy={() => onBuyPrediction(prediction.id, prediction.price)}
          onClick={() => onViewPrediction(prediction.id)}
          isFree={prediction.is_free}
        />
      ))}
    </div>
  );
};

export default PredictionGrid;
