import { FileExcel } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";

const SAMPLE_PRODUCTS = [
  {
    name: "RadAI Contouring",
    company: "RadTech Solutions",
    description: "Automated contouring system using deep learning for precise organ-at-risk delineation in radiotherapy planning.",
    features: ["Auto-Contouring", "Deep Learning", "Real-time"],
    category: "Contouring",
    certification: "CE & FDA",
    logoUrl: "/placeholder.svg",
    productUrl: "https://example.com/radai",
    companyUrl: "https://example.com/radtech",
    anatomicalLocation: ["Head & Neck", "Thorax"]
  },
  {
    name: "PlanMaster AI",
    company: "MedTech Innovations",
    description: "Advanced treatment planning system with AI-driven optimization for precise radiotherapy planning and dose calculation.",
    features: ["Treatment Planning", "AI Optimization", "Dose Calculation"],
    category: "Treatment Planning",
    certification: "FDA",
    logoUrl: "/placeholder.svg",
    productUrl: "https://example.com/planmaster",
    companyUrl: "https://example.com/medtech",
    anatomicalLocation: ["Breast", "Prostate"]
  },
  {
    name: "DoseOptimize Pro",
    company: "AI Medical Systems",
    description: "AI-powered dose optimization platform for personalized radiation therapy treatment planning.",
    features: ["Dose Optimization", "Adaptive Planning", "Cloud-based"],
    category: "Dosimetry",
    certification: "FDA",
    logoUrl: "/placeholder.svg"
  },
  {
    name: "QAIntelligence",
    company: "HealthAI Solutions",
    description: "Intelligent quality assurance system for radiation therapy, featuring automated plan verification.",
    features: ["Quality Assurance", "Plan Verification", "Analytics"],
    category: "Quality Assurance",
    certification: "CE",
    logoUrl: "/placeholder.svg"
  }
];

const ProductGrid = () => {
  const exportToExcel = () => {
    const headers = ["Name", "Company", "Category", "Certification", "Features"];
    const data = SAMPLE_PRODUCTS.map(product => [
      product.name,
      product.company,
      product.category,
      product.certification || "N/A",
      product.features.join(", ")
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
          <FileExcel className="h-4 w-4" />
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
