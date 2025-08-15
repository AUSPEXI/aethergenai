import React, { useEffect, useState } from 'react';
import Layout from './components/Layout/Layout';
import SchemaDesigner from './components/SchemaDesigner/SchemaDesigner';
import SeedDataUploader from './components/SeedDataUploader/SeedDataUploader';
import SyntheticDataGenerator from './components/SyntheticDataGenerator/SyntheticDataGenerator';
import AdvancedBenchmarking from './components/AdvancedBenchmarking/AdvancedBenchmarking';
import ReportingDashboard from './components/ReportingDashboard/ReportingDashboard';
import PrivacyMetrics from './components/PrivacyMetrics/PrivacyMetrics';
import ResourcesHub from './components/Resources/ResourcesHub';
import PricingPage from './components/Marketing/PricingPage';
import AuthPage from './components/Auth/AuthPage';
import LandingPage from './components/Marketing/LandingPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import NotFound from './pages/NotFound';
import ModelLab from './components/ModelLab/ModelLab';
import PressSection from './components/PressSection/PressSection';
import { assertSupabase } from './services/supabaseClient';
import { getEntitlements, hasPlatformAccess, Entitlement } from './services/entitlementsClient';
import { DataSchema, SchemaField, ValidationResult, SyntheticDataResult } from './types/schema';
import './index.css';

// Debug environment variables
console.log('🔍 Full Debug:', {
  env: import.meta.env,
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET',
  mode: import.meta.env.MODE,
  dev: import.meta.env.DEV
});

