import { createClient } from '@supabase/supabase-js'

// environment variables are resolved at build time; make sure a `.env`
// file with VITE_SUPABASE_URL/ANON_KEY exists under guestflow-ai/ or
// that the variables are defined in your shell before starting Vite.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.warn('supabase env vars missing:', {
    VITE_SUPABASE_URL: supabaseUrl,
    VITE_SUPABASE_ANON_KEY: supabaseKey,
  })
}

// pass empty strings to avoid throwing; most operations will fail later but
// at least the app can mount.
export const supabase = createClient(supabaseUrl ?? '', supabaseKey ?? '')
