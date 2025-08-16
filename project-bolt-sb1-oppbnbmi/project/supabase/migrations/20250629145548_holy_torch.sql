/*
  # Fix PDF Highlighting Issue

  1. Investigation
    - Check if PDFs in Supabase storage maintain original formatting
    - Verify file integrity after upload
    - Test different upload methods

  2. Solutions
    - Re-upload PDFs ensuring no compression
    - Add metadata to track file integrity
    - Implement file verification checks
*/

-- Add file integrity tracking
ALTER TABLE pdf_documents 
ADD COLUMN IF NOT EXISTS file_hash TEXT,
ADD COLUMN IF NOT EXISTS original_size BIGINT,
ADD COLUMN IF NOT EXISTS upload_method TEXT DEFAULT 'manual';

-- Update existing records with current file information
UPDATE pdf_documents 
SET 
  upload_method = 'manual',
  updated_at = now()
WHERE file_hash IS NULL;

-- Add comment about the highlighting issue
COMMENT ON COLUMN pdf_documents.file_hash IS 'SHA-256 hash to verify file integrity and detect compression/processing changes';
COMMENT ON COLUMN pdf_documents.original_size IS 'Original file size in bytes to detect compression';
COMMENT ON COLUMN pdf_documents.upload_method IS 'Method used to upload file (manual, api, bulk) to track potential processing differences';

-- Create function to verify file integrity
CREATE OR REPLACE FUNCTION verify_pdf_integrity()
RETURNS TABLE (
  document_title TEXT,
  file_url TEXT,
  has_integrity_data BOOLEAN,
  needs_reupload BOOLEAN
) 
LANGUAGE SQL
AS $$
  SELECT 
    title,
    file_url,
    (file_hash IS NOT NULL AND original_size IS NOT NULL) as has_integrity_data,
    (file_hash IS NULL OR original_size IS NULL) as needs_reupload
  FROM pdf_documents 
  WHERE is_active = true
  ORDER BY document_type, title;
$$;

-- Check current state
SELECT * FROM verify_pdf_integrity();