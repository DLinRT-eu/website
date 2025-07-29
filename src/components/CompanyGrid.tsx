import { useMemo } from "react";
import { CompanyDetails } from "@/types/company";
import { Product } from "@/types/product";

interface ExtendedCompanyDetails extends CompanyDetails {
  products: Product[];
  productCount: number;
}

interface CompanyGridProps {
  companies: ExtendedCompanyDetails[];
}

const CompanyGrid = ({ companies }: CompanyGridProps) => {
  // Shuffle companies randomly on each reload (only once)
  const shuffledCompanies = useMemo(() => {
    const arr = [...companies];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [companies]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {shuffledCompanies.map((company) => (
        <div key={company.id} className="company-card">
          {/* Render company details */}
          <h3>{company.name}</h3>
          <p>{company.description}</p>
          <span>Products: {company.productCount}</span>
        </div>
      ))}
    </div>
  );
};

export default CompanyGrid;