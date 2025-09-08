const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function testTables() {
  console.log('🔍 Testing each table...\n');
  
  // Test diners table
  try {
    const { data, error, count } = await supabase
      .from('diners')
      .select('name, city, state', { count: 'exact' })
      .limit(3);
    
    if (error) {
      console.log('❌ Diners table error:', error.message);
      console.log('   Details:', error.details);
      console.log('   Hint:', error.hint || 'No hint provided');
    } else {
      console.log(`✅ Diners table works! Found ${count} records`);
      data.forEach(d => console.log(`   • ${d.name} from ${d.city}, ${d.state}`));
    }
  } catch (err) {
    console.log('❌ Diners table exception:', err.message);
  }
  
  console.log('');
  
  // Test restaurants table  
  try {
    const { data, error } = await supabase
      .from('restaurants')
      .select('name, city, state')
      .limit(3);
    
    if (error) {
      console.log('❌ Restaurants table error:', error.message);
      if (error.message.includes('does not exist')) {
        console.log('   → Need to run database schema setup');
      }
    } else {
      console.log(`✅ Restaurants table works! Found ${data.length} records`);
      data.forEach(d => console.log(`   • ${d.name} in ${d.city}, ${d.state}`));
    }
  } catch (err) {
    console.log('❌ Restaurants table exception:', err.message);
  }
  
  console.log('');
  
  // Test campaigns table
  try {
    const { data, error } = await supabase
      .from('campaigns')
      .select('name, status')
      .limit(3);
    
    if (error) {
      console.log('❌ Campaigns table error:', error.message);
      if (error.message.includes('does not exist')) {
        console.log('   → Need to run database schema setup');
      }
    } else {
      console.log(`✅ Campaigns table works! Found ${data.length} records`);
      data.forEach(d => console.log(`   • ${d.name} (${d.status})`));
    }
  } catch (err) {
    console.log('❌ Campaigns table exception:', err.message);
  }
}

testTables();
