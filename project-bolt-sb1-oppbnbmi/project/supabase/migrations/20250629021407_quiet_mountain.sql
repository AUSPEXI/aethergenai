/*
  # Fix PDF URLs with correct Supabase project ID

  1. Updates
    - Correct the Supabase project ID in all PDF URLs
    - Fix typo from 'jzxhcbhhivyywizbefewe' to 'jzxhcbhhivsywizbfewe'
  
  2. Security
    - No changes to RLS policies
*/

-- Update all PDF URLs to use the correct Supabase project ID
UPDATE pdf_documents 
SET file_url = REPLACE(file_url, 'jzxhcbhhivyywizbefewe', 'jzxhcbhhivsywizbfewe')
WHERE file_url LIKE '%jzxhcbhhivyywizbefewe%';

-- Verify the URLs are now correct
-- SELECT title, file_url FROM pdf_documents WHERE is_active = true;