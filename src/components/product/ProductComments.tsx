
import React, { useState } from 'react';
import { Comment } from '@/types/comment';
import { useAuth } from '@/context/AuthContext';
import { Star, Trash2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface ProductCommentsProps {
  comments: Comment[];
  onDeleteComment: (commentId: string) => void;
}

const ProductComments: React.FC<ProductCommentsProps> = ({ comments, onDeleteComment }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});

  const toggleComment = (commentId: string) => {
    setExpandedComments(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  const handleDelete = (commentId: string) => {
    onDeleteComment(commentId);
    toast({
      title: "Comment deleted",
      description: "Your comment has been removed successfully."
    });
  };

  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
        <p>No comments yet. Be the first to leave feedback!</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-4">
      {comments.map(comment => (
        <Card key={comment.id} className="shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{comment.userName}</p>
                <p className="text-xs text-gray-500">{formatDate(comment.createdAt)}</p>
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <Star 
                    key={index}
                    className={`h-4 w-4 ${index < comment.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                  />
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className={expandedComments[comment.id] ? '' : 'line-clamp-2'}>
              <p className="text-sm text-gray-700">{comment.content}</p>
            </div>
            {comment.content.length > 100 && (
              <button 
                onClick={() => toggleComment(comment.id)} 
                className="text-xs text-blue-600 mt-1 hover:underline"
              >
                {expandedComments[comment.id] ? 'Show less' : 'Read more'}
              </button>
            )}
          </CardContent>
          {user && user.id === comment.userId && (
            <CardFooter className="pt-0 justify-end">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleDelete(comment.id)}
                className="text-red-600 hover:text-red-800 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
};

export default ProductComments;
