"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import ProductCard from "@/components/common/ProductCard";
import Pagination from "@/components/common/Paginate";
import { Product, PaginationProps } from "@/lib/types";

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    api
      .get(`/products?page=${currentPage}`)
      .then((res) => {
        setProducts(res.data.data);
        setTotalPages(res.data.totalPages);
      })
      .catch(console.error);
  }, [currentPage]);

  return (
    <div className="my-12">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
