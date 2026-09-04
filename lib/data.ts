import fs from 'fs';
import path from 'path';
import { Product } from '@/types/product';

export function isPublishableProduct(product: Product): boolean {
  if (!product) return false;

  // 1. Check strict statuses
  const isValidStatus = product.status === 'VERIFIED' || product.status === 'PUBLISHED';
  if (!isValidStatus) return false;

  // 2. Check safety gate
  const isSafe = product.safetyStatus === 'CLEAR' || product.safetyStatus === 'PROVISIONAL';
  if (!isSafe) return false;

  // 3. Check fraud risk
  const isLowRisk = product.fraudRisk !== 'HIGH' && product.fraudRisk !== 'UNKNOWN';
  if (!isLowRisk) return false;

  // 4. Verify essential fields exist
  if (!product.id || !product.slug || !product.name || !product.price) return false;

  // 5. Verify affiliate / external URLs are present if required
  if (!product.affiliate?.url && !product.productUrl) return false;

  return true;
}

export function getAllProducts(): Product[] {
  const productsDir = path.join(process.cwd(), 'data', 'products');
  if (!fs.existsSync(productsDir)) return [];

  const fileNames = fs.readdirSync(productsDir);
  const products: Product[] = [];

  for (const fileName of fileNames) {
    if (fileName.endsWith('.json')) {
      const fullPath = path.join(productsDir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      try {
        const product: Product = JSON.parse(fileContents);
        products.push(product);
      } catch (err) {
        console.error(`Error parsing ${fileName}`, err);
      }
    }
  }

  return products;
}

export function getPublishableProducts(): Product[] {
  const allProducts = getAllProducts();
  return allProducts.filter(isPublishableProduct);
}

export function getProductBySlug(slug: string): Product | null {
  const products = getPublishableProducts();
  return products.find((p) => p.slug === slug) || null;
}
