import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "../types";
import { userService } from "../services/userService";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;

  logout: () => void;
  isAuthenticated: boolean;
  resetPassword: (
    email: string,
    code: string,
    newPassword: string
  ) => Promise<{ success: boolean; message: string }>;
  forgotPassword: (
    email: string
  ) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("seafood_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsAuthReady(true);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await userService.login(email, password);
      if (result.success && result.data) {
        setUser(result.data.user);
        localStorage.setItem("seafood_user", JSON.stringify(result.data.user));
        localStorage.setItem("seafood_token", result.data.token);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("seafood_user");
    localStorage.removeItem("seafood_token");
  };

  const forgotPassword = async (email: string) => {
    return await userService.forgotPassword(email);
  };

  const resetPassword = async (
    email: string,
    code: string,
    newPassword: string
  ) => {
    return await userService.resetPassword(email, code, newPassword);
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    forgotPassword,
    resetPassword,
  };

  if (!isAuthReady) {
    // Có thể trả về spinner hoặc null
    return null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
