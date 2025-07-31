// components/Pagination.tsx

"use client";
import { PaginationProps } from "@/lib/types";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded border bg-black text-sm hover:bg-gray-700 disabled:opacity-50"
      >
        {"<<<"}
      </button>
      <span className="text-sm text-neutral-600">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded border bg-black text-sm hover:bg-gray-700 disabled:opacity-50"
      >
        {">>>"}
      </button>
    </div>
  );
}
