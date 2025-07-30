import React, { useState, useEffect } from "react";
import { Search, Eye, Filter, Download, X } from "lucide-react";
import { Order } from "../types";
import { formatDate, formatPrice } from "../utils/function";
import {
  exportOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} from "../services/orderService";
import { toast } from "react-toastify";

interface OrdersPageProps {}

export const OrdersPage: React.FC<OrdersPageProps> = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<Order["status"] | "all">(
    "all"
  );
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Lấy danh sách đơn hàng
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await getAllOrders({
          keySearch: searchTerm,
          status: statusFilter !== "all" ? statusFilter : undefined,
        });
        setOrders(response.data || []);
      } catch (error: any) {
        toast.error(error.message);
        console.error("Error fetching orders:", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [searchTerm, statusFilter]);

  // Cập nhật trạng thái đơn hàng
  const handleUpdateStatus = async (
    orderId: number,
    status: Order["status"]
  ) => {
    try {
      const response = await updateOrderStatus(orderId, status);
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? { ...order, status, updated_at: new Date().toISOString() }
            : order
        )
      );
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status });
      }
      console.log("Updated order:", response.data);
    } catch (error: any) {
      toast.error(error.message || "Cập nhật không thành công");
      console.error("Error updating status:", error.message);
    }
  };

  // Xem chi tiết đơn hàng
  const handleViewOrder = async (orderId: number) => {
    try {
      const response = await getOrderById(orderId);
      setSelectedOrder(response.data);
    } catch (error: any) {
      toast.error(error.message);
      console.error("Error fetching order:", error.message);
    }
  };

  // Xuất Excel
  const handleExportExcel = async () => {
    setIsLoading(true);
    try {
      const blob = await exportOrders({
        keySearch: searchTerm,
        status: statusFilter !== "all" ? statusFilter : undefined,
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "orders.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Xuất file Excel thành công!");
    } catch (error: any) {
      console.error("Error exporting Excel:", error.message);
      toast.error(error.message || "Lỗi khi xuất file Excel");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "shipping":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "Chờ xác nhận";
      case "confirmed":
        return "Đã xác nhận";
      case "shipping":
        return "Đang giao";
      case "delivered":
        return "Đã giao";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const statusOptions = [
    { value: "all", label: "Tất cả trạng thái" },
    { value: "pending", label: "Chờ xác nhận" },
    { value: "confirmed", label: "Đã xác nhận" },
    { value: "shipping", label: "Đang giao" },
    { value: "delivered", label: "Đã giao" },
    { value: "cancelled", label: "Đã hủy" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý đơn hàng</h1>
          <p className="text-gray-600">Theo dõi và xử lý đơn hàng</p>
        </div>
        <button
          onClick={handleExportExcel}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Download className="h-5 w-5" />
          Xuất Excel
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Tìm theo mã đơn, tên khách hàng, số điện thoại..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as Order["status"] | "all")
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã đơn hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sản phẩm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tổng tiền
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày đặt
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center">
                      <p className="text-lg font-medium">Đang tải...</p>
                    </div>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center">
                      <Search className="h-12 w-12 text-gray-300 mb-4" />
                      <p className="text-lg font-medium">
                        Không tìm thấy đơn hàng
                      </p>
                      <p className="text-sm">
                        Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-mono font-medium text-gray-900">
                        #{order.order_code.slice(-8)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {order.customer.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.customer.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {order.items?.length || 0} sản phẩm
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.items?.reduce(
                          (sum, item) => sum + item.quantity,
                          0
                        ) || 0}{" "}
                        món
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900">
                        {formatPrice(order.total)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleUpdateStatus(
                            order.id,
                            e.target.value as Order["status"]
                          )
                        }
                        className={`text-xs font-medium px-3 py-1 rounded-full border ${getStatusColor(
                          order.status
                        )}`}
                      >
                        <option value="pending">Chờ xác nhận</option>
                        <option value="confirmed">Đã xác nhận</option>
                        <option value="shipping">Đang giao</option>
                        <option value="delivered">Đã giao</option>
                        <option value="cancelled">Đã hủy</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.createdAt.toString())}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleViewOrder(order.id)}
                        className="text-cyan-600 hover:text-cyan-900 p-1 rounded"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          style={{ marginTop: "0" }}
        >
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Chi tiết đơn hàng #{selectedOrder.order_code.slice(-8)}
                </h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Thông tin khách hàng
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Họ tên:</span>
                    <span className="font-medium">
                      {selectedOrder.customer.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Số điện thoại:</span>
                    <span className="font-medium">
                      {selectedOrder.customer.phone}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Địa chỉ:</span>
                    <span className="font-medium">
                      {selectedOrder.customer.address}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thanh toán:</span>
                    <span className="font-medium">
                      {selectedOrder.customer.paymentMethod === "card" &&
                        "Thẻ tín dụng/ghi nợ"}
                      {selectedOrder.customer.paymentMethod === "bank" &&
                        "Chuyển khoản ngân hàng"}
                      {selectedOrder.customer.paymentMethod === "cash" &&
                        "Thanh toán khi nhận hàng"}
                    </span>
                  </div>
                  {selectedOrder.customer.notes && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ghi chú:</span>
                      <span className="font-medium">
                        {selectedOrder.customer.notes}
                      </span>
                    </div>
                  )}
                  {selectedOrder.customer.email && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">
                        {selectedOrder.customer.email}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Sản phẩm đặt hàng
                </h3>
                <div className="space-y-3">
                  {selectedOrder.items?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                    >
                      <img
                        src={item.product.image || "/placeholder-image.jpg"}
                        alt={item.product.image}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {item.product.name}
                          <span className="inline-block bg-gray-100 text-gray-700 ml-2 px-3 py-1 rounded-md text-xs">
                            {item.product.unit}
                          </span>
                        </h4>
                        <p className="text-sm text-gray-600">
                          {item.product.category}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {formatPrice(item.product.price)} x {item.quantity}{" "}
                        </p>
                        <p className="text-sm text-gray-600">
                          = {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Tổng cộng:</span>
                  <span className="text-orange-600">
                    {formatPrice(selectedOrder.total)}
                  </span>
                </div>
              </div>

              {/* Order Status */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Cập nhật trạng thái
                </h3>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => {
                    handleUpdateStatus(
                      selectedOrder.id,
                      e.target.value as Order["status"]
                    );
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="pending">Chờ xác nhận</option>
                  <option value="confirmed">Đã xác nhận</option>
                  <option value="shipping">Đang giao</option>
                  <option value="delivered">Đã giao</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
