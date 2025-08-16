/*
  # Update PDF file names for LaTeX-formatted documents

  1. Updates
    - Update all PDF file URLs to reflect new LaTeX-formatted versions
    - Maintain existing document structure and metadata
    - Ensure proper URL encoding for file names

  2. Files Updated
    - Cover Letter: Updated to LaTeX version
    - AI CV: Updated to LaTeX version  
    - SDSP Whitepaper: Updated to LaTeX version
    - Authentes 1.0 Whitepaper: Updated to LaTeX version

  3. Notes
    - Preserves all existing metadata and document properties
    - Updates only the file_url field to point to new LaTeX versions
    - Maintains backward compatibility with existing queries
*/

-- Update Cover Letter PDF to LaTeX version
UPDATE pdf_documents 
SET 
  file_url = 'https://jzxhcbhhivsywizbfewe.supabase.co/storage/v1/object/public/pdfdocuments/CV%20COVER%20LETTER.pdf',
  updated_at = now()
WHERE document_type = 'cover-letter' 
  AND title = 'Professional Cover Letter' 
  AND is_active = true;

-- Update AI CV PDF to LaTeX version
UPDATE pdf_documents 
SET 
  file_url = 'https://jzxhcbhhivsywizbfewe.supabase.co/storage/v1/object/public/pdfdocuments/cv.pdf',
  updated_at = now()
WHERE document_type = 'ai-cv' 
  AND title = 'AI Specialist CV' 
  AND is_active = true;

-- Update SDSP Whitepaper PDF to LaTeX version
UPDATE pdf_documents 
SET 
  file_url = 'https://jzxhcbhhivsywizbfewe.supabase.co/storage/v1/object/public/pdfdocuments/Synthetic%20Data%20Sharing%20Platform%20(SDSP)%20Whitepaper.pdf',
  updated_at = now()
WHERE document_type = 'whitepaper' 
  AND title = 'Synthetic Data Sharing Platform (SDSP)' 
  AND is_active = true;

-- Update Authentes 1.0 Whitepaper PDF to LaTeX version
UPDATE pdf_documents 
SET 
  file_url = 'https://jzxhcbhhivsywizbfewe.supabase.co/storage/v1/object/public/pdfdocuments/Authentes%201.0%20Whitepaper.pdf',
  updated_at = now()
WHERE document_type = 'whitepaper' 
  AND title = 'Authentes 1.0 Whitepaper' 
  AND is_active = true;

-- Verify the updates (optional - for debugging)
-- SELECT document_type, title, file_url, updated_at 
-- FROM pdf_documents 
-- WHERE is_active = true 
-- ORDER BY document_type, title;