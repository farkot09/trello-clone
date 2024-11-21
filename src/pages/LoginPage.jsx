// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const LoginPage = () => {
  const { isAuthenticated } = useAuthStore();
  const { isAuth } = isAuthenticated();
  const navigate = useNavigate();
  const [action, setAction] = useState("login")

  const handleLoginClick = () => {    
    setAction("register");
  }

  const handleRegisterClick = () => {    
    setAction("login");
  }

  useEffect(() => {
    if (isAuth) navigate("/profile"); // Redirect to board if authenticated
  }, [isAuthenticated, isAuth, navigate]);
  return (
    <>
    {
      action === "login" ? <LoginForm handleLoginClick={handleLoginClick} /> : <RegisterForm handleRegisterClick={handleRegisterClick} />
    }
      
    </>
  );
};

export default LoginPage;
