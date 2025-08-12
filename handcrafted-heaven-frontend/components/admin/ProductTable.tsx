import { Product } from "@/lib/types";

type Props = {
  products: Product[];
  onDelete: (productId: number | string) => void;
};

export default function ProductTable({ products, onDelete }: Props) {
  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-4 py-2 text-left">Name</th>
          <th className="border px-4 py-2 text-left">Category</th>
          <th className="border px-4 py-2 text-left">Seller</th>
          <th className="border px-4 py-2 text-left">Price</th>
          <th className="border px-4 py-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} className="border-t">
            <td className="px-4 py-2">{product.title}</td>
            <td className="px-4 py-2">
              {product.category?.name ?? "Uncategorized"}
            </td>
            <td className="px-4 py-2">
              {product.seller?.bio ?? "Unknown Seller"}
            </td>
            <td className="px-4 py-2">
              {product.price ? `$${product.price.toFixed(2)}` : "—"}
            </td>
            <td className="px-4 py-2">
              <button
                onClick={() => onDelete(product.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
