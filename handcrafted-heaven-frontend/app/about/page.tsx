// app/about/page.tsx
"use client";

import { useEffect } from "react";

export default function AboutPage() {
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      const handleClick = (e: Event) => {
        e.preventDefault();
        const href = (e.currentTarget as HTMLAnchorElement).getAttribute(
          "href"
        );
        if (href) {
          document.querySelector(href)?.scrollIntoView({
            behavior: "smooth",
          });
        }
      };
      anchor.addEventListener("click", handleClick);

      return () => {
        anchor.removeEventListener("click", handleClick);
      };
    });
  }, []);

  return (
    <main>
      {/* Header and Nav moved to a separate file, so we'll start with the main page content */}

      {/* Hero Section */}
      <section className="bg-white">
        <div className="container mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 leading-tight">
            About Handcrafted Haven
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-stone-600">
            Welcome to our virtual marketplace where creativity and commerce
            meet. Our mission is to connect talented artisans with consumers who
            appreciate the unique beauty of handmade goods, fostering a
            community built on creativity and sustainable consumption.
          </p>
        </div>
      </section>

      {/* Our Vision Section */}
      <section id="vision" className="py-20">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12">Our Vision</h3>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-xl shadow-lg transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-xl">
              <div className="text-4xl mb-4">🎨</div>
              <h4 className="text-xl font-bold mb-2">Empower Artisans</h4>
              <p className="text-stone-600">
                Providing a dedicated space for sellers to showcase their
                creations, manage their profiles, and connect directly with
                customers.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-xl">
              <div className="text-4xl mb-4">💖</div>
              <h4 className="text-xl font-bold mb-2">Delight Customers</h4>
              <p className="text-stone-600">
                Offering a curated selection of unique, handcrafted products,
                ensuring every purchase is a meaningful discovery.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-xl">
              <div className="text-4xl mb-4">🤝</div>
              <h4 className="text-xl font-bold mb-2">Foster Community</h4>
              <p className="text-stone-600">
                Promoting a cycle of creativity and support, where every sale
                directly benefits the hands that made the item.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-20 bg-stone-200">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12">Key Features</h3>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-x-12 gap-y-10">
            <div className="flex items-start space-x-4">
              <div className="text-3xl mt-1">👤</div>
              <div>
                <h4 className="font-bold text-lg">Dedicated Seller Profiles</h4>
                <p className="text-stone-600 mt-1">
                  Authenticated users can create and manage their own
                  storefronts with a unique profile and biography.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-3xl mt-1">📦</div>
              <div>
                <h4 className="font-bold text-lg">Simple Product Management</h4>
                <p className="text-stone-600 mt-1">
                  Sellers can easily list new products, including images,
                  detailed descriptions, and pricing.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-3xl mt-1">⭐</div>
              <div>
                <h4 className="font-bold text-lg">User Reviews and Ratings</h4>
                <p className="text-stone-600 mt-1">
                  A built-in system allows customers to provide feedback,
                  helping to build trust and quality within the community.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-3xl mt-1">📱</div>
              <div>
                <h4 className="font-bold text-lg">Responsive & Accessible</h4>
                <p className="text-stone-600 mt-1">
                  Built with a mobile-first approach and a commitment to WCAG
                  2.1 Level AA accessibility standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section id="tech" className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-4">
            The Technology Behind the Craft
          </h3>
          <p className="max-w-3xl mx-auto text-lg text-stone-600 mb-8">
            Handcrafted Haven is a modern web application built on a robust
            technology stack to ensure performance, reliability, and a great
            user experience.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <span className="bg-purple-100 text-purple-800 text-sm font-semibold px-4 py-2 rounded-full">
              Next.js
            </span>
            <span className="bg-purple-100 text-purple-800 text-sm font-semibold px-4 py-2 rounded-full">
              Node.js
            </span>
            <span className="bg-purple-100 text-purple-800 text-sm font-semibold px-4 py-2 rounded-full">
              Vercel
            </span>
            <span className="bg-purple-100 text-purple-800 text-sm font-semibold px-4 py-2 rounded-full">
              Git & GitHub
            </span>
            <span className="bg-purple-100 text-purple-800 text-sm font-semibold px-4 py-2 rounded-full">
              Tailwind CSS
            </span>
          </div>
        </div>
      </section>

      {/* Contributors Section */}
      <section id="contributors" className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-8">Project Contributors</h3>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="font-semibold text-lg">Michael Mwanza</div>
            <div className="font-semibold text-lg">Moshoeshoe Simon Mopeli</div>
            <div className="font-semibold text-lg">Tinny Mosimanyana</div>
          </div>
        </div>
      </section>
    </main>
  );
}
