import React from "react";
import {
  ArrowLeft,
  RotateCcw,
  CheckCircle,
  XCircle,
  Clock,
  Phone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ReturnPolicyPageProps {}

export const ReturnPolicyPage: React.FC<ReturnPolicyPageProps> = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-4 py-6">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-6 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        Quay lại trang chủ
      </button>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <RotateCcw className="h-16 w-16 text-cyan-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Chính sách đổi trả
          </h1>
          <p className="text-gray-600">Cam kết bảo vệ quyền lợi khách hàng</p>
        </div>

        <div className="space-y-8">
          {/* Return Conditions */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Điều kiện đổi trả
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <h3 className="font-semibold text-green-800">
                    Được chấp nhận đổi trả
                  </h3>
                </div>
                <ul className="space-y-2 text-green-700 text-sm">
                  <li>• Sản phẩm không đúng chất lượng như mô tả</li>
                  <li>• Hải sản không còn tươi khi nhận hàng</li>
                  <li>• Giao sai sản phẩm so với đơn hàng</li>
                  <li>• Sản phẩm bị hư hỏng do vận chuyển</li>
                  <li>• Trọng lượng không đúng (sai lệch &gt;5%)</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <XCircle className="h-6 w-6 text-red-600" />
                  <h3 className="font-semibold text-red-800">
                    Không được chấp nhận
                  </h3>
                </div>
                <ul className="space-y-2 text-red-700 text-sm">
                  <li>• Khách hàng đổi ý sau khi nhận hàng</li>
                  <li>• Sản phẩm đã qua chế biến</li>
                  <li>• Quá thời hạn đổi trả (24 giờ)</li>
                  <li>• Không có bằng chứng về lỗi sản phẩm</li>
                  <li>• Sản phẩm bị hư do bảo quản sai cách</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Return Process */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Clock className="h-6 w-6 text-cyan-600" />
              <h2 className="text-xl font-bold text-gray-800">
                Quy trình đổi trả
              </h2>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="bg-cyan-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-cyan-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Liên hệ</h3>
                <p className="text-sm text-gray-600">
                  Gọi hotline hoặc nhắn tin trong vòng 24h
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="bg-cyan-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-cyan-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Xác minh</h3>
                <p className="text-sm text-gray-600">
                  Cung cấp hình ảnh và thông tin đơn hàng
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="bg-cyan-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-cyan-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Thu hồi</h3>
                <p className="text-sm text-gray-600">
                  Nhân viên đến thu hồi sản phẩm lỗi
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="bg-cyan-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-cyan-600 font-bold">4</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Hoàn tiền</h3>
                <p className="text-sm text-gray-600">
                  Hoàn tiền hoặc giao sản phẩm mới
                </p>
              </div>
            </div>
          </div>

          {/* Time Limits */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Thời hạn đổi trả
            </h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Hải sản tươi sống
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>
                      • Thời hạn: <strong>24 giờ</strong> kể từ khi nhận hàng
                    </li>
                    <li>• Phải báo ngay khi phát hiện lỗi</li>
                    <li>• Giữ nguyên bao bì và sản phẩm</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Hải sản đông lạnh
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>
                      • Thời hạn: <strong>48 giờ</strong> kể từ khi nhận hàng
                    </li>
                    <li>• Kiểm tra ngay khi nhận hàng</li>
                    <li>• Bảo quản đúng cách trong tủ lạnh</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Refund Methods */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Phương thức hoàn tiền
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold">💰</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Tiền mặt</h3>
                <p className="text-sm text-gray-600">
                  Hoàn tiền mặt ngay tại chỗ
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">🏦</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Chuyển khoản
                </h3>
                <p className="text-sm text-gray-600">
                  Chuyển khoản trong 1-2 ngày làm việc
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-orange-600 font-bold">🔄</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Đổi sản phẩm
                </h3>
                <p className="text-sm text-gray-600">
                  Đổi sản phẩm mới cùng loại
                </p>
              </div>
            </div>
          </div>

          {/* Contact for Returns */}
          <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Phone className="h-6 w-6 text-cyan-600" />
              <h2 className="text-xl font-bold text-gray-800">
                Liên hệ đổi trả
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Hotline đổi trả 24/7
                </h3>
                <p className="text-cyan-600 font-semibold text-lg">1900-xxxx</p>
                <p className="text-gray-600 text-sm">
                  Nhấn phím 2 để được hỗ trợ đổi trả
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Email hỗ trợ
                </h3>
                <p className="text-cyan-600 font-semibold">
                  return@haisantuoingon.vn
                </p>
                <p className="text-gray-600 text-sm">
                  Phản hồi trong vòng 2 giờ
                </p>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-800 mb-4">
              Lưu ý quan trọng
            </h2>
            <ul className="space-y-2 text-red-700">
              <li>
                • Hải sản là sản phẩm đặc biệt, vui lòng kiểm tra ngay khi nhận
                hàng
              </li>
              <li>
                • Chụp ảnh/quay video khi mở hàng để làm bằng chứng nếu cần
                thiết
              </li>
              <li>• Không chấp nhận đổi trả nếu sản phẩm đã qua chế biến</li>
              <li>
                • Mọi tranh chấp sẽ được giải quyết theo quy định của pháp luật
                Việt Nam
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
