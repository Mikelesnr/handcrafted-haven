import ProductGrid from "@/components/common/ProductGrid";

export default function ProductsPage() {
  return (
    <>
      <main className="px-4 sm:px-6 md:px-8">
        <section className="mt-6 mb-4">
          <h2 className="text-2xl font-heading text-primary">All Products</h2>
          <div className="max-w-6xl mx-auto px-4 md-20">
            {/* Pass the searchParams prop to the ProductGrid component */}
            <ProductGrid />
          </div>
        </section>
      </main>
    </>
  );
}
