import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://esbovmwrbjoryndhgvvh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzYm92bXdyYmpvcnluZGhndnZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MjI0NjcsImV4cCI6MjAyNTM5ODQ2N30.Oi5Y4BYQj1OaZxRY6iiHJpL6h_5Yw_sT_MtpGYSVF-M';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    headers: {
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=60',
    },
  },
});