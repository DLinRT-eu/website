
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ProductDetails } from "@/types/productDetails";

interface GeneralInformationProps {
  product: ProductDetails;
}

const GeneralInformation = ({ product }: GeneralInformationProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableHead className="w-1/3">Product name</TableHead>
              <TableCell>{product.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableCell>{product.company}</TableCell>
            </TableRow>
            {product.subspeciality && (
              <TableRow>
                <TableHead>Subspeciality</TableHead>
                <TableCell>{product.subspeciality}</TableCell>
              </TableRow>
            )}
            {product.modality && (
              <TableRow>
                <TableHead>Modality</TableHead>
                <TableCell>
                  {Array.isArray(product.modality) 
                    ? product.modality.join(", ")
                    : product.modality}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default GeneralInformation;
