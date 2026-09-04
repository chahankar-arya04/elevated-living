export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-5xl font-serif font-bold text-brand-900 mb-6">
        Make everyday life a little better.
      </h1>
      <p className="text-xl text-brand-700 max-w-2xl mb-12">
        Beautiful ideas, practical solutions and smart finds for the way you actually live.
      </p>
      
      <div className="flex gap-4">
        <a href="/ideas" className="px-6 py-3 bg-brand-800 text-white rounded-md font-medium hover:bg-brand-900 transition-colors">
          Explore Ideas
        </a>
        <a href="/products" className="px-6 py-3 bg-white text-brand-900 border border-brand-200 rounded-md font-medium hover:bg-brand-50 transition-colors">
          Discover Finds
        </a>
      </div>
    </div>
  );
}
