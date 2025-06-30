
// Helper function to safely create filenames
export const createSafeFileName = (productName: string, extension: string): string => {
  const safeName = productName.replace(/[^a-zA-Z0-9\s-]/g, '').replace(/\s+/g, '_');
  return `${safeName}_ModelCard.${extension}`;
};
