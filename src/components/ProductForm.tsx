import React, { useEffect, useState } from "react";
import { X, Upload } from "lucide-react";
import { Category, Product, Unit } from "../types";
import { getAllCategories, getAllUnits } from "../services/productService";

interface ProductFormProps {
  product: Product | null;
  onSubmit: (product: Product) => void;
  onCancel: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    price: product?.price || 0,
    image: product?.image || "",
    description: product?.description || "",
    unit: product?.unitId || undefined,
    category: product?.category_id || undefined,
    inStock: product?.inStock ?? true,
  });

  const [dataCategories, setDataCategories] = useState<Category[]>([]);
  const [dataUnits, setDataUnits] = useState<Unit[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, unitsData] = await Promise.all([
          getAllCategories(),
          getAllUnits(),
        ]);
        setDataCategories(categoriesData.data);
        setDataUnits(unitsData.data);
      } catch (err: any) {
        console.error("Fetch Error:", err);
      } finally {
      }
    };
    fetchData();
  }, []);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Tên sản phẩm không được để trống";
    }

    if (!formData.unit) {
      newErrors.unit = "Đơn vị không được để trống";
    }

    if (!formData.category) {
      newErrors.category = "Danh mục không được để trống";
    }

    if (formData.price <= 0) {
      newErrors.price = "Giá phải lớn hơn 0";
    }

    if (!formData.image.trim()) {
      newErrors.image = "URL hình ảnh không được để trống";
    } else if (!isValidUrl(formData.image)) {
      newErrors.image = "URL hình ảnh không hợp lệ";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Mô tả không được để trống";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ ...formData, id: product?.id || null });
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 mt-0"
      style={{ marginTop: "0" }}
    >
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {product ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên sản phẩm *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Nhập tên sản phẩm"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Giá (VND) *
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => handleChange("price", Number(e.target.value))}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${
                  errors.price ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="0"
                min="0"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
              )}
            </div>

            {/* Unit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Đơn vị *
              </label>
              <select
                value={formData?.unit}
                onChange={(e) => handleChange("unit", Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="">Chọn đơn vị</option>
                {dataUnits.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.name}
                  </option>
                ))}
              </select>
              {errors.unit && (
                <p className="text-red-500 text-sm mt-1">{errors.unit}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Danh mục *
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  handleChange("category", Number(e.target.value))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="">Chọn danh mục</option>
                {dataCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            {/* In Stock */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trạng thái
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={() => handleChange("inStock", true)}
                    className="mr-2 text-cyan-600"
                  />
                  Còn hàng
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="inStock"
                    checked={!formData.inStock}
                    onChange={() => handleChange("inStock", false)}
                    className="mr-2 text-cyan-600"
                  />
                  Hết hàng
                </label>
              </div>
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL hình ảnh *
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => handleChange("image", e.target.value)}
                  className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${
                    errors.image ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="https://example.com/image.jpg"
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  title="Upload ảnh"
                >
                  <Upload className="h-5 w-5" />
                </button>
              </div>
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">{errors.image}</p>
              )}

              {/* Image Preview */}
              {formData.image && isValidUrl(formData.image) && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">Xem trước:</p>
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả sản phẩm *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Nhập mô tả chi tiết về sản phẩm..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
            >
              {product ? "Cập nhật" : "Thêm mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
