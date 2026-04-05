import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  memberLevel: "bronze" | "silver" | "gold" | "platinum";
  joinDate: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock user database
const MOCK_USERS: (User & { password: string })[] = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    email: "user@example.com",
    password: "123456",
    phone: "0901 234 567",
    memberLevel: "gold",
    joinDate: "15/01/2023",
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Restore session from localStorage
    try {
      const saved = localStorage.getItem("smartnest_user");
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch {}
    setIsLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800)); // simulate network

    // Check mock users + localStorage registered users
    let allUsers = [...MOCK_USERS];
    try {
      const extra = JSON.parse(localStorage.getItem("smartnest_registered") || "[]");
      allUsers = [...allUsers, ...extra];
    } catch {}

    const found = allUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (found) {
      const { password: _pw, ...safeUser } = found;
      setUser(safeUser);
      localStorage.setItem("smartnest_user", JSON.stringify(safeUser));
      setIsLoading(false);
      return { success: true };
    }

    setIsLoading(false);
    return { success: false, error: "Email hoặc mật khẩu không chính xác." };
  };

  const register = async (
    data: RegisterData
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 900));

    let allUsers = [...MOCK_USERS];
    try {
      const extra = JSON.parse(localStorage.getItem("smartnest_registered") || "[]");
      allUsers = [...allUsers, ...extra];
    } catch {}

    const exists = allUsers.find(
      (u) => u.email.toLowerCase() === data.email.toLowerCase()
    );
    if (exists) {
      setIsLoading(false);
      return { success: false, error: "Email này đã được sử dụng." };
    }

    const newUser: User & { password: string } = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      memberLevel: "bronze",
      joinDate: new Date().toLocaleDateString("vi-VN"),
    };

    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem("smartnest_registered") || "[]");
      existing.push(newUser);
      localStorage.setItem("smartnest_registered", JSON.stringify(existing));
    } catch {}

    const { password: _pw, ...safeUser } = newUser;
    setUser(safeUser);
    localStorage.setItem("smartnest_user", JSON.stringify(safeUser));
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("smartnest_user");
  };

  const updateUser = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem("smartnest_user", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
