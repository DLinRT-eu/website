
import React from 'react';
import { useForm } from 'react-hook-form';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface CommentFormProps {
  productId: string;
  onSubmit: (data: { content: string; rating: number }) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ productId, onSubmit }) => {
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      content: '',
      rating: 5
    },
  });

  const handleSubmit = (data: { content: string; rating: number }) => {
    onSubmit(data);
    form.reset();
    toast({
      title: "Comment added",
      description: "Your feedback has been submitted successfully."
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Rating</FormLabel>
              <div className="flex items-center space-x-1">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <Star
                    key={rating}
                    className={`h-6 w-6 cursor-pointer ${
                      field.value >= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                    }`}
                    onClick={() => field.onChange(rating)}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          rules={{ required: "Please enter your comment" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Comment</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share your experience with this product..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Submit Comment</Button>
      </form>
    </Form>
  );
};

export default CommentForm;
