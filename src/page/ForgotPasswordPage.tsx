import React, { useState } from "react";
import { toast } from "react-toastify";
import { Mail, Fish } from "lucide-react";
import { userService } from "../services/userService";
import { useAuth } from "../contexts/AuthContext";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const { forgotPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await forgotPassword(email);
      if (result.success) {
        setSent(true);
        toast.success("Vui lòng kiểm tra email để đặt lại mật khẩu!");
      } else {
        toast.error(result.message || "Không thể gửi email. Vui lòng thử lại.");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại!"
      );
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 px-6 py-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Fish className="h-6 w-6 text-white" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-white mb-1">Quên mật khẩu</h2>
            <p className="text-blue-100 text-sm">
              Nhập email để nhận hướng dẫn đặt lại mật khẩu
            </p>
          </div>
          <div className="flex flex-1 items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl">
              {sent ? (
                <div className="text-green-600 text-center">
                  Đã gửi email! Vui lòng kiểm tra hộp thư để đặt lại mật khẩu.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nhập email của bạn
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors disabled:opacity-60"
                  >
                    {loading ? "Đang gửi..." : "Gửi email xác nhận"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
