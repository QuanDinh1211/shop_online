import React from "react";
import {
  ArrowLeft,
  Fish,
  Award,
  Truck,
  Shield,
  Users,
  Heart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AboutPageProps {}

export const AboutPage: React.FC<AboutPageProps> = () => {
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

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-8 text-center">
          <Fish className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Về VieStore</h1>
          <p className="text-cyan-100 text-lg">
            Chuyên cung cấp hải sản tươi sống chất lượng cao từ năm 2015
          </p>
        </div>

        <div className="p-8">
          {/* Story Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Câu chuyện của chúng tôi
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              VieStore được thành lập với sứ mệnh mang đến cho khách hàng những
              sản phẩm hải sản tươi ngon nhất từ các vùng biển Việt Nam. Với hơn
              10 năm kinh nghiệm trong ngành, chúng tôi tự hào là đối tác tin
              cậy của hàng nghìn gia đình Việt.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Từ những ngày đầu khởi nghiệp với một cửa hàng nhỏ tại chợ hải
              sản, chúng tôi đã không ngừng phát triển và hiện tại đã có mặt
              trên nền tảng online để phục vụ khách hàng tốt hơn.
            </p>
          </div>

          {/* Values Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Giá trị cốt lõi
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <Award className="h-12 w-12 text-cyan-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">
                  Chất lượng hàng đầu
                </h3>
                <p className="text-gray-600 text-sm">
                  Cam kết 100% hải sản tươi sống, được tuyển chọn kỹ lưỡng từ
                  các ngư dân uy tín
                </p>
              </div>
              <div className="text-center p-4">
                <Truck className="h-12 w-12 text-cyan-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">
                  Giao hàng nhanh chóng
                </h3>
                <p className="text-gray-600 text-sm">
                  Hệ thống giao hàng trong vòng 2-4 giờ, đảm bảo độ tươi ngon
                  của sản phẩm
                </p>
              </div>
              <div className="text-center p-4">
                <Shield className="h-12 w-12 text-cyan-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">
                  An toàn thực phẩm
                </h3>
                <p className="text-gray-600 text-sm">
                  Tuân thủ nghiêm ngặt các quy định về vệ sinh an toàn thực phẩm
                </p>
              </div>
              <div className="text-center p-4">
                <Users className="h-12 w-12 text-cyan-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">
                  Đội ngũ chuyên nghiệp
                </h3>
                <p className="text-gray-600 text-sm">
                  Nhân viên được đào tạo bài bản, tư vấn nhiệt tình và chuyên
                  nghiệp
                </p>
              </div>
              <div className="text-center p-4">
                <Heart className="h-12 w-12 text-cyan-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">
                  Tận tâm phục vụ
                </h3>
                <p className="text-gray-600 text-sm">
                  Luôn lắng nghe và đáp ứng mọi nhu cầu của khách hàng một cách
                  tốt nhất
                </p>
              </div>
              <div className="text-center p-4">
                <Fish className="h-12 w-12 text-cyan-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">
                  Đa dạng sản phẩm
                </h3>
                <p className="text-gray-600 text-sm">
                  Hơn 50 loại hải sản khác nhau từ cơ bản đến cao cấp
                </p>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Sứ mệnh của chúng tôi
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Chúng tôi cam kết mang đến cho mọi gia đình Việt Nam những sản
              phẩm hải sản tươi ngon, an toàn và giá cả hợp lý. Thông qua việc
              ứng dụng công nghệ hiện đại và dịch vụ chuyên nghiệp, chúng tôi
              mong muốn trở thành cầu nối tin cậy giữa ngư dân và người tiêu
              dùng, góp phần phát triển ngành thủy sản Việt Nam.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
