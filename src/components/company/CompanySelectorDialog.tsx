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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, X, Building2, CheckCircle2 } from "lucide-react";
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
  const [tempSelectedId, setTempSelectedId] = useState<string | undefined>(
    selectedCompanyId
  );

  // Filter companies based on search
  const filteredCompanies = useMemo(() => {
    if (!searchQuery.trim()) return companies;
    
    const query = searchQuery.toLowerCase().trim();
    return companies.filter(
      (company) =>
        company.name.toLowerCase().includes(query) ||
        company.id.toLowerCase().includes(query)
    );
  }, [companies, searchQuery]);

  // Sort by name
  const sortedCompanies = useMemo(() => {
    return [...filteredCompanies].sort((a, b) => 
      a.name.localeCompare(b.name)
    );
  }, [filteredCompanies]);

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0 gap-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-4 space-y-4">
          {/* Search Bar */}
          <div className="relative">
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

          {/* Results Count */}
          <div className="flex items-center justify-between text-sm">
            <p className="text-muted-foreground">
              {sortedCompanies.length} compan{sortedCompanies.length !== 1 ? "ies" : "y"} found
            </p>
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearSearch}
                className="h-8"
              >
                <X className="h-3 w-3 mr-1" />
                Clear search
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
