import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore"; 
const Logout = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Llama a la función de logout
    logout();
    // Redirige al usuario a la página de inicio de sesión
    navigate("/login");
  }, [logout, navigate]);

  return null; // No renderiza nada
};

export default Logout;
