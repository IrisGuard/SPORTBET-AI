
import { Button } from '@/components/ui/button';

interface PredictionPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PredictionPagination = ({ currentPage, totalPages, onPageChange }: PredictionPaginationProps) => {
  if (totalPages <= 1) return null;
  
  return (
    <div className="flex justify-center mt-10">
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className="border-sportbet-light-gray text-white"
          disabled={currentPage === 1}
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        >
          Previous
        </Button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
          <Button 
            key={pageNum}
            variant={pageNum === currentPage ? "default" : "outline"}
            className={pageNum === currentPage 
              ? "bg-sportbet-blue hover:bg-sportbet-blue/80" 
              : "border-sportbet-light-gray text-white"}
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum}
          </Button>
        ))}
        
        <Button 
          variant="outline" 
          className="border-sportbet-light-gray text-white"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PredictionPagination;
