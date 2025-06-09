
import { Brain, TrendingUp, Wallet } from 'lucide-react';
import FeatureCard from '@/components/FeatureCard';

const HowItWorks = () => {
  return (
    <section className="container mx-auto px-6 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">How SportBet AI Works</h2>
      <p className="text-gray-300 text-center mb-12 max-w-3xl mx-auto">
        Our platform combines machine learning algorithms with blockchain technology to provide 
        accurate predictions and instant rewards.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard 
          icon={Brain}
          title="AI Predictions" 
          description="Our machine learning models analyze thousands of data points to generate accurate predictions." 
          color="blue"
        />
        <FeatureCard 
          icon={Wallet}
          title="Crypto Rewards" 
          description="Earn SBET tokens for accurate predictions, redeemable for real-world value." 
          color="green"
        />
        <FeatureCard 
          icon={TrendingUp}
          title="Performance Tracking" 
          description="Monitor your prediction accuracy and improve your strategy over time." 
          color="orange"
        />
      </div>
    </section>
  );
};

export default HowItWorks;
