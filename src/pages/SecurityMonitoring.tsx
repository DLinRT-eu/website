import React from 'react';
import SEO from '@/components/SEO';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SecurityDashboard } from '@/components/security/SecurityDashboard';
import { SecurityHeadersValidator } from '@/components/security/SecurityHeadersValidator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Eye, AlertTriangle } from 'lucide-react';

const SecurityMonitoring: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Security Monitoring - DLinRT.eu"
        description="Comprehensive security monitoring dashboard for DLinRT.eu"
        canonical="/security-monitoring"
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <Shield className="h-10 w-10 text-primary" />
            Security Monitoring
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Real-time security monitoring, threat detection, and security posture assessment for DLinRT.eu
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="headers" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Headers
            </TabsTrigger>
            <TabsTrigger value="policies" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Policies
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Alerts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <SecurityDashboard />
          </TabsContent>

          <TabsContent value="headers">
            <SecurityHeadersValidator />
          </TabsContent>

          <TabsContent value="policies" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Policies Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Rate Limiting</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Contact Form: 3 attempts per 5 minutes</li>
                      <li>• Newsletter Signup: Database constraints</li>
                      <li>• Security Events: 10 events per minute</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Data Protection</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• IP addresses are hashed for privacy</li>
                      <li>• User agents are truncated and hashed</li>
                      <li>• PII is redacted from security logs</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Database Security</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Row Level Security (RLS) enabled</li>
                      <li>• Service role restrictions</li>
                      <li>• Automated data cleanup (6 months)</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Monitoring</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Real-time threat detection</li>
                      <li>• Automated security event logging</li>
                      <li>• Suspicious activity detection</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Alert Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2 text-destructive">Critical Alerts</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Multiple failed authentication attempts</li>
                      <li>• SQL injection attempts detected</li>
                      <li>• XSS payload attempts</li>
                      <li>• Suspicious bot activity</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2 text-orange-500">High Priority</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Rate limit violations</li>
                      <li>• Unusual traffic patterns</li>
                      <li>• Form submission anomalies</li>
                      <li>• Repeated failed requests</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2 text-yellow-500">Medium Priority</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Form submission failures</li>
                      <li>• Invalid input attempts</li>
                      <li>• Outdated browser warnings</li>
                      <li>• Cookie consent issues</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2 text-blue-500">Low Priority</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• General analytics events</li>
                      <li>• Performance monitoring</li>
                      <li>• User experience tracking</li>
                      <li>• Feature usage statistics</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold mb-2">Alert Response Procedures</h3>
                  <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                    <li>Immediate logging of security events to database</li>
                    <li>Real-time console logging for development monitoring</li>
                    <li>Automatic rate limiting for repeated violations</li>
                    <li>Privacy-preserving data collection (hashed IPs/UAs)</li>
                    <li>Graceful degradation - security never blocks user experience</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SecurityMonitoring;