function App() {
  const [currentSchema, setCurrentSchema] = useState<DataSchema | null>(null);
  const [seedData, setSeedData] = useState<any[]>([]);
  const [detectedSchema, setDetectedSchema] = useState<SchemaField[]>([]);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [generationResult, setGenerationResult] = useState<SyntheticDataResult | null>(null);
  const [totalGeneratedLastRun, setTotalGeneratedLastRun] = useState<number>(0);
  type RouteTab = 'home' | 'upload' | 'design' | 'generate' | 'advanced' | 'privacy-metrics' | 'reporting' | 'resources' | 'pricing' | 'account' | 'privacy' | 'terms' | 'modellab' | 'press';
  const [activeTab, setActiveTab] = useState<RouteTab>('home');
  // Add privacy settings to app state
  const [privacySettings, setPrivacySettings] = useState({
    syntheticRatio: 95,
    epsilon: 0.1
  });

  // Auth + entitlements for paywall
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [ents, setEnts] = useState<Entitlement[] | null>(null);
  const devhubPrice = (import.meta as any).env.VITE_PRICE_DEVHUB as string | undefined;
  const devhubProPrice = (import.meta as any).env.VITE_PRICE_DEVHUB_PRO as string | undefined;
  const canAccessPlatform = !!(ents && hasPlatformAccess(ents, [devhubPrice || '', devhubProPrice || '']));
  
  // Debug logging
  console.log('🔍 Platform Access Debug:', {
    userEmail,
    ents,
    devhubPrice,
    devhubProPrice,
    canAccessPlatform,
    hasPlatformAccess: ents ? hasPlatformAccess(ents, [devhubPrice || '', devhubProPrice || '']) : false
  });

  // Debug activeTab
  console.log('🔍 Active Tab Debug:', {
    activeTab,
    isAccountTab: activeTab === 'account',
    canAccessPlatform
  });

  const handleSchemaChange = (schema: DataSchema) => {
    setCurrentSchema(schema);
  };

  const handleDataUploaded = (data: any[], detected: SchemaField[]) => {
    setSeedData(data);
    setDetectedSchema(detected);

    // Update currentSchema to include detected fields
    setCurrentSchema(prev =>
      prev
        ? { ...prev, fields: detected }
        : {
            id: '',
            name: '',
            description: '',
            domain: '',
            fields: detected,
            targetVolume: 1000,
            privacySettings: {
              differentialPrivacy: true,
              epsilon: privacySettings.epsilon,
              syntheticRatio: privacySettings.syntheticRatio
            }
          }
    );
  };

  const handleValidationComplete = (result: ValidationResult) => {
    setValidationResult(result);
  };

  const handleGenerationComplete = (result: SyntheticDataResult) => {
    setGenerationResult(result);
  };

  // Handler to update privacy settings and regenerate synthetic data
  const handlePrivacySettingsChange = (newSettings: { syntheticRatio: number; epsilon: number }) => {
    setPrivacySettings(newSettings);
    // Regenerate synthetic data with new settings
    if (currentSchema && seedData.length > 0) {
      const updatedSchema = {
        ...currentSchema,
        privacySettings: {
          ...currentSchema.privacySettings,
          syntheticRatio: newSettings.syntheticRatio,
          epsilon: newSettings.epsilon
        }
      };
      setCurrentSchema(updatedSchema);
      setActiveTab('generate'); // Go to generate tab to trigger regeneration
    }
  };

  // Listen for privacy updates from other components (e.g., recipe UI, Autopilot)
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { epsilon?: number; synthetic_ratio?: number; iqr_k?: number };
      if (!detail) return;
      const next = {
        syntheticRatio: detail.synthetic_ratio ?? privacySettings.syntheticRatio,
        epsilon: detail.epsilon ?? privacySettings.epsilon,
      };
      handlePrivacySettingsChange(next);
      if (detail.iqr_k !== undefined) {
        try { localStorage.setItem('aeg_cleaning_iqrk', String(detail.iqr_k)); } catch {}
      }
    };
    window.addEventListener('aethergen:apply-privacy', handler as EventListener);
    const genHandler = (e: Event) => {
      const d = (e as CustomEvent).detail as { total?: number };
      if (d?.total) setTotalGeneratedLastRun(d.total);
    };
    window.addEventListener('aethergen:gen-total', genHandler as EventListener);
    return () => window.removeEventListener('aethergen:apply-privacy', handler as EventListener);
  }, [privacySettings, currentSchema, seedData]);

  // Get current user and entitlements
  useEffect(() => {
    (async () => {
      try {
        const sb = assertSupabase();
        const { data: { user } } = await sb.auth.getUser();
        const email = user?.email || null;
        setUserEmail(email);
        if (email) {
          const e = await getEntitlements({ email });
          setEnts(e);
        } else {
          setEnts([]);
        }
      } catch {
        setEnts([]);
      }
    })();
  }, []);

  // Listen for auth state changes and redirect to platform
  useEffect(() => {
    const sb = assertSupabase();
    const { data: { subscription } } = sb.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUserEmail(session.user.email);
        try {
          const e = await getEntitlements({ email: session.user.email });
          setEnts(e);
          // Redirect to platform dashboard after successful login
          if (e && e.length > 0) {
            setActiveTab('upload');
          }
        } catch (err) {
          console.error('Failed to get entitlements after login:', err);
          setEnts([]);
        }
      } else if (event === 'SIGNED_OUT') {
        setUserEmail(null);
        setEnts([]);
        setActiveTab('home');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Hash routing helpers
  const tabToHash = (tab: RouteTab) => `#/${tab}`;
  const hashToTab = (hash: string): RouteTab => {
    const cleaned = (hash || '').replace(/^#\//, '');
    const allowed: RouteTab[] = ['home','upload','design','generate','advanced','privacy-metrics','reporting','resources','pricing','account','privacy','terms','modellab'];
    return (allowed.includes(cleaned as RouteTab) ? cleaned : 'home') as RouteTab;
  };

  // Listen for header navigation events and update hash
  useEffect(() => {
    const navHandler = (e: Event) => {
      const d = (e as CustomEvent).detail as { tab?: RouteTab };
      if (d?.tab) {
        if (tabToHash(d.tab) !== window.location.hash) {
          window.location.hash = tabToHash(d.tab);
        } else {
          setActiveTab(d.tab);
        }
      }
    };
    window.addEventListener('aeg:navigate', navHandler as EventListener);
    return () => window.removeEventListener('aeg:navigate', navHandler as EventListener);
  }, []);

  // Initialise from hash and handle back/forward
  useEffect(() => {
    const applyHash = () => setActiveTab(hashToTab(window.location.hash));
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  const workflowSteps: Array<{ key: typeof activeTab; label: string }> = [
    { key: 'upload', label: '1. Upload Data' },
    { key: 'design', label: '2. Schema Design' },
    { key: 'generate', label: '3. Generate Synthetic Data' },
    { key: 'advanced', label: '4. Benchmarks' },
    { key: 'privacy-metrics', label: '5. Privacy Metrics' },
    { key: 'reporting', label: '6. Reporting' },
    { key: 'modellab', label: '7. Model Lab' },
  ];

  const getStepIndex = (key: string) => workflowSteps.findIndex(step => step.key === key);
  const isStepComplete = (key: string) => {
    switch (key) {
      case 'upload':
        return seedData.length > 0;
      case 'generate':
        return generationResult && generationResult.records && generationResult.records.length > 0;
      case 'advanced':
        return true; // Assume always accessible after generation
      case 'privacy-metrics':
        return true; // Accessible after generation
      case 'reporting':
        return true; // Accessible after privacy
      case 'modellab':
        return true; // Accessible after privacy metrics and reporting
      default:
        return false;
    }
  };

  return (
    <Layout canAccessPlatform={canAccessPlatform}>
      <div className="min-h-screen">
        {/* Platform Subheader (paywalled) - Only on Platform Tabs */}
        {canAccessPlatform && activeTab !== 'home' && !['resources', 'pricing', 'account', 'privacy', 'terms'].includes(activeTab) && (
          <div className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-6">
              <nav className="flex space-x-8 overflow-x-auto">
                <button onClick={() => setActiveTab('upload')} className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'upload' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>📤 Upload Data</button>
                <button onClick={() => setActiveTab('design')} className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'design' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>📋 Schema Design</button>
                <button onClick={() => setActiveTab('generate')} className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'generate' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>⚙️ Generate Synthetic Data</button>
                <button onClick={() => setActiveTab('advanced')} className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'advanced' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>📈 Benchmarks</button>
                <button onClick={() => setActiveTab('privacy-metrics')} className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'privacy-metrics' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>🔒 Privacy Metrics</button>
                <button onClick={() => setActiveTab('reporting')} className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'reporting' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>📊 Reporting</button>
                <button onClick={() => setActiveTab('modellab')} className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'modellab' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>🧠 Model Lab</button>
              </nav>
            </div>
          </div>
        )}

        {/* Main Content - Home Tab Always Shows Sales Landing Page */}
        {activeTab === 'home' && (
          <div className="py-8">
            <LandingPage />
          </div>
        )}

        {/* Platform Components - White Background - Only for Platform Tabs */}
        {canAccessPlatform && activeTab === 'design' && (
          <div className="bg-white min-h-screen pb-20">
            <div className="max-w-7xl mx-auto px-6 py-8">
              {/* Welcome Banner for Platform Tabs */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 mb-8">
                <div className="text-center py-6">
                  <h1 className="text-2xl font-bold text-blue-900 mb-2">Welcome to AethergenAI Platform</h1>
                  <p className="text-blue-700">You're now signed in and have access to the platform. Use the navigation above to get started.</p>
                </div>
              </div>
              <SchemaDesigner
                onSchemaChange={handleSchemaChange}
                initialSchema={currentSchema}
                seedData={seedData}
              />
            </div>
          </div>
        )}
        
        {canAccessPlatform && activeTab === 'upload' && (
          <div className="bg-white min-h-screen pb-20">
            <div className="max-w-7xl mx-auto px-6 py-8">
              {/* Welcome Banner for Platform Tabs */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 mb-8">
                <div className="text-center py-6">
                  <h1 className="text-2xl font-bold text-blue-900 mb-2">Welcome to AethergenAI Platform</h1>
                  <p className="text-blue-700">You're now signed in and have access to the platform. Use the navigation above to get started.</p>
                </div>
              </div>
              <SeedDataUploader
                schema={currentSchema || {
                  id: '',
                  name: '',
                  description: '',
                  domain: '',
                  fields: [],
                  targetVolume: 1000,
                  privacySettings: {
                    differentialPrivacy: true,
                    epsilon: 0.1,
                    syntheticRatio: 95
                  }
                }}
                onDataUploaded={handleDataUploaded}
                onValidationComplete={handleValidationComplete}
              />
            </div>
          </div>
        )}
        
        {canAccessPlatform && activeTab === 'generate' && (
          <div className="bg-white min-h-screen pb-20">
            <div className="max-w-7xl mx-auto px-6 py-8">
              <SyntheticDataGenerator
                schema={{
                  ...(currentSchema || {
                    id: '',
                    name: '',
                    description: '',
                    domain: '',
                    fields: [],
                    targetVolume: 1000,
                    privacySettings: {
                      differentialPrivacy: true,
                      epsilon: privacySettings.epsilon,
                      syntheticRatio: privacySettings.syntheticRatio
                    }
                  }),
                  privacySettings: {
                    ...(currentSchema?.privacySettings || {}),
                    epsilon: privacySettings.epsilon,
                    syntheticRatio: privacySettings.syntheticRatio
                  }
                }}
                seedData={seedData}
                onGenerationComplete={handleGenerationComplete}
              />
            </div>
          </div>
        )}
        
        {canAccessPlatform && activeTab === 'advanced' && (
          <div className="bg-white min-h-screen pb-20">
            <div className="max-w-7xl mx-auto px-6 py-8">
              <AdvancedBenchmarking
                schema={currentSchema || {
                  id: '',
                  name: '',
                  description: '',
                  domain: '',
                  fields: [],
                  targetVolume: 1000,
                  privacySettings: {
                    differentialPrivacy: true,
                    epsilon: 0.1,
                    syntheticRatio: 95
                  }
                }}
                seedData={seedData}
                generatedData={generationResult?.records || []}
              />
            </div>
          </div>
        )}

        {canAccessPlatform && activeTab === 'reporting' && (
          <div className="bg-white min-h-screen pb-20">
            <div className="max-w-7xl mx-auto px-6 py-8">
              <ReportingDashboard
                schema={currentSchema || {
                  id: '',
                  name: '',
                  description: '',
                  domain: '',
                  fields: [],
                  targetVolume: 1000,
                  privacySettings: {
                    differentialPrivacy: true,
                    epsilon: 0.1,
                    syntheticRatio: 95
                  }
                }}
                seedData={seedData}
                generatedData={generationResult?.records || []}
                validationResult={validationResult}
              />
            </div>
          </div>
        )}

        {canAccessPlatform && activeTab === 'modellab' && (
          <div className="bg-white min-h-screen pb-20">
            <div className="max-w-7xl mx-auto px-6 py-8">
              <ModelLab />
            </div>
          </div>
        )}

        {activeTab === 'press' && (
          <div className="min-h-screen">
            <PressSection onContact={() => setActiveTab('account')} />
          </div>
        )}

        {canAccessPlatform && activeTab === 'privacy-metrics' && (
          <div className="bg-white min-h-screen pb-20">
            <div className="max-w-7xl mx-auto px-6 py-8">
              <PrivacyMetrics
                seedData={seedData}
                syntheticData={generationResult?.records || []}
                privacySettings={privacySettings}
                onPrivacySettingsChange={handlePrivacySettingsChange}
              />
            </div>
          </div>
        )}

        {/* Public Pages - Always Accessible */}
        {activeTab === 'resources' && (
          <div className="py-8">
            <ResourcesHub />
          </div>
        )}

        {activeTab === 'pricing' && (
          <div className="py-8">
            <div id="pricing"><PricingPage /></div>
          </div>
        )}

        {activeTab === 'account' && (
          <div className="py-8">
            <AuthPage />
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="py-8">
            <PrivacyPolicy />
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="py-8">
            <TermsOfService />
          </div>
        )}

        {/* Enhanced Status Bar (paywalled) - Only on Platform Tabs */}
        {canAccessPlatform && activeTab !== 'home' && !['resources', 'pricing', 'account', 'privacy', 'terms'].includes(activeTab) && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-0">
            <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-6">
                <span>Schema: {currentSchema?.name || 'Not defined'}</span>
                <span>Seed Data: {seedData.length} records</span>
                <span>
                  Generated: {totalGeneratedLastRun > 0 ? totalGeneratedLastRun.toLocaleString() : 0} records
                  {generationResult?.records?.length ? ` (live sample: ${generationResult.records.length})` : ''}
                </span>
                <span>Validation: {validationResult?.isValid ? '✅ Passed' : validationResult ? '❌ Failed' : '⏳ Pending'}</span>
                <span>Aethergen Analysis: 🔬 Active</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>Privacy Score: {generationResult?.metrics.privacyScore || 0}%</span>
                <span>Utility Score: {generationResult?.metrics.utilityScore || 0}%</span>
                <span>Speed: {generationResult?.metrics.recordsPerSecond || 0}/sec</span>
                <span>Models: 20+ AI Models</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default App;