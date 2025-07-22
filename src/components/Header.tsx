import React from 'react';
import { ShoppingCart, Fish } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  cartItems: CartItem[];
  onCartClick: () => void;
  onHomeClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartItems, onCartClick, onHomeClick }) => {
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
          
          <button
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
          </button>
        </div>
      </div>
    </header>
  );
};