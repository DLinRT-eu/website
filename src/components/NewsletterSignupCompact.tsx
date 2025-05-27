
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  firstName: z.string().min(2, { message: 'First name required' }),
  lastName: z.string().min(2, { message: 'Last name required' }),
  email: z.string().email({ message: 'Valid email required' }),
  consentGiven: z.boolean().refine(val => val === true, {
    message: 'Consent required'
  }),
});

type FormValues = z.infer<typeof formSchema>;

const NewsletterSignupCompact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      consentGiven: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const { data: response, error } = await supabase.functions.invoke('subscribe-newsletter', {
        body: data
      });

      if (error) {
        throw new Error(error.message || 'Failed to subscribe to newsletter');
      }

      toast({
        title: "Subscribed!",
        description: "You've been added to our newsletter.",
      });
      
      form.reset();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Subscription failed",
        description: error.message || "Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Stay Updated</h3>
      <p className="text-xs text-gray-500 mb-4">
        Get the latest updates on deep learning solutions in radiotherapy.
      </p>
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <Input
            placeholder="First name"
            className="text-xs"
            {...form.register('firstName')}
          />
          <Input
            placeholder="Last name"
            className="text-xs"
            {...form.register('lastName')}
          />
        </div>
        
        <Input
          type="email"
          placeholder="Your email"
          className="text-xs"
          {...form.register('email')}
        />
        
        <div className="flex items-start space-x-2">
          <Checkbox
            id="compact-consent"
            {...form.register('consentGiven')}
          />
          <label htmlFor="compact-consent" className="text-xs text-gray-500 leading-tight">
            I agree to receive updates and allow my information to be stored. 
            I can unsubscribe anytime.
          </label>
        </div>
        
        <Button 
          type="submit" 
          size="sm"
          className="w-full text-xs" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          <Mail className="ml-2 h-3 w-3" />
        </Button>
      </form>
      
      {Object.keys(form.formState.errors).length > 0 && (
        <div className="mt-2">
          {Object.values(form.formState.errors).map((error, index) => (
            <p key={index} className="text-xs text-red-500">{error?.message}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsletterSignupCompact;
