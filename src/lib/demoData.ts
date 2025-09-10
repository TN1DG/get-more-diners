export const getDemoRestaurant = () => ({
  id: 'demo-restaurant-123',
  user_id: 'demo-user-123',
  name: 'Bella Vista Italian',
  city: 'Austin',
  state: 'TX',
  cuisine_type: 'Italian',
  description: 'Authentic Italian cuisine in the heart of Austin. Family-owned restaurant serving traditional recipes with locally sourced ingredients.',
  address: '123 Culinary Lane',
  phone: '(512) 555-0123',
  website: 'www.bellavistaaustin.com',
  created_at: '2024-01-15T00:00:00Z'
})

export const getDemoCampaigns = () => [
  {
    id: 'demo-campaign-1',
    restaurant_id: 'demo-restaurant-123',
    name: 'Valentine\'s Day Romance Special',
    subject: '💕 Romance is in the air at Bella Vista - Valentine\'s Special Inside!',
    email_content: `Dear Food Lover,

Love is in the air, and so is the aroma of authentic Italian cuisine! 

💝 This Valentine's Day, treat your special someone to an unforgettable evening at Bella Vista Italian.

✨ Our Valentine's Romance Package includes:
• Intimate candlelit table for two
• Complimentary glass of Prosecco
• Chef's special 3-course romantic dinner
• Homemade tiramisu to share
• Live acoustic music from 7-9 PM

🌹 Just $89 per couple (regularly $120)

Reserve your romantic evening by calling (512) 555-0123 or visit our website. 
Limited seating available - book now!

Amore awaits at Bella Vista,
Chef Marco & the Bella Vista Team

P.S. Surprise your love with an evening they'll never forget! ❤️`,
    sms_content: '💕 Valentine\'s Special at Bella Vista! Romantic 3-course dinner for 2 just $89 (reg $120). Call (512) 555-0123. Book now! ❤️',
    target_count: 234,
    status: 'sent',
    sent_at: '2024-02-10T10:00:00Z',
    created_at: '2024-02-08T15:30:00Z'
  },
  {
    id: 'demo-campaign-2',
    restaurant_id: 'demo-restaurant-123',
    name: 'Happy Hour Monday Special',
    subject: '🍸 Beat the Monday Blues - Happy Hour at Bella Vista!',
    email_content: `Buongiorno Friend!

Monday blues got you down? We've got the perfect remedy! 

🍸 Join us for Happy Hour Mondays at Bella Vista:
• 50% off all wines and cocktails
• $8 appetizer specials (usually $12-16)
• Complimentary bruschetta with any drink order
• Live jazz music to set the mood

⏰ Every Monday, 4:00 PM - 7:00 PM

Our Monday Happy Hour features:
🍷 Half-price wine bottles
🍹 Signature Aperol Spritz for just $6
🍤 Garlic shrimp scampi appetizer - $8
🧀 Artisanal cheese board - $8
🍞 Fresh burrata with prosciutto - $8

Transform your Monday into something special. See you at Bella Vista!

Saluti,
The Bella Vista Team

123 Culinary Lane, Austin TX | (512) 555-0123`,
    sms_content: '🍸 Monday Happy Hour at Bella Vista! 50% off drinks + $8 appetizer specials. 4-7 PM. Beat those Monday blues! 🎵',
    target_count: 156,
    status: 'sent',
    sent_at: '2024-02-05T09:00:00Z',
    created_at: '2024-02-03T14:20:00Z'
  },
  {
    id: 'demo-campaign-3',
    restaurant_id: 'demo-restaurant-123',
    name: 'Spring Menu Launch',
    subject: '🌸 Spring Has Sprung - New Seasonal Menu at Bella Vista!',
    email_content: `Ciao Bella!

Spring is here, and we're celebrating with an exciting new seasonal menu! 

🌸 Our Spring 2024 Collection features:
• Fresh pasta made with locally sourced spring vegetables
• Wild mushroom risotto with Austin-grown morels
• Grilled branzino with lemon and fresh herbs
• House-made gelato in seasonal flavors

🎉 Grand Launch Special:
Visit us this week (March 18-24) and receive 20% off any new spring menu item!

Featured Spring Highlights:
🍋 Lemon Ricotta Agnolotti - delicate pasta pillows with spring peas
🍄 Truffle Mushroom Risotto - creamy Arborio rice with local mushrooms  
🐟 Mediterranean Branzino - whole fish grilled to perfection
🍓 Strawberry Basil Gelato - made fresh daily in our kitchen

Book your table today to experience the flavors of spring!
Call (512) 555-0123 or visit our website.

Primavera blessings,
Chef Marco & Team Bella Vista`,
    sms_content: '🌸 NEW Spring Menu at Bella Vista! 20% off all new items this week (Mar 18-24). Fresh, local ingredients! Book: (512) 555-0123 🍋',
    target_count: 189,
    status: 'draft',
    sent_at: null,
    created_at: '2024-03-15T11:45:00Z'
  }
]

