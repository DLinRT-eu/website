import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, Clock, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductDetails } from '@/types/productDetails';

  onSearch: (query: string) => void;
  products?: ProductDetails[];
  placeholder?: string;
  className?: string;
  showSuggestions?: boolean;
  debounceMs?: number;
}

const DebouncedSearchWithSuggestions = ({
  onSearch,
  products = [],
  placeholder = "Search for products, companies, or features...",
  className = "",
  showSuggestions = true,
  debounceMs = 300
}: DebouncedSearchWithSuggestionsProps) => {
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const debounceRef = useRef<NodeJS.Timeout>();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const stored = localStorage.getItem('recentSearches');
      if (stored) {
        const decrypted = await decryptSearches(stored);
        if (decrypted && !cancelled) setRecentSearches(decrypted);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Debounced search effect
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      onSearch(inputValue);
    }, debounceMs);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [inputValue, onSearch, debounceMs]);

  // Generate suggestions based on products
  const suggestions = useMemo(() => {
    if (!inputValue.trim() || !showSuggestions) return [];

    const query = inputValue.toLowerCase();
    const suggestionSet = new Set<string>();

    products.forEach(product => {
      // Company suggestions
      if (product.company?.toLowerCase().includes(query)) {
        suggestionSet.add(product.company);
      }

      // Category suggestions
      if (product.category?.toLowerCase().includes(query)) {
        suggestionSet.add(product.category);
      }

      // Product name suggestions
      if (product.name?.toLowerCase().includes(query)) {
        suggestionSet.add(product.name);
      }

      // Feature suggestions
      product.features?.forEach(feature => {
        if (feature.toLowerCase().includes(query)) {
          suggestionSet.add(feature);
        }
      });
    });

    return Array.from(suggestionSet).slice(0, 5);
  }, [inputValue, products, showSuggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setShowDropdown(value.length > 0 && showSuggestions);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setShowDropdown(false);
    onSearch(suggestion);
    saveRecentSearch(suggestion);
  };

  const handleRecentSearchClick = (search: string) => {
    setInputValue(search);
    setShowDropdown(false);
    onSearch(search);
  };

  const saveRecentSearch = (query: string) => {
    if (!query.trim()) return;
    
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    // must encrypt before storing
    encryptSearches(updated).then(enc => {
      localStorage.setItem('recentSearches', enc);
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const handleClearInput = () => {
    setInputValue("");
    onSearch("");
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowDropdown(false);
      inputRef.current?.blur();
    }
    if (e.key === 'Enter') {
      setShowDropdown(false);
      saveRecentSearch(inputValue);
    }
  };

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowDropdown(inputValue.length > 0 && showSuggestions)}
          className="pl-10 pr-10"
        />
        {inputValue && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClearInput}
            className="absolute right-1 top-1 h-8 w-8 p-0 hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {showDropdown && showSuggestions && (
        <Card 
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 z-50 max-h-80 overflow-y-auto border shadow-lg"
        >
          <div className="p-2">
            {/* Recent searches */}
            {!inputValue && recentSearches.length > 0 && (
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Recent searches
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearRecentSearches}
                    className="h-6 text-xs px-2"
                  >
                    Clear
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {recentSearches.map((search, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer hover:bg-muted text-xs"
                      onClick={() => handleRecentSearchClick(search)}
                    >
                      {search}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div>
                <span className="text-xs font-medium text-muted-foreground block mb-2">
                  Suggestions
                </span>
                <div className="space-y-1">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="w-full text-left px-2 py-1 rounded hover:bg-muted text-sm transition-colors"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <Search className="h-3 w-3 inline mr-2 text-muted-foreground" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* No results */}
            {inputValue && suggestions.length === 0 && (
              <div className="text-sm text-muted-foreground py-2">
                No suggestions found
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default DebouncedSearchWithSuggestions;