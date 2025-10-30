export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      analytics_daily: {
        Row: {
          created_at: string
          date: string
          id: string
          total_visits: number
          unique_visitors: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          total_visits?: number
          unique_visitors?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          total_visits?: number
          unique_visitors?: number
          updated_at?: string
        }
        Relationships: []
      }
      analytics_page_visits: {
        Row: {
          created_at: string
          date: string
          id: string
          path: string
          title: string | null
          total_duration: number
          updated_at: string
          visit_count: number
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          path: string
          title?: string | null
          total_duration?: number
          updated_at?: string
          visit_count?: number
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          path?: string
          title?: string | null
          total_duration?: number
          updated_at?: string
          visit_count?: number
        }
        Relationships: []
      }
      analytics_visitors: {
        Row: {
          created_at: string
          date: string
          id: string
          visitor_id: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          visitor_id: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          visitor_id?: string
        }
        Relationships: []
      }
      company_representatives: {
        Row: {
          company_id: string | null
          company_name: string
          created_at: string | null
          id: string
          position: string | null
          user_id: string
          verified: boolean | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          company_id?: string | null
          company_name: string
          created_at?: string | null
          id?: string
          position?: string | null
          user_id: string
          verified?: boolean | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          company_id?: string | null
          company_name?: string
          created_at?: string | null
          id?: string
          position?: string | null
          user_id?: string
          verified?: boolean | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: []
      }
      company_revisions: {
        Row: {
          changes_summary: string | null
          company_id: string
          created_at: string | null
          id: string
          priority: string | null
          product_id: string
          reviewer_feedback: string | null
          revised_by: string
          revision_date: string
          verification_status: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          changes_summary?: string | null
          company_id: string
          created_at?: string | null
          id?: string
          priority?: string | null
          product_id: string
          reviewer_feedback?: string | null
          revised_by: string
          revision_date: string
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          changes_summary?: string | null
          company_id?: string
          created_at?: string | null
          id?: string
          priority?: string | null
          product_id?: string
          reviewer_feedback?: string | null
          revised_by?: string
          revision_date?: string
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          status: string
          subject: string
          submission_method: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          status?: string
          subject: string
          submission_method?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string
          subject?: string
          submission_method?: string
          updated_at?: string
        }
        Relationships: []
      }
      mfa_activity_log: {
        Row: {
          action: string
          created_at: string | null
          factor_type: string
          id: string
          ip_address: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string | null
          factor_type: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string | null
          factor_type?: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      mfa_backup_codes: {
        Row: {
          code_hash: string
          created_at: string | null
          id: string
          used: boolean | null
          used_at: string | null
          user_id: string
        }
        Insert: {
          code_hash: string
          created_at?: string | null
          id?: string
          used?: boolean | null
          used_at?: string | null
          user_id: string
        }
        Update: {
          code_hash?: string
          created_at?: string | null
          id?: string
          used?: boolean | null
          used_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          consent_given: boolean
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          unsubscribed_at: string | null
          updated_at: string
        }
        Insert: {
          consent_given?: boolean
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          unsubscribed_at?: string | null
          updated_at?: string
        }
        Update: {
          consent_given?: boolean
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          unsubscribed_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          link: string | null
          message: string
          read: boolean | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          link?: string | null
          message: string
          read?: boolean | null
          title: string
          type?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          link?: string | null
          message?: string
          read?: boolean | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      product_reviews: {
        Row: {
          assigned_at: string | null
          assigned_to: string | null
          company_reviewed_at: string | null
          company_reviewed_by: string | null
          completed_at: string | null
          created_at: string | null
          deadline: string | null
          id: string
          last_activity_at: string | null
          notes: string | null
          priority: string | null
          product_id: string
          review_score: number | null
          started_at: string | null
          status: string | null
          time_spent_minutes: number | null
          updated_at: string | null
        }
        Insert: {
          assigned_at?: string | null
          assigned_to?: string | null
          company_reviewed_at?: string | null
          company_reviewed_by?: string | null
          completed_at?: string | null
          created_at?: string | null
          deadline?: string | null
          id?: string
          last_activity_at?: string | null
          notes?: string | null
          priority?: string | null
          product_id: string
          review_score?: number | null
          started_at?: string | null
          status?: string | null
          time_spent_minutes?: number | null
          updated_at?: string | null
        }
        Update: {
          assigned_at?: string | null
          assigned_to?: string | null
          company_reviewed_at?: string | null
          company_reviewed_by?: string | null
          completed_at?: string | null
          created_at?: string | null
          deadline?: string | null
          id?: string
          last_activity_at?: string | null
          notes?: string | null
          priority?: string | null
          product_id?: string
          review_score?: number | null
          started_at?: string | null
          status?: string | null
          time_spent_minutes?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profile_documents: {
        Row: {
          description: string | null
          document_type: Database["public"]["Enums"]["profile_document_type"]
          file_name: string
          file_size: number
          file_url: string
          id: string
          mime_type: string
          updated_at: string | null
          uploaded_at: string | null
          user_id: string
          verification_notes: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          description?: string | null
          document_type: Database["public"]["Enums"]["profile_document_type"]
          file_name: string
          file_size: number
          file_url: string
          id?: string
          mime_type: string
          updated_at?: string | null
          uploaded_at?: string | null
          user_id: string
          verification_notes?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          description?: string | null
          document_type?: Database["public"]["Enums"]["profile_document_type"]
          file_name?: string
          file_size?: number
          file_url?: string
          id?: string
          mime_type?: string
          updated_at?: string | null
          uploaded_at?: string | null
          user_id?: string
          verification_notes?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          bio: string | null
          created_at: string | null
          display_order: number | null
          email: string
          first_name: string
          id: string
          institution: string | null
          last_name: string
          linkedin_url: string | null
          mfa_backup_codes_generated_at: string | null
          mfa_enabled: boolean | null
          mfa_enrolled_at: string | null
          notification_preferences: Json | null
          profile_image_url: string | null
          public_display: boolean | null
          specialization: string | null
          updated_at: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          display_order?: number | null
          email: string
          first_name: string
          id: string
          institution?: string | null
          last_name: string
          linkedin_url?: string | null
          mfa_backup_codes_generated_at?: string | null
          mfa_enabled?: boolean | null
          mfa_enrolled_at?: string | null
          notification_preferences?: Json | null
          profile_image_url?: string | null
          public_display?: boolean | null
          specialization?: string | null
          updated_at?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          display_order?: number | null
          email?: string
          first_name?: string
          id?: string
          institution?: string | null
          last_name?: string
          linkedin_url?: string | null
          mfa_backup_codes_generated_at?: string | null
          mfa_enabled?: boolean | null
          mfa_enrolled_at?: string | null
          notification_preferences?: Json | null
          profile_image_url?: string | null
          public_display?: boolean | null
          specialization?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      review_checklist_items: {
        Row: {
          checked: boolean | null
          checked_at: string | null
          checked_by: string | null
          id: string
          item_category: string
          item_name: string
          notes: string | null
          review_id: string | null
        }
        Insert: {
          checked?: boolean | null
          checked_at?: string | null
          checked_by?: string | null
          id?: string
          item_category: string
          item_name: string
          notes?: string | null
          review_id?: string | null
        }
        Update: {
          checked?: boolean | null
          checked_at?: string | null
          checked_by?: string | null
          id?: string
          item_category?: string
          item_name?: string
          notes?: string | null
          review_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "review_checklist_items_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "product_reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      review_comments: {
        Row: {
          comment: string
          comment_type: string | null
          created_at: string | null
          id: string
          review_id: string | null
          user_id: string | null
        }
        Insert: {
          comment: string
          comment_type?: string | null
          created_at?: string | null
          id?: string
          review_id?: string | null
          user_id?: string | null
        }
        Update: {
          comment?: string
          comment_type?: string | null
          created_at?: string | null
          id?: string
          review_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "review_comments_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "product_reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      role_requests: {
        Row: {
          company_id: string | null
          created_at: string
          id: string
          justification: string
          requested_role: Database["public"]["Enums"]["app_role"]
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          id?: string
          justification: string
          requested_role: Database["public"]["Enums"]["app_role"]
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          id?: string
          justification?: string
          requested_role?: Database["public"]["Enums"]["app_role"]
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      security_events: {
        Row: {
          created_at: string
          details: Json | null
          event_type: string
          id: string
          ip_hash: string | null
          notes: string | null
          resolved_at: string | null
          severity: string
          url: string | null
          user_agent_hash: string | null
        }
        Insert: {
          created_at?: string
          details?: Json | null
          event_type: string
          id?: string
          ip_hash?: string | null
          notes?: string | null
          resolved_at?: string | null
          severity?: string
          url?: string | null
          user_agent_hash?: string | null
        }
        Update: {
          created_at?: string
          details?: Json | null
          event_type?: string
          id?: string
          ip_hash?: string | null
          notes?: string | null
          resolved_at?: string | null
          severity?: string
          url?: string | null
          user_agent_hash?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          granted_at: string | null
          granted_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          granted_at?: string | null
          granted_by?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          granted_at?: string | null
          granted_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      analytics_public: {
        Row: {
          month: string | null
          total_entries: number | null
          total_unique_visitors: number | null
          total_visits: number | null
        }
        Relationships: []
      }
      analytics_summary: {
        Row: {
          created_at: string | null
          date: string | null
          total_visits: number | null
          unique_visitors: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          total_visits?: number | null
          unique_visitors?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string | null
          total_visits?: number | null
          unique_visitors?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      company_products: {
        Row: {
          company_id: string | null
          company_name: string | null
          product_id: string | null
          user_id: string | null
        }
        Relationships: []
      }
      public_team_members: {
        Row: {
          bio: string | null
          display_order: number | null
          first_name: string | null
          id: string | null
          institution: string | null
          last_name: string | null
          linkedin_url: string | null
          profile_image_url: string | null
          role: Database["public"]["Enums"]["app_role"] | null
          specialization: string | null
        }
        Insert: {
          bio?: string | null
          display_order?: number | null
          first_name?: string | null
          id?: string | null
          institution?: string | null
          last_name?: string | null
          linkedin_url?: string | null
          profile_image_url?: string | null
          role?: never
          specialization?: string | null
        }
        Update: {
          bio?: string | null
          display_order?: number | null
          first_name?: string | null
          id?: string | null
          institution?: string | null
          last_name?: string | null
          linkedin_url?: string | null
          profile_image_url?: string | null
          role?: never
          specialization?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      can_access_company: {
        Args: { _company_id: string; _user_id: string }
        Returns: boolean
      }
      cleanup_old_analytics_data: { Args: never; Returns: undefined }
      cleanup_old_contact_submissions: { Args: never; Returns: undefined }
      cleanup_old_security_events: { Args: never; Returns: undefined }
      create_notification: {
        Args: {
          p_link?: string
          p_message: string
          p_title: string
          p_type?: string
          p_user_id: string
        }
        Returns: string
      }
      get_analytics_daily: {
        Args: { end_date?: string; start_date?: string }
        Returns: {
          created_at: string
          date: string
          id: string
          total_visits: number
          unique_visitors: number
          updated_at: string
        }[]
      }
      get_analytics_page_visits: {
        Args: { end_date?: string; start_date?: string }
        Returns: {
          created_at: string
          date: string
          id: string
          path: string
          title: string
          total_duration: number
          updated_at: string
          visit_count: number
        }[]
      }
      get_highest_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_any_role: {
        Args: {
          _roles: Database["public"]["Enums"]["app_role"][]
          _user_id: string
        }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      hash_ip: { Args: { ip_address: string }; Returns: string }
      initialize_super_admins: {
        Args: never
        Returns: {
          email: string
          status: string
        }[]
      }
      schedule_analytics_cleanup: { Args: never; Returns: undefined }
    }
    Enums: {
      app_role: "admin" | "reviewer" | "company"
      profile_document_type:
        | "cv_resume"
        | "certification"
        | "publication"
        | "identification"
        | "company_verification"
        | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "reviewer", "company"],
      profile_document_type: [
        "cv_resume",
        "certification",
        "publication",
        "identification",
        "company_verification",
        "other",
      ],
    },
  },
} as const
