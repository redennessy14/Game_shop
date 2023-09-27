import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/authContext";
import axios from "axios";
const API = "http://localhost:8000";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const { handleRegister } = useContext(authContext);
  const handleSubmit = async () => {
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      alert("Заполните поля");
      return;
    }

    try {
      const response = await axios.get(`${API}/users?email=${email}`);
      const existingUser = response.data[0];

      if (existingUser) {
        alert("Пользователь с таким email уже зарегистрирован");
        return;
      }

      const user = {
        email,
        password,
        password_confirm: confirmPassword,
      };
      handleRegister(user, navigate);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1>Register</h1>
      <div>
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type="password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <button onClick={handleSubmit}>Sign up</button>
      </div>
    </div>
  );
};

export default Register;
