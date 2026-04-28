import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = sessionStorage.getItem("1pass_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("1pass_user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("1pass_user");
    }
  }, [user]);

  function login(phone) {
    setUser({ phone });
  }

  function logout() {
    setUser(null);
    sessionStorage.removeItem("1pass_user");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
