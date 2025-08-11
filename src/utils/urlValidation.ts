
import { ProductDetails } from "@/types/productDetails";
import { parseGitHubUrl, createEditUrl } from "@/utils/githubUrlHelper";

export interface UrlValidationIssue {
  productId: string;
  productName: string;
  field: string;
  url?: string;
  type:
    | "missing"
    | "invalid_format"
    | "http_not_https"
    | "github_invalid"
    | "github_unexpected_path"
    | "asset_missing"
    | "unknown";
  details?: string;
}

const isHttpUrl = (url: string) => /^http:\/\//i.test(url);
const isHttpsUrl = (url: string) => /^https:\/\//i.test(url);
const isAbsoluteUrl = (url: string) => /^https?:\/\//i.test(url);
const looksLikeUrl = (url: string) => /^(https?:\/\/|\/[\w\-./%]+$)/i.test(url);
const isImagePath = (url: string) => /(\.(png|jpe?g|svg|webp)$)/i.test(url);

async function checkSameOriginAsset(path: string): Promise<boolean> {
  try {
    const full = new URL(path, window.location.origin).toString();
    const res = await fetch(full, { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
}

function validateGitHubUrl(product: ProductDetails, url: string): UrlValidationIssue | null {
  const info = parseGitHubUrl(url);
  if (!info) {
    return {
      productId: product.id,
      productName: product.name,
      field: "githubUrl",
      url,
      type: "github_invalid",
      details: "Not a recognizable GitHub URL"
    };
  }

  // If filePath exists, ensure it points to our data folder
  if (info.filePath && !info.filePath.startsWith("src/data/products/")) {
    return {
      productId: product.id,
      productName: product.name,
      field: "githubUrl",
      url,
      type: "github_unexpected_path",
      details: `Points to unexpected path: ${info.filePath}`
    };
  }

  return null;
}

export async function runUrlValidation(products: ProductDetails[]) {
  const issues: UrlValidationIssue[] = [];

  const fields: (keyof ProductDetails)[] = [
    "githubUrl" as keyof ProductDetails,
    "productUrl" as keyof ProductDetails,
    "website" as keyof ProductDetails,
    "companyUrl" as keyof ProductDetails,
    "logoUrl" as keyof ProductDetails,
  ];

  // Collect async asset checks for same-origin images
  const assetChecks: Promise<void>[] = [];

  for (const p of products) {
    for (const field of fields) {
      const value = (p as any)[field];
      if (!value) {
        // Only require githubUrl for review workflows; others can be optional
        if (field === "githubUrl") {
          issues.push({
            productId: p.id,
            productName: p.name,
            field: String(field),
            type: "missing",
            details: "GitHub URL is missing"
          });
        }
        continue;
      }

      const url = String(value);

      if (!looksLikeUrl(url)) {
        issues.push({
          productId: p.id,
          productName: p.name,
          field: String(field),
          url,
          type: "invalid_format",
          details: "Not an HTTP(S) URL or absolute site path"
        });
        continue;
      }

      if (isHttpUrl(url)) {
        issues.push({
          productId: p.id,
          productName: p.name,
          field: String(field),
          url,
          type: "http_not_https",
          details: "Use HTTPS instead of HTTP"
        });
      }

      if (field === "githubUrl") {
        const ghIssue = validateGitHubUrl(p, url);
        if (ghIssue) issues.push(ghIssue);
        // Also compute expected edit URL for visibility (not an issue by itself)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const expectedEdit = createEditUrl(p as any);
      }

      // For logo and other site-relative assets, check existence
      if (!isAbsoluteUrl(url) && typeof window !== "undefined") {
        if (field === "logoUrl" && isImagePath(url)) {
          const task = (async () => {
            const ok = await checkSameOriginAsset(url);
            if (!ok) {
              issues.push({
                productId: p.id,
                productName: p.name,
                field: String(field),
                url,
                type: "asset_missing",
                details: "File not found under public/"
              });
            }
          })();
          assetChecks.push(task);
        }
      }
    }
  }

  await Promise.allSettled(assetChecks);

  // Console report
  const totals = {
    products: products.length,
    issues: issues.length,
    missingGitHub: issues.filter(i => i.type === "missing" && i.field === "githubUrl").length,
    githubFormat: issues.filter(i => i.type === "github_invalid" || i.type === "github_unexpected_path").length,
    invalidFormats: issues.filter(i => i.type === "invalid_format").length,
    httpNotHttps: issues.filter(i => i.type === "http_not_https").length,
    missingAssets: issues.filter(i => i.type === "asset_missing").length,
  };

  // eslint-disable-next-line no-console
  console.groupCollapsed("URL Validation Report");
  // eslint-disable-next-line no-console
  console.table([totals]);
  if (issues.length) {
    // eslint-disable-next-line no-console
    console.table(issues);
  } else {
    // eslint-disable-next-line no-console
    console.log("No URL issues found.");
  }
  // eslint-disable-next-line no-console
  console.groupEnd();

  return { totals, issues };
}
