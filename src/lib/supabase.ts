// src/lib/supabase.ts

import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://iolyyhabrljbipwufqsh.supabase.co";
export const supabaseAnonKey = "sb_publishable_R7bNk5tLUtlYxSW5Bpo6ZA_kh-ZHs3n";
// export const supabaseAnonKey = "sb_publishable_R7bNk5tLUtlYxSW5Bpo6ZA_kh-ZHs3n";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);