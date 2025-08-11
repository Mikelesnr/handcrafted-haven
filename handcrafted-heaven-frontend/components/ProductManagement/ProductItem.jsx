'use client';

export default function ProductItem({ product, onDelete }) {
  return (
    <div className="border rounded p-4 flex gap-4 items-start">
      <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
        )}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold">{product.title}</h3>
        <p className="text-sm text-gray-500">{product.category || "Uncategorized"}</p>
        <p className="mt-2 font-medium">USD {product.price ?? "-"}</p>
        <div className="mt-3 flex gap-2">
          {/* Edit flow can be added later */}
          <button
            type="button"
            onClick={() => alert("Edit feature coming soon!")}
            className="px-3 py-1 rounded border"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="px-3 py-1 rounded border bg-red-100 text-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

