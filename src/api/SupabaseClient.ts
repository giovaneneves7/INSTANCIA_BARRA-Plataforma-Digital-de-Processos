import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zqbrklvzupnycuhvzqot.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxYnJrbHZ6dXBueWN1aHZ6cW90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5MTczODQsImV4cCI6MjA3NzQ5MzM4NH0.JUcEh9G7uvoPZyiefIxcdWvLzA3tRtYo7yS52QUXsjo';

export const supabase = createClient(supabaseUrl, supabaseKey);