import { getArticleBySlug, getAllArticles } from '@/lib/content';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  
  return {
    title: `${article.title} | Elevated Everyday Living`,
    description: article.description,
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <article className="max-w-3xl mx-auto px-6 py-12 md:py-20">
      <header className="mb-12 text-center">
        <Badge variant="secondary" className="mb-6">{article.category}</Badge>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-900 mb-6 leading-tight">
          {article.title}
        </h1>
        <p className="text-xl text-brand-700 mb-8 max-w-2xl mx-auto">
          {article.description}
        </p>
        <div className="flex items-center justify-center gap-4 text-sm text-brand-600">
          <span>By {article.author}</span>
          <span>&bull;</span>
          <time dateTime={article.date}>{formattedDate}</time>
        </div>
      </header>

      {/* Since we don't have a markdown parser set up in this environment, 
          we render the raw HTML content string dangerously for this scaffold. */}
      <div 
        className="prose prose-brand max-w-none prose-lg text-brand-800"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
      
      <footer className="mt-16 pt-8 border-t border-brand-200">
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="outline">#{tag}</Badge>
          ))}
        </div>
      </footer>
    </article>
  );
}
