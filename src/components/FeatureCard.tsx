
import { LucideIcon } from 'lucide-react';

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  color: 'blue' | 'green' | 'orange';
};

const FeatureCard = ({ icon: Icon, title, description, color }: FeatureCardProps) => {
  const getIconBackground = () => {
    switch (color) {
      case 'blue': return 'bg-sportbet-blue/10';
      case 'green': return 'bg-sportbet-green/10';
      case 'orange': return 'bg-sportbet-orange/10';
      default: return 'bg-sportbet-blue/10';
    }
  };

  const getIconColor = () => {
    switch (color) {
      case 'blue': return 'text-sportbet-blue';
      case 'green': return 'text-sportbet-green';
      case 'orange': return 'text-sportbet-orange';
      default: return 'text-sportbet-blue';
    }
  };

  const getHoverBorder = () => {
    switch (color) {
      case 'blue': return 'hover:border-sportbet-blue/50';
      case 'green': return 'hover:border-sportbet-green/50';
      case 'orange': return 'hover:border-sportbet-orange/50';
      default: return 'hover:border-sportbet-blue/50';
    }
  };

  return (
    <div className={`bg-sportbet-gray border border-transparent ${getHoverBorder()} rounded-xl p-6 transition-all duration-300 hover:transform hover:-translate-y-1`}>
      <div className={`rounded-xl ${getIconBackground()} ${getIconColor()} p-3 inline-block mb-4`}>
        <Icon size={24} />
      </div>
      <h3 className="text-white text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

export default FeatureCard;
