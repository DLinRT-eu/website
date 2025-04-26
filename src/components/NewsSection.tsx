
import { Card, CardContent } from "@/components/ui/card";

const NEWS_ITEMS = [
  {
    date: "April 24, 2025",
    title: "AI in Contouring: Latest Developments",
    summary: "New breakthroughs in auto-contouring accuracy and efficiency."
  },
  {
    date: "April 22, 2025",
    title: "Quality Assurance Evolution",
    summary: "How AI is revolutionizing QA processes in radiotherapy."
  },
  {
    date: "April 20, 2025",
    title: "Treatment Planning Innovation",
    summary: "AI-driven personalization in treatment planning systems."
  }
];

const NewsSection = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NEWS_ITEMS.map((item, index) => (
            <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <time className="text-sm text-blue-600 mb-2 block">{item.date}</time>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.summary}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
