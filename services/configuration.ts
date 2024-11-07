import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://szgjqamfjabftpxbbxen.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6Z2pxYW1mamFiZnRweGJieGVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA4NDMyNjUsImV4cCI6MjA0NjQxOTI2NX0.8eYcF-BotwK0T5pEqree7_CMd29wa_aAL0VNi8vFITU'

// sb-szgjqamfjabftpxbbxen-auth-token
// sb-szgjqamfjabftpxbbxen-auth-token

const options = {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
  }
}

export const supabase: any = createClient(supabaseUrl, supabaseKey, options)