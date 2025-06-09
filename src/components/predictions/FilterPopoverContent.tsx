
import { FiltersType } from '@/pages/Predictions';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SportFilter from './SportFilter';
import LeagueFilter from './LeagueFilter';
import DateFilter from './DateFilter';
import ConfidenceFilter from './ConfidenceFilter';

interface FilterPopoverContentProps {
  filters: FiltersType;
  setFilters: (filters: FiltersType) => void;
  clearFilters: () => void;
}

const FilterPopoverContent = ({ filters, setFilters, clearFilters }: FilterPopoverContentProps) => {
  const handleSportChange = (value: string) => {
    setFilters({ ...filters, sport: value });
  };
  
  const handleLeagueChange = (value: string) => {
    setFilters({ ...filters, league: value });
  };
  
  const handleDateChange = (value: string) => {
    setFilters({ ...filters, date: value });
  };
  
  const handleConfidenceChange = (value: number[]) => {
    setFilters({ ...filters, minConfidence: value[0] });
  };
  
  return (
    <div className="w-80 bg-sportbet-gray border-sportbet-light-gray p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-white">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-xs text-gray-400 hover:text-white"
        >
          <X className="mr-1 h-3 w-3" />
          Clear
        </Button>
      </div>
      
      <div className="space-y-4">
        <SportFilter value={filters.sport} onChange={handleSportChange} />
        <LeagueFilter value={filters.league || ''} onChange={handleLeagueChange} />
        <DateFilter value={filters.date} onChange={handleDateChange} />
        <ConfidenceFilter value={filters.minConfidence} onChange={handleConfidenceChange} />
      </div>
    </div>
  );
};

export default FilterPopoverContent;
