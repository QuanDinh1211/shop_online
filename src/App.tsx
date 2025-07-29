import React, { useState, useEffect } from "react";
import { LoginPage } from "./components/LoginPage";
import { DashboardPage } from "./components/DashboardPage";
import { ProductsPage } from "./components/ProductsPage";
import { OrdersPage } from "./components/OrdersPage";
import { AdminHeader } from "./components/AdminHeader";
import { AdminSidebar } from "./components/AdminSidebar";
import { Product, Order, AdminStats } from "./types";
import { products as initialProducts } from "./data/products";
import { useAuth } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";

type AdminPage = "dashboard" | "products" | "orders" | "customers" | "settings";

function AdminApp() {
  const { isAuthenticated, login, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState<AdminPage>("dashboard");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem("seafood-orders");
    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders);
      // Convert date strings back to Date objects
      const ordersWithDates = parsedOrders.map((order: any) => ({
        ...order,
        createdAt: new Date(order.createdAt),
        updatedAt: new Date(order.updatedAt),
      }));
      setOrders(ordersWithDates);
    }

    const savedProducts = localStorage.getItem("seafood-products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  // Save data to localStorage when changed
  useEffect(() => {
    localStorage.setItem("seafood-orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("seafood-products", JSON.stringify(products));
  }, [products]);

  const handleLogin = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    const success = await login(username, password);

    return success;
  };

  const handleLogout = () => {
    logout();
    setCurrentPage("dashboard");
  };

  const handleUpdateOrderStatus = (
    orderId: string,
    status: Order["status"]
  ) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status, updatedAt: new Date() }
          : order
      )
    );
  };

  // Calculate stats
  const stats: AdminStats = {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    pendingOrders: orders.filter((order) => order.status === "pending").length,
    totalProducts: products.length,
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader
        onLogout={handleLogout}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex">
        <AdminSidebar
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 lg:ml-64">
          <div className="p-6">
            {currentPage === "dashboard" && (
              <DashboardPage stats={stats} recentOrders={orders.slice(0, 5)} />
            )}
            {currentPage === "products" && <ProductsPage />}
            {currentPage === "orders" && (
              <OrdersPage
                orders={orders}
                onUpdateStatus={handleUpdateOrderStatus}
              />
            )}
            {currentPage === "customers" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                  Quản lý khách hàng
                </h1>
                <p className="text-gray-600">Tính năng đang phát triển...</p>
              </div>
            )}
            {currentPage === "settings" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                  Cài đặt hệ thống
                </h1>
                <p className="text-gray-600">Tính năng đang phát triển...</p>
              </div>
            )}
          </div>
        </main>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default AdminApp;
