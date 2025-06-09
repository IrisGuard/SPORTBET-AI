
import { Database } from '@/integrations/supabase/types';

export type ChangeStatus = Database['public']['Enums']['change_status'];

export interface PendingChange {
  id: string;
  submitter_id: string;
  table_name: string;
  record_id: string;
  changes_json: Record<string, any>;
  status: ChangeStatus;
  submitted_at: string;
  reviewed_at: string | null;
  reviewer_id: string | null;
  comments: string | null;
}

export interface ChangeSubmitParams {
  tableName: string;
  recordId: string;
  changes: Record<string, any>;
}
