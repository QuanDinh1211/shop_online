import React, { useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import { Product, CartItem, CustomerInfo } from "./types";
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

type Page =
  | "home"
  | "product"
  | "cart"
  | "checkout"
  | "success"
  | "about"
  | "shipping"
  | "return"
  | "guide"
  | "faq";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderInfo, setOrderInfo] = useState<CustomerInfo | null>(null);

  const addToCart = (product: Product) => {
    if (!product.inStock) return;

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    // Show success message
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (productId: number) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product.id !== productId)
    );
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage("product");
  };

  const handleCartClick = () => {
    setCurrentPage("cart");
  };

  const handleCheckout = () => {
    setCurrentPage("checkout");
  };

  const handlePlaceOrder = (customerInfo: CustomerInfo) => {
    setOrderInfo(customerInfo);
    setCurrentPage("success");
    // In a real app, you would send the order to a backend here
    console.log("Order placed:", { items: cartItems, customer: customerInfo });
  };

  const handleBackToHome = () => {
    setCurrentPage("home");
    setSelectedProduct(null);
  };

  const handleFooterLinkClick = (page: Page) => {
    setCurrentPage(page);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Header
              cartItems={cartItems}
              onCartClick={handleCartClick}
              onHomeClick={handleBackToHome}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    onProductClick={handleProductClick}
                    onAddToCart={addToCart}
                  />
                }
              />
              <Route
                path="/products"
                element={
                  <HomePage
                    onProductClick={handleProductClick}
                    onAddToCart={addToCart}
                  />
                }
              />
              <Route
                path="/about"
                element={<AboutPage onBack={handleBackToHome} />}
              />
              <Route
                path="/shipping"
                element={<ShippingPolicyPage onBack={handleBackToHome} />}
              />
              <Route
                path="/return"
                element={<ReturnPolicyPage onBack={handleBackToHome} />}
              />
              <Route
                path="/guide"
                element={<BuyingGuidePage onBack={handleBackToHome} />}
              />
              <Route
                path="/faq"
                element={<FAQPage onBack={handleBackToHome} />}
              />
              <Route
                path="/success"
                element={
                  <OrderSuccessPage
                    setCartItems={setCartItems}
                    cartItems={cartItems}
                    orderInfo={orderInfo}
                    setOrderInfo={setOrderInfo}
                    handleBackToHome={handleBackToHome}
                  />
                }
              />
              <Route
                path="/product/:id"
                element={
                  <ProductDetail
                    onBack={handleBackToHome}
                    onAddToCart={addToCart}
                  />
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <CartPage
                      cartItems={cartItems}
                      onBack={handleBackToHome}
                      onUpdateQuantity={updateQuantity}
                      onRemoveItem={removeItem}
                      onCheckout={handleCheckout}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <CheckoutPage
                      cartItems={cartItems}
                      onBack={() => setCurrentPage("cart")}
                      onPlaceOrder={handlePlaceOrder}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer onLinkClick={handleFooterLinkClick} />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
