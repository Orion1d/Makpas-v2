import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = "https://esbovmwrbjoryndhgvvh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzYm92bXdyYmpvcnluZGhndnZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc0ODg5MDMsImV4cCI6MjAyMzA2NDkwM30.RXFEVu3Ty-AFGGkw9M9ywriUh_1WTyVuQzHLJMB3VFE";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);