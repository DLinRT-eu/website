import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get user from auth header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    const { code } = await req.json();
    
    if (!code || typeof code !== 'string') {
      throw new Error('Invalid code format');
    }

    // Fetch all unused backup codes for this user
    const { data: codes, error: fetchError } = await supabase
      .from('mfa_backup_codes')
      .select('id, code_hash, used')
      .eq('user_id', user.id)
      .eq('used', false);

    if (fetchError) {
      console.error('Error fetching backup codes:', fetchError);
      throw new Error('Failed to verify code');
    }

    // Check ALL codes with constant time to prevent timing attacks
    let foundCodeId: string | null = null;
    
    if (codes && codes.length > 0) {
      for (const storedCode of codes) {
        try {
          const isMatch = await bcrypt.compare(code, storedCode.code_hash);
          // Don't break early - check all codes
          if (isMatch) {
            foundCodeId = storedCode.id;
          }
        } catch (error) {
          console.error('Bcrypt comparison error:', error);
        }
      }
    }

    if (!foundCodeId) {
      // Log failed attempt
      await supabase.from('mfa_activity_log').insert({
        user_id: user.id,
        action: 'failed_backup_code',
        factor_type: 'backup_code',
      });

      return new Response(
        JSON.stringify({ success: false, error: 'Invalid backup code' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      );
    }

    // Mark code as used
    const { error: updateError } = await supabase
      .from('mfa_backup_codes')
      .update({
        used: true,
        used_at: new Date().toISOString(),
      })
      .eq('id', foundCodeId);

    if (updateError) {
      console.error('Error marking code as used:', updateError);
      throw new Error('Failed to update code status');
    }

    // Log successful verification
    await supabase.from('mfa_activity_log').insert({
      user_id: user.id,
      action: 'verified_backup_code',
      factor_type: 'backup_code',
    });

    return new Response(
      JSON.stringify({ success: true, codeId: foundCodeId }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in verify-backup-code:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});
