import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || ""
  );
  const login = async (inputs) => {
    const res = await axios.post("http://localhost:8000/api/login", inputs);
    setCurrentUser(res.data);
  };

  const logout = async () => {
    const token = currentUser.token;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const bodyParameters = {
      key: "value",
    };

    await axios.post(
      "http://localhost:8000/api/logout",
      bodyParameters,
      config
    );
    localStorage.removeItem(currentUser);
    setCurrentUser("");
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
