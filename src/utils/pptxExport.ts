import PptxGenJS from "pptxgenjs";
import dataService from "@/services/DataService";
import { transformTaskData, transformLocationData, transformModalityData, transformStructureData, transformStructureTypeData } from "@/utils/chartDataTransformation";

export interface PresentationData {
  totalCompanies: number;
  totalProducts: number;
  totalCategories: number;
  companyLogos: Array<{ name: string; logo: string }>;
  categoryBreakdown: Array<{ name: string; count: number }>;
  productsByCategory: Array<{
    category: string;
    products: Array<{
      name: string;
      company: string;
      modality: string;
      certification: string;
      companyLogo: string;
    }>;
  }>;
  modalityBreakdown: Array<{ name: string; count: number }>;
  locationBreakdown: Array<{ name: string; count: number }>;
  certificationBreakdown: Array<{ name: string; count: number }>;
  taskData: Array<{ name: string; value: number; fill: string }>;
  companyData: Array<{ name: string; value: number; products: string[] }>;
  structureData: Array<{ name: string; value: number }>;
  structureTypeData: Array<{ 
    productName: string; 
    companyName: string; 
    OARs: number; 
    Targets: number; 
    Elective: number; 
    total: number 
  }>;
  analyticsData: {
    totalViews: number;
    uniqueVisitors: number;
    averageSessionDuration: string;
    topPages: Array<{ page: string; views: number }>;
    trafficTrends: Array<{ month: string; visitors: number }>;
  };
  contactInfo: {
    email: string;
    githubUrl: string;
    newsletterSignups: number;
    rssSubscribers: number;
  };
}

export class PptxExporter {
  private pptx: PptxGenJS;
  private brandColors = {
    primary: "#1c2937", // hsl(222.2 47.4% 11.2%) converted to hex
    primaryLight: "#3b82f6", // For charts and accents
    secondary: "#64748b", // muted-foreground equivalent
    accent: "#f1f5f9", // secondary background
    text: "#0f172a", // foreground
    background: "#ffffff", // background
    muted: "#f8fafc" // muted background
  };

  // Layout constants for better positioning
  private layout = {
    slideWidth: 13.33,
    slideHeight: 7.5,
    margin: {
      left: 1.0,
      right: 1.0,
      top: 0.5,
      bottom: 0.5
    }
  };

  constructor() {
    this.pptx = new PptxGenJS();
    this.setupPresentationDefaults();
  }

  private getContentWidth(): number {
    return this.layout.slideWidth - this.layout.margin.left - this.layout.margin.right;
  }

  private getContentHeight(): number {
    return this.layout.slideHeight - this.layout.margin.top - this.layout.margin.bottom;
  }

  private validateImagePath(imagePath: string): string {
    // Convert relative paths to absolute URLs for browser compatibility
    if (imagePath.startsWith('/')) {
      return `${window.location.origin}${imagePath}`;
    }
    return imagePath;
  }

  private async safeAddImage(slide: any, imageConfig: any): Promise<void> {
    try {
      // Validate image path
      if (imageConfig.path) {
        imageConfig.path = this.validateImagePath(imageConfig.path);
      }
      
      // Validate coordinates are within bounds
      if (imageConfig.x < 0 || imageConfig.y < 0 || 
          imageConfig.x + imageConfig.w > this.layout.slideWidth ||
          imageConfig.y + imageConfig.h > this.layout.slideHeight) {
        console.warn('Image coordinates out of bounds, skipping:', imageConfig);
        return;
      }
      
      slide.addImage(imageConfig);
    } catch (error) {
      console.warn('Failed to add image:', error, imageConfig);
      // Continue without image rather than failing the entire export
    }
  }

  private setupPresentationDefaults() {
    this.pptx.layout = "LAYOUT_16x9";
    this.pptx.author = "DLinRT.eu";
    this.pptx.company = "DLinRT.eu Initiative";
    this.pptx.subject = "Deep Learning in Radiotherapy Directory Overview";
    this.pptx.title = "DLinRT.eu Platform Overview";
  }

