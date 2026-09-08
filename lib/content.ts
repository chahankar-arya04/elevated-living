import fs from 'fs';
import path from 'path';

// ─── Article Interface ─────────────────────────────────────────────────────────
// Expanded to support Pinterest-first content strategy

export interface Article {
  slug: string;
  title: string;
  pinterestTitle?: string;         // Hook-style title optimised for Pinterest
  description: string;
  pinterestDescription?: string;   // Pin description (max ~500 chars)
  author: string;
  date: string;
  lastUpdated?: string;
  
  // Content categorisation
  pillar: 'skin' | 'hair' | 'trending' | 'useful-finds' | 'style' | 'travel';
  category: string;                // Human-readable category label
  subcategory?: string;
  
  // SEO
  metaTitle?: string;
  metaDescription?: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  canonicalUrl?: string;
  
  // Media
  heroImage?: string;
  heroImageAlt?: string;
  socialImage?: string;            // 1200x630 OG image path

  // Tagging
  tags: string[];
  featured?: boolean;
  
  // Pinterest funnel
  relatedSlugs?: string[];         // slugs of related articles for internal linking
  
  // For destination/travel articles
  destination?: string;            // e.g. "Manali", "Goa"
  season?: string;                 // e.g. "June", "Winter"
  
  // Content body (HTML string)
  content: string;
}

// ─── Content directory resolution ─────────────────────────────────────────────

function getContentDir(pillar: string): string {
  return path.join(process.cwd(), 'content', pillar);
}

// ─── Read all articles for a given pillar ──────────────────────────────────────

export function getArticlesByPillar(pillar: string): Article[] {
  const dir = getContentDir(pillar);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f: string) => f.endsWith('.json'));
  const articles: Article[] = [];

  for (const file of files) {
    try {
      const raw = fs.readFileSync(path.join(dir, file), 'utf8');
      const article: Article = JSON.parse(raw);
      articles.push(article);
    } catch (err) {
      console.error(`[content] Error parsing ${file}:`, err);
    }
  }

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// ─── All pillars ──────────────────────────────────────────────────────────────

const ALL_PILLARS = ['skin', 'hair', 'trending', 'useful-finds', 'style', 'travel'];

export function getAllArticles(): Article[] {
  // Also read legacy blog/ directory for backwards compatibility
  const legacyDir = path.join(process.cwd(), 'content', 'blog');
  const legacyArticles: Article[] = [];
  if (fs.existsSync(legacyDir)) {
    const files = fs.readdirSync(legacyDir).filter((f: string) => f.endsWith('.json'));
    for (const file of files) {
      try {
        const raw = fs.readFileSync(path.join(legacyDir, file), 'utf8');
        const data = JSON.parse(raw);
        legacyArticles.push({ pillar: 'useful-finds', ...data } as Article);
      } catch { /* skip */ }
    }
  }

  const pillarArticles = ALL_PILLARS.flatMap(p => getArticlesByPillar(p));
  const all = [...pillarArticles, ...legacyArticles];

  // Deduplicate by slug
  const seen = new Set<string>();
  return all
    .filter(a => {
      if (seen.has(a.slug)) return false;
      seen.add(a.slug);
      return true;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticleBySlug(slug: string): Article | null {
  return getAllArticles().find(a => a.slug === slug) ?? null;
}

export function getFeaturedArticles(limit = 6): Article[] {
  return getAllArticles().filter(a => a.featured).slice(0, limit);
}

export function getRecentArticles(limit = 12): Article[] {
  return getAllArticles().slice(0, limit);
}

export function getRelatedArticles(article: Article, limit = 4): Article[] {
  const slugs = new Set(article.relatedSlugs ?? []);
  if (slugs.size > 0) {
    const bySlug = getAllArticles().filter(a => slugs.has(a.slug));
    if (bySlug.length >= limit) return bySlug.slice(0, limit);
  }
  return getAllArticles()
    .filter(a => a.pillar === article.pillar && a.slug !== article.slug)
    .slice(0, limit);
}
