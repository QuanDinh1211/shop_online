import React from "react";
import { CartItem, CustomerInfo } from "../types"; // hoặc đường dẫn phù hợp với anh

interface OrderSuccessProps {
  cartItems: CartItem[];
  orderInfo: CustomerInfo | null;
  setCartItems: (items: CartItem[]) => void;
  setOrderInfo: (info: CustomerInfo | null) => void;
  handleBackToHome: () => void;
}

const formatPrice = (price: number): string => {
  return price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

const OrderSuccessPage: React.FC<OrderSuccessProps> = ({
  cartItems,
  orderInfo,
  setCartItems,
  setOrderInfo,
  handleBackToHome,
}) => {
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Đặt hàng thành công!
          </h1>
          <p className="text-gray-600 mb-6">
            Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ với bạn trong thời gian
            sớm nhất.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-800 mb-2">
              Thông tin đơn hàng:
            </h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>
                <strong>Khách hàng:</strong> {orderInfo?.fullName}
              </p>
              <p>
                <strong>Số điện thoại:</strong> {orderInfo?.phone}
              </p>
              <p>
                <strong>Địa chỉ:</strong> {orderInfo?.address}
              </p>
              <p>
                <strong>Phương thức thanh toán:</strong>{" "}
                {orderInfo?.paymentMethod === "cash"
                  ? "Tiền mặt"
                  : orderInfo?.paymentMethod === "card"
                  ? "Thẻ"
                  : "Chuyển khoản"}
              </p>
              <p>
                <strong>Tổng tiền:</strong>{" "}
                <span className="font-semibold text-orange-600">
                  {formatPrice(totalAmount)}
                </span>
              </p>
              {orderInfo?.notes && (
                <p>
                  <strong>Ghi chú:</strong> {orderInfo.notes}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              setCartItems([]);
              setOrderInfo(null);
              handleBackToHome();
            }}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Tiếp tục mua hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