  private addTitleSlide() {
    const slide = this.pptx.addSlide();
    const contentWidth = this.getContentWidth();
    
    // Background
    slide.background = { color: this.brandColors.background };
    
    // Title
    slide.addText("DLinRT.eu", {
      x: this.layout.margin.left,
      y: 1.5,
      w: contentWidth,
      h: 1.5,
      fontSize: 48,
      color: this.brandColors.primary,
      bold: true,
      align: "center",
      fontFace: "Arial"
    });
    
    // Subtitle
    slide.addText("Deep Learning in Radiotherapy Directory", {
      x: this.layout.margin.left,
      y: 3.2,
      w: contentWidth,
      h: 1,
      fontSize: 24,
      color: this.brandColors.secondary,
      align: "center",
      fontFace: "Arial"
    });
    
    // Logo - centered with proper aspect ratio
    const logoConfig = {
      path: "/LogoDLinRT.eu.png",
      x: this.layout.margin.left + (contentWidth - 1.5) / 2,
      y: 4.5,
      w: 1.5,
      h: 1.2,
      sizing: { type: "contain", w: 1.5, h: 1.2 }
    };
    
    this.safeAddImage(slide, logoConfig);
  }

  private addMissionVisionSlide() {
    const slide = this.pptx.addSlide();
    const contentWidth = this.getContentWidth();
    const halfWidth = (contentWidth - 0.5) / 2;
    
    slide.background = { color: this.brandColors.background };
    
    // Title
    slide.addText("Mission & Vision", {
      x: this.layout.margin.left,
      y: this.layout.margin.top,
      w: contentWidth,
      h: 1,
      fontSize: 32,
      color: this.brandColors.primary,
      bold: true,
      fontFace: "Arial"
    });
    
    // Mission
    slide.addText("Mission", {
      x: this.layout.margin.left,
      y: 1.8,
      w: halfWidth,
      h: 0.6,
      fontSize: 20,
      color: this.brandColors.text,
      bold: true,
      fontFace: "Arial"
    });
    
    slide.addText("To create a comprehensive, curated directory of deep learning solutions in radiotherapy, promoting transparency, innovation, and evidence-based adoption.", {
      x: this.layout.margin.left,
      y: 2.5,
      w: halfWidth,
      h: 2.5,
      fontSize: 16,
      color: this.brandColors.text,
      fontFace: "Arial"
    });
    
    // Vision
    slide.addText("Vision", {
      x: this.layout.margin.left + halfWidth + 0.5,
      y: 1.8,
      w: halfWidth,
      h: 0.6,
      fontSize: 20,
      color: this.brandColors.text,
      bold: true,
      fontFace: "Arial"
    });
    
    slide.addText("To become the leading global resource for radiotherapy professionals seeking reliable information about AI solutions, fostering collaboration and advancing patient care.", {
      x: this.layout.margin.left + halfWidth + 0.5,
      y: 2.5,
      w: halfWidth,
      h: 2.5,
      fontSize: 16,
      color: this.brandColors.text,
      fontFace: "Arial"
    });
  }

