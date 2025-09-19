import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  BarChart3, 
  BookOpen, 
  Beaker, 
  ArrowRight,
  TrendingUp,
  Shield,
  Microscope
} from 'lucide-react';

interface QuickAccessCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  badge?: string;
  badgeVariant?: 'default' | 'secondary' | 'outline';
}

const QuickAccessCard: React.FC<QuickAccessCardProps> = ({
  title,
  description,
  icon,
  href,
  badge,
  badgeVariant = 'secondary'
}) => (
  <Link to={href} className="group">
    <Card className="h-full transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 border-border hover:border-primary/20 group-hover:scale-[1.02]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
              {icon}
            </div>
            <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
          </div>
          {badge && (
            <Badge variant={badgeVariant} className="text-xs">
              {badge}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {description}
        </p>
        <div className="flex items-center text-primary font-medium text-sm group-hover:text-primary/80 transition-colors">
          Explore now
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </CardContent>
    </Card>
  </Link>
);

interface QuickAccessSectionProps {
  productCount: number;
  companyCount: number;
}

const QuickAccessSection: React.FC<QuickAccessSectionProps> = ({
  productCount,
  companyCount
}) => {
  const accessCards: QuickAccessCardProps[] = [
    {
      title: 'Browse Products',
      description: 'Explore our comprehensive database of deep learning solutions for radiotherapy, from auto-contouring to treatment planning.',
      icon: <Package className="h-5 w-5" />,
      href: '/products',
      badge: `${productCount}+ products`,
      badgeVariant: 'default'
    },
    {
      title: 'Analytics Dashboard',
      description: 'Get insights into market trends, product distribution, and technology adoption across different radiotherapy workflows.',
      icon: <BarChart3 className="h-5 w-5" />,
      href: '/dashboard',
      badge: 'Live data',
      badgeVariant: 'outline'
    },
    {
      title: 'Regulatory Compliance',
      description: 'Access essential guidance, checklists, and documentation for safe deployment of AI solutions in clinical practice.',
      icon: <Shield className="h-5 w-5" />,
      href: '/resources-compliance',
      badge: 'Guidelines',
      badgeVariant: 'secondary'
    },
    {
      title: 'Research Initiatives',
      description: 'Discover ongoing research projects, collaborative initiatives, and opportunities to contribute to the field.',
      icon: <Microscope className="h-5 w-5" />,
      href: '/initiatives',
      badge: 'Active projects',
      badgeVariant: 'secondary'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Quick Access
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Jump straight to the information you need. Whether you're researching products, 
            analyzing market trends, or ensuring compliance, we've got you covered.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {accessCards.map((card, index) => (
            <QuickAccessCard key={index} {...card} />
          ))}
        </div>
        
        {/* Stats Bar */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 py-6 px-8 bg-card border border-border rounded-lg">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{productCount}+</span> products catalogued
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Beaker className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{companyCount}+</span> companies featured
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">20+</span> compliance resources
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickAccessSection;