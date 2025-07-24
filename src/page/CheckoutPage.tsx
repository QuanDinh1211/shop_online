import React, { useState } from "react";
import { ArrowLeft, CreditCard, Banknote, Building } from "lucide-react";
import { CartItem, CustomerInfo } from "../types";

interface CheckoutPageProps {}

export const CheckoutPage: React.FC<CheckoutPageProps> = () => {
  const cartItems = [
    {
      quantity: 1,
      product: {
        id: 2,
        name: "Cua Biển Tươi Sống",
        price: 450000,
        image:
          "https://images.pexels.com/photos/1395319/pexels-photo-1395319.jpeg",
        description:
          "Cua biển tươi sống, thịt chắc ngọt, màu đỏ tự nhiên. Thích hợp để hấp, nướng hoặc nấu lẩu.",
        unit: "kg",
        category: "Cua",
        inStock: true,
      },
    },
  ];
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: "",
    phone: "",
    address: "",
    paymentMethod: "cash",
    notes: "",
  });

  const [errors, setErrors] = useState<Partial<CustomerInfo>>({});

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const validateForm = () => {
    const newErrors: Partial<CustomerInfo> = {};

    if (!customerInfo.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ tên";
    }

    if (!customerInfo.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9]{10,11}$/.test(customerInfo.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (!customerInfo.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ giao hàng";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
    }
  };

  const paymentMethods = [
    {
      id: "cash" as const,
      label: "Thanh toán khi nhận hàng",
      icon: Banknote,
      description: "Thanh toán bằng tiền mặt khi nhận hàng",
    },
    {
      id: "card" as const,
      label: "Thẻ tín dụng/ghi nợ",
      icon: CreditCard,
      description: "Visa, Mastercard, JCB",
    },
    {
      id: "bank" as const,
      label: "Chuyển khoản ngân hàng",
      icon: Building,
      description: "Chuyển khoản qua internet banking",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <button
        onClick={() => {}}
        className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-6 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        Quay lại giỏ hàng
      </button>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Thông tin giao hàng
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên *
                </label>
                <input
                  type="text"
                  value={customerInfo.fullName}
                  onChange={(e) =>
                    setCustomerInfo({
                      ...customerInfo,
                      fullName: e.target.value,
                    })
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${
                    errors.fullName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Nhập họ và tên"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại *
                </label>
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, phone: e.target.value })
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Nhập số điện thoại"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Địa chỉ giao hàng *
                </label>
                <textarea
                  value={customerInfo.address}
                  onChange={(e) =>
                    setCustomerInfo({
                      ...customerInfo,
                      address: e.target.value,
                    })
                  }
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Nhập địa chỉ chi tiết"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Phương thức thanh toán
                </label>
                <div className="space-y-3">
                  {paymentMethods.map((method) => {
                    const IconComponent = method.icon;
                    return (
                      <label
                        key={method.id}
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                          customerInfo.paymentMethod === method.id
                            ? "border-cyan-500 bg-cyan-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={customerInfo.paymentMethod === method.id}
                          onChange={(e) =>
                            setCustomerInfo({
                              ...customerInfo,
                              paymentMethod: e.target.value as any,
                            })
                          }
                          className="sr-only"
                        />
                        <IconComponent className="h-6 w-6 text-gray-600 mr-3" />
                        <div>
                          <div className="font-medium text-gray-800">
                            {method.label}
                          </div>
                          <div className="text-sm text-gray-600">
                            {method.description}
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ghi chú (tùy chọn)
                </label>
                <textarea
                  value={customerInfo.notes}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, notes: e.target.value })
                  }
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Yêu cầu đặc biệt, thời gian giao hàng..."
                />
              </div>
            </form>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Đơn hàng của bạn
          </h3>

          <div className="space-y-3 mb-4">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex justify-between text-sm"
              >
                <span className="text-gray-600">
                  {item.product.name} x{item.quantity}
                </span>
                <span className="font-semibold">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between text-lg font-bold">
              <span>Tổng cộng:</span>
              <span className="text-orange-600">
                {formatPrice(totalAmount)}
              </span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
          >
            Xác nhận đặt hàng
          </button>

          <div className="mt-4 text-xs text-gray-500 text-center">
            <p>• Giao hàng trong vòng 2-4 giờ</p>
            <p>• Hỗ trợ 24/7: 1900-xxxx</p>
          </div>
        </div>
      </div>
    </div>
  );
};
