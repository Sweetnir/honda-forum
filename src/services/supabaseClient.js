// supabase.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://pleaoymnlejzbmdbtzja.supabase.co';
const SUPABASE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsZWFveW1ubGVqemJtZGJ0emphIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUwNzU2NzQsImV4cCI6MjAxMDY1MTY3NH0.y-d5ShqRds2yxV852kS00w2Uo0jVvOKaLdUipiOwAhg';

const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

export default supabase;