export const getDemoStats = () => ({
  totalCampaigns: 3,
  sentCampaigns: 2,
  draftCampaigns: 1,
  totalReach: 390,
  successRate: 87,
  campaignsThisMonth: 1
})

export const getDemoDiners = () => [
  {
    id: 'demo-diner-1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(512) 555-0191',
    city: 'Austin',
    state: 'TX',
    interests: ['Italian', 'Fine Dining', 'Date Night', 'Wine', 'Vegetarian']
  },
  {
    id: 'demo-diner-2',
    name: 'Michael Chen',
    email: 'mchen@example.com',
    phone: '(512) 555-0192',
    city: 'Austin',
    state: 'TX',
    interests: ['Italian', 'Business Dining', 'Happy Hour', 'Seafood']
  },
  {
    id: 'demo-diner-3',
    name: 'Emily Rodriguez',
    email: 'emily.r@gmail.com',
    phone: '(512) 555-0193',
    city: 'Austin',
    state: 'TX',
    interests: ['Italian', 'Family Friendly', 'Casual', 'Pizza', 'Brunch']
  },
  {
    id: 'demo-diner-4',
    name: 'David Thompson',
    email: 'dthompson@yahoo.com',
    phone: '(512) 555-0194',
    city: 'Austin',
    state: 'TX',
    interests: ['Italian', 'Fine Dining', 'Steakhouse', 'Date Night']
  },
  {
    id: 'demo-diner-5',
    name: 'Lisa Park',
    email: 'lisa.park@outlook.com',
    phone: '(512) 555-0195',
    city: 'Austin',
    state: 'TX',
    interests: ['Italian', 'Healthy', 'Vegetarian', 'Wine', 'Casual']
  },
  {
    id: 'demo-diner-6',
    name: 'James Wilson',
    email: 'jwilson@company.com',
    phone: '(512) 555-0196',
    city: 'Austin',
    state: 'TX',
    interests: ['Italian', 'Business Dining', 'Quick Service', 'Takeout']
  },
  {
    id: 'demo-diner-7',
    name: 'Amanda Davis',
    email: 'amanda.davis@email.com',
    phone: '(512) 555-0197',
    city: 'Austin',
    state: 'TX',
    interests: ['Italian', 'Date Night', 'Fine Dining', 'Wine', 'Romantic']
  },
  {
    id: 'demo-diner-8',
    name: 'Robert Kim',
    email: 'rkim@gmail.com',
    phone: '(512) 555-0198',
    city: 'Austin',
    state: 'TX',
    interests: ['Italian', 'Family Friendly', 'Pizza', 'Casual', 'Kids Menu']
  },
  {
    id: 'demo-diner-9',
    name: 'Jennifer Martinez',
    email: 'jen.martinez@domain.com',
    phone: '(512) 555-0199',
    city: 'Austin',
    state: 'TX',
    interests: ['Italian', 'Happy Hour', 'Cocktails', 'Appetizers', 'Groups']
  },
  {
    id: 'demo-diner-10',
    name: 'Christopher Lee',
    email: 'chris.lee@service.com',
    phone: '(512) 555-0200',
    city: 'Austin',
    state: 'TX',
    interests: ['Italian', 'Fine Dining', 'Wine', 'Chef Special', 'Anniversary']
  }
]

export const isDemoMode = () => {
  return localStorage.getItem('demo_mode') === 'true'
}

export const getDemoUser = () => {
  const demoUser = localStorage.getItem('demo_user')
  return demoUser ? JSON.parse(demoUser) : null
}

export const clearDemoMode = () => {
  localStorage.removeItem('demo_mode')
  localStorage.removeItem('demo_user')
}
