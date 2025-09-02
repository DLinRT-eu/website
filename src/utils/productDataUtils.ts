import { ProductDetails } from "@/types/productDetails";

// Helper function to format date to YYYY-MM-DD
const formatToYYYYMMDD = (dateString: string | undefined): string => {
  if (!dateString) return "2000-01-01";
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

/**
 * Standardizes version and date information across products
 */
export const standardizeDates = (product: ProductDetails): ProductDetails => {
  const today = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
  
  return {
    ...product,
    // Standardize date formats and set defaults
    lastRevised: formatToYYYYMMDD(product.lastRevised || today),
    lastUpdated: formatToYYYYMMDD(product.lastUpdated || today),
    releaseDate: formatToYYYYMMDD(product.releaseDate)
  };
};

/**
 * Standardizes basic product information
 */
export const standardizeBasicInfo = (product: ProductDetails): ProductDetails => {
  // Ensure features list has 3-5 items with consistent formatting
  const featuresSource = Array.isArray(product.features)
    ? product.features
    : Array.isArray(product.keyFeatures)
      ? product.keyFeatures!
      : [] as string[];

  const standardizedFeatures = featuresSource.slice(0, 5);
  while (standardizedFeatures.length < 3) {
    standardizedFeatures.push("Feature not specified");
  }
  
  return {
    ...product,
    features: standardizedFeatures,
    // Ensure website is present
    website: product.website || product.productUrl || product.companyUrl || "",
  };
};

/**
 * Standardizes technical information
 */
export const standardizeTechnicalInfo = (product: ProductDetails): ProductDetails => {
  // Convert single modality strings to arrays
  const modalityArray = Array.isArray(product.modality) 
    ? product.modality 
    : product.modality 
      ? [product.modality] 
      : ["Not specified"];
  
  // Standardize anatomical locations
  const standardLocations = standardizeAnatomicalLocations(product.anatomicalLocation || []);
  
  return {
    ...product,
    modality: modalityArray,
    anatomicalLocation: standardLocations,
  };
};

/**
 * Standardizes anatomical locations to use consistent terminology
 */
export const standardizeAnatomicalLocations = (locations: string[]): string[] => {
  const anatomicalMap: Record<string, string> = {
    "Head": "Head & Neck",
    "Neck": "Head & Neck",
    "Thoracic": "Thorax",
    "Chest": "Thorax",
    "Brain": "Brain",
    "Abdomen": "Abdomen",
    "Pelvis": "Pelvis",
    "Prostate": "Pelvis",
    "Whole body": "Whole Body",
    "WholeBody": "Whole Body",
  };
  
  return locations.map(location => anatomicalMap[location] || location);
};

/**
 * Standardizes regulatory and market information
 */
export const standardizeRegulatoryInfo = (product: ProductDetails): ProductDetails => {
  const standardProduct = { ...product };
  
  // Create regulatory field if it doesn't exist
  if (!standardProduct.regulatory) {
    standardProduct.regulatory = {
      ce: { status: "Not specified" },
      fda: "Not specified",
      intendedUseStatement: "Not specified"
    };
  } 
  // Create CE field if it doesn't exist
  else if (!standardProduct.regulatory.ce) {
    standardProduct.regulatory.ce = { status: "Not specified" };
  }
  
  // Standardize CE status
  if (standardProduct.regulatory.ce.status) {
    const status = standardProduct.regulatory.ce.status.toLowerCase();
    if (status.includes("certif") || status.includes("approv")) {
      standardProduct.regulatory.ce.status = "Certified";
    } else if (status.includes("pend") || status.includes("review")) {
      standardProduct.regulatory.ce.status = "Pending";
    } else if (status.includes("not")) {
      standardProduct.regulatory.ce.status = "Not available";
    }
  }
  
  // Standardize FDA status
  if (standardProduct.regulatory.fda) {
    const fda = standardProduct.regulatory.fda.toLowerCase();
    if (fda.includes("510(k)") || fda.includes("clear")) {
      standardProduct.regulatory.fda = "510(k) Cleared";
    } else if (fda.includes("pend") || fda.includes("review")) {
      standardProduct.regulatory.fda = "Under review";
    } else if (fda.includes("not")) {
      standardProduct.regulatory.fda = "Not available";
    }
  }
  
  return standardProduct;
};

/**
 * Creates a standardized supportedStructures array format
 */
export const standardizeSupportedStructures = (product: ProductDetails): ProductDetails => {
  if (product.category !== "Auto-Contouring" || !product.supportedStructures) {
    return product;
  }
  
  // Categorize structures by region
  const standardizedStructures: string[] = [];
  product.supportedStructures.forEach(structure => {
    // If structure already has a region prefix (e.g., "Brain: Brainstem"), keep it
    if (structure.includes(":")) {
      standardizedStructures.push(structure);
    } 
    // Otherwise add a region prefix based on the structure name
    else {
      const structureLower = structure.toLowerCase();
      
      if (structureLower.includes("brain") || 
          structureLower.includes("optic") || 
          structureLower.includes("pituitary")) {
        standardizedStructures.push(`Brain: ${structure}`);
      } 
      else if (structureLower.includes("lung") || 
               structureLower.includes("heart") || 
               structureLower.includes("esophagus")) {
        standardizedStructures.push(`Thorax: ${structure}`);
      }
      else if (structureLower.includes("liver") || 
               structureLower.includes("kidney") || 
               structureLower.includes("spleen")) {
        standardizedStructures.push(`Abdomen: ${structure}`);
      }
      else if (structureLower.includes("bladder") || 
               structureLower.includes("prostate") || 
               structureLower.includes("rectum") ||
               structureLower.includes("femoral")) {
        standardizedStructures.push(`Pelvis: ${structure}`);
      }
      else if (structureLower.includes("parotid") || 
               structureLower.includes("mandibular") || 
               structureLower.includes("larynx") ||
               structureLower.includes("thyroid")) {
        standardizedStructures.push(`Head & Neck: ${structure}`);
      }
      else {
        standardizedStructures.push(structure);
      }
    }
  });
  
  return {
    ...product,
    supportedStructures: standardizedStructures
  };
};

/**
 * Fully standardizes a product by applying all standardization functions
 */
export const standardizeProduct = (product: ProductDetails): ProductDetails => {
  let standardized = { ...product };
  standardized = standardizeDates(standardized);
  standardized = standardizeBasicInfo(standardized);
  standardized = standardizeTechnicalInfo(standardized);
  standardized = standardizeRegulatoryInfo(standardized);
  standardized = standardizeSupportedStructures(standardized);
  
  return standardized;
};

/**
 * Enhance chart visualization data based on revision dates
 */
export const enhanceRevisionChartData = (data: any[]): any[] => {
  // Ensure we have valid data
  if (!data || !Array.isArray(data)) return [];
  
  return data.map(item => {
    // Add a more descriptive name property
    let name = item.name;
    if (name === '0-3 months') {
      name = 'Recent (0-3 months)';
    } else if (name === '3-6 months') {
      name = 'Due Soon (3-6 months)';
    } else if (name === '6-12 months') {
      name = 'Overdue (6-12 months)';
    } else if (name === '> 12 months') {
      name = 'Critical (> 12 months)';
    }
    
    return {
      ...item,
      name,
      // Enhance with tooltips
      tooltip: `${name}: ${item.value} products`
    };
  });
};
