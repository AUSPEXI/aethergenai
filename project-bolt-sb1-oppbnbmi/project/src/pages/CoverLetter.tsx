import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Download, FileText, ExternalLink, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { supabase, addCacheBuster } from '../lib/supabaseClient';

export default function CoverLetter() {
  const [coverLetterPdfUrl, setCoverLetterPdfUrl] = useState<string | null>(null);
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

        console.log('Attempting to fetch Cover Letter PDF from Supabase...');

        // Try a simple query first to test connection
        const { data: testData, error: testError } = await supabase
          .from('pdf_documents')
          .select('count', { count: 'exact', head: true });

        if (testError) {
          console.error('Connection test failed:', testError);
          setError(`Connection failed: ${testError.message}`);
          return;
        }

        console.log('Connection test successful, fetching cover letter data...');

        // Now fetch the actual cover letter data
        const { data, error } = await supabase
          .from('pdf_documents')
          .select('file_url, title, document_type, updated_at')
          .eq('document_type', 'cover-letter')
          .eq('is_active', true)
          .limit(1);

        if (error) {
          console.error('Error fetching Cover Letter PDF URL:', error);
          setError(`Database error: ${error.message}`);
        } else if (data && data.length > 0) {
          console.log('Cover Letter data found:', data[0]);
          // Add cache buster to force fresh downloads
          setCoverLetterPdfUrl(addCacheBuster(data[0].file_url));
        } else {
          console.log('No Cover Letter data found');
          setError('No Cover Letter found in the database');
          
          // Log all available documents for debugging
          const { data: allDocs } = await supabase
            .from('pdf_documents')
            .select('title, document_type, is_active');
          console.log('All available documents:', allDocs);
        }
      } catch (error) {
        console.error('Error fetching Cover Letter PDF:', error);
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
    
    if (!coverLetterPdfUrl) {
      alert('PDF is still loading, please try again in a moment.');
      return;
    }

    console.log('Downloading Cover Letter from:', coverLetterPdfUrl);

    // Create a temporary anchor element for download without affecting navigation
    const link = document.createElement('a');
    link.href = coverLetterPdfUrl;
    link.download = 'Gwylym_Pryce-Owen_Cover_Letter.pdf';
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
            Cover Letter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A personalized introduction highlighting my passion for AI innovation and how my unique background 
            can contribute to your organization's success.
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
              <p>PDF URL: {coverLetterPdfUrl ? '✅ Found' : '❌ Not found'}</p>
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
                  Unable to load Cover Letter
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

        {/* Cover Letter Content */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Professional Introduction</h2>
                <p className="text-emerald-100">Tailored for your specific opportunity</p>
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
                    coverLetterPdfUrl 
                      ? 'bg-white text-emerald-600 hover:bg-emerald-50' 
                      : 'bg-white/50 text-emerald-300 cursor-not-allowed'
                  }`}
                  disabled={!coverLetterPdfUrl}
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download PDF {coverLetterPdfUrl ? '(Latest)' : ''}
                </button>
              )}
            </div>
          </div>

          {/* Letter Preview */}
          <div className="p-8">
            {/* Contact Header */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Gwylym Pryce-Owen</h3>
                <p className="text-lg text-gray-600 mb-4">AI Specialist & Innovation Leader</p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    gwylym@auspexi.com
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-1" />
                    +44 7123 456789
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    London, UK
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-1" />
                    auspexi.com
                  </div>
                </div>
              </div>
            </div>

            {/* Letter Content */}
            <div className="prose prose-lg max-w-none">
              <div className="mb-6">
                <p className="text-gray-600 mb-4">Dear Hiring Manager,</p>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  I am writing to express my strong interest in joining your organization as an AI specialist. 
                  With a unique background spanning chaos theory, synthetic data generation, and cutting-edge 
                  neural network architectures, I bring a distinctive perspective to AI innovation that could 
                  significantly benefit your team.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4">
                  My journey began with a PhD in Chaos Theory from Cambridge, where I developed novel approaches 
                  to understanding complex systems. This foundation has proven invaluable in my AI work, 
                  particularly in creating the Auspexi Synthetic Data Solutions Platform (SDSP), which now 
                  processes over 1 million records daily across 8 specialized finance suites.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4">
                  What sets me apart is my ability to bridge theoretical mathematics with practical AI applications. 
                  For instance, I developed Authentes 2.0, a self-validating neural network system inspired by 
                  Kantian philosophy and synaesthetic perception. This system doesn't just generate synthetic data—it 
                  validates its own outputs using principles of synthetic cognition, ensuring unprecedented accuracy 
                  and reliability.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4">
                  My technical expertise spans the full AI stack: from low-level neural network architectures 
                  (implementing custom attention mechanisms and novel activation functions) to high-level system 
                  design (Kubernetes orchestration, real-time data pipelines, and scalable ML infrastructure). 
                  I'm equally comfortable discussing the philosophical implications of artificial consciousness 
                  as I am optimizing GPU memory allocation for transformer models.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4">
                  Beyond technical skills, I bring a creative perspective that has led to breakthrough innovations. 
                  My work on chaos-inspired neural networks has opened new avenues for handling non-linear data 
                  patterns, while my synaesthetic approach to AI has resulted in models that can perceive 
                  cross-modal relationships in ways traditional architectures cannot.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4">
                  I am particularly excited about the opportunity to contribute to your organization because 
                  [specific reason related to the company/role]. Your commitment to [company value/mission] 
                  aligns perfectly with my passion for using AI to solve meaningful problems while maintaining 
                  ethical standards and transparency.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4">
                  I would welcome the opportunity to discuss how my unique background in chaos theory, 
                  philosophy, and cutting-edge AI can contribute to your team's success. Thank you for 
                  considering my application.
                </p>

                <p className="text-gray-700 leading-relaxed">
                  Sincerely,<br/>
                  <span className="font-semibold">Gwylym Pryce-Owen</span>
                </p>
              </div>
            </div>

            {/* Key Highlights */}
            <div className="mt-8 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4">Key Highlights</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-emerald-800 mb-2">Technical Innovation</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Auspexi SDSP: 1M+ records/day processing</li>
                    <li>• Authentes 2.0: Self-validating neural networks</li>
                    <li>• 20+ AI models across 8 finance suites</li>
                    <li>• Custom attention mechanisms &amp; architectures</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-teal-800 mb-2">Unique Perspective</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• PhD in Chaos Theory from Cambridge</li>
                    <li>• Philosophy-inspired AI architectures</li>
                    <li>• Synaesthetic approach to machine learning</li>
                    <li>• Cross-disciplinary problem solving</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Customization Note */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-blue-800">Customization Available</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    This cover letter can be tailored for specific roles and organizations. 
                    The downloadable PDF version includes company-specific customizations and 
                    role-relevant highlights.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Interested in learning more? Explore my technical projects and creative works.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/cvs"
              className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
            >
              View CV
              <ExternalLink className="h-4 w-4 ml-2" />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Technical Projects
              <ExternalLink className="h-4 w-4 ml-2" />
            </Link>
            <Link
              to="/creative"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Creative Portfolio
              <ExternalLink className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}