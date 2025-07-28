import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productService } from "../services/productService";
import { ArrowLeft, Plus } from "lucide-react";
import { Product } from "../types";
import { useCart } from "../contexts/CartContext";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

interface ProductDetailProps {}

export const ProductDetail: React.FC<ProductDetailProps> = ({}) => {
  const { addToCart } = useCart();
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, 1);
      toast.success(`Đã thêm ${product.name} vào giỏ hàng!`);
    }
  };
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) {
          setError("Không tìm thấy sản phẩm");
          setLoading(false);
          return;
        }
        const data = await productService.getProductById(Number(id));
        setProduct(data);
      } catch (err) {
        setError("Không thể tải thông tin sản phẩm");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 text-center">
        <Loading visible={loading} title="Đang tải thông tin sản phẩm..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="container mx-auto px-4 py-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-6 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        Quay lại
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 md:h-96 object-cover"
            />
            {!product.inStock && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  Hết hàng
                </span>
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="mb-4">
              <span className="inline-block bg-cyan-100 text-cyan-800 text-sm px-3 py-1 rounded-full mb-2">
                {product.category.name}
              </span>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-orange-600">
                  {formatPrice(product.price)}
                </span>
                <span className="text-gray-500">/{product.unit}</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Mô tả sản phẩm
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Thông tin sản phẩm
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Danh mục:</span>
                  <span className="ml-2 font-medium">
                    {product.category.name}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Đơn vị:</span>
                  <span className="ml-2 font-medium">{product.unit}</span>
                </div>
                <div>
                  <span className="text-gray-500">Tình trạng:</span>
                  <span
                    className={`ml-2 font-medium ${
                      product.inStock ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.inStock ? "Còn hàng" : "Hết hàng"}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-lg text-lg font-semibold transition-colors ${
                product.inStock
                  ? "bg-cyan-600 hover:bg-cyan-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <Plus className="h-6 w-6" />
              {product.inStock ? "Thêm vào giỏ hàng" : "Sản phẩm hết hàng"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
