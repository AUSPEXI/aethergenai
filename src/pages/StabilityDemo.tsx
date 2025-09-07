import React, { useState, useEffect } from 'react'
import {
  AlertTriangle, CheckCircle, Clock, TrendingUp, TrendingDown, Shield, 
  Activity, BarChart3, Settings, Play, Pause, RotateCcw, Eye, 
  Zap, Target, Gauge, AlertCircle, ArrowRight, RefreshCw, 
  Database, Brain, FileText, Package, Users, Lock
} from 'lucide-react'
import { sloManagementService, SLOConfig, SLOStatus, SLOBreach, ShadowEvaluation, DriftMetrics } from '../services/sloManagementService'
import BackButton from '../components/BackButton'

export const StabilityDemo: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState('healthcare-fraud-detector')
  const [sloStatus, setSloStatus] = useState<SLOStatus[]>([])
  const [breaches, setBreaches] = useState<SLOBreach[]>([])
  const [shadowEvaluations, setShadowEvaluations] = useState<ShadowEvaluation[]>([])
  const [driftMetrics, setDriftMetrics] = useState<DriftMetrics | null>(null)
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [selectedTimeWindow, setSelectedTimeWindow] = useState<'7d' | '14d' | '28d'>('7d')
  const [showSLOConfig, setShowSLOConfig] = useState(false)
  const [sloConfig, setSloConfig] = useState<SLOConfig>({
    utility: {
      operating_point: 'fpr=1%',
      min_threshold: 0.75,
      tolerance_band: 0.05,
      confidence_interval: [0.74, 0.76]
    },
    stability: {
      max_delta_across_segments: 0.03,
      segment_bands: { 'region': 0.02, 'product': 0.025, 'lifecycle': 0.03 },
      drift_threshold: 0.1
    },
    latency: {
      p95_ms: 120,
      p99_ms: 180,
      capacity_target: 1000
    },
    privacy: {
      probe_thresholds: {
        membership_advantage: 0.05,
        attribute_disclosure: 0.03,
        reid_risk: 0.02
      },
      dp_budgets: {
        epsilon: 0.8,
        delta: 1e-6
      }
    }
  })

  useEffect(() => {
    loadDemoData()
  }, [selectedModel])

  const loadDemoData = async () => {
    // Configure SLO for the selected model
    await sloManagementService.configureSLO(selectedModel, sloConfig)
    
    // Load current SLO status
    const status = await sloManagementService.getSLOStatus(selectedModel)
    setSloStatus(status)
    
    // Load breaches
    const modelBreaches = await sloManagementService.getBreaches(selectedModel)
    setBreaches(modelBreaches)
    
    // Load shadow evaluations
    const evaluations = await sloManagementService.getShadowEvaluations()
    setShadowEvaluations(evaluations)
    
    // Load drift metrics
    const drift = await sloManagementService.getDriftMetrics(selectedModel)
    setDriftMetrics(drift)
  }

  const startMonitoring = async () => {
    setIsMonitoring(true)
    console.log('🚀 Starting SLO monitoring for', selectedModel)
    
    // Seed initial healthy metrics to avoid alarming first impression
    const seedMetrics = {
      utility: 0.82 + Math.random() * 0.02,
      stability_delta: 0.01 + Math.random() * 0.005,
      p95_latency: 95 + Math.random() * 15,
      membership_advantage: 0.025 + Math.random() * 0.01
    }
    const seededStatus = await sloManagementService.evaluateSLO(selectedModel, seedMetrics)
    setSloStatus(seededStatus)
    const seededBreaches = await sloManagementService.getBreaches(selectedModel)
    setBreaches(seededBreaches)

    // Simulate continuous monitoring
    const interval = setInterval(async () => {
      const currentMetrics = {
        utility: 0.78 + Math.random() * 0.06,
        stability_delta: 0.01 + Math.random() * 0.01,
        p95_latency: 90 + Math.random() * 25,
        membership_advantage: 0.025 + Math.random() * 0.02
      }
      
      const status = await sloManagementService.evaluateSLO(selectedModel, currentMetrics)
      setSloStatus(status)
      
      // Update breaches
      const modelBreaches = await sloManagementService.getBreaches(selectedModel)
      setBreaches(modelBreaches)
    }, 5000)
    
    return () => clearInterval(interval)
  }

  const stopMonitoring = () => {
    setIsMonitoring(false)
    console.log('⏹️ Stopped SLO monitoring')
  }

  const startShadowEvaluation = async () => {
    const evaluation = await sloManagementService.startShadowEvaluation(
      `${selectedModel}-candidate-v2.1`,
      selectedModel
    )
    
    // Simulate evaluation results
    setTimeout(async () => {
      const metrics = {
        utility_delta: 0.02,
        stability_delta: 0.01,
        latency_delta: -0.05,
        privacy_delta: 0.01
      }
      
      await sloManagementService.updateShadowEvaluation(evaluation.evidence_bundle_id, metrics)
      const evaluations = await sloManagementService.getShadowEvaluations()
      setShadowEvaluations(evaluations)
    }, 3000)
  }

  const calculateDriftMetrics = async () => {
    const currentData = Array.from({ length: 1000 }, () => ({ value: Math.random() }))
    const baselineData = Array.from({ length: 1000 }, () => ({ value: Math.random() }))
    
    const drift = await sloManagementService.calculateDriftMetrics(selectedModel, currentData, baselineData)
    setDriftMetrics(drift)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'text-green-600 bg-green-100'
      case 'warning': return 'text-yellow-600 bg-yellow-100'
      case 'breach': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-blue-600 bg-blue-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'critical': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Stability & SLO Management Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Operating AI like a regulated system with fail-closed gates, automated rollback, and evidence-backed stability
          </p>
        </div>

        <div className="mb-4"><BackButton to="/features" label="Back to Demos" /></div>

        {/* Model Selection & Controls */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-md text-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Brain className="w-6 h-6 mr-2 text-blue-500" />
              Model Operations
            </h2>
            <div className="flex space-x-4">
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-700"
              >
                <option value="healthcare-fraud-detector">Healthcare Fraud Detector</option>
                <option value="financial-risk-model">Financial Risk Model</option>
                <option value="automotive-quality-control">Automotive Quality Control</option>
              </select>
              <button
                onClick={isMonitoring ? stopMonitoring : startMonitoring}
                className={`flex items-center px-4 py-2 rounded-lg font-medium ${
                  isMonitoring 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                {isMonitoring ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
              </button>
            </div>
          </div>
          
          {isMonitoring && (
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <Activity className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-green-700 font-medium">Real-time SLO monitoring active</span>
              </div>
            </div>
          )}
        </div>

        {/* SLO Configuration */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-md text-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Settings className="w-6 h-6 mr-2 text-blue-500" />
              SLO Configuration
            </h2>
            <button
              onClick={() => setShowSLOConfig(!showSLOConfig)}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              <Settings className="w-4 h-4 mr-2" />
              {showSLOConfig ? 'Hide' : 'Configure'}
            </button>
          </div>
          
          {showSLOConfig && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Utility SLO</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Operating Point:</span>
                    <span className="font-mono">{sloConfig.utility.operating_point}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Min Threshold:</span>
                    <span className="font-mono">{sloConfig.utility.min_threshold}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tolerance Band:</span>
                    <span className="font-mono">{sloConfig.utility.tolerance_band}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Stability SLO</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Max Delta:</span>
                    <span className="font-mono">{sloConfig.stability.max_delta_across_segments}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Drift Threshold:</span>
                    <span className="font-mono">{sloConfig.stability.drift_threshold}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Latency SLO</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>P95 (ms):</span>
                    <span className="font-mono">{sloConfig.latency.p95_ms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>P99 (ms):</span>
                    <span className="font-mono">{sloConfig.latency.p99_ms}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Privacy SLO</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Membership Advantage:</span>
                    <span className="font-mono">{sloConfig.privacy.probe_thresholds.membership_advantage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Attribute Disclosure:</span>
                    <span className="font-mono">{sloConfig.privacy.probe_thresholds.attribute_disclosure}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SLO Status Dashboard */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Gauge className="w-6 h-6 mr-2 text-blue-500" />
            SLO Status Dashboard
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sloStatus.map((status, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 capitalize">{status.slo_type}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status.status)}`}>
                    {status.status.toUpperCase()}
                  </span>
                </div>
                
                <div className="space-y-1 text-sm text-gray-800">
                  <div className="flex justify-between">
                    <span>Current:</span>
                    <span className="font-mono">{status.current_value.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Threshold:</span>
                    <span className="font-mono">{status.threshold.toFixed(3)}</span>
                  </div>
                  {status.status === 'breach' && (
                    <div className="flex justify-between">
                      <span>Severity:</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(status.breach_severity)}`}>
                        {status.breach_severity.toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="mt-3 text-xs text-gray-700">
                  Updated: {new Date(status.last_updated).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Breaches & Incidents */}
        {breaches.length > 0 && (
          <div className="bg-white rounded-xl p-6 mb-8 shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2 text-red-500" />
              SLO Breaches & Incidents
            </h2>
            
            <div className="space-y-4">
              {breaches.map((breach) => (
                <div key={breach.id} className="border border-red-200 rounded-lg p-4 bg-red-50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-red-900">{breach.slo_type.toUpperCase()} Breach</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(breach.severity)}`}>
                      {breach.severity.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
                    <div>
                      <p><strong>Impact:</strong> {breach.impact_assessment}</p>
                      <p><strong>Current Value:</strong> {breach.current_value.toFixed(3)}</p>
                      <p><strong>Threshold:</strong> {breach.threshold.toFixed(3)}</p>
                    </div>
                    <div>
                      <p><strong>Rollback Triggered:</strong> {breach.rollback_triggered ? 'Yes' : 'No'}</p>
                      <p><strong>Evidence Bundle:</strong> {breach.evidence_bundle_id}</p>
                      <p><strong>Time:</strong> {new Date(breach.breach_time).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <p className="font-semibold text-red-900 mb-1">Mitigation Actions:</p>
                    <ul className="list-disc list-inside text-sm text-red-800">
                      {breach.mitigation_actions.map((action, index) => (
                        <li key={index}>{action}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Shadow Evaluation */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Eye className="w-6 h-6 mr-2 text-blue-500" />
              Shadow Evaluation
            </h2>
            <button
              onClick={startShadowEvaluation}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Shadow Test
            </button>
          </div>
          
          {shadowEvaluations.length > 0 && (
            <div className="space-y-4">
              {shadowEvaluations.map((evaluation) => (
                <div key={evaluation.evidence_bundle_id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">
                      {evaluation.candidate_model_id} vs {evaluation.live_model_id}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      evaluation.promotion_approved ? 'text-green-600 bg-green-100' : 'text-yellow-600 bg-yellow-100'
                    }`}>
                      {evaluation.promotion_approved ? 'APPROVED' : 'PENDING'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-800">
                    <div>
                      <p><strong>Utility Delta:</strong> {evaluation.metrics.utility_delta.toFixed(3)}</p>
                      <p><strong>Stability Delta:</strong> {evaluation.metrics.stability_delta.toFixed(3)}</p>
                    </div>
                    <div>
                      <p><strong>Latency Delta:</strong> {evaluation.metrics.latency_delta.toFixed(3)}</p>
                      <p><strong>Privacy Delta:</strong> {evaluation.metrics.privacy_delta.toFixed(3)}</p>
                    </div>
                    <div>
                      <p><strong>Status:</strong> {evaluation.status}</p>
                      <p><strong>Start:</strong> {new Date(evaluation.evaluation_start).toLocaleString()}</p>
                    </div>
                    <div>
                      <p><strong>Evidence:</strong> {evaluation.evidence_bundle_id}</p>
                      {evaluation.evaluation_end && (
                        <p><strong>End:</strong> {new Date(evaluation.evaluation_end).toLocaleString()}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drift Monitoring */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-blue-500" />
              Drift Monitoring
            </h2>
            <div className="flex space-x-4">
              <select
                value={selectedTimeWindow}
                onChange={(e) => setSelectedTimeWindow(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              >
                <option value="7d">7 Days</option>
                <option value="14d">14 Days</option>
                <option value="28d">28 Days</option>
              </select>
              <button
                onClick={calculateDriftMetrics}
                className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Calculate Drift
              </button>
            </div>
          </div>
          
          {driftMetrics && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Drift Metrics</h3>
                <div className="space-y-2 text-gray-800">
                  <div className="flex justify-between">
                    <span>PSI Score:</span>
                    <span className="font-mono">{driftMetrics.psi_score.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>KS Statistic:</span>
                    <span className="font-mono">{driftMetrics.ks_statistic.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Severity:</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(driftMetrics.drift_severity)}`}>
                      {driftMetrics.drift_severity.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Time Windows</h3>
                <div className="space-y-2 text-gray-800">
                  <div className="flex justify-between">
                    <span>7 Days:</span>
                    <span className="font-mono">{driftMetrics.time_windows['7d'].toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>14 Days:</span>
                    <span className="font-mono">{driftMetrics.time_windows['14d'].toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>28 Days:</span>
                    <span className="font-mono">{driftMetrics.time_windows['28d'].toFixed(3)}</span>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <h3 className="font-semibold text-gray-900 mb-3">Affected Segments</h3>
                <div className="flex flex-wrap gap-2">
                  {driftMetrics.affected_segments.map((segment, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {segment}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="md:col-span-2">
                <h3 className="font-semibold text-gray-900 mb-3">Recommendations</h3>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {driftMetrics.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Features Overview */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Shield className="w-6 h-6 mr-2 text-blue-500" />
            Operational Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fail-Closed Gates</h3>
              <p className="text-sm text-gray-600">Promotion blocked until all SLO gates pass with confidence intervals</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Shadow Evaluation</h3>
              <p className="text-sm text-gray-600">Candidate models score in parallel with live traffic</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Automated Rollback</h3>
              <p className="text-sm text-gray-600">Breach of SLO → revert to last good artifact with evidence logged</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-yellow-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Drift Monitoring</h3>
              <p className="text-sm text-gray-600">PSI/KS metrics with time-window analysis and segment tracking</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Evidence in CI</h3>
              <p className="text-sm text-gray-600">Every change regenerates signed evidence bundles</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-indigo-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Privacy Probes</h3>
              <p className="text-sm text-gray-600">Membership inference and attribute disclosure monitoring</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
