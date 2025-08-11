'use client';
export default function ProductFilter({ categories, current, onChange }) {
  return (
    <div className="mb-4">
      <label htmlFor="category-select" className="mr-2 font-medium">Filter by Category:</label>
      <select
        id="category-select"
        value={current}
        onChange={e => onChange(e.target.value)}
        className="border rounded px-3 py-1"
      >
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
    </div>
  );
}

