import PptxGenJS from "pptxgenjs";
import dataService from "@/services/DataService";

export interface PresentationData {
  totalCompanies: number;
  totalProducts: number;
  totalCategories: number;
  companyLogos: Array<{ name: string; logo: string }>;
  categoryBreakdown: Array<{ name: string; count: number }>;
  modalityBreakdown: Array<{ name: string; count: number }>;
  locationBreakdown: Array<{ name: string; count: number }>;
  certificationBreakdown: Array<{ name: string; count: number }>;
}

export class PptxExporter {
  private pptx: PptxGenJS;
  private brandColors = {
    primary: "#00A6D6",
    secondary: "#6B7280",
    accent: "#F3F4F6",
    text: "#111827",
    background: "#FFFFFF"
  };

  constructor() {
    this.pptx = new PptxGenJS();
    this.setupPresentationDefaults();
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
    
    // Background
    slide.background = { color: this.brandColors.background };
    
    // Title
    slide.addText("DLinRT.eu", {
      x: 1,
      y: 2,
      w: 10,
      h: 1.5,
      fontSize: 48,
      color: this.brandColors.primary,
      bold: true,
      align: "center",
      fontFace: "Inter"
    });
    
    // Subtitle
    slide.addText("Deep Learning in Radiotherapy Directory", {
      x: 1,
      y: 3.8,
      w: 10,
      h: 1,
      fontSize: 24,
      color: this.brandColors.secondary,
      align: "center",
      fontFace: "Inter"
    });
    
    // Logo - larger and more prominent
    slide.addImage({
      path: "/LogoDLinRT.eu.png",
      x: 4.5,
      y: 5,
      w: 3,
      h: 2,
      sizing: { type: "contain", w: 3, h: 2 }
    });
  }

  private addMissionVisionSlide() {
    const slide = this.pptx.addSlide();
    slide.background = { color: this.brandColors.background };
    
    // Title
    slide.addText("Mission & Vision", {
      x: 0.5,
      y: 0.5,
      w: 11,
      h: 1,
      fontSize: 32,
      color: this.brandColors.primary,
      bold: true,
      fontFace: "Inter"
    });
    
    // Mission
    slide.addText("Mission", {
      x: 0.5,
      y: 1.8,
      w: 5,
      h: 0.6,
      fontSize: 20,
      color: this.brandColors.text,
      bold: true,
      fontFace: "Inter"
    });
    
    slide.addText("To create a comprehensive, curated directory of deep learning solutions in radiotherapy, promoting transparency, innovation, and evidence-based adoption.", {
      x: 0.5,
      y: 2.5,
      w: 5,
      h: 2,
      fontSize: 14,
      color: this.brandColors.text,
      fontFace: "Inter"
    });
    
    // Vision
    slide.addText("Vision", {
      x: 6.5,
      y: 1.8,
      w: 5,
      h: 0.6,
      fontSize: 20,
      color: this.brandColors.text,
      bold: true,
      fontFace: "Inter"
    });
    
    slide.addText("To become the leading global resource for radiotherapy professionals seeking reliable information about AI solutions, fostering collaboration and advancing patient care.", {
      x: 6.5,
      y: 2.5,
      w: 5,
      h: 2,
      fontSize: 14,
      color: this.brandColors.text,
      fontFace: "Inter"
    });
  }

  private addOverviewSlide(data: PresentationData) {
    const slide = this.pptx.addSlide();
    slide.background = { color: this.brandColors.background };
    
    // Title
    slide.addText("Platform Overview", {
      x: 0.5,
      y: 0.5,
      w: 11,
      h: 1,
      fontSize: 32,
      color: this.brandColors.primary,
      bold: true,
      fontFace: "Inter"
    });
    
    // Stats cards
    const stats = [
      { label: "Companies", value: data.totalCompanies.toString(), x: 1 },
      { label: "Products", value: data.totalProducts.toString(), x: 4 },
      { label: "Categories", value: data.totalCategories.toString(), x: 7 }
    ];
    
    stats.forEach(stat => {
      // Card background
      slide.addShape("roundRect", {
        x: stat.x,
        y: 2.5,
        w: 2.5,
        h: 2,
        fill: { color: this.brandColors.accent },
        line: { color: this.brandColors.secondary, width: 1 }
      });
      
      // Value
      slide.addText(stat.value, {
        x: stat.x,
        y: 3,
        w: 2.5,
        h: 0.8,
        fontSize: 36,
        color: this.brandColors.primary,
        bold: true,
        align: "center",
        fontFace: "Inter"
      });
      
      // Label
      slide.addText(stat.label, {
        x: stat.x,
        y: 3.8,
        w: 2.5,
        h: 0.5,
        fontSize: 16,
        color: this.brandColors.secondary,
        align: "center",
        fontFace: "Inter"
      });
    });
  }

