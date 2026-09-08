# Elevated Everyday Living — Content Guide

## Adding a New Article

Create a JSON file in the correct content pillar directory:

| Topic | Directory |
|---|---|
| Skincare | `content/skin/` |
| Haircare | `content/hair/` |
| Trending products | `content/trending/` |
| Useful finds & tools | `content/useful-finds/` |
| Style & outfits | `content/style/` |
| Travel & destinations | `content/travel/` |

### Required JSON fields

```json
{
  "slug": "url-friendly-slug",
  "title": "Article Title",
  "pinterestTitle": "Hook-style title for Pinterest pin",
  "description": "1–2 sentence summary (shown in cards)",
  "pinterestDescription": "Pin description — max 500 chars. Include hashtags.",
  "author": "Elevated Editorial",
  "date": "2026-09-01T10:00:00Z",
  "pillar": "skin | hair | trending | useful-finds | style | travel",
  "category": "Human-readable category name",
  "primaryKeyword": "main seo keyword",
  "secondaryKeywords": ["keyword 2", "keyword 3"],
  "tags": ["tag1", "tag2"],
  "featured": false,
  "relatedSlugs": ["other-article-slug"],
  "content": "<h2>HTML content here</h2><p>Paragraphs, headings, lists.</p>"
}
```

### For travel articles, add:

```json
{
  "destination": "Manali",
  "season": "June"
}
```

### Publishing an article

```bash
# 1. Create the JSON file in the correct content/ subdirectory
# 2. Validate and build
git add content/
git commit -m "content: add [article title]"
git push
# Vercel will automatically deploy
```

## Adding a New Product

See `data/products/template.json` for the full product template.

Products must have:
- `status: "VERIFIED"` or `"PUBLISHED"`
- `safetyStatus: "CLEAR"` or `"PROVISIONAL"`
- `fraudRisk` must NOT be `"HIGH"`
- `affiliate.url` must be a real, valid URL

```bash
git add data/products/
git commit -m "content: add product [name]"
git push
```

## Content Pillars & URL Structure

| Pillar | URL | Example Article |
|---|---|---|
| Skincare | `/skin/[slug]` | `/skin/skincare-mistakes` |
| Haircare | `/hair/[slug]` | `/hair/hair-care-mistakes` |
| Trending | `/trending/[slug]` | `/trending/viral-products-worth-buying` |
| Useful Finds | `/useful-finds/[slug]` | `/useful-finds/problem-solving-tools` |
| Style | `/style/[slug]` | `/style/capsule-wardrobe-guide` |
| Travel | `/travel/[slug]` | `/travel/manali-june-outfit-guide` |

## Pinterest Funnel

```
Pinterest Pin (pinterestTitle)
        ↓
Website Article (/pillar/slug)
        ↓
Problem solved + practical tips
        ↓
Product recommendations
        ↓
/go/[product-slug]  (internal redirect)
        ↓
Affiliate merchant website
        ↓
Conversion
```

## Safety Rules

Products NEVER appear publicly if:
- `status` is `REJECTED`, `FLAGGED`, or `RECALLED`
- `safetyStatus` is `RECALLED` or `FLAGGED`
- `fraudRisk` is `HIGH`
- `affiliate.url` is missing or invalid

The build will FAIL if these rules are violated. This is intentional.
