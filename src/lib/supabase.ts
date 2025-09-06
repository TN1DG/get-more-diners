import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'placeholder-key'

// Check if we have real credentials
const hasRealCredentials = supabaseUrl !== 'https://placeholder.supabase.co' && supabaseAnonKey !== 'placeholder-key'

if (!hasRealCredentials && process.env.NODE_ENV === 'production') {
  console.warn('Supabase credentials not configured. Some features may not work.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      restaurants: {
        Row: {
          id: string
          created_at: string
          user_id: string
          name: string
          address: string
          city: string
          state: string
          zip: string
          phone: string
          cuisine_type: string
          description: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          name: string
          address: string
          city: string
          state: string
          zip: string
          phone: string
          cuisine_type: string
          description?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          name?: string
          address?: string
          city?: string
          state?: string
          zip?: string
          phone?: string
          cuisine_type?: string
          description?: string | null
        }
      }
      diners: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          phone: string | null
          city: string
          state: string
          interests: string[]
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          email: string
          phone?: string | null
          city: string
          state: string
          interests: string[]
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          email?: string
          phone?: string | null
          city?: string
          state?: string
          interests?: string[]
        }
      }
      campaigns: {
        Row: {
          id: string
          created_at: string
          restaurant_id: string
          name: string
          subject: string
          email_content: string
          sms_content: string | null
          target_count: number
          status: 'draft' | 'sent'
          sent_at: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          restaurant_id: string
          name: string
          subject: string
          email_content: string
          sms_content?: string | null
          target_count: number
          status?: 'draft' | 'sent'
          sent_at?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          restaurant_id?: string
          name?: string
          subject?: string
          email_content?: string
          sms_content?: string | null
          target_count?: number
          status?: 'draft' | 'sent'
          sent_at?: string | null
        }
      }
    }
  }
}
