
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useSecurityMonitoring } from '@/hooks/useSecurityMonitoring';

// Define form schema with Zod
const formSchema = z.object({
  name: z.string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(100, { message: 'Name must be less than 100 characters' }),
  email: z.string()
    .email({ message: 'Please enter a valid email address' })
    .max(254, { message: 'Email must be less than 254 characters' }),
  subject: z.string()
    .min(3, { message: 'Subject must be at least 3 characters' })
    .max(200, { message: 'Subject must be less than 200 characters' }),
  message: z.string()
    .min(10, { message: 'Message must be at least 10 characters' })
    .max(5000, { message: 'Message must be less than 5000 characters' }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { checkRateLimit, logSecurityEvent, detectSuspiciousActivity } = useSecurityMonitoring();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    // Check rate limit before processing
    if (!checkRateLimit('contact_form', 3, 300000)) { // 3 attempts per 5 minutes
      toast({
        variant: "destructive",
        title: "Too many attempts",
        description: "Please wait before submitting another message.",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log('Submitting contact form:', data);
      
      const { data: response, error } = await supabase.functions.invoke('send-contact-email', {
        body: data
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Failed to send email');
      }

      console.log('Email sent successfully:', response);
      
      // Success notification
      toast({
        title: "Message sent successfully!",
        description: "Thank you for contacting us! We will get back to you soon at info@dlinrt.eu.",
      });
      
      // Reset the form
      form.reset();
    } catch (error: any) {
      console.error('Contact form submission error:', error);
      
      // Log security event for failed form submissions
      logSecurityEvent({
        type: 'form_submission_failed',
        details: { 
          form: 'contact',
          error: error.message,
          email: data.email 
        },
        timestamp: new Date()
      });
      
      // Error notification
      toast({
        variant: "destructive",
        title: "Failed to send message",
        description: error.message || "There was a problem sending your message. Please try again or contact us directly at info@dlinrt.eu.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Your email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="Message subject" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Your message here..." 
                  className="min-h-[120px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
          <Mail className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
