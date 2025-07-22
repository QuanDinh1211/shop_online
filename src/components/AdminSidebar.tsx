import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings,
  X
} from 'lucide-react';

type AdminPage = 'dashboard' | 'products' | 'orders' | 'customers' | 'settings';

interface AdminSidebarProps {
  currentPage: AdminPage;
  onPageChange: (page: AdminPage) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentPage,
  onPageChange,
  isOpen,
  onClose
}) => {
  const menuItems = [
    {
      id: 'dashboard' as AdminPage,
      label: 'Tổng quan',
      icon: LayoutDashboard,
      description: 'Thống kê tổng quan'
    },
    {
      id: 'products' as AdminPage,
      label: 'Sản phẩm',
      icon: Package,
      description: 'Quản lý hải sản'
    },
    {
      id: 'orders' as AdminPage,
      label: 'Đơn hàng',
      icon: ShoppingBag,
      description: 'Quản lý đơn hàng'
    },
    {
      id: 'customers' as AdminPage,
      label: 'Khách hàng',
      icon: Users,
      description: 'Quản lý khách hàng'
    },
    {
      id: 'settings' as AdminPage,
      label: 'Cài đặt',
      icon: Settings,
      description: 'Cấu hình hệ thống'
    }
  ];

  const handleItemClick = (page: AdminPage) => {
    onPageChange(page);
    onClose(); // Close sidebar on mobile after selection
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-40 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `} style={{height: '100vh'}}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
          <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map(item => {
            const IconComponent = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors
                  ${isActive 
                    ? 'bg-cyan-50 text-cyan-700 border border-cyan-200' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <IconComponent className={`h-5 w-5 ${isActive ? 'text-cyan-600' : 'text-gray-500'}`} />
                <div>
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-gray-500">{item.description}</div>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs text-gray-500">Admin Panel v1.0</p>
            <p className="text-xs text-gray-400">Hải Sản Tươi Ngon</p>
          </div>
        </div>
      </aside>
    </>
  );
};