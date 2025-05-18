
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Target, CircleDot } from "lucide-react";

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
  let hasOARs = false;
  let hasGTV = false;
  let hasElective = false;
  
  structures.forEach(structure => {
    const parts = structure.split(":");
    if (parts.length > 1) {
      const region = parts[0].trim();
      const structureName = parts[1].trim();
      
      // Determine if this is a Target or OAR with improved pattern matching for lymph nodes
      const isGTV = /GTV|Gross\s+Tumor|Gross\s+Target/i.test(structureName);
      const isElective = /CTV|PTV|Clinical\s+Target|Planning\s+Target|Elective|LN[_\s]|Lymph\s*[Nn]ode|Nodal|ESTRO_LN|Ax_|\bIMN\b/i.test(structureName);
      const type = isGTV ? "GTV" : (isElective ? "Elective" : "OAR");
      
      // Update global flags
      if (isGTV) hasGTV = true;
      else if (isElective) hasElective = true;
      else hasOARs = true;
      
      // Determine support status
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
      const isElective = /CTV|PTV|Clinical\s+Target|Planning\s+Target|Elective|LN[_\s]|Lymph\s*[Nn]ode|Nodal|ESTRO_LN|Ax_|\bIMN\b/i.test(structure);
      const type = isGTV ? "GTV" : (isElective ? "Elective" : "OAR");
      
      // Update global flags
      if (isGTV) hasGTV = true;
      else if (isElective) hasElective = true;
      else hasOARs = true;
      
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

  // Function to render the capability badge
  const renderCapabilityBadge = (supported: boolean, type: string, icon: React.ReactNode) => (
    <Badge 
      variant={supported ? "success" : "secondary"}
      className={`flex items-center gap-1.5 px-3 py-1 text-sm ${supported ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}
    >
      {type}
      {icon}
    </Badge>
  );

  // Function to get the appropriate icon and color for a structure type
  const getStructureIcon = (type: "OAR" | "GTV" | "Elective") => {
    switch (type) {
      case "OAR":
        return <Shield className="h-4 w-4 text-blue-600" />;
      case "GTV":
        return <Target className="h-4 w-4 text-red-600" />;
      case "Elective":
        return <CircleDot className="h-4 w-4 text-purple-600" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Supported Structures</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Add prominent capability indicators at the top */}
        <div className="flex flex-wrap gap-3 mb-6">
          {renderCapabilityBadge(hasOARs, "OARs", <Shield className="h-4 w-4 ml-1 text-blue-600" />)}
          {renderCapabilityBadge(hasElective, "Elective/Lymph Nodes", <CircleDot className="h-4 w-4 ml-1 text-purple-600" />)}
          {renderCapabilityBadge(hasGTV, "Gross Tumor Volume", <Target className="h-4 w-4 ml-1 text-red-600" />)}
        </div>
        
        {/* Detailed structures grouped by region */}
        <div className="space-y-4">
          {sortedGroups.map((group) => (
            <div key={group.name}>
              <h4 className="font-medium text-lg mb-2 flex items-center gap-2">
                {getStructureIcon(group.type)}
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
                    className={`${structure.supported ? "bg-blue-50 text-blue-800" : "bg-gray-100 text-gray-600"}`}
                  >
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
