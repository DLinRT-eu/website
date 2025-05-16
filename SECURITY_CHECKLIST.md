# Security Checklist for DLinRT.eu

- [x] All external links use rel="noopener noreferrer" when target="_blank"
- [x] User input is validated and sanitized (search, filters, forms)
- [x] Dependencies are regularly audited (see CI)
- [x] No secrets or credentials are committed to the repo
- [x] Data files are checked for consistency and correctness
- [x] Error boundaries are used for critical UI components
- [x] All forms use proper CSRF and XSS protections (where applicable)
- [x] Security policy is documented in SECURITY.md
