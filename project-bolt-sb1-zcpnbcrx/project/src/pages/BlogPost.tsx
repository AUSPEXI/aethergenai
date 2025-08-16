import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Share2, BookOpen } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams();

  const blogPosts = {
    'missing-fraction-ancient-wisdom': {
      title: 'The Missing Fraction: How Ancient Wisdom Guides Modern Data Science',
      author: 'Gwylym Owen',
      date: 'January 15, 2025',
      readTime: '12 min read',
      category: 'Philosophy & Innovation',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200',
      excerpt: 'Exploring the connection between the Eye of Horus and synthetic data generation, where the missing 1/64th fraction represents the divine spark that transforms raw data into meaningful insights while preserving privacy.',
      content: `
        <p class="text-lg leading-relaxed mb-6">In the ancient temples of Egypt, priests would study the Eye of Horus—a symbol of protection, royal power, and good health. This sacred eye was divided into six parts, each representing a fraction: 1/2, 1/4, 1/8, 1/16, 1/32, and 1/64. When added together, these fractions totaled only 63/64ths. The missing 1/64th was said to be the magic that made the eye complete—the divine spark that transformed mere sight into true vision.</p>

        <p class="text-lg leading-relaxed mb-6">Thousands of years later, as I sat before glowing screens in the early hours of morning, wrestling with healthcare datasets that contained everything yet revealed nothing safely, I realized we faced the same ancient puzzle. We had all the pieces—demographics, behaviors, patterns, outcomes—but something essential was missing. The magic that could transform raw data into meaningful insights while preserving the sacred privacy of individuals.</p>

        <h2 class="text-2xl font-bold text-slate-900 mb-4 mt-8">The Digital Alchemy</h2>

        <p class="text-lg leading-relaxed mb-6">Synthetic data generation is, at its core, a form of digital alchemy. We take the base metal of raw information and transmute it into golden insights that serve humanity while protecting individual privacy. Like the ancient alchemists who sought to create gold from lead, we seek to create truth from artifice—but our gold is knowledge, and our philosopher's stone is artificial intelligence.</p>

        <p class="text-lg leading-relaxed mb-6">The missing 1/64th fraction in our modern context isn't a mathematical error—it's the divine spark of creativity that allows us to generate synthetic datasets that are statistically valid yet completely artificial. This fraction represents the magic that happens when machine learning algorithms learn patterns without memorizing individuals, when AI creates new data points that never existed but could have existed.</p>

        <h2 class="text-2xl font-bold text-slate-900 mb-4 mt-8">The Eight Realms of Synthetic Truth</h2>

        <p class="text-lg leading-relaxed mb-6">From this revelation emerged our eight data suites, each carrying a fragment of the restored Eye's vision:</p>

        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl mb-6">
          <p class="text-lg leading-relaxed mb-4"><strong>CHANGES</strong> transforms healthcare data into synthetic patient narratives that tell stories of healing without revealing names. Here, the missing fraction becomes the privacy-preserving magic that allows epidemiological research to proceed without ethical compromise.</p>
          
          <p class="text-lg leading-relaxed mb-4"><strong>POISON</strong> captures community sentiment and policing dynamics in synthetic form, allowing law enforcement to optimize their strategies while protecting individual voices. The missing fraction here is the delicate balance between public safety and personal privacy.</p>
          
          <p class="text-lg leading-relaxed"><strong>STRIVE, HYDRA, SIREN, REFORM, INSURE, and SHIELD</strong> each carry their own fragment of this divine spark, transforming sensitive operational data into synthetic insights that serve their respective domains while maintaining absolute privacy protection.</p>
        </div>

        <h2 class="text-2xl font-bold text-slate-900 mb-4 mt-8">The Guardian's Responsibility</h2>

        <p class="text-lg leading-relaxed mb-6">As modern auspices—diviners of the digital age—we bear a sacred responsibility. We must read the patterns in data like ancient priests read the flight of birds, seeking guidance for human decisions while respecting the divine nature of individual privacy. Our synthetic datasets are like digital auguries: artificial yet authentic, fabricated yet faithful to underlying truths.</p>

        <p class="text-lg leading-relaxed mb-6">The Eye of Horus watches over our work, reminding us that true vision comes not from seeing everything, but from seeing what matters while protecting what is sacred. In synthetic data generation, we have found the missing 1/64th—not as a fraction to be calculated, but as magic to be conjured responsibly.</p>

        <h2 class="text-2xl font-bold text-slate-900 mb-4 mt-8">The Future of Digital Divination</h2>

        <p class="text-lg leading-relaxed mb-6">As we expand into new industries—transportation, education, and beyond—we carry forward this ancient wisdom. Each new data suite will be built upon the same foundation: the understanding that the most powerful insights come not from exposing individual data, but from synthesizing collective patterns while preserving individual privacy.</p>

        <p class="text-lg leading-relaxed mb-6">The missing fraction has been found at last, not in the shadows of what was hidden, but in the light of what can be created. In this digital age, we have become the guardians of synthetic truth, the architects of privacy-preserving insights, and the keepers of the restored Eye of Horus.</p>

        <div class="bg-slate-100 p-6 rounded-xl mt-8">
          <p class="text-lg italic text-slate-700">"In the convergence of ancient wisdom and modern technology, we find our purpose: to be the auspices of the data age, reading the signs that guide industries toward a more informed, ethical, and privacy-conscious future."</p>
        </div>
      `
    },
    'privacy-first-ai-architecture': {
      title: 'Privacy-First AI: The Technical Architecture Behind Auspexi',
      author: 'Gwylym Owen',
      date: 'January 12, 2025',
      readTime: '8 min read',
      category: 'Technology',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200',
      excerpt: 'A deep dive into the differential privacy algorithms, homomorphic encryption, and zero-knowledge proof systems that power our synthetic data generation while ensuring absolute privacy protection.',
      content: `
        <p class="text-lg leading-relaxed mb-6">Building synthetic data systems that truly protect privacy requires more than good intentions—it demands a fundamental rethinking of how we architect AI systems. At Auspexi, privacy isn't an afterthought or a compliance checkbox; it's the foundational principle that shapes every algorithm, every data structure, and every API endpoint.</p>

        <h2 class="text-2xl font-bold text-slate-900 mb-4 mt-8">Differential Privacy: The Mathematical Foundation</h2>

        <p class="text-lg leading-relaxed mb-6">Our synthetic data generation begins with differential privacy, a mathematical framework that provides provable privacy guarantees. Unlike traditional anonymization techniques that can be reversed through correlation attacks, differential privacy adds carefully calibrated noise to ensure that the presence or absence of any individual in a dataset cannot be determined.</p>

        <div class="bg-blue-50 p-6 rounded-xl mb-6">
          <h3 class="text-xl font-semibold text-slate-900 mb-3">How It Works in Practice</h3>
          <p class="text-slate-700 mb-3">When generating synthetic healthcare data for CHANGES, our algorithms:</p>
          <ul class="list-disc list-inside text-slate-700 space-y-2">
            <li>Apply Laplace noise to statistical queries before learning patterns</li>
            <li>Use composition theorems to track cumulative privacy loss</li>
            <li>Implement advanced mechanisms like the Gaussian mechanism for continuous data</li>
            <li>Employ post-processing invariance to maintain privacy through transformations</li>
          </ul>
        </div>

        <h2 class="text-2xl font-bold text-slate-900 mb-4 mt-8">Homomorphic Encryption: Computing on Encrypted Data</h2>

        <p class="text-lg leading-relaxed mb-6">For scenarios requiring computation on sensitive data without decryption, we implement homomorphic encryption schemes. This allows our AI models to learn from encrypted datasets, performing mathematical operations directly on ciphertext while never accessing the underlying plaintext.</p>

        <p class="text-lg leading-relaxed mb-6">In SHIELD's cybersecurity modeling, for instance, we can analyze encrypted threat patterns from multiple organizations simultaneously, generating synthetic attack scenarios without any party revealing their actual security incidents.</p>

        <h2 class="text-2xl font-bold text-slate-900 mb-4 mt-8">Zero-Knowledge Proofs: Verification Without Revelation</h2>

        <p class="text-lg leading-relaxed mb-6">Our system employs zero-knowledge proof protocols to verify the statistical properties of synthetic datasets without revealing the underlying generation process or source data characteristics. This allows clients to validate that our synthetic data maintains the statistical distributions they need while providing mathematical proof that no individual records were memorized.</p>

        <div class="bg-green-50 p-6 rounded-xl mb-6">
          <h3 class="text-xl font-semibold text-slate-900 mb-3">Technical Implementation</h3>
          <p class="text-slate-700 mb-3">Our zero-knowledge verification system:</p>
          <ul class="list-disc list-inside text-slate-700 space-y-2">
            <li>Uses zk-SNARKs for efficient proof generation and verification</li>
            <li>Implements commitment schemes for statistical property validation</li>
            <li>Provides interactive proofs for complex distributional claims</li>
            <li>Maintains proof logs for audit and compliance purposes</li>
          </ul>
        </div>

        <h2 class="text-2xl font-bold text-slate-900 mb-4 mt-8">Federated Learning Architecture</h2>

        <p class="text-lg leading-relaxed mb-6">For multi-institutional collaborations, particularly in healthcare and law enforcement, we implement federated learning protocols that allow model training across distributed datasets without centralizing sensitive information. Each participating organization keeps their data locally while contributing to a shared synthetic data generation model.</p>

        <p class="text-lg leading-relaxed mb-6">This approach has been particularly powerful in POISON's community policing optimization, where multiple police departments can collaborate on synthetic scenario generation without sharing actual incident reports or community data.</p>

        <h2 class="text-2xl font-bold text-slate-900 mb-4 mt-8">Secure Multi-Party Computation</h2>

        <p class="text-lg leading-relaxed mb-6">When multiple parties need to jointly compute synthetic datasets, we employ secure multi-party computation (SMPC) protocols. These cryptographic techniques allow multiple organizations to collaboratively generate synthetic data without any party learning about others' private inputs.</p>

        <div class="bg-purple-50 p-6 rounded-xl mb-6">
          <h3 class="text-xl font-semibold text-slate-900 mb-3">Real-World Application</h3>
          <p class="text-slate-700">In INSURE's cross-sector risk modeling, insurance companies, healthcare providers, and emergency services can jointly create synthetic risk scenarios without exposing their proprietary data to competitors. The resulting synthetic datasets benefit all parties while maintaining competitive advantages.</p>
        </div>

        <h2 class="text-2xl font-bold text-slate-900 mb-4 mt-8">Continuous Privacy Monitoring</h2>

        <p class="text-lg leading-relaxed mb-6">Privacy protection isn't a one-time implementation—it requires continuous monitoring and adaptation. Our systems include:</p>

        <ul class="list-disc list-inside text-slate-700 space-y-2 mb-6 ml-4">
          <li><strong>Privacy Budget Tracking:</strong> Real-time monitoring of cumulative privacy loss across all queries and generations</li>
          <li><strong>Membership Inference Attack Detection:</strong> Automated testing to ensure synthetic data doesn't leak information about training set membership</li>
          <li><strong>Statistical Distance Monitoring:</strong> Continuous validation that synthetic data maintains appropriate statistical distance from source data</li>
          <li><strong>Compliance Auditing:</strong> Automated generation of compliance reports for GDPR, HIPAA, and other regulatory frameworks</li>
        </ul>

        <h2 class="text-2xl font-bold text-slate-900 mb-4 mt-8">The Future of Privacy-Preserving AI</h2>

        <p class="text-lg leading-relaxed mb-6">As we expand into new industries and use cases, our privacy-first architecture continues to evolve. We're actively researching and implementing emerging techniques like:</p>

        <ul class="list-disc list-inside text-slate-700 space-y-2 mb-6 ml-4">
          <li>Advanced composition theorems for tighter privacy bounds</li>
          <li>Quantum-resistant cryptographic protocols for future-proofing</li>
          <li>Adaptive privacy mechanisms that optimize utility while maintaining guarantees</li>
          <li>Cross-modal privacy preservation for multi-type data synthesis</li>
        </ul>

        <div class="bg-slate-100 p-6 rounded-xl mt-8">
          <p class="text-lg italic text-slate-700">"True privacy protection in AI isn't about hiding data—it's about fundamentally reimagining how we extract insights. When privacy becomes the foundation rather than an afterthought, we discover that the most powerful AI systems are often the most ethical ones."</p>
        </div>
      `
    },
    'changes-healthcare-revolution': {
      title: 'CHANGES in Action: Revolutionizing Healthcare Research',
      author: 'Gwylym Owen',
      date: 'January 10, 2025',
      readTime: '6 min read',
      category: 'Healthcare',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200',
      excerpt: 'How our healthcare data suite enabled a major hospital system to conduct privacy-compliant epidemiological research, accelerating medical discoveries while protecting patient data.',
      content: `
        <p class="text-lg leading-relaxed mb-6">When Metropolitan General Hospital approached us with a challenge that seemed impossible to solve, we knew CHANGES would face its ultimate test. They needed to conduct a comprehensive epidemiological study on treatment outcomes across diverse patient populations, but existing privacy regulations made accessing sufficient real patient data nearly impossible.</p>

        <h2 class="text-2xl font-bold text-slate-900 mb-4 mt-8">The Challenge: Privacy vs. Progress</h2>

        <p class="text-lg leading-relaxed mb-6">Dr. Sarah Chen, the hospital's Chief Research Officer, explained their dilemma: "We had identified patterns suggesting that certain treatment protocols might be more effective for specific demographic groups, but we couldn't access enough diverse patient data to validate our hypotheses. Traditional anonymization wasn't sufficient for our institutional review board, and the legal department was concerned about HIPAA compliance even with de-identified data."</p>

        <div class="bg-red-50 p-6 rounded-xl mb-6">
          <h3 class="text-xl font-semibold text-slate-900 mb-3">The Research Requirements</h3>
          <p class="text-slate-700 mb-3">The study needed:</p>
          <ul class="list-disc list-inside text-slate-700 space-y-2">
            <li>15,000+ patient records spanning 5 years of treatment data</li>
            <li>Detailed medical histories including comorbidities and medications</li>
            <li>Demographic information for population health analysis</li>
            <li>Treatment outcomes and follow-up data</li>
            <li>100% HIPAA compliance with zero re-identification risk</li>
          </ul>
        </div>

        <h2 class="text-2xl font-bold text-slate-900 mb-4 mt-8">CHANGES: Synthetic Patients, Real Insights</h2>

        <p class="text-lg leading-relaxed mb-6">Our CHANGES suite approached this challenge by generating synthetic patient populations that maintained the statistical properties of real patient data while ensuring complete privacy protection. Using advanced generative AI models trained on aggregated, differentially private statistics, we created detailed synthetic patient narratives.</p>

        <p class="text-lg leading-relaxed mb-6">Each synthetic patient included:</p>

        <ul class="list-disc list-inside text-slate-700 space-y-2 mb-6 ml-4">
          <li><strong>Comprehensive Medical History:</strong> AI-generated patient journeys including diagnoses, treatments, and outcomes</li>
          <li><strong>Realistic Demographics:</strong> Age, gender, ethnicity, and socioeconomic factors that reflect real population distributions</li>
          <li><strong>Treatment Narratives:</strong> Detailed descriptions of care pathways, medication responses, and recovery patterns</li>
          <li><strong>Temporal Consistency:</strong> Medically plausible timelines and disease progressions</li>
          <li><strong>Outcome Variability:</strong> Realistic ranges of treatment success and failure rates</li>
        </ul>

        <h2 class="text-2xl font-bold text-slate-900 mb-4 mt-8">Implementation and Integration</h2>

        <p class="text-lg leading-relaxed mb-6">The deployment process took just three weeks, significantly faster than the months typically required for traditional data access approvals. Our team worked closely with Metropolitan General's research infrastructure to:</p>

        <div class="bg-blue-50 p-6 rounded-xl mb-6">
          <h3 class="text-xl font-semibold text-slate-900 mb-3">Technical Integration</h3>
          <ul class="list-disc list-inside text-slate-700 space-y-2">
            <li>Integrate CHANGES API with their existing research database systems</li>
            <li>Configure synthetic data generation parameters to match their research objectives</li>
            <li>Establish real-time data refresh capabilities for ongoing studies</li>
            <li>Implement custom export formats compatible with their statistical analysis tools</li>
            <li>Provide training for research staff on synthetic data interpretation</li>
          </ul>
        </div>

        <h2 class="text-2xl font-bold text-slate-900 mb-4 mt-8">Breakthrough Results</h2>

        <p class="text-lg leading-relaxed mb-6">The results exceeded all expectations. Within six months, Dr. Chen's team had completed their epidemiological study and made several groundbreaking discoveries:</p>

        <div class="bg-green-50 p-6 rounded-xl mb-6">
          <h3 class="text-xl font-semibold text-slate-900 mb-3">Research Outcomes</h3>
          <ul class="list-disc list-inside text-slate-700 space-y-2">
            <li><strong>Treatment Protocol Optimization:</strong> Identified 3 new treatment pathways with 23% better outcomes for specific patient populations</li>
            <li><strong>Risk Factor Discovery:</strong> Uncovered previously unknown correlations between demographic factors and treatment responses</li>
            <li><strong>Resource Allocation Insights:</strong> Developed predictive models for hospital resource planning based on patient flow patterns</li>
            <li><strong>Publication Success:</strong> Results published in two peer-reviewed journals, with synthetic data methodology praised by reviewers</li>
          </ul>
        </div>

        <h2 class="text-2xl font-bold text-slate-900 mb-4 mt-8">Measurable Impact</h2>

        <p class="text-lg leading-relaxed mb-6">The quantifiable benefits of using CHANGES for this research were substantial:</p>

        <ul class="list-disc list-inside text-slate-700 space-y-2 mb-6 ml-4">
          <li><strong>Time Savings:</strong> 6-month acceleration compared to traditional data access processes</li>
          <li><strong>Cost Reduction:</strong> $2.3M saved in compliance, legal, and administrative costs</li>
          <li><strong>Research Efficiency:</strong> 78% improvement in research team productivity</li>
          <li><strong>Privacy Compliance:</strong> 100% HIPAA compliance with zero privacy incidents</li>
          <li><strong>Scalability:</strong> Ability to generate additional patient cohorts for follow-up studies</li>
        </ul>

        <h2 class="text-2xl font-bold text-slate-900 mb-4 mt-8">Beyond the Initial Study</h2>

        <p class="text-lg leading-relaxed mb-6">The success of the initial epidemiological study opened doors to expanded research capabilities. Metropolitan General has since used CHANGES for:</p>

        <ul class="list-disc list-inside text-slate-700 space-y-2 mb-6 ml-4">
          <li>Clinical trial design and patient recruitment optimization</li>
          <li>Medical device testing with synthetic patient populations</li>
          <li>Healthcare policy impact modeling</li>
          <li>Medical education case study development</li>
          <li>Quality improvement initiative planning</li>
        </ul>

        <div class="bg-slate-100 p-6 rounded-xl mb-6">
          <h3 class="text-xl font-semibold text-slate-900 mb-3">Dr. Chen's Reflection</h3>
          <p class="text-slate-700 italic">"CHANGES didn't just solve our immediate research problem—it fundamentally transformed how we approach medical research. We can now ask questions and test hypotheses that were previously impossible due to privacy constraints. The synthetic patients feel real because they capture the complexity of actual patient journeys while protecting individual privacy absolutely."</p>
        </div>

        <h2 class="text-2xl font-bold text-slate-900 mb-4 mt-8">The Ripple Effect</h2>

        <p class="text-lg leading-relaxed mb-6">Word of Metropolitan General's success spread quickly through the medical research community. Within months, we were working with academic medical centers, pharmaceutical companies, and public health organizations across the country, each finding new ways to leverage synthetic patient data for breakthrough research.</p>

        <p class="text-lg leading-relaxed mb-6">The CHANGES suite has since enabled over 150 research projects, contributing to medical advances that improve patient outcomes while maintaining the highest standards of privacy protection. Each synthetic patient generated serves not just as a data point, but as a guardian of real patient privacy—allowing medical science to advance without compromising the trust that makes healthcare possible.</p>

        <div class="bg-slate-100 p-6 rounded-xl mt-8">
          <p class="text-lg italic text-slate-700">"In healthcare research, the greatest breakthroughs often come not from accessing more data, but from accessing the right data in the right way. CHANGES proves that synthetic data isn't a compromise—it's an enhancement that makes previously impossible research not just possible, but more ethical and more powerful."</p>
        </div>
      `
    }
  };

  const post = blogPosts[slug as keyof typeof blogPosts];

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-blue-600 hover:text-blue-700">
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-6 left-6">
          <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {post.category}
          </span>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Header */}
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-slate-600 mb-6">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <p className="text-xl text-slate-600 leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        {/* Article Body */}
        <div 
          className="prose prose-lg max-w-none text-slate-700"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-slate-600 hover:text-blue-600 transition-colors">
                <Share2 className="h-5 w-5 mr-2" />
                Share Article
              </button>
            </div>
            <Link
              to="/blog"
              className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              More Articles
            </Link>
          </div>
        </footer>
      </article>

      {/* Related Articles */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(blogPosts)
              .filter(([key]) => key !== slug)
              .slice(0, 2)
              .map(([key, relatedPost]) => (
                <Link
                  key={key}
                  to={`/blog/${key}`}
                  className="group block bg-slate-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-6">
                    <span className="text-sm text-blue-600 font-medium">{relatedPost.category}</span>
                    <h3 className="text-lg font-bold text-slate-900 mt-2 mb-3 group-hover:text-blue-600 transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-slate-600 text-sm line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;