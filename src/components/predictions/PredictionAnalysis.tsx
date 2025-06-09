
type PredictionAnalysisProps = {
  explanation: string | null;
  matchDate: string;
  price: number;
  isFree: boolean;
};

const PredictionAnalysis = ({ explanation, matchDate, price, isFree }: PredictionAnalysisProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-gray-400 mb-1">AI Analysis</h3>
        <div className="bg-sportbet-gray p-4 rounded-md text-gray-300 text-sm">
          {explanation || "Our AI analyzed historical performance data, current form, and team statistics to generate this prediction. The confidence score reflects the AI's certainty based on available data points."}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-1">Match Date</h3>
          <p className="text-white">{new Date(matchDate).toLocaleString()}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-1">Price</h3>
          <p className="text-white">{isFree ? "Free" : `${price} SBET`}</p>
        </div>
      </div>
    </div>
  );
};

export default PredictionAnalysis;
