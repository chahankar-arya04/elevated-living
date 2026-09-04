import fs from 'fs';
import path from 'path';

// Note: since this is an mjs script run in Node, we can't easily import the TS types,
// so we'll do raw object validation.

function validateProducts() {
  console.log("Validating products...");
  const productsDir = path.join(process.cwd(), 'data', 'products');
  if (!fs.existsSync(productsDir)) {
    console.log("No products directory found. Skipping.");
    return;
  }

  const files = fs.readdirSync(productsDir).filter(f => f.endsWith('.json') && f !== 'template.json');
  let hasErrors = false;

  for (const file of files) {
    const filePath = path.join(productsDir, file);
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const product = JSON.parse(content);
      
      // If a product is marked to be published, it MUST meet strict safety criteria
      if (product.status === 'VERIFIED' || product.status === 'PUBLISHED') {
        if (product.safetyStatus === 'RECALLED' || product.safetyStatus === 'FLAGGED') {
          console.error(`\n[ERROR] CRITICAL SAFETY VIOLATION in ${file}`);
          console.error(`Product is marked as ${product.status} but safetyStatus is ${product.safetyStatus}.`);
          hasErrors = true;
        }

        if (product.fraudRisk === 'HIGH') {
          console.error(`\n[ERROR] FRAUD RISK VIOLATION in ${file}`);
          console.error(`Product is marked as ${product.status} but fraudRisk is HIGH.`);
          hasErrors = true;
        }

        if (!product.affiliate?.url && !product.productUrl) {
          console.error(`\n[ERROR] URL MISSING in ${file}`);
          console.error(`Published product has no valid URL.`);
          hasErrors = true;
        }
      }
    } catch (e) {
      console.error(`\n[ERROR] Invalid JSON in ${file}`);
      console.error(e);
      hasErrors = true;
    }
  }

  if (hasErrors) {
    console.error("\nValidation Failed. Build stopped to prevent publishing unsafe data.");
    process.exit(1);
  } else {
    console.log("Validation Passed! No unsafe products leaked.");
  }
}

validateProducts();
