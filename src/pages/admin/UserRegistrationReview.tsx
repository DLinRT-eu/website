import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, XCircle, Clock, Mail, Building2, User, Calendar, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface RegistrationNotification {
  id: string;
  user_id: string;
  email: string;
  notification_sent_at: string | null;
  notification_status: string;
  failure_reason: string | null;
  verified: boolean;
  verified_at: string | null;
  verified_by: string | null;
  created_at: string;
  user?: {
    first_name?: string;
    last_name?: string;
    email_confirmed_at?: string;
  };
}

export default function UserRegistrationReview() {
  const [notifications, setNotifications] = useState<RegistrationNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      
      // Fetch notifications with user data
      const { data, error } = await supabase
        .from('user_registration_notifications')
        .select(`
          *,
          profiles!user_id (
            first_name,
            last_name,
            email
          )
        `)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      setNotifications(data || []);
    } catch (error: any) {
      console.error('Error loading registration notifications:', error);
      toast({
        title: "Error",
        description: "Failed to load user registrations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyUser = async (userId: string, verified: boolean) => {
    try {
      setVerifying(userId);
      
      const { error } = await supabase.rpc('verify_user_registration', {
        p_user_id: userId,
        p_verified: verified
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: `User ${verified ? 'verified' : 'rejected'} successfully`,
      });

      // Reload notifications
      await loadNotifications();
    } catch (error: any) {
      console.error('Error verifying user:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to verify user",
        variant: "destructive",
      });
    } finally {
      setVerifying(null);
    }
  };

  const getStatusBadge = (notification: RegistrationNotification) => {
    if (notification.verified) {
      return <Badge className="bg-green-500"><CheckCircle2 className="h-3 w-3 mr-1" /> Verified</Badge>;
    }
    
    if (notification.notification_status === 'blocked') {
      return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Blocked</Badge>;
    }
    
    if (notification.notification_status === 'failed') {
      return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" /> Failed</Badge>;
    }
    
    return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
  };

  const getEmailDomain = (email: string) => {
    return email.split('@')[1] || '';
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Registration Review</CardTitle>
          <CardDescription>Loading pending user registrations...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const pendingNotifications = notifications.filter(n => !n.verified && n.notification_status !== 'blocked');
  const verifiedNotifications = notifications.filter(n => n.verified);
  const blockedNotifications = notifications.filter(n => n.notification_status === 'blocked');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Registration Review</CardTitle>
          <CardDescription>
            Review and verify new user registrations. Only institutional email addresses are allowed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="text-2xl font-bold text-yellow-700">{pendingNotifications.length}</div>
              <div className="text-sm text-yellow-600">Pending Review</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-700">{verifiedNotifications.length}</div>
              <div className="text-sm text-green-600">Verified</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="text-2xl font-bold text-red-700">{blockedNotifications.length}</div>
              <div className="text-sm text-red-600">Blocked</div>
            </div>
          </div>

          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Verification Guidelines:</strong> Confirm the email domain belongs to a legitimate institution. 
              Check that the user has verified their email address before approving.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Pending Registrations */}
      {pendingNotifications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Pending Registrations ({pendingNotifications.length})</CardTitle>
            <CardDescription>These users require manual verification</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingNotifications.map((notification) => (
                <Card key={notification.id} className="border-2 border-yellow-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-2">
                          {getStatusBadge(notification)}
                          <Badge variant="outline">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(notification.created_at).toLocaleDateString()}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-2 text-sm">
                            <User className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">
                              {(notification as any).profiles?.first_name || 'Unknown'} {(notification as any).profiles?.last_name || ''}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <span>{notification.email}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm">
                            <Building2 className="h-4 w-4 text-gray-500" />
                            <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                              {getEmailDomain(notification.email)}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>User ID: </span>
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {notification.user_id.substring(0, 8)}...
                            </code>
                          </div>
                        </div>

                        {notification.failure_reason && (
                          <Alert variant="destructive" className="mt-2">
                            <AlertDescription className="text-xs">
                              {notification.failure_reason}
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => verifyUser(notification.user_id, true)}
                          disabled={verifying === notification.user_id}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Verify
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => verifyUser(notification.user_id, false)}
                          disabled={verifying === notification.user_id}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Verified Registrations */}
      {verifiedNotifications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Verified Registrations ({verifiedNotifications.length})</CardTitle>
            <CardDescription>Recently verified users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {verifiedNotifications.slice(0, 10).map((notification) => (
                <div key={notification.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-4">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium text-sm">{notification.email}</div>
                      <div className="text-xs text-gray-600">
                        Verified {notification.verified_at ? new Date(notification.verified_at).toLocaleDateString() : 'N/A'}
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-green-600">Verified</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Blocked Registrations */}
      {blockedNotifications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Blocked Registrations ({blockedNotifications.length})</CardTitle>
            <CardDescription>Non-institutional email addresses blocked automatically</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {blockedNotifications.slice(0, 10).map((notification) => (
                <div key={notification.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center gap-4">
                    <XCircle className="h-5 w-5 text-red-600" />
                    <div>
                      <div className="font-medium text-sm">{notification.email}</div>
                      <div className="text-xs text-red-600">{notification.failure_reason}</div>
                    </div>
                  </div>
                  <Badge variant="destructive">Blocked</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
