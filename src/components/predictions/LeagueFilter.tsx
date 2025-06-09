
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LeagueFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const LeagueFilter = ({ value, onChange }: LeagueFilterProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="league">League</Label>
      <Select value={value || ''} onValueChange={onChange}>
        <SelectTrigger className="bg-sportbet-dark border-sportbet-light-gray text-white">
          <SelectValue placeholder="All leagues" />
        </SelectTrigger>
        <SelectContent className="bg-sportbet-gray border-sportbet-light-gray">
          <SelectItem value="">All leagues</SelectItem>
          <SelectItem value="premier-league">Premier League</SelectItem>
          <SelectItem value="la-liga">La Liga</SelectItem>
          <SelectItem value="bundesliga">Bundesliga</SelectItem>
          <SelectItem value="serie-a">Serie A</SelectItem>
          <SelectItem value="ligue-1">Ligue 1</SelectItem>
          <SelectItem value="nba">NBA</SelectItem>
          <SelectItem value="euroleague">Euroleague</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LeagueFilter;
