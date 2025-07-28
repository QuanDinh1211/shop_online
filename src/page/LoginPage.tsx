import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { User, Lock, Mail, Eye, EyeOff, Fish } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (isLogin) {
      // Gửi password dạng plain text lên BE
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError("Email hoặc mật khẩu không đúng");
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        setError("Mật khẩu xác nhận không khớp");
        setIsLoading(false);
        return;
      }

      // Gửi password dạng plain text lên BE
      const success = await register(
        formData.name,
        formData.email,
        formData.password
      );
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError("Email đã tồn tại hoặc đăng ký thất bại");
      }
    }
    setIsLoading(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setFormData({ email: "", password: "", name: "", confirmPassword: "" });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 px-6 py-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Fish className="h-6 w-6 text-white" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-white mb-1">
              {isLogin ? "Chào mừng trở lại!" : "Tham gia cùng chúng tôi"}
            </h2>
            <p className="text-blue-100 text-sm">
              {isLogin
                ? "Đăng nhập để tiếp tục mua sắm"
                : "Tạo tài khoản để bắt đầu"}
            </p>
          </div>

          {/* Form content */}
          <div className="px-6 py-6">
            {error && (
              <div className="bg-red-50 border border-red-200 p-3 mb-4 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Họ và tên
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required={!isLogin}
                      value={formData.name}
                      onChange={handleInputChange}
                      className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nhập họ và tên của bạn"
                    />
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Địa chỉ email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mật khẩu
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
                    value={formData.password}
                    onChange={handleInputChange}
                    className="block w-full pl-9 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập mật khẩu"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Xác nhận mật khẩu
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      required={!isLogin}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="block w-full pl-9 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nhập lại mật khẩu"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Đang xử lý...</span>
                  </>
                ) : (
                  <span>{isLogin ? "Đăng nhập" : "Tạo tài khoản"}</span>
                )}
              </button>
            </form>

            <div className="flex justify-end my-2">
              <button
                type="button"
                className="text-blue-600 hover:underline text-sm"
                onClick={() => navigate("/forgot-password")}
              >
                Quên mật khẩu?
              </button>
            </div>

            {/* Toggle between login/register */}
            <div className="mt-6 text-center">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">hoặc</span>
                </div>
              </div>

              <button
                onClick={toggleMode}
                className="mt-3 text-blue-600 hover:text-blue-800 font-medium transition-colors hover:underline"
              >
                {isLogin
                  ? "Chưa có tài khoản? Đăng ký ngay"
                  : "Đã có tài khoản? Đăng nhập"}
              </button>
            </div>

            {/* Back to home link */}
            <div className="mt-4 text-center">
              <Link
                to="/"
                className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors text-sm"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Quay về trang chủ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
