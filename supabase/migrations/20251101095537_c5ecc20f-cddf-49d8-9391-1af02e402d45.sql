-- Create table for company product verifications
CREATE TABLE IF NOT EXISTS company_product_verifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id text NOT NULL,
  company_id text NOT NULL,
  verified_by uuid REFERENCES auth.users(id),
  verified_at timestamptz DEFAULT now(),
  verification_notes text,
  supporting_documents jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(product_id, company_id)
);

-- Enable RLS
ALTER TABLE company_product_verifications ENABLE ROW LEVEL SECURITY;

-- Companies can manage own verifications
CREATE POLICY "Companies can manage own verifications"
ON company_product_verifications
FOR ALL
USING (
  company_id IN (
    SELECT company_id FROM company_representatives
    WHERE user_id = auth.uid() AND verified = true
  )
);

-- Public can view verifications
CREATE POLICY "Public can view verifications"
ON company_product_verifications
FOR SELECT
USING (true);

-- Create updated_at trigger
CREATE TRIGGER update_company_verifications_updated_at
  BEFORE UPDATE ON company_product_verifications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();