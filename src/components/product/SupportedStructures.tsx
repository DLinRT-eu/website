
/** @jsxImportSource react */
import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Target, CircleDot, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { classifyStructure, StructureTypes, hasLateralityPattern } from '@/utils/structureClassification';
import type { ProductDetails } from '@/types/productDetails';

interface SupportedStructuresProps {
  structures?: string[] | Array<{
    name: string;
    type: string;
    accuracy?: string;
    validationDataset?: string;
  }>;
  product?: ProductDetails; // Add product prop to access guidelines
}

interface StructureGroup {
  name: string;
  structures: StructureInfo[];
  types: StructureTypes;
  model?: string;
}

interface StructureInfo {
  name: string;
  supported: boolean;
  type: "OAR" | "GTV" | "Elective";
}

const SupportedStructures: React.FC<SupportedStructuresProps> = ({ structures, product }) => {
  if (!structures || structures.length === 0) {
    return null;
  }

  // Get DOI links from guidelines
  const getGuidelinesDOI = () => {
    if (!product?.guidelines) return [];
    return product.guidelines
      .filter(guideline => guideline.url && guideline.url.includes('doi'))
      .map(guideline => ({
        name: guideline.name,
        url: guideline.url,
        compliance: guideline.compliance
      }));
  };

  const guidelinesDOI = getGuidelinesDOI();

  // Parse and categorize structures
  const groupedStructures: Record<string, StructureGroup> = {};
  let hasOARs = false;
  let hasGTV = false;
  let hasElective = false;
  const modelTypes: Record<string, StructureTypes> = {};
  let totalOARs = 0;
  let totalGTV = 0;
  let totalElective = 0;

  // Process and group structures
  const processStructures = structures.map(structure => {
    // Handle both string and object structures
    if (typeof structure === 'object' && structure !== null) {
      return {
        structureName: structure.name,
        structureType: structure.type,
        region: 'Default',
        model: 'Default',
        isSupported: true
      };
    } else if (typeof structure === 'string') {
      const parts = structure.split(":");
      if (parts.length > 1) {
        const region = parts[0].trim();
        const structureName = parts[1].trim();
        
        // Extract model name if present
        const modelMatch = region.match(/(.*?(?:-(?:CT|MR(?:I)?(?:\s+T[12])?))?$)/i);
        const model = modelMatch ? modelMatch[1].trim() : region;
        
        const isSupported = !structureName.includes("(unsupported)");
        const cleanName = structureName.replace("(unsupported)", "").trim();
        
        return {
          structureName: cleanName,
          region: region,
          model: model,
          isSupported: isSupported,
          structureType: ''  // Will be classified below
        };
      }
      return {
        structureName: structure,
        region: 'Default',
        model: 'Default',
        isSupported: true,
        structureType: ''
      };
    }
    return null;
  }).filter(Boolean);

  // Process each structure
  processStructures.forEach(item => {
    if (!item) return;
    
    const { structureName, region, model, isSupported } = item;
    let structureType = item.structureType;
    
    // Use shared utility for classification if type is not already provided
    if (!structureType) {
      const structureString = `${region}:${structureName}`;
      const { isGTV, isElective } = classifyStructure(structureString);
      structureType = isGTV ? "GTV" : isElective ? "Elective" : "OAR";
    }
    
    const type = structureType === "GTV" ? "GTV" : structureType === "Elective" ? "Elective" : "OAR";
    const isGTV = type === "GTV";
    const isElective = type === "Elective";
    const isOAR = type === "OAR";
    
    // Update structure counts with laterality check
    const multiplier = hasLateralityPattern(structureName) ? 2 : 1;
    if (isGTV) {
      totalGTV += multiplier;
      hasGTV = true;
    }
    if (isElective) {
      totalElective += multiplier;
      hasElective = true;
    }
    if (isOAR) {
      totalOARs += multiplier;
      hasOARs = true;
    }
    
    // Track which types each model supports
    if (!modelTypes[model]) {
      modelTypes[model] = { hasOAR: false, hasGTV: false, hasElective: false };
    }
    if (isGTV) modelTypes[model].hasGTV = true;
    if (isElective) modelTypes[model].hasElective = true;
    if (isOAR) modelTypes[model].hasOAR = true;
    
    if (!groupedStructures[region]) {
      groupedStructures[region] = {
        name: region,
        structures: [],
        types: { hasOAR: false, hasGTV: false, hasElective: false },
        model
      };
    }
    
    groupedStructures[region].structures.push({
      name: structureName,
      supported: isSupported,
      type: type as "OAR" | "GTV" | "Elective"
    });
    
    // Update group types
    if (isGTV) groupedStructures[region].types.hasGTV = true;
    if (isElective) groupedStructures[region].types.hasElective = true;
    if (isOAR) groupedStructures[region].types.hasOAR = true;
  });

  // Sort structures by type
  Object.values(groupedStructures).forEach(group => {
    group.structures.sort((a, b) => {
      const typeOrder: Record<string, number> = { 
        GTV: 0, 
        Elective: 1, 
        OAR: 2 
      };
      return typeOrder[a.type] - typeOrder[b.type];
    });
  });

  // Sort groups by importance (GTV > Elective > OAR)
  const sortedGroups = Object.values(groupedStructures).sort((a, b) => {
    const aTypeCount = Number(a.types.hasOAR) + Number(a.types.hasGTV) + Number(a.types.hasElective);
    const bTypeCount = Number(b.types.hasOAR) + Number(b.types.hasGTV) + Number(b.types.hasElective);
    if (bTypeCount !== aTypeCount) return bTypeCount - aTypeCount;
    if (a.types.hasGTV !== b.types.hasGTV) return b.types.hasGTV ? 1 : -1;
    if (a.types.hasElective !== b.types.hasElective) return b.types.hasElective ? 1 : -1;
    return 0;
  });

  // Create a combined category label
  const getCategoryLabel = () => {
    const categories = [];
    if (hasOARs) categories.push("OARs");
    if (hasGTV) categories.push("GTV");
    if (hasElective) categories.push("Elective");
    
    return categories.join(" + ");
  };

  // Function to get the appropriate icon and color for a structure type
  const getStructureIcon = (type: "OAR" | "GTV" | "Elective") => {
    switch (type) {
      case "OAR":
        return <Shield className="h-4 w-4 text-blue-600" aria-hidden="true" />;
      case "GTV":
        return <Target className="h-4 w-4 text-red-600" aria-hidden="true" />;
      case "Elective":
        return <CircleDot className="h-4 w-4 text-purple-600" aria-hidden="true" />;
    }
  };

  const categoryLabel = getCategoryLabel();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Supported Structures {categoryLabel && <span className="text-base font-normal text-gray-500 ml-2">({categoryLabel})</span>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Summary badges section */}
        <div className="flex flex-wrap gap-3 mb-6">
          {totalOARs > 0 && (
            <div className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5",
              "bg-blue-50 text-blue-700 border-blue-200"
            )}>
              <Shield className="h-4 w-4" aria-hidden="true" />
              <span className="font-medium">OARs</span>
              <span className="font-normal">({totalOARs})</span>
            </div>
          )}
          {totalGTV > 0 && (
            <div className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5",
              "bg-red-50 text-red-700 border-red-200"
            )}>
              <Target className="h-4 w-4" aria-hidden="true" />
              <span className="font-medium">GTV</span>
              <span className="font-normal">({totalGTV})</span>
            </div>
          )}
          {totalElective > 0 && (
            <div className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5",
              "bg-purple-50 text-purple-700 border-purple-200"
            )}>
              <CircleDot className="h-4 w-4" aria-hidden="true" />
              <span className="font-medium">Elective</span>
              <span className="font-normal">({totalElective})</span>
            </div>
          )}
        </div>

        {/* Guidelines DOI links section */}
        {guidelinesDOI.length > 0 && (
          <div className="mb-6 p-3 bg-gray-50 rounded-lg">
            <h5 className="text-sm font-medium text-gray-900 mb-2">Guidelines DOI:</h5>
            <div className="flex flex-wrap gap-2">
              {guidelinesDOI.map((guideline, index) => (
                <a
                  key={index}
                  href={guideline.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 underline"
                >
                  <ExternalLink className="h-3 w-3" />
                  {guideline.name}
                  {guideline.compliance && (
                    <span className="ml-1 text-gray-500">({guideline.compliance})</span>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Detailed structures grouped by region */}
        <div className="space-y-4">
          {sortedGroups.map((group) => (
            <div key={group.name}>
              <h4 className="font-medium text-lg mb-2 flex items-center gap-2 flex-wrap">
                <div className="flex gap-1">
                  {group.types.hasOAR && <Shield className="h-4 w-4 text-blue-600" aria-hidden="true" />}
                  {group.types.hasGTV && <Target className="h-4 w-4 text-red-600" aria-hidden="true" />}
                  {group.types.hasElective && <CircleDot className="h-4 w-4 text-purple-600" aria-hidden="true" />}
                </div>
                {group.name}
                <span className="text-sm text-gray-500 font-normal">
                  ({[
                    group.types.hasOAR ? "OARs" : null,
                    group.types.hasGTV ? "GTV" : null,
                    group.types.hasElective ? "Elective" : null
                  ].filter(Boolean).join(" + ")})
                </span>
                {/* DOI links for this specific model/group */}
                {guidelinesDOI.length > 0 && (
                  <div className="flex gap-1 ml-2">
                    {guidelinesDOI.map((guideline, index) => (
                      <a
                        key={index}
                        href={guideline.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 underline"
                        title={`${guideline.name} ${guideline.compliance ? `(${guideline.compliance})` : ''}`}
                      >
                        <ExternalLink className="h-3 w-3" />
                        DOI
                      </a>
                    ))}
                  </div>
                )}
              </h4>
              <div className="flex flex-wrap gap-2">
                {group.structures.map((structure, index) => (
                  <div
                    key={index}
                    className={cn(
                      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold gap-1",
                      structure.supported 
                        ? structure.type === "OAR"
                          ? "bg-blue-50 text-blue-800 border-blue-200"
                          : structure.type === "GTV"
                            ? "bg-red-50 text-red-800 border-red-200"
                            : "bg-purple-50 text-purple-800 border-purple-200"
                        : "bg-gray-100 text-gray-600 border-gray-200"
                    )}
                  >
                    {getStructureIcon(structure.type)}
                    {structure.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Model capability badges section */}
        <div className="flex flex-wrap gap-3 border-t pt-4 mt-6">
          {hasOARs && (
            <div className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5",
              "bg-blue-50 text-blue-700 border-blue-200"
            )}>
              <Shield className="h-4 w-4" aria-hidden="true" />
              <span>OARs</span>
              <span className="text-gray-500 font-normal">
                ({Object.entries(modelTypes).filter(([_, types]) => types.hasOAR).map(([model]) => model).join(", ")})
              </span>
            </div>
          )}
          
          {hasGTV && (
            <div className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5",
              "bg-red-50 text-red-700 border-red-200"
            )}>
              <Target className="h-4 w-4" aria-hidden="true" />
              <span>GTV</span>
              <span className="text-gray-500 font-normal">
                ({Object.entries(modelTypes).filter(([_, types]) => types.hasGTV).map(([model]) => model).join(", ")})
              </span>
            </div>
          )}
          
          {hasElective && (
            <div className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5",
              "bg-purple-50 text-purple-700 border-purple-200"
            )}>
              <CircleDot className="h-4 w-4" aria-hidden="true" />
              <span>Elective</span>
              <span className="text-gray-500 font-normal">
                ({Object.entries(modelTypes).filter(([_, types]) => types.hasElective).map(([model]) => model).join(", ")})
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportedStructures;
