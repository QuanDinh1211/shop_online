import React, { useState, useEffect } from "react";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Calendar,
  Eye,
  ArrowLeft,
} from "lucide-react";
import { Order } from "../types";
import { orderService } from "../services/orderService";
import { formatDate, formatPrice } from "../utils/function";
import { useNavigate } from "react-router-dom";

const OrderTrackingPage: React.FC = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await orderService.getOrdersByUser();
        if (data?.success) {
          setOrders(data.orders || []);
          // Map lại total_amount thành totalPrice
        } else {
          setError("Không thể tải lịch sử đơn hàng.");
        }
      } catch (err) {
        setError("Không thể tải lịch sử đơn hàng.");
      }
      setIsLoading(false);
    };
    fetchOrders();
  }, []);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "pending":
        return {
          text: "Đang xử lý",
          color: "text-blue-600",
          bgColor: "bg-blue-100",
          icon: Clock,
        };
      case "shipping":
        return {
          text: "Đang giao hàng",
          color: "text-orange-600",
          bgColor: "bg-orange-100",
          icon: Truck,
        };
      case "delivered":
        return {
          text: "Đã giao hàng",
          color: "text-green-600",
          bgColor: "bg-green-100",
          icon: CheckCircle,
        };
      case "cancelled":
        return {
          text: "Đã hủy",
          color: "text-red-600",
          bgColor: "bg-red-100",
          icon: Package,
        };
      default:
        return {
          text: "Không xác định",
          color: "text-gray-600",
          bgColor: "bg-gray-100",
          icon: Package,
        };
    }
  };

  const getTrackingSteps = (status: string) => {
    const steps = [
      { key: "pending", label: "Đang xử lý", icon: Clock },
      { key: "shipping", label: "Đang giao hàng", icon: Truck },
      { key: "delivered", label: "Đã giao hàng", icon: CheckCircle },
    ];

    const currentIndex = steps.findIndex((step) => step.key === status);

    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      active: index === currentIndex,
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải lịch sử đơn hàng...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700  transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Quay lại trang chủ
        </button>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Lịch sử đơn hàng
          </h1>
          <p className="text-gray-600">Theo dõi tất cả đơn hàng của bạn</p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Chưa có đơn hàng nào
            </h2>
            <p className="text-gray-600 mb-6">
              Bạn chưa thực hiện đơn hàng nào. Hãy bắt đầu mua sắm ngay!
            </p>
            <a
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Bắt đầu mua sắm
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Orders List */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Danh sách đơn hàng ({orders.length})
              </h2>
              {orders.map((order) => {
                const statusInfo = getStatusInfo(order.status);
                const StatusIcon = statusInfo.icon;
                return (
                  <div
                    key={order.id}
                    className={`bg-white rounded-lg shadow-md p-4 cursor-pointer transition-all hover:shadow-lg ${
                      selectedOrder?.id === order.id
                        ? "ring-2 ring-blue-500"
                        : ""
                    }`}
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 break-all">
                          #
                          {order.order_code && order.order_code.length > 12
                            ? `${order.order_code.slice(
                                0,
                                6
                              )}...${order.order_code.slice(-4)}`
                            : order.order_code}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {formatDate(order.updatedAt)}
                        </p>
                      </div>
                      <div
                        className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full ${statusInfo.bgColor}`}
                      >
                        <StatusIcon className={`h-4 w-4 ${statusInfo.color}`} />
                        <span
                          className={`text-sm font-medium ${statusInfo.color}`}
                        >
                          {statusInfo.text}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">
                          {order.items.reduce(
                            (sum, item) => sum + item.quantity,
                            0
                          )}{" "}
                          sản phẩm
                        </p>
                        <p className="font-semibold text-blue-600">
                          {formatPrice(order.totalPrice)}
                        </p>
                      </div>
                      <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm">
                        <Eye className="h-4 w-4" />
                        <span>Xem chi tiết</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Details */}
            <div className="lg:sticky lg:top-8">
              {selectedOrder ? (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Chi tiết đơn hàng
                        </h3>
                        <p className="text-sm text-gray-600 break-all">
                          #{selectedOrder.order_code}
                        </p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-sm text-gray-600">Ngày đặt</p>
                        <p className="font-semibold break-all">
                          {formatDate(selectedOrder.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    {/* Progress Steps */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        Trạng thái đơn hàng
                      </h4>
                      <div className="relative">
                        <div className="flex items-center justify-between">
                          {getTrackingSteps(selectedOrder.status).map(
                            (step, index) => {
                              const StepIcon = step.icon;
                              return (
                                <div
                                  key={step.key}
                                  className="flex flex-col items-center flex-1 relative"
                                >
                                  <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                                      step.completed
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-200 text-gray-400"
                                    }`}
                                  >
                                    <StepIcon className="h-5 w-5" />
                                  </div>
                                  <span
                                    className={`text-xs font-medium text-center ${
                                      step.completed
                                        ? "text-blue-600"
                                        : "text-gray-400"
                                    }`}
                                  >
                                    {step.label}
                                  </span>
                                  {index <
                                    getTrackingSteps(selectedOrder.status)
                                      .length -
                                      1 && (
                                    <div
                                      className={`absolute top-5 left-1/2 w-full h-0.5 ${
                                        step.completed &&
                                        getTrackingSteps(selectedOrder.status)[
                                          index + 1
                                        ].completed
                                          ? "bg-blue-600"
                                          : "bg-gray-200"
                                      }`}
                                      style={{
                                        transform: "translateX(50%)",
                                        zIndex: -1,
                                      }}
                                    />
                                  )}
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                    {/* Customer Info */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Thông tin người nhận
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-600 w-20">Họ tên:</span>
                          <span className="font-medium">
                            {selectedOrder.orderInfo.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">
                            {selectedOrder.orderInfo.phone}
                          </span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                          <span className="font-medium">
                            {selectedOrder.orderInfo.address}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Order Items */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Sản phẩm
                      </h4>
                      <div className="space-y-3">
                        {selectedOrder.items.map((item) => (
                          <div
                            key={item.product.id}
                            className="flex items-center space-x-3 py-2 border-b border-gray-100 last:border-b-0"
                          >
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="h-12 w-12 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h5 className="font-medium text-gray-900 text-sm">
                                {item.product.name}
                              </h5>
                              <p className="text-xs text-gray-600">
                                SL: {item.quantity}
                              </p>
                            </div>
                            <span className="font-semibold text-sm">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Total */}
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-900">
                          Tổng cộng:
                        </span>
                        <span className="font-bold text-blue-600 text-lg">
                          {formatPrice(selectedOrder.totalPrice)}
                        </span>
                      </div>
                    </div>
                    {/* Delivery Info */}
                    {selectedOrder.estimatedDelivery && (
                      <div className="mt-4 bg-blue-50 rounded-lg p-3">
                        <div className="flex items-center space-x-2 text-blue-800">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            Dự kiến giao:{" "}
                            {formatDate(selectedOrder.estimatedDelivery)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Chọn đơn hàng
                  </h3>
                  <p className="text-gray-600">
                    Nhấp vào một đơn hàng để xem chi tiết
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTrackingPage;
