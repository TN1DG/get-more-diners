-- Option 1: Disable RLS for diners table (easiest for demo data)
ALTER TABLE public.diners DISABLE ROW LEVEL SECURITY;

-- OR Option 2: Create a policy for inserting diners (if you want to keep RLS)
-- CREATE POLICY "Allow insert for diners" ON public.diners
--   FOR INSERT WITH CHECK (true);

-- After running this SQL in Supabase, the diners table will allow insertions
