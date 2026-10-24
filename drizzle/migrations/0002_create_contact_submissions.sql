CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  email TEXT NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  message TEXT NOT NULL CHECK (char_length(message) BETWEEN 1 AND 2000),
  ip_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT ALL ON public.contact_submissions TO service_role;

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE INDEX contact_submissions_ip_created_idx ON public.contact_submissions (ip_hash, created_at DESC);