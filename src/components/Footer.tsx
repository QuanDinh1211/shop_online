import React from "react";
import {
  Fish,
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  const navigate = useNavigate();

  const onLinkClick = (page: string) => {
    switch (page) {
      case "about":
        navigate("/about");
        break;
      case "shipping":
        navigate("/shipping");
        break;
      case "return":
        navigate("/return");
        break;
      case "guide":
        navigate("/guide");
        break;
      case "faq":
        navigate("/faq");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Fish className="h-8 w-8 text-cyan-400" />
              <h3 className="text-xl font-bold">VieStore</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Chuyên cung cấp hải sản tươi sống chất lượng cao với giá cả hợp
              lý. Cam kết 100% tươi ngon, giao hàng nhanh chóng tận nơi.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Thông tin liên hệ</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-cyan-400" />
                <div>
                  <p className="font-medium">Hotline: 1900-xxxx</p>
                  <p className="text-sm text-gray-400">Hỗ trợ 24/7</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-cyan-400" />
                <div>
                  <p className="font-medium">info@haisantuoingon.vn</p>
                  <p className="text-sm text-gray-400">Email hỗ trợ</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-cyan-400 mt-1" />
                <div>
                  <p className="font-medium">123 Đường Hải Sản</p>
                  <p className="text-sm text-gray-400">Quận 1, TP.HCM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Giờ làm việc</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-cyan-400" />
                <div>
                  <p className="font-medium">Thứ 2 - Chủ nhật</p>
                  <p className="text-sm text-gray-400">6:00 - 22:00</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                <p className="text-sm font-medium text-cyan-400">
                  Giao hàng nhanh
                </p>
                <p className="text-xs text-gray-400">
                  Trong vòng 2-4 giờ tại TP.HCM
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên kết nhanh</h4>
            <div className="space-y-2">
              <button
                onClick={() => onLinkClick("about")}
                className="block text-gray-300 hover:text-cyan-400 transition-colors text-left"
              >
                Về chúng tôi
              </button>
              <button
                onClick={() => onLinkClick("shipping")}
                className="block text-gray-300 hover:text-cyan-400 transition-colors text-left"
              >
                Chính sách giao hàng
              </button>
              <button
                onClick={() => onLinkClick("return")}
                className="block text-gray-300 hover:text-cyan-400 transition-colors text-left"
              >
                Chính sách đổi trả
              </button>
              <button
                onClick={() => onLinkClick("guide")}
                className="block text-gray-300 hover:text-cyan-400 transition-colors text-left"
              >
                Hướng dẫn mua hàng
              </button>
              <button
                onClick={() => onLinkClick("faq")}
                className="block text-gray-300 hover:text-cyan-400 transition-colors text-left"
              >
                Câu hỏi thường gặp
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 VieStore. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-cyan-400 text-sm transition-colors"
              >
                Điều khoản sử dụng
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-cyan-400 text-sm transition-colors"
              >
                Chính sách bảo mật
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