  private addOverviewSlide(data: PresentationData) {
    const slide = this.pptx.addSlide();
    const contentWidth = this.getContentWidth();
    
    slide.background = { color: this.brandColors.background };
    
    // Title
    slide.addText("Platform Overview", {
      x: this.layout.margin.left,
      y: this.layout.margin.top,
      w: contentWidth,
      h: 1,
      fontSize: 32,
      color: this.brandColors.primary,
      bold: true,
      fontFace: "Arial"
    });
    
    // Stats cards - better positioned and sized
    const cardWidth = 2.8;
    const cardSpacing = 0.4;
    const totalCardsWidth = 3 * cardWidth + 2 * cardSpacing;
    const startX = this.layout.margin.left + (contentWidth - totalCardsWidth) / 2;
    
    const stats = [
      { label: "Partner Companies", value: data.totalCompanies?.toString() || "0", x: startX },
      { label: "AI Products", value: data.totalProducts?.toString() || "0", x: startX + cardWidth + cardSpacing },
      { label: "Clinical Categories", value: data.totalCategories?.toString() || "0", x: startX + 2 * (cardWidth + cardSpacing) }
    ];
    
    stats.forEach(stat => {
      // Card background
      slide.addShape("roundRect", {
        x: stat.x,
        y: 2.2,
        w: cardWidth,
        h: 2.3,
        fill: { color: this.brandColors.accent },
        line: { color: this.brandColors.secondary, width: 1 }
      });
      
      // Value
      slide.addText(stat.value, {
        x: stat.x,
        y: 2.7,
        w: cardWidth,
        h: 0.8,
        fontSize: 38,
        color: this.brandColors.primary,
        bold: true,
        align: "center",
        fontFace: "Arial"
      });
      
      // Label
      slide.addText(stat.label, {
        x: stat.x,
        y: 3.6,
        w: cardWidth,
        h: 0.6,
        fontSize: 16,
        color: this.brandColors.secondary,
        align: "center",
        fontFace: "Arial"
      });
    });
    
    // Brief description
    slide.addText("Comprehensive directory of regulatory-approved deep learning solutions in radiotherapy", {
      x: this.layout.margin.left,
      y: 5.2,
      w: contentWidth,
      h: 1,
      fontSize: 16,
      color: this.brandColors.text,
      align: "center",
      fontFace: "Arial"
    });
  }

  private addCompanyLogosSlide(data: PresentationData) {
    const slide = this.pptx.addSlide();
    const contentWidth = this.getContentWidth();
    
    slide.background = { color: this.brandColors.background };
    
    // Title
    slide.addText("Our Partner Companies", {
      x: this.layout.margin.left,
      y: this.layout.margin.top,
      w: contentWidth,
      h: 1,
      fontSize: 32,
      color: this.brandColors.primary,
      bold: true,
      fontFace: "Arial"
    });
    
    // Validate and filter logos
    const validLogos = data.companyLogos?.filter(company => 
      company && company.name && company.logo
    ).slice(0, 32) || []; // Limit for better layout
    
    if (validLogos.length === 0) {
      slide.addText("No company logos available", {
        x: this.layout.margin.left,
        y: 3,
        w: contentWidth,
        h: 1,
        fontSize: 18,
        color: this.brandColors.secondary,
        align: "center",
        fontFace: "Arial"
      });
      return;
    }
    
    // Responsive grid calculation
    const totalLogos = validLogos.length;
    const cols = Math.min(8, Math.ceil(Math.sqrt(totalLogos * 1.2)));
    const rows = Math.ceil(totalLogos / cols);
    
    // Dynamic sizing based on available space
    const availableHeight = 5.8;
    const logoMaxWidth = Math.min(1.2, contentWidth / cols);
    const logoMaxHeight = Math.min(0.8, availableHeight / (rows * 1.4));
    
    const startX = this.layout.margin.left + (contentWidth - (cols * logoMaxWidth)) / 2;
    const startY = 1.6;
    const spacingX = logoMaxWidth;
    const spacingY = logoMaxHeight * 1.4;
    
    validLogos.forEach((company, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      const x = startX + (col * spacingX);
      const y = startY + (row * spacingY);
      
      // Add logo with safe handling
      if (company.logo) {
        const logoConfig = {
          path: company.logo,
          x,
          y,
          w: logoMaxWidth * 0.8,
          h: logoMaxHeight * 0.8,
          sizing: { type: "contain", w: logoMaxWidth * 0.8, h: logoMaxHeight * 0.8 }
        };
        this.safeAddImage(slide, logoConfig);
      }
      
      // Company name (smaller and positioned below logo)
      slide.addText(company.name, {
        x: x - logoMaxWidth * 0.1,
        y: y + logoMaxHeight * 0.85,
        w: logoMaxWidth,
        h: logoMaxHeight * 0.4,
        fontSize: Math.max(8, Math.min(10, logoMaxHeight * 15)),
        color: this.brandColors.secondary,
        align: "center",
        fontFace: "Arial"
      });
    });
  }

