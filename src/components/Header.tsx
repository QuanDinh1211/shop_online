import React from "react";
import { ShoppingCart, User, LogOut, Fish } from "lucide-react";
import { CartItem } from "../types";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";

interface HeaderProps {
  cartItems: CartItem[];
  onCartClick: () => void;
  onHomeClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItems,
  onCartClick,
  onHomeClick,
}) => {
  const { user, logout, isAuthenticated } = useAuth();
  // const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-cyan-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={onHomeClick}
            className="flex items-center space-x-2 text-white hover:text-cyan-100 transition-colors"
          >
            <Fish className="h-8 w-8" />
            <h1 className="text-xl font-bold">Hải Sản Tươi Ngon</h1>
          </button>

          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative p-2   text-white hover:text-cyan-100 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-white hidden sm:block">
                  Xin chào, {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-white hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1  text-white hover:text-cyan-100 transition-colors"
              >
                <User className="h-5 w-5" />
                <span className="hidden sm:block">Đăng nhập</span>
              </Link>
            )}
          </div>

          {/* <button
            onClick={onCartClick}
            className="relative flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden sm:inline">Giỏ hàng</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button> */}
        </div>
      </div>
    </header>
  );
};
