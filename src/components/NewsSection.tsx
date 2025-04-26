
import { Card, CardContent } from "@/components/ui/card";
import dataService from "@/services/DataService";
import NewsCard from "./news/NewsCard";

const NewsSection = () => {
  const latestNews = dataService.getLatestNews(3);

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestNews.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
