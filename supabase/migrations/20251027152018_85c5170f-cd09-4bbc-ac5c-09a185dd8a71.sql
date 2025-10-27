-- Update profile for info@dlinrt.eu with first and last name
UPDATE profiles 
SET 
  first_name = 'DLinRT',
  last_name = 'Support',
  updated_at = now()
WHERE email = 'info@dlinrt.eu';