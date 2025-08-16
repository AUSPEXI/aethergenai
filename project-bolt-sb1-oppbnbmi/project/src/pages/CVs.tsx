import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Download, Cpu, FileText, ExternalLink } from 'lucide-react';
import { supabase, addCacheBuster } from '../lib/supabaseClient';

export default function CVs() {
  const [cvPdfUrl, setCvPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPdfUrl = async () => {
      try {
        setError(null);
        
        // Check if Supabase is properly configured
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        
        if (!supabaseUrl || !supabaseKey) {
          setError('Supabase configuration missing. Please check environment variables.');
          return;
        }

        console.log('Attempting to fetch CV PDF from Supabase...');

        // Try a simple query first to test connection
        const { data: testData, error: testError } = await supabase
          .from('pdf_documents')
          .select('count', { count: 'exact', head: true });

        if (testError) {
          console.error('Connection test failed:', testError);
          setError(`Connection failed: ${testError.message}`);
          return;
        }

        console.log('Connection test successful, fetching CV data...');

        // Now fetch the actual CV data
        const { data, error } = await supabase
          .from('pdf_documents')
          .select('file_url, title, document_type, updated_at')
          .eq('document_type', 'ai-cv')
          .eq('is_active', true)
          .limit(1);

        if (error) {
          console.error('Error fetching CV PDF URL:', error);
          setError(`Database error: ${error.message}`);
        } else if (data && data.length > 0) {
          console.log('CV data found:', data[0]);
          // Add cache buster to force fresh downloads
          setCvPdfUrl(addCacheBuster(data[0].file_url));
        } else {
          console.log('No CV data found');
          setError('No AI Specialist CV found in the database');
          
          // Log all available documents for debugging
          const { data: allDocs } = await supabase
            .from('pdf_documents')
            .select('title, document_type, is_active');
          console.log('All available documents:', allDocs);
        }
      } catch (error) {
        console.error('Error fetching CV PDF:', error);
        if (error instanceof Error) {
          if (error.message.includes('fetch')) {
            setError('Unable to connect to Supabase. Please check your internet connection and Supabase configuration.');
          } else {
            setError(`Connection error: ${error.message}`);
          }
        } else {
          setError('Failed to connect to database. Please check your Supabase configuration.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPdfUrl();
  }, []);

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!cvPdfUrl) {
      alert('PDF is still loading, please try again in a moment.');
      return;
    }

    console.log('Downloading CV from:', cvPdfUrl);

    // Create a temporary anchor element for download without affecting navigation
    const link = document.createElement('a');
    link.href = cvPdfUrl;
    link.download = 'Gwylym_Pryce-Owen_AI_CV.pdf';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    
    // Add cache-busting headers
    link.setAttribute('data-cache-bust', Date.now().toString());
    
    // Temporarily add to DOM, trigger download, then remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Don't modify browser history or navigation state
    return false;
  };

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Specialist CV
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Specialized CV focused on AI expertise, machine learning architectures, and synthetic data solutions. 
            Tailored for AI leadership roles and cutting-edge technology positions.
          </p>
        </div>

        {/* Debug Info (only show in development) */}
        {import.meta.env.DEV && (
          <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Debug Information</h3>
            <div className="text-xs text-blue-700 space-y-1">
              <p>Supabase URL: {import.meta.env.VITE_SUPABASE_URL ? '✅ Set' : '❌ Missing'}</p>
              <p>Supabase Key: {import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}</p>
              <p>Loading: {loading ? 'Yes' : 'No'}</p>
              <p>Error: {error || 'None'}</p>
              <p>PDF URL: {cvPdfUrl ? '✅ Found' : '❌ Not found'}</p>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Unable to load CV
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                  {error.includes('configuration') && (
                    <div className="mt-4 p-4 bg-red-100 rounded-md">
                      <p className="font-medium mb-2">To fix this issue:</p>
                      <div className="text-xs space-y-1">
                        <p><strong>For local development:</strong></p>
                        <p>1. Create a <code className="bg-red-200 px-1 rounded">.env</code> file in your project root</p>
                        <p>2. Add these lines:</p>
                        <code className="block bg-red-200 p-2 rounded mt-1">
                          VITE_SUPABASE_URL=https://jzxhcbhhivsywizbfewe.supabase.co<br/>
                          VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
                        </code>
                        <p className="mt-2"><strong>For Netlify deployment:</strong></p>
                        <p>Add the same variables in Site settings → Environment variables</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CV Content */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* CV Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">AI & Data Science Focus</h2>
                <p className="text-blue-100">Specialized for AI, ML, and data roles</p>
              </div>
              {loading ? (
                <div className="mt-4 sm:mt-0 inline-flex items-center px-6 py-3 bg-white/20 text-white font-semibold rounded-lg">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Loading...
                </div>
              ) : error ? (
                <div className="mt-4 sm:mt-0 inline-flex items-center px-6 py-3 bg-red-500/20 text-white font-semibold rounded-lg cursor-not-allowed">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  Unavailable
                </div>
              ) : (
                <button
                  onClick={handleDownload}
                  className={`mt-4 sm:mt-0 inline-flex items-center px-6 py-3 font-semibold rounded-lg transition-colors ${
                    cvPdfUrl 
                      ? 'bg-white text-blue-600 hover:bg-blue-50' 
                      : 'bg-white/50 text-blue-300 cursor-not-allowed'
                  }`}
                  disabled={!cvPdfUrl}
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download PDF {cvPdfUrl ? '(Latest)' : ''}
                </button>
              )}
            </div>
          </div>

          {/* CV Preview */}
          <div className="p-8">
            <div className="bg-gray-50 rounded-lg p-8 mb-8 border-2 border-dashed border-gray-300">
              <div className="text-center">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  AI Specialist CV Content Preview
                </h3>
                <p className="text-gray-600 mb-6">
                  Focused on machine learning, neural networks, and synthetic data expertise
                </p>
                <div className="bg-white rounded-lg p-6 text-left max-w-2xl mx-auto shadow-sm">
                  <div className="text-sm text-gray-600 space-y-2">
                    <p><strong>AI Expertise:</strong> Neural networks, deep learning, synthetic data generation...</p>
                    <p><strong>Technical Skills:</strong> Python, TensorFlow, PyTorch, Kubernetes, AWS...</p>
                    <p><strong>Project Impact:</strong> Auspexi SDSP (1M records/day), Authentes 2.0 neural validation...</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Differentiators */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Strengths</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Advanced machine learning architectures</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Synthetic data at scale (1M+ records/day)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Self-validating neural network systems</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Chaos theory applications in AI</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Target Roles</h3>
                <div className="space-y-3">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="font-medium text-blue-900">AI Solution Architect</p>
                    <p className="text-sm text-blue-700">End-to-end AI system design</p>
                  </div>
                  <div className="bg-teal-50 rounded-lg p-3">
                    <p className="font-medium text-teal-900">Principal Data Scientist</p>
                    <p className="text-sm text-teal-700">Advanced ML and research</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <p className="font-medium text-purple-900">Head of AI Innovation</p>
                    <p className="text-sm text-purple-700">Cutting-edge AI development</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Want to see these skills in action? Explore detailed project case studies and creative works.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/projects"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Projects
              <ExternalLink className="h-4 w-4 ml-2" />
            </Link>
            <Link
              to="/creative"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Creative Works
              <ExternalLink className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}