  private addCategoryBreakdownSlide(data: PresentationData) {
    const slide = this.pptx.addSlide();
    const contentWidth = this.getContentWidth();
    const halfWidth = (contentWidth - 0.5) / 2;
    
    slide.background = { color: this.brandColors.background };
    
    // Title
    slide.addText("AI Solution Categories in Radiotherapy", {
      x: this.layout.margin.left,
      y: this.layout.margin.top,
      w: contentWidth,
      h: 1,
      fontSize: 32,
      color: this.brandColors.primary,
      bold: true,
      fontFace: "Arial"
    });
    
    // Validate chart data
    const validCategoryData = data.categoryBreakdown?.filter(item => 
      item && item.name && typeof item.count === 'number' && item.count > 0
    ) || [];
    
    if (validCategoryData.length === 0) {
      slide.addText("No category data available", {
        x: this.layout.margin.left,
        y: 3,
        w: contentWidth,
        h: 1,
        fontSize: 18,
        color: this.brandColors.secondary,
        align: "center",
        fontFace: "Arial"
      });
      return;
    }
    
    // Create chart data with proper validation
    const chartData = validCategoryData.map(item => ({
      name: item.name,
      labels: [item.name],
      values: [item.count]
    }));
    
    try {
      // Add chart - better positioned
      slide.addChart("pie", chartData, {
        x: this.layout.margin.left,
        y: 1.8,
        w: halfWidth,
        h: 4.5,
        showTitle: false,
        showLegend: true,
        legendPos: "r",
        chartColors: [this.brandColors.primaryLight, this.brandColors.secondary, "#F59E0B", "#10B981", "#EF4444", "#8B5CF6"]
      });
    } catch (error) {
      console.warn('Failed to add chart:', error);
    }
    
    // Add table with details - better positioned
    const totalProducts = data.totalProducts || validCategoryData.reduce((sum, item) => sum + item.count, 0);
    const tableData = [
      [
        { text: "Category", options: { bold: true, fontSize: 14 } },
        { text: "Products", options: { bold: true, fontSize: 14 } },
        { text: "Share", options: { bold: true, fontSize: 14 } }
      ],
      ...validCategoryData.map(item => [
        { text: item.name, options: { fontSize: 12 } },
        { text: item.count.toString(), options: { fontSize: 12 } },
        { text: `${Math.round((item.count / totalProducts) * 100)}%`, options: { fontSize: 12 } }
      ])
    ];
    
    slide.addTable(tableData, {
      x: this.layout.margin.left + halfWidth + 0.5,
      y: 1.8,
      w: halfWidth,
      h: 4.5,
      fontSize: 12,
      fontFace: "Arial",
      border: { pt: 1, color: this.brandColors.secondary }
    });
  }

  private addGovernanceSlide() {
    const slide = this.pptx.addSlide();
    const contentWidth = this.getContentWidth();
    
    slide.background = { color: this.brandColors.background };
    
    // Title
    slide.addText("Governance & Values", {
      x: this.layout.margin.left,
      y: this.layout.margin.top,
      w: contentWidth,
      h: 1,
      fontSize: 32,
      color: this.brandColors.primary,
      bold: true,
      fontFace: "Arial"
    });
    
    // Core Values
    const values = [
      "Transparency: Open access to validated information",
      "Quality: Rigorous review and validation processes",
      "Community: Collaborative platform for knowledge sharing",
      "Innovation: Supporting advancement in radiotherapy AI",
      "Evidence: Focus on clinically validated solutions"
    ];
    
    values.forEach((value, index) => {
      slide.addText(`• ${value}`, {
        x: this.layout.margin.left,
        y: 2 + (index * 0.9),
        w: contentWidth,
        h: 0.8,
        fontSize: 18,
        color: this.brandColors.text,
        fontFace: "Arial"
      });
    });
  }

