
type TeamsDisplayProps = {
  teamA: string;
  teamB: string;
  prediction: string;
};

const TeamsDisplay = ({ teamA, teamB, prediction }: TeamsDisplayProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-sportbet-gray rounded-full flex items-center justify-center mb-2">
          <span className="text-white font-medium text-xl">{teamA.substring(0, 3).toUpperCase()}</span>
        </div>
        <span className="text-white text-sm text-center">{teamA}</span>
      </div>
      
      <div className="text-center px-4">
        <div className="text-3xl font-bold text-sportbet-blue my-2">{prediction}</div>
        <span className="text-sm text-gray-400">AI Prediction</span>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-sportbet-gray rounded-full flex items-center justify-center mb-2">
          <span className="text-white font-medium text-xl">{teamB.substring(0, 3).toUpperCase()}</span>
        </div>
        <span className="text-white text-sm text-center">{teamB}</span>
      </div>
    </div>
  );
};

export default TeamsDisplay;
