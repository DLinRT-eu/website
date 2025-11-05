import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { SimpleTable, Column } from "@/components/ui/simple-table";
import { Plus, Search, CheckSquare } from "lucide-react";
import { CompanyDetails } from "@/types/company";
import { toast } from "@/hooks/use-toast";

interface CompanySelectionTableProps {
  companies: CompanyDetails[];
  selectedIds: string[];
  onAdd: (companyId: string) => void;
}

export function CompanySelectionTable({
  companies,
  selectedIds,
  onAdd,
}: CompanySelectionTableProps) {
  const [search, setSearch] = useState("");
  const [addingId, setAddingId] = useState<string | null>(null);
  const [bulkSelected, setBulkSelected] = useState<Set<string>>(new Set());
  const [isAddingBulk, setIsAddingBulk] = useState(false);

  const filteredCompanies = useMemo(() => {
    const searchLower = search.toLowerCase();
    return companies.filter(company => 
      !selectedIds.includes(company.id) &&
      (company.name.toLowerCase().includes(searchLower) ||
       company.description?.toLowerCase().includes(searchLower))
    );
  }, [companies, selectedIds, search]);

  const handleAdd = async (companyId: string) => {
    setAddingId(companyId);
    try {
      await onAdd(companyId);
    } finally {
      setAddingId(null);
    }
  };

  const handleBulkAdd = async () => {
    if (bulkSelected.size === 0) return;
    
    setIsAddingBulk(true);
    try {
      const selectedArray = Array.from(bulkSelected);
      for (const companyId of selectedArray) {
        await onAdd(companyId);
      }
      setBulkSelected(new Set());
      toast({
        title: "Success",
        description: `Added ${selectedArray.length} ${selectedArray.length === 1 ? 'company' : 'companies'}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add some companies",
        variant: "destructive",
      });
    } finally {
      setIsAddingBulk(false);
    }
  };

  const toggleCompanySelection = (companyId: string) => {
    setBulkSelected(prev => {
      const newSet = new Set(prev);
      if (newSet.has(companyId)) {
        newSet.delete(companyId);
      } else {
        newSet.add(companyId);
      }
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (bulkSelected.size === filteredCompanies.length) {
      setBulkSelected(new Set());
    } else {
      setBulkSelected(new Set(filteredCompanies.map(c => c.id)));
    }
  };

  const allSelected = filteredCompanies.length > 0 && bulkSelected.size === filteredCompanies.length;

  const columns: Column<CompanyDetails>[] = [
    {
      id: 'select',
      header: (
        <Checkbox
          checked={allSelected}
          onCheckedChange={toggleSelectAll}
          aria-label="Select all companies"
        />
      ),
      cell: (company) => (
        <Checkbox
          checked={bulkSelected.has(company.id)}
          onCheckedChange={() => toggleCompanySelection(company.id)}
          aria-label={`Select ${company.name}`}
        />
      ),
    },
    {
      id: 'name',
      header: 'Company Name',
      cell: (company) => (
        <div className="flex flex-col">
          <span className="font-medium">{company.name}</span>
          {company.description && (
            <span className="text-xs text-muted-foreground line-clamp-1">
              {company.description}
            </span>
          )}
        </div>
      ),
      sortable: true,
      sortFn: (a, b) => a.name.localeCompare(b.name),
    },
    {
      id: 'products',
      header: 'Products',
      cell: (company) => (
        <span className="text-sm text-muted-foreground">
          {company.productIds?.length || 0}
        </span>
      ),
      sortable: true,
      sortFn: (a, b) => (a.productIds?.length || 0) - (b.productIds?.length || 0),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (company) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleAdd(company.id)}
          disabled={addingId === company.id}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Search and Bulk Actions */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search companies by name or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        {bulkSelected.size > 0 && (
          <Button
            onClick={handleBulkAdd}
            disabled={isAddingBulk}
            className="whitespace-nowrap"
          >
            <CheckSquare className="h-4 w-4 mr-2" />
            Add Selected ({bulkSelected.size})
          </Button>
        )}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing {filteredCompanies.length} of {companies.length - selectedIds.length} available companies
        </span>
        {bulkSelected.size > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setBulkSelected(new Set())}
          >
            Clear selection
          </Button>
        )}
      </div>

      {/* Table */}
      <SimpleTable
        columns={columns}
        data={filteredCompanies}
        defaultSort={{ id: 'name', desc: false }}
      />
    </div>
  );
}
