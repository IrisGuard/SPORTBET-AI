
import { supabase } from '@/integrations/supabase/client';
import { Prediction, MIN_CONFIDENCE_THRESHOLD } from '@/types/prediction';
import { FiltersType } from '@/pages/Predictions';

export const fetchPredictions = async (filters: FiltersType): Promise<Prediction[]> => {
  try {
    let query = supabase
      .from('predictions')
      .select('*')
      // Always apply minimum confidence threshold
      .gte('confidence', MIN_CONFIDENCE_THRESHOLD);
    
    if (filters.sport) {
      query = query.eq('sport', filters.sport);
    }
    
    // Only apply user's confidence filter if it's higher than our minimum threshold
    if (filters.minConfidence > MIN_CONFIDENCE_THRESHOLD) {
      query = query.gte('confidence', filters.minConfidence);
    }

    if (filters.league) {
      query = query.eq('competition', filters.league);
    }
    
    if (filters.date) {
      const now = new Date();
      let endDate: Date | null = null;
      
      switch (filters.date) {
        case 'today':
          endDate = new Date(now.setHours(23, 59, 59, 999));
          break;
        case 'tomorrow':
          const tomorrow = new Date();
          tomorrow.setDate(now.getDate() + 1);
          endDate = new Date(tomorrow.setHours(23, 59, 59, 999));
          break;
        case 'week':
          const nextWeek = new Date();
          nextWeek.setDate(now.getDate() + 7);
          endDate = nextWeek;
          break;
        case 'month':
          const nextMonth = new Date();
          nextMonth.setMonth(now.getMonth() + 1);
          endDate = nextMonth;
          break;
      }
      
      if (endDate) {
        query = query.lte('match_date', endDate.toISOString());
        query = query.gte('match_date', new Date().toISOString());
      }
    }

    const { data, error } = await query;
    
    if (error) throw error;

    // Filter by search term if needed
    let filteredData = data as Prediction[];
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredData = filteredData.filter(p => 
        p.team_a.toLowerCase().includes(searchLower) ||
        p.team_b.toLowerCase().includes(searchLower) ||
        p.competition.toLowerCase().includes(searchLower)
      );
    }
    
    return filteredData;
  } catch (error) {
    console.error('Error fetching predictions:', error);
    throw error;
  }
};
