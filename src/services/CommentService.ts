
import { Comment } from "@/types/comment";

// Initial mock data for comments
const MOCK_COMMENTS: Comment[] = [
  {
    id: "comment1",
    productId: "contour-ai-pro",
    userId: "1",
    userName: "Demo User",
    content: "This tool has significantly improved our contouring workflow!",
    rating: 4,
    createdAt: "2025-04-15T10:30:00Z"
  },
  {
    id: "comment2",
    productId: "register-master",
    userId: "2",
    userName: "Test User",
    content: "Great tool for registration, but has occasional alignment issues.",
    rating: 3,
    createdAt: "2025-04-10T14:20:00Z"
  }
];

class CommentService {
  private comments: Comment[];

  constructor() {
    // Load comments from localStorage if available, otherwise use mock data
    const savedComments = localStorage.getItem('productComments');
    this.comments = savedComments ? JSON.parse(savedComments) : [...MOCK_COMMENTS];
  }

  private saveToStorage(): void {
    localStorage.setItem('productComments', JSON.stringify(this.comments));
  }

  getCommentsByProductId(productId: string): Comment[] {
    return this.comments
      .filter(comment => comment.productId === productId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  addComment(comment: Omit<Comment, 'id' | 'createdAt'>): Comment {
    const newComment: Comment = {
      ...comment,
      id: `comment-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    
    this.comments.push(newComment);
    this.saveToStorage();
    return newComment;
  }

  deleteComment(commentId: string, userId: string): boolean {
    const initialLength = this.comments.length;
    this.comments = this.comments.filter(comment => 
      !(comment.id === commentId && comment.userId === userId)
    );
    
    const deleted = initialLength > this.comments.length;
    if (deleted) {
      this.saveToStorage();
    }
    return deleted;
  }

  getAverageRating(productId: string): number {
    const productComments = this.getCommentsByProductId(productId);
    if (productComments.length === 0) return 0;
    
    const sum = productComments.reduce((total, comment) => total + comment.rating, 0);
    return sum / productComments.length;
  }
}

const commentService = new CommentService();
export default commentService;
