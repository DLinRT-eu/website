
import ProductCard from "./ProductCard";

const SAMPLE_PRODUCTS = [
  {
    name: "RadAI Contouring",
    company: "RadTech Solutions",
    description: "Automated contouring system using deep learning for precise organ-at-risk delineation in radiotherapy planning.",
    features: ["Auto-Contouring", "Deep Learning", "Real-time"],
    category: "Contouring",
    certification: "CE & FDA",
    logoUrl: "/placeholder.svg"
  },
  {
    name: "PlanMaster AI",
    company: "MedTech Innovations",
    description: "Advanced treatment planning system with AI-driven optimization for precise radiotherapy planning and dose calculation.",
    features: ["Treatment Planning", "AI Optimization", "Dose Calculation"],
    category: "Treatment Planning",
    certification: "FDA",
    logoUrl: "/placeholder.svg"
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {SAMPLE_PRODUCTS.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  );
};

export default ProductGrid;
