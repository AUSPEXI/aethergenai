/*
  # PDF Documents Storage System

  1. New Tables
    - `pdf_documents`
      - `id` (uuid, primary key)
      - `document_type` (text) - Type of document (cv, cover-letter, etc.)
      - `title` (text) - Document title
      - `content` (jsonb) - Document content and structure
      - `file_url` (text) - URL to stored PDF file
      - `metadata` (jsonb) - Additional document metadata
      - `version` (text) - Document version
      - `is_active` (boolean) - Whether this version is active
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `pdf_documents` table
    - Add policy for public read access to active documents
    - Add policy for authenticated users to manage documents
*/

CREATE TABLE IF NOT EXISTS pdf_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_type text NOT NULL CHECK (document_type IN ('ai-cv', 'standard-cv', 'cover-letter', 'whitepaper')),
  title text NOT NULL,
  content jsonb NOT NULL DEFAULT '{}',
  file_url text,
  metadata jsonb DEFAULT '{}',
  version text DEFAULT '1.0',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE pdf_documents ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public read access for active PDF documents"
  ON pdf_documents
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage PDF documents"
  ON pdf_documents
  FOR ALL
  TO authenticated
  USING (true);

-- Indexes for performance
CREATE INDEX idx_pdf_documents_type_active ON pdf_documents (document_type, is_active);
CREATE INDEX idx_pdf_documents_created_at ON pdf_documents (created_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_pdf_documents_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_pdf_documents_updated_at
  BEFORE UPDATE ON pdf_documents
  FOR EACH ROW
  EXECUTE FUNCTION update_pdf_documents_updated_at();