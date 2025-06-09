
import { useState } from 'react';
import { Sliders } from 'lucide-react';
import { FiltersType } from '@/pages/Predictions';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import SearchBar from './SearchBar';
import FilterPopoverContent from './FilterPopoverContent';
import ActiveFilters from './ActiveFilters';

interface PredictionFiltersProps {
  filters: FiltersType;
  setFilters: (filters: FiltersType) => void;
}

const PredictionFilters = ({ filters, setFilters }: PredictionFiltersProps) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  const handleSearchChange = (value: string) => {
    setFilters({ ...filters, search: value });
  };
  
  const clearFilters = () => {
    setFilters({
      sport: '',
      date: '',
      minConfidence: 85, // Always show high confidence predictions (85%+)
      search: '',
      league: '',
    });
  };
  
  const hasActiveFilters = Object.values(filters).some(value => 
    value !== '' && value !== 85 // 85 is default min confidence
  );
  
  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <SearchBar value={filters.search} onChange={handleSearchChange} />
        
        <Popover open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="border-sportbet-light-gray text-white">
              <Sliders className="mr-2 h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="ml-2 h-2 w-2 rounded-full bg-sportbet-green"></span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <FilterPopoverContent 
              filters={filters} 
              setFilters={setFilters}
              clearFilters={clearFilters}
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <ActiveFilters filters={filters} setFilters={setFilters} />
    </div>
  );
};

export default PredictionFilters;
