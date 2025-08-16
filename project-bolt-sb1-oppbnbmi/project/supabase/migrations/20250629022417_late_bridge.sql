/*
  # Fix PDF Documents Access Issues

  1. Security
    - Temporarily disable RLS for testing
    - Add public access policies
    - Ensure proper permissions

  2. Data Cleanup
    - Remove duplicate entries
    - Ensure proper file URLs
*/

-- Temporarily disable RLS for pdf_documents to test connection
ALTER TABLE pdf_documents DISABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Authenticated users can manage PDF documents" ON pdf_documents;
DROP POLICY IF EXISTS "Public read access for active PDF documents" ON pdf_documents;

-- Create simple public access policy
CREATE POLICY "Allow public read access to active PDFs"
  ON pdf_documents
  FOR SELECT
  TO public
  USING (is_active = true);

-- Create policy for authenticated users to manage documents
CREATE POLICY "Allow authenticated users to manage PDFs"
  ON pdf_documents
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Clean up duplicate entries (keep only the latest ones)
DELETE FROM pdf_documents 
WHERE id NOT IN (
  SELECT DISTINCT ON (document_type, title) id
  FROM pdf_documents
  ORDER BY document_type, title, created_at DESC
);

-- Ensure we have the correct URLs (fix any remaining URL issues)
UPDATE pdf_documents 
SET file_url = CASE 
  WHEN document_type = 'cover-letter' AND title = 'Professional Cover Letter' 
    THEN 'https://jzxhcbhhivsywizbfewe.supabase.co/storage/v1/object/public/pdfdocuments/CV%20COVER%20LETTER.pdf'
  WHEN document_type = 'ai-cv' AND title = 'AI Specialist CV'
    THEN 'https://jzxhcbhhivsywizbfewe.supabase.co/storage/v1/object/public/pdfdocuments/cv.pdf'
  WHEN document_type = 'whitepaper' AND title = 'Synthetic Data Sharing Platform (SDSP)'
    THEN 'https://jzxhcbhhivsywizbfewe.supabase.co/storage/v1/object/public/pdfdocuments/Synthetic%20Data%20Sharing%20Platform%20(SDSP)%20Whitepaper.pdf'
  WHEN document_type = 'whitepaper' AND title = 'Authentes 1.0 Whitepaper'
    THEN 'https://jzxhcbhhivsywizbfewe.supabase.co/storage/v1/object/public/pdfdocuments/Authentes%201.0%20Whitepaper.pdf'
  ELSE file_url
END
WHERE is_active = true;

-- Re-enable RLS after fixing policies
ALTER TABLE pdf_documents ENABLE ROW LEVEL SECURITY;