import React, { useEffect, useState } from 'react';
import { assertSupabase } from '../../services/supabaseClient';
import PlatformAccess from '../Billing/PlatformAccess';

const AuthPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const sb = assertSupabase();
        const { data: { user } } = await sb.auth.getUser();
        setUserEmail(user?.email || null);
      } catch {}
    })();
  }, []);

  const sendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const sb = assertSupabase();
      const { error } = await sb.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin } });
      if (error) throw error;
      setStatus('Check your email for the login link.');
    } catch (err: any) {
      setStatus(err?.message || 'Failed to send link');
    }
  };

  const logout = async () => {
    try {
      const sb = assertSupabase();
      await sb.auth.signOut();
      setUserEmail(null);
    } catch {}
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white border rounded">
      <h2 className="text-xl font-semibold mb-4">Account</h2>
      {userEmail ? (
        <div className="space-y-3">
          <div>Signed in as <span className="font-mono">{userEmail}</span></div>
          <button className="px-3 py-1 rounded bg-slate-700 text-white" onClick={logout}>Logout</button>
          <div className="pt-4">
            <PlatformAccess userEmail={userEmail} />
          </div>
        </div>
      ) : (
        <form onSubmit={sendMagicLink} className="space-y-3">
          <label className="block text-sm">Email</label>
          <input
            type="email"
            className="border rounded px-3 py-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="px-3 py-2 rounded bg-blue-600 text-white" type="submit">Send magic link</button>
          {status && <div className="text-sm text-slate-600">{status}</div>}
        </form>
      )}
    </div>
  );
};

export default AuthPage;


