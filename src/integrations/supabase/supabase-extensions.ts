import type { Database as OriginalDatabase } from "./types";

export interface Database extends OriginalDatabase {
  public: OriginalDatabase["public"] & {
    Tables: OriginalDatabase["public"]["Tables"] & {
      country: {
        Row: { country_id: number; name: string; scheme: "417" | "462" };
        Insert: { country_id?: number; name: string; scheme: "417" | "462" };
        Update: { country_id?: number; name?: string; scheme?: "417" | "462" };
      };

      visa_stage: {
        Row: { stage_id: number; sub_class: "417" | "462"; stage: number; label: string };
        Insert: { stage_id?: number; sub_class: "417" | "462"; stage: number; label: string };
        Update: { stage_id?: number; sub_class?: "417" | "462"; stage?: number; label?: string };
      };

      whv_maker: {
        Row: {
          user_id: string;
          given_name: string;
          middle_name?: string | null;
          family_name: string;
          birth_date: string;
          nationality: string;
          tagline?: string | null;
          mobile_num?: string | null;
          address_line1?: string | null;
          address_line2?: string | null;
          suburb?: string | null;
          city?: string | null;
          state?: string | null;
          postcode?: string | null;
          is_profile_visible: boolean;
          profile_photo?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Insert: {
          user_id: string;
          given_name: string;
          middle_name?: string | null;
          family_name: string;
          birth_date: string;
          nationality: string;
          tagline?: string | null;
          mobile_num?: string | null;
          address_line1?: string | null;
          address_line2?: string | null;
          suburb?: string | null;
          city?: string | null;
          state?: string | null;
          postcode?: string | null;
          is_profile_visible?: boolean;
          profile_photo?: string | null;
        };
        Update: {
          user_id?: string;
          given_name?: string;
          middle_name?: string | null;
          family_name?: string;
          birth_date?: string;
          nationality?: string;
          tagline?: string | null;
          mobile_num?: string | null;
          address_line1?: string | null;
          address_line2?: string | null;
          suburb?: string | null;
          city?: string | null;
          state?: string | null;
          postcode?: string | null;
          is_profile_visible?: boolean;
          profile_photo?: string | null;
        };
      };

      maker_visa: {
        Row: { user_id: string; visa_type: string; expiry_date: string };
        Insert: { user_id: string; visa_type: string; expiry_date: string };
        Update: { user_id?: string; visa_type?: string; expiry_date?: string };
      };

      maker_preference: {
        Row: {
          preference_id: number;
          user_id: string;
          state: string | null;
          suburb_city: string | null;
          industry_id: number | null;
          industry_role_id: number | null;
        };
        Insert: {
          preference_id?: number;
          user_id: string;
          state?: string | null;
          suburb_city?: string | null;
          industry_id?: number | null;
          industry_role_id?: number | null;
        };
        Update: {
          preference_id?: number;
          user_id?: string;
          state?: string | null;
          suburb_city?: string | null;
          industry_id?: number | null;
          industry_role_id?: number | null;
        };
      };

      maker_reference: {
        Row: {
          reference_id: number;
          user_id: string;
          name: string | null;
          business_name: string | null;
          email: string | null;
          mobile_num: string | null;
          role: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Insert: {
          reference_id?: number;
          user_id: string;
          name?: string | null;
          business_name?: string | null;
          email?: string | null;
          mobile_num?: string | null;
          role?: string | null;
        };
        Update: {
          reference_id?: number;
          user_id?: string;
          name?: string | null;
          business_name?: string | null;
          email?: string | null;
          mobile_num?: string | null;
          role?: string | null;
        };
      };

      maker_work_experience: {
        Row: {
          work_experience_id: number;
          user_id: string;
          industry: string | null;
          company: string | null;
          position: string | null;
          start_date: string | null;
          end_date: string | null;
          location: string | null;
        };
        Insert: {
          work_experience_id?: number;
          user_id: string;
          industry?: string | null;
          company?: string | null;
          position?: string | null;
          start_date?: string | null;
          end_date?: string | null;
          location?: string | null;
        };
        Update: {
          work_experience_id?: number;
          user_id?: string;
          industry?: string | null;
          company?: string | null;
          position?: string | null;
          start_date?: string | null;
          end_date?: string | null;
          location?: string | null;
        };
      };
    };
  };
}