import React from "react";
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { formatPrice } from "../utils/function";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

interface CartPageProps {}

export const CartPage: React.FC<CartPageProps> = ({}) => {
  const navigate = useNavigate();
  const {
    items: cartItems,
    updateQuantity,
    removeFromCart,
    totalPrice,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Tiếp tục mua hàng
        </button>

        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Giỏ hàng trống
          </h2>
          <p className="text-gray-600 mb-6">
            Bạn chưa có sản phẩm nào trong giỏ hàng
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Khám phá sản phẩm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-6 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        Tiếp tục mua hàng
      </button>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold text-gray-800">
                Giỏ hàng của bạn
              </h2>
              <p className="text-gray-600">{cartItems.length} sản phẩm</p>
            </div>

            <div className="divide-y">
              {cartItems.map((item) => (
                <div key={item.product.id} className="p-4 flex gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">
                      {item.product.name}{" "}
                      <span className="inline-block bg-gray-100 text-gray-700 ml-2 px-3 py-1 rounded-md text-xs">
                        {item.product.unit}
                      </span>
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {item.product.category.name}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-orange-600">
                        {formatPrice(item.product.price)}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="p-1 hover:bg-gray-100 rounded"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded ml-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Tổng kết đơn hàng
          </h3>

          <div className="space-y-3 mb-4">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex justify-between text-sm"
              >
                <span className="text-gray-600">
                  {item.product.name} x{item.quantity} {item.product.unit}
                </span>
                <span className="font-semibold">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between text-lg font-bold">
              <span>Tổng cộng:</span>
              <span className="text-orange-600">{formatPrice(totalPrice)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
          >
            Tiến hành mua hàng
          </button>

          <div className="mt-4 text-xs text-gray-500 text-center">
            <p>• Miễn phí giao hàng với đơn hàng trên 500,000đ</p>
            <p>• Cam kết hải sản tươi ngon 100%</p>
          </div>
        </div>
      </div>
    </div>
  );
};
