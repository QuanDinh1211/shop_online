import React, { useState, useEffect } from "react";
import { Search, Eye, Filter, Download, X } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Customer } from "../types";
import { formatDate, formatPrice } from "../utils/function";
import {
  getAllCustomers,
  getCustomerById,
  exportCustomers,
} from "../services/customerService";

interface CustomersPageProps {}

export const CustomersPage: React.FC<CustomersPageProps> = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<Customer["status"] | "all">(
    "all"
  );
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Lấy danh sách khách hàng
  useEffect(() => {
    const fetchCustomers = async () => {
      setIsLoading(true);
      try {
        const response = await getAllCustomers({
          keySearch: searchTerm,
          status: statusFilter !== "all" ? statusFilter : undefined,
        });
        setCustomers(response.data || []);
      } catch (error: any) {
        console.error("Error fetching customers:", error.message);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCustomers();
  }, [searchTerm, statusFilter]);

  // Xem chi tiết khách hàng
  const handleViewCustomer = async (customerId: number) => {
    try {
      const response = await getCustomerById(customerId);
      setSelectedCustomer(response.data);
    } catch (error: any) {
      console.error("Error fetching customer:", error.message);
      toast.error(error.message);
    }
  };

  // Xuất Excel
  const handleExportExcel = async () => {
    setIsExporting(true);
    try {
      const blob = await exportCustomers({
        keySearch: searchTerm,
        status: statusFilter !== "all" ? statusFilter : undefined,
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "customers.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Xuất file Excel thành công!");
    } catch (error: any) {
      console.error("Error exporting Excel:", error.message);
      toast.error(error.message || "Lỗi khi xuất file Excel");
    } finally {
      setIsExporting(false);
    }
  };

  const getStatusColor = (status: Customer["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "inactive":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: Customer["status"]) => {
    switch (status) {
      case "active":
        return "Hoạt động";
      case "inactive":
        return "Không hoạt động";
      default:
        return status;
    }
  };

  const statusOptions = [
    { value: "all", label: "Tất cả trạng thái" },
    { value: "active", label: "Hoạt động" },
    { value: "inactive", label: "Không hoạt động" },
  ];

  return (
    <div className="space-y-6">
      {/* ToastContainer */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Quản lý khách hàng
          </h1>
          <p className="text-gray-600">
            Theo dõi và quản lý thông tin khách hàng
          </p>
        </div>
        <button
          onClick={handleExportExcel}
          disabled={isExporting}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isExporting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          <Download className="h-5 w-5" />
          {isExporting ? "Đang xuất..." : "Xuất Excel"}
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Tìm theo tên, số điện thoại, email..."
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
                setStatusFilter(e.target.value as Customer["status"] | "all")
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

      {/* Customers Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số điện thoại
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tổng đơn hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tổng chi tiêu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày tạo
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
                    colSpan={8}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center">
                      <p className="text-lg font-medium">Đang tải...</p>
                    </div>
                  </td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center">
                      <Search className="h-12 w-12 text-gray-300 mb-4" />
                      <p className="text-lg font-medium">
                        Không tìm thấy khách hàng
                      </p>
                      <p className="text-sm">
                        Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {customer.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.email || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.totalOrders}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {formatPrice(customer.totalSpent)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full border ${getStatusColor(
                          customer.status
                        )}`}
                      >
                        {getStatusText(customer.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(customer.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleViewCustomer(customer.id)}
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

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Chi tiết khách hàng: {selectedCustomer.name}
                </h2>
                <button
                  onClick={() => setSelectedCustomer(null)}
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
                    <span className="font-medium">{selectedCustomer.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Số điện thoại:</span>
                    <span className="font-medium">
                      {selectedCustomer.phone}
                    </span>
                  </div>
                  {selectedCustomer.email && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">
                        {selectedCustomer.email}
                      </span>
                    </div>
                  )}
                  {selectedCustomer.address && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Địa chỉ:</span>
                      <span className="font-medium">
                        {selectedCustomer.address}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trạng thái:</span>
                    <span className="font-medium">
                      {getStatusText(selectedCustomer.status)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tổng đơn hàng:</span>
                    <span className="font-medium">
                      {selectedCustomer.totalOrders}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tổng chi tiêu:</span>
                    <span className="font-medium">
                      {formatPrice(selectedCustomer.totalSpent)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer Orders */}
              {selectedCustomer.orders &&
                selectedCustomer.orders.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Danh sách đơn hàng
                    </h3>
                    <div className="space-y-3">
                      {selectedCustomer.orders.map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">
                              #{order.order_code.slice(-8)}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {order.items?.length || 0} sản phẩm,{" "}
                              {order.items?.reduce(
                                (sum, item) => sum + item.quantity,
                                0
                              ) || 0}{" "}
                              món
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              {formatPrice(order.total)}
                            </p>
                            <p className="text-sm text-gray-600">
                              {formatDate(order.createdAt.toString())}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
