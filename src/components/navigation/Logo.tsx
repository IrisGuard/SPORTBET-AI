
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img 
        src="/lovable-uploads/f099b3fb-7f27-428b-a9b4-d0953f4b144f.png" 
        alt="SportBet AI Logo" 
        className="h-10 w-10" 
      />
      <span className="text-xl font-bold">
        <span className="text-sportbet-blue">Sport</span>
        <span className="text-sportbet-blue">Bet</span>
        <span className="text-sportbet-green">AI</span>
      </span>
    </Link>
  );
};

export default Logo;
