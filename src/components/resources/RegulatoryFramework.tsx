import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RegulatoryFramework = () => {
  const riskClasses = [
    {
      class: "I",
      riskLevel: "Low",
      example: "Simple QA software",
      description: "Low risk to patient safety"
    },
    {
      class: "IIa", 
      riskLevel: "Medium",
      example: "Dose calculation software",
      description: "Medium risk requiring additional oversight"
    },
    {
      class: "IIb",
      riskLevel: "Medium-High", 
      example: "Contouring software for critical organs",
      description: "Higher risk requiring clinical evidence"
    },
    {
      class: "III",
      riskLevel: "High",
      example: "Software directing dosing without human intervention",
      description: "Highest risk requiring extensive validation"
    }
  ];

  return (
    <div className="space-y-8">
      {/* MDR Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground">
            Medical Device Regulation (MDR - EU 2017/745)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            The MDR classifies AI software as Software as a Medical Device (SaMD) and assigns 
            risk classes based on the potential impact on patient safety and healthcare decisions. 
            Each class has specific requirements for clinical evidence, quality management, 
            and post-market surveillance.
          </p>
        </CardContent>
      </Card>

      {/* Risk Classification Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground">
            MDR Risk Classifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Class</TableHead>
                  <TableHead className="font-semibold">Risk Level</TableHead>
                  <TableHead className="font-semibold">Example (in Radiotherapy)</TableHead>
                  <TableHead className="font-semibold">Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {riskClasses.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-center">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded font-bold">
                        {item.class}
                      </span>
                    </TableCell>
                    <TableCell>{item.riskLevel}</TableCell>
                    <TableCell>{item.example}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {item.description}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card className="bg-muted/30">
        <CardContent className="p-6">
          <h4 className="font-semibold text-foreground mb-3">Key Regulatory Considerations</h4>
          <ul className="space-y-2 text-muted-foreground text-sm">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span><strong>CE Marking:</strong> Required for all medical devices sold in the EU</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span><strong>Clinical Evidence:</strong> Higher risk classes require more extensive clinical validation</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span><strong>Post-Market Surveillance:</strong> Ongoing monitoring required for all classes</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span><strong>Quality Management:</strong> ISO 13485 compliance required for manufacturers</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegulatoryFramework;