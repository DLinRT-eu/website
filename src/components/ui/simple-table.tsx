import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface Column<TData> {
  id: string;
  header: string | React.ReactNode;
  cell: (data: TData) => React.ReactNode;
  sortable?: boolean;
  sortFn?: (a: TData, b: TData) => number;
}

interface SimpleTableProps<TData> {
  columns: Column<TData>[];
  data: TData[];
  defaultSort?: { id: string; desc: boolean; };
}

export function SimpleTable<TData>({
  columns,
  data,
  defaultSort,
}: SimpleTableProps<TData>) {
  const [sortConfig, setSortConfig] = useState<{ id: string; desc: boolean; } | undefined>(defaultSort);

  const handleSort = (columnId: string) => {
    setSortConfig(current => {
      if (current?.id !== columnId) {
        return { id: columnId, desc: false };
      }
      if (current.desc) {
        return undefined;
      }
      return { id: columnId, desc: true };
    });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    const column = columns.find(col => col.id === sortConfig.id);
    if (!column?.sortable || !column.sortFn) return data;

    return [...data].sort((a, b) => {
      const result = column.sortFn!(a, b);
      return sortConfig.desc ? -result : result;
    });
  }, [data, columns, sortConfig]);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead 
                key={column.id}
                onClick={column.sortable ? () => handleSort(column.id) : undefined}
                className={column.sortable ? 'cursor-pointer select-none' : ''}
              >
                <div className="flex items-center gap-2">
                  {column.header}
                  {column.sortable && sortConfig?.id === column.id && (
                    sortConfig.desc ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.length ? (
            sortedData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map(column => (
                  <TableCell key={column.id}>
                    {column.cell(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
