import type { Database as OriginalDatabase } from "@/integrations/supabase/types";

// Extend Supabase types with missing tables
export type Database = {
  public: {
    Tables: OriginalDatabase["public"]["Tables"] & {
      country: {
        Row: {
          country_id: number;
          name: string;
          scheme: "417" | "462";
        };
        Insert: {
          country_id?: number;
          name: string;
          scheme: "417" | "462";
        };
        Update: {
          country_id?: number;
          name?: string;
          scheme?: "417" | "462";
        };
        Relationships: [];
      };
      visa_stage: {
        Row: {
          stage_id: number;
          sub_class: "417" | "462";
          stage: number;
          label: string;
        };
        Insert: {
          stage_id?: number;
          sub_class: "417" | "462";
          stage: number;
          label: string;
        };
        Update: {
          stage_id?: number;
          sub_class?: "417" | "462";
          stage?: number;
          label?: string;
        };
        Relationships: [];
      };
    };
    Views: OriginalDatabase["public"]["Views"];
    Functions: OriginalDatabase["public"]["Functions"];
    Enums: OriginalDatabase["public"]["Enums"];
    CompositeTypes: OriginalDatabase["public"]["CompositeTypes"];
  };
};