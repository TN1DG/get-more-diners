-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create restaurants table
create table public.restaurants (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users not null,
  name text not null,
  address text not null,
  city text not null,
  state text not null,
  zip text not null,
  phone text not null,
  cuisine_type text not null,
  description text,
  
  constraint restaurants_user_id_unique unique (user_id)
);

-- Create diners table (sample data for demo)
create table public.diners (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null unique,
  phone text,
  city text not null,
  state text not null,
  interests text[] not null default '{}'
);

-- Create campaigns table
create table public.campaigns (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  restaurant_id uuid references public.restaurants not null,
  name text not null,
  subject text not null,
  email_content text not null,
  sms_content text,
  target_count integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'sent')),
  sent_at timestamp with time zone
);

-- Set up Row Level Security (RLS)
alter table public.restaurants enable row level security;
alter table public.diners enable row level security;
alter table public.campaigns enable row level security;

-- Create policies for restaurants table
create policy "Users can view their own restaurant" on public.restaurants
  for select using (auth.uid() = user_id);

create policy "Users can insert their own restaurant" on public.restaurants
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own restaurant" on public.restaurants
  for update using (auth.uid() = user_id);

-- Create policies for diners table (all authenticated users can read)
create policy "Authenticated users can view diners" on public.diners
  for select using (auth.role() = 'authenticated');

-- Create policies for campaigns table
create policy "Users can view their own campaigns" on public.campaigns
  for select using (
    exists (
      select 1 from public.restaurants
      where restaurants.id = campaigns.restaurant_id
      and restaurants.user_id = auth.uid()
    )
  );

create policy "Users can insert campaigns for their restaurant" on public.campaigns
  for insert with check (
    exists (
      select 1 from public.restaurants
      where restaurants.id = campaigns.restaurant_id
      and restaurants.user_id = auth.uid()
    )
  );

create policy "Users can update their own campaigns" on public.campaigns
  for update using (
    exists (
      select 1 from public.restaurants
      where restaurants.id = campaigns.restaurant_id
      and restaurants.user_id = auth.uid()
    )
  );

