import fs from 'fs';
import path from 'path';

function auditLinks() {
  console.log("==================");
  console.log("PRODUCT LINK AUDIT");
  console.log("==================\n");

  const productsDir = path.join(process.cwd(), 'data', 'products');
  if (!fs.existsSync(productsDir)) {
    console.log("No products directory found.");
    return;
  }

  const files = fs.readdirSync(productsDir).filter(f => f.endsWith('.json') && f !== 'template.json');
  
  let totalProducts = 0;
  let validUrls = 0;
  let missingUrls = 0;
  let invalidUrls = 0;
  let blockedProducts = 0;
  const programs = {};

  for (const file of files) {
    const filePath = path.join(productsDir, file);
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const product = JSON.parse(content);
      totalProducts++;

      const isBlocked = 
        product.status !== 'VERIFIED' && product.status !== 'PUBLISHED' ||
        product.safetyStatus === 'RECALLED' || 
        product.safetyStatus === 'FLAGGED' ||
        product.fraudRisk === 'HIGH';

      if (isBlocked) {
        blockedProducts++;
        continue;
      }

      const url = product.affiliate?.url || product.productUrl;
      const program = product.affiliate?.program || 'Direct/Other';

      if (!url || url.trim() === '') {
        missingUrls++;
        console.error(`\u274C Missing URL for published product: ${product.slug}`);
      } else if (!url.startsWith('http://') && !url.startsWith('https://')) {
        invalidUrls++;
        console.error(`\u274C Invalid URL (must start with http/https) for product: ${product.slug}`);
      } else {
        validUrls++;
        programs[program] = (programs[program] || 0) + 1;
      }
    } catch (e) {
      console.error(`\u274C Error parsing ${file}:`, e.message);
    }
  }

  console.log(`Total products: ${totalProducts}\n`);
  console.log(`Valid URLs: ${validUrls}`);
  console.log(`Missing URLs: ${missingUrls}`);
  console.log(`Invalid URLs: ${invalidUrls}\n`);

  for (const [prog, count] of Object.entries(programs)) {
    console.log(`${prog}: ${count}`);
  }

  console.log(`\nBlocked products: ${blockedProducts}\n`);

  if (missingUrls > 0 || invalidUrls > 0) {
    console.error("\u274C Audit failed due to missing or invalid URLs in published products.");
    process.exit(1);
  } else {
    console.log("\u2705 Audit passed.");
  }
}

auditLinks();
