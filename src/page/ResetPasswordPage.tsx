import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from "react-router-dom";
import { Eye, EyeOff, Fish, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Thêm state này

  const { resetPassword } = useAuth();
  const location = useLocation();

  // Lấy email và code từ query string
  const params = new URLSearchParams(location.search);
  const email = params.get("email") || "";
  const code = params.get("code") || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (!newPassword) {
      setError("Vui lòng nhập mật khẩu mới");
      setLoading(false);
      return;
    }
    try {
      const result = await resetPassword(email, code, newPassword);

      if (result.success) {
        setSuccess(true);
        toast.success("Đổi mật khẩu thành công!");
        navigate("/login");
      } else {
        setError(result.message || "Đổi mật khẩu thất bại");
      }
    } catch (error: any) {
      setError(
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
              Nhập mật khẩu mới để đặt lại mật khẩu
            </p>
          </div>
          <div className="flex flex-1 items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Mật khẩu mới
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="block w-full pl-9 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nhập mật khẩu mới"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {error && (
                    <div className="text-red-500 text-sm mt-1">{error}</div>
                  )}
                  {success && (
                    <div className="text-green-600 text-sm mt-1">
                      Đổi mật khẩu thành công!
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors disabled:opacity-60"
                >
                  {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
