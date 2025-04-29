
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Initiative } from '@/types/initiative';

interface InitiativeCardProps extends Initiative {}

const InitiativeCard = ({
  name,
  category,
  description,
  website,
  organization,
  status,
  tags
}: InitiativeCardProps) => {
  // Determine badge color based on status
  const getBadgeColor = () => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'Completed':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'Upcoming':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl text-[#1A1F2C]">{name}</CardTitle>
          <Badge variant="outline" className={getBadgeColor()}>
            {status}
          </Badge>
        </div>
        <CardDescription className="text-gray-600">
          {organization}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="secondary" className="bg-[#9b87f5]/10 text-[#9b87f5] hover:bg-[#9b87f5]/20">
            {category}
          </Badge>
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{tags.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <a href={website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
            Visit Website <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InitiativeCard;
