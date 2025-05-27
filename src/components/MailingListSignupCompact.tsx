
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: 'Valid email required' }),
  emailConfirm: z.string().email({ message: 'Valid email required' }),
  consent: z.boolean().refine(val => val === true, {
    message: 'Consent required'
  }),
}).refine((data) => data.email === data.emailConfirm, {
  message: "Emails don't match",
  path: ["emailConfirm"],
});

type FormValues = z.infer<typeof formSchema>;

const MailingListSignupCompact = () => {
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
    <div className="max-w-md">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Stay Updated</h3>
      <p className="text-xs text-gray-500 mb-4">
        Get the latest updates on deep learning solutions in radiotherapy.
      </p>
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <Input
          type="email"
          placeholder="Your email"
          className="text-xs"
          {...form.register('email')}
        />
        
        <Input
          type="email"
          placeholder="Confirm email"
          className="text-xs"
          {...form.register('emailConfirm')}
        />
        
        <div className="flex items-start space-x-2">
          <Checkbox
            id="compact-consent"
            {...form.register('consent')}
          />
          <label htmlFor="compact-consent" className="text-xs text-gray-500 leading-tight">
            I agree to join the mailing list for updates. Opens in new window.
          </label>
        </div>
        
        <Button 
          type="submit" 
          size="sm"
          className="w-full text-xs" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'Join Mailing List'}
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

export default MailingListSignupCompact;
