
import { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import PredictionFilters from '@/components/predictions/PredictionFilters';
import PredictionList from '@/components/predictions/PredictionList';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Loader2, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';

export type FiltersType = {
  sport: string;
  date: string;
  minConfidence: number;
  search: string;
  league?: string;
};

const Predictions = () => {
  const { user, loading } = useAuth();
  const { toast: uiToast } = useToast();
  const [filters, setFilters] = useState<FiltersType>({
    sport: '',
    date: '',
    minConfidence: 85, // Always show high confidence predictions (85%+)
    search: '',
    league: '',
  });

  const handleTipOfDay = () => {
    toast("Tip of the Day", {
      description: "Our AI predicts Barcelona to win against Real Madrid with 78% confidence.",
      action: {
        label: "View",
        onClick: () => console.log("View tip of the day"),
      },
    });
  };

  return (
    <div className="min-h-screen bg-sportbet-dark">
      <NavBar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">AI Sports Predictions</h1>
          <Button
            onClick={handleTipOfDay}
            className="bg-sportbet-green hover:bg-sportbet-green/80 text-white"
          >
            Free Tip of the Day
          </Button>
        </div>
        
        <div className="mb-8 p-4 bg-sportbet-gray rounded-lg border border-sportbet-light-gray">
          <div className="flex items-start gap-3">
            <Info className="text-sportbet-blue mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">About Our AI Predictions</h2>
              <p className="text-gray-300">
                Our advanced AI analyzes thousands of data points to generate accurate sports predictions.
                We only display predictions with confidence level of 85% or higher.
                The confidence percentage represents the AI's level of certainty.
              </p>
              <p className="text-gray-400 text-sm mt-2 italic">
                For entertainment purposes only. Not financial advice.
              </p>
            </div>
          </div>
        </div>
        
        <PredictionFilters filters={filters} setFilters={setFilters} />
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Button disabled className="bg-sportbet-gray">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </Button>
          </div>
        ) : (
          <PredictionList filters={filters} />
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Predictions;
