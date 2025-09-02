const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Find all product data files
const productFiles = [
  ...glob.sync('src/data/products/**/*.ts'),
  ...glob.sync('docs/examples/**/*.ts')
];

console.log(`Found ${productFiles.length} files to process`);

productFiles.forEach(filePath => {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove lastVerified lines with various patterns
    const patterns = [
      /\s*lastVerified:\s*"[^"]*",?\n/g,
      /,\s*lastVerified:\s*"[^"]*"/g,
      /\s*lastVerified:\s*"[^"]*"\s*,/g
    ];
    
    let modified = false;
    patterns.forEach(pattern => {
      const newContent = content.replace(pattern, '');
      if (newContent !== content) {
        content = newContent;
        modified = true;
      }
    });
    
    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`✓ Updated ${filePath}`);
    } else {
      console.log(`- No changes needed for ${filePath}`);
    }
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
  }
});

console.log('Done!');