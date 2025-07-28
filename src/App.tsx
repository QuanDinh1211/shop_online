import React, { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./page/HomePage";
import { ProductDetail } from "./page/ProductDetail";
import LoginPage from "./page/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { CartPage } from "./page/CartPage";
import { CheckoutPage } from "./page/CheckoutPage";
import { AboutPage } from "./page/AboutPage";
import { ShippingPolicyPage } from "./page/ShippingPolicyPage";
import { ReturnPolicyPage } from "./page/ReturnPolicyPage";
import { BuyingGuidePage } from "./page/BuyingGuidePage";
import { FAQPage } from "./page/FAQPage";
import OrderSuccessPage from "./page/OrderSuccessPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import OrderTrackingPage from "./page/OrderTrackingPage";
import ForgotPasswordPage from "./page/ForgotPasswordPage";
import ResetPasswordPage from "./page/ResetPasswordPage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-gray-50">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/shipping" element={<ShippingPolicyPage />} />
              <Route path="/return" element={<ReturnPolicyPage />} />
              <Route path="/guide" element={<BuyingGuidePage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/success" element={<OrderSuccessPage />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order-tracking"
                element={
                  <ProtectedRoute>
                    <OrderTrackingPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
        </Router>
        <ToastContainer
          className="custom-toast-container"
          pauseOnFocusLoss={false}
          autoClose={6500}
        />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
