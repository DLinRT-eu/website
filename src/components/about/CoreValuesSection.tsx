
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const CoreValuesSection = () => {
  const values = [
    {
      title: "Non-Profit",
      description: "Driven by mission, not profit. We prioritize patient care and scientific advancement."
    },
    {
      title: "Independent", 
      description: "Unbiased evaluations and recommendations free from commercial influence."
    },
    {
      title: "Open-Source",
      description: "Transparent, collaborative development with open access to knowledge and tools."
    },
    {
      title: "Community-Driven",
      description: "Built by and for the radiotherapy community, fostering collaboration and knowledge sharing."
    },
    {
      title: "Security & Privacy",
      description: "Protecting user data with enterprise-grade security measures and transparent privacy practices.",
      hasLink: true,
      linkTo: "/security-monitoring",
      icon: Shield
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Core Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {values.map((value) => (
            <div key={value.title} className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                {value.icon && (
                  <div className="flex justify-center mb-3">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                )}
                <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{value.description}</p>
                {value.hasLink && (
                  <Link 
                    to={value.linkTo}
                    className="inline-flex items-center text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Learn More →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoreValuesSection;
