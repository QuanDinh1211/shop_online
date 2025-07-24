import React from "react";
import { ArrowLeft, Truck, Clock, MapPin, Package, Phone } from "lucide-react";

interface ShippingPolicyPageProps {}

export const ShippingPolicyPage: React.FC<ShippingPolicyPageProps> = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <button
        onClick={() => {}}
        className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-6 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        Quay lại trang chủ
      </button>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <Truck className="h-16 w-16 text-cyan-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Chính sách giao hàng
          </h1>
          <p className="text-gray-600">
            Thông tin chi tiết về dịch vụ giao hàng của chúng tôi
          </p>
        </div>

        <div className="space-y-8">
          {/* Delivery Areas */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="h-6 w-6 text-cyan-600" />
              <h2 className="text-xl font-bold text-gray-800">
                Khu vực giao hàng
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">
                  Khu vực nội thành TP.HCM
                </h3>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Quận 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12</li>
                  <li>• Quận Bình Thạnh, Phú Nhuận, Tân Bình</li>
                  <li>• Quận Gò Vấp, Tân Phú, Bình Tân</li>
                  <li>• Thời gian: 2-4 giờ</li>
                </ul>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">
                  Khu vực ngoại thành & tỉnh lân cận
                </h3>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Huyện Hóc Môn, Củ Chi, Bình Chánh</li>
                  <li>• Thủ Đức, Nhà Bè, Cần Giờ</li>
                  <li>• Đồng Nai, Bình Dương, Long An</li>
                  <li>• Thời gian: 4-8 giờ</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Delivery Time */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Clock className="h-6 w-6 text-cyan-600" />
              <h2 className="text-xl font-bold text-gray-800">
                Thời gian giao hàng
              </h2>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <Clock className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Giao hàng nhanh
                  </h3>
                  <p className="text-sm text-gray-600">2-4 giờ (nội thành)</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <Truck className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Giao hàng tiêu chuẩn
                  </h3>
                  <p className="text-sm text-gray-600">4-8 giờ (ngoại thành)</p>
                </div>
                <div className="text-center">
                  <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <Package className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Đặt hàng trước
                  </h3>
                  <p className="text-sm text-gray-600">
                    Theo yêu cầu khách hàng
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Fees */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Phí giao hàng
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                      Khu vực
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                      Giá trị đơn hàng
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                      Phí giao hàng
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">
                      Nội thành TP.HCM
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Trên 500,000đ
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-green-600 font-semibold">
                      Miễn phí
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">
                      Nội thành TP.HCM
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Dưới 500,000đ
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      30,000đ
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">
                      Ngoại thành & tỉnh lân cận
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Trên 1,000,000đ
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-green-600 font-semibold">
                      Miễn phí
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">
                      Ngoại thành & tỉnh lân cận
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Dưới 1,000,000đ
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      50,000đ
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Packaging */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Package className="h-6 w-6 text-cyan-600" />
              <h2 className="text-xl font-bold text-gray-800">
                Đóng gói sản phẩm
              </h2>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>
                    Hải sản tươi sống được đóng gói trong thùng xốp cách nhiệt
                    với đá lạnh
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>
                    Sử dụng túi nilon chuyên dụng, đảm bảo không thấm nước
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Dán nhãn thông tin sản phẩm và hướng dẫn bảo quản</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>
                    Đảm bảo nhiệt độ từ 0-4°C trong suốt quá trình vận chuyển
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Phone className="h-6 w-6 text-cyan-600" />
              <h2 className="text-xl font-bold text-gray-800">
                Hỗ trợ giao hàng
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              Nếu bạn có bất kỳ thắc mắc nào về giao hàng, vui lòng liên hệ với
              chúng tôi:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-gray-800">
                  Hotline giao hàng:
                </p>
                <p className="text-cyan-600 font-semibold">1900-xxxx (24/7)</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Email hỗ trợ:</p>
                <p className="text-cyan-600">delivery@haisantuoingon.vn</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
