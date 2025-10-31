import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wyxpllglndwsflpauplu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5eHBsbGdsbmR3c2ZscGF1cGx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4NTkwMDcsImV4cCI6MjA3NTQzNTAwN30.YHJMISalXhFsBc9H0w0GXrTVOxwIVrWeabUKhGiVNaA';

export const supabase = createClient(supabaseUrl, supabaseKey);