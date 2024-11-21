// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { TextField, Button, Box, Typography } from "@mui/material";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();    
    try {
      const res = await login({ email, password });
      const {
        data: { token },
      } = res;
      setToken(token);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid container spacing={2} sx={{ minHeight: "100vh" }}>
      {/* Formulario de Login (lado izquierdo) */}
      <Grid size={{ xs: 12, sm: 8 }} component="form">
        <Box
          sx={{
            padding: "20px",
            borderRadius: "10px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" color="error" sx={{ marginBottom: "20px" }}>
            Login
          </Typography>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            required
            color="error"
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            variant="outlined"
            required
            color="error"
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: "20px" }}
          />
          <Button onClick={handleLogin} variant="contained" color="primary" fullWidth>
            Iniciar Sesión
          </Button>
          <Box sx={{ marginTop: "20px" }}>
            <Typography variant="body2">
              ¿No tienes una cuenta? <a href="/signup">Regístrate</a>
            </Typography>
          </Box>
        </Box>
      </Grid>

      {/* Imagen (lado derecho) */}
      <Grid size={{ xs: 12, sm: 4 }}>
        <Box
          sx={{
            backgroundImage:
              "url(https://dapulse-res.cloudinary.com/image/upload/monday_platform/signup/signup-right-side-assets-new-flow/welcome-to-monday.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100%",
          }}
        />
      </Grid>
    </Grid>
  );
}

export default LoginForm;
