// Utility function and types for classifying structures consistently across components

export interface StructureTypes {
  hasOAR: boolean;
  hasGTV: boolean;
  hasElective: boolean;
}

export interface StructureTypeCounts {
  OARs: number;
  GTV: number;
  Elective: number;
  total: number;
}

/**
 * Classifies a structure name into OAR, GTV, or Elective
 * @param structure Full structure name (can include region prefix)
 * @returns Object indicating which type the structure is
 */
export function classifyStructure(structure: string): { isGTV: boolean; isElective: boolean } {
  // Split into region and name if structure has a colon
  const parts = structure.split(":");
  const structureName = parts.length > 1 ? parts[1].trim() : structure;
  // Determine structure types with pattern matching
  const isGTV = /\bGTV\b|Gross\s+Tumor|Gross\s+Target/i.test(structureName);

  // Enhanced lymph node and elective structure pattern matching
  const isElective = (
    /\b(CTV|PTV|Clinical\s+Target|Planning\s+Target|Elective)\b/i.test(structureName) ||
    // Lymph node patterns - include common prefixes and full words
    /\b(LN[_\s]|ESTRO_LN|Lymph\s*[Nn]ode|Nodal|Ax_L|IMN)\b/i.test(structureName) ||
    // Additional lymph node naming patterns from specific vendors
    /[-_](LN|IMN|Ax|Node)[_\s]?/i.test(structureName) ||
    // Full region lymph node names
    /(Axillary|Internal\s+Mammary|Mediastinal|Cervical)\s+Node/i.test(structureName)
  );

  return { isGTV, isElective };
}

/**
 * Counts structure types in an array of structures
 * @param structures Array of structure names
 * @returns Object with counts for each structure type
 */
export function countStructureTypes(structures: string[]): StructureTypeCounts {
  const counts: StructureTypeCounts = {
    OARs: 0,
    GTV: 0,
    Elective: 0,
    total: 0
  };

  structures.forEach(structure => {
    const { isGTV, isElective } = classifyStructure(structure);
    
    if (isGTV) {
      counts.GTV++;
    } else if (isElective) {
      counts.Elective++;
    } else {
      counts.OARs++;
    }
    counts.total++;
  });

  return counts;
}
