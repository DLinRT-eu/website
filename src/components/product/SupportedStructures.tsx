
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Shield, Target } from "lucide-react";

interface SupportedStructuresProps {
  structures?: string[];
}

interface StructureGroup {
  name: string;
  structures: StructureInfo[];
  type: "OAR" | "GTV" | "Elective";
}

interface StructureInfo {
  name: string;
  supported: boolean;
}

const SupportedStructures = ({ structures }: SupportedStructuresProps) => {
  if (!structures || structures.length === 0) {
    return null;
  }

  // Parse and categorize structures
  const groupedStructures: Record<string, StructureGroup> = {};
  
  structures.forEach(structure => {
    const parts = structure.split(":");
    if (parts.length > 1) {
      const region = parts[0].trim();
      const structureName = parts[1].trim();
      
      // Determine if this is a Target or OAR
      // Default to OAR unless specifically marked as target (contains GTV, CTV, PTV, etc.)
      const isGTV = /GTV|Gross\s+Tumor|Gross\s+Target/i.test(structureName);
      const isElective = /CTV|PTV|Clinical\s+Target|Planning\s+Target|Elective/i.test(structureName);
      const type = isGTV ? "GTV" : (isElective ? "Elective" : "OAR");
      
      // Determine support status (default to supported unless explicitly marked as unsupported)
      const isSupported = !structureName.includes("(unsupported)");
      const cleanName = structureName.replace("(unsupported)", "").trim();
      
      if (!groupedStructures[region]) {
        groupedStructures[region] = {
          name: region,
          structures: [],
          type: "OAR" // Will be updated if targets are found
        };
      }
      
      groupedStructures[region].structures.push({
        name: cleanName,
        supported: isSupported
      });
      
      if (type === "GTV" || type === "Elective") {
        groupedStructures[region].type = type;
      }
    } else {
      // Handle ungrouped structures
      if (!groupedStructures["Other"]) {
        groupedStructures["Other"] = {
          name: "Other",
          structures: [],
          type: "OAR"
        };
      }
      
      const isGTV = /GTV|Gross\s+Tumor|Gross\s+Target/i.test(structure);
      const isElective = /CTV|PTV|Clinical\s+Target|Planning\s+Target|Elective/i.test(structure);
      const type = isGTV ? "GTV" : (isElective ? "Elective" : "OAR");
      
      const isSupported = !structure.includes("(unsupported)");
      const cleanName = structure.replace("(unsupported)", "").trim();
      
      groupedStructures["Other"].structures.push({
        name: cleanName,
        supported: isSupported
      });
      
      if (type === "GTV" || type === "Elective") {
        groupedStructures["Other"].type = type;
      }
    }
  });

  // Sort groups: OARs first, then GTV, then Elective
  const sortedGroups = Object.values(groupedStructures).sort((a, b) => {
    const typeOrder = { OAR: 0, GTV: 1, Elective: 2 };
    return typeOrder[a.type] - typeOrder[b.type];
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Supported Structures</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedGroups.map((group) => (
            <div key={group.name}>
              <h4 className="font-medium text-lg mb-2 flex items-center gap-2">
                {group.type === "OAR" ? (
                  <Shield className="h-4 w-4 text-blue-600" />
                ) : (
                  <Target className="h-4 w-4 text-red-600" />
                )}
                {group.name} 
                <span className="text-sm text-gray-500 font-normal">
                  ({group.type === "OAR" ? "OARs" : (group.type === "GTV" ? "Target GTV" : "Elective")})
                </span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {group.structures.map((structure, index) => (
                  <Badge 
                    key={index} 
                    variant={structure.supported ? "outline" : "secondary"}
                    className={`flex items-center gap-1 ${structure.supported ? "bg-blue-50 text-blue-800" : "bg-gray-100 text-gray-600"}`}
                  >
                    {structure.supported ? (
                      <Check className="h-3 w-3 text-green-600" />
                    ) : (
                      <X className="h-3 w-3 text-red-600" />
                    )}
                    {structure.name}
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
