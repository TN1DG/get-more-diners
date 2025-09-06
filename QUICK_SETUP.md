# 🚀 Quick Setup Guide

## ✅ Supabase Credentials Configured!

Your Supabase credentials have been set up in `.env.local`:
- **URL**: https://rdejxximdggmmcxsgsdu.supabase.co  
- **API Key**: Configured ✅

## 📋 Final Setup Steps

### 1. Set Up Database Schema

Go to your Supabase project and run the SQL schema:

**Option A: Via Supabase Dashboard**
1. Visit: https://rdejxximdggmmcxsgsdu.supabase.co
2. Go to **SQL Editor** 
3. Create new query
4. Copy the entire content from `supabase-schema.sql` file
5. Paste and click **"Run"**

**Option B: Copy this SQL directly:**

```sql
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
```

### 2. Insert Sample Data

After the tables are created, run this to add sample diners:

```sql
-- Insert first 10 sample diners (you can add more from the supabase-schema.sql file)
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
('Kevin Martinez', 'kevin.martinez@email.com', '(555) 012-3456', 'Brooklyn', 'NY', '{"Mediterranean", "Healthy", "Lunch"}');
```

### 3. Start the Application

```bash
npm start
```

### 4. Test the App

Visit: http://localhost:3000

1. **Sign up** for a new account
2. **Create** your restaurant profile  
3. **Search** the sample diners
4. **Generate** AI campaigns
5. **Send** campaigns (demo)

## 🎉 You're Ready to Go!

The app will now have:
- ✅ Full authentication 
- ✅ 10+ sample diners to search
- ✅ AI campaign generation
- ✅ Campaign management
- ✅ Professional UI

Enjoy your fully-functional SaaS app! 🚀
