import { useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { PreferenceSearchCombo } from "./PreferenceSearchCombo";
import { COMPANIES } from "@/data";

interface CompanyPreference {
  company_id: string;
  priority: number;
}

interface CompanyPreferencesProps {
  preferences: CompanyPreference[];
  onAdd: (companyId: string) => void;
  onRemove: (companyId: string) => void;
  onPriorityChange: (companyId: string, priority: number) => void;
}

export function CompanyPreferences({
  preferences,
  onAdd,
  onRemove,
  onPriorityChange,
}: CompanyPreferencesProps) {
  const selectedCompanyIds = preferences.map(p => p.company_id);

  const companyMap = useMemo(() => {
    const map = new Map();
    COMPANIES.forEach(company => {
      map.set(company.id, company);
    });
    return map;
  }, []);

  return (
    <div className="space-y-6">
      {/* Search and Add */}
      <div className="space-y-3">
        <Label>Search and Add Companies</Label>
        <PreferenceSearchCombo
          items={COMPANIES}
          selectedIds={selectedCompanyIds}
          onSelect={onAdd}
          getId={(company) => company.id}
          getLabel={(company) => company.name}
          getSearchText={(company) => `${company.name} ${company.description || ''}`}
          renderItem={(company) => (
            <div className="flex flex-col">
              <span className="font-medium">{company.name}</span>
              <span className="text-xs text-muted-foreground">
                {company.productIds?.length || 0} products
              </span>
            </div>
          )}
          placeholder="Search companies..."
          emptyText="No companies found."
        />
      </div>

      {/* Current Preferences */}
      {preferences.length > 0 && (
        <div className="space-y-4">
          <Label>Your Company Expertise</Label>
          {preferences.map((item) => {
            const company = companyMap.get(item.company_id);
            return (
              <div key={item.company_id} className="space-y-2 p-4 border rounded-lg bg-card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      {company?.name || item.company_id}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Priority: {item.priority}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove(item.company_id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                {company?.productIds && (
                  <p className="text-xs text-muted-foreground">
                    {company.productIds.length} products in catalog
                  </p>
                )}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Lower = More familiar</span>
                    <span>Higher = Less experience</span>
                  </div>
                  <Slider
                    value={[item.priority]}
                    onValueChange={([value]) => onPriorityChange(item.company_id, value)}
                    min={1}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {preferences.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-sm">
            No companies selected yet. Search and add companies you have experience with.
          </p>
        </div>
      )}
    </div>
  );
}
