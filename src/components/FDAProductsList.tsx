
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ProductDetails } from "@/types/productDetails";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface FDAProductsListProps {
  products: ProductDetails[];
}

const FDAProductsList = ({ products }: FDAProductsListProps) => {
  // Filter products with FDA submission numbers
  const fdaProducts = products.filter(product => 
    product.regulatory?.fdaSubmissionNumber && 
    product.regulatory?.fdaLink
  ).sort((a, b) => a.company.localeCompare(b.company));
  
  if (fdaProducts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>FDA-Cleared AI/ML Medical Devices</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">No FDA-cleared AI/ML medical devices found in the database.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>FDA-Cleared AI/ML Medical Devices</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>FDA Submission</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fdaProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Link to={`/product/${product.id}`} className="text-blue-600 hover:text-blue-800">
                    {product.name}
                  </Link>
                </TableCell>
                <TableCell>{product.company}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <a 
                    href={product.regulatory?.fdaLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    {product.regulatory?.fdaSubmissionNumber}
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default FDAProductsList;
