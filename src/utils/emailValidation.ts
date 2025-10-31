/**
 * Email Validation Utilities
 * Enforces institutional email requirements for DLinRT platform
 */

const INSTITUTIONAL_DOMAINS = [
  '.edu',
  '.ac.uk',
  '.ac.',
  '.edu.',
  '.org',
  '.gov',
  '.nhs.uk',
  '.university',
  '.research',
  '.ac.au',
  '.ac.nz',
  '.edu.au',
  '.ac.jp',
  '.ac.kr',
  '.ac.cn',
  '.ac.in',
  '.ac.za',
  '.edu.sg',
  '.edu.my',
  '.ac.il',
  '.ac.th',
  '.uni-',
  '.univ-',
  '.hospital',
  '.cancer',
  '.clinic',
  '.medical'
];

const BLOCKED_PERSONAL_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'live.com',
  'icloud.com',
  'aol.com',
  'protonmail.com',
  'mail.com',
  'zoho.com',
  'yandex.com',
  'gmx.com'
];

/**
 * Checks if an email address is from an institutional domain
 * @param email - The email address to validate
 * @returns true if the email is from an institutional domain, false otherwise
 */
export const isInstitutionalEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') {
    return false;
  }

  const emailLower = email.toLowerCase().trim();
  
  // Check if it's a blocked personal domain
  const domain = emailLower.split('@')[1];
  if (BLOCKED_PERSONAL_DOMAINS.includes(domain)) {
    return false;
  }

  // Check if it contains any institutional domain patterns
  return INSTITUTIONAL_DOMAINS.some(inst => emailLower.includes(inst));
};

/**
 * Gets a user-friendly error message for non-institutional emails
 * @param email - The email address that failed validation
 * @returns A formatted error message
 */
export const getInstitutionalEmailError = (email: string): string => {
  const domain = email.split('@')[1]?.toLowerCase();
  
  if (BLOCKED_PERSONAL_DOMAINS.includes(domain)) {
    return `Personal email addresses (like ${domain}) are not allowed. Please use your institutional email address from your university, hospital, research center, or company.`;
  }
  
  return 'Please use an institutional email address (.edu, .ac.uk, .org, .gov, etc.) from your university, hospital, research center, or company. Personal email addresses are not accepted.';
};

/**
 * Validates email format and institutional requirement
 * @param email - The email address to validate
 * @returns Object with isValid flag and optional error message
 */
export const validateInstitutionalEmail = (email: string): { isValid: boolean; error?: string } => {
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address.' };
  }

  // Check institutional requirement
  if (!isInstitutionalEmail(email)) {
    return { isValid: false, error: getInstitutionalEmailError(email) };
  }

  return { isValid: true };
};
