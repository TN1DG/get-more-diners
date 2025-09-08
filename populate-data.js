const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const sampleDiners = [
  { name: 'Sarah Johnson', email: 'sarah.johnson@email.com', phone: '(555) 123-4567', city: 'New York', state: 'NY', interests: ['Italian', 'Fine Dining', 'Date Night'] },
  { name: 'Mike Chen', email: 'mike.chen@email.com', phone: '(555) 234-5678', city: 'New York', state: 'NY', interests: ['Chinese', 'Asian', 'Quick Lunch'] },
  { name: 'Emily Rodriguez', email: 'emily.rodriguez@email.com', phone: '(555) 345-6789', city: 'Brooklyn', state: 'NY', interests: ['Mexican', 'Vegetarian', 'Family Friendly'] },
  { name: 'David Kim', email: 'david.kim@email.com', phone: '(555) 456-7890', city: 'Queens', state: 'NY', interests: ['Korean', 'BBQ', 'Spicy Food'] },
  { name: 'Jessica Brown', email: 'jessica.brown@email.com', phone: '(555) 567-8901', city: 'Manhattan', state: 'NY', interests: ['American', 'Brunch', 'Cocktails'] },
  { name: 'Ryan Thompson', email: 'ryan.thompson@email.com', phone: '(555) 678-9012', city: 'Bronx', state: 'NY', interests: ['Pizza', 'Casual', 'Sports Bar'] },
  { name: 'Amanda Davis', email: 'amanda.davis@email.com', phone: '(555) 789-0123', city: 'Staten Island', state: 'NY', interests: ['Seafood', 'Fine Dining', 'Special Occasions'] },
  { name: 'Chris Wilson', email: 'chris.wilson@email.com', phone: '(555) 890-1234', city: 'Long Island', state: 'NY', interests: ['Steakhouse', 'Wine', 'Business Dining'] },
  { name: 'Lisa Garcia', email: 'lisa.garcia@email.com', phone: '(555) 901-2345', city: 'New York', state: 'NY', interests: ['Thai', 'Healthy', 'Vegetarian'] },
  { name: 'Kevin Martinez', email: 'kevin.martinez@email.com', phone: '(555) 012-3456', city: 'Brooklyn', state: 'NY', interests: ['Mediterranean', 'Healthy', 'Lunch'] },
  { name: 'Nicole Taylor', email: 'nicole.taylor@email.com', phone: '(555) 123-5678', city: 'Queens', state: 'NY', interests: ['Indian', 'Spicy Food', 'Takeout'] },
  { name: 'Brandon Lee', email: 'brandon.lee@email.com', phone: '(555) 234-6789', city: 'Manhattan', state: 'NY', interests: ['Japanese', 'Sushi', 'Fine Dining'] },
  { name: 'Stephanie White', email: 'stephanie.white@email.com', phone: '(555) 345-7890', city: 'Bronx', state: 'NY', interests: ['French', 'Bakery', 'Coffee'] },
  { name: 'Jason Moore', email: 'jason.moore@email.com', phone: '(555) 456-8901', city: 'Staten Island', state: 'NY', interests: ['BBQ', 'Casual', 'Family Friendly'] },
  { name: 'Michelle Clark', email: 'michelle.clark@email.com', phone: '(555) 567-9012', city: 'Long Island', state: 'NY', interests: ['Greek', 'Mediterranean', 'Healthy'] },
  { name: 'Daniel Lewis', email: 'daniel.lewis@email.com', phone: '(555) 678-0123', city: 'New York', state: 'NY', interests: ['Spanish', 'Tapas', 'Wine'] },
  { name: 'Rachel Anderson', email: 'rachel.anderson@email.com', phone: '(555) 789-1234', city: 'Brooklyn', state: 'NY', interests: ['Vietnamese', 'Pho', 'Quick Lunch'] },
  { name: 'Matthew Hall', email: 'matthew.hall@email.com', phone: '(555) 890-2345', city: 'Queens', state: 'NY', interests: ['Middle Eastern', 'Halal', 'Casual'] },
  { name: 'Lauren Young', email: 'lauren.young@email.com', phone: '(555) 901-3456', city: 'Manhattan', state: 'NY', interests: ['Cafe', 'Coffee', 'Light Meals'] },
  { name: 'Tyler King', email: 'tyler.king@email.com', phone: '(555) 012-4567', city: 'Bronx', state: 'NY', interests: ['Fast Food', 'Quick', 'Affordable'] },
];

async function populateData() {
  console.log('🚀 Populating sample diner data...\n');
  
  try {
    // First, check how many diners we currently have
    const { count: currentCount } = await supabase
      .from('diners')
      .select('*', { count: 'exact', head: true });
    
    console.log(`📊 Current diners in database: ${currentCount}`);
    
    if (currentCount > 0) {
      console.log('ℹ️  Data already exists. Skipping insertion to avoid duplicates.');
      console.log('   If you want to reset the data, delete the records first.\n');
      return;
    }
    
    // Insert sample diners
    console.log('📝 Inserting sample diners...');
    const { data, error } = await supabase
      .from('diners')
      .insert(sampleDiners);
    
    if (error) {
      console.error('❌ Error inserting data:', error.message);
      console.log('   Details:', error.details);
      return;
    }
    
    console.log(`✅ Successfully inserted ${sampleDiners.length} sample diners!`);
    
    // Verify the insertion
    const { count: newCount } = await supabase
      .from('diners')
      .select('*', { count: 'exact', head: true });
    
    console.log(`📊 Total diners now: ${newCount}\n`);
    
    // Show a few examples
    const { data: examples } = await supabase
      .from('diners')
      .select('name, city, interests')
      .limit(5);
    
    console.log('👥 Sample diners added:');
    examples.forEach(diner => {
      console.log(`   • ${diner.name} from ${diner.city} - Interests: ${diner.interests.join(', ')}`);
    });
    
    console.log('\n🎉 Database is now ready!');
    console.log('🚀 You can run: npm start');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

populateData();
