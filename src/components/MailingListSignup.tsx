
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
import { Mail } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  emailConfirm: z.string().email({ message: 'Please enter a valid email address' }),
  consent: z.boolean().refine(val => val === true, {
    message: 'You must agree to join the mailing list'
  }),
}).refine((data) => data.email === data.emailConfirm, {
  message: "Email addresses don't match",
  path: ["emailConfirm"],
});

type FormValues = z.infer<typeof formSchema>;

const MailingListSignup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      emailConfirm: '',
      consent: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    
    // Create a form element and submit it to the external service
    const formElement = document.createElement('form');
    formElement.action = 'https://ml.kundenserver.de/cgi-bin/mailinglist.cgi';
    formElement.method = 'POST';
    formElement.target = '_blank';
    
    // Add required form fields
    const fields = [
      { name: 'subscribe_r', value: 'subscribe' },
      { name: 'mailaccount_r', value: data.email },
      { name: 'mailaccount2_r', value: data.emailConfirm },
      { name: 'FBMLNAME', value: 'noreply@dlinrt.eu' },
      { name: 'FBLANG', value: 'en' },
      { name: 'FBURLERROR_L', value: 'https://ml.kundenserver.de/mailinglist/error.en.html' },
      { name: 'FBURLSUBSCRIBE_L', value: 'https://ml.kundenserver.de/mailinglist/subscribe.en.html' },
      { name: 'FBURLUNSUBSCRIBE_L', value: 'https://ml.kundenserver.de/mailinglist/unsubscribe.en.html' },
      { name: 'FBURLINVALID_L', value: 'https://ml.kundenserver.de/mailinglist/invalid.en.html' }
    ];
    
    fields.forEach(field => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = field.name;
      input.value = field.value;
      formElement.appendChild(input);
    });
    
    document.body.appendChild(formElement);
    formElement.submit();
    document.body.removeChild(formElement);
    
    // Reset form and submission state
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Your email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="emailConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Confirm your email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="consent"
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
                  <strong>Mailing List Consent:</strong> I agree to join the DLinRT mailing list (noreply@dlinrt.eu) to receive updates about 
                  deep learning solutions in radiotherapy. I understand that:
                  <ul className="mt-2 ml-4 text-xs list-disc">
                    <li>My email will be processed by ml.kundenserver.de (Germany) - a GDPR-compliant service</li>
                    <li>I can unsubscribe at any time by clicking the link in emails or contacting info@dlinrt.eu</li>
                    <li>My data will be deleted if I unsubscribe or request deletion</li>
                    <li>This form opens in a new window for secure processing</li>
                  </ul>
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
          {isSubmitting ? 'Processing...' : 'Join Mailing List'}
          <Mail className="ml-2 h-4 w-4" />
        </Button>
        
        <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
          <p className="font-semibold mb-1">Data Processing Notice:</p>
          <p className="mb-2">
            This form submits to ml.kundenserver.de (Germany), a GDPR-compliant mailing list service. 
            Your email address will be processed under our data processing agreement for the sole purpose 
            of sending radiotherapy AI updates.
          </p>
          <p>
            <strong>Your rights:</strong> Access, rectification, erasure, data portability. 
            Contact info@dlinrt.eu to exercise your rights or unsubscribe.
          </p>
        </div>
      </form>
    </Form>
  );
};

export default MailingListSignup;
