import ProductManagementClient from "../../../components/ProductManagement/ProductManagementClient";

export default function Page() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Product Management</h1>
      <ProductManagementClient />
    </main>
  );
}

