"use client";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
};

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  return (
    <div className="flex justify-center mt-4 gap-2">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Prev
      </button>
      <span className="px-3 py-1 font-medium">
        Page {page} of {totalPages}
      </span>
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
