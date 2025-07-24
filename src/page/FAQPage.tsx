import React, { useState } from 'react';
import { ArrowLeft, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQPageProps {
  onBack: () => void;
}

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onBack }) => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "Hải sản có thực sự tươi không?",
      answer: "Chúng tôi cam kết 100% hải sản tươi sống. Tất cả sản phẩm được thu mua trực tiếp từ ngư dân và được vận chuyển trong hệ thống lạnh khép kín. Nếu sản phẩm không đạt chất lượng, chúng tôi sẽ đổi trả ngay lập tức.",
      category: "Chất lượng"
    },
    {
      id: 2,
      question: "Thời gian giao hàng là bao lâu?",
      answer: "Đối với khu vực nội thành TP.HCM: 2-4 giờ. Đối với khu vực ngoại thành và tỉnh lân cận: 4-8 giờ. Chúng tôi có dịch vụ giao hàng 24/7 để đảm bảo hải sản luôn tươi ngon khi đến tay khách hàng.",
      category: "Giao hàng"
    },
    {
      id: 3,
      question: "Phí giao hàng như thế nào?",
      answer: "Miễn phí giao hàng cho đơn hàng trên 500,000đ (nội thành) và 1,000,000đ (ngoại thành). Đơn hàng dưới mức này sẽ có phí giao hàng 30,000đ (nội thành) và 50,000đ (ngoại thành).",
      category: "Giao hàng"
    },
    {
      id: 4,
      question: "Có thể thanh toán bằng cách nào?",
      answer: "Chúng tôi hỗ trợ 3 phương thức: (1) Thanh toán khi nhận hàng (COD), (2) Thẻ tín dụng/ghi nợ (Visa, Mastercard, JCB), (3) Chuyển khoản ngân hàng và ví điện tử (MoMo, ZaloPay).",
      category: "Thanh toán"
    },
    {
      id: 5,
      question: "Làm sao để biết hải sản còn tươi khi nhận hàng?",
      answer: "Hải sản tươi sẽ có mắt trong, vảy bóng, thịt chắc và không có mùi tanh. Chúng tôi đóng gói trong thùng xốp với đá lạnh và giao trong thời gian ngắn nhất. Nếu có bất kỳ nghi ngờ nào, hãy liên hệ ngay với chúng tôi.",
      category: "Chất lượng"
    },
    {
      id: 6,
      question: "Có thể đổi trả hàng không?",
      answer: "Có, chúng tôi chấp nhận đổi trả trong vòng 24 giờ nếu sản phẩm không đúng chất lượng, giao sai hàng, hoặc bị hư hỏng do vận chuyển. Vui lòng liên hệ hotline 1900-xxxx để được hỗ trợ.",
      category: "Đổi trả"
    },
    {
      id: 7,
      question: "Có giao hàng vào cuối tuần không?",
      answer: "Có, chúng tôi giao hàng 7 ngày trong tuần, bao gồm cả cuối tuần và ngày lễ. Tuy nhiên, thời gian giao hàng có thể chậm hơn một chút vào những ngày này do lượng đơn hàng tăng cao.",
      category: "Giao hàng"
    },
    {
      id: 8,
      question: "Làm thế nào để bảo quản hải sản sau khi mua?",
      answer: "Hải sản tươi nên được bảo quản trong tủ lạnh ở nhiệt độ 0-4°C và sử dụng trong vòng 24 giờ. Hải sản đông lạnh có thể bảo quản trong ngăn đá tủ lạnh từ 3-6 tháng tùy loại.",
      category: "Bảo quản"
    },
    {
      id: 9,
      question: "Có thể đặt hàng với số lượng lớn không?",
      answer: "Có, chúng tôi nhận đặt hàng số lượng lớn cho nhà hàng, tiệc cưới, sự kiện. Vui lòng liên hệ trước ít nhất 24 giờ để chúng tôi chuẩn bị đầy đủ. Có thể được giảm giá đặc biệt cho đơn hàng lớn.",
      category: "Đặt hàng"
    },
    {
      id: 10,
      question: "Website có an toàn khi thanh toán online không?",
      answer: "Hoàn toàn an toàn. Chúng tôi sử dụng công nghệ mã hóa SSL 256-bit và hợp tác với các cổng thanh toán uy tín. Thông tin thẻ của bạn không được lưu trữ trên hệ thống của chúng tôi.",
      category: "Thanh toán"
    }
  ];

  const categories = ['Tất cả', 'Chất lượng', 'Giao hàng', 'Thanh toán', 'Đổi trả', 'Bảo quản', 'Đặt hàng'];

  const filteredFAQs = selectedCategory === 'Tất cả' 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-6 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        Quay lại trang chủ
      </button>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <HelpCircle className="h-16 w-16 text-cyan-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Câu hỏi thường gặp</h1>
          <p className="text-gray-600">Tìm câu trả lời cho những thắc mắc phổ biến</p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Chọn chủ đề:</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? 'bg-cyan-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.map(item => (
            <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
              >
                <div>
                  <span className="inline-block bg-cyan-100 text-cyan-800 text-xs px-2 py-1 rounded-full mr-3">
                    {item.category}
                  </span>
                  <span className="font-semibold text-gray-800">{item.question}</span>
                </div>
                {openItems.includes(item.id) ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {openItems.includes(item.id) && (
                <div className="px-6 py-4 bg-white border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Không tìm thấy câu hỏi nào trong chủ đề này.</p>
          </div>
        )}

        {/* Contact Support */}
        <div className="mt-12 bg-cyan-50 border border-cyan-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Không tìm thấy câu trả lời?</h3>
          <p className="text-gray-600 mb-4">
            Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-semibold text-gray-800">Hotline 24/7</h4>
              <p className="text-cyan-600 font-bold">1900-xxxx</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-semibold text-gray-800">Email hỗ trợ</h4>
              <p className="text-cyan-600 font-bold">support@haisantuoingon.vn</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-semibold text-gray-800">Chat trực tuyến</h4>
              <p className="text-cyan-600 font-bold">8:00 - 22:00 hàng ngày</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};