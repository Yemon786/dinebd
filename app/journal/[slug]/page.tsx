import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { articles, getArticleBySlug, getRelatedArticles } from "../data";
import type { Metadata } from "next";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found — Dinebd Journal" };
  return {
    title: `${article.title} — Dinebd Journal`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(slug, 3);

  return (
    <main className="bg-white text-gray-800">
      {/* Article Hero — full-bleed photo */}
      <div className="relative h-[55vh] min-h-[380px] max-h-[560px]">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-gray-900/30" />

        {/* Overlay content */}
        <div className="absolute inset-0 flex flex-col justify-end pb-10 px-4">
          <div className="max-w-3xl mx-auto w-full">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-white/60 mb-5">
              <Link href="/journal" className="hover:text-white transition-colors">
                Journal
              </Link>
              <ChevronRight size={12} />
              <span className={`font-semibold uppercase tracking-widest ${article.accentColor}`}>
                {article.category}
              </span>
            </nav>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {article.readTime}
              </span>
              <span>{article.date}</span>
              <span>By {article.author}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        {/* Back link */}
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#ED7319] transition-colors mb-10 group"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          Back to Journal
        </Link>

        {/* Excerpt pull-quote */}
        <p className="text-xl text-gray-600 leading-relaxed border-l-4 border-[#ED7319] pl-5 mb-12 italic">
          {article.excerpt}
        </p>

        {/* Article content */}
        <div className="space-y-6">
          {article.content.map((section, i) => (
            <div key={i}>
              {section.heading && (
                <h2 className="text-xl font-bold text-gray-900 mt-10 mb-3">
                  {section.heading}
                </h2>
              )}
              <p className="text-gray-600 leading-relaxed text-[17px]">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        {/* Article footer */}
        <div className="mt-14 pt-8 border-t border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">
              Written by
            </p>
            <p className="text-sm font-semibold text-gray-800">{article.author}</p>
            <p className="text-xs text-gray-400">{article.date}</p>
          </div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-600 border border-orange-100">
            {article.category}
          </span>
        </div>
      </div>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="bg-gray-50 border-t border-gray-100 py-16 px-4">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              More from the Journal
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/journal/${rel.slug}`}
                  className="group block bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-orange-200 transition-all"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={rel.image}
                      alt={rel.title}
                      fill
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    <span className={`absolute bottom-3 left-4 z-10 text-xs font-semibold uppercase tracking-widest ${rel.accentColor}`}>
                      {rel.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2 group-hover:text-[#ED7319] transition-colors line-clamp-2">
                      {rel.title}
                    </h3>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock size={11} />
                        {rel.readTime}
                      </span>
                      <ArrowRight
                        size={14}
                        className="text-gray-300 group-hover:text-[#ED7319] group-hover:translate-x-0.5 transition-all"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/journal"
                className="inline-flex items-center gap-2 border-2 border-gray-200 hover:border-[#ED7319] text-gray-700 hover:text-[#ED7319] font-semibold px-6 py-3 rounded-xl transition-all text-sm"
              >
                View All Articles <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-gray-900 text-white py-16 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-3">Explore the Dinebd App</h2>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            Order food, book tables, find home chefs, and more — all in one
            place across Bangladesh.
          </p>
          <a href="https://qr1.be/6UYZ">
            <button className="bg-[#ED7319] hover:bg-orange-600 active:scale-[0.97] text-white font-semibold px-8 py-3 rounded-xl transition-all">
              Download the App
            </button>
          </a>
        </div>
      </section>
    </main>
  );
}
