/*
  # Populate PDF Documents Table

  1. Data Population
    - Insert records for uploaded PDF documents
    - Map document types to actual uploaded files
    - Set appropriate metadata and status

  2. File Mapping
    - CV COVER LETTER.pdf -> cover-letter type
    - cv.pdf -> ai-cv type  
    - Synthetic Data Sharing Platform (SDSP) Whitepaper.pdf -> whitepaper type
    - Authentes 1.0 Whitepaper.pdf -> whitepaper type

  3. Storage URLs
    - Generate proper Supabase storage URLs for each document
    - Ensure public access is configured correctly
*/

-- Insert PDF document records with proper file URLs
INSERT INTO pdf_documents (document_type, title, file_url, metadata, version, is_active) VALUES
(
  'cover-letter',
  'Professional Cover Letter',
  'https://jzxhcbhhivyywizbefewe.supabase.co/storage/v1/object/public/pdfdocuments/CV%20COVER%20LETTER.pdf',
  '{"description": "Professional cover letter highlighting AI expertise and creative approach", "pages": 2, "file_size": "43.77 KB"}',
  '1.0',
  true
),
(
  'ai-cv',
  'AI Specialist CV',
  'https://jzxhcbhhivyywizbefewe.supabase.co/storage/v1/object/public/pdfdocuments/cv.pdf',
  '{"description": "Comprehensive CV focused on AI, ML, and synthetic data expertise", "pages": 3, "file_size": "108.48 KB"}',
  '1.0',
  true
),
(
  'whitepaper',
  'Synthetic Data Sharing Platform (SDSP)',
  'https://jzxhcbhhivyywizbefewe.supabase.co/storage/v1/object/public/pdfdocuments/Synthetic%20Data%20Sharing%20Platform%20(SDSP)%20Whitepaper.pdf',
  '{"description": "Technical whitepaper detailing the SDSP architecture and capabilities", "pages": 12, "file_size": "71.19 KB"}',
  '1.0',
  true
),
(
  'whitepaper',
  'Authentes 1.0 Whitepaper',
  'https://jzxhcbhhivyywizbefewe.supabase.co/storage/v1/object/public/pdfdocuments/Authentes%201.0%20Whitepaper.pdf',
  '{"description": "Technical documentation of the Authentes 1.0 neural validation system", "pages": 8, "file_size": "48.33 KB"}',
  '1.0',
  true
);