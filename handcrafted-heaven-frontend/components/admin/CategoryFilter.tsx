"use client";

export default function CategoryFilter({ categories, selected, onChange }) {
  return (
    <div className="mb-4">
      <label className="mr-2 font-medium">Filter by Category:</label>
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded p-1"
      >
        <option value="all">All</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}

