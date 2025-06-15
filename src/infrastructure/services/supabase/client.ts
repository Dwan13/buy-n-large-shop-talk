
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ysgtunwzxnpfzznkkmuy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzZ3R1bnd6eG5wZnp6bmtrbXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMjk3OTYsImV4cCI6MjA0ODkwNTc5Nn0.LgMqYYCplU0Cfo8TdPi6Sye7uBzKJRYuSm1qGSVQYG8';

export const supabase = createClient(supabaseUrl, supabaseKey);
