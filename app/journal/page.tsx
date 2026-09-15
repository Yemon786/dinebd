"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight, BookOpen } from "lucide-react";
import { articles, categories } from "./data";

export default function JournalPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const featured = articles.find((a) => a.featured);

  const nonFeatured = articles.filter((a) => !a.featured);
  const filteredNonFeatured =
    activeCategory === "All"
      ? nonFeatured
      : nonFeatured.filter((a) => a.category === activeCategory);

  const allFiltered =
    activeCategory === "All"
      ? nonFeatured
      : articles.filter((a) => a.category === activeCategory);

  const showFeatured = activeCategory === "All" && featured;

  return (
    <main className="bg-white text-gray-800">
      {/* Hero — food_culture.jpg as full-bleed background */}
      <section className="relative text-white py-28 px-4 overflow-hidden">
        <Image
          src="/for_journal/food_culture.jpg"
          alt="Bangladeshi food spread"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gray-900/72" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <span className="inline-block text-[#ED7319] font-semibold text-sm uppercase tracking-widest mb-4">
            The Dinebd Journal
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            Stories, Insights
            <br />
            <span className="text-[#ED7319]">&amp; Food Thinking</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-xl mx-auto">
            Behind every order is a story. We write about food culture, our
            people, and the industry we are helping to build in Bangladesh.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <div className="sticky top-16 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide py-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-[#ED7319] text-white shadow-sm"
                    : "text-gray-600 hover:text-[#ED7319] hover:bg-orange-50 bg-gray-50 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Article */}
        {showFeatured && featured && (
          <div className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#ED7319] mb-5">
              Featured Story
            </p>
            <Link href={`/journal/${featured.slug}`} className="group block">
              <div className="grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
                {/* Left — real photo */}
                <div className="relative min-h-[320px] lg:min-h-[440px]">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8 z-10">
                    <span className={`inline-block text-xs font-semibold uppercase tracking-widest ${featured.accentColor}`}>
                      {featured.category}
                    </span>
                    <h2 className="text-white text-2xl sm:text-3xl font-bold leading-snug mt-2">
                      {featured.title}
                    </h2>
                  </div>
                </div>

                {/* Right — content */}
                <div className="bg-gray-900 text-white p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <p className="text-gray-300 text-base leading-relaxed mb-8">
                      {featured.excerpt}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-6">
                      <span className="flex items-center gap-1.5">
                        <Clock size={13} />
                        {featured.readTime}
                      </span>
                      <span>{featured.date}</span>
                      <span>{featured.author}</span>
                    </div>
                    <span className="inline-flex items-center gap-2 text-[#ED7319] font-semibold text-sm group-hover:gap-3 transition-all">
                      Read Story <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Article Grid */}
        {allFiltered.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-400 text-lg">
              No articles in this category yet.
            </p>
          </div>
        ) : (
          <>
            {activeCategory !== "All" && (
              <p className="text-sm text-gray-400 mb-8">
                {allFiltered.length} article{allFiltered.length !== 1 ? "s" : ""} in{" "}
                <span className="text-gray-700 font-medium">{activeCategory}</span>
              </p>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {(activeCategory === "All" ? filteredNonFeatured : allFiltered).map((article) => (
                <Link
                  key={article.slug}
                  href={`/journal/${article.slug}`}
                  className="group block bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-orange-200 transition-all"
                >
                  {/* Card image */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <span className={`absolute bottom-4 left-4 z-10 text-xs font-semibold uppercase tracking-widest ${article.accentColor}`}>
                      {article.category}
                    </span>
                  </div>

                  {/* Card body */}
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 text-base leading-snug mb-3 group-hover:text-[#ED7319] transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {article.readTime}
                        </span>
                        <span>{article.date}</span>
                      </div>
                      <ArrowRight
                        size={15}
                        className="text-gray-300 group-hover:text-[#ED7319] group-hover:translate-x-0.5 transition-all"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Newsletter CTA */}
      <section className="bg-gray-900 text-white py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block text-[#ED7319] font-semibold text-sm uppercase tracking-widest mb-4">
            Stay Informed
          </span>
          <h2 className="text-3xl font-bold mb-4">
            Get New Stories in Your Inbox
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            From food culture to industry insights — delivered directly to you,
            no more than once a week.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="your@email.com"
              required
              className="flex-1 rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              className="bg-[#ED7319] hover:bg-orange-600 active:scale-[0.97] text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm flex-shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
