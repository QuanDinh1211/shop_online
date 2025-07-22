import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { ProductDetail } from './components/ProductDetail';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { AboutPage } from './components/AboutPage';
import { ShippingPolicyPage } from './components/ShippingPolicyPage';
import { ReturnPolicyPage } from './components/ReturnPolicyPage';
import { BuyingGuidePage } from './components/BuyingGuidePage';
import { FAQPage } from './components/FAQPage';
import { Product, CartItem, CustomerInfo } from './types';

type Page = 'home' | 'product' | 'cart' | 'checkout' | 'success' | 'about' | 'shipping' | 'return' | 'guide' | 'faq';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderInfo, setOrderInfo] = useState<CustomerInfo | null>(null);

  const addToCart = (product: Product) => {
    if (!product.inStock) return;
    
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
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
    
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeItem = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
  };

  const handleCartClick = () => {
    setCurrentPage('cart');
  };

  const handleCheckout = () => {
    setCurrentPage('checkout');
  };

  const handlePlaceOrder = (customerInfo: CustomerInfo) => {
    setOrderInfo(customerInfo);
    setCurrentPage('success');
    // In a real app, you would send the order to a backend here
    console.log('Order placed:', { items: cartItems, customer: customerInfo });
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedProduct(null);
  };

  const handleFooterLinkClick = (page: Page) => {
    setCurrentPage(page);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onProductClick={handleProductClick}
            onAddToCart={addToCart}
          />
        );
      
      case 'product':
        return selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            onBack={handleBackToHome}
            onAddToCart={addToCart}
          />
        ) : null;
      
      case 'cart':
        return (
          <CartPage
            cartItems={cartItems}
            onBack={handleBackToHome}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem}
            onCheckout={handleCheckout}
          />
        );
      
      case 'checkout':
        return (
          <CheckoutPage
            cartItems={cartItems}
            onBack={() => setCurrentPage('cart')}
            onPlaceOrder={handlePlaceOrder}
          />
        );
      
      case 'success':
        const totalAmount = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        return (
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="text-green-500 text-6xl mb-4">✓</div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Đặt hàng thành công!</h1>
                <p className="text-gray-600 mb-6">
                  Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
                </p>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                  <h3 className="font-semibold text-gray-800 mb-2">Thông tin đơn hàng:</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><strong>Khách hàng:</strong> {orderInfo?.fullName}</p>
                    <p><strong>Số điện thoại:</strong> {orderInfo?.phone}</p>
                    <p><strong>Địa chỉ:</strong> {orderInfo?.address}</p>
                    <p><strong>Tổng tiền:</strong> <span className="font-semibold text-orange-600">{formatPrice(totalAmount)}</span></p>
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
      
      case 'about':
        return <AboutPage onBack={handleBackToHome} />;
      
      case 'shipping':
        return <ShippingPolicyPage onBack={handleBackToHome} />;
      
      case 'return':
        return <ReturnPolicyPage onBack={handleBackToHome} />;
      
      case 'guide':
        return <BuyingGuidePage onBack={handleBackToHome} />;
      
      case 'faq':
        return <FAQPage onBack={handleBackToHome} />;
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItems={cartItems}
        onCartClick={handleCartClick}
        onHomeClick={handleBackToHome}
      />
      {renderPage()}
      <Footer onLinkClick={handleFooterLinkClick} />
    </div>
  );
}

export default App;