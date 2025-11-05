import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SimpleTable, Column } from "@/components/ui/simple-table";
import { Plus, Search } from "lucide-react";
import { CompanyDetails } from "@/types/company";

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

  const columns: Column<CompanyDetails>[] = [
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
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search companies by name or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredCompanies.length} of {companies.length - selectedIds.length} available companies
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
