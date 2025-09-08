const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('🔍 Testing Supabase Connection & Database Setup...\n');
  
  console.log('📋 Configuration:');
  console.log(`   URL: ${supabaseUrl}`);
  console.log(`   Key: ${supabaseKey.substring(0, 20)}...\n`);
  
  try {
    // Test 1: Basic connection
    console.log('1️⃣ Testing basic connection...');
    const { data: connectionTest, error: connectionError } = await supabase
      .from('_test')
      .select('*')
      .limit(1);
    
    if (connectionError && !connectionError.message.includes('relation "_test" does not exist')) {
      throw connectionError;
    }
    console.log('✅ Basic connection working\n');
    
    // Test 2: Check if restaurants table exists
    console.log('2️⃣ Testing restaurants table...');
    const { data: restaurants, error: restaurantError } = await supabase
      .from('restaurants')
      .select('id')
      .limit(1);
    
    if (restaurantError) {
      console.log('❌ Restaurants table not found:', restaurantError.message);
      console.log('   → Need to run database schema setup\n');
    } else {
      console.log('✅ Restaurants table exists\n');
    }
    
    // Test 3: Check if diners table exists and has data
    console.log('3️⃣ Testing diners table...');
    const { data: diners, error: dinersError, count } = await supabase
      .from('diners')
      .select('*', { count: 'exact' })
      .limit(5);
    
    if (dinersError) {
      console.log('❌ Diners table not found:', dinersError.message);
      console.log('   → Need to run database schema setup\n');
    } else {
      console.log(`✅ Diners table exists with ${count} records`);
      console.log('   Sample diners:');
      diners.forEach(diner => {
        console.log(`   • ${diner.name} (${diner.city}, ${diner.state})`);
      });
      console.log('');
    }
    
    // Test 4: Check if campaigns table exists
    console.log('4️⃣ Testing campaigns table...');
    const { data: campaigns, error: campaignsError } = await supabase
      .from('campaigns')
      .select('id')
      .limit(1);
    
    if (campaignsError) {
      console.log('❌ Campaigns table not found:', campaignsError.message);
      console.log('   → Need to run database schema setup\n');
    } else {
      console.log('✅ Campaigns table exists\n');
    }
    
    // Test 5: Check authentication
    console.log('5️⃣ Testing authentication...');
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    
    if (authError) {
      console.log('❌ Auth error:', authError.message);
    } else if (session) {
      console.log('✅ User is authenticated');
      console.log(`   User: ${session.user.email}`);
    } else {
      console.log('ℹ️  No active session (not logged in)');
    }
    
    console.log('\n📊 Summary:');
    if (restaurantError || dinersError || campaignsError) {
      console.log('❌ Database setup incomplete');
      console.log('🔧 Next steps:');
      console.log('   1. Go to your Supabase dashboard: ' + supabaseUrl.replace('supabase.co', 'supabase.co/dashboard'));
      console.log('   2. Navigate to SQL Editor');
      console.log('   3. Copy and paste the content from supabase-schema.sql');
      console.log('   4. Click "Run" to execute the schema');
      console.log('   5. Run this test again: node test-supabase.js');
    } else {
      console.log('✅ Database is fully set up and ready!');
      console.log('🚀 You can now run: npm start');
    }
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Check your Supabase URL and API key');
    console.log('   2. Make sure your Supabase project is active');
    console.log('   3. Check your internet connection');
  }
}

testConnection();
