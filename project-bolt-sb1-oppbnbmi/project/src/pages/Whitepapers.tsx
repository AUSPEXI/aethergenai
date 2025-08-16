import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, Download, Calendar, Target, Cpu, Shield, TrendingUp, Layers, ChevronRight, ExternalLink, Database } from 'lucide-react';
import { supabase, addCacheBuster } from '../lib/supabaseClient';
import PDFDiagnostics from '../components/PDFDiagnostics';

export default function Whitepapers() {
  const [selectedPaper, setSelectedPaper] = useState<string | null>(null);
  const [whitepaperUrls, setWhitepaperUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [diagnosticsRecommendations, setDiagnosticsRecommendations] = useState<Record<string, string[]>>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPdfUrls = async () => {
      try {
        const { data, error } = await supabase
          .from('pdf_documents')
          .select('title, file_url, updated_at')
          .eq('document_type', 'whitepaper')
          .eq('is_active', true);

        if (error) {
          console.error('Error fetching Whitepaper PDF URLs:', error);
        } else if (data) {
          console.log('Fetched whitepaper data:', data);
          const urlsMap: Record<string, string> = {};
          data.forEach(item => {
            // Add cache buster to force fresh downloads
            urlsMap[item.title] = addCacheBuster(item.file_url);
          });
          setWhitepaperUrls(urlsMap);
        }
      } catch (error) {
        console.error('Error fetching whitepaper PDFs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPdfUrls();
  }, []);

  const handleDownload = (title: string, filename: string, type: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!whitepaperUrls[title]) {
      alert(`${type} PDF is still loading, please try again in a moment.`);
      return;
    }

    console.log(`Downloading ${title} from:`, whitepaperUrls[title]);

    // Create a temporary anchor element for download without affecting navigation
    const link = document.createElement('a');
    link.href = whitepaperUrls[title];
    link.download = filename;
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

  const handleDiagnosticsRecommendations = (title: string) => (recommendations: string[]) => {
    setDiagnosticsRecommendations(prev => ({
      ...prev,
      [title]: recommendations
    }));
  };

  const activeWhitepapers = [
    {
      id: 'sdsp',
      title: 'Synthetic Data Sharing Platform (SDSP)',
      subtitle: 'Pioneering Synthetic Data for Compliance-Heavy Sectors',
      year: '2023',
      status: 'Published',
      category: 'Platform Architecture',
      description: 'Revolutionary 8-suite platform generating 1M records/day with 43%/57% real-synthetic split, achieving 10% real data reliance for MoD, NHS, and banking clients.',
      keyMetrics: [
        '1M records/day processing',
        '10% real data reliance',
        '8-suite modular architecture',
        '43%/57% Fibonacci-inspired split'
      ],
      technologies: ['TypeScript', 'Databricks', 'PyTorch', 'Supabase', 'GANs'],
      sectors: ['Government (MoD)', 'Healthcare (NHS)', 'Financial Services'],
      compliance: ['UK GDPR', 'ISO 27001', 'FCA Standards'],
      icon: Database,
      color: 'blue'
    },
    {
      id: 'authentes-1',
      title: 'Authentes 1.0 Whitepaper',
      subtitle: 'Neural Self-Validation for Synthetic Data',
      year: '2023',
      status: 'Published',
      category: 'AI Validation',
      description: 'Advanced neural self-validation system using 20 open-source AI models to reduce real data reliance from 10% to 7% while ensuring statistical realism.',
      keyMetrics: [
        '7% real data reliance',
        '20 AI validation models',
        '85% reduction in manual oversight',
        'KS test p > 0.05 compliance'
      ],
      technologies: ['PyTorch', 'Databricks', 'TypeScript', 'Supabase', 'Neural Networks'],
      sectors: ['Government (MoD)', 'Financial Risk Modeling', 'Data Security'],
      compliance: ['UK GDPR', 'ISO 27001', 'JSP 440'],
      icon: Shield,
      color: 'purple'
    }
  ];

  const upcomingWhitepapers = [
    {
      id: 'authentes-2',
      title: 'Authentes 2.0',
      subtitle: 'Enhanced Validation with Triad Loop',
      year: '2024',
      status: 'In Development',
      description: 'Enhanced validation system with integrity, realism, and compliance triad loop, reducing real data reliance to <5%.',
      keyFeatures: ['Triad validation loop', 'Less than 5% real data reliance', 'Pattern-based optimization'],
      icon: Target,
      color: 'green'
    },
    {
      id: 'pis',
      title: 'Polyhedral Intelligence System (PIS)',
      subtitle: 'Redefining Synthetic Data for a $2–3B Market',
      year: '2025',
      status: 'Research Phase',
      description: 'Revolutionary system integrating octonions, hypercubes, and Fibonacci scaling to achieve <3% real data reliance.',
      keyFeatures: ['Octonion embeddings', 'Hypercube architecture', 'Less than 3% real data reliance', '1.5M records/day'],
      icon: Layers,
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'from-blue-50 to-blue-100',
        icon: 'bg-blue-600',
        text: 'text-blue-600',
        border: 'border-blue-200'
      },
      purple: {
        bg: 'from-purple-50 to-purple-100',
        icon: 'bg-purple-600',
        text: 'text-purple-600',
        border: 'border-purple-200'
      },
      green: {
        bg: 'from-green-50 to-green-100',
        icon: 'bg-green-600',
        text: 'text-green-600',
        border: 'border-green-200'
      },
      orange: {
        bg: 'from-orange-50 to-orange-100',
        icon: 'bg-orange-600',
        text: 'text-orange-600',
        border: 'border-orange-200'
      }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Technical Whitepapers
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Comprehensive technical documentation of Auspexi's synthetic data innovations, 
            from the foundational SDSP platform to the revolutionary Polyhedral Intelligence System. 
            Each paper details the mathematical foundations, architectural decisions, and market implications 
            of our chaos-to-clarity transformation methodology.
          </p>
          
          {/* Evolution Timeline */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 max-w-4xl mx-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Auspexi's Innovation Timeline</h3>
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mb-2">
                  2023
                </div>
                <p className="text-sm font-medium">SDSP Launch</p>
                <p className="text-xs text-gray-600">10% real data</p>
              </div>
              <ChevronRight className="h-6 w-6 text-gray-400 rotate-90 md:rotate-0" />
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mb-2">
                  2023
                </div>
                <p className="text-sm font-medium">Authentes 1.0</p>
                <p className="text-xs text-gray-600">7% real data</p>
              </div>
              <ChevronRight className="h-6 w-6 text-gray-400 rotate-90 md:rotate-0" />
              <div className="text-center">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mb-2">
                  2024
                </div>
                <p className="text-sm font-medium">Authentes 2.0</p>
                <p className="text-xs text-gray-600">Less than 5% real data</p>
              </div>
              <ChevronRight className="h-6 w-6 text-gray-400 rotate-90 md:rotate-0" />
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold mb-2">
                  2025
                </div>
                <p className="text-sm font-medium">PIS</p>
                <p className="text-xs text-gray-600">Less than 3% real data</p>
              </div>
            </div>
          </div>
        </div>

        {/* Debug Info (only show in development) */}
        {import.meta.env.DEV && (
          <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-yellow-800 mb-2">Debug Information</h3>
            <div className="text-xs text-yellow-700 space-y-1">
              <p>Loading: {loading ? 'Yes' : 'No'}</p>
              <p>Whitepapers found: {Object.keys(whitepaperUrls).length}</p>
              {Object.entries(whitepaperUrls).map(([title, url]) => (
                <p key={title}>• {title}: {url ? '✅ Found' : '❌ Missing'}</p>
              ))}
            </div>
          </div>
        )}

        {/* PDF Diagnostics for each whitepaper */}
        {import.meta.env.DEV && Object.entries(whitepaperUrls).map(([title, url]) => (
          <PDFDiagnostics
            key={title}
            documentTitle={title}
            fileUrl={url}
            onRecommendations={handleDiagnosticsRecommendations(title)}
          />
        ))}

        {/* Active Whitepapers */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Published Whitepapers</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {activeWhitepapers.map((paper) => {
              const colors = getColorClasses(paper.color);
              const IconComponent = paper.icon;
              const hasIssues = diagnosticsRecommendations[paper.title]?.length > 0;
              
              return (
                <div
                  key={paper.id}
                  className={`bg-gradient-to-br ${colors.bg} rounded-xl p-8 border ${colors.border} hover:shadow-lg transition-all duration-300 ${hasIssues ? 'ring-2 ring-orange-300' : ''}`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 ${colors.icon} rounded-xl flex items-center justify-center`}>
                      <IconComponent className="h-7 w-7 text-white" />
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-medium text-gray-600 bg-white px-3 py-1 rounded-full">
                        {paper.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{paper.year}</p>
                      {hasIssues && (
                        <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full mt-1 block">
                          Issues Detected
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {paper.title}
                  </h3>
                  <p className="text-sm font-medium text-gray-700 mb-4">
                    {paper.subtitle}
                  </p>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed text-sm">
                    {paper.description}
                  </p>

                  {/* Key Metrics */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Achievements</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {paper.keyMetrics.map((metric, index) => (
                        <div key={index} className="flex items-center text-xs text-gray-600">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 flex-shrink-0"></div>
                          {metric}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Core Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {paper.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="text-xs bg-white text-gray-700 px-2 py-1 rounded-md border border-gray-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sectors & Compliance */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Target Sectors</h4>
                      <div className="space-y-1">
                        {paper.sectors.map((sector, index) => (
                          <p key={index} className="text-xs text-gray-600">• {sector}</p>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Compliance</h4>
                      <div className="space-y-1">
                        {paper.compliance.map((comp, index) => (
                          <p key={index} className="text-xs text-gray-600">• {comp}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Issues Warning */}
                  {hasIssues && (
                    <div className="mb-4 bg-orange-50 border border-orange-200 rounded p-3">
                      <p className="text-xs font-medium text-orange-800 mb-1">PDF Issues Detected:</p>
                      <ul className="text-xs text-orange-700 space-y-1">
                        {diagnosticsRecommendations[paper.title]?.slice(0, 2).map((rec, index) => (
                          <li key={index}>• {rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Single Download Action */}
                  <div className="pt-4 border-t border-white">
                    {loading ? (
                      <div className="w-full inline-flex items-center justify-center px-4 py-3 bg-white/50 text-gray-500 font-medium rounded-lg text-sm">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400 mr-2"></div>
                        Loading...
                      </div>
                    ) : (
                      <button
                        onClick={handleDownload(paper.title, `${paper.title.replace(/\s+/g, '_')}.pdf`, 'Download')}
                        className={`w-full inline-flex items-center justify-center px-4 py-3 font-medium rounded-lg transition-colors text-sm ${
                          whitepaperUrls[paper.title]
                            ? hasIssues 
                              ? 'bg-orange-600 text-white hover:bg-orange-700'
                              : 'bg-gray-900 text-white hover:bg-gray-800'
                            : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                        }`}
                        disabled={!whitepaperUrls[paper.title]}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF {whitepaperUrls[paper.title] ? hasIssues ? '(Issues Detected)' : '(Latest)' : '(Unavailable)'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Whitepapers */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Upcoming Releases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingWhitepapers.map((paper) => {
              const colors = getColorClasses(paper.color);
              const IconComponent = paper.icon;
              
              return (
                <div
                  key={paper.id}
                  className={`bg-gradient-to-br ${colors.bg} rounded-xl p-8 border ${colors.border} opacity-75 hover:opacity-100 transition-all duration-300`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 ${colors.icon} rounded-xl flex items-center justify-center`}>
                      <IconComponent className="h-7 w-7 text-white" />
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-medium text-gray-600 bg-white px-3 py-1 rounded-full">
                        {paper.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{paper.year}</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {paper.title}
                  </h3>
                  <p className="text-sm font-medium text-gray-700 mb-4">
                    {paper.subtitle}
                  </p>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed text-sm">
                    {paper.description}
                  </p>

                  {/* Key Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Features</h4>
                    <div className="space-y-2">
                      {paper.keyFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center text-xs text-gray-600">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 flex-shrink-0"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white">
                    <button className="w-full inline-flex items-center justify-center px-4 py-3 bg-white text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Notify When Available
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Market Context */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Targeting the $2–3B Synthetic Data Market
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Auspexi's iterative approach demonstrates consistent improvement in reducing real data dependency 
              while maintaining statistical validity and regulatory compliance across critical sectors.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Progressive Innovation</h3>
              <p className="text-gray-600 text-sm">
                Each system builds on the last: SDSP (10%) → Authentes 1.0 (7%) → Authentes 2.0 (less than 5%) → PIS (less than 3%)
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Compliance First</h3>
              <p className="text-gray-600 text-sm">
                UK GDPR, ISO 27001, FCA, and JSP 440 compliance ensures deployment across government, 
                healthcare, and financial sectors.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Cpu className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Mathematical Foundation</h3>
              <p className="text-gray-600 text-sm">
                Chaos theory, Fibonacci optimization, and octonion mathematics provide the theoretical 
                framework for breakthrough performance.
              </p>
            </div>
          </div>
        </div>

        {/* Contact for Partnerships */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Partner with Auspexi's Innovation Journey
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            From SDSP's foundational 8-suite architecture to PIS's revolutionary octonion embeddings, 
            Auspexi is transforming the synthetic data landscape. Join us in defining the future 
            of privacy-preserving data generation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hopiumcalculator@gmail.com"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              Explore Partnerships
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200 transform hover:-translate-y-1"
            >
              Technical Discussion
            </Link>
          </div>
          <p className="text-sm text-blue-200 mt-6">
            Contact: hopiumcalculator@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
}