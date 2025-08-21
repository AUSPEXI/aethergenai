import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Database, 
  Settings, 
  Users, 
  CreditCard, 
  Shield, 
  Activity,
  ChevronRight,
  LogOut,
  User
} from 'lucide-react';
import ReportingDashboard from '../ReportingDashboard/ReportingDashboard';
import SyntheticDataGenerator from '../SyntheticDataGenerator/SyntheticDataGenerator';
import SchemaDesigner from '../SchemaDesigner/SchemaDesigner';
import DataCleaner from '../DataCleaner/DataCleaner';
import PrivacyMetrics from '../PrivacyMetrics/PrivacyMetrics';
import ModelCollapseRiskDial from '../ModelCollapseRiskDial/ModelCollapseRiskDial';
import { assertSupabase } from '../../services/supabaseClient';

interface AethergenDashboardProps {
  userEmail: string;
  onLogout: () => void;
}

type DashboardTab = 'overview' | 'generate' | 'schema' | 'clean' | 'privacy' | 'risk' | 'billing' | 'settings';

const AethergenDashboard: React.FC<AethergenDashboardProps> = ({ userEmail, onLogout }) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const dashboardTabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3, description: 'Platform metrics and performance' },
    { id: 'generate', name: 'Generate', icon: Database, description: 'Create synthetic datasets' },
    { id: 'schema', name: 'Schema Designer', icon: Settings, description: 'Design data schemas' },
    { id: 'clean', name: 'Data Cleaner', icon: Activity, description: 'Clean and prepare data' },
    { id: 'privacy', name: 'Privacy Metrics', icon: Shield, description: 'Privacy and compliance tools' },
    { id: 'risk', name: 'Risk Assessment', icon: Activity, description: 'Model collapse risk analysis' },
    { id: 'billing', name: 'Billing', icon: CreditCard, description: 'Subscription and usage' },
    { id: 'settings', name: 'Settings', icon: Settings, description: 'Account and platform settings' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Database className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Records</p>
                    <p className="text-2xl font-bold text-gray-900">1,000,000,000+</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Activity className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Generation Speed</p>
                    <p className="text-2xl font-bold text-gray-900">50K/sec</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Quality Score</p>
                    <p className="text-2xl font-bold text-gray-900">100%</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Users</p>
                    <p className="text-2xl font-bold text-gray-900">1,247</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700">Dataset generation completed - 1M records</span>
                  </div>
                  <span className="text-xs text-gray-500">2 minutes ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700">Schema validation passed</span>
                  </div>
                  <span className="text-xs text-gray-500">15 minutes ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700">Privacy metrics updated</span>
                  </div>
                  <span className="text-xs text-gray-500">1 hour ago</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'generate':
        return <SyntheticDataGenerator />;

      case 'schema':
        return <SchemaDesigner />;

      case 'clean':
        return <DataCleaner />;

      case 'privacy':
        return <PrivacyMetrics />;

      case 'risk':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Model Collapse Risk Assessment</h3>
              <ModelCollapseRiskDial />
            </div>
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing & Usage</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Current Plan</h4>
                  <p className="text-2xl font-bold text-blue-600">Developer Hub Pro</p>
                  <p className="text-sm text-gray-600">£499/month</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Usage This Month</h4>
                  <p className="text-2xl font-bold text-gray-900">23.4M</p>
                  <p className="text-sm text-gray-600">of 50M records</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={userEmail}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                  <div className="flex">
                    <input
                      type="password"
                      value="sk_live_...abc123"
                      disabled
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50"
                    />
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Aethergen Platform</h1>
            <span className="ml-3 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
              Beta
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-600">
              <User className="h-4 w-4 mr-2" />
              {userEmail}
            </div>
            <button
              onClick={onLogout}
              className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`bg-white shadow-sm border-r transition-all duration-300 ${
          isSidebarCollapsed ? 'w-16' : 'w-64'
        }`}>
          <div className="p-4">
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="w-full flex items-center justify-center p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            >
              <ChevronRight className={`h-4 w-4 transition-transform ${isSidebarCollapsed ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          <nav className="px-2">
            {dashboardTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as DashboardTab)}
                  className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-md transition-colors mb-1 ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isSidebarCollapsed && (
                    <span className="ml-3">{tab.name}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {!isSidebarCollapsed && (
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900">
                  {dashboardTabs.find(tab => tab.id === activeTab)?.name}
                </h2>
                <p className="text-gray-600 mt-2">
                  {dashboardTabs.find(tab => tab.id === activeTab)?.description}
                </p>
              </div>
            )}
            
            {renderTabContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AethergenDashboard;

