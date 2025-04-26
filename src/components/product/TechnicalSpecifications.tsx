
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ProductDetails } from "@/types/productDetails";

interface TechnicalSpecificationsProps {
  product: ProductDetails;
}

const TechnicalSpecifications = ({ product }: TechnicalSpecificationsProps) => {
  if (!product.technicalSpecifications) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Technical Specifications</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            {product.technicalSpecifications.population && (
              <TableRow>
                <TableHead>Population</TableHead>
                <TableCell>{product.technicalSpecifications.population}</TableCell>
              </TableRow>
            )}
            {product.technicalSpecifications.input && (
              <TableRow>
                <TableHead>Input</TableHead>
                <TableCell>{product.technicalSpecifications.input.join(", ")}</TableCell>
              </TableRow>
            )}
            {product.technicalSpecifications.output && (
              <TableRow>
                <TableHead>Output</TableHead>
                <TableCell>{product.technicalSpecifications.output.join(", ")}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TechnicalSpecifications;
