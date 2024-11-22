// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { register } from "../services/auth";

function RegisterForm({ handleRegisterClick }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [severityAlert, setAeverityAlert] = useState("");
  const [messageAlert, setMessageAlert] = useState("");
  const [password, setPassword] = useState("");;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await register({ name, email, password });   
      setAeverityAlert("success");
      setMessageAlert("Registration successful. You can now login.");      
    } catch (error) {
      console.error(error.response.data.message);
      setAeverityAlert("error");
      setMessageAlert(error.response.data.message);
    }
  };

  return (
    <Grid container spacing={2} sx={{ minHeight: "100vh" }}>
      {/* Formulario de Login (lado izquierdo) */}
      <Grid
        size={{ xs: 12, sm: 8 }}
        component="form"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            padding: "20px",
            borderRadius: "10px",
            width: "400px",
          }}
        >
          <Typography
            variant="h4"
            color="#6161ff"
            sx={{ marginBottom: "20px" }}
          >
            Register
          </Typography>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            required
            color="error"
            onChange={(e) => setName(e.target.value)}
            sx={{ marginBottom: "20px" }}
          />
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
          <Button
            onClick={handleLogin}
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#6161ff",
              color: "white",
            }}
          >
            Register
          </Button>
          <Box sx={{ marginTop: "20px" }}>
            <Button onClick={handleRegisterClick}>Login</Button>
            <Alert severity={severityAlert}>{messageAlert}</Alert>
          </Box>
        </Box>
      </Grid>

      {/* Imagen (lado derecho) */}
      <Grid
        size={{ xs: 12, sm: 4 }}
        sx={{
          backgroundImage:
            "url(https://dapulse-res.cloudinary.com/image/upload/monday_platform/signup/signup-right-side-assets-new-flow/welcome-to-monday.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      />
    </Grid>
  );
}

export default RegisterForm;
