import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, Info } from "lucide-react";
import { ProductDetails } from "@/types/productDetails";

const ProductDetailsPage = ({ product }: { product: ProductDetails }) => {
  const formatDate = (date: string) => new Date(date).toLocaleDateString();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Navigation Header */}
      <header className="mb-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link 
            to="/" 
            className="text-gray-600 hover:text-blue-600 flex items-center"
          >
            <Home className="mr-2 h-5 w-5" />
            <span>HealthAI Register</span>
          </Link>
          <Link 
            to="/" 
            className="text-gray-500 hover:text-blue-600 flex items-center text-sm"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Products
          </Link>
        </div>
      </header>

      <div className="space-y-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <Info className="h-4 w-4" />
            <span>Information source: Vendor</span>
            {product.lastUpdated && (
              <>
                <Calendar className="h-4 w-4 ml-4" />
                <span>Last updated: {formatDate(product.lastUpdated)}</span>
              </>
            )}
          </div>
          <p className="text-lg text-gray-700 mb-6">{product.description}</p>
        </div>

        {/* General Information */}
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
                    <TableCell>{product.modality}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Disease & Features */}
        {(product.diseaseTargeted || product.keyFeatures) && (
          <Card>
            <CardHeader>
              <CardTitle>Features & Capabilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {product.diseaseTargeted && (
                <div>
                  <h3 className="font-semibold mb-2">Disease targeted</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.diseaseTargeted.map((disease, index) => (
                      <Badge key={index} variant="secondary">
                        {disease}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {product.keyFeatures && (
                <div>
                  <h3 className="font-semibold mb-2">Key features</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.keyFeatures.map((feature, index) => (
                      <Badge key={index} variant="outline">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Technical Specifications */}
        {product.technicalSpecifications && (
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
        )}

        {/* Regulatory Information */}
        {product.regulatory && (
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
        )}

        {/* Market Information */}
        {product.market && (
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
        )}

        {/* Pricing Information */}
        {product.pricing && (
          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              {product.pricing.model && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Pricing model</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.pricing.model.map((model, index) => (
                      <Badge key={index} variant="secondary">
                        {model}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {product.pricing.basedOn && (
                <div>
                  <h3 className="font-semibold mb-2">Based on</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.pricing.basedOn.map((basis, index) => (
                      <Badge key={index} variant="outline">
                        {basis}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
