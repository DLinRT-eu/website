-- Add is_core_team column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN is_core_team BOOLEAN DEFAULT false;

-- Set existing core team members
UPDATE public.profiles
SET is_core_team = true
WHERE email IN (
  'matteo.maspero@dlinrt.eu',
  'mustafa.kadhim@dlinrt.eu',
  'ana.barragan@dlinrt.eu',
  'paul.doolan@dlinrt.eu',
  'federico.mastroleo@dlinrt.eu',
  'viktor.rogowski@dlinrt.eu',
  'info@dlinrt.eu'
);

-- Add comment for documentation
COMMENT ON COLUMN public.profiles.is_core_team IS 'Core team members bypass account approval checks';