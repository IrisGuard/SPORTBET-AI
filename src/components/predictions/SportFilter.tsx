
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SportFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const SportFilter = ({ value, onChange }: SportFilterProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="sport">Sport</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="bg-sportbet-dark border-sportbet-light-gray text-white">
          <SelectValue placeholder="All sports" />
        </SelectTrigger>
        <SelectContent className="bg-sportbet-gray border-sportbet-light-gray">
          <SelectItem value="">All sports</SelectItem>
          <SelectItem value="football">Football</SelectItem>
          <SelectItem value="basketball">Basketball</SelectItem>
          <SelectItem value="tennis">Tennis</SelectItem>
          <SelectItem value="hockey">Hockey</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SportFilter;
