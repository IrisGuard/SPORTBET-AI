
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';

interface EmptyStateProps {
  onRefetch: () => void;
}

export const EmptyState = ({ onRefetch }: EmptyStateProps) => (
  <div className="text-center py-12">
    <p className="text-lg text-gray-400 mb-4">No predictions found matching your filters</p>
    <Button 
      className="bg-sportbet-blue hover:bg-sportbet-blue/80"
      onClick={onRefetch}
    >
      View all predictions
    </Button>
  </div>
);

export const ErrorState = ({ onRefetch }: EmptyStateProps) => (
  <div className="text-center py-12">
    <p className="text-lg text-red-400 mb-4">Failed to load predictions</p>
    <Button 
      className="bg-sportbet-blue hover:bg-sportbet-blue/80"
      onClick={onRefetch}
    >
      Try again
    </Button>
  </div>
);

export const LoadingState = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array(6).fill(0).map((_, i) => (
      <Skeleton key={i} className="h-[280px] w-full bg-sportbet-gray" />
    ))}
  </div>
);

export const LoadingButton = () => (
  <Button disabled className="bg-sportbet-gray">
    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
    Loading...
  </Button>
);
