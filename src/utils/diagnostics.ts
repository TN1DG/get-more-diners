// Diagnostic utility to check if Supabase is configured correctly
export const checkSupabaseConfig = () => {
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
  const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY
  
  console.log('=== Supabase Configuration Check ===')
  console.log('Environment:', process.env.NODE_ENV)
  console.log('Supabase URL:', supabaseUrl ? '✅ Configured' : '❌ Missing')
  console.log('Supabase Key:', supabaseAnonKey ? '✅ Configured' : '❌ Missing')
  
  if (supabaseUrl) {
    console.log('URL starts with https:', supabaseUrl.startsWith('https://') ? '✅' : '❌')
    console.log('URL contains supabase.co:', supabaseUrl.includes('supabase.co') ? '✅' : '❌')
  }
  
  if (supabaseAnonKey) {
    console.log('Key looks like JWT:', supabaseAnonKey.startsWith('eyJ') ? '✅' : '❌')
  }
  
  const isConfigured = supabaseUrl && supabaseAnonKey && 
                      supabaseUrl !== 'https://placeholder.supabase.co' && 
                      supabaseAnonKey !== 'placeholder-key'
  
  console.log('Overall configuration:', isConfigured ? '✅ Valid' : '❌ Invalid')
  console.log('=====================================')
  
  return isConfigured
}
