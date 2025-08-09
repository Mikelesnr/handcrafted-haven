// components/seller/ProductForm.tsx
import { Product } from "@/lib/types";

interface Props {
  formData: {
    title: string;
    description: string;
    price: string;
    category: string;
    imageUrl: string;
  };
  categories: string[];
  editingProduct: Product | null;
  onChange: (field: string, value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function ProductForm({
  formData,
  categories,
  editingProduct,
  onChange,
  onSubmit,
  onCancel,
}: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">
        {editingProduct ? "Edit Product" : "Add New Product"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Title"
          value={formData.title}
          onChange={(v) => onChange("title", v)}
        />
        <InputField
          label="Price ($)"
          type="number"
          value={formData.price}
          onChange={(v) => onChange("price", v)}
        />
        <SelectField
          label="Category"
          value={formData.category}
          options={categories}
          onChange={(v) => onChange("category", v)}
        />
        <InputField
          label="Image URL"
          type="url"
          value={formData.imageUrl}
          onChange={(v) => onChange("imageUrl", v)}
        />
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => onChange("description", e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Product description"
          />
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={onSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          {editingProduct ? "Update Product" : "Add Product"}
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        placeholder={label}
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select category</option>
        {options.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
