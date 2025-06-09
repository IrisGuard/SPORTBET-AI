
import { X } from 'lucide-react';

interface FilterBadgeProps {
  label: string;
  value: string;
  onRemove: () => void;
}

const FilterBadge = ({ label, value, onRemove }: FilterBadgeProps) => {
  return (
    <div className="bg-sportbet-dark text-gray-300 text-sm px-3 py-1 rounded-full flex items-center">
      {label}: {value}
      <X 
        className="ml-2 h-3 w-3 cursor-pointer" 
        onClick={onRemove}
      />
    </div>
  );
};

export default FilterBadge;
