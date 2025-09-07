import type { Database as OriginalDatabase } from "./types";

type ExtendedTables = {
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
      created_at?: string;
      updated_at?: string;
    };
    Update: Partial<ExtendedTables["whv_maker"]["Insert"]>;
  };
  maker_visa: {
    Row: { user_id: string; visa_type: string; expiry_date: string }; // 👈 string instead of enum
    Insert: { user_id: string; visa_type: string; expiry_date: string };
    Update: Partial<ExtendedTables["maker_visa"]["Insert"]>;
  };
};

export type Database = Omit<OriginalDatabase, "public"> & {
  public: {
    Tables: Omit<OriginalDatabase["public"]["Tables"], keyof ExtendedTables> & ExtendedTables;
  };
};
