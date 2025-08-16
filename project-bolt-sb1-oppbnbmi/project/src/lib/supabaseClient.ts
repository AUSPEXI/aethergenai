import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// More detailed logging for debugging
console.log('Supabase Environment Check:');
console.log('URL exists:', !!supabaseUrl);
console.log('Key exists:', !!supabaseAnonKey);
console.log('URL value:', supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'undefined');
console.log('Key value:', supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'undefined');

let supabase;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase configuration is incomplete!');
  console.error('Missing environment variables:');
  if (!supabaseUrl) console.error('  - VITE_SUPABASE_URL');
  if (!supabaseAnonKey) console.error('  - VITE_SUPABASE_ANON_KEY');
  console.error('');
  console.error('For local development:');
  console.error('1. Create a .env file in the project root');
  console.error('2. Add your Supabase credentials:');
  console.error('   VITE_SUPABASE_URL=https://jzxhcbhhivsywizbfewe.supabase.co');
  console.error('   VITE_SUPABASE_ANON_KEY=your-anon-key');
  console.error('');
  console.error('For Netlify deployment:');
  console.error('1. Go to Site settings > Environment variables');
  console.error('2. Add the same variables there');
  
  // Create a dummy client to prevent crashes, but it will fail gracefully
  supabase = createClient('https://dummy.supabase.co', 'dummy-key');
} else {
  console.log('✅ Supabase client initialized successfully');
  
  // Create client with additional options for better error handling
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false, // Disable session persistence for now
      autoRefreshToken: false,
    },
    global: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });

  // Test the connection
  supabase
    .from('pdf_documents')
    .select('count', { count: 'exact', head: true })
    .then(({ error, count }) => {
      if (error) {
        console.error('❌ Supabase connection test failed:', error.message);
        console.error('Error details:', error);
      } else {
        console.log('✅ Supabase connection test successful. Records found:', count);
      }
    })
    .catch((err) => {
      console.error('❌ Supabase connection test error:', err);
    });
}

// Helper function to add cache-busting to PDF URLs
export const addCacheBuster = (url: string): string => {
  if (!url) return url;
  
  // Add timestamp as query parameter to force cache refresh
  const separator = url.includes('?') ? '&' : '?';
  const timestamp = Date.now();
  return `${url}${separator}v=${timestamp}`;
};

export { supabase };