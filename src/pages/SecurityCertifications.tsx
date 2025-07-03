import React from 'react';
import { Shield, Lock, Check, Server, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SEO from '@/components/SEO';
import Footer from '@/components/Footer';

const SecurityCertifications = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Security Certifications & Compliance Standards - SSL, GDPR, Data Protection"
        description="Comprehensive security measures, SSL/TLS certificates, GDPR compliance, and data protection standards for DLinRT.eu. Learn about our EU-hosted infrastructure and security monitoring."
        canonical="https://dlinrt.eu/security"
      />
      
      <main className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="h-8 w-8 text-[#00A6D6]" />
          <h1 className="text-3xl font-bold">Security & Certifications</h1>
        </div>
        
        <p className="text-gray-600 mb-8">
          Information about our security measures, compliance standards, and certifications 
          to ensure your data safety and privacy.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* SSL/TLS Certificate */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-green-600" />
                SSL/TLS Certificate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">TLS 1.3 Encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">256-bit SSL Certificate</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">HTTPS Everywhere</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">HSTS Enabled</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Headers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5 text-blue-600" />
                Security Headers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Content Security Policy (CSP)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">X-Frame-Options: DENY</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">X-Content-Type-Options</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Referrer Policy</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Compliance Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-purple-600" />
              Compliance & Standards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">GDPR Compliance</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Explicit consent mechanisms
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Right to erasure (right to be forgotten)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Data portability rights
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Privacy by design
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Data Protection</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    End-to-end encryption
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Secure data storage (EU-hosted)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Automatic data retention limits
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Regular security audits
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Details */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Technical Security Measures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-gray max-w-none">
              <h3 className="text-lg font-semibold mb-3">Infrastructure Security</h3>
              <ul className="mb-6">
                <li><strong>Hosting:</strong> EU-based infrastructure with SOC 2 compliance</li>
                <li><strong>CDN:</strong> Global content delivery with DDoS protection</li>
                <li><strong>Database:</strong> Encrypted at rest and in transit</li>
                <li><strong>Backups:</strong> Automated, encrypted, and geographically distributed</li>
              </ul>

              <h3 className="text-lg font-semibold mb-3">Application Security</h3>
              <ul className="mb-6">
                <li><strong>Authentication:</strong> Secure session management</li>
                <li><strong>Authorization:</strong> Role-based access control</li>
                <li><strong>Input Validation:</strong> Server-side validation and sanitization</li>
                <li><strong>XSS Protection:</strong> Content Security Policy and output encoding</li>
              </ul>

              <h3 className="text-lg font-semibold mb-3">Monitoring & Incident Response</h3>
              <ul>
                <li><strong>24/7 Monitoring:</strong> Automated security monitoring and alerting</li>
                <li><strong>Incident Response:</strong> Defined procedures for security incidents</li>
                <li><strong>Regular Updates:</strong> Automated security patches and updates</li>
                <li><strong>Penetration Testing:</strong> Regular third-party security assessments</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Certificate Information */}
        <Card>
          <CardHeader>
            <CardTitle>Certificate Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-4">
                Our SSL certificate provides end-to-end encryption for all data transmitted between 
                your browser and our servers. You can verify our certificate by clicking the lock 
                icon in your browser's address bar.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Certificate Authority:</strong> Let's Encrypt / Lovable
                </div>
                <div>
                  <strong>Encryption Level:</strong> 256-bit SSL
                </div>
                <div>
                  <strong>Protocol:</strong> TLS 1.3
                </div>
                <div>
                  <strong>Auto-Renewal:</strong> Enabled
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Questions about security?</strong> Contact our security team at info@dlinrt.eu 
            for any security-related inquiries or to report potential vulnerabilities.
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SecurityCertifications;