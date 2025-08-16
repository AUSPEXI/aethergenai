/*
  # Stripe Integration Database Schema

  1. New Tables
    - `customers`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `name` (text)
      - `stripe_customer_id` (text, unique)
      - `stripe_subscription_id` (text, unique)
      - `plan_type` (text)
      - `subscription_status` (text)
      - `current_period_start` (timestamptz)
      - `current_period_end` (timestamptz)
      - `cancelled_at` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `subscription_events`
      - `id` (uuid, primary key)
      - `customer_email` (text)
      - `event_type` (text)
      - `stripe_event_id` (text, unique)
      - `stripe_session_id` (text)
      - `stripe_invoice_id` (text)
      - `stripe_subscription_id` (text)
      - `plan_type` (text)
      - `amount` (integer)
      - `currency` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated access
    - Add policies for service role access

  3. Indexes
    - Add indexes for frequently queried columns
*/

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  stripe_customer_id text UNIQUE,
  stripe_subscription_id text UNIQUE,
  plan_type text DEFAULT 'basic',
  subscription_status text DEFAULT 'inactive',
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancelled_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create subscription events table for logging
CREATE TABLE IF NOT EXISTS subscription_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_email text,
  event_type text NOT NULL,
  stripe_event_id text UNIQUE NOT NULL,
  stripe_session_id text,
  stripe_invoice_id text,
  stripe_subscription_id text,
  plan_type text,
  amount integer,
  currency text DEFAULT 'gbp',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_events ENABLE ROW LEVEL SECURITY;

-- Create policies for customers table
CREATE POLICY "Users can read own customer data"
  ON customers
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = email);

CREATE POLICY "Users can update own customer data"
  ON customers
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'email' = email);

CREATE POLICY "Service role can manage all customer data"
  ON customers
  FOR ALL
  TO service_role
  USING (true);

-- Create policies for subscription_events table
CREATE POLICY "Users can read own subscription events"
  ON subscription_events
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = customer_email);

CREATE POLICY "Service role can manage all subscription events"
  ON subscription_events
  FOR ALL
  TO service_role
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_stripe_customer_id ON customers(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_customers_stripe_subscription_id ON customers(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_customers_subscription_status ON customers(subscription_status);

CREATE INDEX IF NOT EXISTS idx_subscription_events_customer_email ON subscription_events(customer_email);
CREATE INDEX IF NOT EXISTS idx_subscription_events_stripe_event_id ON subscription_events(stripe_event_id);
CREATE INDEX IF NOT EXISTS idx_subscription_events_event_type ON subscription_events(event_type);
CREATE INDEX IF NOT EXISTS idx_subscription_events_created_at ON subscription_events(created_at);

-- Create updated_at trigger for customers table
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_customers_updated_at 
  BEFORE UPDATE ON customers 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();