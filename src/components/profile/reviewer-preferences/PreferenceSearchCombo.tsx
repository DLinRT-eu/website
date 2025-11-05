import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PreferenceSearchComboProps<T> {
  items: T[];
  selectedIds: string[];
  onSelect: (id: string) => void;
  getId: (item: T) => string;
  getLabel: (item: T) => string;
  getSearchText: (item: T) => string;
  renderItem?: (item: T) => React.ReactNode;
  placeholder?: string;
  emptyText?: string;
}

export function PreferenceSearchCombo<T>({
  items,
  selectedIds,
  onSelect,
  getId,
  getLabel,
  getSearchText,
  renderItem,
  placeholder = "Search...",
  emptyText = "No results found.",
}: PreferenceSearchComboProps<T>) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);

  const filteredItems = useMemo(() => {
    setIsFiltering(true);
    const searchLower = search.toLowerCase();
    const result = items.filter(item => 
      getSearchText(item).toLowerCase().includes(searchLower) &&
      !selectedIds.includes(getId(item))
    );
    // Small delay to show loading state for better UX
    setTimeout(() => setIsFiltering(false), 100);
    return result;
  }, [items, search, selectedIds, getSearchText, getId]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-popover z-50" align="start" sideOffset={4}>
        <Command shouldFilter={false}>
          <CommandInput 
            placeholder={placeholder} 
            value={search}
            onValueChange={setSearch}
          />
          <CommandEmpty>{emptyText}</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-y-auto">
            {isFiltering ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              filteredItems.map((item) => {
                const id = getId(item);
                return (
                  <CommandItem
                    key={id}
                    value={id}
                    onSelect={() => {
                      onSelect(id);
                      setOpen(false);
                      setSearch("");
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedIds.includes(id) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {renderItem ? renderItem(item) : getLabel(item)}
                  </CommandItem>
                );
              })
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
