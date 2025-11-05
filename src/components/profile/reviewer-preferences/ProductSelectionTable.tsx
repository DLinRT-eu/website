import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { SimpleTable, Column } from "@/components/ui/simple-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import { ProductDetails } from "@/types/productDetails";
import { CATEGORY_LABELS } from "@/constants/productCategories";

interface ProductSelectionTableProps {
  products: ProductDetails[];
  selectedIds: string[];
  onAdd: (productId: string) => void;
}

export function ProductSelectionTable({
  products,
  selectedIds,
  onAdd,
}: ProductSelectionTableProps) {
  const [search, setSearch] = useState("");
  const [filterCompany, setFilterCompany] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [addingId, setAddingId] = useState<string | null>(null);

  const companies = useMemo(() => {
    const uniqueCompanies = new Set(products.map(p => p.company));
    return Array.from(uniqueCompanies).sort();
  }, [products]);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(products.map(p => p.category));
    return Array.from(uniqueCategories).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    const searchLower = search.toLowerCase();
    return products.filter(product => {
      if (selectedIds.includes(product.id || "")) return false;
      if (filterCompany !== "all" && product.company !== filterCompany) return false;
      if (filterCategory !== "all" && product.category !== filterCategory) return false;
      if (search && !(
        product.name.toLowerCase().includes(searchLower) ||
        product.company.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        (typeof product.modality === 'string' && product.modality.toLowerCase().includes(searchLower))
      )) return false;
      return true;
    });
  }, [products, selectedIds, search, filterCompany, filterCategory]);

  const handleAdd = async (productId: string) => {
    setAddingId(productId);
    try {
      await onAdd(productId);
    } finally {
      setAddingId(null);
    }
  };

  const columns: Column<ProductDetails>[] = [
    {
      id: 'name',
      header: 'Product Name',
      cell: (product) => (
        <span className="font-medium">{product.name}</span>
      ),
      sortable: true,
      sortFn: (a, b) => a.name.localeCompare(b.name),
    },
    {
      id: 'company',
      header: 'Company',
      cell: (product) => (
        <span className="text-sm">{product.company}</span>
      ),
      sortable: true,
      sortFn: (a, b) => a.company.localeCompare(b.company),
    },
    {
      id: 'category',
      header: 'Category',
      cell: (product) => (
        <span className="text-sm text-muted-foreground">
          {CATEGORY_LABELS[product.category] || product.category}
        </span>
      ),
      sortable: true,
      sortFn: (a, b) => a.category.localeCompare(b.category),
    },
    {
      id: 'modality',
      header: 'Modality',
      cell: (product) => (
        product.modality ? (
          <Badge variant="outline" className="text-xs">
            {product.modality}
          </Badge>
        ) : (
          <span className="text-xs text-muted-foreground">-</span>
        )
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (product) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleAdd(product.id || "")}
          disabled={addingId === product.id}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Filter by Company</Label>
          <Select value={filterCompany} onValueChange={setFilterCompany}>
            <SelectTrigger>
              <SelectValue placeholder="All companies" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All companies</SelectItem>
              {companies.map(company => (
                <SelectItem key={company} value={company}>
                  {company}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Filter by Category</Label>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger>
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {CATEGORY_LABELS[category] || category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredProducts.length} of {products.filter(p => !selectedIds.includes(p.id || "")).length} available products
      </div>

      {/* Table */}
      <SimpleTable
        columns={columns}
        data={filteredProducts}
        defaultSort={{ id: 'name', desc: false }}
      />
    </div>
  );
}
