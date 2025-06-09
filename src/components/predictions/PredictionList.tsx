
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { calculateTimeRemaining } from '@/utils/dateUtils';
import { FiltersType } from '@/pages/Predictions';
import { usePredictions } from '@/hooks/usePredictions';
import PredictionDetail from './PredictionDetail';
import PredictionGrid from './PredictionGrid';
import PredictionPagination from './PredictionPagination';
import { EmptyState, ErrorState, LoadingState } from './PredictionListStates';

const PredictionList = ({ filters }: { filters: FiltersType }) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [selectedPredictionId, setSelectedPredictionId] = useState<string | null>(null);
  
  const { 
    predictions: currentPredictions, 
    isLoading, 
    isError, 
    refetch,
    pagination: { page, setPage, totalPages }
  } = usePredictions(filters);
  
  const handleBuyPrediction = async (predictionId: string, price: number) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to purchase predictions",
        variant: "destructive"
      });
      return;
    }

    // In a real implementation, we would:
    // 1. Check if user has enough tokens
    // 2. Deduct tokens
    // 3. Record purchase
    // 4. Unlock prediction
    toast({
      title: "Purchase successful",
      description: `You've purchased this prediction for ${price} SBET tokens`,
    });
  };
  
  const handleViewPrediction = (predictionId: string) => {
    setSelectedPredictionId(predictionId);
  };
  
  const closeDetailDialog = () => {
    setSelectedPredictionId(null);
  };
  
  if (isLoading) {
    return <LoadingState />;
  }
  
  if (isError) {
    return <ErrorState onRefetch={refetch} />;
  }
  
  if (currentPredictions.length === 0) {
    return <EmptyState onRefetch={refetch} />;
  }
  
  return (
    <>
      <PredictionGrid 
        predictions={currentPredictions} 
        onBuyPrediction={handleBuyPrediction}
        onViewPrediction={handleViewPrediction}
        timeRemainingFunction={calculateTimeRemaining}
      />
      
      {totalPages > 1 && (
        <PredictionPagination 
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
      
      <PredictionDetail 
        isOpen={!!selectedPredictionId} 
        onClose={closeDetailDialog} 
        predictionId={selectedPredictionId} 
      />
    </>
  );
};

export default PredictionList;