  private addProductGridSlides(data: PresentationData) {
    if (!data.productsByCategory || data.productsByCategory.length === 0) {
      return;
    }

    data.productsByCategory.forEach(categoryData => {
      if (!categoryData || !categoryData.products || categoryData.products.length === 0) {
        return;
      }

      const slide = this.pptx.addSlide();
      const contentWidth = this.getContentWidth();
      
      slide.background = { color: this.brandColors.background };
      
      // Title
      slide.addText(`${categoryData.category} Solutions`, {
        x: this.layout.margin.left,
        y: this.layout.margin.top,
        w: contentWidth,
        h: 1,
        fontSize: 28,
        color: this.brandColors.primary,
        bold: true,
        fontFace: "Arial"
      });
      
      // Product grid (4 columns) - better positioned
      const cols = 4;
      const cardWidth = 2.6;
      const cardHeight = 1.6;
      const cardSpacing = 0.2;
      const totalCardsWidth = cols * cardWidth + (cols - 1) * cardSpacing;
      const startX = this.layout.margin.left + (contentWidth - totalCardsWidth) / 2;
      const startY = 1.7;
      const spacingX = cardWidth + cardSpacing;
      const spacingY = 2.1;
      
      const validProducts = categoryData.products.filter(p => p && p.name).slice(0, 12);
      
      validProducts.forEach((product, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;
        const x = startX + (col * spacingX);
        const y = startY + (row * spacingY);
        
        // Product card background
        slide.addShape("roundRect", {
          x,
          y,
          w: cardWidth,
          h: cardHeight,
          fill: { color: this.brandColors.accent },
          line: { color: this.brandColors.secondary, width: 1 }
        });
        
        // Company logo (smaller for product cards)
        if (product.companyLogo) {
          const logoConfig = {
            path: product.companyLogo,
            x: x + 0.1,
            y: y + 0.1,
            w: 0.3,
            h: 0.2,
            sizing: { type: "contain", w: 0.3, h: 0.2 }
          };
          this.safeAddImage(slide, logoConfig);
        }
        
        // Product name
        slide.addText(product.name || "Unknown Product", {
          x: x + 0.1,
          y: y + 0.5,
          w: cardWidth - 0.2,
          h: 0.4,
          fontSize: 11,
          color: this.brandColors.text,
          bold: true,
          fontFace: "Arial"
        });
        
        // Company name
        slide.addText(product.company || "Unknown Company", {
          x: x + 0.1,
          y: y + 0.9,
          w: cardWidth - 0.2,
          h: 0.3,
          fontSize: 9,
          color: this.brandColors.secondary,
          fontFace: "Arial"
        });
        
        // Certification status
        if (product.certification) {
          slide.addText(product.certification, {
            x: x + 0.1,
            y: y + 1.2,
            w: cardWidth - 0.2,
            h: 0.2,
            fontSize: 8,
            color: this.brandColors.primary,
            fontFace: "Arial"
          });
        }
      });
    });
  }

