// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const LoginPage = () => {
  const { isAuthenticated } = useAuthStore();
  const { isAuth } = isAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate("/profile"); // Redirect to board if authenticated
  }, [isAuthenticated, isAuth, navigate]);
  return (
    <>
      <LoginForm />
    </>
  );
};

export default LoginPage;
