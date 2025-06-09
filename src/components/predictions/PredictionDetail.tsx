
import { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogDescription } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';
import { usePredictionDetail } from '@/hooks/usePredictionDetail';
import PredictionHeader from './PredictionHeader';
import TeamsDisplay from './TeamsDisplay';
import PredictionAnalysis from './PredictionAnalysis';
import PurchaseAction from './PurchaseAction';

type PredictionDetailProps = {
  isOpen: boolean;
  onClose: () => void;
  predictionId: string | null;
};

const PredictionDetail = ({ isOpen, onClose, predictionId }: PredictionDetailProps) => {
  const { prediction, loading, fetchPrediction } = usePredictionDetail(predictionId);

  // Fetch prediction data when dialog opens and predictionId changes
  useEffect(() => {
    if (isOpen && predictionId) {
      fetchPrediction();
    }
  }, [isOpen, predictionId, fetchPrediction]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg bg-sportbet-dark border-sportbet-light-gray text-white">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-sportbet-blue" />
          </div>
        ) : !prediction ? (
          <DialogDescription className="text-center py-8 text-gray-400">
            Prediction not found or failed to load.
          </DialogDescription>
        ) : (
          <>
            <DialogHeader>
              <PredictionHeader 
                sport={prediction.sport}
                competition={prediction.competition}
                confidence={prediction.confidence}
              />
            </DialogHeader>
            
            <div className="py-4">
              <TeamsDisplay 
                teamA={prediction.team_a}
                teamB={prediction.team_b}
                prediction={prediction.prediction}
              />
              
              <Separator className="bg-sportbet-light-gray/30 my-4" />
              
              <PredictionAnalysis 
                explanation={prediction.explanation}
                matchDate={prediction.match_date}
                price={prediction.price}
                isFree={prediction.is_free}
              />
            </div>
            
            <div className="flex justify-end">
              <PurchaseAction 
                price={prediction.price} 
                isFree={prediction.is_free} 
                onClose={onClose} 
              />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PredictionDetail;
