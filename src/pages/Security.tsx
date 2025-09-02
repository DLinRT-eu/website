import React from 'react';
import { Shield, Lock, Check, Server, Globe, Eye, CheckCircle, Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SEO from '@/components/SEO';
import Footer from '@/components/Footer';

const Security = () => {
  const securityFeatures = [
    {
      icon: Lock,
      title: "HTTPS & Transport Security",
      description: "All data transmission secured with TLS 1.3 encryption and HSTS headers",
      status: "Enabled",
      details: ["Strict-Transport-Security header", "Secure cookie flags", "Certificate pinning"]
    },
    {
      icon: Shield,
      title: "Content Security Policy",
      description: "Comprehensive CSP protecting against XSS and code injection attacks",
      status: "Enabled", 
      details: ["Script source restrictions", "Frame ancestors blocked", "Object source denied"]
    },
    {
      icon: Eye,
      title: "Privacy Protection",
      description: "User data minimization and privacy-preserving analytics",
      status: "Enabled",
      details: ["IP address hashing", "No personal data collection", "GDPR compliant"]
    },
    {
      icon: Server,
      title: "Infrastructure Security",
      description: "Secure hosting with automated security monitoring",
      status: "Enabled",
      details: ["Regular security updates", "Automated backups", "DDoS protection"]
    },
    {
      icon: Database,
      title: "Database Security",
      description: "Row Level Security (RLS) and encrypted data storage",
      status: "Enabled",
      details: ["PostgreSQL RLS policies", "Encrypted at rest", "Access logging"]
    },
    {
      icon: Globe,
      title: "Cross-Origin Protection",
      description: "CORS policies and frame protection against clickjacking",
      status: "Enabled",
      details: ["Same-origin resource policy", "Cross-origin embedder policy", "Frame options deny"]
    }
  ];

  const securityHeaders = [
    { name: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload", status: "pass" },
    { name: "X-Content-Type-Options", value: "nosniff", status: "pass" },
    { name: "X-Frame-Options", value: "DENY", status: "pass" },
    { name: "X-XSS-Protection", value: "1; mode=block", status: "pass" },
    { name: "Referrer-Policy", value: "strict-origin-when-cross-origin", status: "pass" },
    { name: "Content-Security-Policy", value: "Comprehensive policy blocking unsafe sources", status: "pass" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Security & Certifications - SSL, GDPR, Data Protection | DLinRT.eu"
        description="Comprehensive security measures, SSL/TLS certificates, GDPR compliance, and data protection standards for DLinRT.eu. Learn about our EU-hosted infrastructure and security monitoring."
        canonical="/security"
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <Shield className="h-10 w-10 text-primary" />
            Security & Certifications
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            DLinRT.eu implements enterprise-grade security measures to protect user data and ensure platform integrity.
          </p>
        </div>

        {/* Security Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {securityFeatures.map((feature) => (
            <Card key={feature.title} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <feature.icon className="h-6 w-6 text-primary" />
                  <span className="text-lg">{feature.title}</span>
                  <Badge variant="default" className="bg-green-500 ml-auto">
                    {feature.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <ul className="space-y-1">
                  {feature.details.map((detail, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Security Headers */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Security Headers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityHeaders.map((header) => (
                <div key={header.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{header.name}</div>
                    <div className="text-sm text-muted-foreground">{header.value}</div>
                  </div>
                  <Badge variant="default" className="bg-green-500">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Policies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Data Protection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">No personal data collection without consent</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">IP addresses are hashed for privacy</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">GDPR compliant data handling</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Automated data cleanup policies</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Monitoring</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Real-time threat detection</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Automated security event logging</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Rate limiting and bot protection</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Suspicious activity detection</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Compliance Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Compliance & Standards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">GDPR Compliance</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Explicit consent mechanisms
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Right to erasure (right to be forgotten)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Data portability rights
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Privacy by design
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Data Protection</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    End-to-end encryption
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Secure data storage (EU-hosted)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Automatic data retention limits
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
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
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Certificate Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-4">
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

        {/* Security Contact */}
        <Card>
          <CardHeader>
            <CardTitle>Security Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              If you discover a security vulnerability or have security-related concerns, please contact our security team.
            </p>
            <div className="space-y-2">
              <p><strong>Security Email:</strong> info@dlinrt.eu</p>
              <p><strong>Response Time:</strong> Within 24 hours for critical issues</p>
              <p><strong>PGP Key:</strong> Available upon request</p>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Security;