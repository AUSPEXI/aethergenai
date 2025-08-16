import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, FileText, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { 
  verifyPDFIntegrity, 
  checkPDFForHighlighting, 
  generatePDFFixRecommendations,
  type PDFIntegrityCheck 
} from '../lib/pdfUtils';

interface PDFDiagnosticsProps {
  documentTitle: string;
  fileUrl: string;
  onRecommendations?: (recommendations: string[]) => void;
}

export default function PDFDiagnostics({ 
  documentTitle, 
  fileUrl, 
  onRecommendations 
}: PDFDiagnosticsProps) {
  const [isChecking, setIsChecking] = useState(false);
  const [diagnostics, setDiagnostics] = useState<{
    integrity: Awaited<ReturnType<typeof verifyPDFIntegrity>> | null;
    highlighting: Awaited<ReturnType<typeof checkPDFForHighlighting>> | null;
    recommendations: string[];
  }>({
    integrity: null,
    highlighting: null,
    recommendations: []
  });

  const runDiagnostics = async () => {
    setIsChecking(true);
    
    try {
      // Run integrity and highlighting checks
      const [integrityResult, highlightingResult] = await Promise.all([
        verifyPDFIntegrity(fileUrl),
        checkPDFForHighlighting(fileUrl)
      ]);

      // Generate recommendations
      const recommendations = generatePDFFixRecommendations(
        integrityResult, 
        highlightingResult
      );

      setDiagnostics({
        integrity: integrityResult,
        highlighting: highlightingResult,
        recommendations
      });

      // Pass recommendations to parent component
      onRecommendations?.(recommendations);

    } catch (error) {
      console.error('PDF diagnostics failed:', error);
      setDiagnostics({
        integrity: { isValid: false, issues: ['Diagnostics failed'] },
        highlighting: { hasHighlights: false, annotationCount: 0, details: ['Check failed'] },
        recommendations: ['Unable to run diagnostics - please check file manually']
      });
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    if (fileUrl) {
      runDiagnostics();
    }
  }, [fileUrl]);

  if (!import.meta.env.DEV) {
    return null; // Only show in development
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <FileText className="h-5 w-5 text-yellow-600 mr-2" />
          <h3 className="text-sm font-medium text-yellow-800">
            PDF Diagnostics: {documentTitle}
          </h3>
        </div>
        <button
          onClick={runDiagnostics}
          disabled={isChecking}
          className="inline-flex items-center px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 disabled:opacity-50"
        >
          <RefreshCw className={`h-3 w-3 mr-1 ${isChecking ? 'animate-spin' : ''}`} />
          {isChecking ? 'Checking...' : 'Recheck'}
        </button>
      </div>

      {diagnostics.integrity && (
        <div className="space-y-3">
          {/* Integrity Check */}
          <div className="flex items-start">
            {diagnostics.integrity.isValid ? (
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
            )}
            <div className="text-xs">
              <p className="font-medium text-gray-800">
                File Integrity: {diagnostics.integrity.isValid ? 'Valid' : 'Issues Found'}
              </p>
              {diagnostics.integrity.issues.length > 0 && (
                <ul className="text-gray-600 mt-1 space-y-1">
                  {diagnostics.integrity.issues.map((issue, index) => (
                    <li key={index}>• {issue}</li>
                  ))}
                </ul>
              )}
              {diagnostics.integrity.actualSize && (
                <p className="text-gray-600 mt-1">
                  File size: {(diagnostics.integrity.actualSize / 1024).toFixed(1)} KB
                </p>
              )}
            </div>
          </div>

          {/* Highlighting Check */}
          <div className="flex items-start">
            {diagnostics.highlighting?.hasHighlights ? (
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
            )}
            <div className="text-xs">
              <p className="font-medium text-gray-800">
                Highlighting: {diagnostics.highlighting?.hasHighlights ? 'Detected' : 'Not Found'}
              </p>
              {diagnostics.highlighting?.details && (
                <ul className="text-gray-600 mt-1 space-y-1">
                  {diagnostics.highlighting.details.map((detail, index) => (
                    <li key={index}>• {detail}</li>
                  ))}
                </ul>
              )}
              {diagnostics.highlighting?.annotationCount && diagnostics.highlighting.annotationCount > 0 && (
                <p className="text-gray-600 mt-1">
                  Annotation markers found: {diagnostics.highlighting.annotationCount}
                </p>
              )}
            </div>
          </div>

          {/* Recommendations */}
          {diagnostics.recommendations.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded p-3 mt-4">
              <p className="text-xs font-medium text-blue-800 mb-2">Recommendations:</p>
              <ul className="text-xs text-blue-700 space-y-1">
                {diagnostics.recommendations.map((rec, index) => (
                  <li key={index}>• {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}