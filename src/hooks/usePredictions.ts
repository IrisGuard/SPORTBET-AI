
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FiltersType } from '@/pages/Predictions';
import { fetchPredictions } from '@/services/predictionService';
import { Prediction } from '@/types/prediction';

export const usePredictions = (filters: FiltersType) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  
  const { data: predictions, isLoading, isError, refetch } = useQuery({
    queryKey: ['predictions', filters],
    queryFn: () => fetchPredictions(filters),
    enabled: true,
  });
  
  // Filter predictions with confidence >= 85% as per project requirements
  const highConfidencePredictions = predictions?.filter(
    (prediction) => prediction.confidence >= 85
  ) || [];
  
  // Pagination
  const totalPages = Math.ceil(highConfidencePredictions.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const currentPredictions = highConfidencePredictions.slice(startIndex, startIndex + itemsPerPage);
  
  return {
    predictions: currentPredictions,
    isLoading,
    isError,
    refetch,
    pagination: {
      page,
      setPage,
      totalPages
    }
  };
};
