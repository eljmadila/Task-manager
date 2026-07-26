import { createClient } from '@supabase/supabase-js'

const supabase_Url = import.meta.env.VITE_SUPABASE_URL
const supabase_Key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabase_Url, supabase_Key)