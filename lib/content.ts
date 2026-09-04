import fs from 'fs';
import path from 'path';

// Note: In a real environment, we'd use gray-matter and marked to parse MDX/Markdown.
// For this architecture scaffold, we'll build a basic parser that assumes JSON frontmatter or simple splitting.

export interface Article {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  content: string;
}

export function getAllArticles(): Article[] {
  const blogDir = path.join(process.cwd(), 'content', 'blog');
  if (!fs.existsSync(blogDir)) return [];

  const fileNames = fs.readdirSync(blogDir);
  const articles: Article[] = [];

  for (const fileName of fileNames) {
    if (fileName.endsWith('.json')) {
      const fullPath = path.join(blogDir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      try {
        const article: Article = JSON.parse(fileContents);
        articles.push(article);
      } catch (err) {
        console.error(`Error parsing ${fileName}`, err);
      }
    }
  }

  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticleBySlug(slug: string): Article | null {
  const articles = getAllArticles();
  return articles.find((a) => a.slug === slug) || null;
}
