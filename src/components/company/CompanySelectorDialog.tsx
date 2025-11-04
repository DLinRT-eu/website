import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, X, Building2, CheckCircle2, ArrowUpDown, Filter } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CompanySelectorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectCompany: (companyId: string, companyName: string) => void;
  selectedCompanyId?: string;
  companies: Array<{ id: string; name: string; productCount: number }>;
  title?: string;
  description?: string;
}

export const CompanySelectorDialog = ({
  open,
  onOpenChange,
  onSelectCompany,
  selectedCompanyId,
  companies,
  title = "Select Company",
  description = "Search and select the company you represent",
}: CompanySelectorDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<'name-asc' | 'name-desc' | 'products-desc' | 'products-asc'>('name-asc');
  const [productCountFilter, setProductCountFilter] = useState<'all' | '1-5' | '6-10' | '11+'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [tempSelectedId, setTempSelectedId] = useState<string | undefined>(
    selectedCompanyId
  );

  // Filter companies based on search
  const filteredCompanies = useMemo(() => {
    let filtered = companies;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (company) =>
          company.name.toLowerCase().includes(query) ||
          company.id.toLowerCase().includes(query)
      );
    }

    // Apply product count filter
    if (productCountFilter !== 'all') {
      filtered = filtered.filter((company) => {
        if (productCountFilter === '1-5') return company.productCount >= 1 && company.productCount <= 5;
        if (productCountFilter === '6-10') return company.productCount >= 6 && company.productCount <= 10;
        if (productCountFilter === '11+') return company.productCount >= 11;
        return true;
      });
    }

    return filtered;
  }, [companies, searchQuery, productCountFilter]);

  // Sort companies
  const sortedCompanies = useMemo(() => {
    const sorted = [...filteredCompanies];
    
    switch (sortBy) {
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'products-desc':
        return sorted.sort((a, b) => b.productCount - a.productCount);
      case 'products-asc':
        return sorted.sort((a, b) => a.productCount - b.productCount);
      default:
        return sorted;
    }
  }, [filteredCompanies, sortBy]);

  const handleConfirm = () => {
    if (tempSelectedId) {
      const selectedCompany = companies.find(c => c.id === tempSelectedId);
      if (selectedCompany) {
        onSelectCompany(tempSelectedId, selectedCompany.name);
        onOpenChange(false);
      }
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setProductCountFilter('all');
    setSortBy('name-asc');
  };

  const hasActiveFilters = searchQuery || productCountFilter !== 'all' || sortBy !== 'name-asc';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0 gap-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-4 space-y-4">
          {/* Search and Sort Controls */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by company name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-9"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex gap-2">
              {/* Filter Toggle */}
              <Button
                variant="outline"
                size="default"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
                {(productCountFilter !== 'all') && (
                  <Badge variant="secondary" className="ml-1 h-5 px-1">
                    1
                  </Badge>
                )}
              </Button>

              {/* Sort Dropdown */}
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-[180px] gap-2">
                  <ArrowUpDown className="h-4 w-4" />
                  <span className="truncate">Sort</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                  <SelectItem value="products-desc">Most Products</SelectItem>
                  <SelectItem value="products-asc">Fewest Products</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="border rounded-lg p-4 space-y-4 bg-muted/50">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm">Filters</h3>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearFilters}
                    className="h-8 gap-2"
                  >
                    <X className="h-3 w-3" />
                    Clear All
                  </Button>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-count-filter">Product Count</Label>
                <Select value={productCountFilter} onValueChange={(value: any) => setProductCountFilter(value)}>
                  <SelectTrigger id="product-count-filter">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Companies</SelectItem>
                    <SelectItem value="1-5">1-5 Products</SelectItem>
                    <SelectItem value="6-10">6-10 Products</SelectItem>
                    <SelectItem value="11+">11+ Products</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="flex items-center justify-between text-sm">
            <p className="text-muted-foreground">
              {sortedCompanies.length} compan{sortedCompanies.length !== 1 ? "ies" : "y"} found
            </p>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="h-8"
              >
                <X className="h-3 w-3 mr-1" />
                Clear all
              </Button>
            )}
          </div>
        </div>

        {/* Company List */}
        <ScrollArea className="h-[400px] px-6">
          {sortedCompanies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No companies found</p>
              <p className="text-sm text-muted-foreground mt-1">
                Try adjusting your search
              </p>
            </div>
          ) : (
            <div className="space-y-2 pb-4">
              {sortedCompanies.map((company) => {
                const isSelected = tempSelectedId === company.id;
                return (
                  <Card
                    key={company.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      isSelected ? "ring-2 ring-primary shadow-md" : ""
                    }`}
                    onClick={() => setTempSelectedId(company.id)}
                  >
                    <CardHeader className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Building2 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <CardTitle className="text-base truncate">
                              {company.name}
                            </CardTitle>
                            {isSelected && (
                              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                            )}
                          </div>
                          <CardDescription className="text-xs truncate">
                            ID: {company.id}
                          </CardDescription>
                          <div className="mt-2">
                            <Badge variant="secondary" className="text-xs">
                              {company.productCount} product{company.productCount !== 1 ? "s" : ""}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          )}
        </ScrollArea>

        <DialogFooter className="p-6 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!tempSelectedId}>
            Confirm Selection
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
