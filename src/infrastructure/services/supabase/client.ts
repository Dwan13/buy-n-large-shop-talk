
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wlguhfzutzlikoccispq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsZ3VoZnp1dHpsaWtvY2Npc3BxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MDc5MzEsImV4cCI6MjA2NDQ4MzkzMX0.RjgJynmpE1WJRmbMScstqfnw5frEtrkKpzA2J9z_IHg';

export const supabase = createClient(supabaseUrl, supabaseKey);
