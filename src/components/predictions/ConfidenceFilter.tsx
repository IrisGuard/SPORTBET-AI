
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface ConfidenceFilterProps {
  value: number;
  onChange: (value: number[]) => void;
}

const ConfidenceFilter = ({ value, onChange }: ConfidenceFilterProps) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Label htmlFor="confidence">Min confidence</Label>
        <span className="text-sm text-white font-medium">{value}%</span>
      </div>
      <Slider
        id="confidence"
        min={85}
        max={100}
        step={1}
        value={[value]}
        onValueChange={onChange}
        className="py-4"
      />
      <div className="flex justify-between text-xs text-gray-400">
        <span>85%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

export default ConfidenceFilter;