  private addAnalyticsOverviewSlide(data: PresentationData) {
    const slide = this.pptx.addSlide();
    const contentWidth = this.getContentWidth();
    
    slide.background = { color: this.brandColors.background };
    
    // Title
    slide.addText("Platform Analytics & Engagement", {
      x: this.layout.margin.left,
      y: this.layout.margin.top,
      w: contentWidth,
      h: 1,
      fontSize: 32,
      color: this.brandColors.primary,
      bold: true,
      fontFace: "Arial"
    });
    
    // Validate analytics data
    const analytics = data.analyticsData || {
      totalViews: 0,
      uniqueVisitors: 0,
      averageSessionDuration: "0:00",
      topPages: []
    };
    
    // Analytics stats cards - better positioned
    const cardWidth = 2.8;
    const cardSpacing = 0.4;
    const totalCardsWidth = 3 * cardWidth + 2 * cardSpacing;
    const startX = this.layout.margin.left + (contentWidth - totalCardsWidth) / 2;
    
    const stats = [
      { label: "Total Views", value: analytics.totalViews?.toLocaleString() || "0", x: startX },
      { label: "Unique Visitors", value: analytics.uniqueVisitors?.toLocaleString() || "0", x: startX + cardWidth + cardSpacing },
      { label: "Avg. Session", value: analytics.averageSessionDuration || "0:00", x: startX + 2 * (cardWidth + cardSpacing) }
    ];
    
    stats.forEach(stat => {
      // Card background
      slide.addShape("roundRect", {
        x: stat.x,
        y: 1.8,
        w: cardWidth,
        h: 1.8,
        fill: { color: this.brandColors.accent },
        line: { color: this.brandColors.secondary, width: 1 }
      });
      
      // Value
      slide.addText(stat.value, {
        x: stat.x,
        y: 2.1,
        w: cardWidth,
        h: 0.7,
        fontSize: 24,
        color: this.brandColors.primary,
        bold: true,
        align: "center",
        fontFace: "Arial"
      });
      
      // Label
      slide.addText(stat.label, {
        x: stat.x,
        y: 2.8,
        w: cardWidth,
        h: 0.5,
        fontSize: 12,
        color: this.brandColors.secondary,
        align: "center",
        fontFace: "Arial"
      });
    });
    
    // Top pages table - better positioned
    const validTopPages = analytics.topPages?.slice(0, 5) || [];
    if (validTopPages.length > 0) {
      const tableData = [
        [
          { text: "Most Viewed Pages", options: { bold: true, fontSize: 14 } },
          { text: "Views", options: { bold: true, fontSize: 14 } }
        ],
        ...validTopPages.map(page => [
          { text: page.page || "Unknown", options: { fontSize: 12 } },
          { text: (page.views || 0).toLocaleString(), options: { fontSize: 12 } }
        ])
      ];
      
      slide.addTable(tableData, {
        x: this.layout.margin.left,
        y: 4,
        w: contentWidth * 0.6,
        h: 2.8,
        fontSize: 12,
        fontFace: "Arial",
        border: { pt: 1, color: this.brandColors.secondary }
      });
    }
    
    // Traffic trends chart - better positioned
    const trendData = [{
      name: "Monthly Visitors",
      labels: data.analyticsData.trafficTrends.map(t => t.month),
      values: data.analyticsData.trafficTrends.map(t => t.visitors)
    }];
    
    slide.addChart("line", trendData, {
      x: 7.3,
      y: 4,
      w: 5.6,
      h: 2.8,
      showTitle: false,
      showLegend: false,
      chartColors: [this.brandColors.primary]
    });
  }

  // Dashboard chart slides
  private addTaskDistributionSlide(data: PresentationData) {
    const slide = this.pptx.addSlide();
    slide.background = { color: this.brandColors.background };
    
    slide.addText("Task Distribution Analysis", {
      x: 0.3,
      y: 0.5,
      w: 12.6,
      h: 1,
      fontSize: 32,
      color: this.brandColors.primary,
      bold: true,
      fontFace: "Inter"
    });
    
    // Chart data for PPTX
    const chartData = [{
      name: "Products by Task",
      labels: data.taskData.map(item => item.name),
      values: data.taskData.map(item => item.value)
    }];
    
    slide.addChart("bar", chartData, {
      x: 0.3,
      y: 1.8,
      w: 12.6,
      h: 5,
      showTitle: false,
      showLegend: false,
      chartColors: data.taskData.map(item => item.fill)
    });
  }

  private addCompanyDistributionSlide(data: PresentationData) {
    const slide = this.pptx.addSlide();
    slide.background = { color: this.brandColors.background };
    
    slide.addText("Company Distribution Analysis", {
      x: 0.3,
      y: 0.5,
      w: 12.6,
      h: 1,
      fontSize: 32,
      color: this.brandColors.primary,
      bold: true,
      fontFace: "Inter"
    });
    
    const topCompanies = data.companyData.slice(0, 15);
    const chartData = [{
      name: "Products by Company",
      labels: topCompanies.map(item => item.name),
      values: topCompanies.map(item => item.value)
    }];
    
    slide.addChart("bar", chartData, {
      x: 0.3,
      y: 1.8,
      w: 12.6,
      h: 5,
      showTitle: false,
      showLegend: false,
      chartColors: [this.brandColors.primaryLight]
    });
  }

