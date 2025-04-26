
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ProductDetails } from "@/types/productDetails";

interface RegulatoryInformationProps {
  product: ProductDetails;
}

const RegulatoryInformation = ({ product }: RegulatoryInformationProps) => {
  if (!product.regulatory) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Regulatory</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            {product.regulatory.ce && (
              <TableRow>
                <TableHead>CE</TableHead>
                <TableCell>
                  {product.regulatory.ce.status}
                  {product.regulatory.ce.class && `, Class ${product.regulatory.ce.class}`}
                  {product.regulatory.ce.type && `, ${product.regulatory.ce.type}`}
                </TableCell>
              </TableRow>
            )}
            {product.regulatory.fda && (
              <TableRow>
                <TableHead>FDA</TableHead>
                <TableCell>{product.regulatory.fda}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {product.regulatory.intendedUseStatement && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Intended Use Statement</h3>
            <p className="text-gray-700">{product.regulatory.intendedUseStatement}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RegulatoryInformation;
