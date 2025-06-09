
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const usePredictionDetail = (predictionId: string | null) => {
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchPrediction = async () => {
    if (!predictionId) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('predictions')
        .select('*')
        .eq('id', predictionId)
        .single();
      
      if (error) throw error;
      setPrediction(data);
    } catch (error) {
      console.error('Error fetching prediction:', error);
      toast({
        title: "Error",
        description: "Failed to load prediction details",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    prediction,
    loading,
    fetchPrediction
  };
};