  private addLocationAnalysisSlide(data: PresentationData) {
    const slide = this.pptx.addSlide();
    slide.background = { color: this.brandColors.background };
    
    slide.addText("Anatomical Location Coverage", {
      x: 0.3,
      y: 0.5,
      w: 12.6,
      h: 1,
      fontSize: 32,
      color: this.brandColors.primary,
      bold: true,
      fontFace: "Inter"
    });
    
    const topLocations = data.locationBreakdown.slice(0, 12);
    const chartData = [{
      name: "Products by Location",
      labels: topLocations.map(item => item.name),
      values: topLocations.map(item => item.count)
    }];
    
    slide.addChart("pie", chartData, {
      x: 0.3,
      y: 1.8,
      w: 12.6,
      h: 5,
      showTitle: false,
      showLegend: true,
      legendPos: "r",
      chartColors: [this.brandColors.primaryLight, this.brandColors.secondary, "#F59E0B", "#10B981", "#EF4444", "#8B5CF6", "#EC4899", "#06B6D4", "#84CC16", "#F97316", "#A855F7", "#EAB308"]
    });
  }

  private addModalityAnalysisSlide(data: PresentationData) {
    const slide = this.pptx.addSlide();
    slide.background = { color: this.brandColors.background };
    
    slide.addText("Imaging Modality Coverage", {
      x: 0.3,
      y: 0.5,
      w: 12.6,
      h: 1,
      fontSize: 32,
      color: this.brandColors.primary,
      bold: true,
      fontFace: "Inter"
    });
    
    const chartData = [{
      name: "Products by Modality",
      labels: data.modalityBreakdown.map(item => item.name),
      values: data.modalityBreakdown.map(item => item.count)
    }];
    
    slide.addChart("bar", chartData, {
      x: 0.3,
      y: 1.8,
      w: 12.6,
      h: 5,
      showTitle: false,
      showLegend: false,
      chartColors: [this.brandColors.primaryLight]
    });
  }

  private addStructureAnalysisSlide(data: PresentationData) {
    const slide = this.pptx.addSlide();
    slide.background = { color: this.brandColors.background };
    
    slide.addText("Auto-Contouring: Supported Structures", {
      x: 0.3,
      y: 0.5,
      w: 12.6,
      h: 1,
      fontSize: 32,
      color: this.brandColors.primary,
      bold: true,
      fontFace: "Inter"
    });
    
    const topStructures = data.structureData.slice(0, 15);
    const chartData = [{
      name: "Structures Supported",
      labels: topStructures.map(item => item.name),
      values: topStructures.map(item => item.value)
    }];
    
    slide.addChart("bar", chartData, {
      x: 0.3,
      y: 1.8,
      w: 12.6,
      h: 5,
      showTitle: false,
      showLegend: false,
      chartColors: [this.brandColors.primaryLight]
    });
  }

  private addStructureTypeAnalysisSlide(data: PresentationData) {
    const slide = this.pptx.addSlide();
    slide.background = { color: this.brandColors.background };
    
    slide.addText("Auto-Contouring: Structure Type Distribution", {
      x: 0.3,
      y: 0.5,
      w: 12.6,
      h: 1,
      fontSize: 32,
      color: this.brandColors.primary,
      bold: true,
      fontFace: "Inter"
    });
    
    // Aggregate data for stacked chart
    const totalOARs = data.structureTypeData.reduce((sum, item) => sum + item.OARs, 0);
    const totalTargets = data.structureTypeData.reduce((sum, item) => sum + item.Targets, 0);
    const totalElective = data.structureTypeData.reduce((sum, item) => sum + item.Elective, 0);
    
    const chartData = [{
      name: "Structure Types",
      labels: ["OARs", "Targets", "Elective"],
      values: [totalOARs, totalTargets, totalElective]
    }];
    
    slide.addChart("pie", chartData, {
      x: 0.3,
      y: 1.8,
      w: 12.6,
      h: 5,
      showTitle: false,
      showLegend: true,
      legendPos: "r",
      chartColors: [this.brandColors.primaryLight, this.brandColors.secondary, "#F59E0B"]
     });
   }

