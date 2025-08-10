import React, { useEffect, useState } from 'react';
import Layout from './components/Layout/Layout';
import SchemaDesigner from './components/SchemaDesigner/SchemaDesigner';
import SeedDataUploader from './components/SeedDataUploader/SeedDataUploader';
import SyntheticDataGenerator from './components/SyntheticDataGenerator/SyntheticDataGenerator';
import AdvancedBenchmarking from './components/AdvancedBenchmarking/AdvancedBenchmarking';
import ReportingDashboard from './components/ReportingDashboard/ReportingDashboard';
import PrivacyMetrics from './components/PrivacyMetrics/PrivacyMetrics';
import { DataSchema, SchemaField, ValidationResult, SyntheticDataResult } from './types/schema';
import './index.css';

function App() {
  const [currentSchema, setCurrentSchema] = useState<DataSchema | null>(null);
  const [seedData, setSeedData] = useState<any[]>([]);
  const [detectedSchema, setDetectedSchema] = useState<SchemaField[]>([]);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [generationResult, setGenerationResult] = useState<SyntheticDataResult | null>(null);
  const [totalGeneratedLastRun, setTotalGeneratedLastRun] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'upload' | 'design' | 'generate' | 'advanced' | 'privacy-metrics' | 'reporting'>('upload');
  // Add privacy settings to app state
  const [privacySettings, setPrivacySettings] = useState({
    syntheticRatio: 95,
    epsilon: 0.1
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

  const workflowSteps = [
    { key: 'upload', label: '1. Upload Data' },
    { key: 'design', label: '2. Schema Design' },
    { key: 'generate', label: '3. Generate Synthetic Data' },
    { key: 'advanced', label: '4. Benchmarks' },
    { key: 'privacy-metrics', label: '5. Privacy Metrics' },
    { key: 'reporting', label: '6. Reporting' },
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
      default:
        return false;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Tabs */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-6">
            <nav className="flex space-x-8 overflow-x-auto">
              <button
                onClick={() => setActiveTab('upload')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'upload'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                📤 Upload Data
              </button>
              <button
                onClick={() => setActiveTab('design')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'design'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                📋 Schema Design
              </button>
              <button
                onClick={() => setActiveTab('generate')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'generate'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                ⚙️ Generate Synthetic Data
              </button>
              <button
                onClick={() => setActiveTab('advanced')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'advanced'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                📈 Benchmarks
              </button>
              <button
                onClick={() => setActiveTab('privacy-metrics')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'privacy-metrics'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                🔒 Privacy Metrics
              </button>
              <button
                onClick={() => setActiveTab('reporting')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'reporting'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                📊 Reporting
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="py-8">
            {/* Workflow Wizard */}
            <div className="workflow-wizard" style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', alignItems: 'center', justifyContent: 'center' }}>
              {workflowSteps.map((step, idx) => {
                const complete = isStepComplete(step.key);
                const active = activeTab === step.key;
                return (
                  <div key={step.key} style={{ display: 'flex', alignItems: 'center' }}>
                    <button
                      disabled={idx > 0 && !isStepComplete(workflowSteps[idx - 1].key)}
                      onClick={() => setActiveTab(step.key as any)}
                      style={{
                        background: active ? '#2563eb' : complete ? '#22c55e' : '#e5e7eb',
                        color: active || complete ? '#fff' : '#374151',
                        border: 'none',
                        borderRadius: '999px',
                        padding: '0.5rem 1.25rem',
                        fontWeight: 600,
                        fontSize: '1rem',
                        cursor: idx > 0 && !isStepComplete(workflowSteps[idx - 1].key) ? 'not-allowed' : 'pointer',
                        opacity: idx > 0 && !isStepComplete(workflowSteps[idx - 1].key) ? 0.5 : 1,
                        boxShadow: active ? '0 0 0 2px #2563eb33' : undefined,
                        transition: 'all 0.2s',
                      }}
                    >
                      {step.label}
                    </button>
                    {idx < workflowSteps.length - 1 && (
                      <span style={{ margin: '0 0.5rem', color: '#a1a1aa', fontSize: '1.5rem' }}>→</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Main Content */}
            <div className="py-8">
          {activeTab === 'design' && (
            <SchemaDesigner
              onSchemaChange={handleSchemaChange}
              initialSchema={currentSchema}
              seedData={seedData}
            />
          )}
          
          {activeTab === 'upload' && (
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
          )}
          
          {activeTab === 'generate' && (
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
          )}
          
          {activeTab === 'advanced' && (
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
          )}

          {activeTab === 'reporting' && (
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
          )}

          {activeTab === 'privacy-metrics' && (
            <PrivacyMetrics
              seedData={seedData}
              syntheticData={generationResult?.records || []}
              privacySettings={privacySettings}
              onPrivacySettingsChange={handlePrivacySettingsChange}
            />
          )}
            </div>
        </div>

        {/* Enhanced Status Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
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
      </div>
    </Layout>
  );
}

export default App;