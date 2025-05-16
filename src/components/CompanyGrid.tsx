import { useMemo } from "react";

interface CompanyGridProps {
  companies: Array<any>; // Replace `any` with your company type
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
        </div>
      ))}
    </div>
  );
};

export default CompanyGrid;