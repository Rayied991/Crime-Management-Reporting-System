import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  // * Making sure this code is executed on client side
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("authUser");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  const login = (username, cookie) => {
    const newUser = { username, cookie };
    if (typeof window !== "undefined") {
      localStorage.setItem("authUser", JSON.stringify(newUser));
    }
    setUser(newUser);
    console.info("SetUser is done =", newUser);
  };

  const checkUser = () => {
    return user && user.username != null && user.cookie != null;
  };

  const logout = () => {
    doSignOut();
  };
  async function doSignOut() {
    try {
      const response = await axios.post("http://localhost:3000/police/plogout", {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true,
      });
      console.log(response);
      localStorage.removeItem("authUser");
      setUser(null);
      document.cookie = null;

      router.push("/Police_dashboard/psignin");
    } catch (error) {
      console.error("error failed: ", error);
    }
  }
  return (
    <AuthContext.Provider value={{ user, login, logout, checkUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);