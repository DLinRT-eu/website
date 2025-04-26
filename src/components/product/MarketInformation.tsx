
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ProductDetails } from "@/types/productDetails";

interface MarketInformationProps {
  product: ProductDetails;
}

const MarketInformation = ({ product }: MarketInformationProps) => {
  if (!product.market) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Presence</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            {product.market.onMarketSince && (
              <TableRow>
                <TableHead>On market since</TableHead>
                <TableCell>{product.market.onMarketSince}</TableCell>
              </TableRow>
            )}
            {product.market.countriesPresent && (
              <TableRow>
                <TableHead>Countries present</TableHead>
                <TableCell>{product.market.countriesPresent}</TableCell>
              </TableRow>
            )}
            {product.market.payingCustomers && (
              <TableRow>
                <TableHead>Paying customers</TableHead>
                <TableCell>{product.market.payingCustomers}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MarketInformation;
