// Utility functions for parsing and grouping anatomical structures

export interface StructureGroup {
  modelName: string;
  structures: string[];
}

export interface ParsedStructures {
  groups: StructureGroup[];
  ungrouped: string[];
}

/**
 * Parse structure names and group them by model/region prefix
 * e.g., "Head & Neck-CT: Brainstem" becomes { modelName: "Head & Neck-CT", structures: ["Brainstem"] }
 */
export const parseAndGroupStructures = (structures: string[] | any[]): ParsedStructures => {
  const groups: Map<string, Set<string>> = new Map();
  const ungrouped: string[] = [];

  structures.forEach(structure => {
    const structureName = typeof structure === 'string' ? structure : structure?.name || String(structure);
    
    // Skip empty or invalid structure names
    if (!structureName || structureName.trim() === '') {
      return;
    }
    
    // Check if structure follows the "Model: Structure" pattern
    const colonIndex = structureName.indexOf(':');
    if (colonIndex > 0 && colonIndex < structureName.length - 1) {
      const modelName = structureName.substring(0, colonIndex).trim();
      const structureOnly = structureName.substring(colonIndex + 1).trim();
      
      // Avoid duplicate model names in structure names
      if (structureOnly && !structureOnly.startsWith(modelName)) {
        if (!groups.has(modelName)) {
          groups.set(modelName, new Set());
        }
        groups.get(modelName)!.add(structureOnly);
      }
    } else {
      // No model prefix found, add to ungrouped
      ungrouped.push(structureName);
    }
  });

  // Convert Map to array and sort
  const groupedResults: StructureGroup[] = Array.from(groups.entries())
    .map(([modelName, structureSet]) => ({
      modelName,
      structures: Array.from(structureSet).sort()
    }))
    .sort((a, b) => a.modelName.localeCompare(b.modelName));

  return {
    groups: groupedResults,
    ungrouped: ungrouped.sort()
  };
};

/**
 * Format grouped structures for display with truncation
 */
export const formatGroupedStructures = (
  groups: StructureGroup[], 
  ungrouped: string[], 
  maxStructuresPerGroup: number = 8,
  maxGroups: number = 4
): string => {
  let result = '';
  
  // Process grouped structures
  const displayGroups = groups.slice(0, maxGroups);
  displayGroups.forEach((group, groupIndex) => {
    result += `${group.modelName}:\n`;
    
    const displayStructures = group.structures.slice(0, maxStructuresPerGroup);
    result += `  • ${displayStructures.join(', ')}`;
    
    if (group.structures.length > maxStructuresPerGroup) {
      result += `, and ${group.structures.length - maxStructuresPerGroup} more`;
    }
    
    if (groupIndex < displayGroups.length - 1) {
      result += '\n\n';
    }
  });
  
  if (groups.length > maxGroups) {
    result += `\n\n... and ${groups.length - maxGroups} more model(s)`;
  }
  
  // Add ungrouped structures if any
  if (ungrouped.length > 0) {
    if (result) result += '\n\n';
    result += 'Other Structures:\n';
    const displayUngrouped = ungrouped.slice(0, maxStructuresPerGroup);
    result += `  • ${displayUngrouped.join(', ')}`;
    
    if (ungrouped.length > maxStructuresPerGroup) {
      result += `, and ${ungrouped.length - maxStructuresPerGroup} more`;
    }
  }
  
  return result;
};

/**
 * Format grouped structures for PDF export with better spacing
 */
export const formatGroupedStructuresForPDF = (
  groups: StructureGroup[], 
  ungrouped: string[]
): string => {
  let result = '';
  
  // Process all grouped structures for PDF
  groups.forEach((group, groupIndex) => {
    result += `${group.modelName}:\n`;
    result += `  ${group.structures.join(', ')}`;
    
    if (groupIndex < groups.length - 1) {
      result += '\n\n';
    }
  });
  
  // Add ungrouped structures if any
  if (ungrouped.length > 0) {
    if (result) result += '\n\n';
    result += 'Other Structures:\n';
    result += `  ${ungrouped.join(', ')}`;
  }
  
  return result;
};