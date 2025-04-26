import { FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";

const SAMPLE_PRODUCTS = [
  {
    name: "ContourAI Pro",
    company: "RadTech Solutions",
    description: "Advanced auto-contouring system using deep learning for precise organ-at-risk delineation in radiotherapy planning.",
    features: ["Auto-Contouring", "Deep Learning", "Real-time"],
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/placeholder.svg",
    anatomicalLocation: ["Head & Neck", "Thorax"]
  },
  {
    name: "SynthImage RT",
    company: "MedTech Innovations",
    description: "Deep learning-powered image synthesis platform for generating synthetic CT images from MRI scans.",
    features: ["Image Synthesis", "Deep Learning", "MRI-to-CT"],
    category: "Image Synthesis",
    certification: "FDA",
    logoUrl: "/placeholder.svg",
    anatomicalLocation: ["Brain", "Pelvis"]
  },
  {
    name: "RegAlign Pro",
    company: "HealthAI Solutions",
    description: "Intelligent image registration system for precise alignment of multi-modal imaging in radiation therapy.",
    features: ["Image Registration", "Multi-Modal", "Automated"],
    category: "Image Registration",
    certification: "CE",
    logoUrl: "/placeholder.svg",
    anatomicalLocation: ["Thorax", "Abdomen"]
  },
  {
    name: "PlanMaster AI",
    company: "MedTech Innovations",
    description: "Advanced treatment planning system with AI-driven optimization for precise radiotherapy planning.",
    features: ["Treatment Planning", "AI Optimization", "Dose Calculation"],
    category: "Treatment Planning",
    certification: "FDA",
    logoUrl: "/placeholder.svg",
    anatomicalLocation: ["Breast", "Prostate"]
  },
  {
    name: "QAIntelligence",
    company: "HealthAI Solutions",
    description: "Comprehensive quality assurance platform featuring automated plan verification and deep learning-based error detection.",
    features: ["Quality Assurance", "Plan Verification", "Analytics"],
    category: "Quality Assurance",
    certification: "CE",
    logoUrl: "/placeholder.svg",
    anatomicalLocation: ["All Sites"]
  },
  {
    name: "PredictCare RT",
    company: "AI Medical Systems",
    description: "Clinical prediction system using deep learning to forecast treatment outcomes and optimize patient care pathways.",
    features: ["Clinical Prediction", "Outcome Analysis", "Risk Assessment"],
    category: "Clinical Prediction",
    certification: "CE & FDA",
    logoUrl: "/placeholder.svg",
    anatomicalLocation: ["All Sites"]
  }
];

const ProductGrid = () => {
  const exportToExcel = () => {
    const headers = ["Name", "Company", "Category", "Certification", "Features", "Anatomical Location"];
    const data = SAMPLE_PRODUCTS.map(product => [
      product.name,
      product.company,
      product.category,
      product.certification || "N/A",
      product.features.join(", "),
      (product.anatomicalLocation || []).join(", ")
    ]);

    const csvContent = [
      headers.join(","),
      ...data.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "products.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
      <div className="mb-6 flex justify-end">
        <Button
          variant="outline"
          onClick={exportToExcel}
          className="flex items-center gap-2"
        >
          <FileSpreadsheet className="h-4 w-4" />
          Export to CSV
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SAMPLE_PRODUCTS.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
