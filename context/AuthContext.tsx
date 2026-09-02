"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  MOCK_COURSES,
  MOCK_SESSIONS,
  MOCK_USER,
  type PurchasedCourse,
  type UserSession,
} from "@/data/userData";

interface AuthContextType {
  isAuthenticated: boolean;
  user: typeof MOCK_USER | null;
  plannedSessions: UserSession[];
  purchasedCourses: PurchasedCourse[];
  login: (identifier: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<typeof MOCK_USER | null>(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem("fake_auth") === "true";
    if (loggedIn) {
      setIsAuthenticated(true);
      setUser(MOCK_USER);
    }
  }, []);

  const login = (identifier: string) => {
    localStorage.setItem("fake_auth", "true");
    setIsAuthenticated(true);
    setUser({
      ...MOCK_USER,
      email: identifier.includes("@") ? identifier : MOCK_USER.email,
    });
  };

  const logout = () => {
    localStorage.removeItem("fake_auth");
    setIsAuthenticated(false);
    setUser(null);
  };

  const plannedSessions = MOCK_SESSIONS.filter((s) => s.status === "planned");
  const purchasedCourses = MOCK_COURSES;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        plannedSessions,
        purchasedCourses,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
