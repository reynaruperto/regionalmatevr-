export interface Database {
  public: {
    Tables: {
      country: {
        Row: {
          country_id: number;
          name: string;
          scheme: string;
        };
        Insert: {
          country_id?: number;
          name: string;
          scheme: string;
        };
        Update: {
          country_id?: number;
          name?: string;
          scheme?: string;
        };
      };
      visa_stage: {
        Row: {
          stage_id: number;
          scheme: string;
          stage: number;
          label: string;
        };
        Insert: {
          stage_id?: number;
          scheme: string;
          stage: number;
          label: string;
        };
        Update: {
          stage_id?: number;
          scheme?: string;
          stage?: number;
          label?: string;
        };
      };
      whv_maker: {
        Row: {
          user_id: string;
          given_name: string;
          family_name: string;
          birth_date: string;
          nationality: string;
          tagline: string | null;
          mobile_num: string | null;
          address_line1: string | null;
          address_line2: string | null;
          city: string | null;
          state: string | null;
          postcode: string | null;
          suburb: string | null;
          profile_photo: string | null;
          middle_name: string | null;
          is_profile_visible: boolean | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          user_id: string;
          given_name: string;
          family_name: string;
          birth_date: string;
          nationality: string;
          tagline?: string | null;
          mobile_num?: string | null;
          address_line1?: string | null;
          address_line2?: string | null;
          city?: string | null;
          state?: string | null;
          postcode?: string | null;
          suburb?: string | null;
          profile_photo?: string | null;
          middle_name?: string | null;
          is_profile_visible?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          user_id?: string;
          given_name?: string;
          family_name?: string;
          birth_date?: string;
          nationality?: string;
          tagline?: string | null;
          mobile_num?: string | null;
          address_line1?: string | null;
          address_line2?: string | null;
          city?: string | null;
          state?: string | null;
          postcode?: string | null;
          suburb?: string | null;
          profile_photo?: string | null;
          middle_name?: string | null;
          is_profile_visible?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      maker_visa: {
        Row: {
          user_id: string;
          visa_type: string;
          expiry_date: string;
        };
        Insert: {
          user_id: string;
          visa_type: string;
          expiry_date: string;
        };
        Update: {
          user_id?: string;
          visa_type?: string;
          expiry_date?: string;
        };
      };
      industry: {
        Row: {
          industry_id: number;
          name: string;
        };
        Insert: {
          industry_id?: number;
          name: string;
        };
        Update: {
          industry_id?: number;
          name?: string;
        };
      };
      industry_role: {
        Row: {
          industry_role_id: number;
          industry_id: number;
          role: string;
        };
        Insert: {
          industry_role_id?: number;
          industry_id: number;
          role: string;
        };
        Update: {
          industry_role_id?: number;
          industry_id?: number;
          role?: string;
        };
      };
      maker_preference: {
        Row: {
          preference_id: number;
          user_id: string;
          industry_id: number | null;
          industry_role_id: number | null;
          state: string | null;
          suburb_city: string | null;
        };
        Insert: {
          preference_id?: number;
          user_id: string;
          industry_id?: number | null;
          industry_role_id?: number | null;
          state?: string | null;
          suburb_city?: string | null;
        };
        Update: {
          preference_id?: number;
          user_id?: string;
          industry_id?: number | null;
          industry_role_id?: number | null;
          state?: string | null;
          suburb_city?: string | null;
        };
      };
      profile: {
        Row: {
          id: string;
          user_id: string;
          email: string;
          user_type: string;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          email: string;
          user_type: string;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          email?: string;
          user_type?: string;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}