-- Insert sample diner data
insert into public.diners (name, email, phone, city, state, interests) values
('Sarah Johnson', 'sarah.johnson@email.com', '(555) 123-4567', 'New York', 'NY', '{"Italian", "Fine Dining", "Date Night"}'),
('Mike Chen', 'mike.chen@email.com', '(555) 234-5678', 'New York', 'NY', '{"Chinese", "Asian", "Quick Lunch"}'),
('Emily Rodriguez', 'emily.rodriguez@email.com', '(555) 345-6789', 'Brooklyn', 'NY', '{"Mexican", "Vegetarian", "Family Friendly"}'),
('David Kim', 'david.kim@email.com', '(555) 456-7890', 'Queens', 'NY', '{"Korean", "BBQ", "Spicy Food"}'),
('Jessica Brown', 'jessica.brown@email.com', '(555) 567-8901', 'Manhattan', 'NY', '{"American", "Brunch", "Cocktails"}'),
('Ryan Thompson', 'ryan.thompson@email.com', '(555) 678-9012', 'Bronx', 'NY', '{"Pizza", "Casual", "Sports Bar"}'),
('Amanda Davis', 'amanda.davis@email.com', '(555) 789-0123', 'Staten Island', 'NY', '{"Seafood", "Fine Dining", "Special Occasions"}'),
('Chris Wilson', 'chris.wilson@email.com', '(555) 890-1234', 'Long Island', 'NY', '{"Steakhouse", "Wine", "Business Dining"}'),
('Lisa Garcia', 'lisa.garcia@email.com', '(555) 901-2345', 'New York', 'NY', '{"Thai", "Healthy", "Vegetarian"}'),
('Kevin Martinez', 'kevin.martinez@email.com', '(555) 012-3456', 'Brooklyn', 'NY', '{"Mediterranean", "Healthy", "Lunch"}'),
('Nicole Taylor', 'nicole.taylor@email.com', '(555) 123-5678', 'Queens', 'NY', '{"Indian", "Spicy Food", "Takeout"}'),
('Brandon Lee', 'brandon.lee@email.com', '(555) 234-6789', 'Manhattan', 'NY', '{"Japanese", "Sushi", "Fine Dining"}'),
('Stephanie White', 'stephanie.white@email.com', '(555) 345-7890', 'Bronx', 'NY', '{"French", "Bakery", "Coffee"}'),
('Jason Moore', 'jason.moore@email.com', '(555) 456-8901', 'Staten Island', 'NY', '{"BBQ", "Casual", "Family Friendly"}'),
('Michelle Clark', 'michelle.clark@email.com', '(555) 567-9012', 'Long Island', 'NY', '{"Greek", "Mediterranean", "Healthy"}'),
('Daniel Lewis', 'daniel.lewis@email.com', '(555) 678-0123', 'New York', 'NY', '{"Spanish", "Tapas", "Wine"}'),
('Rachel Anderson', 'rachel.anderson@email.com', '(555) 789-1234', 'Brooklyn', 'NY', '{"Vietnamese", "Pho", "Quick Lunch"}'),
('Matthew Hall', 'matthew.hall@email.com', '(555) 890-2345', 'Queens', 'NY', '{"Middle Eastern", "Halal", "Casual"}'),
('Lauren Young', 'lauren.young@email.com', '(555) 901-3456', 'Manhattan', 'NY', '{"Cafe", "Coffee", "Light Meals"}'),
('Tyler King', 'tyler.king@email.com', '(555) 012-4567', 'Bronx', 'NY', '{"Fast Food", "Quick", "Affordable"}'),
('Samantha Wright', 'samantha.wright@email.com', '(555) 123-6789', 'Staten Island', 'NY', '{"Pub", "Bar Food", "Happy Hour"}'),
('Alex Lopez', 'alex.lopez@email.com', '(555) 234-7890', 'Long Island', 'NY', '{"Breakfast", "Diner", "All Day"}'),
('Megan Hill', 'megan.hill@email.com', '(555) 345-8901', 'New York', 'NY', '{"Vegan", "Healthy", "Organic"}'),
('Jonathan Scott', 'jonathan.scott@email.com', '(555) 456-9012', 'Brooklyn', 'NY', '{"Food Truck", "Street Food", "Casual"}'),
('Ashley Green', 'ashley.green@email.com', '(555) 567-0123', 'Queens', 'NY', '{"Buffet", "All You Can Eat", "Family"}'),
('Corey Adams', 'corey.adams@email.com', '(555) 678-1234', 'Manhattan', 'NY', '{"Fine Dining", "Tasting Menu", "Wine Pairing"}'),
('Brittany Baker', 'brittany.baker@email.com', '(555) 789-2345', 'Bronx', 'NY', '{"Comfort Food", "Home Style", "Portions"}'),
('Jeremy Nelson', 'jeremy.nelson@email.com', '(555) 890-3456', 'Staten Island', 'NY', '{"Sports Bar", "Wings", "Beer"}'),
('Kayla Carter', 'kayla.carter@email.com', '(555) 901-4567', 'Long Island', 'NY', '{"Romantic", "Date Night", "Quiet"}'),
('Steven Mitchell', 'steven.mitchell@email.com', '(555) 012-5678', 'New York', 'NY', '{"Business Lunch", "Professional", "Quick Service"}'),
('Tiffany Perez', 'tiffany.perez@email.com', '(555) 123-7890', 'Brooklyn', 'NY', '{"Gluten Free", "Healthy Options", "Special Diet"}'),
('Marcus Roberts', 'marcus.roberts@email.com', '(555) 234-8901', 'Queens', 'NY', '{"Late Night", "24 Hour", "After Hours"}'),
('Crystal Turner', 'crystal.turner@email.com', '(555) 345-9012', 'Manhattan', 'NY', '{"Upscale", "Dress Code", "Special Events"}'),
('Andrew Phillips', 'andrew.phillips@email.com', '(555) 456-0123', 'Bronx', 'NY', '{"Local", "Neighborhood", "Regular"}'),
('Vanessa Campbell', 'vanessa.campbell@email.com', '(555) 567-1234', 'Staten Island', 'NY', '{"Outdoor Seating", "Patio", "Weather Dependent"}'),
('Gregory Parker', 'gregory.parker@email.com', '(555) 678-2345', 'Long Island', 'NY', '{"Group Dining", "Large Parties", "Reservations"}'),
('Diana Evans', 'diana.evans@email.com', '(555) 789-3456', 'New York', 'NY', '{"Food Allergies", "Custom Orders", "Accommodating"}'),
('Zachary Edwards', 'zachary.edwards@email.com', '(555) 890-4567', 'Brooklyn', 'NY', '{"Craft Beer", "Local Brewery", "Hops"}'),
('Melody Collins', 'melody.collins@email.com', '(555) 901-5678', 'Queens', 'NY', '{"Wine Bar", "Small Plates", "Sophisticated"}'),
('Austin Stewart', 'austin.stewart@email.com', '(555) 012-6789', 'Manhattan', 'NY', '{"Trendy", "Instagram Worthy", "Social Media"}'),
('Jasmine Sanchez', 'jasmine.sanchez@email.com', '(555) 123-8901', 'Bronx', 'NY', '{"Ethnic Food", "Authentic", "Traditional"}'),
('Trevor Morris', 'trevor.morris@email.com', '(555) 234-9012', 'Staten Island', 'NY', '{"Delivery", "Takeout", "Convenience"}'),
('Gabrielle Rogers', 'gabrielle.rogers@email.com', '(555) 345-0123', 'Long Island', 'NY', '{"Healthy", "Low Calorie", "Fitness"}'),
('Blake Reed', 'blake.reed@email.com', '(555) 456-1234', 'New York', 'NY', '{"Spicy", "Hot Sauce", "Challenge"}'),
('Sierra Cook', 'sierra.cook@email.com', '(555) 567-2345', 'Brooklyn', 'NY', '{"Sweet Tooth", "Desserts", "Pastries"}'),
('Devin Bailey', 'devin.bailey@email.com', '(555) 678-3456', 'Queens', 'NY', '{"Music Venue", "Live Entertainment", "Atmosphere"}'),
('Paige Rivera', 'paige.rivera@email.com', '(555) 789-4567', 'Manhattan', 'NY', '{"Quiet Dining", "Peaceful", "Relaxing"}'),
('Colton Cooper', 'colton.cooper@email.com', '(555) 890-5678', 'Bronx', 'NY', '{"Game Watching", "Sports", "Crowd"}'),
('Jenna Richardson', 'jenna.richardson@email.com', '(555) 901-6789', 'Staten Island', 'NY', '{"Private Dining", "Events", "Celebrations"}'),
('Bryce Cox', 'bryce.cox@email.com', '(555) 012-7890', 'Long Island', 'NY', '{"Seasonal Menu", "Fresh Ingredients", "Farm to Table"}');
