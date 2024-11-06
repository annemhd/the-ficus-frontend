import { createClient } from '@supabase/supabase-js'

const customLocalStorage = {
  getItem: (key: string) => localStorage.getItem('current-user'),
  setItem: (key: string, value: string) => localStorage.setItem('current-user', value),
  removeItem: (key: string) => localStorage.removeItem('current-user'),
};

export const supabase = createClient(
    'https://szgjqamfjabftpxbbxen.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6Z2pxYW1mamFiZnRweGJieGVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA4NDMyNjUsImV4cCI6MjA0NjQxOTI2NX0.8eYcF-BotwK0T5pEqree7_CMd29wa_aAL0VNi8vFITU',
    {
        auth: {
            storage: customLocalStorage,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true,
        }
    }
)
