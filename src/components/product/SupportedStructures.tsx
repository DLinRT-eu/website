
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SupportedStructuresProps {
  structures?: string[];
}

const SupportedStructures = ({ structures }: SupportedStructuresProps) => {
  if (!structures || structures.length === 0) {
    return null;
  }

  // Group structures by anatomical region
  const groupedStructures: Record<string, string[]> = {};
  
  structures.forEach(structure => {
    const parts = structure.split(":");
    if (parts.length > 1) {
      const region = parts[0].trim();
      const structureName = parts[1].trim();
      
      if (!groupedStructures[region]) {
        groupedStructures[region] = [];
      }
      
      groupedStructures[region].push(structureName);
    } else {
      // Handle ungrouped structures
      if (!groupedStructures["Other"]) {
        groupedStructures["Other"] = [];
      }
      groupedStructures["Other"].push(structure.trim());
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Supported Structures</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(groupedStructures).map(([region, structures]) => (
            <div key={region}>
              <h4 className="font-medium text-lg mb-2">{region}</h4>
              <div className="flex flex-wrap gap-2">
                {structures.map((structure, index) => (
                  <Badge key={index} variant="outline" className="bg-blue-50 text-blue-800">
                    {structure}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportedStructures;
