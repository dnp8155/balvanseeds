-- Newsletter subscribers table for Balavan Agro
-- Run this in Supabase Dashboard → SQL Editor

-- updated_at trigger function (safe to re-run if already exists)
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email        TEXT NOT NULL UNIQUE,
  source_page  TEXT,
  status       TEXT NOT NULL DEFAULT 'subscribed',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row-Level Security
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Public can INSERT (subscribe). No public reads — admin only.
DROP POLICY IF EXISTS "newsletter_public_insert" ON newsletter_subscribers;
CREATE POLICY "newsletter_public_insert" ON newsletter_subscribers
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Only authenticated (admin) can read/update/delete
DROP POLICY IF EXISTS "newsletter_admin_read" ON newsletter_subscribers;
CREATE POLICY "newsletter_admin_read" ON newsletter_subscribers
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "newsletter_admin_update" ON newsletter_subscribers;
CREATE POLICY "newsletter_admin_update" ON newsletter_subscribers
  FOR UPDATE TO authenticated USING (true);

DROP POLICY IF EXISTS "newsletter_admin_delete" ON newsletter_subscribers;
CREATE POLICY "newsletter_admin_delete" ON newsletter_subscribers
  FOR DELETE TO authenticated USING (true);

-- Index for quick lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_status ON newsletter_subscribers(status);
CREATE INDEX IF NOT EXISTS idx_newsletter_created ON newsletter_subscribers(created_at DESC);

-- updated_at trigger
CREATE OR REPLACE TRIGGER set_newsletter_updated_at
  BEFORE UPDATE ON newsletter_subscribers
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();