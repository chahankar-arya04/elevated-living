// This is the core data model.

export type ProductStatus = 'RESEARCH' | 'VERIFIED' | 'PUBLISHED' | 'FLAGGED' | 'REJECTED' | 'ARCHIVED';
export type SafetyStatus = 'CLEAR' | 'PROVISIONAL' | 'FLAGGED' | 'RECALLED' | 'UNKNOWN';
export type FraudRisk = 'LOW' | 'LOW_MODERATE' | 'MODERATE' | 'HIGH' | 'UNKNOWN';

export interface ProductVerification {
  lastChecked: string;
  productVerified: boolean;
  sellerVerified: boolean;
  safetyChecked: boolean;
  reviewQualityChecked: boolean;
  affiliateChecked: boolean;
  sources: ProductSource[];
}

export interface ProductSource {
  name: string;
  url: string;
  type: 'manufacturer' | 'retailer' | 'regulatory' | 'review' | 'community' | 'trend' | 'affiliate' | 'other';
  checkedDate: string;
  notes?: string;
}

export interface ProductPrice {
  current: number;
  currency: string;
  lastChecked: string;
}

export interface ProductAvailability {
  countries: string[];
  regions: string[];
}

export interface AffiliateData {
  program: string;
  url: string;
  status: 'PENDING' | 'ACTIVE' | 'REJECTED';
  country: string;
  lastChecked: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  
  shortDescription: string;
  fullDescription: string;
  problemSolved?: string;
  whyWeRecommend?: string;
  pros: string[];
  cons: string[];
  editorialNotes?: string;
  
  price: ProductPrice;
  priceHistory?: ProductPrice[];
  
  rating?: number | "Not verified";
  reviewCount?: number | "Not verified";
  reviewQuality?: 'HIGH' | 'MODERATE' | 'LOW' | 'UNKNOWN' | 'POTENTIALLY_MANIPULATED';
  reviewCheckedDate?: string;
  
  productImage: string; // URL or path
  galleryImages: string[];
  
  merchant: string;
  productUrl: string; // Non-affiliate original URL
  
  affiliate: AffiliateData;
  
  tags: string[];
  trendStatus?: 'RISING' | 'PEAK' | 'EVERGREEN';
  evergreen: boolean;
  
  safetyStatus: SafetyStatus;
  fraudRisk: FraudRisk;
  status: ProductStatus;
  
  sellerVerified: boolean;
  sellerName?: string;
  sellerRating?: number;
  sellerTrustNotes?: string;
  
  availability: ProductAvailability;
  verification: ProductVerification;
  
  featured: boolean;
  featuredReason?: string;
  
  dateAdded: string;
  lastVerified: string; // Redundant but good for quick access
}
