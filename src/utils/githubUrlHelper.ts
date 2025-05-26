
export interface GitHubInfo {
  owner: string;
  repo: string;
  filePath?: string;
}

export function parseGitHubUrl(githubUrl: string): GitHubInfo | null {
  if (!githubUrl) return null;
  
  // Match pattern: https://github.com/owner/repo/tree/branch/path/to/file
  const match = githubUrl.match(/https:\/\/github\.com\/([^\/]+)\/([^\/]+)\/tree\/[^\/]+\/(.+)/);
  
  if (match) {
    return {
      owner: match[1],
      repo: match[2],
      filePath: match[3]
    };
  }
  
  // Fallback for basic GitHub URLs
  const basicMatch = githubUrl.match(/https:\/\/github\.com\/([^\/]+)\/([^\/]+)/);
  if (basicMatch) {
    return {
      owner: basicMatch[1],
      repo: basicMatch[2]
    };
  }
  
  return null;
}

export function createEditUrl(product: any): string {
  if (product.githubUrl) {
    // Convert tree URL to edit URL
    return product.githubUrl.replace('/tree/', '/edit/');
  }
  
  // Fallback to default file structure if no githubUrl
  if (!product.category || !product.company) return '';
  
  const categorySlug = product.category.toLowerCase().replace(/ /g, '-');
  const singleFileCategories = ['registration', 'clinical-prediction'];
  
  let filePath = '';
  if (singleFileCategories.includes(categorySlug)) {
    filePath = `src/data/products/${categorySlug}.ts`;
  } else {
    const functionalTerms = ['contour', 'segmentation', 'enhance', 'suite', 'vision', 'planning', 'dose', 'monitor'];
    const idParts = product.id ? product.id.split('-') : [];
    let companyParts = [];
    
    for (const part of idParts) {
      if (functionalTerms.includes(part.toLowerCase())) break;
      companyParts.push(part);
    }
    
    const companySlug = companyParts.join('-');
    filePath = `src/data/products/${categorySlug}/${companySlug}.ts`;
  }
  
  return `https://github.com/DLinRT-eu/website/edit/main/${filePath}`;
}

export function createIssueUrl(product: any): string {
  const githubInfo = parseGitHubUrl(product.githubUrl);
  
  if (githubInfo) {
    const title = `Review: ${product.name}`;
    const labels = 'review';
    const template = 'product-review.md';
    
    // Include product metadata in the issue
    const body = `Product: ${product.name}
Company: ${product.company}
Category: ${product.category}
File: ${githubInfo.filePath || 'Unknown'}

<!-- Please provide details about the review here -->`;
    
    return `https://github.com/${githubInfo.owner}/${githubInfo.repo}/issues/new?title=${encodeURIComponent(title)}&template=${template}&labels=${labels}&body=${encodeURIComponent(body)}`;
  }
  
  // Fallback to default repo
  return `https://github.com/DLinRT-eu/website/issues/new?title=Review%3A+${encodeURIComponent(product.name)}&template=product-review.md&labels=review`;
}

export function createPullRequestUrl(product: any): string {
  const githubInfo = parseGitHubUrl(product.githubUrl);
  
  if (githubInfo) {
    return `https://github.com/${githubInfo.owner}/${githubInfo.repo}/compare/main...review/${product.id}?expand=1&title=Review:%20${encodeURIComponent(product.name)}&labels=review`;
  }
  
  // Fallback to default repo
  return `https://github.com/DLinRT-eu/website/compare/main...review/${product.id}?expand=1&title=Review:%20${encodeURIComponent(product.name)}&labels=review`;
}
