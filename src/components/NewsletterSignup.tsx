
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
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

// Define form schema with Zod
const formSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  consentGiven: z.boolean().refine(val => val === true, {
    message: 'You must agree to receive our newsletter and allow us to store your information'
  }),
});

type FormValues = z.infer<typeof formSchema>;

const NewsletterSignup = () => {
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
      console.log('Submitting newsletter subscription:', data);
      
      const { data: response, error } = await supabase.functions.invoke('subscribe-newsletter', {
        body: data
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Failed to subscribe to newsletter');
      }

      console.log('Newsletter subscription successful:', response);
      
      // Success notification
      toast({
        title: "Successfully subscribed!",
        description: "Welcome to the DLinRT newsletter! Check your email for a confirmation message.",
      });
      
      // Reset the form
      form.reset();
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      
      // Error notification
      toast({
        variant: "destructive",
        title: "Subscription failed",
        description: error.message || "There was a problem subscribing to our newsletter. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
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
          name="consentGiven"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm">
                  I agree to receive the DLinRT newsletter and allow my information to be stored for this purpose. 
                  I understand that I can unsubscribe at any time by contacting info@dlinrt.eu.
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe to Newsletter'}
          <Mail className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </Form>
  );
};

export default NewsletterSignup;
