
import React from 'react';
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import type { NewsItem } from "@/types/news";

interface NewsCardProps {
  item: NewsItem;
}

const NewsCard = ({ item }: NewsCardProps) => {
  return (
    <Link to={`/news/${item.id}`}>
      <Card className="bg-white hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <time className="text-sm text-blue-600 mb-2 block">{item.date}</time>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
          <p className="text-gray-600">{item.summary}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default NewsCard;
