
import { useState } from 'react';
import { ProductDetails } from '@/types/productDetails';
import { getDaysSinceRevision } from '@/utils/revisionUtils';

export const useRevisionTableState = (products: ProductDetails[]) => {
  const [sortField, setSortField] = useState<string>('days');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [assignments, setAssignments] = useState<Record<string, string>>({});

  // Get unique categories and companies
  const categories = Array.from(new Set(products.map(p => p.category)));
  const companies = Array.from(new Set(products.map(p => p.company)));

  // Filter products by search query
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let comparison = 0;
    
    switch(sortField) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'company':
        comparison = a.company.localeCompare(b.company);
        break;
      case 'category':
        comparison = a.category.localeCompare(b.category);
        break;
      case 'days':
        comparison = getDaysSinceRevision(a) - getDaysSinceRevision(b);
        break;
      default:
        comparison = getDaysSinceRevision(a) - getDaysSinceRevision(b);
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  // Handle sort
  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Handle assignment change
  const handleAssign = (productId: string, assignee: string) => {
    setAssignments({ ...assignments, [productId]: assignee });
  };

  // Handle search query change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return {
    sortField,
    sortDirection,
    searchQuery,
    assignments,
    categories,
    companies,
    sortedProducts,
    handleSort,
    handleAssign,
    handleSearchChange
  };
};
