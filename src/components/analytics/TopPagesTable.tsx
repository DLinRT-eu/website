
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Clock } from "lucide-react";

interface TopPage {
  path: string;
  title: string;
  visits: number;
  avgDuration: number;
}

interface TopPagesTableProps {
  topPages: TopPage[];
}

const TopPagesTable: React.FC<TopPagesTableProps> = ({ topPages }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Pages</CardTitle>
        <CardDescription>Most visited pages and average time spent</CardDescription>
      </CardHeader>
      <CardContent>
        {topPages.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page</TableHead>
                <TableHead className="w-[100px] text-right">Visits</TableHead>
                <TableHead className="w-[150px] text-right">Avg. Time (sec)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topPages.map((page, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {page.path === '/' ? 'Home' : page.title}
                  </TableCell>
                  <TableCell className="text-right">{page.visits}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      {page.avgDuration}s
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center text-muted-foreground py-8">No page data available for the selected period</p>
        )}
      </CardContent>
    </Card>
  );
};

export default TopPagesTable;
