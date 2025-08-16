import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Code, Database, Target, Shield, TrendingUp, Zap, Hexagon } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      id: 'auspexi-sdsp',
      title: 'Auspexi 8-Suite SDSP',
      category: 'Synthetic Data Platform',
      description: 'Revolutionary synthetic data generation platform processing over 1 million records daily with Fibonacci-inspired 38%/62% efficiency split.',
      highlights: [
        '1M+ records processed daily',
        '8-suite architecture design',
        '38%/62% Fibonacci optimization',
        '99.7% uptime reliability'
      ],
      technologies: ['Python', 'TensorFlow', 'Kubernetes', 'PostgreSQL', 'Redis'],
      impact: 'Targeting $2-3B synthetic data market with privacy-preserving solutions',
      icon: Database,
      color: 'blue'
    },
    {
      id: 'authentes-neural',
      title: 'Authentes 2.0 Neural Network',
      category: 'Self-Validating AI',
      description: 'Advanced neural network system with built-in self-validation capabilities, reducing manual oversight by 85%.',
      highlights: [
        'Self-validating architecture',
        '85% reduction in manual oversight',
        'Real-time error correction',
        'Advanced pattern recognition'
      ],
      technologies: ['PyTorch', 'Docker', 'MLflow', 'Apache Kafka', 'MongoDB'],
      impact: 'Breakthrough in autonomous AI system reliability',
      icon: Code,
      color: 'purple'
    },
    {
      id: 'marketing-automation',
      title: 'Automated Marketing Platform',
      category: 'AI-Driven Campaigns',
      description: 'Intelligent marketing automation system achieving 30% engagement uplift through advanced content optimization.',
      highlights: [
        '30% engagement increase',
        'Real-time content optimization',
        'Multi-channel orchestration',
        'Predictive audience targeting'
      ],
      technologies: ['Node.js', 'React', 'AWS Lambda', 'DynamoDB', 'SageMaker'],
      impact: 'Transformed marketing ROI for enterprise clients',
      icon: TrendingUp,
      color: 'green'
    },
    {
      id: 'coin-drop-pulse',
      title: 'Coin Drop Pulse Security',
      category: 'Fraud Detection',
      description: 'Advanced fraud detection system achieving 90% scam reduction through pattern recognition and behavioral analysis.',
      highlights: [
        '90% scam reduction rate',
        'Real-time threat detection',
        'Behavioral pattern analysis',
        'Crypto-specific security'
      ],
      technologies: ['Scala', 'Apache Spark', 'Elasticsearch', 'Kafka', 'TensorFlow'],
      impact: 'Protected millions in cryptocurrency transactions',
      icon: Shield,
      color: 'red'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'from-blue-50 to-blue-100',
        icon: 'bg-blue-600 group-hover:bg-blue-700',
        accent: 'text-blue-600'
      },
      purple: {
        bg: 'from-purple-50 to-purple-100',
        icon: 'bg-purple-600 group-hover:bg-purple-700',
        accent: 'text-purple-600'
      },
      green: {
        bg: 'from-green-50 to-green-100',
        icon: 'bg-green-600 group-hover:bg-green-700',
        accent: 'text-green-600'
      },
      red: {
        bg: 'from-red-50 to-red-100',
        icon: 'bg-red-600 group-hover:bg-red-700',
        accent: 'text-red-600'
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
            AI & Data Projects
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Two decades of transforming complex challenges into elegant solutions. 
            Each project represents a unique approach to taming chaos into clarity, 
            from synthetic data generation to fraud detection systems.
          </p>
          
          {/* Why Eight? Teaser */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Hexagon className="h-8 w-8 text-blue-600 mr-2" />
              <h3 className="text-lg font-bold text-gray-900">The Eight-Suite Philosophy</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Why do our most successful projects follow octagonal patterns? 
              The answer lies in Dürer's solid, Fibonacci sequences, and the mathematical beauty 
              of eight-dimensional optimization spaces.
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {projects.map((project) => {
            const colors = getColorClasses(project.color);
            const IconComponent = project.icon;
            
            return (
              <div
                key={project.id}
                className={`group bg-gradient-to-br ${colors.bg} rounded-xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 ${colors.icon} rounded-xl flex items-center justify-center transition-colors`}>
                    <IconComponent className="h-7 w-7 text-white" />
                  </div>
                  <span className="text-xs font-medium text-gray-600 bg-white px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {project.title}
                </h3>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Key Highlights */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Achievements</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {project.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 flex-shrink-0"></div>
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs bg-white text-gray-700 px-2 py-1 rounded-md border border-gray-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Impact */}
                <div className="border-t border-white pt-4">
                  <p className={`text-sm font-medium ${colors.accent}`}>
                    Impact: {project.impact}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Why Eight Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-16">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Hexagon className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Eight? The Mathematical Poetry of Optimization
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our most successful architectures follow octagonal patterns, inspired by Dürer's eight-faced polyhedron 
              and Fibonacci's recursive beauty. This isn't coincidence—it's mathematical poetry.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Dürer's Solid */}
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Hexagon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Dürer's Solid</h3>
              <p className="text-gray-600 text-sm">
                The eight-faced polyhedron provides optimal balance between complexity and elegance, 
                mirroring our system architectures.
              </p>
            </div>

            {/* Fibonacci Integration */}
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Fibonacci Flow</h3>
              <p className="text-gray-600 text-sm">
                The 38%/62% split in Auspexi's SDSP reflects the golden ratio, 
                creating natural load distribution and optimal performance.
              </p>
            </div>

            {/* Chaos Theory */}
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Controlled Chaos</h3>
              <p className="text-gray-600 text-sm">
                Eight-dimensional parameter spaces allow for controlled chaos, 
                enabling systems that are both stable and adaptable.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Build Your Next Breakthrough?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            These projects represent just the beginning. Let's explore how this approach to 
            systematic innovation can transform your next challenge into a competitive advantage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/cover-letter"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              View Approach
              <ExternalLink className="h-5 w-5 ml-2" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200 transform hover:-translate-y-1"
            >
              Start Discussion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}