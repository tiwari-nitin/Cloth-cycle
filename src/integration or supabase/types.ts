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
      cart_items: {
        Row: {
          buyer_price: number
          category: string
          city: string
          created_at: string
          id: string
          image: string | null
          listing_id: string
          quantity: number
          seller_price: number
          size: string
          tier: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          buyer_price: number
          category: string
          city: string
          created_at?: string
          id?: string
          image?: string | null
          listing_id: string
          quantity?: number
          seller_price: number
          size: string
          tier: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          buyer_price?: number
          category?: string
          city?: string
          created_at?: string
          id?: string
          image?: string | null
          listing_id?: string
          quantity?: number
          seller_price?: number
          size?: string
          tier?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      clothing_listings: {
        Row: {
          category: string
          city: string
          condition_notes: string | null
          contact: string
          created_at: string
          fabric: string
          has_defects: boolean | null
          id: string
          photos: Json | null
          pickup_availability: string | null
          pincode: string
          price: number
          size: string
          status: string | null
          tier: string
          updated_at: string
        }
        Insert: {
          category: string
          city: string
          condition_notes?: string | null
          contact: string
          created_at?: string
          fabric: string
          has_defects?: boolean | null
          id?: string
          photos?: Json | null
          pickup_availability?: string | null
          pincode: string
          price: number
          size: string
          status?: string | null
          tier: string
          updated_at?: string
        }
        Update: {
          category?: string
          city?: string
          condition_notes?: string | null
          contact?: string
          created_at?: string
          fabric?: string
          has_defects?: boolean | null
          id?: string
          photos?: Json | null
          pickup_availability?: string | null
          pincode?: string
          price?: number
          size?: string
          status?: string | null
          tier?: string
          updated_at?: string
        }
        Relationships: []
      }
      ngo_applications: {
        Row: {
          admin_notes: string | null
          contact_email: string
          contact_person: string
          contact_phone: string
          created_at: string
          id: string
          ngo_name: string
          operational_details: string
          registration_number: string
          reviewed_at: string | null
          reviewed_by: string | null
          service_area: string
          status: Database["public"]["Enums"]["verification_status"]
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          contact_email: string
          contact_person: string
          contact_phone: string
          created_at?: string
          id?: string
          ngo_name: string
          operational_details: string
          registration_number: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          service_area: string
          status?: Database["public"]["Enums"]["verification_status"]
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          contact_email?: string
          contact_person?: string
          contact_phone?: string
          created_at?: string
          id?: string
          ngo_name?: string
          operational_details?: string
          registration_number?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          service_area?: string
          status?: Database["public"]["Enums"]["verification_status"]
          updated_at?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          buyer_price: number
          category: string
          city: string
          created_at: string
          id: string
          image: string | null
          listing_id: string
          order_id: string
          quantity: number
          seller_price: number
          size: string
          tier: string
          title: string
        }
        Insert: {
          buyer_price: number
          category: string
          city: string
          created_at?: string
          id?: string
          image?: string | null
          listing_id: string
          order_id: string
          quantity: number
          seller_price: number
          size: string
          tier: string
          title: string
        }
        Update: {
          buyer_price?: number
          category?: string
          city?: string
          created_at?: string
          id?: string
          image?: string | null
          listing_id?: string
          order_id?: string
          quantity?: number
          seller_price?: number
          size?: string
          tier?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          city: string
          created_at: string
          delivery_instructions: string | null
          email: string
          full_name: string
          grand_total: number
          id: string
          payment_method: string
          phone: string
          platform_fee: number
          postal_code: string
          state: string
          status: string
          street_address: string
          total_amount: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          city: string
          created_at?: string
          delivery_instructions?: string | null
          email: string
          full_name: string
          grand_total: number
          id?: string
          payment_method?: string
          phone: string
          platform_fee: number
          postal_code: string
          state: string
          status?: string
          street_address: string
          total_amount: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          city?: string
          created_at?: string
          delivery_instructions?: string | null
          email?: string
          full_name?: string
          grand_total?: number
          id?: string
          payment_method?: string
          phone?: string
          platform_fee?: number
          postal_code?: string
          state?: string
          status?: string
          street_address?: string
          total_amount?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      verification_status: "pending" | "approved" | "rejected"
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
      verification_status: ["pending", "approved", "rejected"],
    },
  },
} as const
