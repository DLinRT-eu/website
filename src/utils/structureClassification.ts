
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
 * Checks if a structure name contains left/right pattern (L/R, R/L)
 * @param structure Structure name
 * @returns true if structure contains L/R or R/L pattern
 */
export function hasLateralityPattern(structure: string): boolean {
  return /\(L\/R\)|\(R\/L\)|\sL\/R\s|\sR\/L\s|\s\(L\/R\)|\s\(R\/L\)|\(L\)|\(R\)|\sL\s|\sR\s/.test(structure);
}

/**
 * Classifies a structure name into OAR, GTV, or Elective
 * @param structure Full structure name (can include region prefix)
 * @returns Object indicating which type the structure is
 */
export function classifyStructure(structure: string): { isGTV: boolean; isElective: boolean } {
  // Determine structure types with pattern matching on the FULL string
  // GTV pattern - looking for explicit GTV markers and lesion references
  const isGTV = (
    /\bGTV\b|Gross\s+Tumor|Gross\s+Target/i.test(structure) ||
    /\blesion[s]?\b|\blesional\b/i.test(structure)
  );

  // Enhanced lymph node and elective structure pattern matching
  const isElective = (
    // Check for clinical/planning target volumes
    /\b(CTV|PTV|Clinical\s+Target|Planning\s+Target|Elective)\b/i.test(structure) ||
    
    // Match any LN (Lymph Node) patterns - including ESTRO and ALL LN_ prefixes
    /\bLN[_\s\-]|LN_Pelvics|LN_Breast|LN_B_RTOG|\bLN\b/i.test(structure) ||
    /\bESTRO_LN/i.test(structure) ||
    
    // Match any string starting with LN_ (captures all lymph node structures)
    /^LN_/i.test(structure) ||
    
    // Add specific pattern for ESTRO LN structures
    /LN_ESTRO/i.test(structure) ||
    
    // Common lymph node prefixes and suffixes
    /\b(ESTRO_LN|Lymph\s*[Nn]ode|Nodal|Ax_L|IMN)\b/i.test(structure) ||
    /[-_](LN|IMN|Ax|Node)[s]?(\s|$|\()/i.test(structure) ||
    
    // Additional lymph node naming patterns from specific vendors
    /\bLN[-_\s]?\d*\b/i.test(structure) ||
    /\bNode[s]?\b/i.test(structure) ||
    
    // Full region lymph node names
    /(Axillary|Internal\s+Mammary|Mediastinal|Cervical|Supraclavicular|Infraclavicular)\s+(Node|LN)/i.test(structure) ||
    
    // Look for the word "nodes" anywhere in the structure name
    /\bNodes\b|\(Nodes\)/i.test(structure) ||
    
    // Match level-specific nodal naming
    /Level\s+[IV]+\s+(LN|Node)/i.test(structure)
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
    
    // Check if structure has L/R pattern - count as two structures if it does
    const multiplier = hasLateralityPattern(structure) ? 2 : 1;
    
    if (isGTV) {
      counts.GTV += multiplier;
    } else if (isElective) {
      counts.Elective += multiplier;
    } else {
      counts.OARs += multiplier;
    }
    
    counts.total += multiplier;
  });

  return counts;
}
