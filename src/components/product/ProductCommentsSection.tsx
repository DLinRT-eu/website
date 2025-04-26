
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import ProductComments from './ProductComments';
import CommentForm from './CommentForm';
import AuthDialog from '../auth/AuthDialog';
import commentService from '@/services/CommentService';
import { Comment } from '@/types/comment';
import { ProductDetails } from '@/types/productDetails';

interface ProductCommentsSectionProps {
  product: ProductDetails;
}

const ProductCommentsSection: React.FC<ProductCommentsSectionProps> = ({ product }) => {
  const { isAuthenticated, user } = useAuth();
  const [comments, setComments] = useState<Comment[]>(
    commentService.getCommentsByProductId(product.id || '')
  );
  const averageRating = commentService.getAverageRating(product.id || '');

  const handleAddComment = (data: { content: string; rating: number }) => {
    if (!isAuthenticated || !user) return;

    const newComment = commentService.addComment({
      productId: product.id || '',
      userId: user.id,
      userName: user.name,
      content: data.content,
      rating: data.rating
    });

    setComments([newComment, ...comments]);
  };

  const handleDeleteComment = (commentId: string) => {
    if (!user) return;
    
    const deleted = commentService.deleteComment(commentId, user.id);
    if (deleted) {
      setComments(comments.filter(comment => comment.id !== commentId));
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5" />
            User Feedback
          </CardTitle>
          {comments.length > 0 && (
            <div className="text-sm text-muted-foreground mt-1">
              {comments.length} {comments.length === 1 ? 'review' : 'reviews'} · 
              Average rating: {averageRating.toFixed(1)}/5
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {isAuthenticated ? (
          <CommentForm 
            productId={product.id || ''}
            onSubmit={handleAddComment} 
          />
        ) : (
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="mb-4 text-gray-600">Sign in to leave your feedback</p>
            <AuthDialog>
              <Button>
                Sign In to Comment
              </Button>
            </AuthDialog>
          </div>
        )}

        <div className="mt-8">
          <ProductComments 
            comments={comments} 
            onDeleteComment={handleDeleteComment}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCommentsSection;
