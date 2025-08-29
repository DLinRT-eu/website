import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface BackupProcessingResult {
  success: boolean;
  method: 'primary' | 'backup_email' | 'backup_storage';
  error?: string;
}

export const useBackupContactProcessing = () => {
  
  const storeContactLocally = useCallback(async (contactData: ContactData): Promise<boolean> => {
    try {
      // Store in Supabase as backup - create a simple contacts table if needed
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          name: contactData.name,
          email: contactData.email,
          subject: contactData.subject,
          message: contactData.message,
          status: 'pending',
          submission_method: 'backup_storage',
          created_at: new Date().toISOString()
        });

      if (error) {
        console.error('Backup storage failed:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Local storage backup failed:', error);
      return false;
    }
  }, []);

  const sendBackupEmail = useCallback(async (contactData: ContactData): Promise<boolean> => {
    try {
      // Attempt to use alternative email service or internal processing
      const response = await fetch('/api/backup-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...contactData,
          backup: true,
          timestamp: new Date().toISOString()
        })
      });

      return response.ok;
    } catch (error) {
      console.error('Backup email service failed:', error);
      return false;
    }
  }, []);

  const processContactWithFallback = useCallback(async (
    contactData: ContactData,
    primaryMethod: () => Promise<boolean>
  ): Promise<BackupProcessingResult> => {
    
    // Try primary method first
    try {
      const primarySuccess = await primaryMethod();
      if (primarySuccess) {
        return { success: true, method: 'primary' };
      }
    } catch (error) {
      console.warn('Primary contact method failed:', error);
    }

    // Try backup email method
    try {
      const backupEmailSuccess = await sendBackupEmail(contactData);
      if (backupEmailSuccess) {
        return { success: true, method: 'backup_email' };
      }
    } catch (error) {
      console.warn('Backup email method failed:', error);
    }

    // Final fallback - store locally for manual processing
    try {
      const localStorageSuccess = await storeContactLocally(contactData);
      if (localStorageSuccess) {
        return { 
          success: true, 
          method: 'backup_storage',
          error: 'Contact saved for manual processing - primary email service unavailable'
        };
      }
    } catch (error) {
      console.error('All contact methods failed:', error);
    }

    return { 
      success: false, 
      method: 'backup_storage',
      error: 'All contact processing methods failed. Please try again later.'
    };
  }, [sendBackupEmail, storeContactLocally]);

  const checkServiceHealth = useCallback(async (): Promise<{
    primaryService: boolean;
    backupEmail: boolean;
    localStorage: boolean;
  }> => {
    const health = {
      primaryService: false,
      backupEmail: false,
      localStorage: false
    };

    // Check primary service (Resend via Supabase)
    try {
      const { data } = await supabase.functions.invoke('send-contact-email', {
        body: { test: true }
      });
      health.primaryService = !data?.error;
    } catch {
      health.primaryService = false;
    }

    // Check backup email service
    try {
      const response = await fetch('/api/backup-contact', {
        method: 'HEAD'
      });
      health.backupEmail = response.ok;
    } catch {
      health.backupEmail = false;
    }

    // Check local storage capability
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .select('id')
        .limit(1);
      health.localStorage = !error;
    } catch {
      health.localStorage = false;
    }

    return health;
  }, []);

  return {
    processContactWithFallback,
    checkServiceHealth,
    storeContactLocally
  };
};