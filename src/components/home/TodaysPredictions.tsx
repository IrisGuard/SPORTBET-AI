
import { useState } from 'react';
import PredictionCard from '@/components/PredictionCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MIN_CONFIDENCE_THRESHOLD } from '@/types/prediction';

const TodaysPredictions = () => {
  const [activeTab, setActiveTab] = useState("football");
  
  return (
    <section className="container mx-auto px-6 py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white">Today's Predictions</h2>
        <div className="w-fit">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-sportbet-gray">
              <TabsTrigger value="football">Football</TabsTrigger>
              <TabsTrigger value="basketball">Basketball</TabsTrigger>
              <TabsTrigger value="tennis">Tennis</TabsTrigger>
              <TabsTrigger value="volleyball">Volleyball</TabsTrigger>
            </TabsList>
          
            <TabsContent value="football" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <PredictionCard 
                  id="f1"
                  sport="football"
                  competition="Premier League"
                  teamA="Liverpool"
                  teamB="Chelsea"
                  prediction="2-1"
                  confidence={87}
                  timeRemaining="3 hours"
                  price={10}
                />
                {/* Removed prediction with confidence 75% - below threshold */}
                <PredictionCard 
                  id="f3"
                  sport="football"
                  competition="Serie A"
                  teamA="Juventus"
                  teamB="Milan"
                  prediction="3-0"
                  confidence={85}
                  timeRemaining="Tomorrow"
                  price={8}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="basketball" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <PredictionCard 
                  id="b1"
                  sport="basketball"
                  competition="NBA"
                  teamA="Lakers"
                  teamB="Celtics"
                  prediction="105-98"
                  confidence={92}
                  timeRemaining="2 hours"
                  price={12}
                />
                {/* Removed predictions below 85% threshold */}
              </div>
            </TabsContent>
            
            <TabsContent value="tennis" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <PredictionCard 
                  id="t1"
                  sport="tennis"
                  competition="ATP Masters"
                  teamA="Djokovic"
                  teamB="Nadal"
                  prediction="3-1"
                  confidence={88}
                  timeRemaining="4 hours"
                  price={15}
                />
                {/* Removed predictions below 85% threshold */}
              </div>
            </TabsContent>
            
            <TabsContent value="volleyball" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* No volleyball predictions have confidence >= 85% */}
                <div className="col-span-3 py-8 text-center text-gray-400">
                  No high confidence predictions available at the moment
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default TodaysPredictions;
