import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

export const authContext = React.createContext();

const API = "http://localhost:8000";

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const handleRegister = async (user, navigate) => {
    setLoading(true);
    try {
      await axios.post(`${API}/users`, user);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (user, navigate) => {
    setLoading(true);

    try {
      const response = await axios.get(`${API}/users`);
      const users = response.data;

      const foundUser = users.find((u) => u.email === user.email);

      if (foundUser && foundUser.password === user.password) {
        toast.success("Вы успешно вошли в аккаунт");

        localStorage.setItem("user", JSON.stringify(foundUser));

        navigate("/");
        window.location.reload();
      } else {
        toast.warn("Неправильный email или пароль");
      }
    } catch (error) {
      console.log("Произошла ошибка:", error);
      toast.error("Произошла ошибка при входе в аккаунт");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = (navigate) => {
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  return (
    <authContext.Provider
      value={{ handleRegister, loading, error, handleLogin, handleLogout }}
    >
      {children}
    </authContext.Provider>
  );
};
export default AuthContextProvider;
