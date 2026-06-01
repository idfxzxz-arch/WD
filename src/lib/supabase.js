import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xtjigfptlvtlmqwqsugb.supabase.co'
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0amlnZnB0bHZ0bG1xd3FzdWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MTY3NjgsImV4cCI6MjA5NTE5Mjc2OH0.bdzJ9WtfrWdFafAALMXo2N5ktV6qQS_EG00poX49q8s'

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)
