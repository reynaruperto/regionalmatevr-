import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl = "https://xiymsnmlwffikkhwatcp.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpeW1zbm1sd2ZmaWtraHdhdGNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4NTEzNTIsImV4cCI6MjA3MTQyNzM1Mn0.nKJHOzcMMOY7sSOjGVyLUGkOZW_hgaS8zvhTg4Z_7lc";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});