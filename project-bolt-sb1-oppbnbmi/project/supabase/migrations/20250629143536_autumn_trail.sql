/*
  # Fix Authentes 1.0 Whitepaper URL

  1. Problem
    - Local file path was used instead of public URL
    - Download button fails because browsers can't access local file paths

  2. Solution
    - Update to use proper Supabase storage URL
    - Ensure the PDF is uploaded to the correct storage bucket
*/

-- Update Authentes 1.0 Whitepaper to use the correct public URL
UPDATE pdf_documents 
SET 
  file_url = 'https://jzxhcbhhivsywizbfewe.supabase.co/storage/v1/object/public/pdfdocuments/Authentes%201.0%20Whitepaper.pdf',
  updated_at = now()
WHERE document_type = 'whitepaper' 
  AND title = 'Authentes 1.0 Whitepaper' 
  AND is_active = true;

-- Verify the update
SELECT 
  document_type, 
  title, 
  file_url, 
  updated_at 
FROM pdf_documents 
WHERE document_type = 'whitepaper' 
  AND title = 'Authentes 1.0 Whitepaper' 
  AND is_active = true;