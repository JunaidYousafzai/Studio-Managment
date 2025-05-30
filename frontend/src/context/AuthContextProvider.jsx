import { createContext, useContext, useState, useEffect } from "react";

const authContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: localStorage.getItem("username"),
    email: localStorage.getItem("email"),
    token: localStorage.getItem("token"),
  });

  useEffect(() => {
    if (user.token) {
      localStorage.setItem("username", user.username);
      localStorage.setItem("email", user.email);
      localStorage.setItem("token", user.token);
    } else {
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("token");
    }
  }, [user]);

  const login = ({ username, email, token }) => {
    setUser({ username, email, token });
  };

  const logout = () => {
    setUser({ username: null, email: null, token: null });
  };

  return (
    <authContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);
