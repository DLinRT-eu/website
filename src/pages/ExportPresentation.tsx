import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Users, Package, BarChart3, Building2, Globe } from "lucide-react";
import { exportToPptx } from "@/utils/pptxExport";
import dataService from "@/services/DataService";
import SEO from "@/components/SEO";
import { toast } from "sonner";

export default function ExportPresentation() {
  const [isExporting, setIsExporting] = useState(false);
  const presentationData = dataService.getPresentationData();

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportToPptx();
      toast.success("Presentation exported successfully!");
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Failed to export presentation. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const slidePreviewData = [
    {
      title: "Title Slide",
      description: "DLinRT.eu overview with branding and introduction",
      icon: FileText
    },
    {
      title: "Mission & Vision",
      description: "Platform purpose and strategic direction",
      icon: Globe
    },
    {
      title: "Platform Overview",
      description: `${presentationData.totalCompanies} companies, ${presentationData.totalProducts} products, ${presentationData.totalCategories} categories`,
      icon: BarChart3
    },
    {
      title: "Partner Companies",
      description: `Grid of ${presentationData.companyLogos.length} company logos and names`,
      icon: Building2
    },
    {
      title: "Product Categories",
      description: "Breakdown of products by clinical task with charts",
      icon: Package
    },
    {
      title: "Task Distribution",
      description: "Analysis of AI solutions across different clinical tasks",
      icon: BarChart3
    },
    {
      title: "Company Distribution", 
      description: "Top companies by number of products in the directory",
      icon: Building2
    },
    {
      title: "Location Coverage",
      description: "Anatomical locations covered by AI solutions",
      icon: Globe
    },
    {
      title: "Imaging Modalities",
      description: "Coverage across different imaging modalities (CT, MRI, etc.)",
      icon: BarChart3
    },
    {
      title: "Structure Analysis",
      description: "Most supported structures in auto-contouring products",
      icon: Package
    },
    {
      title: "Structure Types",
      description: "Distribution of OARs, GTV, and elective structures",
      icon: BarChart3
    },
    {
      title: "Product Details",
      description: "Detailed product grids organized by category",
      icon: Package
    },
    {
      title: "Platform Analytics",
      description: `${presentationData.analyticsData.totalViews.toLocaleString()} total views and engagement metrics`,
      icon: BarChart3
    },
    {
      title: "Get Involved",
      description: "Contact information and community engagement opportunities",
      icon: Users
    },
    {
      title: "Governance & Values",
      description: "Core values and quality assurance principles",
      icon: Users
    }
  ];

  return (
    <>
      <SEO 
        title="Export Presentation - DLinRT.eu"
        description="Export a comprehensive PowerPoint presentation overview of the DLinRT.eu platform, including statistics, company directory, and governance information."
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Export Platform Presentation
            </h1>
            <p className="text-lg text-muted-foreground">
              Generate a comprehensive PowerPoint presentation showcasing the DLinRT.eu platform, 
              including key statistics, company directory, complete dashboard analytics, and governance overview.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold text-primary">
                  {presentationData.totalCompanies}
                </CardTitle>
                <CardDescription>Partner Companies</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold text-primary">
                  {presentationData.totalProducts}
                </CardTitle>
                <CardDescription>AI Products</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold text-primary">
                  {presentationData.totalCategories}
                </CardTitle>
                <CardDescription>Clinical Categories</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Export Action */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Export Presentation
              </CardTitle>
              <CardDescription>
                Download a professionally formatted PowerPoint presentation containing 
                platform overview, statistics, all dashboard charts, and company information with properly sized logos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleExport}
                disabled={isExporting}
                size="lg"
                className="w-full md:w-auto"
              >
                {isExporting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Generating Presentation...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Download PPTX
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Slide Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Presentation Contents</CardTitle>
              <CardDescription>
                Preview of slides included in the exported presentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {slidePreviewData.map((slide, index) => {
                  const IconComponent = slide.icon;
                  return (
                    <div 
                      key={index}
                      className="flex items-start space-x-3 p-4 rounded-lg border bg-card"
                    >
                      <div className="flex-shrink-0">
                        <IconComponent className="h-5 w-5 text-primary mt-0.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-medium text-foreground">
                          {slide.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {slide.description}
                        </p>
                      </div>
                      <Badge variant="secondary" className="ml-2">
                        {index + 1}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Additional Info */}
            <div className="mt-8 p-4 bg-muted/50 rounded-lg">
              <h3 className="font-medium text-foreground mb-2">About the Export</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Presentation follows the DLinRT.eu brand guidelines with proper colors and styling</li>
                <li>• Includes all dashboard charts: task distribution, company analysis, location coverage, etc.</li>
                <li>• Company logos are properly sized and formatted for optimal presentation quality</li>
                <li>• Real-time statistics and up-to-date company information from the platform</li>
                <li>• Compatible with Microsoft PowerPoint and other presentation software</li>
                <li>• File format: .pptx (PowerPoint 2007 and later)</li>
              </ul>
            </div>
        </div>
      </div>
    </>
  );
}