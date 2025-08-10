import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-slate-200">
      <h1 className="text-3xl font-extrabold mb-4">Privacy Policy</h1>
      <p className="mb-6 text-slate-300">Last updated: {new Date().toLocaleDateString()}</p>

      <p className="mb-4">AethergenAI ("we", "our", "us") respects your privacy. This policy explains what we collect, why we collect it, and how you can exercise your rights. It applies to the AethergenAI web app and related services.</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Data We Collect</h2>
      <ul className="list-disc pl-6 space-y-1 text-slate-300">
        <li>Account information (name, email) where provided for authentication or contact forms.</li>
        <li>Operational data you upload or generate locally in the app (schemas, recipes, metrics). By default, this remains in your browser unless you explicitly export or connect to a backend.</li>
        <li>Payment information is handled by Stripe. We do not store full card details on our servers.</li>
        <li>Diagnostic logs and minimal analytics to improve reliability and security.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">How We Use Data</h2>
      <ul className="list-disc pl-6 space-y-1 text-slate-300">
        <li>To operate core features (generation, benchmarking, purchases).</li>
        <li>To provide support and respond to enquiries.</li>
        <li>To improve performance, security, and user experience.</li>
        <li>To comply with legal obligations.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">Security</h2>
      <p className="mb-4">We adopt security-by-design principles: in‑browser processing by default, optional offline mode, and evidence bundles that avoid exposing proprietary inputs. When enabled, server‑side storage uses role‑based access and encryption in transit and at rest.</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Your Rights</h2>
      <p className="mb-4">You may request access, correction, or deletion of your personal data. Contact <a className="text-emerald-400 underline" href="mailto:privacy@auspexi.com">privacy@auspexi.com</a>.</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Third Parties</h2>
      <ul className="list-disc pl-6 space-y-1 text-slate-300">
        <li>Stripe for payments and subscriptions</li>
        <li>Databricks (optional) for Marketplace listings and MLflow where configured</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">Contact</h2>
      <p className="mb-2">AUSPEXI Ltd, 123 Data Lane, London EC1A 1AA, UK</p>
      <p>Email: <a className="text-emerald-400 underline" href="mailto:info@auspexi.com">info@auspexi.com</a></p>
    </div>
  );
};

export default PrivacyPolicy;



