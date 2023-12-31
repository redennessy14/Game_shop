import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../context/authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loading, error, handleLogin } = useContext(authContext);

  const handleSignIn = () => {
    const userData = {
      email,
      password,
    };
    handleLogin(userData, navigate);
  };
  return (
    <div>
      <h1>Login user</h1>
      <div>
        <input type="text" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleSignIn}>Sign in </button>
      </div>
      <p>
        New to Game-Shop ? <Link to="/register">Create account</Link>
      </p>
    </div>
  );
};

export default Login;
