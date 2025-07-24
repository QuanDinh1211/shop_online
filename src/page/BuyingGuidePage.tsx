import React from "react";
import {
  ArrowLeft,
  ShoppingCart,
  Search,
  CreditCard,
  Truck,
  Star,
  Phone,
} from "lucide-react";

interface BuyingGuidePageProps {}

export const BuyingGuidePage: React.FC<BuyingGuidePageProps> = () => {
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
          <ShoppingCart className="h-16 w-16 text-cyan-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Hướng dẫn mua hàng
          </h1>
          <p className="text-gray-600">
            Hướng dẫn chi tiết cách mua hàng trên website
          </p>
        </div>

        <div className="space-y-8">
          {/* Step by Step Guide */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Các bước mua hàng
            </h2>
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="bg-cyan-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Search className="h-6 w-6 text-cyan-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Bước 1: Tìm kiếm sản phẩm
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Sử dụng thanh tìm kiếm hoặc duyệt theo danh mục để tìm sản
                    phẩm mong muốn.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">
                      Mẹo tìm kiếm hiệu quả:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>
                        • Sử dụng từ khóa chính như "tôm", "cua", "cá hồi"
                      </li>
                      <li>• Lọc theo danh mục để thu hẹp kết quả</li>
                      <li>• Kiểm tra trạng thái "Còn hàng" trước khi chọn</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="bg-cyan-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Star className="h-6 w-6 text-cyan-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Bước 2: Xem chi tiết sản phẩm
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Nhấn "Chi tiết" để xem thông tin đầy đủ về sản phẩm.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">
                      Thông tin cần chú ý:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Giá cả và đơn vị tính (kg, con, lạng)</li>
                      <li>• Mô tả chi tiết về chất lượng sản phẩm</li>
                      <li>• Hình ảnh thực tế của sản phẩm</li>
                      <li>• Tình trạng còn hàng</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="bg-cyan-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <ShoppingCart className="h-6 w-6 text-cyan-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Bước 3: Thêm vào giỏ hàng
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Nhấn "Thêm vào giỏ hàng" để thêm sản phẩm. Bạn có thể tiếp
                    tục mua sắm hoặc xem giỏ hàng.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">
                      Quản lý giỏ hàng:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Điều chỉnh số lượng bằng nút +/-</li>
                      <li>• Xóa sản phẩm không cần thiết</li>
                      <li>• Kiểm tra tổng tiền trước khi thanh toán</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4">
                <div className="bg-cyan-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <CreditCard className="h-6 w-6 text-cyan-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Bước 4: Thanh toán
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Điền thông tin giao hàng và chọn phương thức thanh toán phù
                    hợp.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">
                      Thông tin cần thiết:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Họ tên đầy đủ</li>
                      <li>• Số điện thoại liên hệ</li>
                      <li>• Địa chỉ giao hàng chi tiết</li>
                      <li>• Phương thức thanh toán</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex gap-4">
                <div className="bg-cyan-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Truck className="h-6 w-6 text-cyan-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Bước 5: Nhận hàng
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Chúng tôi sẽ liên hệ xác nhận và giao hàng theo thời gian đã
                    hẹn.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">
                      Khi nhận hàng:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Kiểm tra sản phẩm ngay khi nhận</li>
                      <li>• Xác nhận số lượng và chất lượng</li>
                      <li>• Thanh toán (nếu chọn COD)</li>
                      <li>• Báo ngay nếu có vấn đề</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Phương thức thanh toán
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-center mb-3">
                  <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                    <span className="text-green-600 font-bold">💰</span>
                  </div>
                  <h3 className="font-semibold text-gray-800">
                    Thanh toán khi nhận hàng (COD)
                  </h3>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Thanh toán bằng tiền mặt</li>
                  <li>• Kiểm tra hàng trước khi trả tiền</li>
                  <li>• Phù hợp cho lần mua đầu tiên</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-center mb-3">
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">
                    Thẻ tín dụng/ghi nợ
                  </h3>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Visa, Mastercard, JCB</li>
                  <li>• Bảo mật SSL 256-bit</li>
                  <li>• Xử lý nhanh chóng</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-center mb-3">
                  <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                    <span className="text-orange-600 font-bold">🏦</span>
                  </div>
                  <h3 className="font-semibold text-gray-800">
                    Chuyển khoản ngân hàng
                  </h3>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Internet Banking</li>
                  <li>• Ví điện tử MoMo, ZaloPay</li>
                  <li>• Xác nhận tự động</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-blue-800 mb-4">
              Mẹo mua hàng thông minh
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">
                  Chọn sản phẩm chất lượng
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Ưu tiên sản phẩm "Còn hàng"</li>
                  <li>• Đọc kỹ mô tả sản phẩm</li>
                  <li>• Chọn size phù hợp với nhu cầu</li>
                  <li>• Lưu ý đơn vị tính (kg, con, lạng)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">
                  Tiết kiệm chi phí
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Mua đủ 500k để free ship nội thành</li>
                  <li>• Đặt hàng nhóm với hàng xóm</li>
                  <li>• Theo dõi khuyến mãi đặc biệt</li>
                  <li>• Đặt hàng trước cho ngày lễ</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Hỗ trợ mua hàng
            </h2>
            <p className="text-gray-700 mb-4">
              Nếu bạn cần hỗ trợ trong quá trình mua hàng, đừng ngần ngại liên
              hệ với chúng tôi:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <Phone className="h-8 w-8 text-cyan-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">Hotline</h3>
                <p className="text-cyan-600 font-semibold">1900-xxxx</p>
                <p className="text-xs text-gray-600">24/7</p>
              </div>
              <div className="text-center">
                <span className="text-2xl mb-2 block">💬</span>
                <h3 className="font-semibold text-gray-800">Chat online</h3>
                <p className="text-cyan-600 font-semibold">Messenger</p>
                <p className="text-xs text-gray-600">8:00 - 22:00</p>
              </div>
              <div className="text-center">
                <span className="text-2xl mb-2 block">📧</span>
                <h3 className="font-semibold text-gray-800">Email</h3>
                <p className="text-cyan-600 font-semibold">
                  support@haisantuoingon.vn
                </p>
                <p className="text-xs text-gray-600">Phản hồi trong 2h</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
