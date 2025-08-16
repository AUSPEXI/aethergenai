/**
 * PDF utility functions for handling file integrity and upload verification
 */

export interface PDFIntegrityCheck {
  title: string;
  fileUrl: string;
  hasIntegrityData: boolean;
  needsReupload: boolean;
}

export interface PDFUploadOptions {
  preserveFormatting: boolean;
  compressionLevel: 'none' | 'low' | 'medium' | 'high';
  validateIntegrity: boolean;
}

/**
 * Calculate SHA-256 hash of a file for integrity verification
 */
export async function calculateFileHash(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Verify PDF file integrity by comparing with stored hash
 */
export async function verifyPDFIntegrity(
  fileUrl: string, 
  expectedHash?: string,
  expectedSize?: number
): Promise<{
  isValid: boolean;
  actualHash?: string;
  actualSize?: number;
  issues: string[];
}> {
  const issues: string[] = [];
  
  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      issues.push(`Failed to fetch file: ${response.status}`);
      return { isValid: false, issues };
    }

    const arrayBuffer = await response.arrayBuffer();
    const actualSize = arrayBuffer.byteLength;
    const actualHash = await crypto.subtle.digest('SHA-256', arrayBuffer)
      .then(hashBuffer => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      });

    // Check size if provided
    if (expectedSize && actualSize !== expectedSize) {
      issues.push(`Size mismatch: expected ${expectedSize}, got ${actualSize}`);
    }

    // Check hash if provided
    if (expectedHash && actualHash !== expectedHash) {
      issues.push(`Hash mismatch: file may have been modified or compressed`);
    }

    return {
      isValid: issues.length === 0,
      actualHash,
      actualSize,
      issues
    };
  } catch (error) {
    issues.push(`Verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return { isValid: false, issues };
  }
}

/**
 * Check if PDF contains highlighting/annotations
 */
export async function checkPDFForHighlighting(fileUrl: string): Promise<{
  hasHighlights: boolean;
  annotationCount: number;
  details: string[];
}> {
  // This is a simplified check - in a real implementation, you'd use a PDF parsing library
  // For now, we'll check file size and provide guidance
  
  try {
    const response = await fetch(fileUrl);
    const arrayBuffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    
    // Convert to string to search for PDF annotation markers
    const pdfString = Array.from(uint8Array)
      .map(byte => String.fromCharCode(byte))
      .join('');
    
    // Look for common PDF annotation/highlight markers
    const highlightMarkers = [
      '/Highlight',
      '/Annot',
      '/Markup',
      '/FreeText',
      '/Ink',
      '/Square',
      '/Circle'
    ];
    
    const foundMarkers = highlightMarkers.filter(marker => 
      pdfString.includes(marker)
    );
    
    return {
      hasHighlights: foundMarkers.length > 0,
      annotationCount: foundMarkers.length,
      details: foundMarkers.length > 0 
        ? [`Found annotation markers: ${foundMarkers.join(', ')}`]
        : ['No annotation markers detected in PDF structure']
    };
  } catch (error) {
    return {
      hasHighlights: false,
      annotationCount: 0,
      details: [`Error checking PDF: ${error instanceof Error ? error.message : 'Unknown error'}`]
    };
  }
}

/**
 * Generate recommendations for fixing PDF highlighting issues
 */
export function generatePDFFixRecommendations(
  integrityCheck: Awaited<ReturnType<typeof verifyPDFIntegrity>>,
  highlightCheck: Awaited<ReturnType<typeof checkPDFForHighlighting>>
): string[] {
  const recommendations: string[] = [];
  
  if (!integrityCheck.isValid) {
    recommendations.push('File integrity compromised - consider re-uploading the original PDF');
  }
  
  if (!highlightCheck.hasHighlights) {
    recommendations.push('No highlighting detected - the PDF may have been flattened during upload');
    recommendations.push('Try uploading the PDF using a different method or tool');
    recommendations.push('Ensure the original PDF contains vector-based highlights, not raster images');
  }
  
  if (integrityCheck.issues.some(issue => issue.includes('Size mismatch'))) {
    recommendations.push('File size changed - PDF may have been compressed, removing formatting');
    recommendations.push('Upload with compression disabled if possible');
  }
  
  if (recommendations.length === 0) {
    recommendations.push('PDF appears intact - highlighting issue may be viewer-related');
    recommendations.push('Try opening the PDF in different browsers or PDF readers');
  }
  
  return recommendations;
}