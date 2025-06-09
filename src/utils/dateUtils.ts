
import { formatDistanceToNow } from 'date-fns';

export const calculateTimeRemaining = (matchDate: string): string => {
  try {
    return formatDistanceToNow(new Date(matchDate), { addSuffix: true });
  } catch (error) {
    return 'Soon';
  }
};
