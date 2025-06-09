
import { FiltersType } from '@/pages/Predictions';
import FilterBadge from './FilterBadge';

interface ActiveFiltersProps {
  filters: FiltersType;
  setFilters: (filters: FiltersType) => void;
}

const ActiveFilters = ({ filters, setFilters }: ActiveFiltersProps) => {
  if (!Object.values(filters).some(value => value !== '' && value !== 85)) {
    return null;
  }
  
  return (
    <div className="flex flex-wrap gap-2">
      {filters.sport && (
        <FilterBadge
          label="Sport"
          value={filters.sport}
          onRemove={() => setFilters({ ...filters, sport: '' })}
        />
      )}
      
      {filters.league && (
        <FilterBadge
          label="League"
          value={filters.league}
          onRemove={() => setFilters({ ...filters, league: '' })}
        />
      )}
      
      {filters.date && (
        <FilterBadge
          label="Date"
          value={filters.date}
          onRemove={() => setFilters({ ...filters, date: '' })}
        />
      )}
      
      {filters.minConfidence > 85 && (
        <FilterBadge
          label="Min confidence"
          value={`${filters.minConfidence}%`}
          onRemove={() => setFilters({ ...filters, minConfidence: 85 })}
        />
      )}
      
      {filters.search && (
        <FilterBadge
          label="Search"
          value={filters.search}
          onRemove={() => setFilters({ ...filters, search: '' })}
        />
      )}
    </div>
  );
};

export default ActiveFilters;
