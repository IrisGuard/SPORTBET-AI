export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      api_key_history: {
        Row: {
          action: string
          admin_id: string | null
          admin_name: string | null
          details: string | null
          id: string
          key_id: string | null
          timestamp: string
        }
        Insert: {
          action: string
          admin_id?: string | null
          admin_name?: string | null
          details?: string | null
          id?: string
          key_id?: string | null
          timestamp?: string
        }
        Update: {
          action?: string
          admin_id?: string | null
          admin_name?: string | null
          details?: string | null
          id?: string
          key_id?: string | null
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_key_history_key_id_fkey"
            columns: ["key_id"]
            isOneToOne: false
            referencedRelation: "api_keys"
            referencedColumns: ["id"]
          },
        ]
      }
      api_keys: {
        Row: {
          category: string
          created_at: string
          created_by: string | null
          description: string | null
          expiry_date: string | null
          id: string
          is_required: boolean
          last_updated: string
          name: string
          provider_type: string | null
          status: string
          value: string
        }
        Insert: {
          category: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          expiry_date?: string | null
          id?: string
          is_required?: boolean
          last_updated?: string
          name: string
          provider_type?: string | null
          status: string
          value: string
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          expiry_date?: string | null
          id?: string
          is_required?: boolean
          last_updated?: string
          name?: string
          provider_type?: string | null
          status?: string
          value?: string
        }
        Relationships: []
      }
      error_logs: {
        Row: {
          browser_info: string | null
          component: string | null
          id: string
          message: string
          stack: string | null
          status: string
          timestamp: string
          user_id: string | null
        }
        Insert: {
          browser_info?: string | null
          component?: string | null
          id?: string
          message: string
          stack?: string | null
          status?: string
          timestamp?: string
          user_id?: string | null
        }
        Update: {
          browser_info?: string | null
          component?: string | null
          id?: string
          message?: string
          stack?: string | null
          status?: string
          timestamp?: string
          user_id?: string | null
        }
        Relationships: []
      }
      feedback: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          prediction_id: string
          rating: number
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          prediction_id: string
          rating: number
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          prediction_id?: string
          rating?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "feedback_prediction_id_fkey"
            columns: ["prediction_id"]
            isOneToOne: false
            referencedRelation: "predictions"
            referencedColumns: ["id"]
          },
        ]
      }
      nft_badges: {
        Row: {
          badge_type: string
          created_at: string
          description: string | null
          id: string
          image_url: string
          name: string
          user_id: string
        }
        Insert: {
          badge_type: string
          created_at?: string
          description?: string | null
          id?: string
          image_url: string
          name: string
          user_id: string
        }
        Update: {
          badge_type?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      pending_changes: {
        Row: {
          changes_json: Json
          comments: string | null
          id: string
          record_id: string
          reviewed_at: string | null
          reviewer_id: string | null
          status: Database["public"]["Enums"]["change_status"]
          submitted_at: string
          submitter_id: string
          table_name: string
        }
        Insert: {
          changes_json: Json
          comments?: string | null
          id?: string
          record_id: string
          reviewed_at?: string | null
          reviewer_id?: string | null
          status?: Database["public"]["Enums"]["change_status"]
          submitted_at?: string
          submitter_id: string
          table_name: string
        }
        Update: {
          changes_json?: Json
          comments?: string | null
          id?: string
          record_id?: string
          reviewed_at?: string | null
          reviewer_id?: string | null
          status?: Database["public"]["Enums"]["change_status"]
          submitted_at?: string
          submitter_id?: string
          table_name?: string
        }
        Relationships: []
      }
      predictions: {
        Row: {
          competition: string
          confidence: number
          created_at: string
          explanation: string | null
          id: string
          is_free: boolean
          match_date: string
          prediction: string
          price: number
          result: string | null
          sport: string
          team_a: string
          team_b: string
        }
        Insert: {
          competition: string
          confidence: number
          created_at?: string
          explanation?: string | null
          id?: string
          is_free?: boolean
          match_date: string
          prediction: string
          price: number
          result?: string | null
          sport: string
          team_a: string
          team_b: string
        }
        Update: {
          competition?: string
          confidence?: number
          created_at?: string
          explanation?: string | null
          id?: string
          is_free?: boolean
          match_date?: string
          prediction?: string
          price?: number
          result?: string | null
          sport?: string
          team_a?: string
          team_b?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          solana_wallet: string | null
          token_balance: number | null
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id: string
          solana_wallet?: string | null
          token_balance?: number | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          solana_wallet?: string | null
          token_balance?: number | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      referrals: {
        Row: {
          created_at: string
          id: string
          referred_id: string
          referrer_id: string
          reward_claimed: boolean
        }
        Insert: {
          created_at?: string
          id?: string
          referred_id: string
          referrer_id: string
          reward_claimed?: boolean
        }
        Update: {
          created_at?: string
          id?: string
          referred_id?: string
          referrer_id?: string
          reward_claimed?: boolean
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          id: string
          transaction_type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          id?: string
          transaction_type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          id?: string
          transaction_type?: string
          user_id?: string
        }
        Relationships: []
      }
      user_predictions: {
        Row: {
          id: string
          prediction_id: string
          purchased_at: string
          user_id: string
        }
        Insert: {
          id?: string
          prediction_id: string
          purchased_at?: string
          user_id: string
        }
        Update: {
          id?: string
          prediction_id?: string
          purchased_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_predictions_prediction_id_fkey"
            columns: ["prediction_id"]
            isOneToOne: false
            referencedRelation: "predictions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      approve_change: {
        Args: { p_change_id: string }
        Returns: boolean
      }
      assign_admin_role: {
        Args: { user_email: string }
        Returns: string
      }
      get_api_keys: {
        Args: Record<PropertyKey, never>
        Returns: {
          category: string
          created_at: string
          created_by: string | null
          description: string | null
          expiry_date: string | null
          id: string
          is_required: boolean
          last_updated: string
          name: string
          provider_type: string | null
          status: string
          value: string
        }[]
      }
      get_api_keys_by_category: {
        Args: { p_category: string }
        Returns: {
          category: string
          created_at: string
          created_by: string | null
          description: string | null
          expiry_date: string | null
          id: string
          is_required: boolean
          last_updated: string
          name: string
          provider_type: string | null
          status: string
          value: string
        }[]
      }
      get_api_keys_by_provider: {
        Args: { p_provider_type: string }
        Returns: {
          category: string
          created_at: string
          created_by: string | null
          description: string | null
          expiry_date: string | null
          id: string
          is_required: boolean
          last_updated: string
          name: string
          provider_type: string | null
          status: string
          value: string
        }[]
      }
      get_current_profile: {
        Args: Record<PropertyKey, never>
        Returns: {
          avatar_url: string | null
          created_at: string
          id: string
          solana_wallet: string | null
          token_balance: number | null
          updated_at: string
          username: string | null
        }[]
      }
      get_pending_changes: {
        Args: Record<PropertyKey, never>
        Returns: {
          changes_json: Json
          comments: string | null
          id: string
          record_id: string
          reviewed_at: string | null
          reviewer_id: string | null
          status: Database["public"]["Enums"]["change_status"]
          submitted_at: string
          submitter_id: string
          table_name: string
        }[]
      }
      get_user_changes: {
        Args: Record<PropertyKey, never>
        Returns: {
          changes_json: Json
          comments: string | null
          id: string
          record_id: string
          reviewed_at: string | null
          reviewer_id: string | null
          status: Database["public"]["Enums"]["change_status"]
          submitted_at: string
          submitter_id: string
          table_name: string
        }[]
      }
      has_role: {
        Args: { _role: Database["public"]["Enums"]["app_role"] }
        Returns: boolean
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      log_api_key_action: {
        Args: { p_key_id: string; p_action: string; p_details?: string }
        Returns: string
      }
      reject_change: {
        Args: { p_change_id: string; p_comments?: string }
        Returns: boolean
      }
      submit_change: {
        Args: { p_table_name: string; p_record_id: string; p_changes: Json }
        Returns: string
      }
    }
    Enums: {
      app_role: "admin" | "user"
      change_status: "pending" | "approved" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      change_status: ["pending", "approved", "rejected"],
    },
  },
} as const
