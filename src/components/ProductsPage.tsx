import React, { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, Package } from "lucide-react";
import { ProductForm } from "./ProductForm";
import { Product, Category } from "../types";
import {
  getAllProducts,
  getAllCategories,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";
import { formatPrice } from "../utils/function";
import { toast } from "react-toastify";

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(["Tất cả"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [productsData, categoriesData] = await Promise.all([
        getAllProducts(),
        getAllCategories(),
      ]);

      setProducts(productsData.data);
      setCategories([
        "Tất cả",
        ...categoriesData.data.map((cat: Category) => cat.name),
      ]);
    } catch (err: any) {
      setError(err.message || "Không thể tải dữ liệu");
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onAdd = async (product: Product) => {
    setLoading(true);
    try {
      const result = await createProduct(product);
      if (result.message) {
        toast.success("Sản phẩm đã được thêm thành công!");
        setShowForm(false);
        setEditingProduct(null);
        await fetchData();
      } else {
        toast.error(result.message || "Không thể thêm sản phẩm");
      }
    } catch (err: any) {
      toast.error(err.message || "Không thể thêm sản phẩm");
      console.error("Add Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const onUpdate = async (
    id: number | null | undefined,
    product: Partial<Product>
  ) => {
    setLoading(true);
    try {
      const result = await updateProduct(id, product);
      if (result.message) {
        toast.success("Sản phẩm đã được cập nhật thành công!");
        setShowForm(false);
        setEditingProduct(null);
        await fetchData();
      } else {
        toast.error(result.message || "Không thể cập nhật sản phẩm");
      }
    } catch (err: any) {
      toast.error(err.message || "Không thể cập nhật sản phẩm");
      console.error("Update Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id: number | null | undefined) => {
    setLoading(true);
    try {
      console.log("Deleting Product ID:", id);
      await deleteProduct(id);
      console.log("Deleted Product ID:", id);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err: any) {
      setError(err.message || "Không thể xóa sản phẩm");
      console.error("Delete Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Tất cả" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (product: Product) => {
    console.log("Editing Product:", product);
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleAdd = () => {
    console.log("Opening Add Product Form");
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleDelete = (id: number | null | undefined, name: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${name}"?`)) {
      onDelete(id);
    }
  };

  const handleFormSubmit = (productData: Product) => {
    if (editingProduct) {
      onUpdate(editingProduct.id, productData);
    } else {
      onAdd(productData);
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý sản phẩm</h1>
          <p className="text-gray-600">Quản lý danh sách hải sản</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-colors disabled:bg-cyan-400"
          disabled={loading}
        >
          <Plus className="h-5 w-5" />
          Thêm sản phẩm
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg">{error}</div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              disabled={loading}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "bg-cyan-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                disabled={loading}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-cyan-600 border-r-transparent" />
          <p className="mt-2 text-gray-600">Đang tải...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <img
                  src={product.image || "https://via.placeholder.com/300"}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.inStock
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.inStock ? "Còn hàng" : "Hết hàng"}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="mb-2">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-orange-600">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-sm text-gray-500">/{product.unit}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {product.description || "Không có mô tả"}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-lg transition-colors disabled:bg-blue-50"
                    disabled={loading}
                  >
                    <Edit className="h-4 w-4" />
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(product?.id, product.name)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 px-3 py-2 rounded-lg transition-colors disabled:bg-red-50"
                    disabled={loading}
                  >
                    <Trash2 className="h-4 w-4" />
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredProducts.length === 0 && !loading && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Không tìm thấy sản phẩm
          </h3>
          <p className="text-gray-500 mb-6">
            Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
          </p>
          <button
            onClick={handleAdd}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg transition-colors disabled:bg-cyan-400"
            disabled={loading}
          >
            Thêm sản phẩm đầu tiên
          </button>
        </div>
      )}

      {/* Product Form Modal */}
      {showForm && (
        <ProductForm
          product={editingProduct}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
};
