import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://byesjjqtvopryiqtbcrl.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5ZXNqanF0dm9wcnlpcXRiY3JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MzA1NTQsImV4cCI6MjA4OTAwNjU1NH0.tKZtGRzOsOKmGErKi7zFo63QG_T9KKZCXg6zBBgfa1k'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
