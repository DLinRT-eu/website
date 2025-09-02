import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { AlertTriangle, Shield, Clock, CheckCircle, X } from 'lucide-react';

interface SecurityAlert {
  id: string;
  event_type: string;
  severity: string;
  details: any;
  created_at: string;
  resolved_at: string | null;
  notes: string | null;
}

interface AlertThreshold {
  type: string;
  count: number;
  timeWindow: string;
  severity: string;
}

const ALERT_THRESHOLDS: AlertThreshold[] = [
  { type: 'rate_limit_exceeded', count: 5, timeWindow: '10 minutes', severity: 'high' },
  { type: 'suspicious_request', count: 3, timeWindow: '5 minutes', severity: 'critical' },
  { type: 'bot_detection', count: 10, timeWindow: '1 hour', severity: 'medium' },
  { type: 'malicious_payload', count: 1, timeWindow: '1 minute', severity: 'critical' }
];

export const SecurityAlertSystem: React.FC = () => {
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [activeThreats, setActiveThreats] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    fetchSecurityAlerts();
    const interval = setInterval(fetchSecurityAlerts, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchSecurityAlerts = async () => {
    try {
      // Get unresolved critical and high severity events from last 24 hours
      const { data: alertData, error } = await supabase
        .from('security_events')
        .select('*')
        .is('resolved_at', null)
        .in('severity', ['critical', 'high'])
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
        .order('created_at', { ascending: false });

      if (error) throw error;

      setAlerts(alertData || []);
      setActiveThreats(alertData?.filter(alert => alert.severity === 'critical').length || 0);
    } catch (error: any) {
      console.error('Error fetching security alerts:', error);
      if (error?.code === '42501' || String(error?.message || error).includes('permission denied')) {
        setAccessDenied(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const resolveAlert = async (alertId: string) => {
    try {
      const { error } = await supabase
        .from('security_events')
        .update({ 
          resolved_at: new Date().toISOString(),
          notes: 'Manually resolved via Security Alert System'
        })
        .eq('id', alertId);

      if (error) throw error;

      // Refresh alerts
      fetchSecurityAlerts();
    } catch (error) {
      console.error('Error resolving alert:', error);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="h-4 w-4" />;
      case 'high': return <Shield className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-1/3"></div>
            <div className="h-8 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (accessDenied) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Access to security alerts is restricted. Please sign in as an authorized security user to view this section.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Active Threats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Threats</p>
                <p className={`text-2xl font-bold ${activeThreats > 0 ? 'text-destructive' : 'text-green-500'}`}>
                  {activeThreats}
                </p>
              </div>
              {activeThreats > 0 ? (
                <AlertTriangle className="h-8 w-8 text-destructive" />
              ) : (
                <CheckCircle className="h-8 w-8 text-green-500" />
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Alerts (24h)</p>
                <p className="text-2xl font-bold">{alerts.length}</p>
              </div>
              <Shield className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High Priority</p>
                <p className="text-2xl font-bold text-orange-500">
                  {alerts.filter(a => a.severity === 'high').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Critical Threat Warning */}
      {activeThreats > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {activeThreats} critical security threat(s) require immediate attention. 
            Review and resolve alerts below.
          </AlertDescription>
        </Alert>
      )}

      {/* Alert Thresholds Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Alert Thresholds
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ALERT_THRESHOLDS.map((threshold, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{threshold.type.replace(/_/g, ' ')}</span>
                  <Badge className={getSeverityColor(threshold.severity)}>
                    {threshold.severity}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Alert after {threshold.count} events in {threshold.timeWindow}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Active Security Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <p className="text-muted-foreground">No active security alerts</p>
                <p className="text-sm text-muted-foreground mt-1">
                  All security events have been resolved or are below alert thresholds
                </p>
              </div>
            ) : (
              alerts.map((alert) => (
                <div 
                  key={alert.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {getSeverityIcon(alert.severity)}
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {alert.event_type.replace(/_/g, ' ')}
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(alert.created_at).toLocaleString()}
                      </div>
                      {alert.details && (
                        <div className="text-xs text-muted-foreground mt-1">
                          {JSON.stringify(alert.details, null, 0).substring(0, 100)}...
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => resolveAlert(alert.id)}
                    className="flex items-center gap-1"
                  >
                    <X className="h-3 w-3" />
                    Resolve
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};