import HomeProductGrid from "@/components/home/ProductGrid";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center text-center p-8 md:p-16 text-white bg-gradient-to-br from-primary to-secondary">
        <div className="absolute inset-0 opacity-20">
          {/* Background pattern for visual interest */}
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern
              id="pattern-svg"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <rect width="1" height="1" fill="#fff" opacity="0.1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#pattern-svg)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-md">
            Discover Unique Handmade Treasures
          </h1>
          <p className="mt-4 text-lg md:text-xl font-light drop-shadow-sm">
            Explore a curated collection of artisanal products crafted with
            passion and skill.
          </p>
          <Link href="/products">
            <span className="mt-8 inline-flex text-gray-900 items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-primary bg-white hover:bg-gray-100 transition-transform transform hover:scale-105">
              Shop All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="px-4 sm:px-6 md:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-4">
            Featured Products
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Hand-picked items that showcase the best of our community&apos;s
            artisans.
          </p>
          <HomeProductGrid />
        </div>
      </section>

      {/* This section is a placeholder for future content */}
      <section className="px-4 sm:px-6 md:px-8 py-16 text-center text-gray-600 dark:text-gray-400">
        {/* You could add a "Why shop with us?" or "Meet the artisans" section here */}
        <p>More content coming soon...</p>
      </section>
    </div>
  );
}
