import React from 'react';

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-md">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
        <p className="text-blue-600 mb-6">Effective Date: June 15, 2025</p>
        <p className="text-slate-700 mb-6">Auspexi Ltd ("Auspexi," "we," "us," or "our"), a UK-based company, is dedicated to safeguarding privacy and security in our Government Suite pipeline, delivering eight synthetic-first datasets: CHANGES, POISON, STRIVE, HYDRA, SIREN, REFORM, INSURE, and SHIELD. This Privacy Policy details our data collection, processing, storage, and protection practices, ensuring compliance with global regulations, including the UK General Data Protection Regulation (UK GDPR), EU General Data Protection Regulation (EU GDPR), Health Insurance Portability and Accountability Act (HIPAA), California Consumer Privacy Act (CCPA), ISO/IEC 27001, NIST Cybersecurity Framework, UK Ministry of Defence (MoD) Cyber Security Standards, and other standards relevant to healthcare, military, emergency services, and cybersecurity sectors. Our datasets, built on 57% synthetic data and 43% publicly available seeds, empower clients to meet their own compliance obligations with realistic, privacy-compliant scenarios, making Auspexi a trusted partner for global analytics and simulations.</p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">1. Data Collection and Processing</h2>
          <p className="text-slate-700">Our Government Suite generates 1 million data points per day, with 43% real/enhanced data from publicly available global sources and 57% synthetic data produced by 20 AI models. We prioritize privacy by avoiding personal data unless explicitly required for service delivery.</p>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">1.1 Publicly Available Data Seeds</h3>
          <p className="text-slate-700">Sources: We collect non-personal, aggregated data from trusted public sources, ensuring compliance with source terms:</p>
          <ul className="list-disc list-inside text-slate-700 ml-4">
            <li>CHANGES: World Health Organization (WHO) RSS feeds, Johns Hopkins University CSV files (e.g., epidemiological trends).</li>
            <li>POISON: Federal Bureau of Investigation (FBI) HTML pages, Interpol CSV datasets (e.g., crime statistics).</li>
            <li>STRIVE: RAND Corporation HTML reports, United Nations (UN) JSON data (e.g., strategic intelligence).</li>
            <li>HYDRA: National Fire Protection Association (NFPA) PDFs, Federal Emergency Management Agency (FEMA) CSVs (e.g., fire incident data).</li>
            <li>SIREN: National Emergency Medical Services Information System (NEMSIS) JSON, WHO RSS (e.g., EMS metrics).</li>
            <li>REFORM: Bureau of Justice Statistics (BJS) CSVs, United Nations Office on Drugs and Crime (UNODC) HTML (e.g., rehabilitation metrics).</li>
            <li>INSURE: National Association of Insurance Commissioners (NAIC) PDFs, Lloyd's HTML (e.g., insurance risk data).</li>
            <li>SHIELD: Cybersecurity and Infrastructure Security Agency (CISA) RSS feeds, National Institute of Standards and Technology (NIST) JSON (e.g., cyber threats).</li>
          </ul>
          <p className="text-slate-700 mt-2">Nature: These datasets are free of personally identifiable information (PII) or protected health information (PHI), aligning with HIPAA, UK GDPR, and MoD requirements for sensitive sectors.</p>
          <p className="text-slate-700 mt-2">Method: Automated scraping via data_pipeline.py with multi-format parsing (RSS, CSV, JSON, PDF, HTML) and rate-limiting, hosted on Netlify servers.</p>

          <h3 className="text-lg font-semibold text-slate-900 mb-2">1.2 Synthetic Data</h3>
          <p className="text-slate-700">Generation: 57% of data is synthetic, created by AI models (e.g., DistilBERT, GPT-2, CTGAN, Prophet, T5-Small, IsolationForest, ARIMA, Node2Vec, VAE) to simulate realistic scenarios (e.g., healthcare outbreaks, military strategies, cyber threats).</p>
          <p className="text-slate-700 mt-2">Privacy Advantage: Synthetic data eliminates personal data risks, supporting compliance with GDPR Article 5(1)(c) (data minimization) and HIPAA (no PHI).</p>
          <p className="text-slate-700 mt-2">Add-Ons: 4 core (sentimentDynamics, behaviorPrediction, environmentalImpact, resourceOptimization) and 4 premium (network, optimization, clustering, forecasting) add-ons enhance utility while maintaining privacy.</p>
          <p className="text-slate-700 mt-2">Compliance Benefit: Our synthetic data helps clients meet MoD JSP 440, NIST SP 800-53, and ISO 27001 by providing secure, realistic datasets for analytics without compromising sensitive information.</p>

          <h3 className="text-lg font-semibold text-slate-900 mb-2">1.3 User Data</h3>
          <p className="text-slate-700">Marketplace Interactions: Minimal personal data (name, email, billing details) is collected for account creation, payments, and support via government.auspexi.com or auspexi.com/data-suites.</p>
          <p className="text-slate-700 mt-2">Analytics: Anonymized website usage data (e.g., page views, IP addresses) is collected via cookies and tools like Google Analytics to improve services, compliant with UK GDPR consent requirements.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">2. Data Use</h2>
          <p className="text-slate-700">Dataset Creation: Public seeds are processed locally to generate synthetic datasets, anonymized via SHA-256 hashing to ensure irreversibility.</p>
          <p className="text-slate-700 mt-2">Client Compliance: Datasets support client compliance with:</p>
          <ul className="list-disc list-inside text-slate-700 ml-4">
            <li>Healthcare (CHANGES, SIREN): HIPAA, UK NHS Data Security Standards.</li>
            <li>Military (STRIVE): MoD JSP 440, NATO STANAG.</li>
            <li>Policing (POISON): US DOJ Privacy Guidelines, UK NPCC Data Protection.</li>
            <li>Cybersecurity (SHIELD): NIST SP 800-53, CISA Binding Operational Directives.</li>
          </ul>
          <p className="text-slate-700 mt-2">Service Delivery: User data facilitates payments, dataset access, and support.</p>
          <p className="text-slate-700 mt-2">Improvement: Anonymized analytics optimize pipeline performance.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">3. Privacy and Security Measures</h2>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">3.1 Data Minimization</h3>
          <p className="text-slate-700">Only non-personal public data and minimal user data are collected, per UK GDPR Article 5(1)(c) and CCPA. Synthetic data reduces real data reliance, aligning with ISO 27001 risk management.</p>

          <h3 className="text-lg font-semibold text-slate-900 mb-2">3.2 Anonymization</h3>
          <p className="text-slate-700">SHA-256 Hashing: Applied to 43% real/enhanced data (sha256(data_str.encode()).hexdigest()), with logs (hashed[:10]...) for transparency, meeting NIST FIPS 180-4 standards.</p>
          <p className="text-slate-700 mt-2">Zero-Knowledge Proofs (ZKPs): Mock ZKPs implemented, with full zk-SNARKs (circom) and differential privacy (diffprivlib) planned for Q4 2025, supporting MoD and CISA encryption requirements.</p>
          <p className="text-slate-700 mt-2">No PII/PHI: Ensures HIPAA and UK GDPR compliance.</p>

          <h3 className="text-lg font-semibold text-slate-900 mb-2">3.3 Local Processing</h3>
          <p className="text-slate-700">AI models run on Netlify servers (UK/EU/US), avoiding external APIs, per ISO 27001 and NIST SP 800-171. Data stored in Supabase with AES-256 encryption at rest and TLS 1.3 in transit.</p>

          <h3 className="text-lg font-semibold text-slate-900 mb-2">3.4 Data Retention</h3>
          <p className="text-slate-700">Public/Synthetic Data: Retained indefinitely (no PII/PHI). User Data: Kept for account duration or legal requirements (e.g., 7 years for UK tax law). Deletion available on request. Compliance: Aligns with UK GDPR Article 5(1)(e) and CCPA.</p>

          <h3 className="text-lg font-semibold text-slate-900 mb-2">3.5 Security</h3>
          <p className="text-slate-700">Access Controls: Role-based, multi-factor authentication, per ISO 27001. Audits: Regular reviews of data_pipeline.py, enhanced-cron-collect.ts. Incident Response: 72-hour breach notification, per UK GDPR Article 33.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">4. Global Compliance</h2>
          <p className="text-slate-700">Our synthetic-first approach ensures compliance with:</p>
          <ul className="list-disc list-inside text-slate-700 ml-4">
            <li>UK GDPR/EU GDPR: Lawful basis (legitimate interests for public data, consent/contract for user data), user rights, Data Protection Officer (sales@auspexi.com).</li>
            <li>HIPAA: No PHI; public health data (e.g., WHO) is non-identifiable.</li>
            <li>CCPA: No personal data sales; disclosure/deletion rights.</li>
            <li>ISO 27001: Information security management for all suites.</li>
            <li>NIST SP 800-53: Cybersecurity controls for SHIELD, STRIVE.</li>
            <li>MoD JSP 440: Defence security standards for STRIVE.</li>
            <li>CISA Directives: Cyber threat modeling for SHIELD.</li>
            <li>Other: Canada's PIPEDA, Brazil's LGPD, Australia's Privacy Act 1988, Japan's APPI.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">5. Client Compliance Support</h2>
          <p className="text-slate-700">Our datasets help clients meet their compliance needs:</p>
          <ul className="list-disc list-inside text-slate-700 ml-4">
            <li>Healthcare: CHANGES/SIREN datasets support NHS DSPT, HIPAA analytics without PHI risks.</li>
            <li>Military/Intelligence: STRIVE aligns with MoD, NATO, providing synthetic scenarios for secure simulations.</li>
            <li>Policing: POISON meets NPCC, DOJ standards with anonymized sentiment data.</li>
            <li>Cybersecurity: SHIELD complies with CISA, NIST, enabling threat modeling without real data exposure.</li>
            <li>Insurance: INSURE/SHIELD supports NAIC, Solvency II risk assessments.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">6. User Rights</h2>
          <p className="text-slate-700">Under UK GDPR and CCPA, users have rights to:</p>
          <ul className="list-disc list-inside text-slate-700 ml-4">
            <li>Access: Request data we hold about them.</li>
            <li>Rectification: Correct inaccurate data.</li>
            <li>Erasure: Request data deletion.</li>
            <li>Portability: Receive data in machine-readable format.</li>
            <li>Objection: Object to processing.</li>
            <li>Restriction: Limit processing.</li>
          </ul>
          <p className="text-slate-700 mt-2">Contact: sales@auspexi.com for rights requests.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">7. Contact Information</h2>
          <p className="text-slate-700">Data Protection Lead: sales@auspexi.com</p>
          <p className="text-slate-700">General Inquiries: sales@auspexi.com</p>
          <p className="text-slate-700">Address: Auspexi Ltd, London, United Kingdom</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">8. Data Processing Addendum (DPA)</h2>
          <p className="text-slate-700">For enterprise customers where we act as a Processor, our <a href="/dpa" className="text-blue-600 underline">Data Processing Addendum</a> applies. It includes SCCs (EU), UK IDTA addendum, subprocessor list on request, data transfer mechanisms, security measures, and incident response.</p>
        </section>
      </div>
    </div>
  </div>
);

export default PrivacyPolicy;
