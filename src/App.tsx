import React, { useState, useEffect } from "react";
import { LoginPage } from "./components/LoginPage";
import { DashboardPage } from "./components/DashboardPage";
import { ProductsPage } from "./components/ProductsPage";
import { OrdersPage } from "./components/OrdersPage";
import { AdminHeader } from "./components/AdminHeader";
import { AdminSidebar } from "./components/AdminSidebar";
import { useAuth } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import { CustomersPage } from "./components/CustomersPage";

type AdminPage = "dashboard" | "products" | "orders" | "customers" | "settings";

function AdminApp() {
  const { isAuthenticated, login, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState<AdminPage>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // hoặc behavior: "auto"
  }, [currentPage]);

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
              <DashboardPage onPageChange={setCurrentPage} />
            )}
            {currentPage === "products" && <ProductsPage />}
            {currentPage === "orders" && <OrdersPage />}
            {currentPage === "customers" && <CustomersPage />}
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