   private addContactEngagementSlide(data: PresentationData) {
     const slide = this.pptx.addSlide();
     slide.background = { color: this.brandColors.background };
    
     // Title
     slide.addText("Get Involved & Stay Connected", {
       x: 0.3,
       y: 0.5,
       w: 12.6,
       h: 1,
       fontSize: 32,
       color: this.brandColors.primary,
       bold: true,
       fontFace: "Inter"
     });
     
     // Newsletter section
     slide.addText("📧 Newsletter", {
       x: 0.3,
       y: 1.9,
       w: 6.0,
       h: 0.6,
       fontSize: 20,
       color: this.brandColors.text,
       bold: true,
       fontFace: "Inter"
     });
     
     slide.addText(`${data.contactInfo.newsletterSignups} subscribers\nStay updated with latest AI solutions and research`, {
       x: 0.3,
       y: 2.6,
       w: 6.0,
       h: 1.2,
       fontSize: 14,
       color: this.brandColors.secondary,
       fontFace: "Inter"
     });
     
     // GitHub section
     slide.addText("💻 Contribute", {
       x: 6.6,
       y: 1.9,
       w: 6.3,
       h: 0.6,
       fontSize: 20,
       color: this.brandColors.text,
       bold: true,
       fontFace: "Inter"
     });
     
     slide.addText(`GitHub: ${data.contactInfo.githubUrl}\nHelp improve our open-source platform`, {
       x: 6.6,
       y: 2.6,
       w: 6.3,
       h: 1.2,
       fontSize: 14,
       color: this.brandColors.secondary,
       fontFace: "Inter"
     });
     
     // Contact section
     slide.addText("📬 Contact Us", {
       x: 0.3,
       y: 4.2,
       w: 6.0,
       h: 0.6,
       fontSize: 20,
       color: this.brandColors.text,
       bold: true,
       fontFace: "Inter"
     });
     
     slide.addText(`Email: ${data.contactInfo.email}\nFor partnerships, questions, or suggestions`, {
       x: 0.3,
       y: 4.9,
       w: 6.0,
       h: 1.2,
       fontSize: 14,
       color: this.brandColors.secondary,
       fontFace: "Inter"
     });
     
     // Review process
     slide.addText("📝 Review Process", {
       x: 6.6,
       y: 4.2,
       w: 6.3,
       h: 0.6,
       fontSize: 20,
       color: this.brandColors.text,
       bold: true,
       fontFace: "Inter"
     });
     
     slide.addText("Help validate AI solutions through our\npeer-review process and quality assurance", {
       x: 6.6,
       y: 4.9,
       w: 6.3,
       h: 1.2,
       fontSize: 14,
       color: this.brandColors.secondary,
       fontFace: "Inter"
     });
  }

  public async generatePresentation(data: PresentationData): Promise<void> {
    try {
      // Validate data before proceeding
      if (!data) {
        throw new Error('No presentation data provided');
      }

      // Add all slides with error handling for each
      this.addTitleSlide();
      this.addMissionVisionSlide();
      this.addOverviewSlide(data);
      this.addCompanyLogosSlide(data);
      this.addCategoryBreakdownSlide(data);
      this.addGovernanceSlide();
      
      // Add product grid slides
      this.addProductGridSlides(data);
      
      // Add analytics and engagement
      this.addAnalyticsOverviewSlide(data);
      this.addContactEngagementSlide(data);

      // Generate and download the presentation
      await this.pptx.writeFile({ fileName: `DLinRT-Overview-${new Date().toISOString().split('T')[0]}.pptx` });
      
    } catch (error) {
      console.error('Error generating presentation:', error);
      throw new Error(`Failed to generate presentation: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export const exportToPptx = async (): Promise<void> => {
  try {
    const data = await dataService.getPresentationData();
    
    if (!data) {
      throw new Error('Failed to fetch presentation data');
    }
    
    const exporter = new PptxExporter();
    await exporter.generatePresentation(data);
    
  } catch (error) {
    console.error('PPTX Export Error:', error);
    throw new Error(`Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};