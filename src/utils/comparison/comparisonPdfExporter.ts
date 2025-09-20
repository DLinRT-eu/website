import { ProductDetails } from "@/types/productDetails";
import jsPDF from "jspdf";

export const exportComparisonToPDF = async (products: ProductDetails[]) => {
  try {
    const doc = new jsPDF('l', 'mm', 'a4'); // Landscape orientation for better table layout
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - (margin * 2);
    
    // Colors
    const primaryColor = [59, 130, 246] as const; // Blue
    const secondaryColor = [75, 85, 99] as const; // Gray
    const lightGray = [249, 250, 251] as const;
    
    let yPosition = margin;

    // Helper function to add a new page if needed
    const checkPageBreak = (requiredHeight: number) => {
      if (yPosition + requiredHeight > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
        return true;
      }
      return false;
    };

    // Helper function to load and add logo
    const addLogo = async (logoUrl: string, x: number, y: number, size: number = 15): Promise<void> => {
      return new Promise((resolve) => {
        try {
          if (!logoUrl || logoUrl === '/placeholder.svg') {
            resolve();
            return;
          }
          
          // For local logos, prepend with base URL if needed
          const fullUrl = logoUrl.startsWith('http') ? logoUrl : `${window.location.origin}${logoUrl}`;
          
          const img = new Image();
          img.crossOrigin = 'anonymous';
          
          img.onload = () => {
            try {
              // Create canvas to convert image to base64
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              if (!ctx) {
                resolve();
                return;
              }
              
              canvas.width = size * 4; // Higher resolution
              canvas.height = size * 4;
              
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              const base64 = canvas.toDataURL('image/png');
              
              // Add image to PDF
              doc.addImage(base64, 'PNG', x, y, size, size);
              resolve();
            } catch (error) {
              console.warn('Could not process logo:', logoUrl, error);
              resolve();
            }
          };
          
          img.onerror = () => {
            console.warn('Could not load logo:', logoUrl);
            resolve();
          };
          
          // Set timeout to prevent hanging
          setTimeout(() => {
            resolve();
          }, 3000);
          
          img.src = fullUrl;
        } catch (error) {
          console.warn('Could not load logo:', logoUrl, error);
          resolve();
        }
      });
    };

    // Title
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('Product Comparison Report', margin, yPosition);
    yPosition += 15;

    // Subtitle
    doc.setFontSize(12);
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.text(`Comparing ${products.length} products | Generated on ${new Date().toLocaleDateString()}`, margin, yPosition);
    yPosition += 20;

    // Calculate column width for products
    const colWidth = contentWidth / products.length;

    // Add product headers first without logos
    
    // Add product headers first without logos
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const x = margin + (i * colWidth);
      
      // Product name
      const productName = product.name.length > 20 ? product.name.substring(0, 17) + '...' : product.name;
      doc.text(productName, x + 5, yPosition + 6);
      
      // Company name
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      const companyName = product.company.length > 15 ? product.company.substring(0, 12) + '...' : product.company;
      doc.text(companyName, x + 5, yPosition + 12);
      
      // Reset font for next iteration
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      
      // Vertical separator line
      if (i < products.length - 1) {
        doc.setDrawColor(200, 200, 200);
        doc.line(x + colWidth - 5, yPosition, x + colWidth - 5, yPosition + 15);
      }
    }
    
    // Try to add logos, but don't block PDF generation if they fail
    try {
      const logoPromises = products.map((product, i) => {
        const x = margin + (i * colWidth);
        return addLogo(product.logoUrl || '/placeholder.svg', x + colWidth - 20, yPosition, 12);
      });
      
      // Wait for logos with timeout
      await Promise.race([
        Promise.all(logoPromises),
        new Promise(resolve => setTimeout(resolve, 5000)) // 5 second timeout
      ]);
    } catch (error) {
      console.warn('Logo loading failed, continuing without logos:', error);
    }
    
    yPosition += 25;

        // Comparison fields
    const fields = [
      { key: 'description', label: 'Description' },
      { key: 'category', label: 'Category' },
      { key: 'secondaryCategories', label: 'Secondary Categories' },
      { key: 'modality', label: 'Modality' },
      { key: 'anatomicalLocation', label: 'Anatomical Location' },
      { key: 'diseaseTargeted', label: 'Disease Targeted' },
      { key: 'releaseDate', label: 'Release Date' },
      { key: 'lastUpdated', label: 'Last Updated' },
      { key: 'keyFeatures', label: 'Key Features' },
      { key: 'supportedStructures', label: 'Supported Structures' },
      { key: 'ceStatus', label: 'CE Status' },
      { key: 'fdaStatus', label: 'FDA Status' },
      { key: 'website', label: 'Website' }
    ];

    // Add comparison table
    fields.forEach((field, fieldIndex) => {
      checkPageBreak(20);
      
      // Field values for each product (no separate field label column)
      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const x = margin + (i * colWidth);
        
        // Background for alternating rows
        if (fieldIndex % 2 === 0) {
          doc.setFillColor(250, 250, 250);
          doc.rect(x, yPosition, colWidth, 15, 'F');
        }
        
        // Add field label for first column only
        if (i === 0) {
          doc.setFontSize(9);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
          doc.text(field.label + ':', x + 2, yPosition + 5);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(0, 0, 0);
        }
        
        let displayValue = '';
        
        // Handle specific field mappings
        switch (field.key) {
          case 'ceStatus':
            displayValue = product.regulatory?.ce?.status || 'N/A';
            break;
          case 'fdaStatus':
            displayValue = typeof product.regulatory?.fda === 'string' 
              ? product.regulatory.fda 
              : product.regulatory?.fda?.status || 'N/A';
            break;
          case 'keyFeatures':
            displayValue = Array.isArray(product.keyFeatures) 
              ? product.keyFeatures.join(', ') 
              : product.keyFeatures || 'N/A';
            break;
          case 'supportedStructures':
            displayValue = Array.isArray(product.supportedStructures) 
              ? product.supportedStructures.map(s => s.name || s).join(', ')
              : 'N/A';
            break;
          case 'secondaryCategories':
            displayValue = Array.isArray(product.secondaryCategories) 
              ? product.secondaryCategories.join(', ') 
              : 'N/A';
            break;
          default:
            const value = product[field.key as keyof ProductDetails];
            if (Array.isArray(value)) {
              displayValue = value.join(', ');
            } else if (value) {
              displayValue = String(value);
            } else {
              displayValue = 'N/A';
            }
        }

        // Truncate long text based on available width
        const maxChars = Math.floor(colWidth / 3); // Rough character estimate
        if (displayValue.length > maxChars) {
          displayValue = displayValue.substring(0, maxChars - 3) + '...';
        }

        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        
        // Position text below field label for first column, or at top for others
        const textY = i === 0 ? yPosition + 12 : yPosition + 8;
        doc.text(displayValue, x + 2, textY);
        
        // Vertical separator line
        if (i < products.length - 1) {
          doc.setDrawColor(200, 200, 200);
          doc.line(x + colWidth, yPosition, x + colWidth, yPosition + 15);
        }
      }
      
      // Horizontal separator line
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, yPosition + 15, margin + contentWidth, yPosition + 15);
      
      yPosition += 15;
    });

    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      doc.text(
        `Page ${i} of ${pageCount} | Product Comparison Report | Generated by DLinRT.eu`,
        margin,
        pageHeight - 10
      );
    }

    // Save the PDF with better filename and error handling
    const fileName = `product-comparison-${new Date().toISOString().slice(0, 10)}.pdf`;
    console.log('Saving PDF:', fileName);
    
    // Force download by creating a blob and download link
    const pdfBlob = doc.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = fileName;
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
    
    console.log('PDF export completed successfully');
    
  } catch (error) {
    console.error('Error exporting comparison to PDF:', error);
    throw new Error('Failed to export comparison to PDF format');
  }
};