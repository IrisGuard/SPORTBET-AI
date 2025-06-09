
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DateFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const DateFilter = ({ value, onChange }: DateFilterProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="date">Date</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="bg-sportbet-dark border-sportbet-light-gray text-white">
          <SelectValue placeholder="All dates" />
        </SelectTrigger>
        <SelectContent className="bg-sportbet-gray border-sportbet-light-gray">
          <SelectItem value="">All dates</SelectItem>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="tomorrow">Tomorrow</SelectItem>
          <SelectItem value="this-week">This week</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default DateFilter;
