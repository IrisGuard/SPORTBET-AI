
import { DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { getSportIcon, getConfidenceColor } from '@/utils/predictionUtils';

type PredictionHeaderProps = {
  sport: string;
  competition: string;
  confidence: number;
};

const PredictionHeader = ({ sport, competition, confidence }: PredictionHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        {getSportIcon(sport)}
        <DialogTitle className="text-lg">{competition}</DialogTitle>
      </div>
      <Badge variant="outline" className={getConfidenceColor(confidence)}>
        {confidence}% Confidence
      </Badge>
    </div>
  );
};

export default PredictionHeader;
