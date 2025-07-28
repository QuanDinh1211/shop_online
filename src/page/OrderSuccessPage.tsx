import React, { useState } from "react";
import { OrderInfo } from "../types"; // hoặc đường dẫn phù hợp với anh
import { formatPrice } from "../utils/function";
import { useLocation, useNavigate } from "react-router-dom";

interface OrderSuccessProps {}

const OrderSuccessPage: React.FC<OrderSuccessProps> = ({}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const order = location.state?.order as OrderInfo | null;

  React.useEffect(() => {
    if (!order) {
      navigate("/");
    }
  }, [order, navigate]);

  if (!order) {
    return null;
  }

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
                <strong>Khách hàng:</strong> {order?.name}
              </p>
              <p>
                <strong>Số điện thoại:</strong> {order?.phone}
              </p>
              <p>
                <strong>Địa chỉ:</strong> {order?.address}
              </p>
              <p>
                <strong>Phương thức thanh toán:</strong>{" "}
                {order?.paymentMethod === "cash"
                  ? "Tiền mặt"
                  : order?.paymentMethod === "card"
                  ? "Thẻ"
                  : "Chuyển khoản"}
              </p>
              <p>
                <strong>Tổng tiền:</strong>{" "}
                <span className="font-semibold text-orange-600">
                  {formatPrice(order?.totalAmount)}
                </span>
              </p>
              {order?.notes && (
                <p>
                  <strong>Ghi chú:</strong> {order.notes}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={() => navigate("/")}
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
