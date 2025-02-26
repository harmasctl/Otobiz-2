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
      onboarding_steps: {
        Row: {
          created_at: string
          email_verified: boolean | null
          id: string
          preferences_set: boolean | null
          profile_completed: boolean | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email_verified?: boolean | null
          id: string
          preferences_set?: boolean | null
          profile_completed?: boolean | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email_verified?: boolean | null
          id?: string
          preferences_set?: boolean | null
          profile_completed?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          last_sign_in_at: string | null
          metadata: Json | null
          role: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          last_sign_in_at?: string | null
          metadata?: Json | null
          role?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          last_sign_in_at?: string | null
          metadata?: Json | null
          role?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          bio: string | null
          created_at: string
          full_name: string | null
          id: string
          location: string | null
          phone: string | null
          preferences: Json | null
          setup_completed: boolean | null
          updated_at: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          location?: string | null
          phone?: string | null
          preferences?: Json | null
          setup_completed?: boolean | null
          updated_at?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          location?: string | null
          phone?: string | null
          preferences?: Json | null
          setup_completed?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          last_sign_in_at: string | null
          metadata: Json | null
          phone: string | null
          preferences: Json | null
          role: string | null
          setup_completed: boolean | null
          status: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          last_sign_in_at?: string | null
          metadata?: Json | null
          phone?: string | null
          preferences?: Json | null
          role?: string | null
          setup_completed?: boolean | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          last_sign_in_at?: string | null
          metadata?: Json | null
          phone?: string | null
          preferences?: Json | null
          role?: string | null
          setup_completed?: boolean | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      vehicle_brands: {
        Row: {
          count: number | null
          created_at: string
          description: string | null
          id: string
          logo: string | null
          name: string
          slug: string
        }
        Insert: {
          count?: number | null
          created_at?: string
          description?: string | null
          id?: string
          logo?: string | null
          name: string
          slug: string
        }
        Update: {
          count?: number | null
          created_at?: string
          description?: string | null
          id?: string
          logo?: string | null
          name?: string
          slug?: string
        }
        Relationships: []
      }
      vehicle_categories: {
        Row: {
          count: number | null
          created_at: string
          description: string | null
          id: string
          image: string | null
          name: string
          slug: string
        }
        Insert: {
          count?: number | null
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          name: string
          slug: string
        }
        Update: {
          count?: number | null
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          name?: string
          slug?: string
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          body_type: string | null
          color: string | null
          condition: string | null
          created_at: string
          description: string | null
          features: Json | null
          fuel_type: string
          id: string
          images: Json | null
          location: string | null
          main_image: string | null
          make: string
          metadata: Json | null
          mileage: number
          model: string
          price: number
          saves: number | null
          status: string | null
          title: string
          transmission: string
          updated_at: string
          views: number | null
          year: number
        }
        Insert: {
          body_type?: string | null
          color?: string | null
          condition?: string | null
          created_at?: string
          description?: string | null
          features?: Json | null
          fuel_type: string
          id?: string
          images?: Json | null
          location?: string | null
          main_image?: string | null
          make: string
          metadata?: Json | null
          mileage: number
          model: string
          price: number
          saves?: number | null
          status?: string | null
          title: string
          transmission: string
          updated_at?: string
          views?: number | null
          year: number
        }
        Update: {
          body_type?: string | null
          color?: string | null
          condition?: string | null
          created_at?: string
          description?: string | null
          features?: Json | null
          fuel_type?: string
          id?: string
          images?: Json | null
          location?: string | null
          main_image?: string | null
          make?: string
          metadata?: Json | null
          mileage?: number
          model?: string
          price?: number
          saves?: number | null
          status?: string | null
          title?: string
          transmission?: string
          updated_at?: string
          views?: number | null
          year?: number
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
