import ProductGrid from "@/components/home/ProductGrid";

export default function HomePage() {
  return (
    <>
      <main className="px-4 sm:px-6 md:px-8">
        <section className="mt-6 mb-4">
          <h2 className="text-2xl font-heading text-primary">
            Featured Products
          </h2>
          <div className="max-w-6xl mx-auto px-4 md-20">
            <ProductGrid />
          </div>
        </section>
      </main>
    </>
  );
}