  private addCompanyLogosSlide(data: PresentationData) {
    const slide = this.pptx.addSlide();
    slide.background = { color: this.brandColors.background };
    
    // Title
    slide.addText("Our Partner Companies", {
      x: 0.5,
      y: 0.5,
      w: 11,
      h: 1,
      fontSize: 36,
      color: this.brandColors.primary,
      bold: true,
      fontFace: "Inter"
    });
    
    // Grid of logos (4 columns for larger logos)
    const cols = 4;
    const logoWidth = 2.5;
    const logoHeight = 1.8;
    const startX = 0.8;
    const startY = 1.8;
    const spacingX = 2.8;
    const spacingY = 2.2;
    
    data.companyLogos.slice(0, 20).forEach((company, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      const x = startX + (col * spacingX);
      const y = startY + (row * spacingY);
      
      if (company.logo) {
        slide.addImage({
          path: company.logo,
          x,
          y,
          w: logoWidth,
          h: logoHeight,
          sizing: { type: "contain", w: logoWidth, h: logoHeight }
        });
      }
      
      // Company name
      slide.addText(company.name, {
        x,
        y: y + logoHeight + 0.1,
        w: logoWidth,
        h: 0.4,
        fontSize: 11,
        color: this.brandColors.secondary,
        align: "center",
        fontFace: "Inter"
      });
    });
  }

  private addCategoryBreakdownSlide(data: PresentationData) {
    const slide = this.pptx.addSlide();
    slide.background = { color: this.brandColors.background };
    
    // Title
    slide.addText("AI Solution Categories in Radiotherapy", {
      x: 0.5,
      y: 0.5,
      w: 11,
      h: 1,
      fontSize: 36,
      color: this.brandColors.primary,
      bold: true,
      fontFace: "Inter"
    });
    
    // Create chart data
    const chartData = data.categoryBreakdown.map(item => ({
      name: item.name,
      labels: [item.name],
      values: [item.count]
    }));
    
    // Add larger chart
    slide.addChart("pie", chartData, {
      x: 0.5,
      y: 1.8,
      w: 8,
      h: 5,
      showTitle: false,
      showLegend: true,
      legendPos: "r",
      chartColors: ["#00A6D6", "#6B7280", "#F59E0B", "#10B981", "#EF4444", "#8B5CF6"]
    });
    
    // Add table with details
    const tableData = [
      [
        { text: "Category", options: { bold: true, fontSize: 14 } },
        { text: "Products", options: { bold: true, fontSize: 14 } },
        { text: "Share", options: { bold: true, fontSize: 14 } }
      ],
      ...data.categoryBreakdown.map(item => [
        { text: item.name, options: { fontSize: 12 } },
        { text: item.count.toString(), options: { fontSize: 12 } },
        { text: `${Math.round((item.count / data.totalProducts) * 100)}%`, options: { fontSize: 12 } }
      ])
    ];
    
    slide.addTable(tableData, {
      x: 9,
      y: 1.8,
      w: 3,
      h: 5,
      fontSize: 12,
      fontFace: "Inter",
      border: { pt: 1, color: this.brandColors.secondary }
    });
  }

  private addGovernanceSlide() {
    const slide = this.pptx.addSlide();
    slide.background = { color: this.brandColors.background };
    
    // Title
    slide.addText("Governance & Values", {
      x: 0.5,
      y: 0.5,
      w: 11,
      h: 1,
      fontSize: 32,
      color: this.brandColors.primary,
      bold: true,
      fontFace: "Inter"
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
        x: 1,
        y: 2 + (index * 0.8),
        w: 10,
        h: 0.6,
        fontSize: 16,
        color: this.brandColors.text,
        fontFace: "Inter"
      });
    });
  }

  public async generatePresentation(data: PresentationData): Promise<void> {
    // Add all slides
    this.addTitleSlide();
    this.addMissionVisionSlide();
    this.addOverviewSlide(data);
    this.addCompanyLogosSlide(data);
    this.addCategoryBreakdownSlide(data);
    this.addGovernanceSlide();
    
    // Generate and download
    const fileName = `DLinRT_Overview_${new Date().toISOString().split('T')[0]}.pptx`;
    await this.pptx.writeFile({ fileName });
  }
}

export const exportToPptx = async (): Promise<void> => {
  const data = dataService.getPresentationData();
  const exporter = new PptxExporter();
  await exporter.generatePresentation(data);
};