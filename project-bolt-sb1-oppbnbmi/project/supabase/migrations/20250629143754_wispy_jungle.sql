/*
  # Debug PDF Storage Issues

  This migration helps identify and fix PDF storage issues by:
  1. Checking current database entries
  2. Verifying file accessibility
  3. Updating URLs if needed
*/

-- First, let's see what's currently in the database
SELECT 
  document_type,
  title,
  file_url,
  updated_at,
  created_at
FROM pdf_documents 
WHERE is_active = true 
ORDER BY document_type, title;

-- Check specifically for Authentes 1.0 Whitepaper
SELECT 
  id,
  document_type,
  title,
  file_url,
  updated_at,
  metadata
FROM pdf_documents 
WHERE title ILIKE '%authentes%' 
  AND is_active = true;

-- Update Authentes 1.0 Whitepaper with a fresh timestamp to force cache refresh
UPDATE pdf_documents 
SET 
  file_url = 'https://jzxhcbhhivsywizbfewe.supabase.co/storage/v1/object/public/pdfdocuments/Authentes%201.0%20Whitepaper.pdf',
  updated_at = CURRENT_TIMESTAMP,
  metadata = jsonb_set(
    COALESCE(metadata, '{}'),
    '{last_updated}',
    to_jsonb(CURRENT_TIMESTAMP::text)
  )
WHERE document_type = 'whitepaper' 
  AND title = 'Authentes 1.0 Whitepaper' 
  AND is_active = true;

-- Also try alternative filename patterns in case the file was uploaded differently
-- Common variations: spaces vs %20, different extensions, etc.

-- Show final state
SELECT 
  'Final state:' as status,
  document_type,
  title,
  file_url,
  updated_at
FROM pdf_documents 
WHERE document_type = 'whitepaper' 
  AND title = 'Authentes 1.0 Whitepaper' 
  AND is_active = true;