// app/seller/dashboard/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  sellerId: number;
}

export default function SellerDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    imageUrl: ''
  });

  const categories = ['Ceramics', 'Woodwork', 'Textiles', 'Glasswork', 'Metalcraft'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      // For demo - filter by sellerId = 1 (in real app, get from auth)
      const sellerProducts = response.data.data?.filter((p: Product) => p.sellerId === 1) || [];
      setProducts(sellerProducts);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      category: '',
      imageUrl: ''
    });
    setEditingProduct(null);
  };

  const handleSubmit = async () => {
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        sellerId: 1 // In real app, get from auth context
      };

      if (editingProduct) {
        // Update product
        await api.put(`/products/${editingProduct.id}`, productData);
        toast.success('Product updated successfully!');
      } else {
        // Add new product
        await api.post('/products', productData);
        toast.success('Product added successfully!');
      }

      fetchProducts();
      setShowAddForm(false);
      resetForm();
    } catch (error) {
      toast.error('Failed to save product');
      console.error(error);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      imageUrl: product.imageUrl
    });
    setShowAddForm(true);
  };

  const handleDelete = async (productId: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await api.delete(`/products/${productId}`);
      toast.success('Product deleted successfully!');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to delete product');
      console.error(error);
    }
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Products</h1>
              <p className="text-gray-600">Manage your handcrafted items</p>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowAddForm(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Product title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Product description"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  resetForm();
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">
              Your Products ({filteredProducts.length})
            </h2>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No products found. Add your first product to get started!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="border rounded-lg overflow-hidden">
                  <div className="relative w-full h-48">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{product.title}</h3>
                      <span className="text-lg font-bold text-blue-600">${product.price}</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="text-xs text-gray-500 mb-4">
                      Category: {product.category}
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-3 rounded text-sm flex items-center justify-center gap-1"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 py-2 px-3 rounded text-sm flex items-center justify-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Export this as default for easier import
export { SellerDashboard };
