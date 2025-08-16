import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export interface CategoryConfig {
  static: number;
  premium: number;
  enterprise: number;
  addons: {
    core: string[];
    premium: string[];
  };
  suites: string[];
  description: string;
  available: boolean;
}

export const categories: Record<string, CategoryConfig> = {
  'Government': {
    static: 1800,
    premium: 600,
    enterprise: 1500,
    addons: {
      core: ['sentimentDynamics', 'behaviorPrediction', 'environmentalImpact', 'resourceOptimization'],
      premium: ['networkAnalysis', 'advancedOptimization', 'patternClustering', 'predictiveForecasting']
    },
    suites: ['CHANGES', 'POISON', 'STRIVE', 'HYDRA', 'SIREN', 'REFORM', 'INSURE', 'SHIELD'],
    description: 'Healthcare, law enforcement, military, emergency services, corrections, insurance, and cybersecurity',
    available: true
  },
  'Finance': {
    static: 2100,
    premium: 700,
    enterprise: 1400,
    addons: {
      core: ['financialSentiment', 'transactionAnalytics', 'regulatoryCompliance', 'wealthManagement'],
      premium: ['riskOptimization', 'portfolioAnalytics', 'marketForecasting', 'fraudDetection']
    },
    suites: ['CREDRISE', 'TRADEMARKET', 'CASHFLOW', 'CONSUME', 'TAXGUARD', 'RISKSHIELD', 'INSURE', 'SHIELD'],
    description: 'Banking, investment, trading, compliance, risk management, and wealth advisory',
    available: true // Now available
  },
  'Manufacturing': {
    static: 2000,
    premium: 700,
    enterprise: 1500,
    addons: {
      core: ['productionOptimization', 'qualityControl', 'supplyChainAnalytics', 'maintenancePrediction'],
      premium: ['iotIntegration', 'energyOptimization', 'safetyAnalytics', 'demandForecasting']
    },
    suites: ['FORGE', 'ASSEMBLY', 'QUALITY', 'SUPPLY', 'MAINTAIN', 'ENERGY', 'SAFETY', 'THREAD'],
    description: 'Production optimization, quality control, supply chain, and industrial IoT',
    available: false // Coming 2026
  }
};

export interface SubscriptionData {
  category: string;
  type: 'static' | 'premium' | 'enterprise';
  price: number;
  addons: string[];
  premiumUpgrade: boolean;
  customerEmail: string;
  customerName: string;
}

export async function createCheckoutSession(subscriptionData: SubscriptionData) {
  try {
    const response = await fetch('/.netlify/functions/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscriptionData),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const { sessionId } = await response.json();
    
    // Redirect to Stripe Checkout
    const stripe = await import('@stripe/stripe-js').then(module => 
      module.loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
    );
    
    if (stripe) {
      await stripe.redirectToCheckout({ sessionId });
    }
  } catch (error) {
    console.error('Subscription error:', error);
    throw error;
  }
}

export async function logSubscriptionAttempt(subscriptionData: SubscriptionData) {
  try {
    const { error } = await supabase
      .from('subscription_events')
      .insert({
        customer_email: subscriptionData.customerEmail,
        event_type: 'subscription_attempt',
        plan_type: `${subscriptionData.category}_${subscriptionData.type}`,
        amount: calculateTotalPrice(subscriptionData),
        currency: 'usd',
        stripe_event_id: `attempt_${Date.now()}`,
      });

    if (error) {
      console.error('Error logging subscription attempt:', error);
    }
  } catch (error) {
    console.error('Error logging subscription attempt:', error);
  }
}

export function calculateTotalPrice(subscriptionData: SubscriptionData): number {
  const categoryConfig = categories[subscriptionData.category];
  if (!categoryConfig) return 0;

  let basePrice = categoryConfig[subscriptionData.type];
  
  // Add premium upgrade cost for non-enterprise tiers
  if (subscriptionData.type !== 'enterprise' && subscriptionData.premiumUpgrade) {
    basePrice += (subscriptionData.type === 'static' ? 2400 : 200); // One-time vs monthly
  }

  return basePrice;
}

export function getAvailableCategories(): string[] {
  return Object.keys(categories).filter(cat => categories[cat].available);
}

export function getAllCategories(): string[] {
  return Object.keys(categories);
}

export function getAddonsForCategory(category: string) {
  return categories[category]?.addons || { core: [], premium: [] };
}

export function getCategoryConfig(category: string): CategoryConfig | null {
  return categories[category] || null;
}

export function getAddonDescriptions() {
  return {
    // Government add-ons (v1.0 current) - 4 core bundled + 4 premium optional
    sentimentDynamics: 'Real-time sentiment analysis and community engagement tracking',
    behaviorPrediction: 'Behavioral pattern prediction and outcome forecasting',
    environmentalImpact: 'Environmental impact assessment and sustainability metrics',
    resourceOptimization: 'Resource allocation and operational efficiency optimization',
    networkAnalysis: 'Advanced network analysis and relationship mapping',
    advancedOptimization: 'Advanced optimization algorithms and decision support',
    patternClustering: 'Machine learning clustering and pattern recognition',
    predictiveForecasting: 'Predictive forecasting and trend analysis',
    
    // Finance add-ons (now available) - 4 core bundled + 4 premium optional
    financialSentiment: 'Market sentiment analysis and investor behavior tracking',
    transactionAnalytics: 'Transaction pattern analysis and fraud detection',
    regulatoryCompliance: 'Automated compliance monitoring and reporting',
    wealthManagement: 'Portfolio optimization and wealth advisory analytics',
    riskOptimization: 'Advanced risk modeling and mitigation strategies',
    portfolioAnalytics: 'Portfolio performance analysis and optimization',
    marketForecasting: 'Market trend prediction and analysis',
    fraudDetection: 'Advanced fraud detection and prevention systems',
    
    // Manufacturing add-ons (planned 2026) - 4 core bundled + 4 premium optional
    productionOptimization: 'Production line efficiency and throughput optimization',
    qualityControl: 'Automated quality assurance and defect prediction',
    supplyChainAnalytics: 'Supply chain visibility and optimization',
    maintenancePrediction: 'Predictive maintenance and equipment lifecycle management',
    iotIntegration: 'Industrial IoT data integration and analytics',
    energyOptimization: 'Energy consumption optimization and efficiency',
    safetyAnalytics: 'Industrial safety monitoring and risk assessment',
    demandForecasting: 'Demand prediction and inventory optimization'
  };
}