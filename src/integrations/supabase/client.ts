import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = "https://esbovmwrbjoryndhgvvh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzYm92bXdyYmpvcnluZGhndnZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIzNzI1MDMsImV4cCI6MjA0Nzk0ODUwM30.Ln24_oD-IDGEmv1RA9nQRcKKzVURwuI0Vo9gfrc73zY";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);