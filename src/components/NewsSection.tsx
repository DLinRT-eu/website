
import { Card, CardContent } from "@/components/ui/card";
import dataService from "@/services/DataService";
import { Link } from "react-router-dom";

const NewsSection = () => {
  const latestNews = dataService.getLatestNews(3);

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestNews.map((item, index) => (
            <Link to={`/news/${item.id}`} key={item.id}>
              <Card className="bg-white hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <time className="text-sm text-blue-600 mb-2 block">{item.date}</time>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.summary}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
