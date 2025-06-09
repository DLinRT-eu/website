
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
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Core Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <div key={value.title} className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoreValuesSection;
