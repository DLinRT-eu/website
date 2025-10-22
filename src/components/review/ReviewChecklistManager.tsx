import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2, Circle } from 'lucide-react';

interface ChecklistItem {
  id: string;
  item_name: string;
  item_category: string;
  checked: boolean;
  notes: string | null;
}

interface ReviewChecklistManagerProps {
  reviewId: string;
  productId: string;
}

const DEFAULT_CHECKLIST_ITEMS = [
  { category: 'General Information', items: ['Product Name Verified', 'Company Information Verified', 'Contact Details Verified'] },
  { category: 'Regulatory', items: ['CE Mark Status Verified', 'FDA Status Verified', 'Regulatory Clearance Dates Checked'] },
  { category: 'Technical', items: ['Technical Specifications Complete', 'Supported Structures Verified', 'Performance Metrics Validated'] },
  { category: 'Documentation', items: ['GitHub URL Valid', 'Guidelines References Valid', 'Publication Links Working'] },
  { category: 'Quality', items: ['No Spelling/Grammar Errors', 'Consistent Formatting', 'All Required Fields Complete'] },
];

export default function ReviewChecklistManager({ reviewId, productId }: ReviewChecklistManagerProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNotes, setEditingNotes] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchChecklistItems();
  }, [reviewId]);

  const fetchChecklistItems = async () => {
    const { data } = await supabase
      .from('review_checklist_items')
      .select('*')
      .eq('review_id', reviewId)
      .order('item_category, item_name');

    if (data && data.length > 0) {
      setItems(data);
    } else {
      // Initialize with default items
      await initializeChecklist();
    }
    setLoading(false);
  };

  const initializeChecklist = async () => {
    const itemsToInsert = DEFAULT_CHECKLIST_ITEMS.flatMap(category =>
      category.items.map(item => ({
        review_id: reviewId,
        item_name: item,
        item_category: category.category,
        checked: false,
      }))
    );

    const { data, error } = await supabase
      .from('review_checklist_items')
      .insert(itemsToInsert)
      .select();

    if (!error && data) {
      setItems(data);
    }
  };

  const handleCheckToggle = async (itemId: string, checked: boolean) => {
    const { error } = await supabase
      .from('review_checklist_items')
      .update({ 
        checked,
        checked_by: user?.id,
        checked_at: checked ? new Date().toISOString() : null,
      })
      .eq('id', itemId);

    if (!error) {
      setItems(items.map(item => 
        item.id === itemId ? { ...item, checked } : item
      ));
    }
  };

  const handleNotesUpdate = async (itemId: string) => {
    const notes = editingNotes[itemId];
    const { error } = await supabase
      .from('review_checklist_items')
      .update({ notes })
      .eq('id', itemId);

    if (!error) {
      setItems(items.map(item => 
        item.id === itemId ? { ...item, notes } : item
      ));
      toast({
        title: 'Notes saved',
        description: 'Checklist notes have been updated',
      });
    }
  };

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.item_category]) {
      acc[item.item_category] = [];
    }
    acc[item.item_category].push(item);
    return acc;
  }, {} as { [key: string]: ChecklistItem[] });

  const totalItems = items.length;
  const checkedItems = items.filter(i => i.checked).length;
  const progress = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;

  if (loading) {
    return <div>Loading checklist...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Review Checklist</CardTitle>
            <CardDescription>
              Track your review progress ({checkedItems}/{totalItems} complete)
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold">{progress}%</div>
            {progress === 100 && <CheckCircle2 className="h-6 w-6 text-green-500" />}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(groupedItems).map(([category, categoryItems]) => (
          <div key={category} className="space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground">{category}</h3>
            <div className="space-y-3 pl-2">
              {categoryItems.map((item) => (
                <div key={item.id} className="space-y-2">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={item.checked}
                      onCheckedChange={(checked) => handleCheckToggle(item.id, checked as boolean)}
                      className="mt-1"
                    />
                    <div className="flex-1 space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {item.item_name}
                      </label>
                      <Textarea
                        placeholder="Add notes..."
                        value={editingNotes[item.id] ?? item.notes ?? ''}
                        onChange={(e) => setEditingNotes({ ...editingNotes, [item.id]: e.target.value })}
                        className="text-sm"
                        rows={2}
                      />
                      {editingNotes[item.id] !== undefined && editingNotes[item.id] !== item.notes && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleNotesUpdate(item.id)}
                        >
                          Save Notes
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
