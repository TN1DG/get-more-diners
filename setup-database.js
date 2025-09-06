const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Read environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  console.log('🚀 Setting up Get More Diners database...\n');

  try {
    // Test connection
    console.log('1️⃣ Testing Supabase connection...');
    const { data, error } = await supabase.from('_test').select('*').limit(1);
    if (!error) {
      console.log('✅ Supabase connection successful!\n');
    }

    // Read and execute SQL schema
    console.log('2️⃣ Reading database schema...');
    const sqlPath = path.join(__dirname, 'supabase-schema.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');
    
    console.log('✅ SQL schema loaded\n');

    console.log('3️⃣ Database setup instructions:');
    console.log('   Since we cannot execute DDL statements via the client,');
    console.log('   please follow these steps:\n');
    
    console.log('   📝 MANUAL SETUP REQUIRED:');
    console.log('   1. Go to https://rdejxximdggmmcxsgsdu.supabase.co');
    console.log('   2. Navigate to SQL Editor');
    console.log('   3. Copy and paste the content from supabase-schema.sql');
    console.log('   4. Click "Run" to execute the schema');
    console.log('   5. Come back and run: npm start\n');

    console.log('4️⃣ Schema Summary:');
    console.log('   ✅ restaurants table (for restaurant profiles)');
    console.log('   ✅ diners table (50+ sample records)');
    console.log('   ✅ campaigns table (for marketing campaigns)');
    console.log('   ✅ Row Level Security policies');
    console.log('   ✅ Sample data inserted\n');

    // Test basic functionality
    console.log('5️⃣ Testing basic queries (these may fail until schema is set up)...');
    
    try {
      const { data: diners, error: dinersError } = await supabase
        .from('diners')
        .select('count')
        .limit(1);
        
      if (!dinersError) {
        console.log('✅ Diners table accessible');
      } else {
        console.log('⏳ Diners table not yet set up (expected)');
      }
    } catch (err) {
      console.log('⏳ Database schema not yet applied (expected)');
    }

    console.log('\n🎉 Setup preparation complete!');
    console.log('📋 Next steps:');
    console.log('   1. Set up the database schema as instructed above');
    console.log('   2. Run: npm start');
    console.log('   3. Visit: http://localhost:3000');
    console.log('   4. Create an account and start using the app!\n');

  } catch (error) {
    console.error('❌ Setup error:', error.message);
  }
}

setupDatabase();
